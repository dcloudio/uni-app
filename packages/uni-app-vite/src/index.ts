import {
  initProvide,
  uniViteInjectPlugin,
  uniCssScopedPlugin,
  getAppStyleIsolation,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { UniAppPlugin } from './plugin'
import { uniCopyPlugin } from './plugins/copy'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniResolveIdPlugin } from './plugins/resolveId'

function createUniCssScopedPluginOptions() {
  const styleIsolation = getAppStyleIsolation(
    parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  )
  if (styleIsolation === 'isolated') {
    // isolated: 对所有非 App.vue 增加 scoped
    return {}
  }
  // apply-shared: 仅对非页面组件增加 scoped
  return { exclude: /mpType=page/ }
}

const plugins = [
  uniCssScopedPlugin(createUniCssScopedPluginOptions()),
  uniResolveIdPlugin(),
  uniCopyPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniViteInjectPlugin(initProvide()),
  UniAppPlugin,
]
export default plugins
