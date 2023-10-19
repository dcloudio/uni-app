import { initAndroid, initIOS } from './plugins'

export default process.env.UNI_APP_X === 'true' &&
process.env.UNI_UTS_PLATFORM === 'app-android'
  ? initAndroid()
  : initIOS()

export { genClassName } from './plugins/android/utils'
export { transformVue } from './plugins/android/uvue/index'
