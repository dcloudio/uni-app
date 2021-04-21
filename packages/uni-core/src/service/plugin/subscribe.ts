import { ComponentPublicInstance } from '@vue/runtime-core'
import { getCurrentPage, invokeHook } from './page'

export function initSubscribe() {
  UniServiceJSBridge.on('onAppEnterForeground', () => {
    const page = getCurrentPage()
    const showOptions = {
      path: '',
      query: {},
    }
    if (page) {
      showOptions.path = page.$page.route
      showOptions.query = page.$page.options
    }
    invokeHook(getApp() as ComponentPublicInstance, 'onShow', showOptions)
    invokeHook(page as ComponentPublicInstance, 'onShow')
  })
  UniServiceJSBridge.on('onAppEnterBackground', () => {
    invokeHook(getApp() as ComponentPublicInstance, 'onHide')
    invokeHook(getCurrentPage() as ComponentPublicInstance, 'onHide')
  })
}
