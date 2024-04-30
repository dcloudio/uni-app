import {
  API_GET_BEACONS,
  API_ON_BEACON_SERVICE_CHANGE,
  API_ON_BEACON_UPDATE,
  API_START_BEACON_DISCOVERY,
  API_STOP_BEACON_DISCOVERY,
  type API_TYPE_GET_BEACONS,
  type API_TYPE_ON_BEACON_SERVICE_CHANGE,
  type API_TYPE_ON_BEACON_UPDATE,
  type API_TYPE_START_BEACON_DISCOVERY,
  type API_TYPE_STOP_BEACON_DISCOVERY,
  StartBeaconDiscoveryProtocol,
  defineAsyncApi,
  defineOnApi,
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
