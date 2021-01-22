import { ApiProtocol, ApiOptions } from '../type'

export const OpenLocationOptions: ApiOptions = {
  formatArgs: {
    type(value, params) {
      value = Math.floor(value)
      params.scale = value >= 5 && value <= 18 ? value : 18
    },
  },
}

export const OpenLocationProtocol: ApiProtocol = {
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  scale: {
    type: Number,
    default: 18,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
}
