import {
  MANIFEST_JSON_JS,
  PAGES_JSON_JS,
  defineUniMainJsPlugin,
} from '@dcloudio/uni-cli-shared'
import { APP_CSS_JS } from './appCss'

export function uniMainJsPlugin({
  renderer,
  appService,
}: {
  renderer?: 'native'
  appService: boolean
}) {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'uni:app-nvue-main-js',
      enforce: 'pre',
      transform(code, id) {
        if (opts.filter(id)) {
          if (renderer !== 'native') {
            return {
              code: `import './${PAGES_JSON_JS}';import('${APP_CSS_JS}').then(()=>{})`,
              map: { mappings: '' },
            }
          }
          if (appService) {
            code = code.includes('createSSRApp')
              ? createApp(code)
              : createLegacyApp(code)
            return {
              code:
                `import './${MANIFEST_JSON_JS}';\nimport './${PAGES_JSON_JS}';\n` +
                code,
              map: { mappings: '' },
            }
          }
          return {
            code: `import './${PAGES_JSON_JS}';`,
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
  )};\nconst {app:__app__,Vuex:__Vuex__,Pinia:__Pinia__}=createApp();uni.Vuex=__Vuex__;uni.Pinia=__Pinia__;__app__._component.mpType='app';__app__._component.render=()=>{};__app__.mount('#app');`
}

function createLegacyApp(code: string) {
  return `function createApp(rootComponent,rootProps){rootComponent.mpTye='app';rootComponent.render=()=>{};const app=createVueApp(rootComponent,rootProps);const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace(
    'createApp',
    'createVueApp'
  )}`
}
