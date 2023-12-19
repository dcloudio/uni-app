import path from 'path'
import fs from 'fs-extra'

import type { Plugin } from 'vite'
import {
  MagicString,
  type SFCBlock,
  type SFCDescriptor,
  type SFCParseResult,
} from '@vue/compiler-sfc'
import type { SourceMapInput, TransformPluginContext } from 'rollup'

import { isString } from '@vue/shared'
import {
  AutoImportOptions,
  createRollupError,
  matchEasycom,
  normalizePath,
  parseUTSComponent,
  parseVueRequest,
  removeExt,
  resolveAppVue,
  generateCodeFrame,
  createResolveErrorMsg,
} from '@dcloudio/uni-cli-shared'

import type { RawSourceMap } from 'source-map-js'

import { addMapping, fromMap, toEncodedMap } from '@jridgewell/gen-mapping'
import {
  TraceMap,
  eachMapping,
  EncodedSourceMap,
} from '@jridgewell/trace-mapping'
import { RootNode } from '@vue/compiler-core'

import {
  ResolvedOptions,
  createDescriptor,
  getDescriptor,
  getResolvedOptions,
  getSrcDescriptor,
} from './descriptorCache'
import {
  addAutoImports,
  addExtApiComponents,
  createResolveError,
  createTryResolve,
  genClassName,
  initAutoImportOnce,
  isVue,
  parseImports,
  parseUTSImportFilename,
  parseUTSRelativeFilename,
  wrapResolve,
} from '../utils'
import { genScript } from './code/script'
import { genTemplate } from './code/template'
import { genJsStylesCode, genStyle, transformStyle } from './code/style'
import { genComponentPublicInstanceImported } from './compiler/utils'
import { ImportItem } from './compiler/transform'
import { transformMain } from './sfc/main'

export function uniAppUVuePlugin(opts: {
  autoImportOptions?: AutoImportOptions
}): Plugin {
  const options = getResolvedOptions()
  const appVue = resolveAppVue(process.env.UNI_INPUT_DIR)
  function isAppVue(id: string) {
    return normalizePath(id) === appVue
  }
  function normalizeEasyComSource(source: string) {
    // 把源码source调整为.uvue目录
    return parseUTSImportFilename(source)
  }
  const autoImport = initAutoImportOnce(opts.autoImportOptions)
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
        if (process.env.UNI_APP_X_SETUP === 'true') {
          return transformMain(code, filename, options, this)
        }
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
            this.error(createRollupError('vue', filename, error, code))
          )
          return null
        }
        if (process.env.UNI_APP_X_TSC === 'true') {
          return {
            code: uts,
            map: sourceMap as SourceMapInput,
          }
        }
        const fileName = parseUTSRelativeFilename(filename)
        this.emitFile({
          type: 'asset',
          fileName,
          source: (await autoImport.transform!(uts!, id)).code,
        })
        if (sourceMap) {
          this.emitFile({
            type: 'asset',
            fileName: removeExt(fileName) + '.map',
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
  code = code.replace(/\r\n/g, '\n')
  // prev descriptor is only set and used for hmr
  const { descriptor, errors } = createDescriptor(filename, code, options)

  if (errors.length) {
    return { errors, descriptor }
  }
  const isApp = isAppVue(filename)
  const relativeFileName = normalizePath(path.relative(options.root, filename))
  const className = genClassName(relativeFileName, options.classNamePrefix)
  let templateCode = ''
  let templateImportsCode = ''
  let templateImportEasyComponentsCode = ''
  let templateImportUTSComponentsCode = ''
  const needSourceMap = process.env.UNI_APP_X_TEMPLATE_SOURCEMAP
    ? true
    : process.env.NODE_ENV !== 'production'
  let templateSourceMap: RawSourceMap | undefined
  const templateStartLine = descriptor.template?.loc.start.line ?? 0
  if (!isApp) {
    const inputRoot = normalizePath(options.root)
    const templateResult = genTemplate(descriptor, {
      rootDir: options.root,
      targetLanguage: options.targetLanguage as any,
      mode: 'module',
      filename: relativeFileName,
      className: className,
      prefixIdentifiers: true,
      // 方便测试，build模式也提供sourceMap
      // sourceMap: false,
      sourceMap: needSourceMap,
      matchEasyCom: (tag, uts) => {
        const source = matchEasycom(tag)
        if (uts && source) {
          if (source.startsWith(inputRoot)) {
            return '@/' + normalizePath(path.relative(inputRoot, source))
          }
          return normalizeEasyComSource(source)
        }
        return source
      },
      onWarn(warning) {
        console.warn('warning: ' + warning.message)
        if (warning.loc) {
          const start = warning.loc.start
          console.log(
            'at ' +
              relativeFileName +
              ':' +
              (start.line + templateStartLine - 1) +
              ':' +
              (start.column - 1)
          )
          console.log(
            generateCodeFrame(code, {
              line: start.line + templateStartLine - 1,
              column: start.column - 1,
            }).replace(/\t/g, ' ')
          )
        }
      },
      onError(error) {
        console.error('error: ' + error.message)
        if (error.loc) {
          const start = error.loc.start
          console.log(
            'at ' +
              relativeFileName +
              ':' +
              (start.line + templateStartLine - 1) +
              ':' +
              (start.column - 1)
          )
          console.log(
            generateCodeFrame(code, {
              line: start.line + templateStartLine - 1,
              column: start.column - 1,
            }).replace(/\t/g, ' ')
          )
        }
      },
      parseUTSComponent,
    })
    if (pluginContext && templateResult.ast) {
      await checkTemplateImports(
        templateResult.ast,
        async (importItem: ImportItem) => {
          if (isString(importItem.exp)) {
            return
          }
          const resolved = await wrapResolve(pluginContext.resolve)(
            importItem.path,
            filename
          )
          if (!resolved) {
            const { start, end } = importItem.exp.loc
            start.line = start.line + templateStartLine - 1
            end.line = end.line + templateStartLine - 1
            throw createResolveError(
              descriptor.source,
              createResolveErrorMsg(importItem.path, filename),
              start,
              end
            )
          }
        }
      )
    }

    Object.keys(templateResult.easyComponentAutoImports).forEach((source) => {
      addAutoImports(source, templateResult.easyComponentAutoImports[source])
    })
    templateCode = templateResult.code
    templateImportEasyComponentsCode =
      templateResult.importEasyComponents.join('\n')
    templateImportUTSComponentsCode =
      templateResult.importUTSComponents.join('\n')
    templateImportsCode = templateResult.imports.join('\n')
    templateSourceMap = templateResult.map
    if (process.env.NODE_ENV === 'production') {
      addExtApiComponents(
        templateResult.elements.filter((element) => {
          // 如果是UTS原生组件，则无需记录摇树
          if (parseUTSComponent(element, 'kotlin')) {
            return false
          }
          return true
        })
      )
    }
  }
  // 生成 script 文件
  // console.log(descriptor.script?.loc)
  const utsCode =
    genScript(descriptor, { filename: className }) +
    templateCode +
    '\n' +
    genStyle(descriptor, { className }) +
    '\n'

  let jsCodes = [
    templateImportEasyComponentsCode,
    templateImportUTSComponentsCode,
    templateImportsCode,
  ]
  const content = descriptor.script?.content
  if (content) {
    jsCodes.push(
      await parseImports(
        content,
        pluginContext
          ? createTryResolve(
              filename,
              pluginContext.resolve.bind(pluginContext),
              descriptor.script?.loc.start,
              descriptor.source
            )
          : undefined
      )
    )
  }
  if (descriptor.styles.length) {
    jsCodes.push(await genJsStylesCode(descriptor, pluginContext!))
  }
  jsCodes.push(`export default "${className}"
export const ${genComponentPublicInstanceImported(
    options.root,
    relativeFileName
  )} = {}`)
  const jsCode = jsCodes.filter(Boolean).join('\n')
  return {
    errors: [],
    uts: utsCode,
    js: jsCode,
    descriptor,
    sourceMap: needSourceMap
      ? createSourceMap(
          descriptor.script?.loc.end.line ?? 0,
          templateStartLine,
          createVueSourceMap(relativeFileName, code, descriptor),
          templateSourceMap
        )
      : undefined,
  }
}

function createVueSourceMap(
  fileName: string,
  code: string,
  descriptor: SFCDescriptor
) {
  const str = new MagicString(code)
  if (descriptor.script) {
    const start = descriptor.script.loc.start
    const end = descriptor.script.loc.end
    str.overwrite(0, start.offset, '\n'.repeat(start.line - 1))
    str.remove(end.offset, code.length)
  }
  return str.generateMap({
    hires: true,
    source: fileName,
    includeContent: true,
  }) as unknown as RawSourceMap
}

function createSourceMap(
  scriptCodeOffset: number,
  templateCodeOffset: number,
  vueMap: RawSourceMap,
  templateMap?: RawSourceMap
) {
  if (!templateMap) {
    return vueMap
  }
  const gen = fromMap(
    // version property of result.map is declared as string
    // but actually it is `3`
    vueMap as Omit<RawSourceMap, 'version'> as EncodedSourceMap
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

async function checkTemplateImports(
  ast: RootNode,
  tryResolve: (importItem: ImportItem) => Promise<void>
) {
  for (let importItem of ast.imports) {
    if (!isString(importItem.exp)) {
      await tryResolve(importItem)
    }
  }
}
