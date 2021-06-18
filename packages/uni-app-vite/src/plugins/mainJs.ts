import { defineUniMainJsPlugin } from '@dcloudio/uni-cli-shared'

export function uniMainJsPlugin() {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'vite:uni-app-main-js',
      enforce: 'pre',
      transform(code, id) {
        if (opts.filter(id)) {
          code = code.includes('createSSRApp')
            ? createApp(code)
            : createLegacyApp(code)
          return {
            code,
            map: this.getCombinedSourcemap(),
          }
        }
      },
    }
  })
}

function createApp(code: string) {
  return `createApp().app.mount("#app");${code.replace(
    'createSSRApp',
    'createVueApp as createSSRApp'
  )}`
}

function createLegacyApp(code: string) {
  return `function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps)};${code.replace(
    'createApp',
    'createVueApp'
  )}`
}
