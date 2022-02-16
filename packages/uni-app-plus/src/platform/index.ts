export { getBaseSystemInfo } from '../service/api/base/getBaseSystemInfo'
export { requestComponentInfo } from '../service/api/ui/requestComponentInfo'
export { setCurrentPageMeta } from '../service/api/ui/setPageMeta'
export { getRealPath } from './getRealPath'
export { operateVideoPlayer } from '../service/api/context/operateVideoPlayer'
export { operateMap } from '../service/api/context/operateMap'

export {
  addIntersectionObserver,
  removeIntersectionObserver,
} from '../service/api/ui/intersectionObserver'

export {
  addMediaQueryObserver,
  removeMediaQueryObserver,
} from '../service/api/ui/mediaQueryObserver'

export { saveImage } from './saveImage'
export { getSameOriginUrl } from '../helpers/file'
export { TEMP_PATH } from '../service/api/constants'

export {
  getEnterOptions,
  getLaunchOptions,
} from '../service/framework/app/utils'

export { inflateRaw, deflateRaw } from 'pako'
