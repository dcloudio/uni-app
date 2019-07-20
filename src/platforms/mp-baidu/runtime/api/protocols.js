import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
// 不支持的 API 列表
const todos = [
  'hideKeyboard',
  'onGyroscopeChange',
  'startGyroscope',
  'stopGyroscope',
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
  'hideShareMenu',
  'onWindowResize',
  'offWindowResize'
]

// 存在兼容性的 API 列表
const canIUses = []

function createTodoMethod (contextName, methodName) {
  return function unsupported () {
    console.error(`__PLATFORM_TITLE__ ${contextName}暂不支持${methodName}`)
  }
}
// 需要做转换的 API 列表
const protocols = {
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
  previewImage,
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
  }
}

export {
  protocols,
  todos,
  canIUses
}
