<template>
  <uni-input v-on="$listeners">
    <div
      ref="wrapper"
      class="uni-input-wrapper"
    >
      <div
        v-show="!(composing || valueSync.length || cachedValue === '-')"
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
        v-field
        :disabled="disabled"
        :type="inputType"
        :maxlength="maxlength"
        :step="step"
        :enterkeyhint="confirmType"
        :pattern="type === 'number' ? '[0-9]*' : null"
        class="uni-input-input"
        :autocomplete="autocomplete"
        @change.stop
        @focus="_onFocus"
        @blur="_onBlur"
        @input.stop="_onInput"
        @compositionstart.stop="_onComposition"
        @compositionend.stop="_onComposition"
        @compositionupdate.stop="_onComposition"
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
        @focus="($event) => $event.target.blur()"
      >
    </div>
  </uni-input>
</template>
<script>
import {
  field
} from 'uni-mixins'
import { kebabCase } from 'uni-shared'
const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password', 'tel']
const NUMBER_TYPES = ['number', 'digit']
const AUTOCOMPLETES = ['off', 'one-time-code']
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
    },
    textContentType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
    },
    autocomplete () {
      const camelizeIndex = AUTOCOMPLETES.indexOf(this.textContentType)
      const kebabCaseIndex = AUTOCOMPLETES.indexOf(kebabCase(this.textContentType))
      const index = camelizeIndex !== -1
        ? camelizeIndex
        : kebabCaseIndex !== -1
          ? kebabCaseIndex
          : 0
      return AUTOCOMPLETES[index]
    }
  },
  watch: {
    maxlength (value) {
      const realValue = this.valueSync.slice(0, parseInt(value, 10))
      realValue !== this.valueSync && (this.valueSync = realValue)
    },
    valueSync (value) {
      if (this.type === 'number' && !(this.cachedValue === '-' && value === '')) {
        this.cachedValue = value
      }
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
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onKeyup ($event) {
      const input = $event.target
      this.$trigger('confirm', $event, {
        value: input.value
      })
      if (!this.confirmHold) {
        input.blur()
      }
    },
    _onInput ($event, force) {
      let outOfMaxlength = false

      if (this.composing && this.ignoreCompositionEvent) {
        return
      }

      if (this.inputType === 'number') {
        // type="number" 不支持 maxlength 属性，因此需要主动限制长度。
        const maxlength = parseInt(this.maxlength, 10)
        if (maxlength > 0 && $event.target.value.length > maxlength) {
          // 输入前字符长度超出范围，则不触发input，且将值还原
          // 否则截取一定长度且触发input
          if (this.cachedValue.length === maxlength) {
            this.valueSync = this.cachedValue
            outOfMaxlength = true
          } else {
            $event.target.value = $event.target.value.slice(0, maxlength)
            this.valueSync = $event.target.value
          }
        }

        // 数字类型输入错误时无法获取具体的值，自定义校验和纠正。
        this.__clearCachedValue && $event.target.removeEventListener('blur', this.__clearCachedValue)
        if ($event.target.validity && !$event.target.validity.valid) {
          if ((!this.cachedValue && $event.data === '-') || (this.cachedValue[0] === '-' && $event.inputType === 'deleteContentBackward')) {
            this.cachedValue = '-'
            const clearCachedValue = this.__clearCachedValue = () => {
              this.cachedValue = ''
            }
            $event.target.addEventListener('blur', clearCachedValue)
            return
          }
          this.cachedValue = this.valueSync = $event.target.value = this.cachedValue === '-' ? '' : this.cachedValue
          // 输入非法字符不触发 input 事件
          return
        } else {
          this.cachedValue = this.valueSync
        }
      }

      if (outOfMaxlength) return

      if (!this.ignoreCompositionEvent) this.valueSync = this.$refs.input.value

      this.$triggerInput($event, {
        value: this.valueSync
      }, force)
    },
    _onComposition ($event) {
      switch ($event.type) {
        case 'compositionstart':
          this.composing = true
          break
        case 'compositionend':
          if (this.composing) {
            this.composing = false
            // 部分输入法 compositionend 事件可能晚于 input
            this._onInput($event)
          }
          break
      }

      !this.ignoreCompositionEvent &&
        this.$trigger($event.type, $event, { data: $event.data })
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

.uni-input-input[type="search"]::-webkit-search-cancel-button,
.uni-input-input[type="search"]::-webkit-search-decoration {
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
