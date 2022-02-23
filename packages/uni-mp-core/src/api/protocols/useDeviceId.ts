const UUID_KEY = '__DC_STAT_UUID'
let deviceId: string
interface Global {
  getStorageSync: UniApp.Uni['getStorageSync']
}
export function useDeviceId(global: Global = __GLOBAL__ as Global) {
  return function addDeviceId(_: any, toRes: UniApp.GetSystemInfoResult) {
    deviceId = deviceId || global.getStorageSync(UUID_KEY)
    if (!deviceId) {
      deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7)
      __GLOBAL__.setStorage({
        key: UUID_KEY,
        data: deviceId,
      })
    }
    toRes.deviceId = deviceId
  }
}
