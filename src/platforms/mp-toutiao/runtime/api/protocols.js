import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'

// 不支持的 API 列表
const todos = [
  'getBackgroundAudioManager',
  'createCameraContext',
  'createLivePlayerContext',
  'getSavedFileInfo',
  'openDocument',
  'chooseLocation',
  'createMapContext',
  'canIUse',
  'onMemoryWarning',
  'onGyroscopeChange',
  'startGyroscope',
  'stopGyroscope',
  'setScreenBrightness',
  'getScreenBrightness',
  'onUserCaptureScreen',
  'addPhoneContact',
  'openBluetoothAdapter',
  'startBluetoothDevicesDiscovery',
  'onBluetoothDeviceFound',
  'stopBluetoothDevicesDiscovery',
  'onBluetoothAdapterStateChange',
  'getConnectedBluetoothDevices',
  'getBluetoothDevices',
  'getBluetoothAdapterState',
  'closeBluetoothAdapter',
  'writeBLECharacteristicValue',
  'readBLECharacteristicValue',
  'onBLEConnectionStateChange',
  'onBLECharacteristicValueChange',
  'notifyBLECharacteristicValueChange',
  'getBLEDeviceServices',
  'getBLEDeviceCharacteristics',
  'createBLEConnection',
  'closeBLEConnection',
  'onBeaconServiceChange',
  'onBeaconUpdate',
  'getBeacons',
  'startBeaconDiscovery',
  'stopBeaconDiscovery',
  'setNavigationBarColor',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'setTabBarItem',
  'setTabBarStyle',
  'hideTabBar',
  'showTabBar',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'chooseInvoiceTitle',
  'navigateToMiniProgram',
  'navigateBackMiniProgram',
  'addTemplate',
  'deleteTemplate',
  'getTemplateLibraryById',
  'getTemplateLibraryList',
  'getTemplateList',
  'sendTemplateMessage',
  'setEnableDebug',
  'onWindowResize',
  'offWindowResize'
]

// 存在兼容性的 API 列表
// 头条小程序不支持canIUses
const canIUses = [
    // 'createIntersectionObserver',
    // 'getSavedFileList',
    // 'removeSavedFile',
    // 'hideKeyboard',
    // 'getImageInfo',
    // 'createVideoContext',
    // 'onSocketOpen',
    // 'onSocketError',
    // 'sendSocketMessage',
    // 'onSocketMessage',
    // 'closeSocket',
    // 'onSocketClose',
    // 'getExtConfig',
    // 'getExtConfigSync',
]

// 需要做转换的 API 列表
const protocols = {
  chooseImage: {
    args: {
      sizeType: false
    }
  },
  previewImage,
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
      onlyFromCamera: false,
      scanType: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
    }
  },
  showToast: {
    args: {
      image: false,
      mask: false
    }
  },
  showLoading: {
    args: {
      mask: false
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
      itemColor: false
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
  },
  requestPayment: {
    args: {
      orderInfo: 'data'
    }
  },
  getFileInfo: {
    args: {
      digestAlgorithm: false
    }
  }
}

export {
  protocols,
  todos,
  canIUses
}
