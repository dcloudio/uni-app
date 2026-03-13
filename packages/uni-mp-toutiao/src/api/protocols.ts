export {
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  onError,
  offError,
} from '@dcloudio/uni-mp-core'
import { navigateTo as _navigateTo } from '@dcloudio/uni-mp-core'
export const navigateTo = _navigateTo()
export const connectSocket = {
  args: {
    method: false,
  },
}
export const scanCode = {
  args: {
    onlyFromCamera: false,
    scanType: false,
  },
}
export const startAccelerometer = {
  args: {
    interval: false,
  },
}
export const login = {
  args: {
    scopes: false,
    timeout: false,
  },
}
export const getUserInfo = {
  args: {
    lang: false,
    timeout: false,
  },
}
export const requestPayment = {
  name: tt.pay ? 'pay' : 'requestPayment',
  args: {
    orderInfo: tt.pay ? 'orderInfo' : 'data',
  },
}
// 抖音小程序使用 showTabBar/hideTabBar 时，animation 不传值会警告 animation should be boolean but get undefined:undefined
export const showTabBar = {
  args(fromArgs: UniApp.ShowTabBarOptions, toArgs: UniApp.ShowTabBarOptions) {
    if (fromArgs.animation === undefined) {
      toArgs.animation = false
    }
  },
}
export const hideTabBar = {
  args(fromArgs: UniApp.ShowTabBarOptions, toArgs: UniApp.ShowTabBarOptions) {
    if (fromArgs.animation === undefined) {
      toArgs.animation = false
    }
  },
}
