const coordTypes = ['wgs84', 'gcj02']

export const getLocation = {
  type: {
    type: String,
    validator (value, params) {
      value = (value || '').toLowerCase()
      params.type = coordTypes.indexOf(value) < 0 ? coordTypes[0] : value
    }
  },
  altitude: {
    type: Boolean,
    default: false
  }
}
