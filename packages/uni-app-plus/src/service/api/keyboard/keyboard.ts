import {
  API_SHOW_KEYBOARD,
  API_HIDE_KEYBOARD,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import type {
  API_TYPE_SHOW_KEYBOARD,
  API_TYPE_HIDE_KEYBOARD,
} from '@dcloudio/uni-api'

export const showKeyboard = defineAsyncApi<API_TYPE_SHOW_KEYBOARD>(
  API_SHOW_KEYBOARD,
  (_, { resolve }) => {
    plus.key.showSoftKeybord()
    resolve()
  }
)

export const hideKeyboard = defineAsyncApi<API_TYPE_HIDE_KEYBOARD>(
  API_HIDE_KEYBOARD,
  (_, { resolve }) => {
    plus.key.hideSoftKeybord()
    resolve()
  }
)
