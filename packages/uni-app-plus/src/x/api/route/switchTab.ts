import {
  API_SWITCH_TAB,
  type API_TYPE_SWITCH_TAB,
  type AppRouteContext,
  type AppRouteOpenType,
  type DefineAsyncApiFn,
  SwitchTabOptions,
  SwitchTabProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { parseUrl } from '@dcloudio/uni-shared'
import type { RouteOptions } from '../../../service/api/route/utils'
import {
  getTabIndex,
  isTabPage,
  switchSelect,
} from '../../framework/app/tabBar'
import type { ComponentPublicInstance } from 'vue'
import {
  closePage,
  handleBeforeEntryPageRoutes,
  updateEntryPageIsReady,
} from './utils'
import {
  entryPageState,
  switchTabPagesBeforeEntryPages,
} from '../../framework/app'
import { getCurrentBasePages } from '../../../service/framework/page/getCurrentPages'
import { type ResolvedAppRoute, resolveAppRoute } from './appRoute'

type SwitchTabApiFn = DefineAsyncApiFn<API_TYPE_SWITCH_TAB>

export function $switchTab(
  args: Parameters<SwitchTabApiFn>[0],
  { resolve, reject }: Parameters<SwitchTabApiFn>[1],
  appRouteOpenType: AppRouteOpenType = API_SWITCH_TAB,
  shouldDispatchAppRoute = true,
  resolvedAppRoute?: ResolvedAppRoute
) {
  const { url } = args
  const { path: originalPath } = parseUrl(url)
  if (appRouteOpenType === 'appLaunch') {
    entryPageState.isReady = true
  } else {
    updateEntryPageIsReady(originalPath)
  }

  if (!entryPageState.isReady) {
    switchTabPagesBeforeEntryPages.push({
      args,
      handler: { resolve, reject },
    })
    return
  }
  const appRoute =
    shouldDispatchAppRoute &&
    (appRouteOpenType !== API_SWITCH_TAB || !isCurrentTab(originalPath))
      ? resolvedAppRoute || resolveAppRoute(url, appRouteOpenType)
      : undefined
  const routeUrl = appRoute?.url || url
  const { path, query } = parseUrl(routeUrl)
  _switchTab(
    {
      url: routeUrl,
      path,
      query,
    },
    appRouteOpenType,
    shouldDispatchAppRoute,
    appRoute?.context
  )
    .then(resolve)
    .catch(reject)

  handleBeforeEntryPageRoutes()
}

export const switchTab = defineAsyncApi<API_TYPE_SWITCH_TAB>(
  API_SWITCH_TAB,
  $switchTab,
  SwitchTabProtocol,
  SwitchTabOptions
)

interface SwitchTabOptions extends RouteOptions {}

function isCurrentTab(path: string) {
  const pages = getCurrentBasePages()
  const currentPage = pages[pages.length - 1] as
    | ComponentPublicInstance
    | undefined
  return (
    !!currentPage &&
    isTabPage(currentPage) &&
    getTabIndex(currentPage.$basePage.path) === getTabIndex(path)
  )
}

function _switchTab(
  { url, path, query }: SwitchTabOptions,
  appRouteOpenType: AppRouteOpenType,
  shouldDispatchAppRoute: boolean,
  appRouteContext?: AppRouteContext
) {
  let selected: number = getTabIndex(path)
  if (selected == -1) {
    return Promise.reject(`tab ${path} not found`)
  }
  const pages = getCurrentBasePages()
  return new Promise((resolve: (res: void) => void) => {
    setTimeout(() => {
      switchSelect(
        selected,
        path,
        query,
        false,
        undefined,
        appRouteOpenType,
        shouldDispatchAppRoute,
        appRouteContext,
        () => resolve(undefined)
      )
      for (let index = pages.length - 1; index >= 0; index--) {
        const page = pages[index] as ComponentPublicInstance
        if (isTabPage(page)) {
          break
        }
        closePage(page, 'none')
      }
    }, 0)
  })
}
