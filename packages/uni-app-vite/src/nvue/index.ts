import {
  UNI_EASYCOM_EXCLUDE,
  initAppProvide,
  uniEasycomPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniUniModulesExtApiPlugin,
  uniViteInjectPlugin,
} from '@dcloudio/uni-cli-shared'

import { uniManifestJsonPlugin } from '../plugins/manifestJson'
import { uniStatsPlugin } from '../plugins/stats'
import { uniTemplatePlugin } from '../plugins/template'
import { uniAppNVuePlugin } from './plugin'
import { uniAppCssPlugin } from './plugins/appCss'
import { uniEsbuildPlugin } from './plugins/esbuild'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniRenderjsPlugin } from './plugins/renderjs'

export { initNVueNodeTransforms } from './plugin'

export function initNVuePlugins() {
  const renderer = process.env.UNI_RENDERER
  const appService = process.env.UNI_RENDERER_NATIVE === 'appService'

  return process.env.UNI_COMPILE_TARGET === 'ext-api'
    ? [
        uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
        uniHBuilderXConsolePlugin(),
        uniViteInjectPlugin('uni:app-inject', initAppProvide()),
        uniRenderjsPlugin(),
        uniAppNVuePlugin({ appService }),
        uniUniModulesExtApiPlugin(),
      ]
    : process.env.UNI_COMPILE_TARGET === 'uni_modules'
    ? [
        uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
        uniHBuilderXConsolePlugin(),
        uniViteInjectPlugin('uni:app-inject', initAppProvide()),
        uniRenderjsPlugin(),
        uniAppNVuePlugin({ appService }),
        uniEncryptUniModulesPlugin(),
      ]
    : [
        uniAppCssPlugin(),
        uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
        uniHBuilderXConsolePlugin(),
        uniMainJsPlugin({ renderer, appService }),
        uniManifestJsonPlugin(),
        uniPagesJsonPlugin({ renderer, appService }),
        uniViteInjectPlugin('uni:app-inject', initAppProvide()),
        uniRenderjsPlugin(),
        uniAppNVuePlugin({ appService }),
        uniEsbuildPlugin({ renderer, appService }),
        ...(appService
          ? [uniStatsPlugin(), uniTemplatePlugin({ renderer })]
          : []),
      ]
}
