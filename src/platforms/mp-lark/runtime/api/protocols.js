import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../../mp-weixin/helpers/redirect-to'
import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

// 需要做转换的 API 列表
export const protocols = {
  navigateTo,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile,
  connectSocket: {
    args: {
      method: false
    }
  },
  chooseVideo: {
    args: {
      camera: false
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
    }
  },
  showToast: {
    args: {
      image: false
    }
  },
  showModal: {
    args: {
      cancelColor: false,
      confirmColor: false
    }
  },
  showActionSheet: {
    args: {
      itemColor: false,
      alertText: false
    }
  },
  login: {
    args: {
      scopes: false,
      timeout: false
    }
  },
  getUserInfo: {
    args: {
      lang: false,
      timeout: false
    }
  }
}

export const todos = []

export const canIUses = []
