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
