import {
  vd
} from './data'

export function initEvent (Vue) {
  // 部分组件内部使用了$page
  Object.defineProperty(Vue.prototype, '$page', {
    get () {
      return getCurrentPages()[0].$page
    }
  })

  Vue.prototype.$handleVModelEvent = function (nid, value) {
    vd.addUIEvent(this._$id, nid, {
      type: 'input',
      target: {
        value
      }
    })
    // 使用 setTimeout 做批量同步
    setTimeout(() => {
      vd.sendUIEvent()
    }, 0)
  }

  Vue.prototype.$handleViewEvent = function ($vueEvent, options) {
    const isCustomEvent = $vueEvent._processed // 自定义事件已提前处理过
    const $event = this.$handleEvent($vueEvent)
    const cid = this._$id
    // 当自定义组件根节点触发事件时，nid 始终为 0
    const nid = isCustomEvent || ($vueEvent.currentTarget === this.$el) ? 0 : $event.options.nid
    if (typeof nid === 'undefined') {
      return console.error(`[${cid}] nid not found`)
    }

    // 移除无用属性
    delete $event._processed
    delete $event.mp
    delete $event.preventDefault
    delete $event.stopPropagation
    delete $event.options

    vd.addUIEvent(cid, nid, $event)
    // 使用 setTimeout 做批量同步
    setTimeout(() => {
      vd.sendUIEvent()
    }, 0)
  }
}
