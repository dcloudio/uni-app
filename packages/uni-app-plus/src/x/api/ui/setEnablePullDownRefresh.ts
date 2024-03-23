import { defineSyncApi } from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

export const setEnablePullDownRefresh = defineSyncApi(
  'setEnablePullDownRefresh',
  (isEnable: boolean) => {
    const page = getCurrentPage() as unknown as ComponentPublicInstance
    const appPage = page.$nativePage
    appPage!.setEnablePullDownRefresh(isEnable)
  }
)
