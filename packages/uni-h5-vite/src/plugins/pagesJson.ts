import fs from 'fs'
import path from 'path'
import slash from 'slash'
import { Plugin, ResolvedConfig } from 'vite'
import { extend, camelize, capitalize } from '@vue/shared'
import {
  FEATURE_DEFINES,
  H5_FRAMEWORK_STYLE_PATH,
  BASE_COMPONENTS_STYLE_PATH,
  normalizePagesJson,
  API_DEPS_CSS,
} from '@dcloudio/uni-cli-shared'

const pkg = require('@dcloudio/vite-plugin-uni/package.json')

const PAGES_JSON_JS = 'pages.json.js'

export function uniPagesJsonPlugin(): Plugin {
  let pagesJsonPath = ''
  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite:uni-h5-pages-json',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
      pagesJsonPath = slash(path.join(process.env.UNI_INPUT_DIR, 'pages.json'))
    },
    resolveId(id) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return pagesJsonPath + '.js'
      }
    },
    transform(code, id, ssr) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return {
          code:
            (resolvedConfig.command === 'serve' ||
            (resolvedConfig.command === 'build' && ssr)
              ? registerGlobalCode(resolvedConfig, ssr)
              : '') + generatePagesJsonCode(ssr, code, resolvedConfig),
          map: { mappings: '' },
        }
      }
    },
    load(id) {
      if (id.endsWith(PAGES_JSON_JS)) {
        return fs.readFileSync(pagesJsonPath, 'utf8')
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
  config: ResolvedConfig
) {
  const globalName = getGlobal(ssr)
  const pagesJson = normalizePagesJson(
    jsonStr,
    process.env.UNI_INPUT_DIR,
    process.env.UNI_PLATFORM
  )
  const { importLayoutComponentsCode, defineLayoutComponentsCode } =
    generateLayoutComponentsCode(globalName, pagesJson)
  const definePagesCode = generatePagesDefineCode(pagesJson, config)
  const uniRoutesCode = generateRoutes(globalName, pagesJson, config)
  const uniConfigCode = generateConfig(globalName, pagesJson, config)
  const manifestJsonPath = slash(
    path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json.js')
  )
  const cssCode = generateCssCode(config)

  return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, AsyncLoadingComponent, AsyncErrorComponent } from '@dcloudio/uni-h5'
import { appid, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, nvue } from '${manifestJsonPath}'
${importLayoutComponentsCode}
const extend = Object.assign
${cssCode}
${uniConfigCode}
${defineLayoutComponentsCode}
${definePagesCode}
${uniRoutesCode}
${config.command === 'serve' ? hmrCode : ''}
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

function generateCssCode(config: ResolvedConfig) {
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
  if (config.command === 'serve') {
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

function generateLayoutComponentsCode(
  globalName: string,
  pagesJson: UniApp.PagesJson
) {
  const windowNames: Array<'topWindow' | 'leftWindow' | 'rightWindow'> = [
    'topWindow',
    'leftWindow',
    'rightWindow',
  ]
  let importLayoutComponentsCode = ''
  let defineLayoutComponentsCode = `${globalName}.__uniLayout = ${globalName}.__uniLayout || {}\n`
  windowNames.forEach((name) => {
    const windowConfig = pagesJson[name]
    if (windowConfig && windowConfig.path) {
      importLayoutComponentsCode += `import ${name} from './${windowConfig.path}'\n`
      defineLayoutComponentsCode += `${globalName}.__uniConfig.${name}.component = ${name}\n`
    }
  })

  return {
    importLayoutComponentsCode,
    defineLayoutComponentsCode,
  }
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
    const pagePath = pageOptions.path
    const name = normalizePageIdentifier(pagePath)
    const isEntry = firstPagePath === pagePath ? true : undefined
    const tabBarIndex = tabBarList.findIndex(
      (tabBarPage: { pagePath: string }) => tabBarPage.pagePath === pagePath
    )
    const isTabBar = tabBarIndex !== -1 ? true : undefined
    const isNVue = fs.existsSync(
      path.join(process.env.UNI_INPUT_DIR, pagePath + '.nvue')
    )
    let windowTop = 0
    const meta = extend(
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
  component:{setup(){return ()=>renderPage(${name})}},
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
  config: ResolvedConfig
) {
  return `
function renderPage(component){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, { ref: "page" }, null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
${globalName}.__uniRoutes=[${[
    ...generatePagesRoute(normalizePagesRoute(pagesJson), config),
  ].join(',')}]`
}

function generateConfig(
  globalName: string,
  pagesJson: Record<string, any>,
  config: ResolvedConfig
) {
  delete pagesJson.pages
  delete pagesJson.subPackages
  delete pagesJson.subpackages
  pagesJson.compilerVersion = pkg['uni-app'].compilerVersion
  return (
    (config.command === 'serve'
      ? ''
      : `${globalName}['____'+appid+'____']=true
delete ${globalName}['____'+appid+'____']
`) +
    `${globalName}.__uniConfig=extend(${JSON.stringify(pagesJson)},{
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
