import {
  WEBVIEW_UI_EVENT
} from '../../../constants'

export function initEvent (Vue) {
  Vue.prototype.$handleViewEvent = function ($vueEvent, options) {
    const cid = this._$id
    const nid = $vueEvent.currentTarget.getAttribute('_i')
    if (!nid) {
      return console.error(`[${cid}] nid not found`)
    }
    const $event = this.$handleEvent($vueEvent)
    // 移除无效属性
    delete $event._processed
    delete $event.mp
    delete $event.preventDefault
    delete $event.stopPropagation

    UniViewJSBridge.publishHandler(WEBVIEW_UI_EVENT, {
      data: $event,
      options: {
        cid,
        nid
      }
    })
  }
}
