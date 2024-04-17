import {
  API_CLOSE_BLE_CONNECTION,
  API_CREATE_BLE_CONNECTION,
  API_GET_BLE_DEVICE_CHARACTERISTICS,
  API_GET_BLE_DEVICE_RSSI,
  API_GET_BLE_DEVICE_SERVICES,
  API_GET_CONNECTED_BLUETOOTH_DEVICES,
  API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE,
  API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE,
  API_ON_BLE_CONNECTION_STATE_CHANGE,
  API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE,
  API_ON_BLUETOOTH_DEVICE_FOUND,
  API_READ_BLE_CHARACTERISTIC_VALUE,
  API_SET_BLE_MTU,
  API_START_BLUETOOTH_DEVICES_DISCOVERY,
  type API_TYPE_CLOSE_BLE_CONNECTION,
  type API_TYPE_CREATE_BLE_CONNECTION,
  type API_TYPE_GET_BLE_DEVICE_CHARACTERISTICS,
  type API_TYPE_GET_BLE_DEVICE_RSSI,
  type API_TYPE_GET_BLE_DEVICE_SERVICES,
  type API_TYPE_GET_CONNECTED_BLUETOOTH_DEVICES,
  type API_TYPE_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE,
  type API_TYPE_ON_BLE_CHARACTERISTIC_VALUE_CHANGE,
  type API_TYPE_ON_BLE_CONNECTION_STATE_CHANGE,
  type API_TYPE_ON_BLUETOOTH_ADAPTER_STATE_CHANGE,
  type API_TYPE_ON_BLUETOOTH_DEVICE_FOUND,
  type API_TYPE_READ_BLE_CHARACTERISTIC_VALUE,
  type API_TYPE_SET_BLE_MTU,
  type API_TYPE_START_BLUETOOTH_DEVICES_DISCOVERY,
  type API_TYPE_WRITE_BLE_CHARACTERISTIC_VALUE,
  API_WRITE_BLE_CHARACTERISTIC_VALUE,
  CloseBLEConnectionProtocol,
  CreateBLEConnectionProtocol,
  GetBLEDeviceCharacteristicsProtocol,
  GetBLEDeviceRSSIProtocol,
  GetBLEDeviceServicesProtocol,
  GetConnectedBluetoothDevicesProtocol,
  NotifyBLECharacteristicValueChangeProtocol,
  ReadBLECharacteristicValueProtocol,
  SetBLEMTUProtocol,
  StartBluetoothDevicesDiscoveryProtocol,
  WriteBLECharacteristicValueProtocol,
  defineAsyncApi,
  defineOnApi,
} from '@dcloudio/uni-api'
import { warpPlusEvent, warpPlusMethod } from '../../../helpers/plus'

export const onBluetoothDeviceFound =
  defineOnApi<API_TYPE_ON_BLUETOOTH_DEVICE_FOUND>(
    API_ON_BLUETOOTH_DEVICE_FOUND,
    warpPlusEvent(
      () => plus.bluetooth.onBluetoothDeviceFound.bind(plus.bluetooth),
      API_ON_BLUETOOTH_DEVICE_FOUND
    )
  )
export const onBluetoothAdapterStateChange =
  defineOnApi<API_TYPE_ON_BLUETOOTH_ADAPTER_STATE_CHANGE>(
    API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE,
    warpPlusEvent(
      () => plus.bluetooth.onBluetoothAdapterStateChange.bind(plus.bluetooth),
      API_ON_BLUETOOTH_ADAPTER_STATE_CHANGE
    )
  )
export const onBLEConnectionStateChange =
  defineOnApi<API_TYPE_ON_BLE_CONNECTION_STATE_CHANGE>(
    API_ON_BLE_CONNECTION_STATE_CHANGE,
    warpPlusEvent(
      () => plus.bluetooth.onBLEConnectionStateChange.bind(plus.bluetooth),
      API_ON_BLE_CONNECTION_STATE_CHANGE
    )
  )
export const onBLECharacteristicValueChange =
  defineOnApi<API_TYPE_ON_BLE_CHARACTERISTIC_VALUE_CHANGE>(
    API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE,
    warpPlusEvent(
      () => plus.bluetooth.onBLECharacteristicValueChange.bind(plus.bluetooth),
      API_ON_BLE_CHARACTERISTIC_VALUE_CHANGE
    )
  )

export const openBluetoothAdapter = defineAsyncApi<
  typeof uni.openBluetoothAdapter
>(
  'openBluetoothAdapter',
  warpPlusMethod(() => plus.bluetooth.openBluetoothAdapter.bind(plus.bluetooth))
)
export const closeBluetoothAdapter = defineAsyncApi<
  typeof uni.closeBluetoothAdapter
>(
  'closeBluetoothAdapter',
  warpPlusMethod(() =>
    plus.bluetooth.closeBluetoothAdapter.bind(plus.bluetooth)
  )
)
export const getBluetoothAdapterState = defineAsyncApi<
  typeof uni.getBluetoothAdapterState
>(
  'getBluetoothAdapterState',
  warpPlusMethod(() =>
    plus.bluetooth.getBluetoothAdapterState.bind(plus.bluetooth)
  )
)
export const startBluetoothDevicesDiscovery =
  defineAsyncApi<API_TYPE_START_BLUETOOTH_DEVICES_DISCOVERY>(
    API_START_BLUETOOTH_DEVICES_DISCOVERY,
    warpPlusMethod(() =>
      plus.bluetooth.startBluetoothDevicesDiscovery.bind(plus.bluetooth)
    ),
    StartBluetoothDevicesDiscoveryProtocol
  )
export const stopBluetoothDevicesDiscovery = defineAsyncApi<
  typeof uni.stopBluetoothDevicesDiscovery
>(
  'stopBluetoothDevicesDiscovery',
  warpPlusMethod(() =>
    plus.bluetooth.stopBluetoothDevicesDiscovery.bind(plus.bluetooth)
  )
)
export const getBluetoothDevices = defineAsyncApi<
  typeof uni.getBluetoothDevices
>(
  'getBluetoothDevices',
  warpPlusMethod(() => plus.bluetooth.getBluetoothDevices.bind(plus.bluetooth))
)
export const getConnectedBluetoothDevices =
  defineAsyncApi<API_TYPE_GET_CONNECTED_BLUETOOTH_DEVICES>(
    API_GET_CONNECTED_BLUETOOTH_DEVICES,
    warpPlusMethod(() =>
      plus.bluetooth.getConnectedBluetoothDevices.bind(plus.bluetooth)
    ),
    GetConnectedBluetoothDevicesProtocol
  )
export const createBLEConnection =
  defineAsyncApi<API_TYPE_CREATE_BLE_CONNECTION>(
    API_CREATE_BLE_CONNECTION,
    warpPlusMethod(() =>
      plus.bluetooth.createBLEConnection.bind(plus.bluetooth)
    ),
    CreateBLEConnectionProtocol
  )
export const closeBLEConnection = defineAsyncApi<API_TYPE_CLOSE_BLE_CONNECTION>(
  API_CLOSE_BLE_CONNECTION,
  warpPlusMethod(() => plus.bluetooth.closeBLEConnection.bind(plus.bluetooth)),
  CloseBLEConnectionProtocol
)
export const getBLEDeviceServices =
  defineAsyncApi<API_TYPE_GET_BLE_DEVICE_SERVICES>(
    API_GET_BLE_DEVICE_SERVICES,
    warpPlusMethod(() =>
      plus.bluetooth.getBLEDeviceServices.bind(plus.bluetooth)
    ),
    GetBLEDeviceServicesProtocol
  )
export const getBLEDeviceCharacteristics =
  defineAsyncApi<API_TYPE_GET_BLE_DEVICE_CHARACTERISTICS>(
    API_GET_BLE_DEVICE_CHARACTERISTICS,
    warpPlusMethod(() =>
      plus.bluetooth.getBLEDeviceCharacteristics.bind(plus.bluetooth)
    ),
    GetBLEDeviceCharacteristicsProtocol
  )
export const notifyBLECharacteristicValueChange =
  defineAsyncApi<API_TYPE_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE>(
    API_NOTIFY_BLE_CHARACTERISTIC_VALUE_CHANGE,
    warpPlusMethod(() =>
      plus.bluetooth.notifyBLECharacteristicValueChange.bind(plus.bluetooth)
    ),
    NotifyBLECharacteristicValueChangeProtocol
  )
export const readBLECharacteristicValue =
  defineAsyncApi<API_TYPE_READ_BLE_CHARACTERISTIC_VALUE>(
    API_READ_BLE_CHARACTERISTIC_VALUE,
    warpPlusMethod(() =>
      plus.bluetooth.readBLECharacteristicValue.bind(plus.bluetooth)
    ),
    ReadBLECharacteristicValueProtocol
  )
export const writeBLECharacteristicValue =
  defineAsyncApi<API_TYPE_WRITE_BLE_CHARACTERISTIC_VALUE>(
    API_WRITE_BLE_CHARACTERISTIC_VALUE,
    warpPlusMethod(() =>
      plus.bluetooth.writeBLECharacteristicValue.bind(plus.bluetooth)
    ),
    WriteBLECharacteristicValueProtocol
  )
export const setBLEMTU = defineAsyncApi<API_TYPE_SET_BLE_MTU>(
  API_SET_BLE_MTU,
  warpPlusMethod(() => plus.bluetooth.setBLEMTU.bind(plus.bluetooth)),
  SetBLEMTUProtocol
)
export const getBLEDeviceRSSI = defineAsyncApi<API_TYPE_GET_BLE_DEVICE_RSSI>(
  API_GET_BLE_DEVICE_RSSI,
  warpPlusMethod(() => plus.bluetooth.getBLEDeviceRSSI.bind(plus.bluetooth)),
  GetBLEDeviceRSSIProtocol
)
