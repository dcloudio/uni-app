export {
  redirectTo,
  navigateTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
} from '@dcloudio/uni-mp-core'
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
export const getFileInfo = {
  args: {
    digestAlgorithm: false,
  },
}
