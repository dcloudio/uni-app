import {
  defineAsyncApi,
  API_TYPE_SET_NAVIGATION_BAR_TITLE,
  API_SET_NAVIGATION_BAR_TITLE,
  SetNavigationBarTitleProtocol,
} from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

export const setNavigationBarTitle =
  defineAsyncApi<API_TYPE_SET_NAVIGATION_BAR_TITLE>(
    API_SET_NAVIGATION_BAR_TITLE,
    (options, { resolve, reject }) => {
      const page = getCurrentPage() as ComponentPublicInstance
      if (page == null) {
        reject('page is not ready')
        return
      }

      const appPage = page.$nativePage

      appPage!.updateStyle(
        new Map<string, any | null>([
          [
            'navigationBar',
            new Map<string, any | null>([
              ['navigationBarTitleText', options.title],
            ]),
          ],
        ])
      )
      resolve()
    },
    SetNavigationBarTitleProtocol
  )
