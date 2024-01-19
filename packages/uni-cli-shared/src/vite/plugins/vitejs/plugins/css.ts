import fs from 'fs-extra'
import path from 'path'
import glob from 'fast-glob'
import colors from 'picocolors'
import postcssrc from 'postcss-load-config'
import { dataToEsm } from '@rollup/pluginutils'
import {
  EmittedAsset,
  ExistingRawSourceMap,
  PluginContext,
  RollupError,
  SourceMapInput,
} from 'rollup'
import { RawSourceMap } from '@ampproject/remapping'
import type * as PostCSS from 'postcss'
import {
  // createDebugger,
  isExternalUrl,
  asyncReplace,
  cleanUrl,
  generateCodeFrame,
  isDataUrl,
  isObject,
  normalizePath,
  processSrcSet,
  combineSourcemaps,
} from '../utils'
import { Plugin } from '../plugin'
import { ResolvedConfig } from '../config'
import { ResolveFn, ViteDevServer } from '../'
import { fileToUrl, assetUrlRE, getAssetFilename } from './asset'
import MagicString from 'magic-string'
import * as Postcss from 'postcss'
import type Sass from 'sass'
// We need to disable check of extraneous import which is buggy for stylus,
// and causes the CI tests fail, see: https://github.com/vitejs/vite/pull/2860
import type Stylus from 'stylus'
import type Less from 'less'
import type { Alias } from 'types/alias'
import { isArray, isFunction, isString } from '@vue/shared'
import { preCss, preNVueCss } from '../../../../preprocess'
import { filterPrefersColorScheme } from '../../../../postcss/plugins/uniapp'
import { emptyCssComments } from '../cleanString'

import { PAGES_JSON_JS, PAGES_JSON_UTS } from '../../../../constants'
import { createRollupError } from '../../../utils/utils'
import { createCompilerError } from '@vue/compiler-core'
import { createResolveErrorMsg } from '../../../../utils'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { parseVueRequest } from '../../../utils'
// const debug = createDebugger('vite:css')

export interface CSSOptions {
  /**
   * https://github.com/css-modules/postcss-modules
   */
  modules?: CSSModulesOptions | false
  preprocessorOptions?: Record<string, any>
  postcss?:
    | string
    | (Postcss.ProcessOptions & {
        plugins?: Postcss.Plugin[]
      })
}

export interface CSSModulesOptions {
  getJSON?: (
    cssFileName: string,
    json: Record<string, string>,
    outputFileName: string
  ) => void
  scopeBehaviour?: 'global' | 'local'
  globalModulePaths?: RegExp[]
  generateScopedName?:
    | string
    | ((name: string, filename: string, css: string) => string)
  hashPrefix?: string
  /**
   * default: null
   */
  localsConvention?:
    | 'camelCase'
    | 'camelCaseOnly'
    | 'dashes'
    | 'dashesOnly'
    | null
}

const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
export const cssLangRE = new RegExp(cssLangs)
const cssModuleRE = new RegExp(`\\.module${cssLangs}`)
const directRequestRE = /(\?|&)direct\b/
export const commonjsProxyRE = /\?commonjs-proxy/
const varRE = /^var\(/i

const enum PreprocessLang {
  less = 'less',
  sass = 'sass',
  scss = 'scss',
  styl = 'styl',
  stylus = 'stylus',
}
const enum PureCssLang {
  css = 'css',
}
type CssLang = keyof typeof PureCssLang | keyof typeof PreprocessLang

export const isCSSRequest = (request: string): boolean =>
  cssLangRE.test(request) && !directRequestRE.test(request)

export const isDirectCSSRequest = (request: string): boolean =>
  cssLangRE.test(request) && directRequestRE.test(request)

const cssModulesCache = new WeakMap<
  ResolvedConfig,
  Map<string, Record<string, string>>
>()

const postcssConfigCache = new WeakMap<
  ResolvedConfig,
  PostCSSConfigResult | null
>()

function wrapResolve(
  resolve: ResolveFn,
  code: string,
  source?: PostCSS.Source,
  getDescriptor?: (filename: string) => SFCDescriptor | undefined
): ResolveFn {
  if (!source) {
    return resolve
  }
  return async (
    id: string,
    importer?: string,
    aliasOnly?: boolean,
    ssr?: boolean
  ) => {
    try {
      return await resolve(id, importer, aliasOnly, ssr)
    } catch (e) {
      if (importer && getDescriptor) {
        const { filename, query } = parseVueRequest(importer)
        // 仅处理 vue | uvue
        if (
          query.vue &&
          query.type === 'style' &&
          'index' in query &&
          /\.[u]vue/.test(filename)
        ) {
          const descriptor = getDescriptor(importer.split('?')[0])
          if (descriptor) {
            const styleBlock = descriptor.styles[query.index!]
            if (styleBlock) {
              code = descriptor.source
              const offsetLine = styleBlock.loc.start.line - 1
              source.start!.line = source.start!.line + offsetLine
              source.end!.line = source.end!.line + offsetLine
            }
          }
        }
      }
      const error = createRollupError(
        '',
        importer || '',
        createCompilerError(
          0,
          { start: source.start!, end: source.end!, source: '' },
          { 0: createResolveErrorMsg(id, importer!) }
        ),
        code
      )
      ;(error as any).line = source.start!.line
      ;(error as any).column = source.start!.column
      throw error
    }

    return
  }
}
/**
 * Plugin applied before user plugins
 */
export function cssPlugin(
  config: ResolvedConfig,
  options: {
    isAndroidX: boolean
    getDescriptor?(filename: string): SFCDescriptor | undefined
  } = { isAndroidX: false }
): Plugin {
  let server: ViteDevServer
  let moduleCache: Map<string, Record<string, string>>

  const resolveUrl = config.createResolver({
    preferRelative: true,
    tryIndex: false,
    extensions: [],
  })
  const atImportResolvers = createCSSResolvers(config)

  return {
    name: 'vite:css',

    configureServer(_server) {
      server = _server
    },

    buildStart() {
      // Ensure a new cache for every build (i.e. rebuilding in watch mode)
      moduleCache = new Map<string, Record<string, string>>()
      cssModulesCache.set(config, moduleCache)
    },

    async transform(raw, id) {
      if (!cssLangRE.test(id) || commonjsProxyRE.test(id)) {
        return
      }

      const urlReplacer: CssUrlReplacer = async (url, importer, source) => {
        if (url.startsWith('/') && !url.startsWith('//')) {
          // /static/logo.png => @/static/logo.png
          url = '@' + url
        }
        const resolved = await wrapResolve(
          resolveUrl,
          source?.input.css || raw,
          source,
          options.getDescriptor
        )(url, importer)
        if (resolved) {
          return fileToUrl(
            resolved,
            config,
            options?.isAndroidX
              ? ({
                  emitFile(emittedFile: EmittedAsset) {
                    // 直接写入目标目录
                    fs.outputFileSync(
                      path.resolve(
                        process.env.UNI_OUTPUT_DIR,
                        emittedFile.fileName!
                      ),
                      emittedFile.source!
                    )
                  },
                } as PluginContext)
              : this,
            true
          )
        }
        return url
      }

      const {
        code: css,
        modules,
        deps,
      } = await compileCSS(
        id,
        raw,
        config,
        urlReplacer,
        atImportResolvers,
        server
      )
      if (modules) {
        moduleCache.set(id, modules)
      }

      // track deps for build watch mode
      if (config.command === 'build' && config.build.watch && deps) {
        for (const file of deps) {
          this.addWatchFile(file)
        }
      }

      return {
        code: css,
        // TODO CSS source map
        map: { mappings: '' },
      }
    },
  }
}

function findCssModuleIds(
  this: PluginContext,
  moduleId: string,
  includeComponentCss: boolean = true,
  cssModuleIds?: Set<string>,
  seen?: Set<string>
) {
  if (!cssModuleIds) {
    cssModuleIds = new Set<string>()
  }
  if (!seen) {
    seen = new Set<string>()
  }
  if (seen.has(moduleId)) {
    return cssModuleIds
  }
  seen.add(moduleId)
  const moduleInfo = this.getModuleInfo(moduleId)
  if (moduleInfo) {
    moduleInfo.importedIds.forEach((id) => {
      if (id.includes(PAGES_JSON_JS) || id.includes(PAGES_JSON_UTS)) {
        // 查询main.js时，需要忽略pages.json.js，否则会把所有页面样式加进来
        return
      }
      if (cssLangRE.test(id) && !commonjsProxyRE.test(id)) {
        cssModuleIds!.add(id)
      } else {
        if (
          !includeComponentCss &&
          (id.includes('.vue') || id.includes('.uvue') || id.includes('.nvue'))
        ) {
          // 不包含组件样式，不需要继续查找，uni x中不需要包含
          return
        }
        findCssModuleIds.call(this, id, includeComponentCss, cssModuleIds, seen)
      }
    })
  }
  return cssModuleIds
}

/**
 * Plugin applied after user plugins
 */
export function cssPostPlugin(
  config: ResolvedConfig,
  {
    platform,
    isJsCode,
    chunkCssFilename,
    chunkCssCode,
    includeComponentCss,
  }: {
    platform: UniApp.PLATFORM
    isJsCode?: boolean
    chunkCssFilename: (id: string) => string | void
    chunkCssCode: (
      filename: string,
      cssCode: string
    ) => Promise<string> | string
    includeComponentCss?: boolean
  }
): Plugin {
  // styles initialization in buildStart causes a styling loss in watch
  const styles: Map<string, string> = new Map<string, string>()
  let cssChunks: Map<string, string[]>
  return {
    name: 'vite:css-post',
    buildStart() {
      cssChunks = new Map<string, string[]>()
    },
    async transform(css, id) {
      if (!cssLangRE.test(id) || commonjsProxyRE.test(id)) {
        return
      }
      const modules = cssModulesCache.get(config)!.get(id)
      const modulesCode =
        modules && dataToEsm(modules, { namedExports: true, preferConst: true })

      // build CSS handling ----------------------------------------------------
      styles.set(id, css)
      return {
        code: modulesCode || '',
        map: { mappings: '' },
        // avoid the css module from being tree-shaken so that we can retrieve
        // it in renderChunk()
        moduleSideEffects: 'no-treeshake',
      }
    },
    async renderChunk(_code, chunk, _opts) {
      const id = chunk.facadeModuleId
      if (id) {
        const filename = chunkCssFilename(id)
        if (filename) {
          if (
            platform === 'app' &&
            (filename === 'app.css' || filename.startsWith('App.style'))
          ) {
            // 获取 unocss 的样式文件信息
            const ids = Object.keys(chunk.modules).filter(
              (id) =>
                styles.has(id) &&
                (id.includes('__uno.css') || id.includes('-unocss-'))
            )
            cssChunks.set(filename, ids)
          } else {
            let ids = Object.keys(chunk.modules).filter((id) => styles.has(id))
            // 当页面作为组件使用时，上一步找不到依赖的css，需要再次查找
            // renderChunk会执行两次，一次是页面chunk，一次是组件chunk，两者生成的css文件名和内容都是一样的
            if (!ids.length) {
              ids = [...findCssModuleIds.call(this, id, includeComponentCss)]
            }
            cssChunks.set(filename, ids)
          }
        }
      }
      return null
    },
    async generateBundle() {
      // app 平台页面并未 chunk，所以 renderChunk 并不会处理页面的 css，需要这里再补充查找
      if (platform === 'app') {
        const moduleIds = Array.from(this.getModuleIds())
        moduleIds.forEach((id) => {
          const filename = chunkCssFilename(id)
          if (filename) {
            const ids = findCssModuleIds.call(this, id, includeComponentCss)
            if (cssChunks.has(filename)) {
              cssChunks.get(filename)!.forEach((id) => {
                ids.add(id)
              })
            }
            cssChunks.set(filename, [...ids])
          }
        })
      }

      if (!cssChunks.size) {
        return
      }
      // resolve asset URL placeholders to their built file URLs and perform
      // minification if necessary
      const processChunkCSS = async (
        css: string,
        {
          filename,
          inlined,
          minify,
        }: {
          filename: string
          inlined: boolean
          minify: boolean
        }
      ) => {
        // replace asset url references with resolved url.
        css = css.replace(assetUrlRE, (_, fileHash, postfix = '') => {
          return normalizePath(
            path.relative(
              path.dirname(filename),
              getAssetFilename(fileHash, config) + postfix
            )
          )
        })
        if (isJsCode) {
          return chunkCssCode(filename, css)
        }
        // only external @imports and @charset should exist at this point
        // hoist them to the top of the CSS chunk per spec (#1845 and #6333)
        if (css.includes('@import') || css.includes('@charset')) {
          css = await hoistAtRules(css)
        }
        if (minify && config.build.minify) {
          css = await minifyCSS(css, config)
        }
        // 压缩后再处理，小程序平台会补充 @import nvue 代码，esbuild 的压缩会把 `@import "./nvue.css";` 的空格移除，变成 `@import"./nvue.css";` 在支付宝小程序中不支持
        return chunkCssCode(filename, css)
      }

      const genCssCode = (fileName: string) => {
        return [...cssChunks.get(fileName)!]
          .map((id) => styles.get(id) || '')
          .join('\n')
      }
      for (const filename of cssChunks.keys()) {
        const cssCode = genCssCode(filename)
        let source = await processChunkCSS(cssCode, {
          filename: filename,
          inlined: false,
          minify: true,
        })
        this.emitFile({
          fileName: filename,
          type: 'asset',
          source,
        })
      }
    },
  }
}

interface CSSAtImportResolvers {
  css: ResolveFn
  sass: ResolveFn
  less: ResolveFn
}

function createCSSResolvers(config: ResolvedConfig): CSSAtImportResolvers {
  let cssResolve: ResolveFn | undefined
  let sassResolve: ResolveFn | undefined
  let lessResolve: ResolveFn | undefined
  return {
    get css() {
      return (
        cssResolve ||
        (cssResolve = config.createResolver({
          extensions: ['.css'],
          mainFields: ['style'],
          tryIndex: false,
          preferRelative: true,
        }))
      )
    },

    get sass() {
      return (
        sassResolve ||
        (sassResolve = config.createResolver({
          extensions: ['.scss', '.sass', '.css'],
          mainFields: ['sass', 'style'],
          tryIndex: true,
          tryPrefix: '_',
          preferRelative: true,
        }))
      )
    },

    get less() {
      return (
        lessResolve ||
        (lessResolve = config.createResolver({
          extensions: ['.less', '.css'],
          mainFields: ['less', 'style'],
          tryIndex: false,
          preferRelative: true,
        }))
      )
    },
  }
}

function getCssResolversKeys(
  resolvers: CSSAtImportResolvers
): Array<keyof CSSAtImportResolvers> {
  return Object.keys(resolvers) as unknown as Array<keyof CSSAtImportResolvers>
}
async function compileCSS(
  id: string,
  code: string,
  config: ResolvedConfig & { nvue?: true },
  urlReplacer: CssUrlReplacer,
  atImportResolvers: CSSAtImportResolvers,
  server?: ViteDevServer
): Promise<{
  code: string
  map?: SourceMapInput
  ast?: PostCSS.Result
  modules?: Record<string, string>
  deps?: Set<string>
}> {
  const {
    modules: modulesOptions,
    preprocessorOptions,
    devSourcemap,
  } = config.css || {}
  const isModule = modulesOptions !== false && cssModuleRE.test(id)
  // although at serve time it can work without processing, we do need to
  // crawl them in order to register watch dependencies.
  const needInlineImport = code.includes('@import')
  const hasUrl = cssUrlRE.test(code) || cssImageSetRE.test(code)
  const postcssConfig = await resolvePostcssConfig(config)
  const lang = id.match(cssLangRE)?.[1] as CssLang | undefined

  // 1. plain css that needs no processing
  if (
    lang === 'css' &&
    !postcssConfig &&
    !isModule &&
    !needInlineImport &&
    !hasUrl
  ) {
    return { code, map: null }
  }

  let preprocessorMap: ExistingRawSourceMap | undefined
  let modules: Record<string, string> | undefined
  const deps = new Set<string>()

  // 2. pre-processors: sass etc.
  if (isPreProcessor(lang)) {
    const preProcessor = preProcessors[lang]
    let opts = (preprocessorOptions && preprocessorOptions[lang]) || {}
    // support @import from node dependencies by default
    switch (lang) {
      case PreprocessLang.scss:
      case PreprocessLang.sass:
        opts = {
          includePaths: ['node_modules'],
          alias: config.resolve.alias,
          ...opts,
        }
        break
      case PreprocessLang.less:
      case PreprocessLang.styl:
      case PreprocessLang.stylus:
        opts = {
          paths: ['node_modules'],
          alias: config.resolve.alias,
          ...opts,
        }
    }
    // important: set this for relative import resolving
    opts.filename = cleanUrl(id)
    opts.enableSourcemap = devSourcemap ?? false

    const preprocessResult = await preProcessor(
      code,
      config.root,
      opts,
      atImportResolvers,
      !!config.nvue
    )

    if (preprocessResult.errors.length) {
      throw preprocessResult.errors[0]
    }
    // TODO 升级
    // if (preprocessResult.error) {
    //   throw preprocessResult.error
    // }

    code = preprocessResult.code
    preprocessorMap = combineSourcemapsIfExists(
      opts.filename,
      preprocessResult.map,
      preprocessResult.additionalMap
    )

    if (preprocessResult.deps) {
      preprocessResult.deps.forEach((dep) => {
        // sometimes sass registers the file itself as a dep
        if (normalizePath(dep) !== normalizePath(opts.filename)) {
          deps.add(dep)
        }
      })
    }
  }

  // 3. postcss
  const postcssOptions = (postcssConfig && postcssConfig.options) || {}
  const postcssPlugins =
    postcssConfig && postcssConfig.plugins ? postcssConfig.plugins.slice() : []

  if (needInlineImport) {
    postcssPlugins.unshift(
      (await import('postcss-import')).default({
        async resolve(id, basedir) {
          // const publicFile = checkPublicFile(id, config)
          // if (publicFile) {
          //   return publicFile
          // }

          const resolved = await atImportResolvers.css(
            id,
            path.join(basedir, '*')
          )

          if (resolved) {
            return path.resolve(resolved)
          }
          return id
        },
      })
    )
  }
  postcssPlugins.push(
    UrlRewritePostcssPlugin({
      replacer: urlReplacer,
    }) as PostCSS.Plugin
  )

  if (isModule) {
    postcssPlugins.unshift(
      (await import('postcss-modules')).default({
        ...modulesOptions,
        getJSON(
          cssFileName: string,
          _modules: Record<string, string>,
          outputFileName: string
        ) {
          modules = _modules
          if (modulesOptions && isFunction(modulesOptions.getJSON)) {
            modulesOptions.getJSON(cssFileName, _modules, outputFileName)
          }
        },
        async resolve(id: string) {
          for (const key of getCssResolversKeys(atImportResolvers)) {
            const resolved = await atImportResolvers[key](id)
            if (resolved) {
              return path.resolve(resolved)
            }
          }

          return id
        },
      })
    )
  }

  if (!postcssPlugins.length) {
    return {
      code,
      map: preprocessorMap,
    }
  }
  let postcssResult: PostCSS.Result
  try {
    // postcss is an unbundled dep and should be lazy imported
    postcssResult = await (await import('postcss'))
      .default(postcssPlugins)
      .process(code, {
        ...postcssOptions,
        to: id,
        from: id,
        ...(devSourcemap
          ? {
              map: {
                inline: false,
                annotation: false,
                // postcss may return virtual files
                // we cannot obtain content of them, so this needs to be enabled
                sourcesContent: true,
                // when "prev: preprocessorMap", the result map may include duplicate filename in `postcssResult.map.sources`
                // prev: preprocessorMap,
              },
            }
          : {}),
      })

    // record CSS dependencies from @imports
    for (const message of postcssResult.messages) {
      if (message.type === 'dependency') {
        deps.add(normalizePath(message.file as string))
      } else if (message.type === 'dir-dependency') {
        // https://github.com/postcss/postcss/blob/main/docs/guidelines/plugin.md#3-dependencies
        const { dir, glob: globPattern = '**' } = message
        const pattern =
          normalizePath(path.resolve(path.dirname(id), dir)) + `/` + globPattern
        const files = glob.sync(pattern, {
          ignore: ['**/node_modules/**'],
        })
        for (let i = 0; i < files.length; i++) {
          deps.add(files[i])
        }
        if (server) {
          // register glob importers so we can trigger updates on file add/remove
          if (!(id in (server as any)._globImporters)) {
            ;(server as any)._globImporters[id] = {
              module: server.moduleGraph.getModuleById(id)!,
              importGlobs: [],
            }
          }
          ;(server as any)._globImporters[id].importGlobs.push({
            base: config.root,
            pattern,
          })
        }
      } else if (message.type === 'warning') {
        let msg = `[vite:css] ${message.text}`
        if (message.line && message.column) {
          msg += `\n${generateCodeFrame(code, {
            line: message.line,
            column: message.column,
          })}`
        }
        config.logger.warn(colors.yellow(msg))
      }
    }
  } catch (e: any) {
    e.message = `[postcss] ${e.message}`
    e.code = code
    e.loc = {
      column: e.column,
      line: e.line,
    }
    throw e
  }
  if (!devSourcemap) {
    return {
      ast: postcssResult,
      code: postcssResult.css,
      map: { mappings: '' },
      modules,
      deps,
    }
  }

  const rawPostcssMap = postcssResult.map.toJSON()

  const postcssMap = formatPostcssSourceMap(
    // version property of rawPostcssMap is declared as string
    // but actually it is a number
    rawPostcssMap as Omit<RawSourceMap, 'version'> as ExistingRawSourceMap,
    cleanUrl(id)
  )

  return {
    ast: postcssResult,
    code: postcssResult.css,
    map: combineSourcemapsIfExists(cleanUrl(id), postcssMap, preprocessorMap),
    modules,
    deps,
  }
}

export function formatPostcssSourceMap(
  rawMap: ExistingRawSourceMap,
  file: string
): ExistingRawSourceMap {
  const inputFileDir = path.dirname(file)

  const sources = rawMap.sources.map((source) => {
    const cleanSource = cleanUrl(decodeURIComponent(source))

    // postcss returns virtual files
    if (/^<.+>$/.test(cleanSource)) {
      return `\0${cleanSource}`
    }

    return normalizePath(path.resolve(inputFileDir, cleanSource))
  })

  return {
    file,
    mappings: rawMap.mappings,
    names: rawMap.names,
    sources,
    sourcesContent: rawMap.sourcesContent,
    version: rawMap.version,
  }
}

function combineSourcemapsIfExists(
  filename: string,
  map1: ExistingRawSourceMap | undefined,
  map2: ExistingRawSourceMap | undefined
): ExistingRawSourceMap | undefined {
  return map1 && map2
    ? (combineSourcemaps(filename, [
        // type of version property of ExistingRawSourceMap is number
        // but it is always 3
        map1 as RawSourceMap,
        map2 as RawSourceMap,
      ]) as ExistingRawSourceMap)
    : map1
}

interface PostCSSConfigResult {
  options: Postcss.ProcessOptions
  plugins: Postcss.AcceptedPlugin[]
}

async function resolvePostcssConfig(
  config: ResolvedConfig
): Promise<PostCSSConfigResult | null> {
  let result = postcssConfigCache.get(config)
  if (result !== undefined) {
    return result
  }

  // inline postcss config via vite config
  const inlineOptions = config.css?.postcss
  if (isObject(inlineOptions)) {
    const options = { ...inlineOptions }

    delete options.plugins
    result = {
      options,
      plugins: inlineOptions.plugins || [],
    }
  } else {
    const searchPath = isString(inlineOptions) ? inlineOptions : config.root
    try {
      // @ts-ignore
      result = await postcssrc({}, searchPath)
    } catch (e: any) {
      if (!/No PostCSS Config found/.test(e.message)) {
        if (e instanceof Error) {
          const { name, message, stack } = e
          e.name = 'Failed to load PostCSS config'
          e.message = `Failed to load PostCSS config (searchPath: ${searchPath}): [${name}] ${message}\n${stack}`
          e.stack = '' // add stack to message to retain stack
          throw e
        } else {
          throw new Error(`Failed to load PostCSS config: ${e}`)
        }
      }
      result = null
    }
  }

  postcssConfigCache.set(config, result)
  return result
}

type CssUrlReplacer = (
  url: string,
  importer?: string,
  source?: PostCSS.Source
) => string | Promise<string>
// https://drafts.csswg.org/css-syntax-3/#identifier-code-point
export const cssUrlRE =
  /(?<=^|[^\w\-\u0080-\uffff])url\(\s*('[^']+'|"[^"]+"|[^'")]+)\s*\)/
export const cssDataUriRE =
  /(?<=^|[^\w\-\u0080-\uffff])data-uri\(\s*('[^']+'|"[^"]+"|[^'")]+)\s*\)/
export const importCssRE = /@import ('[^']+\.css'|"[^"]+\.css"|[^'")]+\.css)/
const cssImageSetRE = /(?<=image-set\()((?:[\w\-]+\([^\)]*\)|[^)])*)(?=\))/

const UrlRewritePostcssPlugin: Postcss.PluginCreator<{
  replacer: CssUrlReplacer
}> = (opts) => {
  if (!opts) {
    throw new Error('base or replace is required')
  }

  return {
    postcssPlugin: 'vite-url-rewrite',
    Once(root) {
      const promises: Promise<void>[] = []
      root.walkDecls((declaration) => {
        const isCssUrl = cssUrlRE.test(declaration.value)
        const isCssImageSet = cssImageSetRE.test(declaration.value)
        if (isCssUrl || isCssImageSet) {
          const replacerForDeclaration = (rawUrl: string) => {
            const importer = declaration.source?.input.file
            return opts.replacer(rawUrl, importer, declaration.source)
          }
          const rewriterToUse = isCssImageSet
            ? rewriteCssImageSet
            : rewriteCssUrls
          promises.push(
            rewriterToUse(declaration.value, replacerForDeclaration).then(
              (url) => {
                declaration.value = url
              }
            )
          )
        }
      })
      if (promises.length) {
        return Promise.all(promises) as any
      }
    },
  }
}
UrlRewritePostcssPlugin.postcss = true

function rewriteCssUrls(
  css: string,
  replacer: CssUrlReplacer
): Promise<string> {
  return asyncReplace(css, cssUrlRE, async (match) => {
    const [matched, rawUrl] = match
    return await doUrlReplace(rawUrl, matched, replacer)
  })
}

function rewriteCssDataUris(
  css: string,
  replacer: CssUrlReplacer
): Promise<string> {
  return asyncReplace(css, cssDataUriRE, async (match) => {
    const [matched, rawUrl] = match
    return await doUrlReplace(rawUrl, matched, replacer, 'data-uri')
  })
}

function rewriteImportCss(
  css: string,
  replacer: CssUrlReplacer
): Promise<string> {
  return asyncReplace(css, importCssRE, async (match) => {
    const [matched, rawUrl] = match
    return await doImportCSSReplace(rawUrl, matched, replacer)
  })
}

// TODO: image and cross-fade could contain a "url" that needs to be processed
// https://drafts.csswg.org/css-images-4/#image-notation
// https://drafts.csswg.org/css-images-4/#cross-fade-function
const cssNotProcessedRE = /(gradient|element|cross-fade|image)\(/

async function rewriteCssImageSet(
  css: string,
  replacer: CssUrlReplacer
): Promise<string> {
  return await asyncReplace(css, cssImageSetRE, async (match) => {
    const [, rawUrl] = match
    const url = await processSrcSet(rawUrl, async ({ url }) => {
      // the url maybe url(...)
      if (cssUrlRE.test(url)) {
        return await rewriteCssUrls(url, replacer)
      }
      if (!cssNotProcessedRE.test(url)) {
        return await doUrlReplace(url, url, replacer)
      }
      return url
    })
    return url
  })
}
async function doUrlReplace(
  rawUrl: string,
  matched: string,
  replacer: CssUrlReplacer,
  funcName: string = 'url'
) {
  let wrap = ''
  const first = rawUrl[0]
  if (first === `"` || first === `'`) {
    wrap = first
    rawUrl = rawUrl.slice(1, -1)
  }

  if (
    isExternalUrl(rawUrl) ||
    isDataUrl(rawUrl) ||
    rawUrl.startsWith('#') ||
    varRE.test(rawUrl)
  ) {
    return matched
  }

  const newUrl = await replacer(rawUrl)
  if (wrap === '' && newUrl !== encodeURI(newUrl)) {
    // The new url might need wrapping even if the original did not have it, e.g. if a space was added during replacement
    wrap = "'"
  }
  return `${funcName}(${wrap}${newUrl}${wrap})`
}

async function doImportCSSReplace(
  rawUrl: string,
  matched: string,
  replacer: CssUrlReplacer
) {
  let wrap = ''
  const first = rawUrl[0]
  if (first === `"` || first === `'`) {
    wrap = first
    rawUrl = rawUrl.slice(1, -1)
  }
  if (isExternalUrl(rawUrl) || isDataUrl(rawUrl) || rawUrl.startsWith('#')) {
    return matched
  }

  return `@import ${wrap}${await replacer(rawUrl)}${wrap}`
}

export async function minifyCSS(css: string, config: ResolvedConfig) {
  try {
    const { code, warnings } = await import('esbuild').then(({ transform }) => {
      if (process.env.VUE_APP_DARK_MODE !== 'true') {
        const postcssRoot = Postcss.parse(css)
        filterPrefersColorScheme(postcssRoot, true)
        css = postcssRoot.toResult().css
      }
      return transform(css, {
        loader: 'css',
        minify: true,
        target: config.build.cssTarget || undefined,
      })
    })
    if (warnings.length) {
      const msgs = await import('esbuild').then(({ formatMessages }) => {
        return formatMessages(warnings, { kind: 'warning' })
      })
      config.logger.warn(
        colors.yellow(`warnings when minifying css:\n${msgs.join('\n')}`)
      )
    }
    return code
  } catch (e: any) {
    if (e.errors) {
      const msgs = await import('esbuild').then(({ formatMessages }) => {
        return formatMessages(e.errors, { kind: 'error' })
      })
      e.frame = '\n' + msgs.join('\n')
      e.loc = e.errors[0].location
    }
    throw e
  }
}

export async function hoistAtRules(css: string) {
  const s = new MagicString(css)
  const cleanCss = emptyCssComments(css)
  let match: RegExpExecArray | null

  // #1845
  // CSS @import can only appear at top of the file. We need to hoist all @import
  // to top when multiple files are concatenated.
  // match until semicolon that's not in quotes
  const atImportRE =
    /@import\s*(?:url\([^\)]*\)|"([^"]|(?<=\\)")*"|'([^']|(?<=\\)')*'|[^;]*).*?;/gm
  while ((match = atImportRE.exec(cleanCss))) {
    s.remove(match.index, match.index + match[0].length)
    // Use `appendLeft` instead of `prepend` to preserve original @import order
    s.appendLeft(0, match[0])
  }

  // #6333
  // CSS @charset must be the top-first in the file, hoist the first to top
  const atCharsetRE =
    /@charset\s*(?:"([^"]|(?<=\\)")*"|'([^']|(?<=\\)')*'|[^;]*).*?;/gm
  let foundCharset = false
  while ((match = atCharsetRE.exec(cleanCss))) {
    s.remove(match.index, match.index + match[0].length)
    if (!foundCharset) {
      s.prepend(match[0])
      foundCharset = true
    }
  }

  return s.toString()
}

// Preprocessor support. This logic is largely replicated from @vue/compiler-sfc

type PreprocessorAdditionalData =
  | string
  | ((source: string, filename: string) => string | Promise<string>)

type StylePreprocessorOptions = {
  [key: string]: any
  additionalData?: PreprocessorAdditionalData
  filename: string
  alias: Alias[]
}

type SassStylePreprocessorOptions = StylePreprocessorOptions & Sass.Options

type StylePreprocessor = (
  source: string,
  root: string,
  options: StylePreprocessorOptions,
  resolvers: CSSAtImportResolvers,
  isNVue: boolean
) => StylePreprocessorResults | Promise<StylePreprocessorResults>

type SassStylePreprocessor = (
  source: string,
  root: string,
  options: SassStylePreprocessorOptions,
  resolvers: CSSAtImportResolvers,
  isNVue: boolean
) => StylePreprocessorResults | Promise<StylePreprocessorResults>

export interface StylePreprocessorResults {
  code: string
  map?: ExistingRawSourceMap | undefined
  additionalMap?: ExistingRawSourceMap | undefined
  errors: RollupError[]
  deps: string[]
}

const loadedPreprocessors: Partial<Record<PreprocessLang, any>> = {}

function loadPreprocessor(lang: PreprocessLang.scss, root: string): typeof Sass
function loadPreprocessor(lang: PreprocessLang.sass, root: string): typeof Sass
function loadPreprocessor(lang: PreprocessLang.less, root: string): typeof Less
function loadPreprocessor(
  lang: PreprocessLang.stylus,
  root: string
): typeof Stylus
function loadPreprocessor(lang: PreprocessLang, root: string): any {
  if (lang in loadedPreprocessors) {
    return loadedPreprocessors[lang]
  }
  try {
    // Search for the preprocessor in the root directory first, and fall back
    // to the default require paths.
    const fallbackPaths = require.resolve.paths?.(lang) || []
    const resolved = require.resolve(lang, { paths: [root, ...fallbackPaths] })
    return (loadedPreprocessors[lang] = require(resolved))
  } catch (e) {
    throw new Error(
      `Preprocessor dependency "${lang}" not found. Did you install it?`
    )
  }
}

// .scss/.sass processor
const scss: SassStylePreprocessor = async (
  source,
  root,
  options,
  resolvers,
  isNVue
) => {
  const render = loadPreprocessor(PreprocessLang.sass, root).render
  const internalImporter: Sass.Importer = (url, importer, done) => {
    resolvers.sass(url, importer).then((resolved) => {
      if (resolved) {
        rebaseUrls(resolved, options.filename, options.alias, isNVue)
          .then((data) => done?.(data))
          .catch((data) => done?.(data))
      } else {
        done?.(null)
      }
    })
  }
  const importer = [internalImporter]
  if (options.importer) {
    isArray(options.importer)
      ? importer.push(...options.importer)
      : importer.push(options.importer)
  }

  const { content: data, map: additionalMap } = await getSource(
    source,
    options.filename,
    options.additionalData,
    options.enableSourcemap
  )
  const finalOptions: Sass.Options = {
    ...options,
    data,
    file: options.filename,
    outFile: options.filename,
    importer,
    ...(options.enableSourcemap
      ? {
          sourceMap: true,
          omitSourceMapUrl: true,
          sourceMapRoot: path.dirname(options.filename),
        }
      : {}),
  }

  try {
    const result = await new Promise<Sass.Result>((resolve, reject) => {
      render(finalOptions, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
    const deps = result.stats.includedFiles
    const map: ExistingRawSourceMap | undefined = result.map
      ? JSON.parse(result.map.toString())
      : undefined

    return {
      code: result.css.toString(),
      map,
      additionalMap,
      errors: [],
      deps,
    }
  } catch (e: any) {
    // normalize SASS error
    e.id = e.file
    e.frame = e.formatted
    return { code: '', errors: [e], deps: [] }
  }
}

const sass: SassStylePreprocessor = (
  source,
  root,
  options,
  aliasResolver,
  isNVue
) =>
  scss(
    source,
    root,
    {
      ...options,
      indentedSyntax: true,
    },
    aliasResolver,
    isNVue
  )

function preprocessCss(content: string, isNVue: boolean = false) {
  if (content.includes('#endif')) {
    return isNVue ? preNVueCss(content) : preCss(content)
  }
  return content
}

/**
 * relative url() inside \@imported sass and less files must be rebased to use
 * root file as base.
 */
async function rebaseUrls(
  file: string,
  rootFile: string,
  alias: Alias[],
  isNVue: boolean = false
): Promise<Sass.ImporterReturnType> {
  file = path.resolve(file) // ensure os-specific flashes

  // fixed by xxxxxx 条件编译
  let contents = preprocessCss(fs.readFileSync(file, 'utf-8'), isNVue)

  // in the same dir, no need to rebase
  const fileDir = path.dirname(file)
  const rootDir = path.dirname(rootFile)
  if (fileDir === rootDir) {
    return { file, contents }
  }

  // no url()
  const hasUrls = cssUrlRE.test(contents)
  // data-uri() calls
  const hasDataUris = cssDataUriRE.test(contents)
  // no @import xxx.css
  const hasImportCss = importCssRE.test(contents)

  if (!hasUrls && !hasDataUris && !hasImportCss) {
    return { file, contents }
  }

  let rebased
  const rebaseFn = (url: string) => {
    if (url.startsWith('/')) return url
    // match alias, no need to rewrite
    for (const { find } of alias) {
      const matches = isString(find) ? url.startsWith(find) : find.test(url)
      if (matches) {
        return url
      }
    }
    const absolute = path.resolve(fileDir, url)
    const relative = path.relative(rootDir, absolute)
    return normalizePath(relative)
  }

  // fix css imports in less such as `@import "foo.css"`
  if (hasImportCss) {
    contents = await rewriteImportCss(contents, rebaseFn)
  }

  if (hasUrls) {
    contents = await rewriteCssUrls(rebased || contents, rebaseFn)
  }

  if (hasDataUris) {
    contents = await rewriteCssDataUris(rebased || contents, rebaseFn)
  }

  return {
    file,
    contents,
  }
}

// .less
const less: StylePreprocessor = async (
  source,
  root,
  options,
  resolvers,
  isNVue
) => {
  const nodeLess = loadPreprocessor(PreprocessLang.less, root)
  const viteResolverPlugin = createViteLessPlugin(
    nodeLess,
    options.filename,
    options.alias,
    resolvers,
    isNVue
  )
  const { content, map: additionalMap } = await getSource(
    source,
    options.filename,
    options.additionalData,
    options.enableSourcemap
  )

  let result: Less.RenderOutput | undefined
  try {
    result = await nodeLess.render(content, {
      ...options,
      plugins: [viteResolverPlugin, ...(options.plugins || [])],
      ...(options.enableSourcemap
        ? {
            sourceMap: {
              outputSourceFiles: true,
              sourceMapFileInline: false,
            },
          }
        : {}),
    })
  } catch (e) {
    const error = e as Less.RenderError
    // normalize error info
    const normalizedError: RollupError = new Error(error.message || error.type)
    normalizedError.loc = {
      file: error.filename || options.filename,
      line: error.line,
      column: error.column,
    }
    return { code: '', errors: [normalizedError], deps: [] }
  }

  const map: ExistingRawSourceMap = result.map && JSON.parse(result.map)
  if (map) {
    delete map.sourcesContent
  }

  return {
    code: result.css.toString(),
    map,
    additionalMap,
    deps: result.imports,
    errors: [],
  }
}

/**
 * Less manager, lazy initialized
 */
let ViteLessManager: any

function createViteLessPlugin(
  less: typeof Less,
  rootFile: string,
  alias: Alias[],
  resolvers: CSSAtImportResolvers,
  isNVue: boolean
): Less.Plugin {
  if (!ViteLessManager) {
    ViteLessManager = class ViteManager extends less.FileManager {
      resolvers
      rootFile
      alias
      constructor(
        rootFile: string,
        resolvers: CSSAtImportResolvers,
        alias: Alias[]
      ) {
        super()
        this.rootFile = rootFile
        this.resolvers = resolvers
        this.alias = alias
      }
      override supports() {
        return true
      }
      override supportsSync() {
        return false
      }
      override async loadFile(
        filename: string,
        dir: string,
        opts: any,
        env: any
      ): Promise<Less.FileLoadResult> {
        const resolved = await this.resolvers.less(
          filename,
          path.join(dir, '*')
        )
        if (resolved) {
          const result = await rebaseUrls(
            resolved,
            this.rootFile,
            this.alias,
            isNVue
          )
          let contents: string
          if (result && 'contents' in result) {
            contents = result.contents
          } else {
            contents = fs.readFileSync(resolved, 'utf-8')
          }
          return {
            filename: path.resolve(resolved),
            contents,
          }
        } else {
          return super.loadFile(filename, dir, opts, env)
        }
      }
    }
  }

  return {
    install(_, pluginManager) {
      pluginManager.addFileManager(
        new ViteLessManager(rootFile, resolvers, alias)
      )
    },
    minVersion: [3, 0, 0],
  }
}

// .styl
const styl: StylePreprocessor = async (source, root, options) => {
  const nodeStylus = loadPreprocessor(PreprocessLang.stylus, root)
  // Get source with preprocessor options.additionalData. Make sure a new line separator
  // is added to avoid any render error, as added stylus content may not have semi-colon separators
  const { content, map: additionalMap } = await getSource(
    source,
    options.filename,
    options.additionalData,
    options.enableSourcemap,
    '\n'
  )
  // Get preprocessor options.imports dependencies as stylus
  // does not return them with its builtin `.deps()` method
  const importsDeps = (options.imports ?? []).map((dep: string) =>
    path.resolve(dep)
  )
  try {
    const ref = nodeStylus(content, options)
    if (options.enableSourcemap) {
      ref.set('sourcemap', {
        comment: false,
        inline: false,
        basePath: root,
      })
    }

    const result = ref.render()

    // Concat imports deps with computed deps
    const deps = [...ref.deps(), ...importsDeps]

    // @ts-expect-error sourcemap exists
    const map: ExistingRawSourceMap | undefined = ref.sourcemap

    return {
      code: result,
      map: formatStylusSourceMap(map, root),
      additionalMap,
      errors: [],
      deps,
    }
  } catch (e: any) {
    return { code: '', errors: [e], deps: [] }
  }
}

function formatStylusSourceMap(
  mapBefore: ExistingRawSourceMap | undefined,
  root: string
): ExistingRawSourceMap | undefined {
  if (!mapBefore) return undefined
  const map = { ...mapBefore }

  const resolveFromRoot = (p: string) => normalizePath(path.resolve(root, p))

  if (map.file) {
    map.file = resolveFromRoot(map.file)
  }
  map.sources = map.sources.map(resolveFromRoot)

  return map
}

async function getSource(
  source: string,
  filename: string,
  additionalData: PreprocessorAdditionalData | undefined,
  enableSourcemap: boolean,
  sep: string = ''
): Promise<{ content: string; map?: ExistingRawSourceMap }> {
  if (!additionalData) return { content: source }

  if (isFunction(additionalData)) {
    const newContent = await additionalData(source, filename)
    if (isString(newContent)) {
      return { content: newContent }
    }
    return newContent
  }

  if (!enableSourcemap) {
    return { content: additionalData + sep + source }
  }

  const ms = new MagicString(source)
  ms.appendLeft(0, sep)
  ms.appendLeft(0, additionalData)

  const map = ms.generateMap({ hires: true })
  map.file = filename
  map.sources = [filename]

  return {
    content: ms.toString(),
    map,
  }
}

const preProcessors = Object.freeze({
  [PreprocessLang.less]: less,
  [PreprocessLang.sass]: sass,
  [PreprocessLang.scss]: scss,
  [PreprocessLang.styl]: styl,
  [PreprocessLang.stylus]: styl,
})

function isPreProcessor(lang: any): lang is PreprocessLang {
  return lang && lang in preProcessors
}
