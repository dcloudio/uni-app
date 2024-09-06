import { initAndroid, initIOS } from './plugins'

export default () => {
  return process.env.UNI_UTS_PLATFORM === 'app-android'
    ? initAndroid()
    : initIOS()
}

export { genUTSClassName as genClassName } from '@dcloudio/uni-cli-shared'

export { transformMain as transformVue } from './plugins/android/uvue/sfc/main'

export { transformExtApiVueFile } from './extApiComponents'
