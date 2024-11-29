import { EventChannel, parseUrl } from '@dcloudio/uni-shared'
import { type Router, isNavigationFailure } from 'vue-router'
import {
  createPageState,
  entryPageState,
  navigateToPagesBeforeEntryPages,
  reLaunchPagesBeforeEntryPages,
  redirectToPagesBeforeEntryPages,
  switchTabPagesBeforeEntryPages,
} from '../../../framework/setup/page'
import { getTabBarPageId, removeNonTabBarPages } from './switchTab'
import { removeLastPage } from './redirectTo'
import { removeAllPages } from './reLaunch'

export type NavigateType =
  | 'navigateTo'
  | 'redirectTo'
  | 'reLaunch'
  | 'switchTab'

export interface NavigateOptions {
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
  if (__DEV__ && !__UNI_FEATURE_PAGES__) {
    console.warn(
      '当前项目为单页面工程，不能执行页面跳转api。如果需进行页面跳转， 需要在pages.json文件的pages字段中配置多个页面，然后重新运行。'
    )
  }
  const router = __X__
    ? (getApp().vm.$router as Router)
    : (getApp().$router as Router)
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

export function handleBeforeEntryPageRoutes() {
  if (entryPageState.handledBeforeEntryPageRoutes) {
    return
  }
  entryPageState.handledBeforeEntryPageRoutes = true

  const navigateToPages = [...navigateToPagesBeforeEntryPages]
  navigateToPagesBeforeEntryPages.length = 0
  navigateToPages.forEach(({ args, resolve, reject }) =>
    // @ts-expect-error
    navigate(args).then(resolve).catch(reject)
  )

  const switchTabPages = [...switchTabPagesBeforeEntryPages]
  switchTabPagesBeforeEntryPages.length = 0
  switchTabPages.forEach(
    ({ args, resolve, reject }) => (
      removeNonTabBarPages(),
      navigate(args, getTabBarPageId(args.url)).then(resolve).catch(reject)
    )
  )

  const redirectToPages = [...redirectToPagesBeforeEntryPages]
  redirectToPagesBeforeEntryPages.length = 0
  redirectToPages.forEach(
    ({ args, resolve, reject }) => (
      removeLastPage(), navigate(args).then(resolve).catch(reject)
    )
  )

  const reLaunchPages = [...reLaunchPagesBeforeEntryPages]
  reLaunchPagesBeforeEntryPages.length = 0
  reLaunchPages.forEach(
    ({ args, resolve, reject }) => (
      removeAllPages(), navigate(args).then(resolve).catch(reject)
    )
  )
}
