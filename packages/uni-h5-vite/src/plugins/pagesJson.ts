import type { Plugin, ResolvedConfig } from 'vite'
import {
  API_DEPS_CSS,
  BASE_COMPONENTS_STYLE_PATH,
  type FEATURE_DEFINES,
  H5_FRAMEWORK_STYLE_PATH,
  MANIFEST_JSON_JS,
  checkPagesJson,
  createRollupError,
  defineUniPagesJsonPlugin,
  isEnableTreeShaking,
  normalizeIdentifier,
  normalizePagePath,
  normalizePagesJson,
  normalizePagesRoute,
  parseManifestJsonOnce,
  preUVueJson,
} from '@dcloudio/uni-cli-shared'
import { isSSR } from '../utils'

export function uniPagesJsonPlugin(): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'uni:h5-pages-json',
      enforce: 'pre',
      transform(code, id, opt) {
        if (opts.filter(id)) {
          const { resolvedConfig } = opts
          const ssr = isSSR(opt)
          if (process.env.UNI_APP_X === 'true') {
            // 调整换行符，确保 parseTree 的loc正确
            code = code.replace(/\r\n/g, '\n')
            try {
              checkPagesJson(preUVueJson(code, id), process.env.UNI_INPUT_DIR)
            } catch (err: any) {
              if (err.loc) {
                const error = createRollupError(
                  'uni:app-pages',
                  'pages.json',
                  err,
                  code
                )
                this.error(error)
              } else {
                throw err
              }
            }
          }
          return {
            code:
              registerGlobalCode(resolvedConfig, ssr) +
              generatePagesJsonCode(ssr, code, resolvedConfig),
            map: { mappings: '' },
          }
        }
      },
    }
  })
}

function generatePagesJsonCode(
  ssr: boolean | undefined,
  jsonStr: string,
  config: ResolvedConfig
) {
  const globalName = getGlobal(ssr)
  const pagesJson = normalizePagesJson(jsonStr, process.env.UNI_PLATFORM)
  const { importLayoutComponentsCode, defineLayoutComponentsCode } =
    generateLayoutComponentsCode(globalName, pagesJson)
  const definePagesCode = generatePagesDefineCode(pagesJson, config)
  const uniRoutesCode = generateRoutes(globalName, pagesJson, config)
  const uniConfigCode = generateConfig(globalName, pagesJson, config)
  const cssCode = generateCssCode(config)
  const vueType = process.env.UNI_APP_X === 'true' ? 'uvue' : 'nvue'
  return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, useI18n, setupWindow, setupPage } from '@dcloudio/uni-h5'
import { appId, appName, appVersion, appVersionCode, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, googleMapKey, aMapKey, bMapKey, aMapSecurityJsCode, aMapServiceHost, ${vueType}, locale, fallbackLocale, darkmode, themeConfig } from './${MANIFEST_JSON_JS}'
const locales = import.meta.glob('./locale/*.json', { eager: true })
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
// 兼容 wx 对象
function registerGlobalCode(config: ResolvedConfig, ssr?: boolean) {
  const name = getGlobal(ssr)
  const enableTreeShaking = isEnableTreeShaking(
    parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  )

  if (enableTreeShaking && config.command === 'build' && !ssr) {
    // 非 SSR 的发行模式，补充全局 uni 对象
    return `import { upx2px, getApp } from '@dcloudio/uni-h5';${name}.uni = {};${name}.wx = {};${name}.rpx2px = upx2px`
  }

  return `
import {uni,upx2px,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-h5'
${name}.getApp = getApp
${name}.getCurrentPages = getCurrentPages
${name}.wx = uni
${name}.uni = uni
${name}.UniViewJSBridge = UniViewJSBridge
${name}.UniServiceJSBridge = UniServiceJSBridge
${name}.rpx2px = upx2px
${name}.__setupPage = (com)=>setupPage(com)
`
}

function generateCssCode(config: ResolvedConfig) {
  const define = config.define! as FEATURE_DEFINES
  const cssFiles = [H5_FRAMEWORK_STYLE_PATH + 'base.css']
  if (config.isProduction) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'shadow.css')
  }
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
  // x 项目直接集成 uvue.css
  if (process.env.UNI_APP_X === 'true') {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'uvue.css')
  } else {
    if (define.__UNI_FEATURE_NVUE__) {
      cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'nvue.css')
    }
  }

  if (define.__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    cssFiles.push(H5_FRAMEWORK_STYLE_PATH + 'pageRefresh.css')
  }
  if (define.__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__) {
    cssFiles.push(BASE_COMPONENTS_STYLE_PATH + 'input.css')
  }
  const enableTreeShaking = isEnableTreeShaking(
    parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  )
  if (config.command === 'serve' || !enableTreeShaking) {
    const apiDepsCss = API_DEPS_CSS(process.env.UNI_APP_X === 'true')
    // 开发模式或禁用摇树优化，自动添加所有API相关css
    Object.keys(apiDepsCss).forEach((name) => {
      const styles = apiDepsCss[name as keyof typeof apiDepsCss]
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
  const windowNames = {
    topWindow: -1,
    leftWindow: -2,
    rightWindow: -3,
  }
  let importLayoutComponentsCode = ''
  let defineLayoutComponentsCode = `${globalName}.__uniLayout = ${globalName}.__uniLayout || {}\n`
  Object.keys(windowNames).forEach((name) => {
    const windowConfig = pagesJson[name as keyof typeof windowNames]
    if (windowConfig && windowConfig.path) {
      importLayoutComponentsCode += `const ${name} = defineAsyncComponent(()=>import('./${
        windowConfig.path
      }').then(com=>setupWindow(com.default || com,${
        windowNames[name as keyof typeof windowNames]
      })))\n`
      defineLayoutComponentsCode += `${globalName}.__uniConfig.${name}.component = ${name}\n`
    }
  })

  return {
    importLayoutComponentsCode,
    defineLayoutComponentsCode,
  }
}

function generatePageDefineCode(pageOptions: UniApp.PagesJsonPageOptions) {
  let pagePathWithExtname = normalizePagePath(pageOptions.path, 'h5')
  if (!pagePathWithExtname) {
    // 不存在时，仍引用，此时编译会报错文件不存在
    pagePathWithExtname = pageOptions.path + '.vue'
  }
  const pageIdent = normalizeIdentifier(pageOptions.path)
  return `const ${pageIdent}Loader = ()=>import('./${pagePathWithExtname}').then(com => setupPage(com.default || com))
const ${pageIdent} = defineAsyncComponent(extend({loader:${pageIdent}Loader},AsyncComponentOptions))`
}

function generatePagesDefineCode(
  pagesJson: UniApp.PagesJson,
  _config: ResolvedConfig
) {
  const { pages } = pagesJson
  return (
    `const AsyncComponentOptions = {
      delay: async.delay,
      timeout: async.timeout,
      suspensible: async.suspensible
    }
    if(async.loading){
      AsyncComponentOptions.loadingComponent = {
        name:'SystemAsyncLoading',
        render(){
          return createVNode(resolveComponent(async.loading))
        }
      }
    }
    if(async.error){
      AsyncComponentOptions.errorComponent = {
        name:'SystemAsyncError',
        render(){
          return createVNode(resolveComponent(async.error))
        }
      }
    }
  ` + pages.map((pageOptions) => generatePageDefineCode(pageOptions)).join('\n')
  )
}

function generatePageRoute(
  { path, meta }: UniApp.UniRoute,
  _config: ResolvedConfig
) {
  const { isEntry } = meta
  const alias = isEntry ? `\n  alias:'/${path}',` : ''
  // 目前单页面未处理 query=>props
  return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{setup(){ const app = getApp(); const query = app && app.$route && app.$route.query || {}; return ()=>renderPage(${normalizeIdentifier(
    path
  )},query)}},
  loader: ${normalizeIdentifier(path)}Loader,
  meta: ${JSON.stringify(meta)}
}`
}

function generatePagesRoute(
  pagesRouteOptions: UniApp.UniRoute[],
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
function renderPage(component,props){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, extend({},props,{ref: "page"}), null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
${globalName}.__uniRoutes=[${[
    ...generatePagesRoute(normalizePagesRoute(pagesJson), config),
  ].join(
    ','
  )}].map(uniRoute=>(uniRoute.meta.route = (uniRoute.alias || uniRoute.path).slice(1),uniRoute))`
}

function generateConfig(
  globalName: string,
  pagesJson: Record<string, any>,
  config: ResolvedConfig
) {
  delete pagesJson.pages
  delete pagesJson.subPackages
  delete pagesJson.subpackages
  pagesJson.compilerVersion = process.env.UNI_COMPILER_VERSION
  const isX = process.env.UNI_APP_X === 'true'
  const vueType = isX ? 'uvue' : 'nvue'
  let tabBarCode = ''
  if (isX) {
    const tabBar = pagesJson.tabBar
    delete pagesJson.tabBar
    tabBarCode = `${globalName}.__uniConfig.getTabBarConfig = () => {return ${
      tabBar ? JSON.stringify(tabBar) : 'undefined'
    }};
    ${globalName}.__uniConfig.tabBar = __uniConfig.getTabBarConfig();`
  }
  return `${isX ? `${globalName}.__uniX = true` : ''}
  ${globalName}.__uniConfig=extend(${JSON.stringify(pagesJson)},{
  appId,
  appName,
  appVersion,
  appVersionCode,
  async,
  debug,
  networkTimeout,
  sdkConfigs,
  qqMapKey,
  bMapKey,
  googleMapKey,
  aMapKey,
  aMapSecurityJsCode,
  aMapServiceHost,
  ${vueType},
  locale,
  fallbackLocale,
  locales:Object.keys(locales).reduce((res,name)=>{const locale=name.replace(/\\.\\/locale\\/(uni-app.)?(.*).json/,'$2');extend(res[locale]||(res[locale]={}),locales[name].default);return res},{}),
  router,
  darkmode,
  themeConfig,
})
${tabBarCode}
`
}
