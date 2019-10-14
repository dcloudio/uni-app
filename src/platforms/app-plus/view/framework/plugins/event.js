import {
  WEBVIEW_UI_EVENT
} from '../../../constants'

export function initEvent (Vue) {
  Vue.prototype.$handleViewEvent = function ($vueEvent, options) {
    const $event = this.$handleEvent($vueEvent)

    const cid = this._$id

    const {
      nid
    } = $event.options
    if (!nid) {
      return console.error(`[${cid}] nid not found`)
    }

    // 移除无用属性
    delete $event._processed
    delete $event.mp
    delete $event.preventDefault
    delete $event.stopPropagation
    delete $event.options

    UniViewJSBridge.publishHandler(WEBVIEW_UI_EVENT, {
      data: $event,
      options: {
        cid,
        nid
      }
    })
  }
}
