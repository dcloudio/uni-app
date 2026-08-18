import path from 'path'
import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'
import {
  type AppJson,
  M,
  MANIFEST_JSON_JS,
  PAGES_JSON_JS,
  addMiniProgramAppJson,
  addMiniProgramPageJson,
  checkPagesJson,
  defineUniPagesJsonPlugin,
  findChangedJsonFiles,
  getLocaleFiles,
  getWorkers,
  hash,
  initI18nOptionsOnce,
  isAlipayXStyleIsolation,
  mergeMiniProgramAppJson,
  normalizePagePath,
  normalizePath,
  parseIndependentSubPackages,
  parseManifestJsonOnce,
  parseMiniProgramPagesJson,
  parseVueRequest,
  preUVueJson,
  removeExt,
  runByHBuilderX,
} from '@dcloudio/uni-cli-shared'
import { virtualPagePath } from './entry'
import type { UniMiniProgramPluginOptions } from '../plugin'
import { parseI18nJson } from '@dcloudio/uni-i18n'
import { isPlainObject } from '@vue/shared'
import {
  parseIndependentRoot,
  updateIndependentSubPackages,
  withoutIndependentRoot,
} from './independentUtils'

const debugPagesJson = debug('uni:pages-json')

const nvueCssPathsCache = new Map<ResolvedConfig, string[]>()
export function getNVueCssPaths(config: ResolvedConfig) {
  return nvueCssPathsCache.get(config)
}

type ParsedPagesJson = ReturnType<typeof parseMiniProgramPagesJson>

interface PagesJsonState extends ParsedPagesJson {
  signature: string
  normalizedAppJson: AppJson
}

export function uniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  let resolvedConfig: ResolvedConfig | undefined
  const platform = process.env.UNI_PLATFORM
  const inputDir = process.env.UNI_INPUT_DIR
  const pagesJsonPath = path.resolve(inputDir, 'pages.json')
  return defineUniPagesJsonPlugin((opts) => {
    let allPagePaths: string[] = []
    let isFirst = true
    let pagesJsonState: PagesJsonState | undefined

    const parsePagesJsonState = (
      code: string,
      signature: string
    ): PagesJsonState => {
      if (process.env.UNI_APP_X === 'true') {
        // 调整换行符，确保 parseTree 的loc正确
        const jsonCode = code.replace(/\r\n/g, '\n')
        checkPagesJson(
          preUVueJson(jsonCode, 'pages.json'),
          process.env.UNI_INPUT_DIR
        )
      }
      const manifestJson = parseManifestJsonOnce(inputDir)
      const parsePagesJsonOptions = {
        debug: !!manifestJson.debug,
        darkmode: options.app.darkmode,
        networkTimeout: manifestJson.networkTimeout,
        subpackages: !!options.app.subpackages,
        ...options.json,
        independentSubpackages: !!options.app.independentSubpackages,
      } as Parameters<typeof parseMiniProgramPagesJson>[2] & {
        independentSubpackages?: boolean
      }
      const { appJson, pageJsons, nvuePages } = parseMiniProgramPagesJson(
        code,
        platform,
        parsePagesJsonOptions
      )

      // add source
      mergeMiniProgramAppJson(
        appJson,
        manifestJson[platform],
        options.project?.source ?? {}
      )

      if (process.env.UNI_APP_X === 'true') {
        // 当前平台支持workers，且manifest.json中配置了workers，则合并workers配置
        if (options.app.workers && Object.keys(getWorkers()).length) {
          // 如果没有配置，则默认为workers目录
          appJson.workers = manifestJson.workers || 'workers'
        }
        if (isPlainObject(appJson.workers) && appJson.workers.path) {
          // 微信小程序测试对象结构的话，如果isSubpackage是false，会报找不到
          // 故：只有isSubpackage为true保持对象结构，否则用字符串
          if (!appJson.workers.isSubpackage) {
            appJson.workers = appJson.workers.path
          }
        }
      }

      if (options.json?.formatAppJson) {
        options.json.formatAppJson(appJson, manifestJson, pageJsons)
      }
      // 使用 once 获取的话，可以节省编译时间，但 i18n 内容发生变化时，pages.json 不会自动更新
      const i18nOptions = initI18nOptionsOnce(platform, inputDir, false, true)
      if (i18nOptions) {
        const { locale, locales, delimiters } = i18nOptions
        parseI18nJson(appJson, locales[locale], delimiters)
        parseI18nJson(pageJsons, locales[locale], delimiters)
      }

      const { normalize } = options.app
      const normalizedAppJson = normalize ? normalize(appJson) : appJson

      return {
        signature,
        appJson,
        pageJsons,
        nvuePages,
        normalizedAppJson,
      }
    }

    const applyPagesJsonState = ({
      normalizedAppJson,
      pageJsons,
      nvuePages,
    }: PagesJsonState) => {
      if (resolvedConfig) {
        nvueCssPathsCache.set(
          resolvedConfig,
          nvuePages.map((pagePath) => pagePath + options.style.extname)
        )
      }
      const independentUpdate = updateIndependentSubPackages(
        options.app.independentSubpackages
          ? parseIndependentSubPackages(
              normalizedAppJson as unknown as UniApp.PagesJson
            )
          : []
      )
      if (independentUpdate.rootsChanged) {
        console.warn(M['dev.watching.restart.independentSubPackages'])
        process.exit(0)
      }
      addMiniProgramAppJson(normalizedAppJson)
      allPagePaths = []
      Object.keys(pageJsons).forEach((name) => {
        if (isNormalPage(name)) {
          if (isAlipayXStyleIsolation()) {
            // 页面样式需要具备进入组件的原生可见性，最终是否命中仍由模板前缀 class 决定。
            pageJsons[name].styleIsolation = 'shared'
          }
          addMiniProgramPageJson(name, pageJsons[name])
          allPagePaths.push(name)
        }
      })
    }

    const ensurePagesJsonState = (code: string) => {
      const signature = createPagesJsonSignature(code)
      if (pagesJsonState?.signature === signature) {
        return pagesJsonState
      }
      const state = parsePagesJsonState(code, signature)
      applyPagesJsonState(state)
      pagesJsonState = state
      return state
    }

    return {
      name: 'uni:mp-pages-json',
      enforce: 'pre',
      configResolved(config) {
        resolvedConfig = config
      },
      transform(code, id) {
        if (process.env.UNI_APP_X === 'true') {
          if (isFirst && allPagePaths.length) {
            const { filename } = parseVueRequest(id)
            if (filename.endsWith('.vue') || filename.endsWith('.uvue')) {
              const vueFilename = removeExt(
                normalizePath(
                  path.relative(process.env.UNI_INPUT_DIR, filename)
                )
              )
              // 项目内的
              if (!vueFilename.startsWith('.')) {
                // const index = allPagePaths.indexOf(pagePath)
                // if (index > -1) {
                if (runByHBuilderX()) {
                  console.log(
                    `当前工程${
                      allPagePaths.length
                    }个页面，正在编译${vueFilename}...${'\u200D'}`
                  )
                }
                // }
              }
            }
          }
        }
        if (!opts.filter(id)) {
          return null
        }
        this.addWatchFile(pagesJsonPath)
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const pagesRoot = parseRootScopedPagesJsonRoot(id, inputDir)
        const { appJson } = ensurePagesJsonState(code)

        return {
          code: pagesRoot
            ? importPagesCode(appJson, pagesRoot)
            : `import './${MANIFEST_JSON_JS}'\n` + importPagesCode(appJson),
          map: { mappings: '' },
        }
      },
      generateBundle() {
        findChangedJsonFiles(options.app.usingComponents).forEach(
          (value, key) => {
            debugPagesJson('json.changed', key)
            this.emitFile({
              type: 'asset',
              fileName: key + '.json',
              source: value,
            })
          }
        )
      },
      buildEnd() {
        isFirst = false
      },
    }
  })
}
/**
 * 字节跳动小程序可以配置 ext:// 开头的插件页面模板，如 ext://microapp-trade-plugin/order-confirm
 * @param pagePath
 * @returns
 */
function isNormalPage(pagePath: string) {
  return !pagePath.startsWith('ext://')
}

function createPagesJsonSignature(code: string) {
  // 只缓存轻量签名，避免大体积 pages.json 在多个 root 入口间重复保留完整内容。
  return `${code.length}:${hash(code)}`
}

// pages.json 的 usingComponents 会影响模板编译；当前不把 JSON hash 放进虚拟 id，
// 因此开发期仅修改 usingComponents 暂不会强制已编译页面重编，后续需统一设计 invalidate。
function importPagesCode(pagesJson: AppJson, scopeRoot?: string) {
  const importPagesCode: string[] = []
  function importPageCode(pagePath: string, root?: string) {
    if (!isNormalPage(pagePath)) {
      return
    }
    const pagePathWithExtname = normalizePagePath(
      pagePath,
      process.env.UNI_PLATFORM
    )
    if (pagePathWithExtname) {
      importPagesCode.push(
        `import('${virtualPagePath(pagePathWithExtname, root)}')`
      )
    }
  }
  if (!scopeRoot) {
    pagesJson.pages.forEach((pagePath) => importPageCode(pagePath))
  }
  if (pagesJson.subPackages) {
    pagesJson.subPackages.forEach(({ root, pages, independent }) => {
      const subPackageRoot = normalizePath(root).replace(/\/$/, '')
      if (scopeRoot && subPackageRoot !== scopeRoot) {
        return
      }
      pages &&
        pages.forEach((pagePath) =>
          importPageCode(
            normalizePath(path.join(subPackageRoot, pagePath)),
            independent ? subPackageRoot : undefined
          )
        )
    })
  }
  let workerCode: string[] = []
  if (!scopeRoot && process.env.UNI_APP_X === 'true') {
    const workers = getWorkers()
    workerCode = Object.keys(workers).map((key) => {
      return `import('@/${key}')`
    })
  }
  return `if(!Math){
${importPagesCode.join('\n')}
${workerCode.join('\n')}
}`
}

function parseRootScopedPagesJsonRoot(id: string, inputDir: string) {
  const root = parseIndependentRoot(id)
  if (!root) {
    return
  }
  const idWithoutRoot = withoutIndependentRoot(id)
  if (isPagesJsonJs(idWithoutRoot, inputDir)) {
    return root
  }
}

function isPagesJsonJs(id: string, inputDir: string) {
  const filename = id.split('?')[0]
  return (
    filename === PAGES_JSON_JS ||
    normalizePath(filename) ===
      normalizePath(path.join(inputDir, PAGES_JSON_JS))
  )
}
