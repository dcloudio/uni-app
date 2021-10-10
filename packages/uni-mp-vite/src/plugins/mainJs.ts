import { defineUniMainJsPlugin } from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '../plugin'

export function uniMainJsPlugin(options: UniMiniProgramPluginOptions) {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'vite:uni-mp-main-js',
      enforce: 'pre',
      transform(code, id) {
        if (opts.filter(id)) {
          code = code.includes('createSSRApp')
            ? createApp(code)
            : createLegacyApp(code)
          return {
            code:
              `import 'plugin-vue:export-helper';import 'uni-mp-runtime';import './pages.json.js';` +
              code,
            map: this.getCombinedSourcemap(),
          }
        }
      },
    }
  })
}

function createApp(code: string) {
  return `${code};createApp().app.mount("#app");`
}

function createLegacyApp(code: string) {
  return code
}
