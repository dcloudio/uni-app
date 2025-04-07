import path from 'path'
import fs from 'fs-extra'
import {
  PAGES_JSON_UTS,
  createRollupError,
  genUTSClassName,
  normalizeUniAppXAppPagesJson,
  parseArguments,
} from '@dcloudio/uni-cli-shared'
import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'

import { ENTRY_FILENAME, stringifyMap } from './utils'
import { isPages, setGlobalPageOrientation } from '../utils'

export function uniAppPagesPlugin(): Plugin {
  const pagesJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
  const pagesJsonUTSPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    PAGES_JSON_UTS
  )
  let imports: string[] = []
  let routes: string[] = []
  let globalStyle = 'new Map()'
  let tabBar = 'null'
  let launchPage = 'null'
  let conditionUrl = ''
  let uniIdRouter = 'new Map()'
  let themeConfig = ''
  const codes: string[] = []
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
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'theme.json'))
        let pagesJson: UniApp.PagesJson = {
          pages: [],
          globalStyle: {
            navigationBar: {},
          },
        }
        // 调整换行符，确保 parseTree 的loc正确
        code = code.replace(/\r\n/g, '\n')
        try {
          pagesJson = normalizeUniAppXAppPagesJson(code)
        } catch (err: any) {
          if (err.loc) {
            const error = createRollupError(
              'uni:app-pages',
              pagesJsonPath,
              err,
              code
            )
            this.error(error)
          } else {
            throw err
          }
        }

        imports = []
        routes = []

        process.env.UNI_APP_X_PAGE_COUNT = pagesJson.pages.length + ''

        setGlobalPageOrientation(pagesJson.globalStyle?.pageOrientation || '')

        pagesJson.pages.forEach((page, index) => {
          const className = genUTSClassName(page.path)
          let isQuit = index === 0
          imports.push(page.path)
          routes.push(
            `{ path: "${
              page.path
            }", component: ${className}Class, meta: { isQuit: ${isQuit} } as UniPageMeta, style: ${stringifyPageStyle(
              page.style
            )}${
              page.needLogin === undefined
                ? ''
                : ', needLogin: ' + page.needLogin
            } } as UniPageRoute`
          )
        })
        if (pagesJson.globalStyle) {
          globalStyle = stringifyPageStyle(pagesJson.globalStyle)
        }
        if (pagesJson.tabBar) {
          tabBar = stringifyMap(pagesJson.tabBar)
        }
        if (pagesJson.condition) {
          const conditionInfo = parseArguments(pagesJson)
          if (conditionInfo) {
            const { path, query } = JSON.parse(conditionInfo)
            conditionUrl = `${path}${query ? '?' + query : ''}`
          }
        }
        if (pagesJson.uniIdRouter) {
          uniIdRouter = stringifyMap(pagesJson.uniIdRouter)
        }
        launchPage = stringifyLaunchPage(pagesJson.pages[0])

        codes.length = 0
        // theme.json
        themeConfig = readThemeJSONFileAsStringifyMap()
        if (themeConfig) {
          codes.push(`__uniConfig.themeConfig = ${themeConfig}`)
        }
        return {
          code: `${imports.map((p) => `import './${p}.uvue'`).join('\n')}
          export default 'pages.json'`,
          map: {
            mappings: '',
          },
        }
      }
    },
    generateBundle(_, bundle) {
      if (bundle[ENTRY_FILENAME()]) {
        const asset = bundle[ENTRY_FILENAME()] as OutputAsset
        asset.source =
          asset.source +
          `
${imports
  .map((p) => {
    const className = genUTSClassName(p)
    return `import ${className}Class from './${p}.uvue'`
  })
  .join('\n')}
function definePageRoutes() {
${routes.map((route) => `__uniRoutes.push(${route})`).join('\n')}
}
const __uniTabBar: Map<string, any | null> | null = ${tabBar}
const __uniLaunchPage: Map<string, any | null> = ${launchPage}
function defineAppConfig(){
  __uniConfig.entryPagePath = '/${imports[0]}'
  __uniConfig.globalStyle = ${globalStyle}
  __uniConfig.getTabBarConfig = ():Map<string, any> | null =>  ${tabBar}
  __uniConfig.tabBar = __uniConfig.getTabBarConfig()
  __uniConfig.conditionUrl = '${conditionUrl}'
  __uniConfig.uniIdRouter = ${uniIdRouter}
  ${codes.join('\n  ')}
  __uniConfig.ready = true
}
`
      }
    },
  }
}

function stringifyLaunchPage(launchPage: UniApp.PagesJsonPageOptions) {
  return stringifyMap(
    {
      url: launchPage.path,
      style: launchPage.style,
    },
    true
  )
}

function stringifyPageStyle(pageStyle: UniApp.PagesJsonPageStyle) {
  return stringifyMap(pageStyle)
}

// function readUniSassAsStringifyMap() {
//   const uniScssPath = path.resolve(process.env.UNI_INPUT_DIR, 'uni.scss')
//   let result = {}
//   if (fs.existsSync(uniScssPath)) {
//     const content = fs.readFileSync(uniScssPath, 'utf8')
//     const parser = new ThemeSassParser()
//     result = parser.parse(content)
//   }
//   return stringifyMap(result)
// }

function readThemeJSONFileAsStringifyMap() {
  const themeJsonPath = path.resolve(process.env.UNI_INPUT_DIR, 'theme.json')
  if (fs.existsSync(themeJsonPath)) {
    return stringifyMap(JSON.parse(fs.readFileSync(themeJsonPath, 'utf8')))
  }
  return ''
}
