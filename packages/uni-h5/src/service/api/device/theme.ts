import {
  OFF_HOST_THEME_CHANGE,
  OFF_THEME_CHANGE,
  ON_HOST_THEME_CHANGE,
  ON_THEME_CHANGE,
} from '@dcloudio/uni-shared'
import { defineOffApi, defineOnApi } from '@dcloudio/uni-api'

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
const hostThemeChangeCallBack = (res: UniApp.OnThemeChangeCallbackResult) => {
  UniServiceJSBridge.invokeOnCallback(ON_HOST_THEME_CHANGE, {
    hostTheme: res.theme,
  })
}

export const onHostThemeChange = defineOnApi<typeof uni.onThemeChange>(
  ON_HOST_THEME_CHANGE,
  () => {
    UniServiceJSBridge.on(ON_THEME_CHANGE, hostThemeChangeCallBack)
  }
)

export const offHostThemeChange = defineOnApi<typeof uni.onThemeChange>(
  OFF_HOST_THEME_CHANGE,
  () => {
    UniServiceJSBridge.off(ON_THEME_CHANGE, hostThemeChangeCallBack)
  }
)
// #endif
