import {
  WEBVIEW_UI_EVENT
} from '../../../constants'

export function initEvent (Vue) {
  Vue.prototype.$handleViewEvent = function ($vueEvent, options) {
    const $event = this.$handleEvent($vueEvent)
    const cid = this._$id
    // 当自定义组件根节点触发事件时，nid 始终为 0
    const nid = $vueEvent.currentTarget === this.$el ? 0 : $event.options.nid
    if (typeof nid === 'undefined') {
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
