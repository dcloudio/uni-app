export { getBaseSystemInfo } from '../service/api/base/getBaseSystemInfo'
export { inflateRaw, deflateRaw } from 'pako'
export { saveImage } from './saveImage'
export { getSameOriginUrl } from '../helpers/file'
export { getEnv } from './env'
export * from './getRealPath'
export * from './todo'
export { operateVideoPlayer } from '@dcloudio/uni-h5/service/api/context/operateVideoPlayer'
export { operateMap } from '../service/api/context/operateMap'
export {
  addMediaQueryObserver,
  removeMediaQueryObserver,
} from '@dcloudio/uni-app-plus/service/api/ui/mediaQueryObserver'
export {
  getLaunchOptions,
  getEnterOptions,
} from '@dcloudio/uni-app-plus/service/framework/app/utils'
export { setCurrentPageMeta } from '../service/api/ui/setPageMeta'
