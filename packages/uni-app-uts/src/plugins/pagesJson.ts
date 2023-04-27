import path from 'path'
import fs from 'fs-extra'
import { PAGES_JSON_UTS, normalizePagesJson } from '@dcloudio/uni-cli-shared'
import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'

import { ENTRY_FILENAME, genClassName } from './utils'

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
        const pagesJson = normalizePagesJson(code, process.env.UNI_PLATFORM)
        imports = []
        routes = []
        pagesJson.pages.forEach((page) => {
          const className = genClassName(page.path)
          imports.push(page.path)
          routes.push(
            `{ path: "${page.path}", component: ${className}Class, meta: { isQuit: true, navigationBar: { titleText: "uni-app" } as PageNavigationBar } as PageMeta  } as PageRoute`
          )
        })
        return `${imports.map((p) => `import('./${p}.uvue')`).join('\n')}
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
    return `import { ${className}Class } from './${p}.uvue?type=page'`
  })
  .join('\n')}
const __uniRoutes = [${routes.join(',\n')}]
`
      }
    },
  }
}
