import { PAGES_JSON_JS, defineUniMainJsPlugin } from '@dcloudio/uni-cli-shared'

export function uniMainJsPlugin() {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'uni:app-vue-main-js',
      enforce: 'pre',
      transform(code, id) {
        if (opts.filter(id)) {
          code = code.includes('createSSRApp')
            ? createApp(code)
            : createLegacyApp(code)
          return {
            code: `import './${PAGES_JSON_JS}';` + code,
            map: { mappings: '' },
          }
        }
      },
    }
  })
}

function createApp(code: string) {
  return `${code.replace(
    'createSSRApp',
    'createVueApp as createSSRApp'
  )};\nconst {app:__app__,Vuex:__Vuex__,Pinia:__Pinia__}=createApp();uni.Vuex=__Vuex__;uni.Pinia=__Pinia__;__app__.provide('__globalStyles', __uniConfig.styles);__app__._component.mpType='app';__app__._component.render=()=>{};__app__.mount("#app");`
}

function createLegacyApp(code: string) {
  return `function createApp(rootComponent,rootProps){rootComponent.mpTye='app';rootComponent.render=()=>{};const app=createVueApp(rootComponent,rootProps);app.provide('__globalStyles', __uniConfig.styles);const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace(
    'createApp',
    'createVueApp'
  )}`
}
