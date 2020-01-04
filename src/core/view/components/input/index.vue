<template>
  <uni-input
    @change.stop
    v-on="$listeners">
    <div
      ref="wrapper"
      class="uni-input-wrapper">
      <div
        v-show="!(composing || inputValue.length)"
        ref="placeholder"
        :style="placeholderStyle"
        :class="placeholderClass"
        class="uni-input-placeholder"
      >{{ placeholder }}</div>
      <input
        ref="input"
        v-model="inputValue"
        :disabled="disabled"
        :type="inputType"
        :maxlength="maxlength"
        :step="step"
        class="uni-input-input"
        autocomplete="off"
        @focus="_onFocus"
        @blur="_onBlur"
        @input.stop="_onInput"
        @compositionstart="_onComposition"
        @compositionend="_onComposition"
        @keyup.stop="_onKeyup"
      >
    </div>
  </uni-input>
</template>
<script>
import {
  emitter,
  keyboard
} from 'uni-mixins'
const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password']
const NUMBER_TYPES = ['number', 'digit']
export default {
  name: 'Input',
  mixins: [emitter, keyboard],
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
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
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    confirmType: {
      type: String,
      default: 'done'
    }
  },
  data () {
    return {
      inputValue: this.value + '',
      composing: false,
      wrapperHeight: 0,
      cachedValue: ''
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
    focus (value) {
      value && this._focusInput()
    },
    value (value) {
      this.inputValue = value + ''
    },
    inputValue (value) {
      this.$emit('update:value', value)
    },
    maxlength (value) {
      const realValue = this.inputValue.slice(0, parseInt(value, 10))
      realValue !== this.inputValue && (this.inputValue = realValue)
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

    this.initKeyboard(this.$refs.input)

    this.focus && this._focusInput()
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onKeyup ($event) {
      if ($event.keyCode === 13) {
        this.$trigger('confirm', $event, {
          value: $event.target.value
        })
      }
    },
    _onInput ($event) {
      if (this.composing) {
        return
      }

      // 处理部分输入法可以输入其它字符的情况
      if (~NUMBER_TYPES.indexOf(this.type)) {
        if (this.$refs.input.validity && !this.$refs.input.validity.valid) {
          $event.target.value = this.cachedValue
          this.inputValue = $event.target.value
          // 输入非法字符不触发 input 事件
          return
        } else {
          this.cachedValue = this.inputValue
        }
      }

      // type="number" 不支持 maxlength 属性，因此需要主动限制长度。
      if (this.inputType === 'number') {
        const maxlength = parseInt(this.maxlength, 10)
        if (maxlength > 0 && $event.target.value.length > maxlength) {
          $event.target.value = $event.target.value.slice(0, maxlength)
          this.inputValue = $event.target.value
          // 字符长度超出范围不触发 input 事件
          return
        }
      }

      this.$trigger('input', $event, {
        value: this.inputValue
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
    _focusInput () {
      setTimeout(() => {
        this.$refs.input.focus()
      }, 350)
    },
    _blurInput () {
      setTimeout(() => {
        this.$refs.input.blur()
      }, 350)
    },
    _onComposition ($event) {
      if ($event.type === 'compositionstart') {
        this.composing = true
      } else {
        this.composing = false
      }
    },
    _resetFormData () {
      this.inputValue = ''
    },
    _getFormData () {
      return this.name ? {
        value: this.inputValue,
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
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}

.uni-input-placeholder,
.uni-input-input{
  width: 100%;
}

.uni-input-placeholder {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: gray;
  overflow: hidden;
  text-overflow: clip;
  white-space: pre;
  word-break: keep-all;
  pointer-events: none;
}

.uni-input-input {
  display: block;
  height: 100%;
  background: none;
  color: inherit;
  opacity: 1;
  -webkit-text-fill-color: currentcolor;
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
</style>
