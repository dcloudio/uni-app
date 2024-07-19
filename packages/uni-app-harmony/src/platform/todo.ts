import { extend } from '@vue/shared'
import type {
  // AddIntersectionObserverArgs,
  AddMediaQueryObserverArgs,
  // RemoveIntersectionObserverArgs,
  RemoveMediaQueryObserverArgs,
  // SelectorQueryNodeInfo,
  // SelectorQueryRequest,
  SetPageMetaOptions,
} from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'
import { type LaunchOptions, createLaunchOptions } from '@dcloudio/uni-core'
export {
  requestComponentInfo,
  addIntersectionObserver,
  removeIntersectionObserver,
} from '@dcloudio/uni-app-plus/platform'

export function operateVideoPlayer(
  videoId: string,
  pageId: number,
  type: string,
  data?: unknown
) {
  // TODO: Implement
}

export const TEMP_PATH = '' // TODO 需要从applicationContext获取

export function addMediaQueryObserver(
  { reqId, component, options, callback }: AddMediaQueryObserverArgs,
  _pageId: number
) {
  // TODO: Implement
}

export function removeMediaQueryObserver(
  { reqId, component }: RemoveMediaQueryObserverArgs,
  _pageId: number
) {
  // TODO: Implement
}

export function setCurrentPageMeta(
  page: ComponentPublicInstance,
  options: SetPageMetaOptions
) {
  // TODO: Implement
}

const enterOptions: LaunchOptions = /*#__PURE__*/ createLaunchOptions()
const launchOptions: LaunchOptions = /*#__PURE__*/ createLaunchOptions()

export function getLaunchOptions() {
  // TODO: Implement
  return extend({}, launchOptions)
}

export function getEnterOptions() {
  // TODO: Implement
  return extend({}, enterOptions)
}
