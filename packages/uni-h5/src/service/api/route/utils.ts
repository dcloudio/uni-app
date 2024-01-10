import { EventChannel, parseUrl } from '@dcloudio/uni-shared'
import { isNavigationFailure, Router } from 'vue-router'
import { createPageState } from '../../../framework/setup/page'
//#if _X_
import { hideActionSheet } from '../ui/popup/showActionSheet'
import { hideModal } from '../ui/popup/showModal'
//#endif

export type NavigateType =
  | 'navigateTo'
  | 'redirectTo'
  | 'reLaunch'
  | 'switchTab'

interface NavigateOptions {
  type: NavigateType
  url: string
  tabBarText?: string
  events?: Record<string, any>
  isAutomatedTesting?: boolean
}
export function navigate(
  { type, url, tabBarText, events, isAutomatedTesting }: NavigateOptions,
  __id__?: number
): Promise<void | { eventChannel?: EventChannel; __id__?: number }> {
  //#if _X_
  hideActionSheet()
  hideModal()
  uni.hideToast()
  uni.hideLoading()
  //#endif
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
      if (type === 'switchTab') {
        router.currentRoute.value.meta.tabBarText = tabBarText
      }
      if (type === 'navigateTo') {
        const meta = router.currentRoute.value.meta
        // if getOpenerEventChannel is called before navigateTo
        if (!meta.eventChannel) {
          meta.eventChannel = new EventChannel(state.__id__, events)
        } else if (events) {
          Object.keys(events).forEach((eventName) => {
            ;(meta.eventChannel as EventChannel)._addListener(
              eventName,
              'on',
              events[eventName]
            )
          })
          ;(meta.eventChannel as EventChannel)._clearCache()
        }
        return isAutomatedTesting
          ? resolve({
              __id__: state.__id__,
            })
          : resolve({
              eventChannel: meta.eventChannel as EventChannel,
            })
      }
      return isAutomatedTesting ? resolve({ __id__: state.__id__ }) : resolve()
    })
  })
}
