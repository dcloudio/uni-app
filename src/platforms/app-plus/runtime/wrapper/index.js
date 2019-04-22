export {
  mocks,
  handleLink,
  triggerLink
}
  from '../../../mp-weixin/runtime/wrapper/index'

export function initPage (pageOptions) {
  initComponent(pageOptions)
}

export function initComponent (componentOptions) {
  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById(`${this.__wxWebviewId__}`)
  }
}
