import fs from 'fs'
import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'

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
} from '@dcloudio/uni-cli-shared'
import { virtualPagePath } from './entry'
import { UniMiniProgramPluginOptions } from '../plugin'

const debugPagesJson = debug('vite:uni:pages-json')

export function uniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'vite:uni-mp-pages-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR
        this.addWatchFile(path.resolve(inputDir, 'pages.json'))
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const manifestJson = parseManifestJsonOnce(inputDir)
        const { appJson, pageJsons } = parseMiniProgramPagesJson(
          code,
          process.env.UNI_PLATFORM,
          {
            debug: !!manifestJson.debug,
            darkmode:
              options.app.darkmode &&
              fs.existsSync(path.resolve(inputDir, 'theme.json')),
            networkTimeout: manifestJson.networkTimeout,
            subpackages: options.app.subpackages,
          }
        )
        addMiniProgramAppJson(appJson)
        Object.keys(pageJsons).forEach((name) => {
          addMiniProgramPageJson(name, pageJsons[name])
        })
        return {
          code: `import './manifest.json.js'\n` + importPagesCode(appJson),
          map: this.getCombinedSourcemap(),
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
    const pagePathWithExtname = normalizePagePath(pagePath, 'app')
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
