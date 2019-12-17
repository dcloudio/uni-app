import {
  initState
} from './state/index'

import {
  initMethods
} from './methods'

import {
  initRelations,
  handleRelations
} from './relations'

import {
  handleObservers
} from './observers'

export default {
  beforeCreate () {
    // 取消 development 时的 Proxy,避免小程序组件模板中使用尚未定义的属性告警
    this._renderProxy = this
  },
  created () { // properties 中可能会访问 methods,故需要在 created 中初始化
    initState(this)
    initMethods(this)
    initRelations(this)
  },
  mounted () {
    handleObservers(this)
  },
  destroyed () {
    handleRelations(this, 'unlinked')
  }
}
