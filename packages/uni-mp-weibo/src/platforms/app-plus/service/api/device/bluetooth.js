import {
  warpPlusEvent,
  warpPlusMethod
} from '../util'

export const onBluetoothDeviceFound = warpPlusEvent('bluetooth', 'onBluetoothDeviceFound')
export const onBluetoothAdapterStateChange = warpPlusEvent('bluetooth', 'onBluetoothAdapterStateChange')
export const onBLEConnectionStateChange = warpPlusEvent('bluetooth', 'onBLEConnectionStateChange')
export const onBLECharacteristicValueChange = warpPlusEvent('bluetooth', 'onBLECharacteristicValueChange')

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

export const openBluetoothAdapter = warpPlusMethod('bluetooth', 'openBluetoothAdapter')
export const closeBluetoothAdapter = warpPlusMethod('bluetooth', 'closeBluetoothAdapter')
export const getBluetoothAdapterState = warpPlusMethod('bluetooth', 'getBluetoothAdapterState')
export const startBluetoothDevicesDiscovery = warpPlusMethod('bluetooth', 'startBluetoothDevicesDiscovery', toUpperCase)
export const stopBluetoothDevicesDiscovery = warpPlusMethod('bluetooth', 'stopBluetoothDevicesDiscovery')
export const getBluetoothDevices = warpPlusMethod('bluetooth', 'getBluetoothDevices')
export const getConnectedBluetoothDevices = warpPlusMethod('bluetooth', 'getConnectedBluetoothDevices', toUpperCase)
export const createBLEConnection = warpPlusMethod('bluetooth', 'createBLEConnection', toUpperCase)
export const closeBLEConnection = warpPlusMethod('bluetooth', 'closeBLEConnection', toUpperCase)
export const getBLEDeviceServices = warpPlusMethod('bluetooth', 'getBLEDeviceServices', toUpperCase)
export const getBLEDeviceCharacteristics = warpPlusMethod('bluetooth', 'getBLEDeviceCharacteristics', toUpperCase)
export const notifyBLECharacteristicValueChange = warpPlusMethod('bluetooth', 'notifyBLECharacteristicValueChange', toUpperCase)
export const readBLECharacteristicValue = warpPlusMethod('bluetooth', 'readBLECharacteristicValue', toUpperCase)
export const writeBLECharacteristicValue = warpPlusMethod('bluetooth', 'writeBLECharacteristicValue', toUpperCase)
export const setBLEMTU = warpPlusMethod('bluetooth', 'setBLEMTU', toUpperCase)
export const getBLEDeviceRSSI = warpPlusMethod('bluetooth', 'getBLEDeviceRSSI', toUpperCase)
