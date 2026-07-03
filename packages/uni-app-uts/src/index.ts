import { initAndroid, initAndroidDom2, initIOS } from './plugins'

export default () => {
  if (
    process.env.UNI_UTS_PLATFORM === 'app-android' &&
    process.env.UNI_APP_X_DOM2 === 'true'
  ) {
    return initAndroidDom2()
  }
  return process.env.UNI_UTS_PLATFORM === 'app-android'
    ? initAndroid()
    : process.env.UNI_UTS_PLATFORM === 'app-ios'
    ? initIOS()
    : []
}

export { genUTSClassName as genClassName } from '@dcloudio/uni-cli-shared'

// transformVue 被内部仓库 vuejs-core 使用，编译android框架内置组件了
export { transformMain as transformVue } from './plugins/android/uvue/sfc/main'

export { transformExtApiVueFile } from './extApiComponents'

export { initUniAppJsEngineDom1CssPlugin } from './plugins/js/plugin'

export { init as initUniAppXHarmonyPlugin } from './plugins/harmony'
