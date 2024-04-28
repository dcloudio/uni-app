import path from 'path'
import {
  UNI_EASYCOM_EXCLUDE,
  isAppVue,
  isVueSfcFile,
  resolveUTSCompiler,
  uniCssScopedPlugin,
  uniEncryptEasyComUniModulesPlugin,
  uniUTSUVueJavaScriptPlugin,
} from '@dcloudio/uni-cli-shared'
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
import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'

export default [
  ...(process.env.UNI_APP_X === 'true'
    ? [
        uniUTSUVueJavaScriptPlugin(),
        resolveUTSCompiler().uts2js({
          inputDir: process.env.UNI_INPUT_DIR,
          version: process.env.UNI_COMPILER_VERSION,
          cacheRoot: path.resolve(
            process.env.UNI_APP_X_CACHE_DIR ||
              path.resolve(process.env.UNI_OUTPUT_DIR, '../.web'),
            '.uts2js/cache'
          ),
          modules: {
            vueCompilerDom,
            uniCliShared,
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
    ? [uniEncryptEasyComUniModulesPlugin()]
    : []),
  uniPostVuePlugin(),
  uniPostSourceMapPlugin(),
]
