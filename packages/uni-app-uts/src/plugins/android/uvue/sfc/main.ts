import path from 'path'
import type { SFCBlock, SFCDescriptor } from '@vue/compiler-sfc'
import type {
  PluginContext,
  SourceMapInput,
  TransformPluginContext,
} from 'rollup'
import { type RawSourceMap, SourceMapConsumer } from 'source-map-js'
import type { EncodedSourceMap as TraceEncodedSourceMap } from '@jridgewell/trace-mapping'
import { TraceMap, eachMapping } from '@jridgewell/trace-mapping'
import type { EncodedSourceMap as GenEncodedSourceMap } from '@jridgewell/gen-mapping'
import {
  GenMapping,
  addMapping,
  fromMap,
  setSourceContent,
  toEncodedMap,
} from '@jridgewell/gen-mapping'
import {
  createResolveErrorMsg,
  createRollupError,
  genUTSClassName,
  getUTSEasyComAutoImports,
  normalizeEmitAssetFileName,
  normalizePath,
  offsetToStartAndEnd,
  parseCreateWorker,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import type { BindingMetadata, Position } from '@vue/compiler-core'
import type { ImportSpecifier } from 'es-module-lexer'
import { createDescriptor, setSrcDescriptor } from '../descriptorCache'
import { resolveScript } from './script'
import type { ResolvedOptions } from './index'
import {
  createResolveError,
  detectAutoImports,
  genAutoImportsCode,
  parseImports,
  wrapResolve,
} from '../../utils'
import { genDefaultScriptCode } from '../code/script'
import { processTemplate } from './compiler/script/normalScript'

export async function transformMain(
  code: string,
  filename: string,
  options: ResolvedOptions,
  pluginContext?: TransformPluginContext // 该 transformMain 方法被vuejs-core使用，编译框架内置组件了，此时不会传入pluginContext
) {
  const compiler = options.compiler || require('@vue/compiler-sfc')

  const { descriptor, errors } = createDescriptor(filename, code, {
    ...options,
    compiler,
  })

  const relativeFilename = descriptor.relativeFilename
  let easyComInstance = ''
  if (options.genDefaultAs) {
    const imports = getUTSEasyComAutoImports()['@/' + relativeFilename]
    if (imports && imports.length === 1) {
      easyComInstance = imports[0][1]
    }
  }
  if (errors.length) {
    if (pluginContext) {
      errors.forEach((error) =>
        pluginContext.error(createRollupError('', filename, error, code))
      )
    } else {
      console.error(errors)
    }
    return null
  }

  const className =
    process.env.UNI_COMPILE_TARGET === 'ext-api'
      ? // components/map/map.vue => UniMapRender
        genUTSClassName(path.basename(filename), options.classNamePrefix)
      : genUTSClassName(relativeFilename, options.classNamePrefix)

  // script
  const scriptOptions = {
    ...options,
    className,
  }
  let {
    code: scriptCode,
    map: scriptMap,
    bindingMetadata,
  } = await genScriptCode(descriptor, scriptOptions)

  let templatePreambleCode = ''
  let templatePreambleMap: RawSourceMap | undefined = undefined
  let templateCode = ''
  let templateMap: RawSourceMap | undefined = undefined

  if (options.componentType !== 'app') {
    // template
    const isInline = !!descriptor.scriptSetup
    if (!isInline) {
      const { code, map, preamble, preambleMap } = processTemplate(
        descriptor,
        {
          relativeFilename,
          bindingMetadata: bindingMetadata,
          rootDir: options.root,
          className,
          sourceMap: options.sourceMap,
        },
        pluginContext
      )
      templateCode = code
      templateMap = map
      templatePreambleCode = preamble || ''
      templatePreambleMap = preambleMap
    }
  }

  // styles
  const stylesCode = await genStyleCode(descriptor, pluginContext)

  let importWorkersCode: string[] = []
  if (scriptCode) {
    const { importCodes, code } = parseCreateWorker(scriptCode, 'app-android')
    importWorkersCode = importCodes
    scriptCode = code
  }
  const utsOutput: string[] = [
    scriptCode || genDefaultScriptCode(options.genDefaultAs),
    templateCode,
    easyComInstance
      ? `export type ${easyComInstance} = InstanceType<typeof __sfc__>;`
      : '',
    `/*${className}Styles*/\n`,
    ...importWorkersCode,
  ]

  if (templatePreambleCode) {
    utsOutput.push(templatePreambleCode)
  }

  let resolvedMap: RawSourceMap | undefined = undefined
  if (options.sourceMap) {
    // 如果开发者的script是空的，会产生一个默认的scriptCode代码，此时需要构造一个scriptMap
    if (templateMap && (scriptMap || scriptCode)) {
      // if the template is inlined into the main module (indicated by the presence
      // of templateMap), we need to concatenate the two source maps.
      let gen: GenMapping
      if (!scriptMap && scriptCode) {
        gen = new GenMapping({
          file: descriptor.relativeFilename,
          sourceRoot: '',
        })
        setSourceContent(gen, descriptor.relativeFilename, descriptor.source)
      } else {
        gen = fromMap(
          // version property of result.map is declared as string
          // but actually it is `3`
          scriptMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap
        )
      }

      const tracer = new TraceMap(
        // same above
        templateMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap
      )
      const offset = (scriptCode.match(/\r?\n/g)?.length ?? 0) + 1
      eachMapping(tracer, (m) => {
        if (m.source == null) return
        addMapping(gen, {
          source: m.source,
          original: { line: m.originalLine, column: m.originalColumn },
          generated: {
            line: m.generatedLine + offset,
            column: m.generatedColumn,
          },
        })
      })

      // same above
      resolvedMap = toEncodedMap(gen) as Omit<
        GenEncodedSourceMap,
        'version'
      > as RawSourceMap
      // if this is a template only update, we will be reusing a cached version
      // of the main module compile result, which has outdated sourcesContent.
      // resolvedMap.sourcesContent = templateMap.sourcesContent
    } else {
      // if one of `scriptMap` and `templateMap` is empty, use the other one
      resolvedMap = scriptMap ?? templateMap
    }
  }

  // handle TS transpilation
  let utsCode = utsOutput.filter(Boolean).join('\n')

  if (templatePreambleCode && templatePreambleMap && pluginContext) {
    // 尝试解析模板中的import，用于检查错误路径，比如<image src="static/logo.png" />
    await parseImports(
      templatePreambleCode,
      createTryResolve(
        filename,
        pluginContext.resolve,
        templatePreambleMap as RawSourceMap,
        // 仅需要再解析script中的import，template上边已经加入了
        (source) => source.includes('/.uvue/') || source.includes('/.tsc/')
      )
    )
  }

  const jsCodes = [templatePreambleCode]

  // 处理自动导入(主要是easyCom的组件类型)
  const { matchedImports } = await detectAutoImports(
    utsCode,
    descriptor.filename,
    easyComInstance ? [easyComInstance] : []
  )
  if (matchedImports.length) {
    const autoImportCode = genAutoImportsCode(matchedImports)
    if (autoImportCode) {
      utsCode += '\n' + autoImportCode
      // 给 script 增加自动导入，让下边的 jsCode 可以 parse 到
      scriptCode += '\n' + autoImportCode
    }
  }

  if (resolvedMap && pluginContext) {
    pluginContext.emitFile({
      type: 'asset',
      fileName: normalizeEmitAssetFileName(relativeFilename) + '.map',
      source: JSON.stringify(resolvedMap),
    })
    if (process.env.UNI_APP_X_TSC !== 'true') {
      utsCode += `
//# sourceMappingURL=${path.basename(
        normalizeEmitAssetFileName(relativeFilename)
      )}.map`
    }
  }

  if (scriptCode) {
    jsCodes.push(
      await parseImports(
        scriptCode,
        resolvedMap && pluginContext
          ? createTryResolve(
              filename,
              pluginContext.resolve,
              resolvedMap,
              // 仅需要再解析script中的import，template上边已经加入了
              (source) =>
                source.includes('/.uvue/') || source.includes('/.tsc/')
            )
          : undefined
      )
    )
    pluginContext?.emitFile({
      type: 'asset',
      fileName: normalizeEmitAssetFileName(relativeFilename),
      source: utsCode,
    })
  }
  if (stylesCode) {
    jsCodes.push(stylesCode)
  }
  jsCodes.push(`export default "${className}"
${easyComInstance ? `export const ${easyComInstance} = {}` : ''}`)
  let jsCode = jsCodes.filter(Boolean).join('\n')
  return {
    code: processJsCodeImport(jsCode),
    map: {
      mappings: '',
    } as SourceMapInput,
    // 这些都是 vuejs-core 需要的
    errors,
    uts: utsCode,
    descriptor,
  }
}

function processJsCodeImport(jsCode: string) {
  if (jsCode.includes('@/node-modules/@dcloudio/uni-components/lib-x')) {
    return jsCode.replaceAll(
      '@/node-modules/@dcloudio/uni-components/lib-x',
      normalizePath(resolveComponentsLibPath())
    )
  }
  return jsCode
}

async function genScriptCode(
  descriptor: SFCDescriptor,
  options: ResolvedOptions & { genDefaultAs?: string }
): Promise<{
  code: string
  map: RawSourceMap | undefined
  bindingMetadata?: BindingMetadata
}> {
  let scriptCode = genDefaultScriptCode(options.genDefaultAs)
  let map: RawSourceMap | undefined

  const script = resolveScript(descriptor, options)
  if (script) {
    scriptCode = script.content
    map = script.map
  }
  return {
    code: scriptCode,
    map,
    bindingMetadata: script?.bindings,
  }
}

async function genStyleCode(
  descriptor: SFCDescriptor,
  pluginContext?: PluginContext
) {
  let stylesCode = ``
  if (descriptor.styles.length) {
    for (let i = 0; i < descriptor.styles.length; i++) {
      const style = descriptor.styles[i]
      if (style.src && pluginContext) {
        await linkSrcToDescriptor(style.src, descriptor, pluginContext)
      }
      const src = style.src || descriptor.filename
      // do not include module in default query, since we use it to indicate
      // that the module needs to export the modules json
      const attrsQuery = attrsToQuery(style.attrs, 'css')
      style.scoped = false // fixed by xxxxxx 强制不scoped
      const srcQuery = style.src
        ? style.scoped
          ? `&src=${descriptor.id}`
          : '&src=true'
        : ''
      const directQuery = ``
      const scopedQuery = style.scoped ? `&scoped=${descriptor.id}` : ``
      const query = `?vue&type=style&index=${i}${srcQuery}${directQuery}${scopedQuery}`
      const styleRequest = src + query + attrsQuery

      stylesCode += `\nimport ${JSON.stringify(styleRequest)}`
    }
    // TODO SSR critical CSS collection
  }

  return stylesCode
}

/**
 * For blocks with src imports, it is important to link the imported file
 * with its owner SFC descriptor so that we can get the information about
 * the owner SFC when compiling that file in the transform phase.
 */
async function linkSrcToDescriptor(
  src: string,
  descriptor: SFCDescriptor,
  pluginContext: PluginContext
) {
  const srcFile =
    (await pluginContext.resolve(src, descriptor.filename))?.id || src
  // #1812 if the src points to a dep file, the resolved id may contain a
  // version query.
  setSrcDescriptor(srcFile.replace(/\?.*$/, ''), descriptor)
}

// these are built-in query parameters so should be ignored
// if the user happen to add them as attrs
const ignoreList = [
  'id',
  'index',
  'src',
  'type',
  'lang',
  'module',
  'scoped',
  'generic',
]

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

function createTryResolve(
  importer: string,
  resolve: PluginContext['resolve'],
  resolvedMap: RawSourceMap,
  ignore?: (source: string) => boolean
) {
  return async (source: string, code: string, { ss, se }: ImportSpecifier) => {
    if (ignore && ignore(source)) {
      return false
    }
    const resolved = await wrapResolve(resolve)(source, importer)
    if (!resolved) {
      const { start, end } = offsetToStartAndEnd(code, ss, se)
      const consumer = new SourceMapConsumer(resolvedMap)
      const startPos = consumer.originalPositionFor({
        line: start.line,
        column: start.column,
      })
      if (
        startPos.line != null &&
        startPos.column != null &&
        startPos.source != null
      ) {
        const endPos = consumer.originalPositionFor({
          line: end.line,
          column: end.column,
        })
        if (endPos.line != null && endPos.column != null) {
          startPos.column = startPos.column + 1
          endPos.column = endPos.column + 1
          throw createResolveError(
            consumer.sourceContentFor(startPos.source) ?? '',
            createResolveErrorMsg(source, importer),
            startPos as unknown as Position,
            endPos as unknown as Position
          )
        }
      }
    }
  }
}
