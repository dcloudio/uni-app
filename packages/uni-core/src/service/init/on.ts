import {
  ON_APP_ENTER_BACKGROUND,
  ON_APP_ENTER_FOREGROUND,
  ON_HIDE,
  ON_RESIZE,
  ON_SHOW,
} from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { invokeHook } from '../../helpers/hook'
import { getCurrentPage } from '../../helpers/page'
import type { LaunchOptions } from '../utils'

export function initOn() {
  const { on } = UniServiceJSBridge
  on(ON_RESIZE, onResize)
  on(ON_APP_ENTER_FOREGROUND, onAppEnterForeground)
  on(ON_APP_ENTER_BACKGROUND, onAppEnterBackground)
}

function onResize(res: UniApp.WindowResizeResult) {
  invokeHook(getCurrentPage() as ComponentPublicInstance, ON_RESIZE, res)
  UniServiceJSBridge.invokeOnCallback('onWindowResize', res) // API
}

function onAppEnterForeground(enterOptions: LaunchOptions) {
  const page = __X__
    ? (getCurrentPage() as unknown as UniPage).vm
    : getCurrentPage()

  invokeHook(
    (__X__ ? getApp().vm : getApp()) as ComponentPublicInstance,
    ON_SHOW,
    enterOptions
  )
  invokeHook(page as ComponentPublicInstance, ON_SHOW)
}

function onAppEnterBackground() {
  invokeHook(
    (__X__ ? getApp().vm : getApp()) as ComponentPublicInstance,
    ON_HIDE
  )
  invokeHook(
    (__X__
      ? (getCurrentPage() as unknown as UniPage).vm
      : getCurrentPage()) as ComponentPublicInstance,
    ON_HIDE
  )
}
