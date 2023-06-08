import path from 'path'
import fs from 'fs-extra'

import type { Plugin } from 'vite'
import type { SFCBlock, SFCDescriptor, SFCParseResult } from '@vue/compiler-sfc'
import type { TransformPluginContext } from 'rollup'

import { isString } from '@vue/shared'
import {
  matchEasycom,
  normalizePath,
  parseUTSComponent,
  parseVueRequest,
} from '@dcloudio/uni-cli-shared'

import {
  ResolvedOptions,
  createDescriptor,
  getDescriptor,
  getSrcDescriptor,
} from './descriptorCache'
import { createRollupError } from './error'
import {
  genClassName,
  isVue,
  parseImports,
  parseUTSImportFilename,
  parseUTSRelativeFilename,
} from '../utils'
import { genScript } from './code/script'
import { genTemplate } from './code/template'
import { genJsStylesCode, genStyle, transformStyle } from './code/style'

function resolveAppVue(inputDir: string) {
  const appUVue = path.resolve(inputDir, 'app.uvue')
  if (fs.existsSync(appUVue)) {
    return normalizePath(appUVue)
  }
  return normalizePath(path.resolve(inputDir, 'App.vue'))
}

export function uniAppUVuePlugin(): Plugin {
  const options: ResolvedOptions = {
    root: process.env.UNI_INPUT_DIR,
    sourceMap: false,
    // eslint-disable-next-line no-restricted-globals
    compiler: require('@vue/compiler-sfc'),
    targetLanguage: process.env.UNI_UTS_TARGET_LANGUAGE,
  }

  const appVue = resolveAppVue(process.env.UNI_INPUT_DIR)
  function isAppVue(id: string) {
    return normalizePath(id) === appVue
  }
  function normalizeEasyComSource(source: string) {
    // 把源码source调整为.uvue目录
    return parseUTSImportFilename(source)
  }
  return {
    name: 'uni:app-uvue',
    apply: 'build',
    async resolveId(id) {
      // serve sub-part requests (*?vue) as virtual modules
      if (parseVueRequest(id).query.vue) {
        return id
      }
    },

    load(id) {
      const { filename, query } = parseVueRequest(id)
      // select corresponding block for sub-part virtual modules
      if (query.vue) {
        if (query.src) {
          return fs.readFileSync(filename, 'utf-8')
        }
        const descriptor = getDescriptor(filename, options)!
        let block: SFCBlock | null | undefined
        if (query.type === 'style') {
          block = descriptor.styles[query.index!]
        } else if (query.index != null) {
          block = descriptor.customBlocks[query.index]
        }
        if (block) {
          return {
            code: block.content,
            map: block.map as any,
          }
        }
      }
    },
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (!isVue(filename)) {
        return
      }
      if (!query.vue) {
        // main request
        const { errors, uts, js } = await transformVue(
          code,
          filename,
          options,
          this,
          isAppVue,
          normalizeEasyComSource
        )
        if (errors.length) {
          errors.forEach((error) =>
            this.error(createRollupError(filename, error))
          )
          return null
        }
        this.emitFile({
          type: 'asset',
          fileName: parseUTSRelativeFilename(filename),
          source: uts,
        })
        return {
          code: js,
        }
      } else {
        // sub block request
        const descriptor = query.src
          ? getSrcDescriptor(filename)!
          : getDescriptor(filename, options)!

        if (query.type === 'style') {
          return transformStyle(
            code,
            descriptor,
            Number(query.index),
            options,
            this,
            filename
          )
        }
      }
    },
    generateBundle(_, bundle) {
      // 遍历vue文件，填充style，尽量减少全局变量
      Object.keys(bundle).forEach((name) => {
        const file = bundle[name]
        if (
          file &&
          file.type === 'asset' &&
          file.fileName !== 'App.vue' &&
          isVue(file.fileName) &&
          isString(file.source)
        ) {
          const fileName = normalizePath(file.fileName)
          const classNameComment = `/*${genClassName(
            fileName,
            options.classNamePrefix
          )}Styles*/`
          if (file.source.includes(classNameComment)) {
            const styleAssetName = fileName + '.style.uts'
            const styleAsset = bundle[styleAssetName]
            if (
              styleAsset &&
              styleAsset.type === 'asset' &&
              isString(styleAsset.source)
            ) {
              file.source = file.source.replace(
                classNameComment,
                styleAsset.source.replace('export ', '')
              )
              delete bundle[styleAssetName]
            }
          }
        }
      })
    },
  }
}

interface TransformVueResult {
  errors: SFCParseResult['errors']
  uts?: string
  js?: string
  descriptor: SFCDescriptor
}

export async function transformVue(
  code: string,
  filename: string,
  options: ResolvedOptions,
  pluginContext: TransformPluginContext | undefined,
  isAppVue: (id: string) => boolean = () => false,
  normalizeEasyComSource: (source: string) => string
): Promise<TransformVueResult> {
  if (!options.compiler) {
    options.compiler = require('@vue/compiler-sfc')
  }
  // prev descriptor is only set and used for hmr
  const { descriptor, errors } = createDescriptor(filename, code, options)

  if (errors.length) {
    return { errors, descriptor }
  }
  const isApp = isAppVue(filename)
  const fileName = path.relative(options.root, filename)
  const className = genClassName(fileName, options.classNamePrefix)
  let templateCode = ''
  let templateImportEasyComponentsCode = ''
  let templateImportUTSComponentsCode = ''
  if (!isApp) {
    const templateResult = genTemplate(descriptor, {
      targetLanguage: options.targetLanguage as any,
      mode: 'function',
      filename: className,
      prefixIdentifiers: true,
      sourceMap: true,
      matchEasyCom: (tag, uts) => {
        const source = matchEasycom(tag)
        if (uts && source) {
          return normalizeEasyComSource(source)
        }
        return source
      },
      parseUTSComponent: parseUTSComponent,
    })
    templateCode = templateResult.code
    templateImportEasyComponentsCode =
      templateResult.importEasyComponents.join('\n')
    templateImportUTSComponentsCode =
      templateResult.importUTSComponents.join('\n')
  }
  // 生成 script 文件
  let utsCode =
    genScript(descriptor, { filename: className }) +
    '\n' +
    genStyle(descriptor, { filename: fileName, className }) +
    '\n'
  utsCode += templateCode
  let jsCode =
    templateImportEasyComponentsCode + '\n' + templateImportUTSComponentsCode
  const content = descriptor.script?.content
  if (content) {
    jsCode += await parseImports(content)
  }
  if (descriptor.styles.length) {
    jsCode += '\n' + (await genJsStylesCode(descriptor, pluginContext!))
  }
  jsCode += `\nexport default "${className}"`
  return {
    errors: [],
    uts: utsCode,
    js: jsCode,
    descriptor,
  }
}
