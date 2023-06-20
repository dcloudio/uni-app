import {
  isPlainObject
} from 'uni-shared'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  created () {
    this._addListeners(this.id) // 初始化监听
    this.$watch('id', (newId, oldId) => { // watch id
      this._removeListeners(oldId, true)
      this._addListeners(newId, true)
    })
  },
  beforeDestroy () { // 销毁时移除
    this._removeListeners(this.id)
  },
  methods: {
    _addListeners (id, watch) {
      if (watch && !id) { // id被置空
        return
      }

      const {
        listeners
      } = this.$options
      if (!isPlainObject(listeners)) {
        return
      }
      Object.keys(listeners).forEach(name => {
        if (watch) { // watch id
          if (name.indexOf('@') !== 0 && name.indexOf('uni-') !== 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.on(`uni-${name}-${this.$page.id}-${id}`, this[listeners[name]])
          }
        } else {
          if (name.indexOf('@') === 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            this.$on(`uni-${name.substr(1)}`, this[listeners[name]])
          } else if (name.indexOf('uni-') === 0) { // 完全限定
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.on(name, this[listeners[name]])
          } else if (id) { // scoped
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.on(`uni-${name}-${this.$page.id}-${id}`, this[listeners[name]])
          }
        }
      })
    },
    _removeListeners (id, watch) {
      if (watch && !id) { // id之前不存在
        return
      }
      const {
        listeners
      } = this.$options
      if (!isPlainObject(listeners)) {
        return
      }
      Object.keys(listeners).forEach(name => {
        if (watch) { // watch id
          if (name.indexOf('@') !== 0 && name.indexOf('uni-') !== 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.off(`uni-${name}-${this.$page.id}-${id}`, this[listeners[name]])
          }
        } else {
          if (name.indexOf('@') === 0) {
            /* eslint-disable standard/computed-property-even-spacing */
            this.$off(`uni-${name.substr(1)}`, this[listeners[name]])
          } else if (name.indexOf('uni-') === 0) { // 完全限定
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.off(name, this[listeners[name]])
          } else if (id) { // scoped
            /* eslint-disable standard/computed-property-even-spacing */
            UniViewJSBridge.off(`uni-${name}-${this.$page.id}-${id}`, this[listeners[name]])
          }
        }
      })
    }
  }
}
