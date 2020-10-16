import {
  warpPlusEvent,
  warpPlusMethod
} from '../util'

export const onBeaconUpdate = warpPlusEvent('ibeacon', 'onBeaconUpdate')
export const onBeaconServiceChange = warpPlusEvent('ibeacon', 'onBeaconServiceChange')

export const getBeacons = warpPlusMethod('ibeacon', 'getBeacons')
export const startBeaconDiscovery = warpPlusMethod('ibeacon', 'startBeaconDiscovery')
export const stopBeaconDiscovery = warpPlusMethod('ibeacon', 'stopBeaconDiscovery')
