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
    vd.sendUIEvent(this._$id, nid, {
      type: 'input',
      target: {
        value
      }
    })
  }

  Vue.prototype.$handleViewEvent = function ($vueEvent, options = {}) {
    // const isCustomEvent = $vueEvent._processed // 自定义事件已提前处理过
    if (options.stop) {
      $vueEvent.stopPropagation()
    }
    if (options.prevent) {
      $vueEvent.preventDefault()
    }

    const $event = this.$handleEvent($vueEvent)
    const cid = this._$id

    const currentTarget = $vueEvent.$origCurrentTarget || $vueEvent.currentTarget
    // 当自定义组件根节点触发事件时，nid 补充前缀，避免与组件内部 nid 冲突(根组件page不需要)
    const nid = ((currentTarget === this.$el && this.$options.mpType !== 'page') ? 'r-' : '') + $event.options.nid
    if (typeof nid === 'undefined') {
      return console.error(`[${cid}] nid not found`)
    }

    // 移除无用属性
    delete $event._processed
    delete $event.mp
    delete $event.preventDefault
    delete $event.stopPropagation
    delete $event.options
    delete $event.$origCurrentTarget
    // 实时发送，延迟的话，会导致 touch 类事件被合并，影响实际业务逻辑，比如 touchstart 中修改变量为 true,touchend 修改为 false
    vd.sendUIEvent(cid, nid, $event)
  }
}
