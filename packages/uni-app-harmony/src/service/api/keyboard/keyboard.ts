import { ON_KEYBOARD_HEIGHT_CHANGE } from '@dcloudio/uni-shared'
import { defineOffApi, defineOnApi } from '@dcloudio/uni-api'

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
