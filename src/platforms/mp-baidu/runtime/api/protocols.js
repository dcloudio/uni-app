import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../../mp-weixin/helpers/redirect-to'
import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

// 不支持的 API 列表
const todos = [
  'preloadPage',
  'unPreloadPage'
  // 'hideKeyboard',
  // 'onGyroscopeChange',
  // 'startGyroscope',
  // 'stopGyroscope',
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
  // 'hideShareMenu',
  // 'onWindowResize',
  // 'offWindowResize',
  // 'vibrate'
]

// 存在兼容性的 API 列表
const canIUses = []

function createTodoMethod (contextName, methodName) {
  return function unsupported () {
    console.error(`__PLATFORM_TITLE__ ${contextName}暂不支持${methodName}`)
  }
}

function _handleEnvInfo (result) {
  result.miniProgram = {
    appId: result.appKey
  }
  result.plugin = {
    version: result.sdkVersion
  }
}

// 需要做转换的 API 列表
const protocols = {
  returnValue (methodName, res = {}) { // 通用 returnValue 解析，部分 API 的 res 为 undefined，比如 navigateTo
    return res
  },
  request: {
    args (fromArgs) {
      // TODO
      // data 不支持 ArrayBuffer
      // method 不支持 TRACE, CONNECT
      return {
        method: 'method',
        dataType (type) {
          return {
            name: 'dataType',
            value: type === 'json' ? type : 'string'
          }
        }
      }
    }
  },
  connectSocket: {
    args: {
      method: false
    }
  },
  navigateTo,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile,
  getRecorderManager: {
    returnValue (fromRet) {
      fromRet.onFrameRecorded = createTodoMethod('RecorderManager', 'onFrameRecorded')
    }
  },
  getBackgroundAudioManager: {
    returnValue (fromRet) {
      fromRet.onPrev = createTodoMethod('BackgroundAudioManager', 'onPrev')
      fromRet.onNext = createTodoMethod('BackgroundAudioManager', 'onNext')
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  },
  navigateToMiniProgram: {
    name: 'navigateToSmartProgram',
    args: {
      appId: 'appKey',
      envVersion: false
    }
  },
  navigateBackMiniProgram: {
    name: 'navigateBackSmartProgram'
  },
  showShareMenu: {
    name: 'openShare'
  },
  getAccountInfoSync: {
    name: 'getEnvInfoSync',
    returnValue: _handleEnvInfo
  },
  login: {
    name: 'getLoginCode'
  }
}

export {
  protocols,
  todos,
  canIUses
}
