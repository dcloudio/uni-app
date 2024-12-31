import {
  PAGES_JSON_JS,
  defineUniMainJsPlugin,
  enableSourceMap,
  parseProgram,
  transformDynamicImports,
  updateMiniProgramGlobalComponents,
} from '@dcloudio/uni-cli-shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { dynamicImport } from './usingComponents'

export function uniMainJsPlugin(
  options: {
    normalizeComponentName?: (name: string) => string
    babelParserPlugins?: SFCScriptCompileOptions['babelParserPlugins']
  } = {}
) {
  const normalizeComponentName =
    options.normalizeComponentName || ((name: string) => name)
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
              normalizeComponentName,
            }
          )
          const { code, map } = await transformDynamicImports(source, imports, {
            id,
            sourceMap: enableSourceMap(),
            dynamicImport,
          })
          return {
            code:
              `import '\0plugin-vue:export-helper';import 'uni-mp-runtime';import './${PAGES_JSON_JS}';` +
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
