import {
  PAGES_JSON_JS,
  defineUniMainJsPlugin,
  isSsr,
  isUniAppXWebVapor,
} from '@dcloudio/uni-cli-shared'
import { isSSR, isSsrManifest } from '../utils'

export function uniMainJsPlugin() {
  const isWebVapor = isUniAppXWebVapor()
  return defineUniMainJsPlugin((opts) => {
    let runSSR = false
    return {
      name: 'uni:h5-main-js',
      enforce: 'pre',
      configResolved(config) {
        runSSR =
          isSsr(config.command, config) || isSsrManifest(config.command, config)
      },
      transform(code, id, options) {
        if (opts.filter(id)) {
          if (!runSSR) {
            code = code.includes('createSSRApp')
              ? isWebVapor
                ? createVaporApp(code)
                : createApp(code)
              : isWebVapor
              ? createVaporLegacyApp(code)
              : createLegacyApp(code)
          } else {
            code = isSSR(options)
              ? createSSRServerApp(code)
              : createSSRClientApp(code, isWebVapor)
          }
          code = `import './${PAGES_JSON_JS}';${code}`
          return {
            code,
            map: this.getCombinedSourcemap(),
          }
        }
      },
    }
  })
}

function createVaporApp(code: string) {
  return `import { plugin as __plugin } from '@dcloudio/uni-h5';${code.replace(
    'createSSRApp',
    'createVaporApp as createSSRApp'
  )};\ncreateApp().app.use(__plugin).mount("#app");`
}

function createVaporLegacyApp(code: string) {
  return `import { plugin as __plugin } from '@dcloudio/uni-h5';function createApp(rootComponent,rootProps){return createVaporApp(rootComponent, rootProps).use(__plugin)};${code.replace(
    'createApp',
    'createVaporApp'
  )}`
}

function createApp(code: string) {
  return `import { plugin as __plugin } from '@dcloudio/uni-h5';${code.replace(
    'createSSRApp',
    'createVueApp as createSSRApp'
  )};\ncreateApp().app.use(__plugin).mount("#app");`
}

function createLegacyApp(code: string) {
  return `import { plugin as __plugin } from '@dcloudio/uni-h5';function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps).use(__plugin)};${code.replace(
    'createApp',
    'createVueApp'
  )}`
}

function createSSRClientApp(code: string, isWebVapor: boolean) {
  if (isWebVapor) {
    code = code.replace('createSSRApp', 'createVaporSSRApp as createSSRApp')
  }
  return `import { plugin as __plugin } from '@dcloudio/uni-h5';import { UNI_SSR, UNI_SSR_STORE } from '@dcloudio/uni-shared';${code};\n// @ts-ignore\nconst { app: __app, store: __store } = createApp();__app.use(__plugin);__store && window[UNI_SSR] && window[UNI_SSR][UNI_SSR_STORE] && __store.replaceState(window[UNI_SSR][UNI_SSR_STORE]);__app.router.isReady().then(() => __app.mount("#app"));`
}

function createSSRServerApp(code: string) {
  return code
}
