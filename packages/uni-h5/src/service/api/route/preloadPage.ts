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

if (__X__ && __DEV__) {
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
