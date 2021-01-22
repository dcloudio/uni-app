import { ApiProtocol, ApiOptions } from '../type'

const coordTypes = {
  WGS84: 'WGS84',
  GCJ02: 'GCJ02',
}

export const GetLocationOptions: ApiOptions = {
  formatArgs: {
    type(value, params) {
      value = (value || '').toUpperCase()
      let type = coordTypes[value as keyof typeof coordTypes]
      if (!type) {
        type = coordTypes.WGS84
      }
      params.type = type
    },
  },
}

export const GetLocationProtocol: ApiProtocol = {
  type: {
    type: String,
    default: coordTypes.WGS84,
  },
  altitude: {
    type: Boolean,
    default: false,
  },
}
