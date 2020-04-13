<script>
export default {
  name: 'PickerView',
  props: {
    value: {
      type: Array,
      default () {
        return []
      },
      validator: function (val) {
        return Array.isArray(val) && val.filter(val => typeof val === 'number').length === val.length
      }
    },
    indicatorStyle: {
      type: String,
      default: ''
    },
    indicatorClass: {
      type: String,
      default: ''
    },
    maskStyle: {
      type: String,
      default: ''
    },
    maskClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      valueSync: [...this.value],
      height: 34,
      items: [],
      changeSource: ''
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal || val.length !== oldVal.length || val.findIndex((item, index) => item !== oldVal[index]) >= 0) {
        this.valueSync.length = val.length
        val.forEach((val, index) => {
          if (val !== this.valueSync[index]) {
            this.$set(this.valueSync, index, val)
          }
        })
      }
    },
    valueSync: {
      deep: true,
      handler (val, oldVal) {
        if (this.changeSource === '') {
          this._valueChanged(val)
        } else {
          this.changeSource = ''
          // 避免外部直接对此值进行修改
          const value = val.map(val => val)
          this.$emit('update:value', value)
          this.$trigger('change', {}, {
            value
          })
        }
      }
    }
  },
  methods: {
    getItemIndex (vnode) {
      return this.items.indexOf(vnode)
    },
    getItemValue (vm) {
      return this.valueSync[this.getItemIndex(vm.$vnode)] || 0
    },
    setItemValue (vm, val) {
      var index = this.getItemIndex(vm.$vnode)
      var oldVal = this.valueSync[index]
      if (oldVal !== val) {
        this.changeSource = 'touch'
        this.$set(this.valueSync, index, val)
      }
    },
    _valueChanged (val) {
      this.items.forEach(function (item, index) {
        item.componentInstance.setCurrent(val[index] || 0)
      })
    },
    _resize ({
      height
    }) {
      this.height = height
    }
  },
  render (createElement) {
    var items = []
    if (this.$slots.default) {
      this.$slots.default.forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'v-uni-picker-view-column') {
          items.push(vnode)
        }
      })
    }
    this.items = items
    return createElement(
      'uni-picker-view',
      {
        on: this.$listeners
      }, [createElement('v-uni-resize-sensor', {
        attrs: {
          initial: true
        },
        on: {
          resize: this._resize
        }
      }),
      createElement('div', {
        ref: 'wrapper',
        class: 'uni-picker-view-wrapper'
      }, items)
      ])
  }
}
</script>
<style>
uni-picker-view {
  display: block;
}

uni-picker-view .uni-picker-view-wrapper {
  display: flex;
  position: relative;
  overflow: hidden;
  height: 100%;
}

uni-picker-view[hidden] {
  display: none;
}
</style>
