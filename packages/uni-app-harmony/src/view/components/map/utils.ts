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
