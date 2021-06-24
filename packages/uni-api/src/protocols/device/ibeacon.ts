export const API_ON_BEACON_UPDATE = 'onBeaconUpdate'
export type API_TYPE_ON_BEACON_UPDATE = typeof uni.onBeaconUpdate

export const API_ON_BEACON_SERVICE_CHANGE = 'onBeaconServiceChange'
export type API_TYPE_ON_BEACON_SERVICE_CHANGE = typeof uni.onBeaconServiceChange

export const API_GET_BEACONS = 'getBeacons'
export type API_TYPE_GET_BEACONS = typeof uni.getBeacons

export const API_START_BEACON_DISCOVERY = 'startBeaconDiscovery'
export type API_TYPE_START_BEACON_DISCOVERY = typeof uni.startBeaconDiscovery
export const StartBeaconDiscoveryProtocol: ApiProtocol<API_TYPE_START_BEACON_DISCOVERY> =
  {
    uuids: {
      type: Array,
      required: true,
    },
  }

export const API_STOP_BEACON_DISCOVERY = 'stopBeaconDiscovery'
export type API_TYPE_STOP_BEACON_DISCOVERY = typeof uni.stopBeaconDiscovery
