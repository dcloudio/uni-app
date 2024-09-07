import { defineSyncApi } from '@dcloudio/uni-api'
import type { GetElementById } from '@dcloudio/uni-app-x/types/uni'
import { getCurrentPage } from '@dcloudio/uni-core'

export const getElementById = defineSyncApi<GetElementById>(
  'getElementById',
  (id: string.IDString | string): UniElement | null => {
    const page = (getCurrentPage() as unknown as UniPage).vm
    if (page == null) {
      return null
    }

    const bodyNode = page.$el?.parentNode
    if (bodyNode == null) {
      console.warn('bodyNode is null')
      return null
    }
    return bodyNode.querySelector(`#${id}`)
  }
)
