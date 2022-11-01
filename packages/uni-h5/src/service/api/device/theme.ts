import { ON_THEME_CHANGE } from '@dcloudio/uni-shared'
import { defineOnApi } from '@dcloudio/uni-api'

export const onThemeChange = defineOnApi<typeof uni.onThemeChange>(
  ON_THEME_CHANGE,
  () => {
    UniServiceJSBridge.on(ON_THEME_CHANGE, (res) => {
      UniServiceJSBridge.invokeOnCallback(ON_THEME_CHANGE, res)
    })
  }
)
