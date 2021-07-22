import path from 'path'
import { ProvidePlugin } from 'webpack'
import { initProvide } from '@dcloudio/uni-cli-shared'

const libDir = path.resolve(__dirname, '../../../../lib')
const definitions: Record<string, string | string[]> = {
  uniCloud: [
    require.resolve('@dcloudio/uni-cloud/dist/uni-cloud.es.js'),
    'default',
  ],
  'uni.getCurrentSubNVue': [
    path.join(libDir, 'get-current-sub-nvue.js'),
    'default',
  ],
  'uni.requireNativePlugin': [
    path.join(libDir, 'require-native-plugin.js'),
    'default',
  ],
  ...initProvide(),
}

export const provide = new ProvidePlugin(definitions)
