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

export function saveImage(
  base64: string,
  dirname: string,
  callback: (error: Error | null, tempFilePath: string) => void
) {}
export function getSameOriginUrl(url: string): Promise<string> {
  return Promise.resolve(url)
}
export const TEMP_PATH = ''

export {
  getEnterOptions,
  getLaunchOptions,
} from '../service/framework/app/utils'
