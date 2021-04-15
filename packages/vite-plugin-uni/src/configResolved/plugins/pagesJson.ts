import fs from 'fs'
import path from 'path'
import slash from 'slash'
import { Plugin, ResolvedConfig } from 'vite'
import { parse } from 'jsonc-parser'
import { camelize, capitalize } from '@vue/shared'
import { VitePluginUniResolvedOptions } from '../..'
import { FEATURE_DEFINES, normalizePagesJson } from '../../utils'

const pkg = require('@dcloudio/vite-plugin-uni/package.json')

const PAGES_JSON_JS = 'pages.json.js'

export function uniPagesJsonPlugin(
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
): Plugin {
  const pagesJsonPath = slash(path.join(options.inputDir, 'pages.json'))
  return {
    name: 'vite:uni-pages-json',
    resolveId(id) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return pagesJsonPath + '.js'
      }
    },
    transform(code, id) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return {
          code:
            registerGlobalCode +
            (options.command === 'serve' ? registerDevServerGlobalCode : '') +
            parsePagesJson(code, config, options),
          map: { mappings: '' },
        }
      }
    },
    load(id) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return JSON.stringify(parse(fs.readFileSync(pagesJsonPath, 'utf8')))
      }
    },
  }
}

interface PageRouteOptions {
  name: string
  path: string
  meta: Partial<UniApp.PageRouteMeta>
}

function parsePagesJson(
  jsonStr: string,
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  const pagesJson = normalizePagesJson(jsonStr, options.platform)
  const definePagesCode = generatePagesDefineCode(pagesJson, config)
  const uniRoutesCode = generateRoutes(pagesJson)
  const uniConfigCode = generateConfig(pagesJson, options)
  const manifestJsonPath = slash(
    path.resolve(options.inputDir, 'manifest.json.js')
  )
  const cssCode = generateCssCode(config)

  return `
import { extend } from '@vue/shared'  
import { ${
    config.define!.__UNI_FEATURE_PAGES__ ? 'defineAsyncComponent, ' : ''
  }resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { setupPage, PageComponent, AsyncLoadingComponent, AsyncErrorComponent } from '@dcloudio/uni-h5'
import { appid, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, nvue } from '${manifestJsonPath}'
${cssCode}
${uniConfigCode}
${definePagesCode}
${uniRoutesCode}
${options.command === 'serve' ? hmrCode : ''}
`
}

const hmrCode = `if(import.meta.hot){
  import.meta.hot.on('invalidate', (data) => {
      import.meta.hot.invalidate()
  })
}`

const registerGlobalCode = `import {upx2px} from '@dcloudio/uni-h5'
window.rpx2px = upx2px
`

const registerDevServerGlobalCode = `import {uni,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-h5'
window.getApp = getApp
window.getCurrentPages = getCurrentPages
window.uni = uni
window.UniViewJSBridge = UniViewJSBridge
window.UniServiceJSBridge = UniServiceJSBridge
`

function normalizePageIdentifier(path: string) {
  return capitalize(camelize(path.replace(/\//g, '-')))
}

function generateCssCode(config: ResolvedConfig) {
  const define = config.define! as FEATURE_DEFINES
  const cssFiles = ['@dcloudio/uni-h5/style/framework/base.css']
  if (define.__UNI_FEATURE_PAGES__) {
    cssFiles.push('@dcloudio/uni-h5/style/framework/layout.css')
  }
  if (define.__UNI_FEATURE_NAVIGATIONBAR__) {
    cssFiles.push('@dcloudio/uni-h5/style/framework/pageHead.css')
  }
  if (define.__UNI_FEATURE_TABBAR__) {
    cssFiles.push('@dcloudio/uni-h5/style/framework/tabBar.css')
  }
  if (define.__UNI_FEATURE_NVUE__) {
    cssFiles.push('@dcloudio/uni-h5/style/framework/nvue.css')
  }
  if (define.__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    cssFiles.push('@dcloudio/uni-h5/style/framework/pageRefresh.css')
  }
  if (define.__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__) {
    cssFiles.push('@dcloudio/uni-components/style/input.css')
  }
  return cssFiles.map((file) => `import '${file}'`).join('\n')
}

function generatePageDefineCode(pageOptions: UniApp.PagesJsonPageOptions) {
  return `const ${normalizePageIdentifier(
    pageOptions.path
  )} = defineAsyncComponent(extend({loader:()=>import('./${
    pageOptions.path
  }.vue?mpType=page').then(comp=>setupPage(comp))},AsyncComponentOptions))`
}

function generatePagesDefineCode(
  pagesJson: UniApp.PagesJson,
  config: ResolvedConfig
) {
  const define = config.define! as FEATURE_DEFINES
  if (!define.__UNI_FEATURE_PAGES__) {
    // single page
    const pagePath = pagesJson.pages[0].path
    return `import {default as ${normalizePageIdentifier(
      pagePath
    )}} from './${pagePath}.vue?mpType=page'`
  }
  const { pages } = pagesJson
  return (
    `const AsyncComponentOptions = {
  loadingComponent: AsyncLoadingComponent,
  errorComponent: AsyncErrorComponent,
  delay: async.delay,
  timeout: async.timeout,
  suspensible: async.suspensible
}
` + pages.map((pageOptions) => generatePageDefineCode(pageOptions)).join('\n')
  )
}

function normalizePagesRoute(pagesJson: UniApp.PagesJson): PageRouteOptions[] {
  const firstPagePath = pagesJson.pages[0].path
  const tabBarList = (pagesJson.tabBar && pagesJson.tabBar.list) || []
  return pagesJson.pages.map((pageOptions) => {
    const path = pageOptions.path
    const name = normalizePageIdentifier(path)
    const isEntry = firstPagePath === path ? true : undefined
    const tabBarIndex = tabBarList.findIndex(
      (tabBarPage: { pagePath: string }) => tabBarPage.pagePath === path
    )
    const isTabBar = tabBarIndex !== -1 ? true : undefined

    let windowTop = 0
    const meta = Object.assign(
      {
        route: pageOptions.path,
        isQuit: isEntry || isTabBar ? true : undefined,
        isEntry,
        isTabBar,
        tabBarIndex,
        windowTop,
      },
      pageOptions.style
    )
    return {
      name,
      path: pageOptions.path,
      meta,
    }
  })
}

function generatePageRoute({ name, path, meta }: PageRouteOptions) {
  const { isEntry } = meta
  const alias = isEntry ? `\n  alias:'/${path}',` : ''
  return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{render(){return renderPage(${name})}},
  meta: ${JSON.stringify(meta)}
}`
}

function generatePagesRoute(pagesRouteOptions: PageRouteOptions[]) {
  return pagesRouteOptions.map((pageOptions) => generatePageRoute(pageOptions))
}

function generateRoutes(pagesJson: UniApp.PagesJson) {
  return `
function renderPage(component){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, { ref: "page" }, null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
window.__uniRoutes=[${[
    ...generatePagesRoute(normalizePagesRoute(pagesJson)),
  ].join(',')}]`
}

function generateConfig(
  pagesJson: Record<string, any>,
  options: VitePluginUniResolvedOptions
) {
  delete pagesJson.pages
  delete pagesJson.subPackages
  delete pagesJson.subpackages
  pagesJson.compilerVersion = pkg['uni-app'].compilerVersion
  return (
    (options.command === 'serve'
      ? ''
      : `window['____'+appid+'____']=true
delete window['____'+appid+'____']
`) +
    `window.__uniConfig=Object.assign(${JSON.stringify(pagesJson)},{
  async,
  debug,
  networkTimeout,
  sdkConfigs,
  qqMapKey,
  nvue,
  router
})
`
  )
}
