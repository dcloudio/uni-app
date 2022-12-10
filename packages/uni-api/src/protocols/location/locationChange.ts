export const API_START_LOCATION_UPDATE = 'startLocationUpdate'
export type API_TYPE_START_LOCATION_UPDATE = typeof uni.startLocationUpdate
export const API_ON_LOCATION_CHANGE = 'onLocationChange'
export type API_TYPE_ON_LOCATION_CHANGE = typeof uni.onLocationChange
export const API_STOP_LOCATION_UPDATE = 'stopLocationUpdate'
export type API_TYPE_STOP_LOCATION_UPDATE = typeof uni.stopLocationUpdate
export const API_OFF_LOCATION_CHANGE = 'offLocationChange'
export type API_TYPE_OFF_LOCATION_CHANGE = typeof uni.offLocationChange
export const API_OFF_LOCATION_CHANGE_ERROR = 'offLocationChangeError'
export type API_TYPE_OFF_LOCATION_CHANGE_ERROR =
  typeof uni.offLocationChangeError
export const API_ON_LOCATION_CHANGE_ERROR = 'onLocationChangeError'
export type API_TYPE_ON_LOCATION_CHANGE_ERROR = typeof uni.onLocationChangeError

const coordTypes = ['wgs84', 'gcj02']

export const StartLocationUpdateProtocol: ApiProtocol<API_TYPE_START_LOCATION_UPDATE> =
  {
    type: String,
  }

export const StartLocationUpdateOptions: ApiOptions<API_TYPE_START_LOCATION_UPDATE> =
  {
    formatArgs: {
      type(value, params) {
        value = (value || '').toLowerCase()
        if (coordTypes.indexOf(value) === -1) {
          params.type = coordTypes[1]
        } else {
          params.type = value
        }
      },
    },
  }
