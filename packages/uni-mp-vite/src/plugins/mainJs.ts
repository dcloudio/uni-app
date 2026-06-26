import {
  PAGES_JSON_JS,
  defineUniMainJsPlugin,
  enableSourceMap,
  parseProgram,
  transformDynamicImports,
  updateMiniProgramGlobalComponents,
} from '@dcloudio/uni-cli-shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { UNI_MP_RUNTIME_ID, VUE_EXPORT_HELPER_ID } from './independentUtils'
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
              `import '${VUE_EXPORT_HELPER_ID}';import '${UNI_MP_RUNTIME_ID}';import './${PAGES_JSON_JS}';` +
              code,
            map,
          }
        }
      },
    }
  })
}

function createApp(code: string) {
  // 此处换行防止用户代码最后一行是单行注释，导致应用无法启动
  return `${code};\ncreateApp().app.mount("#app");`
}

function createLegacyApp(code: string) {
  return code
}
