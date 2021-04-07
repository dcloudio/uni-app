export {
  getRealPath,
  addIntersectionObserver,
  removeIntersectionObserver,
} from '@dcloudio/uni-mp-platform'
export function getBaseSystemInfo() {
  return qq.getSystemInfoSync()
}
