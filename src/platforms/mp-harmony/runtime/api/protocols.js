import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../../mp-weixin/helpers/redirect-to'
import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

// 不支持的 API 列表
const todos = [
  'preloadPage',
  'unPreloadPage',
  'loadSubPackage'
  // 'createCameraContext',
  // 'createLivePlayerContext',
  // 'getSavedFileInfo',
  // 'createMapContext',
  // 'onMemoryWarning',
  // 'onGyroscopeChange',
  // 'startGyroscope',
  // 'stopGyroscope',
  // 'setScreenBrightness',
  // 'getScreenBrightness',
  // 'addPhoneContact',
  // 'openBluetoothAdapter',
  // 'startBluetoothDevicesDiscovery',
  // 'onBluetoothDeviceFound',
  // 'stopBluetoothDevicesDiscovery',
  // 'onBluetoothAdapterStateChange',
  // 'getConnectedBluetoothDevices',
  // 'getBluetoothDevices',
  // 'getBluetoothAdapterState',
  // 'closeBluetoothAdapter',
  // 'writeBLECharacteristicValue',
  // 'readBLECharacteristicValue',
  // 'onBLEConnectionStateChange',
  // 'onBLECharacteristicValueChange',
  // 'notifyBLECharacteristicValueChange',
  // 'getBLEDeviceServices',
  // 'getBLEDeviceCharacteristics',
  // 'createBLEConnection',
  // 'closeBLEConnection',
  // 'onBeaconServiceChange',
  // 'onBeaconUpdate',
  // 'getBeacons',
  // 'startBeaconDiscovery',
  // 'stopBeaconDiscovery',
  // 'showNavigationBarLoading',
  // 'hideNavigationBarLoading',
  // 'setTabBarItem',
  // 'setTabBarStyle',
  // 'hideTabBar',
  // 'showTabBar',
  // 'setTabBarBadge',
  // 'removeTabBarBadge',
  // 'showTabBarRedDot',
  // 'hideTabBarRedDot',
  // 'setBackgroundColor',
  // 'setBackgroundTextStyle',
  // 'chooseInvoiceTitle',
  // 'addTemplate',
  // 'deleteTemplate',
  // 'getTemplateLibraryById',
  // 'getTemplateLibraryList',
  // 'getTemplateList',
  // 'sendTemplateMessage',
  // 'setEnableDebug',
  // 'onWindowResize',
  // 'offWindowResize',
  // 'createOffscreenCanvas',
  // 'vibrate'
]

// 存在兼容性的 API 列表
// 头条小程序自1.35.0+支持canIUses
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
  // 'navigateToMiniProgram',
  // 'navigateBackMiniProgram',
  // 'compressImage',
  // 'chooseLocation',
  // 'openDocument',
  // 'onUserCaptureScreen',
  // 'getBackgroundAudioManager',
  // 'setNavigationBarColor',
]

// 需要做转换的 API 列表
const protocols = {
  navigateTo: navigateTo(),
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
      onlyFromCamera: false,
      scanType: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
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
    name: tt.pay ? 'pay' : 'requestPayment',
    args: {
      orderInfo: tt.pay ? 'orderInfo' : 'data'
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
