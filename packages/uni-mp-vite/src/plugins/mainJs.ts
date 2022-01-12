import {
  defineUniMainJsPlugin,
  parseProgram,
  transformDynamicImports,
  updateMiniProgramGlobalComponents,
  withSourcemap,
} from '@dcloudio/uni-cli-shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { dynamicImport } from './usingComponents'

export function uniMainJsPlugin(
  options: Partial<SFCScriptCompileOptions> = {}
) {
  return defineUniMainJsPlugin((opts) => {
    return {
      name: 'uni:mp-main-js',
      enforce: 'pre',
      async transform(source, id) {
        if (opts.filter(id)) {
          source = source.includes('createSSRApp')
            ? createApp(source)
            : createLegacyApp(source)

          const inputDir = process.env.UNI_INPUT_DIR
          const { imports } = await updateMiniProgramGlobalComponents(
            id,
            parseProgram(source, id, {
              babelParserPlugins: options.babelParserPlugins,
            }),
            {
              inputDir,
              resolve: this.resolve,
            }
          )
          const { code, map } = await transformDynamicImports(source, imports, {
            id,
            sourceMap: withSourcemap(opts.resolvedConfig),
            dynamicImport,
          })
          return {
            code:
              `import 'plugin-vue:export-helper';import 'uni-mp-runtime';import './pages.json.js';` +
              code,
            map,
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
