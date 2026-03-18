import { defineAsyncApi } from '@dcloudio/uni-api/src/helpers/api'
export const API_CREATE_EDITOR_CONTEXT_ASYNC = 'createEditorContextAsync'

interface CreateEditorContextAsyncOptions {
  id: string
  component?: any
}

export const createEditorContextAsync = defineAsyncApi<
  (options: CreateEditorContextAsyncOptions) => void
>(API_CREATE_EDITOR_CONTEXT_ASYNC, (options, { resolve, reject }) => {
  const { id, component } = options
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  if (!page || !page.$vm) {
    reject('current page invalid.')
  } else {
    const query = __GLOBAL__.createSelectorQuery()
    if (__PLATFORM__ === 'mp-alipay' && component) {
      // 支付宝小程序 in 只支持在 Component 中使用，Page 中使用返回值为 null https://opendocs.alipay.com/mini/0cs688?pathHash=aba8a9f8#%E7%AE%80%E4%BB%8B
      query.in = function () {
        return this
      }
    }
    const baseQuery = component ? query.in(component) : query
    baseQuery
      .select('#' + id)
      .fields({ context: true }, () => {})
      .exec((res) => {
        if (res && res.context) {
          resolve(res.context)
        } else {
          reject('editor id or component invalid.')
        }
      })
  }
})
