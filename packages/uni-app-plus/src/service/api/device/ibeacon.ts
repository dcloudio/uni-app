import {
  defineOnApi,
  defineAsyncApi,
  API_ON_BEACON_UPDATE,
  API_TYPE_ON_BEACON_UPDATE,
  API_ON_BEACON_SERVICE_CHANGE,
  API_TYPE_ON_BEACON_SERVICE_CHANGE,
  API_GET_BEACONS,
  API_TYPE_GET_BEACONS,
  API_START_BEACON_DISCOVERY,
  API_TYPE_START_BEACON_DISCOVERY,
  StartBeaconDiscoveryProtocol,
  API_STOP_BEACON_DISCOVERY,
  API_TYPE_STOP_BEACON_DISCOVERY,
} from '@dcloudio/uni-api'
import { warpPlusEvent, warpPlusMethod } from '../../../helpers/plus'

export const onBeaconUpdate = defineOnApi<API_TYPE_ON_BEACON_UPDATE>(
  API_ON_BEACON_UPDATE,
  warpPlusEvent(
    () => plus.ibeacon.onBeaconUpdate.bind(plus.ibeacon),
    API_ON_BEACON_UPDATE
  )
)
export const onBeaconServiceChange =
  defineOnApi<API_TYPE_ON_BEACON_SERVICE_CHANGE>(
    API_ON_BEACON_SERVICE_CHANGE,
    warpPlusEvent(
      () => plus.ibeacon.onBeaconServiceChange.bind(plus.ibeacon),
      API_ON_BEACON_SERVICE_CHANGE
    )
  )

export const getBeacons = defineAsyncApi<API_TYPE_GET_BEACONS>(
  API_GET_BEACONS,
  warpPlusMethod(() => plus.ibeacon.getBeacons.bind(plus.ibeacon))
)
export const startBeaconDiscovery =
  defineAsyncApi<API_TYPE_START_BEACON_DISCOVERY>(
    API_START_BEACON_DISCOVERY,
    warpPlusMethod(() => plus.ibeacon.startBeaconDiscovery.bind(plus.ibeacon)),
    StartBeaconDiscoveryProtocol
  )
export const stopBeaconDiscovery =
  defineAsyncApi<API_TYPE_STOP_BEACON_DISCOVERY>(
    API_STOP_BEACON_DISCOVERY,
    warpPlusMethod(() => plus.ibeacon.stopBeaconDiscovery.bind(plus.ibeacon))
  )
