import {
  addMiniProgramUsingComponents,
  defineUniMainJsPlugin,
  transformVueComponentImports,
} from '@dcloudio/uni-cli-shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { dynamicImport } from './usingComponents'

export function uniMainJsPlugin(
  options: Partial<SFCScriptCompileOptions> = {}
) {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'vite:uni-mp-main-js',
      enforce: 'pre',
      async transform(source, id) {
        if (opts.filter(id)) {
          source = source.includes('createSSRApp')
            ? createApp(source)
            : createLegacyApp(source)

          const inputDir = process.env.UNI_INPUT_DIR
          const { code, usingComponents } = await transformVueComponentImports(
            source,
            id,
            {
              root: inputDir,
              global: true,
              resolve: this.resolve,
              dynamicImport,
              babelParserPlugins: options.babelParserPlugins,
            }
          )
          addMiniProgramUsingComponents('app', usingComponents)
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
