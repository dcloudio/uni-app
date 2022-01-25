import { defineUniMainJsPlugin } from '@dcloudio/uni-cli-shared'
import { APP_CSS_JS } from './appCss'

export function uniMainJsPlugin() {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'uni:app-nvue-main-js',
      enforce: 'pre',
      transform(code, id) {
        if (opts.filter(id)) {
          if (process.env.UNI_RENDERER === 'native') {
            code = code.includes('createSSRApp')
              ? createApp(code)
              : createLegacyApp(code)
            return {
              code: `import './pages.json.js';` + code,
              map: { mappings: '' },
            }
          }
          return {
            code: `import './pages.json.js';import('${APP_CSS_JS}').then(()=>{})`,
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
  )};const __app__=createApp().app;__app__._component.mpType='app';__app__._component.render=()=>{};__app__.use(uni.__vuePlugin).mount("#app");`
}

function createLegacyApp(code: string) {
  return `function createApp(rootComponent,rootProps){rootComponent.mpTye='app';rootComponent.render=()=>{};const app=createVueApp(rootComponent,rootProps).use(uni.__vuePlugin);const oldMount=app.mount;app.mount=(container)=>{const appVm=oldMount.call(app,container);return appVm;};return app;};${code.replace(
    'createApp',
    'createVueApp'
  )}`
}
