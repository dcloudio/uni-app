import { AutoImportOptions } from '@dcloudio/uni-cli-shared'
import { initAndroid, initIOS } from './plugins'

export default (options: { autoImportOptions?: AutoImportOptions }) => {
  return process.env.UNI_UTS_PLATFORM === 'app-android'
    ? initAndroid(options)
    : initIOS()
}

export { genClassName } from './plugins/android/utils'

export { transformMain as transformVue } from './plugins/android/uvue/sfc/main'
