<template>
  <uni-input
    @change.stop
    v-on="$listeners"
  >
    <div
      ref="wrapper"
      class="uni-input-wrapper"
    >
      <div
        v-show="!(composing || valueSync.length)"
        ref="placeholder"
        :style="placeholderStyle"
        :class="placeholderClass"
        class="uni-input-placeholder"
        v-text="placeholder"
      />
      <input
        v-if="!disabled || !fixColor"
        ref="input"
        v-model="valueSync"
        v-keyboard
        :disabled="disabled"
        :type="inputType"
        :maxlength="maxlength"
        :step="step"
        :enterkeyhint="confirmType"
        class="uni-input-input"
        autocomplete="off"
        @focus="_onFocus"
        @blur="_onBlur"
        @input.stop="_onInput"
        @compositionstart="_onComposition"
        @compositionend="_onComposition"
        @keyup.enter.stop="_onKeyup"
      >
      <!-- fix: 禁止 readonly 状态获取焦点 -->
      <input
        v-if="disabled && fixColor"
        ref="input"
        :value="valueSync"
        tabindex="-1"
        :readonly="disabled"
        :type="inputType"
        :maxlength="maxlength"
        :step="step"
        class="uni-input-input"
        @focus="$event=>$event.target.blur()"
      >
    </div>
  </uni-input>
</template>
<script>
import {
  field
} from 'uni-mixins'
const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password']
const NUMBER_TYPES = ['number', 'digit']
export default {
  name: 'Input',
  mixins: [field],
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    password: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    placeholderStyle: {
      type: String,
      default: ''
    },
    placeholderClass: {
      type: String,
      default: 'input-placeholder'
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: 'done'
    }
  },
  data () {
    return {
      composing: false,
      wrapperHeight: 0,
      cachedValue: '',
      // Safari 14 以上修正禁用状态颜色
      fixColor: String(navigator.vendor).indexOf('Apple') === 0 && CSS.supports('image-orientation:from-image')
    }
  },
  computed: {
    inputType: function () {
      let type = ''
      switch (this.type) {
        case 'text':
          this.confirmType === 'search' && (type = 'search')
          break
        case 'idcard':
          // TODO 可能要根据不同平台进行区分处理
          type = 'text'
          break
        case 'digit':
          type = 'number'
          break
        default:
          type = ~INPUT_TYPES.indexOf(this.type) ? this.type : 'text'
          break
      }
      return this.password ? 'password' : type
    },
    step () {
      // 处理部分设备中无法输入小数点的问题
      return ~NUMBER_TYPES.indexOf(this.type) ? '0.000000000000000001' : ''
    }
  },
  watch: {
    maxlength (value) {
      const realValue = this.valueSync.slice(0, parseInt(value, 10))
      realValue !== this.valueSync && (this.valueSync = realValue)
    }
  },
  created () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
  },
  mounted () {
    if (this.confirmType === 'search') {
      const formElem = document.createElement('form')
      formElem.action = ''
      formElem.onsubmit = function () {
        return false
      }
      formElem.className = 'uni-input-form'
      formElem.appendChild(this.$refs.input)
      this.$refs.wrapper.appendChild(formElem)
    }

    let $vm = this
    while ($vm) {
      const scopeId = $vm.$options._scopeId
      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, '')
      }
      $vm = $vm.$parent
    }

    this._initField('input')
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onKeyup ($event) {
      this.$trigger('confirm', $event, {
        value: $event.target.value
      })
    },
    _onInput ($event) {
      if (this.composing) {
        return
      }

      // 处理部分输入法可以输入其它字符的情况
      if (~NUMBER_TYPES.indexOf(this.type)) {
        if (this.$refs.input.validity && !this.$refs.input.validity.valid) {
          $event.target.value = this.cachedValue
          this.valueSync = $event.target.value
          // 输入非法字符不触发 input 事件
          return
        } else {
          this.cachedValue = this.valueSync
        }
      }

      // type="number" 不支持 maxlength 属性，因此需要主动限制长度。
      if (this.inputType === 'number') {
        const maxlength = parseInt(this.maxlength, 10)
        if (maxlength > 0 && $event.target.value.length > maxlength) {
          $event.target.value = $event.target.value.slice(0, maxlength)
          this.valueSync = $event.target.value
          // 字符长度超出范围不触发 input 事件
          return
        }
      }
      this.$triggerInput($event, {
        value: this.valueSync
      })
    },
    _onFocus ($event) {
      this.$trigger('focus', $event, {
        value: $event.target.value
      })
    },
    _onBlur ($event) {
      this.$trigger('blur', $event, {
        value: $event.target.value
      })
    },
    _onComposition ($event) {
      if ($event.type === 'compositionstart') {
        this.composing = true
      } else {
        this.composing = false
        // 部分输入法 compositionend 事件可能晚于 input
        this._onInput($event)
      }
    },
    _resetFormData () {
      this.valueSync = ''
    },
    _getFormData () {
      return this.name ? {
        value: this.valueSync,
        key: this.name
      } : {}
    }
  }
}
</script>
<style>
uni-input {
  display: block;
  font-size: 16px;
  line-height: 1.4em;
  height: 1.4em;
  min-height: 1.4em;
  overflow: hidden;
}

uni-input[hidden] {
  display: none;
}

.uni-input-wrapper,
.uni-input-placeholder,
.uni-input-form,
.uni-input-input {
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: inherit;
}

.uni-input-wrapper,
.uni-input-form {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}

.uni-input-placeholder,
.uni-input-input {
  width: 100%;
}

.uni-input-placeholder {
  position: absolute;
  top: auto !important;
  left: 0;
  color: gray;
  overflow: hidden;
  text-overflow: clip;
  white-space: pre;
  word-break: keep-all;
  pointer-events: none;
  line-height: inherit;
}

.uni-input-input {
  position: relative;
  display: block;
  height: 100%;
  background: none;
  color: inherit;
  opacity: 1;
  font: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-align: inherit;
  text-indent: inherit;
  text-transform: inherit;
  text-shadow: inherit;
}

.uni-input-input[type="search"]::-webkit-search-cancel-button {
  display: none;
}

.uni-input-input::-webkit-outer-spin-button,
.uni-input-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.uni-input-input[type="number"] {
  -moz-appearance: textfield;
}

.uni-input-input:disabled {
  /* 用于重置iOS14以下禁用状态文字颜色 */
  -webkit-text-fill-color: currentcolor;
}
</style>
