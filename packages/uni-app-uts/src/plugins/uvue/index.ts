import path from 'path'
import fs from 'fs-extra'

import type { Plugin } from 'vite'
import {
  MagicString,
  type SFCBlock,
  type SFCDescriptor,
  type SFCParseResult,
} from '@vue/compiler-sfc'
import type { TransformPluginContext } from 'rollup'

import { isString } from '@vue/shared'
import {
  matchEasycom,
  normalizePath,
  parseUTSComponent,
  parseVueRequest,
  removeExt,
} from '@dcloudio/uni-cli-shared'

import type { RawSourceMap } from 'source-map-js'

import { addMapping, fromMap, toEncodedMap } from '@jridgewell/gen-mapping'
import {
  TraceMap,
  eachMapping,
  EncodedSourceMap,
} from '@jridgewell/trace-mapping'

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
  const appUVue = path.resolve(inputDir, 'App.uvue')
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
        const { errors, uts, js, sourceMap } = await transformVue(
          code,
          filename,
          options,
          this,
          isAppVue,
          normalizeEasyComSource
        )
        if (errors.length) {
          errors.forEach((error) =>
            this.error(createRollupError(filename, error, code))
          )
          return null
        }
        const fileName = parseUTSRelativeFilename(filename)
        this.emitFile({
          type: 'asset',
          fileName,
          source: uts,
        })
        if (sourceMap) {
          this.emitFile({
            type: 'asset',
            fileName: removeExt(fileName) + '.template.map',
            source: JSON.stringify(sourceMap),
          })
        }
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
  sourceMap?: RawSourceMap
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
  const fileName = normalizePath(path.relative(options.root, filename))
  const className = genClassName(fileName, options.classNamePrefix)
  let templateCode = ''
  let templateImportEasyComponentsCode = ''
  let templateImportUTSComponentsCode = ''
  const needSourceMap = process.env.UNI_APP_X_TEMPLATE_SOURCEMAP
    ? true
    : process.env.NODE_ENV !== 'production'
  let templateSourceMap: RawSourceMap | undefined
  if (!isApp) {
    const templateResult = genTemplate(descriptor, {
      targetLanguage: options.targetLanguage as any,
      mode: 'function',
      filename: fileName,
      className: className,
      prefixIdentifiers: true,
      // 方便测试，build模式也提供sourceMap
      // sourceMap: false,
      sourceMap: needSourceMap,
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
    templateSourceMap = templateResult.map
  }
  // 生成 script 文件
  // console.log(descriptor.script?.loc)
  const utsCode =
    genScript(descriptor, { filename: className }) +
    templateCode +
    '\n' +
    genStyle(descriptor, { filename: fileName, className }) +
    '\n'

  let jsCode =
    templateImportEasyComponentsCode + templateImportUTSComponentsCode
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
    sourceMap: needSourceMap
      ? createSourceMap(
          descriptor.script?.loc.end.line ?? 0,
          descriptor.template?.loc.start.line ?? 0,
          new MagicString(code).generateMap({
            hires: true,
            source: fileName,
            includeContent: true,
          }) as unknown as RawSourceMap,
          templateSourceMap
        )
      : undefined,
  }
}

function createSourceMap(
  scriptCodeOffset: number,
  templateCodeOffset: number,
  scriptMap: RawSourceMap,
  templateMap?: RawSourceMap
) {
  if (!templateMap) {
    return scriptMap
  }
  const gen = fromMap(
    // version property of result.map is declared as string
    // but actually it is `3`
    scriptMap as Omit<RawSourceMap, 'version'> as EncodedSourceMap
  )
  const tracer = new TraceMap(
    // same above
    templateMap as Omit<RawSourceMap, 'version'> as EncodedSourceMap
  )
  // const offset = (scriptCode.match(/\r?\n/g)?.length ?? 0) + 1
  eachMapping(tracer, (m) => {
    if (m.source == null) return
    addMapping(gen, {
      source: m.source,
      original: {
        line: m.originalLine + templateCodeOffset - 1,
        column: m.originalColumn,
      },
      generated: {
        line: m.generatedLine + scriptCodeOffset,
        column: m.generatedColumn,
      },
    })
  })

  return toEncodedMap(gen) as unknown as RawSourceMap
}
