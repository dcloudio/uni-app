export const API_GET_LOCATION = 'getLocation'
export type API_TYPE_GET_LOCATION = typeof uni.getLocation

const coordTypes = ['WGS84', 'GCJ02']

export const GetLocationOptions: ApiOptions<API_TYPE_GET_LOCATION> = {
  formatArgs: {
    type(value, params) {
      value = (value || '').toUpperCase()
      if (coordTypes.indexOf(value) === -1) {
        params.type = coordTypes[0]
      } else {
        params.type = value
      }
    },
    altitude(value, params) {
      params.altitude = value ? value : false
    },
  },
}

export const GetLocationProtocol: ApiProtocol<API_TYPE_GET_LOCATION> = {
  type: String,
  altitude: Boolean,
}
