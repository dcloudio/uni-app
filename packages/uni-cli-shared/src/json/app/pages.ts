import { normalizeIdentifier } from '../../utils'

export function normalizeAppPagesJson(pagesJson: Record<string, any>) {
  return polyfillCode + restoreGlobalCode + definePageCode(pagesJson)
}

function definePageCode(pagesJson: Record<string, any>) {
  const importPagesCode: string[] = []
  const definePagesCode: string[] = []
  pagesJson.pages.forEach((page: UniApp.UniRoute) => {
    const pagePath = page.path
    const pageIdentifier = normalizeIdentifier(pagePath)
    importPagesCode.push(
      `import ${pageIdentifier} from './${pagePath}.vue?mpType=page'`
    )
    definePagesCode.push(`__definePage('${pagePath}',${pageIdentifier})`)
  })
  return importPagesCode.join('\n') + '\n' + definePagesCode.join('\n')
}

const polyfillCode = `
if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}
`
const restoreGlobalCode = `
if(uni.restoreGlobal){
  uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval)
}
`

export function normalizeAppConfigService(pagesJson: UniApp.PagesJson) {
  return `
;(function(){
const u=void 0;isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
const __uniConfig = ${normalizeAppUniConfig(pagesJson)};
const __uniRoutes = ${normalizeAppUniRoutes(pagesJson)};
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,${normalizeGlobalStatement(
    GLOBALS
  )}}}}}); 
})();
`
}

function normalizeAppUniConfig(pagesJson: UniApp.PagesJson) {
  return JSON.stringify(pagesJson.globalStyle)
}
function normalizeAppUniRoutes(pagesJson: UniApp.PagesJson) {
  const uniRoutes: {
    path: string
    meta: Partial<UniApp.PageRouteMeta>
    style: UniApp.PagesJsonPageStyle
  }[] = []
  pagesJson.pages.forEach((page) => {
    uniRoutes.push(normalizeAppUniRoute(page))
  })
  return JSON.stringify(pagesJson)
}

function normalizeAppUniRoute(page: UniApp.PagesJsonPageOptions) {
  const pageMeta: Partial<UniApp.PageRouteMeta> = {}
  return {
    path: page.path,
    meta: pageMeta,
    style: page.style,
  }
}

function normalizeGlobalStatement(globals: string[]) {
  return globals.map((g) => `${g}:u`).join(',')
}

const GLOBALS = [
  'global',
  'window',
  'document',
  'frames',
  'self',
  'location',
  'navigator',
  'localStorage',
  'history',
  'Caches',
  'screen',
  'alert',
  'confirm',
  'prompt',
  'fetch',
  'XMLHttpRequest',
  'WebSocket',
  'webkit',
  'print',
]
