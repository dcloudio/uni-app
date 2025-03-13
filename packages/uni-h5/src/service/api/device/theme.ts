import {
  OFF_HOST_THEME_CHANGE,
  OFF_THEME_CHANGE,
  ON_HOST_THEME_CHANGE,
  ON_THEME_CHANGE,
} from '@dcloudio/uni-shared'
import { defineOffApi, defineOnApi, defineSyncApi } from '@dcloudio/uni-api'
import { isArray, isFunction } from '@vue/shared'

const themeChangeCallBack = (res: UniApp.OnThemeChangeCallbackResult) => {
  UniServiceJSBridge.invokeOnCallback(ON_THEME_CHANGE, res)
}

export const onThemeChange = defineOnApi<typeof uni.onThemeChange>(
  ON_THEME_CHANGE,
  () => {
    UniServiceJSBridge.on(ON_THEME_CHANGE, themeChangeCallBack)
  }
)

export const offThemeChange = defineOffApi<typeof uni.offThemeChange>(
  OFF_THEME_CHANGE,
  () => {
    UniServiceJSBridge.off(ON_THEME_CHANGE, themeChangeCallBack)
  }
)

// #if _X_
type HostThemeChangeCallback = (res: { hostTheme: string }) => void
type OnHostThemeChange = (callback: HostThemeChangeCallback) => number
type OffHostThemeChange = (id: number | HostThemeChangeCallback) => void
const THEME_CALLBACK: Array<
  [HostThemeChangeCallback, UniApp.OnThemeChangeCallback]
> = []

export const onHostThemeChange = defineSyncApi<OnHostThemeChange>(
  ON_HOST_THEME_CHANGE,
  (callback) => {
    const onHostThemeChangeCallback: UniApp.OnThemeChangeCallback = (res) => {
      callback({ hostTheme: res.theme })
    }
    const index = THEME_CALLBACK.push([callback, onHostThemeChangeCallback]) - 1
    UniServiceJSBridge.on(ON_THEME_CHANGE, onHostThemeChangeCallback)
    return index
  }
)

export const offHostThemeChange = defineSyncApi<OffHostThemeChange>(
  OFF_HOST_THEME_CHANGE,
  (callbackId) => {
    if (isFunction(callbackId)) {
      callbackId = THEME_CALLBACK.findIndex(
        ([callback]) => callback === callbackId
      )
    }
    if (callbackId > -1) {
      const arr = THEME_CALLBACK.splice(callbackId, 1)[0]
      isArray(arr) && UniServiceJSBridge.off(ON_THEME_CHANGE, arr[1])
    }
  }
)
// #endif
