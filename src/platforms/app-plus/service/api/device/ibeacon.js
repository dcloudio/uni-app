import {
  warpPlusEvent,
  warpPlusMethod
} from '../util'

export const onBeaconUpdate = warpPlusEvent(plus.ibeacon, 'onBeaconUpdate')
export const onBeaconServiceChange = warpPlusEvent(plus.ibeacon, 'onBeaconServiceChange')

export const getBeacons = warpPlusMethod(plus.ibeacon, 'getBeacons')
export const startBeaconDiscovery = warpPlusMethod(plus.ibeacon, 'startBeaconDiscovery')
export const stopBeaconDiscovery = warpPlusMethod(plus.ibeacon, 'stopBeaconDiscovery')
