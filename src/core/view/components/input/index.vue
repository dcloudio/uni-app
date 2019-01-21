<template>
  <uni-input v-on="$listeners">
    <div
      ref="wrapper"
      :disabled="disabled">
      <input
        ref="input"
        v-model="inputValue"
        :disabled="disabled"
        :type="inputType"
        :maxlength="maxlength"
        :step="step"
        @focus="_onFocus"
        @blur="_onBlur"
        @input.stop="_onInput"
        @compositionstart="_onComposition"
        @compositionend="_onComposition"
        @keyup.stop="_onKeyup">
      <div
        v-show="!(composing || inputValue.length)"
        ref="placeholder"
        :style="placeholderStyle"
        :class="placeholderClass"
        class="input-placeholder">{{ placeholder }}</div>
    </div>
    <v-uni-resize-sensor
      ref="sensor"
      @resize="_resize" />
  </uni-input>
</template>
<script>
import {
  emitter
} from 'uni-mixins'
const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password']
const NUMBER_TYPES = ['number', 'digit']
let isRendered = false
export default {
  name: 'Input',
  mixins: [emitter],
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
      const realValue = this.realValue.slice(0, parseInt(value, 10))
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
    this._initInputStyle()

    if (this.confirmType === 'search') {
      var formElem = document.createElement('form')
      formElem.action = ''
      formElem.onsubmit = function () {
        return false
      }
      formElem.appendChild(this.$refs.input)
      this.$refs.wrapper.appendChild(formElem)
    }

    this.focus && this._focusInput()
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _resize () {
      if (!isRendered) {
        this._initInputStyle()
      }
    },
    _initInputStyle () {
      const wrapper = this.$refs.wrapper
      const computedStyle = window.getComputedStyle(wrapper)
      const rectStyle = wrapper.getBoundingClientRect()
      const inputElem = this.$refs.input
      const placeholderElem = this.$refs.placeholder

      // 获取到的高度为 0 则认为组件未渲染，通常是使用 v-show 时会出现此情况。
      if (!rectStyle.height) {
        return
      } else {
        isRendered = true
      }
      // 渲染之后进行计算，设置实际的高度等样式。
      const realHeight = rectStyle.height - (parseFloat(computedStyle.borderTopWidth, 10) + parseFloat(computedStyle.borderBottomWidth,
        10))
      if (realHeight !== this.wrapperHeight) {
        inputElem.style.height = `${realHeight}px`
        inputElem.style.lineHeight = `${realHeight}px`
        this.wrapperHeight = realHeight
      }
      // inputElem.style.color = computedStyle.color

      placeholderElem.style.height = `${realHeight}px`
      placeholderElem.style.lineHeight = `${realHeight}px`
    },
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
		height: 1.4rem;
		text-overflow: clip;
		overflow: hidden;
		white-space: nowrap;
		font-family: UICTFontTextStyleBody;
		min-height: 1.4rem;
	}

	uni-input input {
		position: relative;
		min-height: 1.4rem;
		border: none;
		height: inherit;
		width: 100%;
		font-size: inherit;
		font-weight: inherit;
		font-family: UICTFontTextStyleBody;
		color: inherit;
		background: transparent;
		display: inherit;
		padding: 0;
		margin: 0;
		outline: none;
		vertical-align: middle;
		text-align: inherit;
		overflow: inherit;
		white-space: inherit;
		text-overflow: inherit;
		-webkit-tap-highlight-color: transparent;
		z-index: 2;
		opacity: inherit;
	}

	uni-input[hidden] {
		display: none;
	}

	uni-input div {
		position: relative;
		min-height: 1.4rem;
		text-overflow: inherit;
		border: none;
		height: inherit;
		width: inherit;
		font-size: inherit;
		font-weight: inherit;
		font-family: UICTFontTextStyleBody;
		color: inherit;
		background: inherit;
		padding: 0;
		margin: 0;
		outline: none;
		text-align: inherit;
		-webkit-tap-highlight-color: transparent;
	}

	uni-input div[type=password] div {
		color: black;
	}

	uni-input div div {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		line-height: 100%;
		height: inherit;
		min-height: 1.4rem;
		white-space: pre;
		text-align: inherit;
		overflow: hidden;
		vertical-align: middle;
		z-index: 1;
	}

	uni-input ul {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 999999;
		padding: 0;
		background-color: white;
		border: 0.5px solid #cccccc;
		max-height: 204px;
		min-height: 51px;
		overflow: auto;
	}

	uni-input ul li {
		display: block;
		padding: 10px;
		position: relative;
		padding: 10px 0;
		border-bottom: 0.5px solid #cccccc;
		margin: 0 15px;
	}

	uni-input ul li:last-child {
		border-bottom: none;
	}

	uni-input ul li .title {
		font-weight: bold;
		font-size: 18px;
		margin-right: 50px;
	}

	uni-input ul li .content {
		font-size: 12px;
		color: #cccccc;
		margin-right: 50px;
	}

	uni-input ul li .del {
		position: absolute;
		width: 50px;
		height: 50px;
		line-height: 50px;
		top: 50%;
		right: 0;
		margin-top: -25px;
		text-align: center;
	}

	.input-placeholder {
		color: gray;
		height: inherit;
		line-height: inherit;
	}

	input[type="search"]::-webkit-search-cancel-button {
		display: none;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}
</style>
