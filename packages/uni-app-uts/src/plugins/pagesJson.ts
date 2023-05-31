import path from 'path'
import fs from 'fs-extra'
import {
  PAGES_JSON_UTS,
  normalizeUniAppXAppPagesJson,
} from '@dcloudio/uni-cli-shared'
import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'

import { ENTRY_FILENAME, genClassName, stringifyMap } from './utils'

function isPages(id: string) {
  return id.endsWith(PAGES_JSON_UTS)
}

export function uniAppPagesPlugin(): Plugin {
  const pagesJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
  const pagesJsonUTSPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    PAGES_JSON_UTS
  )
  let imports: string[] = []
  let routes: string[] = []
  let globalStyle: string = 'new Map()'
  let tabBar: string = 'null'
  return {
    name: 'uni:app-pages',
    apply: 'build',
    resolveId(id) {
      if (isPages(id)) {
        return pagesJsonUTSPath
      }
    },
    load(id) {
      if (isPages(id)) {
        return fs.readFileSync(pagesJsonPath, 'utf8')
      }
    },
    transform(code, id) {
      if (isPages(id)) {
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        const pagesJson = normalizeUniAppXAppPagesJson(code)
        imports = []
        routes = []
        pagesJson.pages.forEach((page, index) => {
          const className = genClassName(page.path)
          let isQuit = index === 0
          imports.push(page.path)
          routes.push(
            `{ path: "${
              page.path
            }", component: ${className}Class, meta: { isQuit: ${isQuit} } as PageMeta, style: ${stringifyPageStyle(
              page.style
            )}  } as PageRoute`
          )
        })
        if (pagesJson.globalStyle) {
          globalStyle = stringifyPageStyle(pagesJson.globalStyle)
        }
        if (pagesJson.tabBar) {
          tabBar = stringifyMap(pagesJson.tabBar)
        }
        return `${imports.map((p) => `import './${p}.uvue'`).join('\n')}
export default 'pages.json'`
      }
    },
    generateBundle(_, bundle) {
      if (bundle[ENTRY_FILENAME]) {
        const asset = bundle[ENTRY_FILENAME] as OutputAsset
        asset.source =
          asset.source +
          `
${imports
  .map((p) => {
    const className = genClassName(p)
    return `import ${className}Class from './${p}.uvue?type=page'`
  })
  .join('\n')}
function definePageRoutes() {
${routes.map((route) => `__uniRoutes.push(${route})`).join('\n')}
}
function defineAppConfig(){
  __uniConfig.entryPagePath = '/${imports[0]}'
  __uniConfig.globalStyle = ${globalStyle}
  __uniConfig.tabBar = ${tabBar}
}
`
      }
    },
  }
}

function stringifyPageStyle(pageStyle: UniApp.PagesJsonPageStyle) {
  return stringifyMap(pageStyle)
}
