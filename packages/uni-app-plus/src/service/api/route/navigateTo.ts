import { EventChannel, ON_HIDE, parseUrl } from '@dcloudio/uni-shared'
import { getRouteMeta, invokeHook } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_TO,
  type API_TYPE_NAVIGATE_TO,
  type DefineAsyncApiFn,
  NavigateToOptions,
  NavigateToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

import { ANI_DURATION, ANI_SHOW } from '../../constants'
import { type RouteOptions, navigate } from './utils'
import { showWebview } from './webview'
import { registerPage } from '../../framework/page'
import { getWebviewId } from '../../framework/webview/utils'
import { setStatusBarStyle } from '../../statusBar'

export const $navigateTo: DefineAsyncApiFn<API_TYPE_NAVIGATE_TO> = (
  args,
  { resolve, reject }
) => {
  const { url, events, animationType, animationDuration } = args
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
        events,
        aniType,
        aniDuration,
      })
        .then(resolve)
        .catch(reject)
    },
    (args as any).openType === 'appLaunch'
  )
}

export const navigateTo = defineAsyncApi<API_TYPE_NAVIGATE_TO>(
  API_NAVIGATE_TO,
  $navigateTo,
  NavigateToProtocol,
  NavigateToOptions
)

interface NavigateToOptions extends RouteOptions {
  events: Record<string, any>
  aniType: string
  aniDuration: number
}

function _navigateTo({
  url,
  path,
  query,
  events,
  aniType,
  aniDuration,
}: NavigateToOptions): Promise<void | { eventChannel: EventChannel }> {
  // 当前页面触发 onHide
  invokeHook(ON_HIDE)
  const eventChannel = new EventChannel(getWebviewId() + 1, events)
  return new Promise((resolve) => {
    showWebview(
      registerPage({ url, path, query, openType: 'navigateTo', eventChannel }),
      aniType,
      aniDuration,
      () => {
        resolve({ eventChannel })
      }
    )
    setStatusBarStyle()
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
