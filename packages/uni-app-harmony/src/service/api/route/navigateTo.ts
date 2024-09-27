import { EventChannel, ON_HIDE, parseUrl } from '@dcloudio/uni-shared'
import { invokeHook } from '@dcloudio/uni-core'
import {
  API_NAVIGATE_TO,
  type API_TYPE_NAVIGATE_TO,
  type DefineAsyncApiFn,
  NavigateToOptions,
  NavigateToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { type RouteOptions, navigate } from './utils'
import { showWebview } from '@dcloudio/uni-app-plus/service/api/route/webview'
import { registerPage } from '../../framework/page'
import { getWebviewId } from '@dcloudio/uni-app-plus/service/framework/webview/utils'
import { initAnimation } from '@dcloudio/uni-app-plus/service/api/route/navigateTo'
import { setStatusBarStyle } from '../../../helpers/statusBar'

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
  invokeHook(ON_HIDE)
  const eventChannel = new EventChannel(getWebviewId() + 1, events)
  return new Promise((resolve) => {
    showWebview(
      registerPage({ url, path, query, openType: 'navigateTo', eventChannel }),
      aniType,
      aniDuration,
      () => {
        resolve({ eventChannel })
      },
      0
    )
    setStatusBarStyle()
  })
}
