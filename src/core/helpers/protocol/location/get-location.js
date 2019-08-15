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
