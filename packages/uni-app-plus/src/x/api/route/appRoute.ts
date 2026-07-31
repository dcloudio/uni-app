import { type AppRouteOpenType, createAppRouteRuntime } from '@dcloudio/uni-api'
import { invokeHook } from '@dcloudio/uni-core'
import {
  ON_PAGE_NOT_FOUND,
  decodedQuery,
  parseUrl,
  removeLeadingSlash,
} from '@dcloudio/uni-shared'

const appRouteRuntime = createAppRouteRuntime()

export const onAppRoute = appRouteRuntime.onAppRoute
export const offAppRoute = appRouteRuntime.offAppRoute

export function dispatchAppRoute(
  path: string,
  query: Record<string, any>,
  openType: AppRouteOpenType,
  notFound = false
) {
  const context = appRouteRuntime.createAppRouteContext({
    path: removeLeadingSlash(path),
    query: decodedQuery(query),
    openType,
    notFound,
  })
  if (notFound) {
    invokeHook((getApp() as any).vm, ON_PAGE_NOT_FOUND, {
      path: context.event.path,
      query: Object.assign({}, context.event.query),
      isEntryPage: openType === 'appLaunch',
    })
  }
  appRouteRuntime.dispatchAppRoute(context)
}

export function dispatchAppRouteNotFound(url: string) {
  const { path, query } = parseUrl(url)
  dispatchAppRoute(path, query, 'appLaunch', true)
}
