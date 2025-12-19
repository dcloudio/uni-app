import { defineSyncApi } from '@dcloudio/uni-api'
import type { GetElementById } from '@dcloudio/uni-app-x/types/uni'
import { getCurrentPage } from '@dcloudio/uni-core'

export const getElementById = defineSyncApi<GetElementById>(
  'getElementById',
  (id: string.IDString | string): UniElement | null => {
    const page = getCurrentPage() as unknown as UniPage
    if (page == null) {
      return null
    }
    return page.getElementById(id)
  }
)
