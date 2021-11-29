import path from 'path'
import {
  initAppProvide,
  uniViteInjectPlugin,
  uniCssScopedPlugin,
  getAppStyleIsolation,
  parseManifestJsonOnce,
  uniConsolePlugin,
  UNI_EASYCOM_EXCLUDE,
  isVueSfcFile,
  isUniPageFile,
} from '@dcloudio/uni-cli-shared'
import { plugins as nvuePlugins } from '@dcloudio/uni-cli-nvue'
import { uniAppPlugin } from './plugin'
import { uniTemplatePlugin } from './plugins/template'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
// import { uniResolveIdPlugin } from './plugins/resolveId'
import { uniRenderjsPlugin } from './plugins/renderjs'
import { uniStatsPlugin } from './plugins/stats'
import { uniEasycomPlugin } from './plugins/easycom'
import { uniConfusionPlugin } from './plugins/confusion'

function initUniCssScopedPluginFilter(
  inputDir: string
): void | ((id: string) => boolean) {
  const styleIsolation = getAppStyleIsolation(parseManifestJsonOnce(inputDir))
  if (styleIsolation === 'shared') {
    return
  }
  if (styleIsolation === 'isolated') {
    // isolated: 对所有非 App.vue 增加 scoped
    return (id) => isVueSfcFile(id) && !id.endsWith('App.vue')
  }
  // apply-shared: 仅对非页面组件增加 scoped
  return (id) =>
    isVueSfcFile(id) && !id.endsWith('App.vue') && !isUniPageFile(id, inputDir)
}

const plugins = [
  uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
  // uniResolveIdPlugin(),
  uniConsolePlugin({
    filename(filename) {
      filename = path.relative(process.env.UNI_INPUT_DIR, filename)
      if (filename.startsWith('.') || path.isAbsolute(filename)) {
        return ''
      }
      return filename
    },
  }),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniViteInjectPlugin(initAppProvide()),
  uniRenderjsPlugin(),
  uniTemplatePlugin(),
  uniStatsPlugin(),
  uniAppPlugin(),
  uniConfusionPlugin(),
]

const filter = initUniCssScopedPluginFilter(process.env.UNI_INPUT_DIR)
if (filter) {
  plugins.unshift(uniCssScopedPlugin({ filter }))
}
if (process.env.UNI_NVUE_COMPILER !== 'vue') {
  plugins.push(...nvuePlugins)
}

export default plugins
