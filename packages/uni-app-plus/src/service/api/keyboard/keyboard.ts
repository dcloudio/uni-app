import { ON_KEYBOARD_HEIGHT_CHANGE } from '@dcloudio/uni-shared'
import {
  API_HIDE_KEYBOARD,
  API_SHOW_KEYBOARD,
  type API_TYPE_HIDE_KEYBOARD,
  type API_TYPE_SHOW_KEYBOARD,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
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

function onKeyboardHeightChangeCallback(res: any) {
  UniServiceJSBridge.invokeOnCallback(ON_KEYBOARD_HEIGHT_CHANGE, res)
}

export const onKeyboardHeightChange = defineOnApi<
  typeof uni.onKeyboardHeightChange
>(ON_KEYBOARD_HEIGHT_CHANGE, () => {
  UniServiceJSBridge.on(
    ON_KEYBOARD_HEIGHT_CHANGE,
    onKeyboardHeightChangeCallback
  )
})

export const offKeyboardHeightChange = defineOffApi<
  typeof uni.offKeyboardHeightChange
>(ON_KEYBOARD_HEIGHT_CHANGE, () => {
  UniServiceJSBridge.off(
    ON_KEYBOARD_HEIGHT_CHANGE,
    onKeyboardHeightChangeCallback
  )
})
