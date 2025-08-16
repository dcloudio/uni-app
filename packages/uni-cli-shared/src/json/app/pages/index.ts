import { globalCode } from './code'
import { defineNVuePageCode, definePageCode } from './definePage'
import { normalizeAppUniConfig } from './uniConfig'
import { normalizeAppUniRoutes } from './uniRoutes'

export function normalizeAppPagesJson(
  pagesJson: Record<string, any>,
  platform: UniApp.PLATFORM = 'app',
  dynamicImport: boolean = false
) {
  return definePageCode(pagesJson, platform, dynamicImport)
}

export function normalizeAppNVuePagesJson(pagesJson: Record<string, any>) {
  return defineNVuePageCode(pagesJson)
}

export function normalizeAppConfigService(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
  return `
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = ${normalizeAppUniConfig(pagesJson, manifestJson)};
  const __uniRoutes = ${normalizeAppUniRoutes(
    pagesJson
  )}.map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=${process.env.UNI_NVUE_APP_STYLES || '[]'};//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,${globalCode}}}}}); 
  })();
  `
}
