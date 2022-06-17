export {
  redirectTo,
  navigateTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
} from '@dcloudio/uni-mp-core'
export const chooseImage = {
  args: {
    sizeType: false,
  },
}
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
export const showToast = {
  args: {
    image: false,
    mask: false,
  },
}
export const showLoading = {
  args: {
    mask: false,
  },
}
export const showModal = {
  args: {
    cancelColor: false,
    confirmColor: false,
  },
}
export const showActionSheet = {
  args: {
    itemColor: false,
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
