import { EventChannel, parseUrl } from '@dcloudio/uni-shared'
import { isNavigationFailure, Router } from 'vue-router'
import { createPageState } from '../../../framework/setup/page'

export type NavigateType =
  | 'navigateTo'
  | 'redirectTo'
  | 'reLaunch'
  | 'switchTab'

interface NavigateOptions {
  type: NavigateType
  url: string
  events?: Record<string, any>
}
export function navigate(
  { type, url, events }: NavigateOptions,
  __id__?: number
): Promise<void | { eventChannel: EventChannel }> {
  const router = getApp().$router as Router
  const { path, query } = parseUrl(url)
  return new Promise((resolve, reject) => {
    const state = createPageState(type, __id__)
    router[type === 'navigateTo' ? 'push' : 'replace']({
      path,
      query,
      state,
      force: true,
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        return reject(failure.message)
      }
      if (type === 'navigateTo') {
        const meta = router.currentRoute.value.meta
        // if getOpenerEventChannel is called before navigateTo
        const eventChannel = (meta.eventChannel =
          (meta.eventChannel as EventChannel) ||
          new EventChannel(state.__id__, events))
        return resolve({
          eventChannel,
        })
      }
      return resolve()
    })
  })
}
