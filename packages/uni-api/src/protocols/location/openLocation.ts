export const API_OPEN_LOCATION = 'openLocation'
export type API_TYPE_OPEN_LOCATION = typeof uni.openLocation

const checkProps = (key: string, value: unknown): string | void => {
  if (value === undefined) {
    return `${key} should not be empty.`
  }

  if (typeof value !== 'number') {
    let receivedType: string = typeof value
    receivedType = receivedType[0].toUpperCase() + receivedType.substring(1)
    return `Expected Number, got ${receivedType} with value ${JSON.stringify(
      value
    )}.`
  }
}

export const OpenLocationOptions: ApiOptions<API_TYPE_OPEN_LOCATION> = {
  formatArgs: {
    latitude(value, params) {
      const checkedInfo = checkProps('latitude', value)
      if (checkedInfo) {
        return checkedInfo
      }

      params.latitude = value
    },
    longitude(value, params) {
      const checkedInfo = checkProps('longitude', value)
      if (checkedInfo) {
        return checkedInfo
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
