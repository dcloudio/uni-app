import {
  API_OFF_LOCATION_CHANGE,
  API_OFF_LOCATION_CHANGE_ERROR,
  API_ON_LOCATION_CHANGE,
  API_ON_LOCATION_CHANGE_ERROR,
  API_START_LOCATION_UPDATE,
  API_STOP_LOCATION_UPDATE,
  type API_TYPE_OFF_LOCATION_CHANGE,
  type API_TYPE_OFF_LOCATION_CHANGE_ERROR,
  type API_TYPE_ON_LOCATION_CHANGE,
  type API_TYPE_ON_LOCATION_CHANGE_ERROR,
  type API_TYPE_START_LOCATION_UPDATE,
  type API_TYPE_STOP_LOCATION_UPDATE,
  StartLocationUpdateOptions,
  StartLocationUpdateProtocol,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
} from '@dcloudio/uni-api'
import geoLocationManager from '@ohos.geoLocationManager'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import type common from '@ohos.app.ability.common'
import { map, mapCommon } from '@kit.MapKit'

async function requestPermission(permissions: Permission[]): Promise<boolean> {
  const context = getContext() as common.UIAbilityContext
  const atManager: abilityAccessCtrl.AtManager =
    abilityAccessCtrl.createAtManager()
  const permissionRequestResult = await atManager.requestPermissionsFromUser(
    context,
    permissions
  )
  const isGranted = permissionRequestResult.authResults.every(
    (item) => item === 0
  )
  return isGranted
}

type Permission =
  | 'ohos.permission.APPROXIMATELY_LOCATION'
  | 'ohos.permission.LOCATION'
  | 'ohos.permission.LOCATION_IN_BACKGROUND'

let currentWatchType = 'gcj02'

function locationChangeHandler(location: geoLocationManager.Location) {
  if (currentWatchType === 'gcj02') {
    map
      .convertCoordinate(
        mapCommon.CoordinateType.WGS84,
        mapCommon.CoordinateType.GCJ02,
        {
          latitude: location.latitude,
          longitude: location.longitude,
        }
      )
      .then((gcj02Posion: mapCommon.LatLng) => {
        UniServiceJSBridge.emit(API_ON_LOCATION_CHANGE, {
          latitude: gcj02Posion.latitude,
          longitude: gcj02Posion.longitude,
          speed: location.speed,
          accuracy: location.accuracy,
          altitude: location.altitude,
          verticalAccuracy: 0,
          horizontalAccuracy: 0,
        })
      })
    return
  }
  UniServiceJSBridge.emit(API_ON_LOCATION_CHANGE, {
    latitude: location.latitude,
    longitude: location.longitude,
    speed: location.speed,
    accuracy: location.accuracy,
    altitude: location.altitude,
    verticalAccuracy: 0,
    horizontalAccuracy: 0,
  })
}

export const startLocationUpdate =
  defineAsyncApi<API_TYPE_START_LOCATION_UPDATE>(
    API_START_LOCATION_UPDATE,
    (options, { resolve, reject }) => {
      requestPermission([
        'ohos.permission.LOCATION',
        'ohos.permission.APPROXIMATELY_LOCATION',
      ]).then((isGranted) => {
        if (isGranted) {
          reject('Permission denied')
          return
        }
        currentWatchType = options.type || 'gcj02'
        const requestInfo: geoLocationManager.LocationRequest = {
          priority: geoLocationManager.LocationRequestPriority.UNSET,
          scenario: geoLocationManager.LocationRequestScenario.UNSET,
        }
        try {
          geoLocationManager.on(
            'locationChange',
            requestInfo,
            locationChangeHandler
          )
        } catch (err) {
          reject((err as Error).message)
          return
        }
        resolve()
      })
    },
    StartLocationUpdateProtocol,
    StartLocationUpdateOptions
  )

export const stopLocationUpdate = defineAsyncApi<API_TYPE_STOP_LOCATION_UPDATE>(
  API_STOP_LOCATION_UPDATE,
  (_, { resolve }) => {
    geoLocationManager.off('locationChange', locationChangeHandler)
    resolve()
  }
)

export const onLocationChange = defineOnApi<API_TYPE_ON_LOCATION_CHANGE>(
  API_ON_LOCATION_CHANGE,
  () => {}
)

export const offLocationChange = defineOffApi<API_TYPE_OFF_LOCATION_CHANGE>(
  API_OFF_LOCATION_CHANGE,
  () => {}
)

export const onLocationChangeError =
  defineOnApi<API_TYPE_ON_LOCATION_CHANGE_ERROR>(
    API_ON_LOCATION_CHANGE_ERROR,
    () => {}
  )

export const offLocationChangeError =
  defineOffApi<API_TYPE_OFF_LOCATION_CHANGE_ERROR>(
    API_OFF_LOCATION_CHANGE_ERROR,
    () => {}
  )
