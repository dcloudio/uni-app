import { parseQuery } from '@dcloudio/uni-shared'
import {
  API_PRELOAD_PAGE,
  API_TYPE_PRELOAD_PAGE,
  PreloadPageProtocol,
  API_UN_PRELOAD_PAGE,
  API_TYPE_UN_PRELOAD_PAGE,
  UnPreloadPageProtocol,
  defineAsyncApi,
  defineSyncApi,
} from '@dcloudio/uni-api'
import { initPageInternalInstance } from '@dcloudio/uni-core'
import {
  preloadWebview,
  closePreloadWebview,
} from '../../framework/page/preLoad'
import { createNVuePage } from '../../framework/page/register'
import { initRouteOptions } from '../../framework/page/routeOptions'
import { preloadWebviews } from '../../framework/page/preLoad'

export const unPreloadPage = defineSyncApi<API_TYPE_UN_PRELOAD_PAGE>(
  API_UN_PRELOAD_PAGE,
  ({ url }) => {
    const webview = closePreloadWebview({
      url,
    })
    if (webview) {
      return {
        id: webview.id,
        url,
        errMsg: 'unPreloadPage:ok',
      }
    }
    return {
      url,
      errMsg: 'unPreloadPage:fail not found',
    }
  },
  UnPreloadPageProtocol
)

export const preloadPage = defineAsyncApi<API_TYPE_PRELOAD_PAGE>(
  API_PRELOAD_PAGE,
  ({ url }, { resolve }) => {
    // 防止热更等情况重复 preloadPage
    if (preloadWebviews[url]) {
      return
    }
    const urls = url.split('?')
    const path = urls[0]
    const query = parseQuery(urls[1] || '')
    const webview = preloadWebview({
      url,
      path,
      query,
    })
    const routeOptions = initRouteOptions(path, 'preloadPage')
    routeOptions.meta.id = parseInt(webview.id)

    const pageInstance = initPageInternalInstance(
      'preloadPage',
      url,
      query,
      routeOptions.meta,
      undefined,
      (__uniConfig.darkmode
        ? plus.navigator.getUIStyle()
        : 'light') as UniApp.ThemeMode
    )
    createNVuePage(parseInt(webview.id), webview, pageInstance)
    resolve({
      id: webview.id,
      url,
      errMsg: 'preloadPage:ok',
    })
  },
  PreloadPageProtocol
)
