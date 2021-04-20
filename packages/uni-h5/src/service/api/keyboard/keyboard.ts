import { API_HIDE_KEYBOARD, defineAsyncApi } from '@dcloudio/uni-api'
import type { API_TYPE_HIDE_KEYBOARD } from '@dcloudio/uni-api'

export const hideKeyboard = defineAsyncApi<API_TYPE_HIDE_KEYBOARD>(
  API_HIDE_KEYBOARD,
  (args, { resolve, reject }) => {
    const activeElement = document.activeElement as HTMLInputElement
    if (
      activeElement &&
      (activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'INPUT')
    ) {
      activeElement.blur()
      resolve()
    }
  }
)
