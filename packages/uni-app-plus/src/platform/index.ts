import { ComponentPublicInstance } from 'vue'
import {
  AddIntersectionObserverArgs,
  AddMediaQueryObserverArgs,
  RemoveIntersectionObserverArgs,
  RemoveMediaQueryObserverArgs,
  SelectorQueryNodeInfo,
  SelectorQueryRequest,
} from '@dcloudio/uni-api'

export { getBaseSystemInfo } from '../service/api/base/getBaseSystemInfo'
export { getRealPath } from './getRealPath'
export function operateVideoPlayer(
  videoId: string,
  pageId: number,
  type: string,
  data?: unknown
) {}
export function operateMap(
  id: string,
  pageId: number,
  type: string,
  data?: unknown
) {}
export function requestComponentInfo(
  page: ComponentPublicInstance,
  reqs: Array<SelectorQueryRequest>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {}
export function addIntersectionObserver(
  args: AddIntersectionObserverArgs,
  pageId: number
) {}
export function removeIntersectionObserver(
  args: RemoveIntersectionObserverArgs,
  pageId: number
) {}
export function addMediaQueryObserver(
  args: AddMediaQueryObserverArgs,
  pageId: number
) {}
export function removeMediaQueryObserver(
  args: RemoveMediaQueryObserverArgs,
  pageId: number
) {}
export function saveImage(
  base64: string,
  dirname: string,
  callback: (error: Error | null, tempFilePath: string) => void
) {}
export function getSameOriginUrl(url: string): Promise<string> {
  return Promise.resolve(url)
}
export const TEMP_PATH = ''
