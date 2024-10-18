export type Location = {
  latitude: number
  longitude: number
}

export function getLocation(args = {}): Promise<Location> {
  return new Promise((resolve, reject) => {
    UniViewJSBridge.invokeServiceMethod('getLocation', args, (res) => {
      if (res.latitude && res.longitude) {
        resolve(res)
      } else {
        reject((res && res.errMsg) || 'getLocation:fail')
      }
    })
  })
}

export function mapPlaceSearch(args = {}) {
  return new Promise((resolve, reject) => {
    UniViewJSBridge.invokeServiceMethod('mapPlaceSearch', args, (result) => {
      if (result && result.errMsg) {
        reject(result)
      } else {
        resolve(result)
      }
    })
  })
}
