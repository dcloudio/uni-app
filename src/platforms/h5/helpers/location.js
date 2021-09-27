export const MapType = {
  QQ: 'qq',
  GOOGLE: 'google',
  UNKNOWN: ''
}

export function getMapInfo () {
  let type = MapType.UNKNOWN
  let key = ''
  if (__uniConfig.qqMapKey) {
    type = MapType.QQ
    key = __uniConfig.qqMapKey
  } else if (__uniConfig.googleMapKey) {
    type = MapType.GOOGLE
    key = __uniConfig.googleMapKey
  }
  return {
    type,
    key
  }
}
