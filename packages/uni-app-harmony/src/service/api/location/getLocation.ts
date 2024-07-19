import {
  API_GET_LOCATION,
  type API_TYPE_GET_LOCATION,
  GetLocationOptions,
  GetLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerServiceMethod } from '@dcloudio/uni-core'
import geoLocationManager from '@ohos.geoLocationManager'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import type common from '@ohos.app.ability.common'
import mapCommon from '@hms.core.map.mapCommon'
import map from '@hms.core.map.map'

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

// TODO 暂不申请后台定位权限。或者考虑给位置相关的api加参数？
type Permission =
  | 'ohos.permission.APPROXIMATELY_LOCATION'
  | 'ohos.permission.LOCATION'
  | 'ohos.permission.LOCATION_IN_BACKGROUND'

export const getLocation = defineAsyncApi<API_TYPE_GET_LOCATION>(
  API_GET_LOCATION,
  (
    { type, altitude, highAccuracyExpireTime, isHighAccuracy },
    { resolve, reject }
  ) => {
    const permissions = [
      'ohos.permission.APPROXIMATELY_LOCATION',
    ] as Permission[]
    if (isHighAccuracy) {
      permissions.push('ohos.permission.LOCATION')
    }
    requestPermission(permissions).then((isGranted) => {
      if (!isGranted) {
        reject('Permission denied')
        return
      }
      // const requestInfo: geoLocationManager.CurrentLocationRequest = {
      //   priority: isHighAccuracy
      //     ? geoLocationManager.LocationRequestPriority.ACCURACY
      //     : geoLocationManager.LocationRequestPriority.UNSET,
      //   scenario: geoLocationManager.LocationRequestScenario.UNSET,
      //   maxAccuracy: 0,
      //   timeoutMs: highAccuracyExpireTime,
      // }
      const singleLocationRequest: geoLocationManager.SingleLocationRequest = {
        locatingPriority: isHighAccuracy
          ? geoLocationManager.LocatingPriority.PRIORITY_ACCURACY
          : geoLocationManager.LocatingPriority.PRIORITY_LOCATING_SPEED,
        locatingTimeoutMs: highAccuracyExpireTime || 1000,
      }
      try {
        geoLocationManager.getCurrentLocation(
          singleLocationRequest,
          (err: Error, location: geoLocationManager.Location): void => {
            if (err) {
              reject(err.message)
              return
            }
            if (type === 'gcj02') {
              map
                .convertCoordinate(
                  mapCommon.CoordinateType.WGS84,
                  mapCommon.CoordinateType.GCJ02,
                  {
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }
                )
                .then(
                  (gcj02Posion: mapCommon.LatLng) => {
                    resolve({
                      latitude: gcj02Posion.latitude,
                      longitude: gcj02Posion.longitude,
                      speed: location.speed,
                      accuracy: location.accuracy,
                      altitude: altitude ? location.altitude : 0,
                      verticalAccuracy: 0,
                      horizontalAccuracy: 0,
                    })
                  },
                  (err: Error) => {
                    reject(err.message)
                  }
                )
              return
            }
            resolve({
              latitude: location.latitude,
              longitude: location.longitude,
              speed: location.speed,
              accuracy: location.accuracy,
              altitude: altitude ? location.altitude : 0,
              verticalAccuracy: 0,
              horizontalAccuracy: 0,
            })
          }
        )
      } catch (err) {
        reject((err as Error).message)
      }
    })
  },
  GetLocationProtocol,
  GetLocationOptions
)

interface IGetLocationOptions {
  type?: 'wgs84' | 'gcj02'
  altitude?: boolean
  highAccuracyExpireTime?: number
  isHighAccuracy?: boolean
}

export function subscribeGetLocation() {
  registerServiceMethod(
    API_GET_LOCATION,
    (args: IGetLocationOptions, resolve) => {
      getLocation({
        type: args.type,
        altitude: args.altitude,
        highAccuracyExpireTime: args.highAccuracyExpireTime,
        isHighAccuracy: args.isHighAccuracy,
        success(res) {
          resolve({
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            accuracy: res.accuracy,
            altitude: res.altitude,
            verticalAccuracy: res.verticalAccuracy,
            horizontalAccuracy: res.horizontalAccuracy,
          })
        },
        fail(err) {
          resolve({
            errMsg: err.errMsg || 'getLocation:fail',
          })
        },
      })
    }
  )
}
