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

export const API_ON_KEYBOARD_HEIGHT_CHANGE = 'onKeyboardHeightChange'
type API_TYPE_ON_KEYBOARD_HEIGHT_CHANGE = typeof uni.onKeyboardHeightChange
export const onKeyboardHeightChange =
  defineAsyncApi<API_TYPE_ON_KEYBOARD_HEIGHT_CHANGE>(
    API_ON_KEYBOARD_HEIGHT_CHANGE,
    (args, { resolve, reject }) => {
      resolve()
    }
  )

export const API_OFF_KEYBOARD_HEIGHT_CHANGE = 'offKeyboardHeightChange'
type API_TYPE_OFF_KEYBOARD_HEIGHT_CHANGE = typeof uni.offKeyboardHeightChange
export const offKeyboardHeightChange =
  defineAsyncApi<API_TYPE_OFF_KEYBOARD_HEIGHT_CHANGE>(
    API_OFF_KEYBOARD_HEIGHT_CHANGE,
    (args, { resolve, reject }) => {
      resolve()
    }
  )
