import { EventChannel, ON_PAGE_NOT_FOUND, parseUrl } from '@dcloudio/uni-shared'
import { type Router, isNavigationFailure } from 'vue-router'
import type { ComponentPublicInstance } from 'vue'
import { invokeHook } from '@dcloudio/uni-core'
import {
  createPageState,
  entryPageState,
  getCurrentBasePages,
  getCurrentPagesMap,
  getPage$BasePage,
  navigateToPagesBeforeEntryPages,
  reLaunchPagesBeforeEntryPages,
  redirectToPagesBeforeEntryPages,
  switchTabPagesBeforeEntryPages,
} from '../../../framework/setup/page'
import { getTabBarPageId, removeNonTabBarPages } from './switchTab'
import { removeLastPage } from './redirectTo'
import { removeAllPages } from './reLaunch'
import {
  createWebAppRouteTransaction,
  discardWebAppRouteTransaction,
  queueWebAppRouteTransaction,
  resolveAppRoute,
} from './appRoute'
import type { WebAppRouteTransaction } from './appRoute'

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

function isCurrentTabBarPage(url: string) {
  const pages = getCurrentBasePages()
  const currentPage = pages[pages.length - 1]
  if (!currentPage?.$.__isTabBar) {
    return false
  }
  const path = parseUrl(url).path
  const $page = getPage$BasePage(currentPage)
  return path === $page.path || (path === '/' && $page.meta.isEntry)
}

function findTabBarPageId(url: string) {
  const path = parseUrl(url).path
  const pages = getCurrentPagesMap().values()
  for (const page of pages) {
    const $page = getPage$BasePage(page)
    if (path === $page.path || (path === '/' && $page.meta.isEntry)) {
      return $page.id
    }
  }
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
  return new Promise((resolve, reject) => {
    let routeUrl = url
    let transaction: WebAppRouteTransaction | undefined
    if (__X__) {
      const shouldDispatchAppRoute =
        type !== 'switchTab' || !isCurrentTabBarPage(url)
      const appRoute = shouldDispatchAppRoute
        ? resolveAppRoute(url, type)
        : undefined
      routeUrl = appRoute?.url || url
      const { path, query } = parseUrl(routeUrl)
      transaction = createWebAppRouteTransaction(
        router.resolve({ path, query }).fullPath,
        type,
        appRoute?.context
      )
    }
    const { path, query } = parseUrl(routeUrl)
    const tabBarPageId =
      __X__ && type === 'switchTab' ? findTabBarPageId(routeUrl) : __id__
    const state = createPageState(type, tabBarPageId)
    if (transaction) {
      transaction.pageId = state.__id__
      queueWebAppRouteTransaction(transaction)
    }
    const navigation = router[type === 'navigateTo' ? 'push' : 'replace']({
      path,
      query,
      state,
      force: true,
    }).then((failure) => {
      if (isNavigationFailure(failure)) {
        transaction && discardWebAppRouteTransaction(transaction)
        return reject(failure.message)
      }
      if (router.currentRoute.value.matched.length === 0) {
        invokeHook(
          (__X__ ? (getApp() as any).vm : getApp()) as ComponentPublicInstance,
          ON_PAGE_NOT_FOUND,
          {
            notFound: true,
            openType: type,
            path,
            query,
            scene: 1001,
          }
        )
        return reject(`page '${path}' is not found`)
      }
      if (type === 'switchTab') {
        const finalTabBarText =
          routeUrl === url
            ? tabBarText
            : router.resolve({ path, query }).meta.tabBarText
        router.currentRoute.value.meta.tabBarText = finalTabBarText
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
    if (__X__) {
      navigation.catch((error) => {
        transaction && discardWebAppRouteTransaction(transaction)
        reject(error instanceof Error ? error.message : error)
      })
    }
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
  switchTabPages.forEach(({ args, resolve, reject }) => {
    if (!__X__) {
      removeNonTabBarPages()
    }
    navigate(args, __X__ ? undefined : getTabBarPageId(args.url))
      .then(resolve)
      .catch(reject)
  })

  const redirectToPages = [...redirectToPagesBeforeEntryPages]
  redirectToPagesBeforeEntryPages.length = 0
  redirectToPages.forEach(({ args, resolve, reject }) => {
    if (!__X__) {
      removeLastPage()
    }
    navigate(args).then(resolve).catch(reject)
  })

  const reLaunchPages = [...reLaunchPagesBeforeEntryPages]
  reLaunchPagesBeforeEntryPages.length = 0
  reLaunchPages.forEach(({ args, resolve, reject }) => {
    if (!__X__) {
      removeAllPages()
    }
    navigate(args).then(resolve).catch(reject)
  })
}
