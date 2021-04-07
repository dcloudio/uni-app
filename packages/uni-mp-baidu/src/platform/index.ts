export * from '@dcloudio/uni-mp-platform'
export function getBaseSystemInfo() {
  return swan.getSystemInfoSync()
}
