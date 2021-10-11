import path from 'path'
import { Plugin } from 'vite'

import {
  defineUniPagesJsonPlugin,
  normalizePagesJson,
  getLocaleFiles,
  normalizePagePath,
} from '@dcloudio/uni-cli-shared'
import { virtualPagePath } from './virtual'
import { UniMiniProgramPluginOptions } from '../plugin'

export function uniPagesJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  let pagesJson: UniApp.PagesJson
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'vite:uni-mp-pages-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        getLocaleFiles(
          path.resolve(process.env.UNI_INPUT_DIR, 'locale')
        ).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        pagesJson = normalizePagesJson(code, process.env.UNI_PLATFORM)
        // TODO subpackages
        pagesJson.pages.forEach((page) => {
          this.addWatchFile(
            path.resolve(process.env.UNI_INPUT_DIR, page.path + '.vue')
          )
        })
        return {
          code:
            `import './manifest.json.js'\n` +
            normalizeMiniProgramPagesJson(pagesJson),
          map: this.getCombinedSourcemap(),
        }
      },
      generateBundle() {
        // this.emitFile({
        //   fileName: `app-config-service.js`,
        //   type: 'asset',
        //   source: normalizeAppConfigService(
        //     pagesJson,
        //     parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
        //   ),
        // })
      },
    }
  })
}

function normalizeMiniProgramPagesJson(pagesJson: Record<string, any>) {
  const importPagesCode: string[] = []
  pagesJson.pages.forEach((page: UniApp.PagesJsonPageOptions) => {
    const pagePath = page.path
    const pagePathWithExtname = normalizePagePath(pagePath, 'app')
    if (pagePathWithExtname) {
      importPagesCode.push(`import('${virtualPagePath(pagePathWithExtname)}')`)
    }
  })
  return `if(!Math){
${importPagesCode.join('\n')}
}`
}
