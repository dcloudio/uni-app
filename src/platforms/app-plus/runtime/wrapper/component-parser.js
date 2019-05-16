import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-parser'

export default function parseComponent (vueComponentOptions) {
  const componentOptions = parseBaseComponent(vueComponentOptions)

  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById(`${this.__wxWebviewId__}`)
  }
  return componentOptions
}
