import fs from 'fs'
import path from 'path'
import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'
import {
  AppJson,
  defineUniPagesJsonPlugin,
  getLocaleFiles,
  normalizePagePath,
  parseManifestJsonOnce,
  parseMiniProgramPagesJson,
  addMiniProgramPageJson,
  addMiniProgramAppJson,
  findChangedJsonFiles,
  mergeMiniProgramAppJson,
  MANIFEST_JSON_JS,
} from '@dcloudio/uni-cli-shared'
import { virtualPagePath } from './entry'
import { UniMiniProgramPluginOptions } from '../plugin'

const debugPagesJson = debug('uni:pages-json')

const nvueCssPathsCache = new Map<ResolvedConfig, string[]>()
export function getNVueCssPaths(config: ResolvedConfig) {
  return nvueCssPathsCache.get(config)
}

export function uniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  let resolvedConfig: ResolvedConfig
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'uni:mp-pages-json',
      enforce: 'pre',
      configResolved(config) {
        resolvedConfig = config
      },
      transform(code, id) {
        if (!opts.filter(id)) {
          return null
        }
        const inputDir = process.env.UNI_INPUT_DIR
        this.addWatchFile(path.resolve(inputDir, 'pages.json'))
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const manifestJson = parseManifestJsonOnce(inputDir)
        const { appJson, pageJsons, nvuePages } = parseMiniProgramPagesJson(
          code,
          process.env.UNI_PLATFORM,
          {
            debug: !!manifestJson.debug,
            darkmode:
              options.app.darkmode &&
              fs.existsSync(path.resolve(inputDir, 'theme.json')),
            networkTimeout: manifestJson.networkTimeout,
            subpackages: !!options.app.subpackages,
            ...options.json,
          }
        )
        nvueCssPathsCache.set(
          resolvedConfig,
          nvuePages.map((pagePath) => pagePath + options.style.extname)
        )

        mergeMiniProgramAppJson(appJson, manifestJson[process.env.UNI_PLATFORM])

        if (options.json?.formatAppJson) {
          options.json.formatAppJson(appJson, manifestJson, pageJsons)
        }
        const { normalize } = options.app
        addMiniProgramAppJson(normalize ? normalize(appJson) : appJson)
        Object.keys(pageJsons).forEach((name) => {
          addMiniProgramPageJson(name, pageJsons[name])
        })
        return {
          code: `import './${MANIFEST_JSON_JS}'\n` + importPagesCode(appJson),
          map: { mappings: '' },
        }
      },
      generateBundle() {
        findChangedJsonFiles().forEach((value, key) => {
          debugPagesJson('json.changed', key)
          this.emitFile({
            type: 'asset',
            fileName: key + '.json',
            source: value,
          })
        })
      },
    }
  })
}

function importPagesCode(pagesJson: AppJson) {
  const importPagesCode: string[] = []
  function importPageCode(pagePath: string) {
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
