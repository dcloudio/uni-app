import {
  invoke,
  publish
} from '../../bridge'

/**
 * 执行蓝牙相关方法
 */
function bluetoothExec (method, callbackId, data = {}, beforeSuccess) {
  var deviceId = data.deviceId
  if (deviceId) {
    data.deviceId = deviceId.toUpperCase()
  }
  var serviceId = data.serviceId
  if (serviceId) {
    data.serviceId = serviceId.toUpperCase()
  }

  plus.bluetooth[method.replace('Changed', 'Change')](Object.assign(data, {
    success (data) {
      if (typeof beforeSuccess === 'function') {
        beforeSuccess(data)
      }
      invoke(callbackId, Object.assign({}, data, {
        errMsg: `${method}:ok`,
        code: undefined,
        message: undefined
      }))
    },
    fail (error = {}) {
      invoke(callbackId, {
        errMsg: `${method}:fail ${error.message || ''}`,
        errCode: error.code || 0
      })
    }
  }))
}
/**
 * 监听蓝牙相关事件
 */
function bluetoothOn (method, beforeSuccess) {
  plus.bluetooth[method.replace('Changed', 'Change')](function (data) {
    if (typeof beforeSuccess === 'function') {
      beforeSuccess(data)
    }
    publish(method, Object.assign({}, data, {
      code: undefined,
      message: undefined
    }))
  })
  return true
}

var onBluetoothAdapterStateChange
var onBluetoothDeviceFound
var onBLEConnectionStateChange
var onBLECharacteristicValueChange

export function openBluetoothAdapter (data, callbackId) {
  onBluetoothAdapterStateChange = onBluetoothAdapterStateChange || bluetoothOn('onBluetoothAdapterStateChange')
  bluetoothExec('openBluetoothAdapter', callbackId)
}

export function closeBluetoothAdapter (data, callbackId) {
  bluetoothExec('closeBluetoothAdapter', callbackId)
}

export function getBluetoothAdapterState (data, callbackId) {
  bluetoothExec('getBluetoothAdapterState', callbackId)
}

export function startBluetoothDevicesDiscovery (data, callbackId) {
  onBluetoothDeviceFound = onBluetoothDeviceFound || bluetoothOn('onBluetoothDeviceFound')
  bluetoothExec('startBluetoothDevicesDiscovery', callbackId, data)
}

export function stopBluetoothDevicesDiscovery (data, callbackId) {
  bluetoothExec('stopBluetoothDevicesDiscovery', callbackId)
}

export function getBluetoothDevices (data, callbackId) {
  bluetoothExec('getBluetoothDevices', callbackId, {})
}

export function getConnectedBluetoothDevices (data, callbackId) {
  bluetoothExec('getConnectedBluetoothDevices', callbackId, data)
}

export function createBLEConnection (data, callbackId) {
  onBLEConnectionStateChange = onBLEConnectionStateChange || bluetoothOn('onBLEConnectionStateChange')
  bluetoothExec('createBLEConnection', callbackId, data)
}

export function closeBLEConnection (data, callbackId) {
  bluetoothExec('closeBLEConnection', callbackId, data)
}

export function getBLEDeviceServices (data, callbackId) {
  bluetoothExec('getBLEDeviceServices', callbackId, data)
}

export function getBLEDeviceCharacteristics (data, callbackId) {
  bluetoothExec('getBLEDeviceCharacteristics', callbackId, data)
}

export function notifyBLECharacteristicValueChange (data, callbackId) {
  onBLECharacteristicValueChange = onBLECharacteristicValueChange || bluetoothOn('onBLECharacteristicValueChange')
  bluetoothExec('notifyBLECharacteristicValueChange', callbackId, data)
}

export function notifyBLECharacteristicValueChanged (data, callbackId) {
  onBLECharacteristicValueChange = onBLECharacteristicValueChange || bluetoothOn('onBLECharacteristicValueChange')
  bluetoothExec('notifyBLECharacteristicValueChanged', callbackId, data)
}

export function readBLECharacteristicValue (data, callbackId) {
  onBLECharacteristicValueChange = onBLECharacteristicValueChange || bluetoothOn('onBLECharacteristicValueChange')
  bluetoothExec('readBLECharacteristicValue', callbackId, data)
}

export function writeBLECharacteristicValue (data, callbackId) {
  bluetoothExec('writeBLECharacteristicValue', callbackId, data)
}
