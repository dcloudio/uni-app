import {
  API_NAVIGATE_BACK,
  API_TYPE_NAVIGATE_BACK,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPage, initI18nAppMsgsOnce } from '@dcloudio/uni-core'
import { useI18n } from '@dcloudio/uni-core'

export const navigateBack = defineAsyncApi<API_TYPE_NAVIGATE_BACK>(
  API_NAVIGATE_BACK,
  (args, { resolve, reject }) => {
    const page = getCurrentPage()
    if (!page) {
      return
    }
    if (page.$page.meta.isQuit) {
      quit()
    }
    return resolve()
  }
)
let firstBackTime = 0

function quit() {
  initI18nAppMsgsOnce()
  if (!firstBackTime) {
    firstBackTime = Date.now()
    plus.nativeUI.toast(useI18n().t('uni.app.quit'))
    setTimeout(() => {
      firstBackTime = 0
    }, 2000)
  } else if (Date.now() - firstBackTime < 2000) {
    plus.runtime.quit()
  }
}
