import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'

import {
  AppJson,
  defineUniPagesJsonPlugin,
  getLocaleFiles,
  normalizePagePath,
  normalizeNodeModules,
  parseManifestJsonOnce,
  parseMiniProgramPagesJson,
} from '@dcloudio/uni-cli-shared'
import { virtualPagePath } from './virtual'
import { UniMiniProgramPluginOptions } from '../plugin'

export function uniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  let appJson: AppJson
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
        const res = parseMiniProgramPagesJson(code, process.env.UNI_PLATFORM, {
          debug: !!manifestJson.debug,
          darkmode:
            options.app.darkmode &&
            fs.existsSync(path.resolve(inputDir, 'theme.json')),
          networkTimeout: manifestJson.networkTimeout,
          subpackages: options.app.subpackages,
        })
        appJson = res.appJson
        Object.keys(res.pageJsons).forEach((name) => {
          this.emitFile({
            fileName: normalizeNodeModules(name) + '.json',
            type: 'asset',
            source: JSON.stringify(res.pageJsons[name], null, 2),
          })
        })
        return {
          code: `import './manifest.json.js'\n` + importPagesCode(appJson),
          map: this.getCombinedSourcemap(),
        }
      },
      generateBundle() {
        if (appJson) {
          this.emitFile({
            fileName: `app.json`,
            type: 'asset',
            source: JSON.stringify(appJson, null, 2),
          })
        }
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
