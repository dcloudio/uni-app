import {
  initAppProvide,
  uniHBuilderXConsolePlugin,
  uniViteInjectPlugin,
  UNI_EASYCOM_EXCLUDE,
} from '@dcloudio/uni-cli-shared'
import { uniAppNVuePlugin } from './plugin'
import { uniEasycomPlugin } from '../plugins/easycom'

export function initNVuePlugins() {
  return [
    uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE }),
    uniHBuilderXConsolePlugin(),
    uniViteInjectPlugin('uni:app-inject', initAppProvide()),
    uniAppNVuePlugin(),
  ]
}
