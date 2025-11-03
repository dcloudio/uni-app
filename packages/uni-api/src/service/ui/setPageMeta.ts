import { defineAsyncApi } from '../../helpers/api'
import { getCurrentPageVm } from '@dcloudio/uni-core'
import { setCurrentPageMeta } from '@dcloudio/uni-platform'

export interface SetPageMetaOptions {
  pageStyle?: string
  rootFontSize?: string
  pageId?: number
  success?: (result: any) => void
  fail?: (result: any) => void
  complete?: (result: any) => void
}
type API_TYPE_SET_PAGE_META = (options: SetPageMetaOptions) => void

export const API_SET_PAGE_META = 'setPageMeta'
export const setPageMeta = defineAsyncApi<API_TYPE_SET_PAGE_META>(
  API_SET_PAGE_META,
  (options, { resolve }) => {
    resolve(setCurrentPageMeta(getCurrentPageVm()!, options))
  }
)
