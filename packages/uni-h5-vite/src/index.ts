import path from 'path'
import {
  UNI_EASYCOM_EXCLUDE,
  enableSourceMap,
  getWorkers,
  isAppVue,
  isEnableConsole,
  isVueSfcFile,
  resolveUTSCompiler,
  uniCssScopedPlugin,
  uniDecryptUniModulesPlugin,
  uniEncryptUniModulesAssetsPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniUTSUVueJavaScriptPlugin,
} from '@dcloudio/uni-cli-shared'
import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniH5Plugin } from './plugin'
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

export default () => [
  ...(isEnableConsole() ? [uniHBuilderXConsolePlugin('uni.__f__')] : []),
  ...(process.env.UNI_APP_X === 'true'
    ? [
        uniDecryptUniModulesPlugin(),
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
          resolveWorkers: () => {
            return getWorkers()
          },
        }),
      ]
    : []),
  uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
  uniCssScopedPlugin({
    filter: (id) => isVueSfcFile(id) && !isAppVue(id),
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
  uniH5Plugin(),
  ...(process.env.UNI_COMPILE_TARGET === 'uni_modules'
    ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
    : []),
  uniPostVuePlugin(),
  uniPostSourceMapPlugin(),
  uniCustomElementPlugin(),
]
