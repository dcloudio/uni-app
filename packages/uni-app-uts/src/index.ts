import { initAndroid, initIOS } from './plugins'

export default () => {
  return process.env.UNI_UTS_PLATFORM === 'app-android'
    ? initAndroid()
    : process.env.UNI_UTS_PLATFORM === 'app-ios'
    ? initIOS()
    : []
}

export { genUTSClassName as genClassName } from '@dcloudio/uni-cli-shared'

export { transformMain as transformVue } from './plugins/android/uvue/sfc/main'

export { transformExtApiVueFile } from './extApiComponents'

export { initUniAppJsEngineCssPlugin } from './plugins/js/plugin'

export { init as initUniAppXHarmonyPlugin } from './plugins/harmony'
