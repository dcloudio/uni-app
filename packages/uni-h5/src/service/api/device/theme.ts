import { ON_THEME_CHANGE, OFF_THEME_CHANGE } from '@dcloudio/uni-shared'
import { defineOnApi, defineOffApi } from '@dcloudio/uni-api'

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
