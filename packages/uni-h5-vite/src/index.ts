import {
  isVueSfcFile,
  uniCssScopedPlugin,
  UNI_EASYCOM_EXCLUDE,
  resolveUTSCompiler,
  uniUTSJsPlugin,
  isAppVue,
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

export default [
  ...(process.env.UNI_APP_X === 'true'
    ? [uniUTSJsPlugin(), resolveUTSCompiler().uts2js({})]
    : []),
  uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
  uniCssScopedPlugin({
    filter: (id) => isVueSfcFile(id) && !isAppVue(id),
  }),
  uniResolveIdPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniInjectPlugin(),
  uniCssPlugin(),
  uniSSRPlugin(),
  uniSetupPlugin(),
  uniRenderjsPlugin(),
  uniH5Plugin(),
  uniPostVuePlugin(),
]
