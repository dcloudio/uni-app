const type = {
  WGS84: 'WGS84',
  GCJ02: 'GCJ02'
}
export const getLocation = {
  type: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.type = Object.values(type).indexOf(value) < 0 ? type.WGS84 : value
    },
    default: type.WGS84
  },
  altitude: {
    altitude: Boolean,
    default: false
  }
}
export const openLocation = {
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  scale: {
    type: Number,
    validator (value, params) {
      value = Math.floor(value)
      params.scale = value >= 5 && value <= 18 ? value : 18
    },
    default: 18
  },
  name: {
    type: String
  },
  address: {
    type: String
  }
}
