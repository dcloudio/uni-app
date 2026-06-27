import {
  PAGES_JSON_JS,
  defineUniMainJsPlugin,
  enableSourceMap,
  parseProgram,
  transformDynamicImports,
  updateMiniProgramGlobalComponents,
} from '@dcloudio/uni-cli-shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  UNI_MP_RUNTIME_ID,
  VUE_EXPORT_HELPER_ID,
  parseIndependentRoot,
  withoutIndependentRoot,
} from './independentUtils'
import { dynamicImport } from './usingComponents'

const updateMiniProgramGlobalComponentsWithRoot =
  updateMiniProgramGlobalComponents as typeof updateMiniProgramGlobalComponents &
    ((
      filename: Parameters<typeof updateMiniProgramGlobalComponents>[0],
      ast: Parameters<typeof updateMiniProgramGlobalComponents>[1],
      options: Parameters<typeof updateMiniProgramGlobalComponents>[2] & {
        root?: string
      }
    ) => ReturnType<typeof updateMiniProgramGlobalComponents>)

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
        const independentRoot = parseIndependentRoot(id)
        const filename = independentRoot ? withoutIndependentRoot(id) : id
        if (opts.filter(filename)) {
          source =
            !independentRoot && source.includes('createSSRApp')
              ? createApp(source)
              : createLegacyApp(source)

          const inputDir = process.env.UNI_INPUT_DIR
          const { imports } = await updateMiniProgramGlobalComponentsWithRoot(
            id,
            parseProgram(source, id, {
              babelParserPlugins: options.babelParserPlugins,
            }),
            {
              inputDir,
              resolve: this.resolve,
              normalizeComponentName,
              root: independentRoot,
            }
          )
          const { code, map } = await transformDynamicImports(source, imports, {
            id,
            sourceMap: enableSourceMap(),
            dynamicImport,
          })
          if (independentRoot) {
            return {
              code,
              map,
            }
          }
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
