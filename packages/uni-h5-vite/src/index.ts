import path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import {
  UNI_EASYCOM_EXCLUDE,
  enableSourceMap,
  getWorkers,
  initUasmWebTransformOptions,
  initUts2jsExtApiOptions,
  isAppVue,
  isEnableConsole,
  isNormalCompileTarget,
  isVueSfcFile,
  resolveUTSCompiler,
  uniCssScopedPlugin,
  uniDecryptUniModulesPlugin,
  uniEncryptUniModulesAssetsPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniJavaScriptWorkersPlugin,
  uniUTSUVueJavaScriptPlugin,
  uniUasmPlugin,
  uniWorkersPlugin,
} from '@dcloudio/uni-cli-shared'
import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniH5Plugin } from './plugin'
import { resolveManifestServerOptions } from './plugin/config'
import { uniCssPlugin } from './plugins/css'
import { uniEasycomPlugin } from './plugins/easycom'
import { uniInjectPlugin } from './plugins/inject'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniPostVuePlugin } from './plugins/postVue'
import { uniRenderjsPlugin } from './plugins/renderjs'
import { uniResolveIdPlugin } from './plugins/resolveId'
import { uniSetupPlugin } from './plugins/setup'
import { uniSSRPlugin } from './plugins/ssr'
import { uniPostSourceMapPlugin } from './plugins/sourcemap'
import { uniCustomElementPlugin } from './plugins/customElement'
import { uniApiPlugin } from './plugins/api'
import { rewriteCompilerSfcParse } from './utils/polyfill'

if (
  process.env.UNI_APP_STYLE_ISOLATION_VERSION === '2' &&
  process.env.UNI_APP_X === 'true'
) {
  rewriteCompilerSfcParse()
}

export default () => {
  const isNewStyleIsolation =
    process.env.UNI_APP_STYLE_ISOLATION_VERSION === '2'
  // 从 manifest.json 的 h5.devServer 中解析 HTTPS 扩展配置，按需注入 basic-ssl 插件。
  const h5BasicSslPlugin = resolveH5BasicSslPlugin()
  return [
    ...(process.env.UNI_APP_X === 'true' && isNormalCompileTarget()
      ? [uniWorkersPlugin(), uniJavaScriptWorkersPlugin()]
      : []),
    ...(isEnableConsole() ? [uniHBuilderXConsolePlugin('uni.__f__')] : []),
    ...(process.env.UNI_APP_X === 'true'
      ? [
          uniDecryptUniModulesPlugin(),
          uniUasmPlugin(),
          uniUTSUVueJavaScriptPlugin(),
          resolveUTSCompiler().uts2js({
            platform: 'web',
            inputDir: process.env.UNI_INPUT_DIR,
            version: process.env.UNI_COMPILER_VERSION,
            sourceMap: enableSourceMap(),
            cacheRoot: path.resolve(
              process.env.UNI_APP_X_CACHE_DIR,
              '.uts2js/cache'
            ),
            modules: {
              vueCompilerDom,
              uniCliShared,
            },
            extApi: initUts2jsExtApiOptions(),
            uasm: initUasmWebTransformOptions(),
            workers: {
              extname: '.js',
              resolve: () => {
                return getWorkers()
              },
            },
          }),
        ]
      : []),
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    uniCssScopedPlugin({
      filter: (id) => {
        // Vapor 模式下，App.vue 也需要处理
        if (isNewStyleIsolation) {
          return isVueSfcFile(id)
        }
        return isVueSfcFile(id) && !isAppVue(id)
      },
    }),
    uniResolveIdPlugin(),
    ...(process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? []
      : [uniMainJsPlugin(), uniManifestJsonPlugin(), uniPagesJsonPlugin()]),
    uniInjectPlugin(),
    uniCssPlugin(),
    uniSSRPlugin(),
    uniSetupPlugin(),
    uniRenderjsPlugin(),
    ...(h5BasicSslPlugin ? [h5BasicSslPlugin] : []),
    uniH5Plugin(),
    ...(process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
      : []),
    uniPostVuePlugin(),
    uniPostSourceMapPlugin(),
    uniCustomElementPlugin(),
    uniApiPlugin(),
  ]
}

function resolveH5BasicSslPlugin() {
  const inputDir = process.env.UNI_INPUT_DIR
  if (!inputDir) {
    return
  }
  // 这里只关心是否启用自动证书，以及透传给 basic-ssl 的那部分参数。
  const { enableBasicSsl, basicSslOptions } =
    resolveManifestServerOptions(inputDir)
  if (!enableBasicSsl) {
    return
  }
  // 需要在真正的 Vite 插件数组中注册，才能参与 configResolved 并注入证书。
  return Object.assign(basicSsl(basicSslOptions), {
    apply: 'serve' as const,
  })
}
