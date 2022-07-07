export const API_OPEN_LOCATION = 'openLocation'
export type API_TYPE_OPEN_LOCATION = typeof uni.openLocation

export const OpenLocationOptions: ApiOptions<API_TYPE_OPEN_LOCATION> = {
  formatArgs: {
    latitude(value, params) {
      if (value !== 0 && !value) {
        return 'latitude should not be empty.'
      }
      params.latitude = value
    },
    longitude(value, params) {
      if (value !== 0 && !value) {
        return 'longitude should not be empty.'
      }
      params.longitude = value
    },
    scale(value, params) {
      value = Math.floor(value!)
      params.scale = value >= 5 && value <= 18 ? value : 18
    },
  },
}

export const OpenLocationProtocol: ApiProtocol<API_TYPE_OPEN_LOCATION> = {
  latitude: Number,
  longitude: Number,
  scale: Number,
  name: String,
  address: String,
}
