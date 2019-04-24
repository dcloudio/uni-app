export {
  mocks,
  initRefs,
  handleLink,
  triggerLink,
  initBehavior
}
  from '../../../mp-weixin/runtime/wrapper/index'

export function initPage (pageOptions) {
  return initComponent(pageOptions)
}

export function initComponent (componentOptions) {
  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById(`${this.__wxWebviewId__}`)
  }
  return Component(componentOptions)
}
