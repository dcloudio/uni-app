import {
  invoke
} from 'uni-core/service/bridge'

import {
  onMethod
} from '../../platform'

function on (method) {
  const callbacks = []
  onMethod(method, data => {
    callbacks.forEach(callbackId => {
      invoke(callbackId, data)
    })
  })
  return function (callbackId) {
    callbacks.push(callbackId)
  }
}

export const onBluetoothDeviceFound = on('onBluetoothDeviceFound')
export const onBluetoothAdapterStateChange = on('onBluetoothAdapterStateChange')
export const onBLEConnectionStateChange = on('onBLEConnectionStateChange')
export const onBLECharacteristicValueChange = on('onBLECharacteristicValueChange')
