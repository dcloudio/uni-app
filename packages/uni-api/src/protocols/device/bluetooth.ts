export const API_ON_BLUETOOTH_DEVICE_FOUND = 'onBluetoothDeviceFound'
export type API_TYPE_ON_BLUETOOTH_DEVICE_FOUND =
  typeof uni.onBluetoothDeviceFound

export const API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE =
  'onBluetoothAdapterStateChange'
export type API_TYPE_ON_BLUETOOTH_ADAPTER_STATE_CHANGE =
  typeof uni.onBluetoothAdapterStateChange
export const API_ON_BLE_CONNECTION_STATE_CHANGE = 'onBLEConnectionStateChange'
export type API_TYPE_ON_BLE_CONNECTION_STATE_CHANGE =
  typeof uni.onBLEConnectionStateChange
export const API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE =
  'onBLECharacteristicValueChange'
export type API_TYPE_ON_BLE_CHARACTERISTIC_VALUE_CHANGE =
  typeof uni.onBLECharacteristicValueChange

export const API_START_BLUETOOTH_DEVICES_DISCOVERY =
  'startBluetoothDevicesDiscovery'
export type API_TYPE_START_BLUETOOTH_DEVICES_DISCOVERY =
  typeof uni.startBluetoothDevicesDiscovery
export const StartBluetoothDevicesDiscoveryProtocol: ApiProtocol<API_TYPE_START_BLUETOOTH_DEVICES_DISCOVERY> =
  {
    services: Array,
    allowDuplicatesKey: Boolean,
    interval: Number,
  }

export const API_GET_CONNECTED_BLUETOOTH_DEVICES =
  'getConnectedBluetoothDevices'
export type API_TYPE_GET_CONNECTED_BLUETOOTH_DEVICES =
  typeof uni.getConnectedBluetoothDevices
export const GetConnectedBluetoothDevicesProtocol: ApiProtocol<API_TYPE_GET_CONNECTED_BLUETOOTH_DEVICES> =
  {
    services: {
      type: Array,
      required: true,
    },
  }

export const API_CREATE_BLE_CONNECTION = 'createBLEConnection'
export type API_TYPE_CREATE_BLE_CONNECTION = typeof uni.createBLEConnection
export const CreateBLEConnectionProtocol: ApiProtocol<API_TYPE_CREATE_BLE_CONNECTION> =
  {
    deviceId: {
      type: String,
      required: true,
    },
  }

export const API_CLOSE_BLE_CONNECTION = 'closeBLEConnection'
export type API_TYPE_CLOSE_BLE_CONNECTION = typeof uni.closeBLEConnection
export const CloseBLEConnectionProtocol: ApiProtocol<API_TYPE_CLOSE_BLE_CONNECTION> =
  {
    deviceId: {
      type: String,
      required: true,
    },
  }

export const API_GET_BLE_DEVICE_SERVICES = 'getBLEDeviceServices'
export type API_TYPE_GET_BLE_DEVICE_SERVICES = typeof uni.getBLEDeviceServices
export const GetBLEDeviceServicesProtocol: ApiProtocol<API_TYPE_GET_BLE_DEVICE_SERVICES> =
  {
    deviceId: {
      type: String,
      required: true,
    },
  }

export const API_GET_BLE_DEVICE_CHARACTERISTICS = 'getBLEDeviceCharacteristics'
export type API_TYPE_GET_BLE_DEVICE_CHARACTERISTICS =
  typeof uni.getBLEDeviceCharacteristics
export const GetBLEDeviceCharacteristicsProtocol: ApiProtocol<API_TYPE_GET_BLE_DEVICE_CHARACTERISTICS> =
  {
    deviceId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
  }

export const API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE =
  'notifyBLECharacteristicValueChange'
export type API_TYPE_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE =
  typeof uni.notifyBLECharacteristicValueChange
export const NotifyBLECharacteristicValueChangeProtocol: ApiProtocol<API_TYPE_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE> =
  {
    deviceId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    characteristicId: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
  }

export const API_READ_BLE_CHARACTERISTIC_VALUE = 'readBLECharacteristicValue'
export type API_TYPE_READ_BLE_CHARACTERISTIC_VALUE =
  typeof uni.readBLECharacteristicValue
export const ReadBLECharacteristicValueProtocol: ApiProtocol<API_TYPE_READ_BLE_CHARACTERISTIC_VALUE> =
  {
    deviceId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    characteristicId: {
      type: String,
      required: true,
    },
  }

export const API_WRITE_BLE_CHARACTERISTIC_VALUE = 'writeBLECharacteristicValue'
export type API_TYPE_WRITE_BLE_CHARACTERISTIC_VALUE =
  typeof uni.writeBLECharacteristicValue
export const WriteBLECharacteristicValueProtocol: ApiProtocol<API_TYPE_WRITE_BLE_CHARACTERISTIC_VALUE> =
  {
    deviceId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    characteristicId: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  }

export const API_SET_BLE_MTU = 'setBLEMTU'
export type API_TYPE_SET_BLE_MTU = typeof uni.setBLEMTU
export const SetBLEMTUProtocol: ApiProtocol<API_TYPE_SET_BLE_MTU> = {
  deviceId: {
    type: String,
    required: true,
  },
  mtu: {
    type: Number,
    required: true,
  },
}

export const API_GET_BLE_DEVICE_RSSI = 'getBLEDeviceRSSI'
export type API_TYPE_GET_BLE_DEVICE_RSSI = typeof uni.getBLEDeviceRSSI
export const GetBLEDeviceRSSIProtocol: ApiProtocol<API_TYPE_GET_BLE_DEVICE_RSSI> =
  {
    deviceId: {
      type: String,
      required: true,
    },
  }
