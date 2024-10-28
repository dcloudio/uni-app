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
import { TEMP_PATH } from '../service/api/constants'
export { TEMP_PATH }

export {
  getEnterOptions,
  getLaunchOptions,
} from '../service/framework/app/utils'

export { inflateRaw, deflateRaw } from 'pako'

interface Env {
  USER_DATA_PATH: string
  TEMP_PATH: string
  CACHE_PATH: string
}
export const getEnv: (() => Env) | undefined = () => ({
  TEMP_PATH,
  CACHE_PATH: '',
  USER_DATA_PATH: '',
})

//#if _X_
export { registerSystemRoute } from '../x/framework/route'
export { closeNativeDialogPage } from '../x/api'
//#endif
