import fs from 'fs'
import path from 'path'
import slash from 'slash'
import { Plugin, ResolvedConfig } from 'vite'
import { parse } from 'jsonc-parser'
import { camelize, capitalize } from '@vue/shared'
import {
  H5_FRAMEWORK_STYLE_PATH,
  BASE_COMPONENTS_STYLE_PATH,
  normalizePagesJson,
  API_DEPS_CSS,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '../..'
import { FEATURE_DEFINES } from '../../utils'

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
    transform(code, id, ssr) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return {
          code:
            (options.command === 'serve' || (options.command === 'build' && ssr)
              ? registerGlobalCode(config, ssr)
              : '') + generatePagesJsonCode(ssr, code, config, options),
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

function generatePagesJsonCode(
  ssr: boolean | undefined,
  jsonStr: string,
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  const globalName = getGlobal(ssr)
  const pagesJson = normalizePagesJson(
    jsonStr,
    options.inputDir,
    options.platform
  )
  const definePagesCode = generatePagesDefineCode(pagesJson, config)
  const uniRoutesCode = generateRoutes(globalName, pagesJson, config, options)
  const uniConfigCode = generateConfig(globalName, pagesJson, options)
  const manifestJsonPath = slash(
    path.resolve(options.inputDir, 'manifest.json.js')
  )
  const cssCode = generateCssCode(config, options)

  return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, AsyncLoadingComponent, AsyncErrorComponent } from '@dcloudio/uni-h5'
import { appid, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, nvue } from '${manifestJsonPath}'
const extend = Object.assign
${cssCode}
${uniConfigCode}
${definePagesCode}
${uniRoutesCode}
${options.command === 'serve' ? hmrCode : ''}
export {}
`
}

const hmrCode = `if(import.meta.hot){
  import.meta.hot.on('invalidate', (data) => {
      import.meta.hot.invalidate()
  })
}`

function getGlobal(ssr?: boolean) {
  return ssr ? 'global' : 'window'
}

function registerGlobalCode(config: ResolvedConfig, ssr?: boolean) {
  const name = getGlobal(ssr)
  const rpx2pxCode =
    !ssr && config.define!.__UNI_FEATURE_RPX__
      ? `import {upx2px} from '@dcloudio/uni-h5'
  ${name}.rpx2px = upx2px
`
      : ''
  return `${rpx2pxCode}
import {uni,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-h5'
${name}.getApp = getApp
${name}.getCurrentPages = getCurrentPages
${name}.uni = uni
${name}.UniViewJSBridge = UniViewJSBridge
${name}.UniServiceJSBridge = UniServiceJSBridge
`
}

function normalizePageIdentifier(path: string) {
  return capitalize(camelize(path.replace(/\//g, '-')))
}

function generateCssCode(
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  const define = config.define! as FEATURE_DEFINES
  const cssFiles = [H5_FRAMEWORK_STYLE_PATH + 'base.css']
  // if (define.__UNI_FEATURE_PAGES__) {
  cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'async.css')
  // }
  if (define.__UNI_FEATURE_RESPONSIVE__) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'layout.css')
  }
  if (define.__UNI_FEATURE_NAVIGATIONBAR__) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'pageHead.css')
  }
  if (define.__UNI_FEATURE_TABBAR__) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'tabBar.css')
  }
  if (define.__UNI_FEATURE_NVUE__) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'nvue.css')
  }
  if (define.__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'pageRefresh.css')
  }
  if (define.__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__) {
    cssFiles.push(BASE_COMPONENTS_STYLE_PATH + 'input.css')
  }
  if (options.command === 'serve') {
    // 开发模式，自动添加所有API相关css
    Object.keys(API_DEPS_CSS).forEach((name) => {
      const styles = API_DEPS_CSS[name as keyof typeof API_DEPS_CSS]
      styles.forEach((style) => {
        if (!cssFiles.includes(style)) {
          cssFiles.push(style)
        }
      })
    })
  }
  return cssFiles.map((file) => `import '${file}'`).join('\n')
}

function generatePageDefineCode(pageOptions: UniApp.PagesJsonPageOptions) {
  const pageIdent = normalizePageIdentifier(pageOptions.path)
  return `const ${pageIdent}Loader = ()=>import('./${pageOptions.path}?mpType=page')
const ${pageIdent} = defineAsyncComponent(extend({loader:${pageIdent}Loader},AsyncComponentOptions))`
}

function generatePagesDefineCode(
  pagesJson: UniApp.PagesJson,
  _config: ResolvedConfig
) {
  // const define = config.define! as FEATURE_DEFINES
  // if (!define.__UNI_FEATURE_PAGES__) {
  //   // single page
  //   const pagePath = pagesJson.pages[0].path
  //   return `import ${normalizePageIdentifier(
  //     pagePath
  //   )} from './${pagePath}.vue?mpType=page'`
  // }
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

function normalizePagesRoute(
  pagesJson: UniApp.PagesJson,
  options: VitePluginUniResolvedOptions
): PageRouteOptions[] {
  const firstPagePath = pagesJson.pages[0].path
  const tabBarList = (pagesJson.tabBar && pagesJson.tabBar.list) || []
  return pagesJson.pages.map((pageOptions) => {
    const pagePath = pageOptions.path
    const name = normalizePageIdentifier(pagePath)
    const isEntry = firstPagePath === pagePath ? true : undefined
    const tabBarIndex = tabBarList.findIndex(
      (tabBarPage: { pagePath: string }) => tabBarPage.pagePath === pagePath
    )
    const isTabBar = tabBarIndex !== -1 ? true : undefined
    const isNVue = fs.existsSync(
      path.join(options.inputDir, pagePath + '.nvue')
    )
    let windowTop = 0
    const meta = Object.assign(
      {
        route: pageOptions.path,
        isNVue: isNVue ? true : undefined,
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

function generatePageRoute(
  { name, path, meta }: PageRouteOptions,
  config: ResolvedConfig
) {
  const { isEntry } = meta
  const alias = isEntry ? `\n  alias:'/${path}',` : ''
  return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{render(){return renderPage(${name})}},
  loader: ${normalizePageIdentifier(path)}Loader,
  meta: ${JSON.stringify(meta)}
}`
}

function generatePagesRoute(
  pagesRouteOptions: PageRouteOptions[],
  config: ResolvedConfig
) {
  return pagesRouteOptions.map((pageOptions) =>
    generatePageRoute(pageOptions, config)
  )
}

function generateRoutes(
  globalName: string,
  pagesJson: UniApp.PagesJson,
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
) {
  return `
function renderPage(component){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, { ref: "page" }, null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
${globalName}.__uniRoutes=[${[
    ...generatePagesRoute(normalizePagesRoute(pagesJson, options), config),
  ].join(',')}]`
}

function generateConfig(
  globalName: string,
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
      : `${globalName}['____'+appid+'____']=true
delete ${globalName}['____'+appid+'____']
`) +
    `${globalName}.__uniConfig=Object.assign(${JSON.stringify(pagesJson)},{
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
