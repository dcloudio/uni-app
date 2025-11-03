import {
  API_PRELOAD_PAGE,
  type API_TYPE_PRELOAD_PAGE,
  PreloadPageProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getRouteOptions } from '@dcloudio/uni-core'

export const preloadPage = defineAsyncApi<API_TYPE_PRELOAD_PAGE>(
  API_PRELOAD_PAGE,
  ({ url }, { resolve, reject }) => {
    const path = url.split('?')[0]
    const route = getRouteOptions(path)
    if (!route) {
      reject(`${url}}`)
      return
    }
    route.loader &&
      route
        .loader()
        .then(() => {
          resolve({
            url,
            errMsg: 'preloadPage:ok',
          })
        })
        .catch((err: any) => {
          reject(`${url} ${String(err)}`)
        })
  },
  PreloadPageProtocol
)

// 自动化测试时不进行预加载，避免内存占用过高导致 connection close 问题
if (__X__ && __DEV__ && !process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Preload pages in uni-app-x development mode.')
    __uniRoutes.reduce((prev, route) => {
      return prev.then(() => {
        return new Promise((resolve) => {
          preloadPage({
            url: route.alias || route.path,
            complete() {
              setTimeout(() => {
                resolve()
              }, 200)
            },
          })
        })
      })
    }, Promise.resolve())
  })
}
