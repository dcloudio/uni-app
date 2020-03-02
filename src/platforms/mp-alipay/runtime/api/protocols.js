// 不支持的 API 列表
const todos = [
  // 'getRecorderManager',
  // 'getBackgroundAudioManager',
  // 'createInnerAudioContext',
  // 'createCameraContext',
  // 'createLivePlayerContext',
  // 'startAccelerometer',
  // 'startCompass',
  // 'authorize',
  // 'chooseInvoiceTitle',
  // 'addTemplate',
  // 'deleteTemplate',
  // 'getTemplateLibraryById',
  // 'getTemplateLibraryList',
  // 'getTemplateList',
  // 'sendTemplateMessage',
  // 'setEnableDebug',
  // 'getExtConfig',
  // 'getExtConfigSync',
  // 'onWindowResize',
  // 'offWindowResize'
]

// 存在兼容性的 API 列表
const canIUses = [
  'startPullDownRefresh',
  'setTabBarItem',
  'setTabBarStyle',
  'hideTabBar',
  'showTabBar',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'openSetting',
  'getSetting',
  'createIntersectionObserver',
  'getUpdateManager',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'checkIsSupportSoterAuthentication',
  'startSoterAuthentication',
  'checkIsSoterEnrolledInDevice',
  'openDocument',
  'createVideoContext',
  'onMemoryWarning',
  'addPhoneContact'
]

function _handleNetworkInfo (result) {
  switch (result.networkType) {
    case 'NOTREACHABLE':
      result.networkType = 'none'
      break
    case 'WWAN':
      // TODO ?
      result.networkType = '3g'
      break
    default:
      result.networkType = result.networkType.toLowerCase()
      break
  }
  return {}
}

function _handleSystemInfo (result) {
  let platform = result.platform ? result.platform.toLowerCase() : 'devtools'
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools'
  }
  result.platform = platform
}

const protocols = { // 需要做转换的 API 列表
  returnValue (methodName, res = {}) { // 通用 returnValue 解析
    if (res.error || res.errorMessage) {
      res.errMsg = `${methodName}:fail ${res.errorMessage || res.error}`
      delete res.error
      delete res.errorMessage
    } else {
      res.errMsg = `${methodName}:ok`
    }
    return res
  },
  request: {
    name: my.canIUse('request') ? 'request' : 'httpRequest',
    args (fromArgs) {
      if (!fromArgs.header) { // 默认增加 header 参数，方便格式化 content-type
        fromArgs.header = {}
      }
      return {
        header (header = {}, toArgs) {
          const headers = {
            'content-type': 'application/json'
          }
          Object.keys(header).forEach(key => {
            headers[key.toLocaleLowerCase()] = header[key]
          })
          return {
            name: 'headers',
            value: headers
          }
        },
        method: 'method', // TODO 支付宝小程序仅支持 get,post
        responseType: false
      }
    },
    returnValue: {
      status: 'statusCode',
      headers: 'header'
    }
  },
  setNavigationBarColor: {
    name: 'setNavigationBar',
    args: {
      frontColor: false,
      animation: false
    }
  },
  setNavigationBarTitle: {
    name: 'setNavigationBar'
  },
  showModal ({
    showCancel = true
  } = {}) {
    if (showCancel) {
      return {
        name: 'confirm',
        args: {
          cancelColor: false,
          confirmColor: false,
          cancelText: 'cancelButtonText',
          confirmText: 'confirmButtonText'
        },
        returnValue (fromRes, toRes) {
          toRes.confirm = fromRes.confirm
          toRes.cancel = !fromRes.confirm
        }
      }
    }
    return {
      name: 'alert',
      args: {
        confirmColor: false,
        confirmText: 'buttonText'
      },
      returnValue (fromRes, toRes) {
        toRes.confirm = true
        toRes.cancel = false
      }
    }
  },
  showToast ({
    icon = 'success'
  } = {}) {
    const args = {
      title: 'content',
      icon: 'type',
      duration: false,
      image: false,
      mask: false
    }
    if (icon === 'loading') {
      return {
        name: 'showLoading',
        args
      }
    }
    return {
      name: 'showToast',
      args
    }
  },
  showActionSheet: {
    name: 'showActionSheet',
    args: {
      itemList: 'items',
      itemColor: false
    },
    returnValue: {
      index: 'tapIndex'
    }
  },
  showLoading: {
    args: {
      title: 'content',
      mask: false
    }
  },
  uploadFile: {
    args: {
      name: 'fileName'
    }
    // 从测试结果看，是有返回对象的，文档上没有说明。
  },
  downloadFile: {
    returnValue: {
      apFilePath: 'tempFilePath'
    }
  },
  chooseVideo: {
    // 支付宝小程序文档中未找到（仅在getSetting处提及），但实际可用
    returnValue: {
      apFilePath: 'tempFilePath'
    }
  },
  connectSocket: {
    args: {
      method: false,
      protocols: false
    }
    // TODO 有没有返回值还需要测试下
  },
  chooseImage: {
    returnValue: {
      apFilePaths: 'tempFilePaths'
    }
  },
  previewImage: {
    args (fromArgs) {
      // 支付宝小程序的 current 是索引值，而非图片地址。
      const currentIndex = Number(fromArgs.current)
      if (isNaN(currentIndex)) {
        if (fromArgs.current && Array.isArray(fromArgs.urls)) {
          const index = fromArgs.urls.indexOf(fromArgs.current)
          fromArgs.current = ~index ? index : 0
        }
      } else {
        fromArgs.current = currentIndex
      }
      return {
        indicator: false,
        loop: false
      }
    }
  },
  saveFile: {
    args: {
      tempFilePath: 'apFilePath'
    },
    returnValue: {
      apFilePath: 'savedFilePath'
    }
  },
  getSavedFileInfo: {
    args: {
      filePath: 'apFilePath'
    },
    returnValue (result) {
      if (result.fileList && result.fileList.length) {
        result.fileList.forEach(file => {
          file.filePath = file.apFilePath
          delete file.apFilePath
        })
      }
      return {}
    }
  },
  removeSavedFile: {
    args: {
      filePath: 'apFilePath'
    }
  },
  getLocation: {
    args: {
      type: false,
      altitude: false
    }
  },
  openLocation: {
    args: {
      // TODO address 参数在阿里上是必传的
    }
  },
  getNetworkType: {
    returnValue: _handleNetworkInfo
  },
  onNetworkStatusChange: {
    returnValue: _handleNetworkInfo
  },
  stopAccelerometer: {
    name: 'offAccelerometerChange'
  },
  stopCompass: {
    name: 'offCompassChange'
  },
  scanCode: {
    name: 'scan',
    args (fromArgs) {
      if (fromArgs.scanType === 'qrCode') {
        fromArgs.type = 'qr'
        return {
          onlyFromCamera: 'hideAlbum'
        }
      } else if (fromArgs.scanType === 'barCode') {
        fromArgs.type = 'bar'
        return {
          onlyFromCamera: 'hideAlbum'
        }
      } else {
        return {
          scanType: false,
          onlyFromCamera: 'hideAlbum'
        }
      }
    },
    returnValue: {
      code: 'result'
    }
  },
  setClipboardData: {
    name: 'setClipboard',
    args: {
      data: 'text'
    }
  },
  getClipboardData: {
    name: 'getClipboard',
    returnValue: {
      text: 'data'
    }
  },
  pageScrollTo: {
    args: {
      duration: false
    }
  },
  login: {
    name: 'getAuthCode',
    returnValue (result) {
      result.code = result.authCode
    }
  },
  getUserInfo: {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue (result) {
      if (my.canIUse('getOpenUserInfo')) {
        let response = {}
        try {
          response = JSON.parse(result.response).response
        } catch (e) {}
        result.nickName = response.nickName
        result.avatar = response.avatar
      }
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar
      }
    }
  },
  requestPayment: {
    name: 'tradePay',
    args: {
      orderInfo: 'tradeNO'
    }
  },
  getBLEDeviceServices: {
    returnValue (result) {
      result.services.forEach((item) => {
        item.uuid = item.serviceId
      })
    }
  },
  createBLEConnection: {
    name: 'connectBLEDevice',
    args: {
      timeout: false
    }
  },
  closeBLEConnection: {
    name: 'disconnectBLEDevice'
  },
  onBLEConnectionStateChange: {
    name: 'onBLEConnectionStateChanged'
  },
  makePhoneCall: {
    args: {
      phoneNumber: 'number'
    }
  },
  stopGyroscope: {
    name: 'offGyroscopeChange'
  },
  getSystemInfo: {
    returnValue: _handleSystemInfo
  },
  getSystemInfoSync: {
    returnValue: _handleSystemInfo
  },
  // 文档没提到，但是实测可用。
  canvasToTempFilePath: {
    returnValue (result) {
      // 真机的情况下会有 tempFilePath 这个值，因此需要主动修改。
      result.tempFilePath = result.apFilePath
    }
  },
  setScreenBrightness: {
    args: {
      value: 'brightness'
    }
  },
  getScreenBrightness: {
    returnValue: {
      brightness: 'value'
    }
  },
  showShareMenu: {
    name: 'showSharePanel'
  },
  hideHomeButton: {
    name: 'hideBackHome'
  },
  saveImageToPhotosAlbum: {
    name: 'saveImage',
    args: {
      filePath: 'url'
    }
  },
  saveVideoToPhotosAlbum: {
    args: {
      filePath: 'src'
    }
  },
  chooseAddress: {
    name: 'getAddress',
    returnValue (result) {
      let info = result.result || {}
      result.userName = info.fullname
      result.provinceName = info.prov
      result.cityName = info.city
      result.detailInfo = info.address
      result.telNumber = info.mobilePhone
      result.errMsg = result.resultStatus
    }
  }
}

export {
  protocols,
  todos,
  canIUses
}
