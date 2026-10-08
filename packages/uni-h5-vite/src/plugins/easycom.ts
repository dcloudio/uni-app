import fs from 'fs-extra'
import path from 'path'
import type { Plugin } from 'vite'
import { type FilterPattern, createFilter } from '@rollup/pluginutils'
import { walk } from 'estree-walker'
import { camelize, capitalize } from '@vue/shared'

import { COMPONENT_PREFIX, isWebBuiltInComponent } from '@dcloudio/uni-shared'
import {
  BASE_COMPONENTS_STYLE_PATH,
  COMPONENT_DEPS_CSS,
  EXTNAME_VUE_TEMPLATE,
  H5_COMPONENTS_STYLE_PATH,
  X_BASE_COMPONENTS_STYLE_PATH,
  addImportDeclaration,
  buildInCssSet,
  genResolveEasycomCode,
  isCombineBuiltInCss,
  isUniAppXWebVapor,
  matchEasycom,
  normalizePath,
  parseVueRequest,
} from '@dcloudio/uni-cli-shared'

const H5_COMPONENTS_PATH = '@dcloudio/uni-h5'
const VAPOR_EASYCOM_IMPORT =
  "import { createComponent as __createEasycomComponent } from 'vue';"

const xBaseComponents = ['slider', 'switch', 'loading', 'page-container']
const baseComponents = [
  // 'audio',
  'button',
  'canvas',
  'checkbox',
  'checkbox-group',
  'editor',
  'form',
  'icon',
  'image',
  'input',
  'label',
  'movable-area',
  'movable-view',
  'navigator',
  'picker-view',
  'picker-view-column',
  'progress',
  'radio',
  'radio-group',
  'resize-sensor',
  'refresher',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'text',
  'textarea',
  'view',
  'list-view',
  'list-item',
  'sticky-section',
  'sticky-header',
]

interface UniEasycomPluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

let componentDepsCss: ReturnType<typeof COMPONENT_DEPS_CSS>

export function uniEasycomPlugin(options: UniEasycomPluginOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  let needCombineBuiltInCss = false
  componentDepsCss = COMPONENT_DEPS_CSS(process.env.UNI_APP_X === 'true')
  const isDevX =
    process.env.UNI_HX_VERSION_DEV === 'true' &&
    process.env.UNI_APP_X === 'true'
  const isWebVapor = isUniAppXWebVapor()
  return {
    name: 'uni:h5-easycom',
    configResolved(config) {
      needCombineBuiltInCss = isCombineBuiltInCss(config)
    },
    transform(code, id) {
      if (!filter(id)) {
        return
      }
      const { filename } = parseVueRequest(id)
      if (!EXTNAME_VUE_TEMPLATE.includes(path.extname(filename))) {
        return
      }
      if (
        !code.includes('_resolveComponent') &&
        !(isWebVapor && code.includes('_createAssetComponent'))
      ) {
        return
      }
      let i = 0
      const importDeclarations: string[] = []
      if (isWebVapor && code.includes('_createAssetComponent')) {
        const transformed = replaceVaporAssetComponents(
          code,
          this.parse(code),
          isDevX
        )
        if (transformed !== code) {
          code = transformed
          importDeclarations.push(VAPOR_EASYCOM_IMPORT)
        }
      }
      if (!code.includes('_resolveComponent')) {
        return
      }
      code = code.replace(
        /_resolveComponent\("(.+?)"(, true)?\)/g,
        (str, name) => {
          if (name && !name.startsWith('_')) {
            // 为了兼容性，仅处理dev模式
            if (!isDevX) {
              const result = buildInComponent()
              if (result) {
                return result
              }
            }
            if (isDevX && name.startsWith('v-uni-')) {
              name = name.replace('v-uni-', '')
            }
            const source = matchEasycom(name)
            if (source) {
              const isHelpers = source.includes('?uni_helpers')
              if (isHelpers) {
                const cssFilename = path.join(
                  process.env.UNI_MODULES_ENCRYPT_CACHE_DIR!,
                  path.relative(
                    process.env.UNI_INPUT_DIR,
                    source.replace(
                      '?uni_helpers',
                      '/components/' + name + '/' + name + '.css'
                    )
                  )
                )
                if (fs.existsSync(cssFilename)) {
                  importDeclarations.push(
                    `import "${normalizePath(cssFilename)}";`
                  )
                }
              }
              // 处理easycom组件优先级
              return genResolveEasycomCode(
                importDeclarations,
                str,
                addImportDeclaration(
                  importDeclarations,
                  `__easycom_${i++}`,
                  source,
                  isHelpers ? capitalize(camelize(name)) : ''
                )
              )
            }
            if (isDevX) {
              const result = buildInComponent()
              if (result) {
                return result
              }
            }
            function buildInComponent() {
              if (isWebBuiltInComponent(name)) {
                name = name.replace(COMPONENT_PREFIX, '')
                const local = `__syscom_${i++}`
                if (needCombineBuiltInCss) {
                  // 发行模式下，应该将内置组件css输出到入口css中
                  resolveBuiltInCssImport(name).forEach((cssImport) =>
                    buildInCssSet.add(cssImport)
                  )
                  return addImportDeclaration(
                    importDeclarations,
                    local,
                    H5_COMPONENTS_PATH,
                    capitalize(camelize(name))
                  )
                }
                return addBuiltInImportDeclaration(
                  importDeclarations,
                  local,
                  name
                )
              }
            }
          }
          return str
        }
      )
      if (importDeclarations.length) {
        code = importDeclarations.join('') + code
      }
      return {
        code,
        map: null,
      }
    },
  }
}

// 只处理真实调用，并移除 createAssetComponent 独有的尾部参数。
function replaceVaporAssetComponents(
  code: string,
  ast: Parameters<typeof walk>[0],
  isDevX: boolean
) {
  const edits: [number, number, string][] = []
  walk(ast, {
    enter(node) {
      const call = node as any
      if (
        call.type === 'CallExpression' &&
        call.callee.type === 'Identifier' &&
        call.callee.name === '_createAssetComponent' &&
        call.arguments[0]?.type === 'Literal' &&
        typeof call.arguments[0].value === 'string'
      ) {
        const first = call.arguments[0]
        const name = first.value as string
        const easycomName =
          isDevX && name.startsWith('v-uni-') ? name.slice(6) : name
        if (
          !name.startsWith('_') &&
          (isWebBuiltInComponent(name) || matchEasycom(easycomName))
        ) {
          edits.push([
            call.start,
            first.end,
            `__createEasycomComponent(_resolveComponent(${code.slice(
              first.start,
              first.end
            )})`,
          ])
          if (call.arguments.length > 5) {
            edits.push([call.arguments[4].end, call.end - 1, ''])
          }
        }
      }
    },
  })
  for (const [start, end, replacement] of edits.sort((a, b) => b[0] - a[0])) {
    code = code.slice(0, start) + replacement + code.slice(end)
  }
  return code
}

function resolveBuiltInCssImport(name: string) {
  const cssImports: string[] = []
  const isX = process.env.UNI_APP_X === 'true'
  if (isX && xBaseComponents.includes(name)) {
    cssImports.push(X_BASE_COMPONENTS_STYLE_PATH + name + '.css')
  } else if (baseComponents.includes(name)) {
    cssImports.push(BASE_COMPONENTS_STYLE_PATH + name + '.css')
  } else {
    cssImports.push(H5_COMPONENTS_STYLE_PATH + name + '.css')
  }

  const deps = componentDepsCss[name as keyof typeof componentDepsCss]
  deps && deps.forEach((dep) => cssImports.push(dep))
  return cssImports
}

function addBuiltInImportDeclaration(
  importDeclarations: string[],
  local: string,
  name: string
) {
  resolveBuiltInCssImport(name).forEach((cssImport) =>
    importDeclarations.push(`import '${cssImport}';`)
  )
  return addImportDeclaration(
    importDeclarations,
    local,
    H5_COMPONENTS_PATH,
    capitalize(camelize(name))
  )
}
