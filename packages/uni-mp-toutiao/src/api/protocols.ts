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
export const chooseVideo = {
  args: {
    camera: false,
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
