export * from './dom'
export { getBaseSystemInfo } from '../service/api/base/getBaseSystemInfo'
export { operateVideoPlayer } from '../service/api/context/operateVideoPlayer'
export { operateMap } from '../service/api/context/operateMap'
export { requestComponentInfo } from '../service/api/ui/requestComponentInfo'
export { setCurrentPageMeta } from '../service/api/ui/setPageMeta'
export {
  addIntersectionObserver,
  removeIntersectionObserver,
} from '../service/api/ui/intersectionObserver'
export {
  addMediaQueryObserver,
  removeMediaQueryObserver,
} from '../service/api/ui/mediaQueryObserver'
export * from './saveImage'
export * from './constants'
export { getSameOriginUrl } from '../helpers/file'
export { getEnterOptions, getLaunchOptions } from '../framework/setup/utils'

export const inflateRaw = (...args: any[]): any => {}
export const deflateRaw = (...args: any[]): any => {}
