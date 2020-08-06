import {
  invoke
} from '../../bridge'

export function onBeaconUpdate (callbackId) {
  plus.ibeacon.onBeaconUpdate(data => invoke(callbackId, data))
}

export function onBeaconServiceChange (callbackId) {
  plus.ibeacon.onBeaconServiceChange(data => invoke(callbackId, data))
}
export const onBeaconServiceChanged = onBeaconServiceChange

export function getBeacons (params, callbackId) {
  plus.ibeacon.getBeacons({
    success: (result) => {
      invoke(callbackId, {
        errMsg: 'getBeacons:ok',
        beacons: result.beacons
      })
    },
    fail: (error) => {
      invoke(callbackId, {
        errMsg: 'getBeacons:fail:' + error.message
      })
    }
  })
}

export function startBeaconDiscovery ({
  uuids,
  ignoreBluetoothAvailable = false
}, callbackId) {
  plus.ibeacon.startBeaconDiscovery({
    uuids,
    ignoreBluetoothAvailable,
    success: (result) => {
      invoke(callbackId, {
        errMsg: 'startBeaconDiscovery:ok',
        beacons: result.beacons
      })
    },
    fail: (error) => {
      invoke(callbackId, {
        errMsg: 'startBeaconDiscovery:fail:' + error.message
      })
    }
  })
}

export function stopBeaconDiscovery (params, callbackId) {
  plus.ibeacon.stopBeaconDiscovery({
    success: (result) => {
      invoke(callbackId, Object.assign(result, {
        errMsg: 'stopBeaconDiscovery:ok'
      }))
    },
    fail: (error) => {
      invoke(callbackId, {
        errMsg: 'stopBeaconDiscovery:fail:' + error.message
      })
    }
  })
}
