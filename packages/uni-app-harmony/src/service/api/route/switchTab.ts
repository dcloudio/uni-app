import type { API_TYPE_SWITCH_TAB, DefineAsyncApiFn } from '@dcloudio/uni-api'

export const $switchTab: DefineAsyncApiFn<API_TYPE_SWITCH_TAB> = (
  args,
  { resolve, reject }
) => {
  throw new Error('API $switchTab is not yet implemented')
}
