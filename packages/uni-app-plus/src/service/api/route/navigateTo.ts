import { parseUrl } from '@dcloudio/uni-shared'
import { getRouteMeta } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_TO,
  API_TYPE_NAVIGATE_TO,
  defineAsyncApi,
  NavigateToOptions,
  NavigateToProtocol,
} from '@dcloudio/uni-api'

import { ANI_DURATION, ANI_SHOW } from '../../constants'
import { navigate } from './utils'
import { showWebview } from './webview'
import { registerPage } from '../../framework/page'

export const navigateTo = defineAsyncApi<API_TYPE_NAVIGATE_TO>(
  API_NAVIGATE_TO,
  (args, { resolve, reject }) => {
    const { url, animationType, animationDuration } = args
    const { path, query } = parseUrl(url)
    const [aniType, aniDuration] = initAnimation(
      path,
      animationType,
      animationDuration
    )
    navigate(
      path,
      () => {
        _navigateTo({
          url,
          path,
          query,
          aniType,
          aniDuration,
        })
          .then(resolve)
          .catch(reject)
      },
      (args as any).openType === 'appLaunch'
    )
  },
  NavigateToProtocol,
  NavigateToOptions
)

interface NavigateToOptions {
  url: string
  path: string
  query: Record<string, any>
  aniType: string
  aniDuration: number
}

function _navigateTo({
  url,
  path,
  query,
  aniType,
  aniDuration,
}: NavigateToOptions): Promise<undefined> {
  // TODO eventChannel
  return new Promise((resolve) => {
    showWebview(
      registerPage({ url, path, query, openType: 'navigateTo' }),
      aniType,
      aniDuration,
      () => {
        resolve(undefined)
      }
    )
  })
}

function initAnimation(
  path: string,
  animationType?: string,
  animationDuration?: number
) {
  const { globalStyle } = __uniConfig
  const meta = getRouteMeta(path)!
  return [
    animationType ||
      meta.animationType ||
      globalStyle.animationType ||
      ANI_SHOW,
    animationDuration ||
      meta.animationDuration ||
      globalStyle.animationDuration ||
      ANI_DURATION,
  ] as const
}
