import { initAndroid, initIOS } from './plugins'

export default () => {
  return process.env.UNI_UTS_PLATFORM === 'app-android'
    ? initAndroid()
    : initIOS()
}

export { genClassName } from './plugins/android/utils'
export { transformVue } from './plugins/android/uvue/index'
