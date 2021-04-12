export const API_OPEN_LOCATION = 'openLocation'
export type API_TYPE_OPEN_LOCATION = typeof uni.openLocation

export const OpenLocationOptions: ApiOptions<API_TYPE_OPEN_LOCATION> = {
  formatArgs: {
    scale(value, params) {
      value = Math.floor(value!)
      params.scale = value >= 5 && value <= 18 ? value : 18
    },
  },
}

export const OpenLocationProtocol: ApiProtocol<API_TYPE_OPEN_LOCATION> = {
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  scale: Number,
  name: String,
  address: String,
}
