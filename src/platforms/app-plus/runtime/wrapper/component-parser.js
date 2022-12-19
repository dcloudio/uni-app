import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-parser'

export default function parseComponent (vueComponentOptions, needVueOptions) {
  const [componentOptions, vueOptions] = parseBaseComponent(vueComponentOptions, true)

  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById(`${this.__wxWebviewId__}`)
  }
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions
}
