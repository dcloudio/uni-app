import path from 'path'
import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'
import {
  type AppJson,
  MANIFEST_JSON_JS,
  addMiniProgramAppJson,
  addMiniProgramPageJson,
  defineUniPagesJsonPlugin,
  findChangedJsonFiles,
  getLocaleFiles,
  initI18nOptionsOnce,
  mergeMiniProgramAppJson,
  normalizePagePath,
  normalizePath,
  parseManifestJsonOnce,
  parseMiniProgramPagesJson,
  parseVueRequest,
  removeExt,
  runByHBuilderX,
} from '@dcloudio/uni-cli-shared'
import { virtualPagePath } from './entry'
import type { UniMiniProgramPluginOptions } from '../plugin'
import { parseI18nJson } from '@dcloudio/uni-i18n'

const debugPagesJson = debug('uni:pages-json')

const nvueCssPathsCache = new Map<ResolvedConfig, string[]>()
export function getNVueCssPaths(config: ResolvedConfig) {
  return nvueCssPathsCache.get(config)
}

export function uniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  let resolvedConfig: ResolvedConfig
  const platform = process.env.UNI_PLATFORM
  const inputDir = process.env.UNI_INPUT_DIR
  return defineUniPagesJsonPlugin((opts) => {
    let allPagePaths: string[] = []
    let isFirst = true
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
                    }个页面，正在编译${vueFilename}...${'\u200b'}`
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
        this.addWatchFile(path.resolve(inputDir, 'pages.json'))
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const manifestJson = parseManifestJsonOnce(inputDir)
        const { appJson, pageJsons, nvuePages } = parseMiniProgramPagesJson(
          code,
          platform,
          {
            debug: !!manifestJson.debug,
            darkmode: options.app.darkmode,
            networkTimeout: manifestJson.networkTimeout,
            subpackages: !!options.app.subpackages,
            ...options.json,
          }
        )
        nvueCssPathsCache.set(
          resolvedConfig,
          nvuePages.map((pagePath) => pagePath + options.style.extname)
        )

        // add source
        mergeMiniProgramAppJson(
          appJson,
          manifestJson[platform],
          options.project?.source ?? {}
        )

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
        addMiniProgramAppJson(normalize ? normalize(appJson) : appJson)
        Object.keys(pageJsons).forEach((name) => {
          if (isNormalPage(name)) {
            addMiniProgramPageJson(name, pageJsons[name])
            allPagePaths.push(name)
          }
        })

        return {
          code: `import './${MANIFEST_JSON_JS}'\n` + importPagesCode(appJson),
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

function importPagesCode(pagesJson: AppJson) {
  const importPagesCode: string[] = []
  function importPageCode(pagePath: string) {
    if (!isNormalPage(pagePath)) {
      return
    }
    const pagePathWithExtname = normalizePagePath(
      pagePath,
      process.env.UNI_PLATFORM
    )
    if (pagePathWithExtname) {
      importPagesCode.push(`import('${virtualPagePath(pagePathWithExtname)}')`)
    }
  }
  pagesJson.pages.forEach((pagePath) => importPageCode(pagePath))
  if (pagesJson.subPackages) {
    pagesJson.subPackages.forEach(({ root, pages }) => {
      pages &&
        pages.forEach((pagePath) => importPageCode(path.join(root, pagePath)))
    })
  }
  return `if(!Math){
${importPagesCode.join('\n')}
}`
}
