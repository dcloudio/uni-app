// @ts-expect-error
import { findUniElement } from 'vue'
import { defineSyncApi } from '@dcloudio/uni-api/src/helpers/api'
export const API_GET_ELEMENT_BY_ID = 'getElementById'

export const getElementById = defineSyncApi(
  API_GET_ELEMENT_BY_ID,
  (id: string.IDString | string) => {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (!page || !page.$vm) {
      return null
    }
    return findUniElement(id, page.$vm)
    //return page.getElementById(id)
  }
)
