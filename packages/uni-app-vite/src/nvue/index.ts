import {
  initAppProvide,
  uniHBuilderXConsolePlugin,
  uniViteInjectPlugin,
  UNI_EASYCOM_EXCLUDE,
} from '@dcloudio/uni-cli-shared'

import { uniEasycomPlugin } from '../plugins/easycom'
import { uniManifestJsonPlugin } from '../plugins/manifestJson'
import { uniStatsPlugin } from '../plugins/stats'
import { uniAppNVuePlugin } from './plugin'
import { uniAppCssPlugin } from './plugins/appCss'
import { uniEsbuildPlugin } from './plugins/esbuild'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniPagesJsonPlugin } from './plugins/pagesJson'

export { initNVueNodeTransforms } from './plugin'

export function initNVuePlugins() {
  const renderer = process.env.UNI_RENDERER
  return [
    uniAppCssPlugin(),
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    uniHBuilderXConsolePlugin(),
    uniMainJsPlugin({ renderer }),
    ...(process.env.UNI_RENDERER === 'native' ? [uniManifestJsonPlugin()] : []),
    uniPagesJsonPlugin({ renderer }),
    uniViteInjectPlugin('uni:app-inject', initAppProvide()),
    uniStatsPlugin(),
    uniAppNVuePlugin(),
    uniEsbuildPlugin({ renderer }),
  ]
}
