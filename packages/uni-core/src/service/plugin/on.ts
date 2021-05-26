import { ComponentPublicInstance } from '@vue/runtime-core'
import { getCurrentPage, invokeHook } from './page'

export function initOn() {
  UniServiceJSBridge.on('onAppEnterForeground', onAppEnterForeground)
  UniServiceJSBridge.on('onAppEnterBackground', onAppEnterBackground)
}

function onAppEnterForeground() {
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
}

function onAppEnterBackground() {
  invokeHook(getApp() as ComponentPublicInstance, 'onHide')
  invokeHook(getCurrentPage() as ComponentPublicInstance, 'onHide')
}
