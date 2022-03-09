import {
  initH5Provide,
  isVueSfcFile,
  uniCssScopedPlugin,
  uniHBuilderXConsolePlugin,
  uniViteInjectPlugin,
  UNI_EASYCOM_EXCLUDE,
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
  uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
  uniCssScopedPlugin({
    filter: (id) => isVueSfcFile(id) && !id.endsWith('App.vue'),
  }),
  uniResolveIdPlugin(),
  ...(process.env.UNI_H5_BROWSER === 'builtin'
    ? [
        uniViteInjectPlugin('uni:h5-inject-hbx', initH5Provide()),
        uniHBuilderXConsolePlugin(),
      ]
    : []),
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
