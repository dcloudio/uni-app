import {
  warpPlusEvent,
  warpPlusMethod
} from '../util'

export const onBluetoothDeviceFound = warpPlusEvent(plus.bluetooth, 'onBluetoothDeviceFound')
export const onBluetoothAdapterStateChange = warpPlusEvent(plus.bluetooth, 'onBluetoothAdapterStateChange')
export const onBLEConnectionStateChange = warpPlusEvent(plus.bluetooth, 'onBLEConnectionStateChange')
export const onBLECharacteristicValueChange = warpPlusEvent(plus.bluetooth, 'onBLECharacteristicValueChange')

function toUpperCase (options = {}) {
  const deviceId = options.deviceId
  if (deviceId) {
    options.deviceId = deviceId.toUpperCase()
  }
  const serviceId = options.serviceId
  if (serviceId) {
    options.serviceId = serviceId.toUpperCase()
  }
  return options
}

export const openBluetoothAdapter = warpPlusMethod(plus.bluetooth, 'openBluetoothAdapter')
export const closeBluetoothAdapter = warpPlusMethod(plus.bluetooth, 'closeBluetoothAdapter')
export const getBluetoothAdapterState = warpPlusMethod(plus.bluetooth, 'getBluetoothAdapterState')
export const startBluetoothDevicesDiscovery = warpPlusMethod(plus.bluetooth, 'startBluetoothDevicesDiscovery', toUpperCase)
export const stopBluetoothDevicesDiscovery = warpPlusMethod(plus.bluetooth, 'stopBluetoothDevicesDiscovery')
export const getBluetoothDevices = warpPlusMethod(plus.bluetooth, 'getBluetoothDevices')
export const getConnectedBluetoothDevices = warpPlusMethod(plus.bluetooth, 'getConnectedBluetoothDevices', toUpperCase)
export const createBLEConnection = warpPlusMethod(plus.bluetooth, 'createBLEConnection', toUpperCase)
export const closeBLEConnection = warpPlusMethod(plus.bluetooth, 'closeBLEConnection', toUpperCase)
export const getBLEDeviceServices = warpPlusMethod(plus.bluetooth, 'getBLEDeviceServices', toUpperCase)
export const getBLEDeviceCharacteristics = warpPlusMethod(plus.bluetooth, 'getBLEDeviceCharacteristics', toUpperCase)
export const notifyBLECharacteristicValueChange = warpPlusMethod(plus.bluetooth, 'notifyBLECharacteristicValueChange', toUpperCase)
export const readBLECharacteristicValue = warpPlusMethod(plus.bluetooth, 'readBLECharacteristicValue', toUpperCase)
export const writeBLECharacteristicValue = warpPlusMethod(plus.bluetooth, 'writeBLECharacteristicValue', toUpperCase)
export const setBLEMTU = warpPlusMethod(plus.bluetooth, 'setBLEMTU', toUpperCase)
export const getBLEDeviceRSSI = warpPlusMethod(plus.bluetooth, 'getBLEDeviceRSSI', toUpperCase)
