import {
  isFn
} from 'uni-shared'

export default {
  // 取消id的定义，某些组件（canvas）内不在props内定义id
  // props: {
  //   id: {
  //     type: String,
  //     default: ''
  //   }
  // },
  mounted () {
    this._toggleListeners('subscribe', this.id) // 初始化监听
    this.$watch('id', (newId, oldId) => { // watch id
      this._toggleListeners('unsubscribe', oldId, true)
      this._toggleListeners('subscribe', newId, true)
    })
  },
  beforeDestroy () { // 销毁时移除
    this._toggleListeners('unsubscribe', this.id)
    if (this._contextId) {
      this._toggleListeners('unsubscribe', this._contextId)
    }
  },
  methods: {
    _toggleListeners (type, id, watch) {
      if (watch && !id) { // id被置空
        return
      }

      if (!isFn(this._handleSubscribe)) {
        return
      }
      // 纠正VUniVideo等组件命名为Video
      UniViewJSBridge[type](this.$page.id + '-' + this.$options.name.replace(/VUni([A-Z])/, '$1').toLowerCase() + '-' + id, this._handleSubscribe)
    },
    _getContextInfo () {
      const id = `context-${this._uid}`
      if (!this._contextId) {
        this._toggleListeners('subscribe', id)
        this._contextId = id
      }
      return {
        name: this.$options.name.replace(/VUni([A-Z])/, '$1').toLowerCase(),
        id,
        page: this.$page.id
      }
    }
  }
}
