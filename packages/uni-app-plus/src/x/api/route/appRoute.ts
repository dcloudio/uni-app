import { type AppRouteOpenType, createAppRouteRuntime } from '@dcloudio/uni-api'
import { getRouteOptions, invokeHook, normalizeRoute } from '@dcloudio/uni-core'
import {
  ON_PAGE_NOT_FOUND,
  decodedQuery,
  parseUrl,
  removeLeadingSlash,
} from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'

const appRouteRuntime = createAppRouteRuntime()

export const onAppRoute = appRouteRuntime.onAppRoute
export const offAppRoute = appRouteRuntime.offAppRoute

export function createAppRouteOptions(
  type: AppRouteOpenType,
  options: ApiOptions<any, any>
) {
  const normalizeUrl = options.formatArgs!.url as (
    url: string,
    params: Record<string, any>
  ) => string | void
  return extend({}, options, {
    formatArgs: extend({}, options.formatArgs, {
      url(url: string, params: Record<string, any>) {
        const errMsg = normalizeUrl(url, params)
        if (errMsg && url) {
          const normalizedUrl = normalizeRoute(url)
          if (!getRouteOptions(normalizedUrl.split('?')[0], true)) {
            dispatchAppRouteNotFound(normalizedUrl, type)
          }
        }
        return errMsg
      },
    }),
  })
}

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

export function dispatchAppRouteNotFound(
  url: string,
  openType: AppRouteOpenType
) {
  const { path, query } = parseUrl(url)
  dispatchAppRoute(path, query, openType, true)
}
