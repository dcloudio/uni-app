import {
  defineOnApi,
  API_ON_BLUETOOTH_DEVICE_FOUND,
  API_TYPE_ON_BLUETOOTH_DEVICE_FOUND,
  API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE,
  API_TYPE_ON_BLUETOOTH_ADAPTER_STATE_CHANGE,
  API_ON_BLE_CONNECTION_STATE_CHANGE,
  API_TYPE_ON_BLE_CONNECTION_STATE_CHANGE,
  API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE,
  API_TYPE_ON_BLE_CHARACTERISTIC_VALUE_CHANGE,
  defineAsyncApi,
  API_START_BLUETOOTH_DEVICES_DISCOVERY,
  API_TYPE_START_BLUETOOTH_DEVICES_DISCOVERY,
  StartBluetoothDevicesDiscoveryProtocol,
  API_GET_CONNECTED_BLUETOOTH_DEVICES,
  API_TYPE_GET_CONNECTED_BLUETOOTH_DEVICES,
  GetConnectedBluetoothDevicesProtocol,
  API_CREATE_BLE_CONNECTION,
  API_TYPE_CREATE_BLE_CONNECTION,
  CreateBLEConnectionProtocol,
  API_CLOSE_BLE_CONNECTION,
  API_TYPE_CLOSE_BLE_CONNECTION,
  CloseBLEConnectionProtocol,
  API_GET_BLE_DEVICE_SERVICES,
  API_TYPE_GET_BLE_DEVICE_SERVICES,
  GetBLEDeviceServicesProtocol,
  API_GET_BLE_DEVICE_CHARACTERISTICS,
  API_TYPE_GET_BLE_DEVICE_CHARACTERISTICS,
  GetBLEDeviceCharacteristicsProtocol,
  API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE,
  API_TYPE_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE,
  NotifyBLECharacteristicValueChangeProtocol,
  API_READ_BLE_CHARACTERISTIC_VALUE,
  API_TYPE_READ_BLE_CHARACTERISTIC_VALUE,
  ReadBLECharacteristicValueProtocol,
  API_WRITE_BLE_CHARACTERISTIC_VALUE,
  API_TYPE_WRITE_BLE_CHARACTERISTIC_VALUE,
  WriteBLECharacteristicValueProtocol,
  API_SET_BLE_MTU,
  API_TYPE_SET_BLE_MTU,
  SetBLEMTUProtocol,
  API_GET_BLE_DEVICE_RSSI,
  API_TYPE_GET_BLE_DEVICE_RSSI,
  GetBLEDeviceRSSIProtocol,
} from '@dcloudio/uni-api'
import { warpPlusEvent, warpPlusMethod } from '../../../helpers/plus'

export const onBluetoothDeviceFound =
  defineOnApi<API_TYPE_ON_BLUETOOTH_DEVICE_FOUND>(
    API_ON_BLUETOOTH_DEVICE_FOUND,
    warpPlusEvent(
      () => plus.bluetooth.onBluetoothDeviceFound,
      API_ON_BLUETOOTH_DEVICE_FOUND
    )
  )
export const onBluetoothAdapterStateChange =
  defineOnApi<API_TYPE_ON_BLUETOOTH_ADAPTER_STATE_CHANGE>(
    API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE,
    warpPlusEvent(
      () => plus.bluetooth.onBluetoothAdapterStateChange,
      API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE
    )
  )
export const onBLEConnectionStateChange =
  defineOnApi<API_TYPE_ON_BLE_CONNECTION_STATE_CHANGE>(
    API_ON_BLE_CONNECTION_STATE_CHANGE,
    warpPlusEvent(
      () => plus.bluetooth.onBLEConnectionStateChange,
      API_ON_BLE_CONNECTION_STATE_CHANGE
    )
  )
export const onBLECharacteristicValueChange =
  defineOnApi<API_TYPE_ON_BLE_CHARACTERISTIC_VALUE_CHANGE>(
    API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE,
    warpPlusEvent(
      () => plus.bluetooth.onBLECharacteristicValueChange,
      API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE
    )
  )

export const openBluetoothAdapter = defineAsyncApi<
  typeof uni.openBluetoothAdapter
>(
  'openBluetoothAdapter',
  warpPlusMethod(() => plus.bluetooth.openBluetoothAdapter)
)
export const closeBluetoothAdapter = defineAsyncApi<
  typeof uni.closeBluetoothAdapter
>(
  'closeBluetoothAdapter',
  warpPlusMethod(() => plus.bluetooth.closeBluetoothAdapter)
)
export const getBluetoothAdapterState = defineAsyncApi<
  typeof uni.getBluetoothAdapterState
>(
  'getBluetoothAdapterState',
  warpPlusMethod(() => plus.bluetooth.getBluetoothAdapterState)
)
export const startBluetoothDevicesDiscovery =
  defineAsyncApi<API_TYPE_START_BLUETOOTH_DEVICES_DISCOVERY>(
    API_START_BLUETOOTH_DEVICES_DISCOVERY,
    warpPlusMethod(() => plus.bluetooth.startBluetoothDevicesDiscovery),
    StartBluetoothDevicesDiscoveryProtocol
  )
export const stopBluetoothDevicesDiscovery = defineAsyncApi<
  typeof uni.stopBluetoothDevicesDiscovery
>(
  'stopBluetoothDevicesDiscovery',
  warpPlusMethod(() => plus.bluetooth.stopBluetoothDevicesDiscovery)
)
export const getBluetoothDevices = defineAsyncApi<
  typeof uni.getBluetoothDevices
>(
  'getBluetoothDevices',
  warpPlusMethod(() => plus.bluetooth.getBluetoothDevices)
)
export const getConnectedBluetoothDevices =
  defineAsyncApi<API_TYPE_GET_CONNECTED_BLUETOOTH_DEVICES>(
    API_GET_CONNECTED_BLUETOOTH_DEVICES,
    warpPlusMethod(() => plus.bluetooth.getConnectedBluetoothDevices),
    GetConnectedBluetoothDevicesProtocol
  )
export const createBLEConnection =
  defineAsyncApi<API_TYPE_CREATE_BLE_CONNECTION>(
    API_CREATE_BLE_CONNECTION,
    warpPlusMethod(() => plus.bluetooth.createBLEConnection),
    CreateBLEConnectionProtocol
  )
export const closeBLEConnection = defineAsyncApi<API_TYPE_CLOSE_BLE_CONNECTION>(
  API_CLOSE_BLE_CONNECTION,
  warpPlusMethod(() => plus.bluetooth.closeBLEConnection),
  CloseBLEConnectionProtocol
)
export const getBLEDeviceServices =
  defineAsyncApi<API_TYPE_GET_BLE_DEVICE_SERVICES>(
    API_GET_BLE_DEVICE_SERVICES,
    warpPlusMethod(() => plus.bluetooth.getBLEDeviceServices),
    GetBLEDeviceServicesProtocol
  )
export const getBLEDeviceCharacteristics =
  defineAsyncApi<API_TYPE_GET_BLE_DEVICE_CHARACTERISTICS>(
    API_GET_BLE_DEVICE_CHARACTERISTICS,
    warpPlusMethod(() => plus.bluetooth.getBLEDeviceCharacteristics),
    GetBLEDeviceCharacteristicsProtocol
  )
export const notifyBLECharacteristicValueChange =
  defineAsyncApi<API_TYPE_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE>(
    API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE,
    warpPlusMethod(() => plus.bluetooth.notifyBLECharacteristicValueChange),
    NotifyBLECharacteristicValueChangeProtocol
  )
export const readBLECharacteristicValue =
  defineAsyncApi<API_TYPE_READ_BLE_CHARACTERISTIC_VALUE>(
    API_READ_BLE_CHARACTERISTIC_VALUE,
    warpPlusMethod(() => plus.bluetooth.readBLECharacteristicValue),
    ReadBLECharacteristicValueProtocol
  )
export const writeBLECharacteristicValue =
  defineAsyncApi<API_TYPE_WRITE_BLE_CHARACTERISTIC_VALUE>(
    API_WRITE_BLE_CHARACTERISTIC_VALUE,
    warpPlusMethod(() => plus.bluetooth.writeBLECharacteristicValue),
    WriteBLECharacteristicValueProtocol
  )
export const setBLEMTU = defineAsyncApi<API_TYPE_SET_BLE_MTU>(
  API_SET_BLE_MTU,
  warpPlusMethod(() => plus.bluetooth.setBLEMTU),
  SetBLEMTUProtocol
)
export const getBLEDeviceRSSI = defineAsyncApi<API_TYPE_GET_BLE_DEVICE_RSSI>(
  API_GET_BLE_DEVICE_RSSI,
  warpPlusMethod(() => plus.bluetooth.getBLEDeviceRSSI),
  GetBLEDeviceRSSIProtocol
)
