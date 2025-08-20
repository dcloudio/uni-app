import {
  UNI_EASYCOM_EXCLUDE,
  getAppStyleIsolation,
  initAppProvide,
  isAppVue,
  isUniPageFile,
  isVueSfcFile,
  parseManifestJsonOnce,
  uniCssScopedPlugin,
  uniEasycomPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniStatsPlugin,
  uniUniModulesExtApiPlugin,
  uniViteInjectPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniTemplatePlugin } from '../plugins/template'
import { uniManifestJsonPlugin } from '../plugins/manifestJson'
import { uniConfusionPlugin } from './plugins/confusion'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniRenderjsPlugin } from './plugins/renderjs'

import { uniAppVuePlugin } from './plugin'

function initUniCssScopedPluginFilter(
  inputDir: string
): void | ((id: string) => boolean) {
  const styleIsolation = getAppStyleIsolation(parseManifestJsonOnce(inputDir))
  if (styleIsolation === 'shared') {
    return
  }
  if (styleIsolation === 'isolated') {
    // isolated: 对所有非 App.vue 增加 scoped
    return (id) => isVueSfcFile(id) && !isAppVue(id)
  }
  // apply-shared: 仅对非页面组件增加 scoped
  return (id) =>
    isVueSfcFile(id) && !isAppVue(id) && !isUniPageFile(id, inputDir)
}

export function initVuePlugins() {
  const plugins = [
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    uniHBuilderXConsolePlugin(),
  ]
  if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
    plugins.push(
      uniViteInjectPlugin('uni:app-inject', initAppProvide()),
      uniRenderjsPlugin(),
      uniAppVuePlugin(),
      uniUniModulesExtApiPlugin()
    )
  } else if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
    plugins.push(
      uniViteInjectPlugin('uni:app-inject', initAppProvide()),
      uniRenderjsPlugin(),
      uniAppVuePlugin(),
      uniEncryptUniModulesPlugin()
    )
  } else {
    plugins.push(
      uniMainJsPlugin(),
      uniManifestJsonPlugin(),
      uniPagesJsonPlugin(),
      uniViteInjectPlugin('uni:app-inject', initAppProvide()),
      uniRenderjsPlugin(),
      uniTemplatePlugin(),
      uniStatsPlugin(),
      uniAppVuePlugin(),
      uniConfusionPlugin()
    )
    const filter = initUniCssScopedPluginFilter(process.env.UNI_INPUT_DIR)
    if (filter) {
      plugins.unshift(uniCssScopedPlugin({ filter }))
    }
  }

  return plugins
}
