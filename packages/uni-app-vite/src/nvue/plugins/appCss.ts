import type { Plugin } from 'vite'
import type { PluginContext } from 'rollup'
import fs from 'fs-extra'
import type { SFCBlock, SFCDescriptor } from '@vue/compiler-sfc'
import {
  createRollupError,
  hash,
  parseVueRequest,
  preNVueHtml,
  preNVueJs,
  resolveAppVue,
} from '@dcloudio/uni-cli-shared'

declare module '@vue/compiler-sfc' {
  interface SFCDescriptor {
    id: string
  }
}

export const APP_CSS_JS = './app.css.js'
export function uniAppCssPlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const appVueFilename = resolveAppVue(inputDir)
  return {
    name: 'uni:app-nvue-app-style',
    // 提前到 @vite/plugin-vue 之前执行，因为在 nvue 编译时，仅 import 了 App.vue 的 styles，这样导致 descriptor
    // 一直使用的是上一次的（plugin-vue 会在 transformMain 中生成新的 descriptor），故不再交由 plugin-vue 来 load
    // 而是当前插件直接处理
    enforce: 'pre',
    resolveId(id) {
      if (id === APP_CSS_JS) {
        return APP_CSS_JS
      }
    },
    load(id) {
      if (id === APP_CSS_JS) {
        return genAppStylesCode(appVueFilename, this)
      }
      const { filename, query } = parseVueRequest(id)
      if (query.vue && query.type === 'style' && appVueFilename === filename) {
        const descriptor = createAppDescriptor(filename, this)
        const block = descriptor.styles[query.index!]
        if (block) {
          return {
            code: block.content,
            map: '',
          }
        }
      }
    },
  }
}

const defaultAppStylesCode = `exports.styles = []`

async function genAppStylesCode(
  filename: string,
  pluginContext: PluginContext
) {
  pluginContext.addWatchFile(filename)
  const descriptor = createAppDescriptor(filename, pluginContext)
  if (!descriptor.styles.length) {
    return defaultAppStylesCode
  }
  let stylesCode = ``
  const styleVars: string[] = []
  for (let i = 0; i < descriptor.styles.length; i++) {
    const style = descriptor.styles[i]
    const src = style.src || descriptor.filename
    const attrsQuery = attrsToQuery(style.attrs, 'css')
    const srcQuery = style.src ? `&src=${descriptor.id}` : ``
    const query = `?vue&type=style&index=${i}${srcQuery}&inline`
    const styleRequest = src + query + attrsQuery
    stylesCode += `\nimport _style_${i} from ${JSON.stringify(styleRequest)}`
    styleVars.push(`_style_${i}`)
  }
  return `
${stylesCode}
exports.styles = [${styleVars.join(',')}]
`
}

function readAppCode(filename: string) {
  if (!fs.existsSync(filename)) {
    return ``
  }
  const source = fs.readFileSync(filename, 'utf8')
  if (source.includes('#endif')) {
    return preNVueJs(preNVueHtml(source, filename), filename)
  }
  return source
}

let appDescriptor: SFCDescriptor
function createAppDescriptor(
  filename: string,
  pluginContext: PluginContext
): SFCDescriptor {
  const source = readAppCode(filename)
  const id = hash(source)
  if (!appDescriptor || appDescriptor.id !== id) {
    const { descriptor, errors } = require('@vue/compiler-sfc').parse(source, {
      filename,
    })
    descriptor.id = id
    if (errors.length) {
      errors.forEach((error: any) =>
        pluginContext.error(
          createRollupError('uni:app-nvue-app-style', filename, error)
        )
      )
    }
    appDescriptor = descriptor
  }
  return appDescriptor
}

// these are built-in query parameters so should be ignored
// if the user happen to add them as attrs
const ignoreList = ['id', 'index', 'src', 'type', 'lang', 'module']

function attrsToQuery(
  attrs: SFCBlock['attrs'],
  langFallback?: string,
  forceLangFallback = false
): string {
  let query = ``
  for (const name in attrs) {
    const value = attrs[name]
    if (!ignoreList.includes(name)) {
      query += `&${encodeURIComponent(name)}${
        value ? `=${encodeURIComponent(value)}` : ``
      }`
    }
  }
  if (langFallback || attrs.lang) {
    query +=
      `lang` in attrs
        ? forceLangFallback
          ? `&lang.${langFallback}`
          : `&lang.${attrs.lang}`
        : `&lang.${langFallback}`
  }
  return query
}
