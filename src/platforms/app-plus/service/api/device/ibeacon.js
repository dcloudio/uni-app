import {
  invoke,
  publish
} from '../../bridge'

let beaconUpdateState = false

export function onBeaconUpdate () {
  if (!beaconUpdateState) {
    plus.ibeacon.onBeaconUpdate(function (data) {
      publish('onBeaconUpdated', data)
    })
    beaconUpdateState = true
  }
}

let beaconServiceChangeState = false

export function onBeaconServiceChange () {
  if (!beaconServiceChangeState) {
    plus.ibeacon.onBeaconServiceChange(function (data) {
      publish('onBeaconServiceChange', data)
      publish('onBeaconServiceChanged', data)
    })
    beaconServiceChangeState = true
  }
}

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
