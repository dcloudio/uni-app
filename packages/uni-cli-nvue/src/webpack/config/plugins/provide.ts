import { ProvidePlugin } from 'webpack'
import { initAppProvide, resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import { resolveLib } from '../../../utils'

export function createProvidePlugin() {
  return new ProvidePlugin({
    uniCloud: [
      resolveBuiltIn('@dcloudio/uni-cloud/dist/uni-cloud.es.js'),
      'default',
    ],
    'uni.getCurrentSubNVue': [resolveLib('get-current-sub-nvue.js'), 'default'],
    'uni.requireNativePlugin': [
      resolveLib('require-native-plugin.js'),
      'default',
    ],
    ...initAppProvide(),
  })
}
