<template>
  <uni-input v-on="$listeners">
    <div
      ref="wrapper"
      class="uni-input-wrapper"
    >
      <div
        v-show="showPlaceholder"
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
        :step="_step"
        :enterkeyhint="confirmType"
        :pattern="type === 'number' ? '[0-9]*' : null"
        class="uni-input-input"
        :style="cursorColor ? { caretColor: cursorColor } : {}"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
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
        :step="_step"
        class="uni-input-input"
        :style="cursorColor ? { caretColor: cursorColor } : {}"
        @focus="($event) => $event.target.blur()"
      >
    </div>
  </uni-input>
</template>
<script>
import {
  field
} from 'uni-mixins'
import { kebabCase, once } from 'uni-shared'
const INPUT_TYPES = ['text', 'number', 'idcard', 'digit', 'password', 'tel']
const NUMBER_TYPES = ['number', 'digit']
const AUTOCOMPLETES = ['off', 'one-time-code']
const INPUT_MODES = ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']

const resolveDigitDecimalPointDeleteContentBackward = once(() => {
  if (__PLATFORM__ === 'app-plus') {
    const osVersion = plus.os.version
    return (
      plus.os.name === 'iOS' &&
      !!osVersion &&
      (parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2)
    )
  }

  if (__PLATFORM__ === 'h5') {
    const ua = navigator.userAgent
    let osVersion = ''
    const osVersionFind = ua.match(/OS\s([\w_]+)\slike/)
    if (osVersionFind) {
      osVersion = osVersionFind[1].replace(/_/g, '.')
    } else if (/Macintosh|Mac/i.test(ua) && navigator.maxTouchPoints > 0) {
      const versionMatched = ua.match(/Version\/(\S*)\b/)
      if (versionMatched) {
        osVersion = versionMatched[1]
      }
    }
    return !!osVersion && (parseInt(osVersion) >= 16 && parseFloat(osVersion) < 17.2)
  }
})
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
    },
    step: {
      type: String,
      default: '0.000000000000000001'
    },
    inputmode: {
      type: String,
      default: undefined,
      validator (value) {
        return !!~INPUT_MODES.indexOf(value)
      }
    },
    cursorColor: {
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
          type = 'text'
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
    _step () {
      // 处理部分设备中无法输入小数点的问题
      return ~NUMBER_TYPES.indexOf(this.type) ? this.step : ''
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
    },
    showPlaceholder () {
      const dotIndex = this.type === 'digit' ? this.cachedValue.indexOf('.') : -1
      return !(
        this.composing || this.valueSync.length || this.cachedValue === '-' ||
        (dotIndex !== -1 && dotIndex === this.cachedValue.length - 1)
      )
    }
  },
  watch: {
    maxlength (value) {
      const realValue = this.valueSync.slice(0, parseInt(value, 10))
      realValue !== this.valueSync && (this.valueSync = realValue)
    },
    valueSync (value) {
      if (this.type === 'number' && !(this.cachedValue === '-' && value === '')) {
        this.cachedValue = value.toString()
      }
    },
    value (value) {
      if (this.inputType === 'number' && value) {
        this.cachedValue = value.toString()
      }
    }
  },
  created () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
    // fix: 给 input 的 value 赋值后，再输入小数点时 cachedValue 没有值导致值清空
    if (this.inputType === 'number' && typeof this.value !== 'undefined' && this.value !== null) {
      this.cachedValue = this.value.toString()
    }
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
    _resolveDigitDecimalPoint ($event, force, deleteContentBackward = true) {
      // TODO 苹果智能标点：safari（webview） 上连续输入两次 . 后，在第三次输入 . 时，会触发两次 deleteContentBackward（删除） 的输入外加一次 insertText 为 …（三个点） 的输入
      if (this.cachedValue) {
        if ($event.data === '.') {
          // 当 value 以小数点结尾时或者 type 为 number 时，删除小数点
          if (this.cachedValue.slice(-1) === '.') {
            this.valueSync = $event.target.value = this.cachedValue = this.cachedValue.slice(0, -1)
            return false
          }
          if (!this.cachedValue.includes('.')) {
            this.cachedValue += '.'
            this.__clearCachedValue = () => {
              this.cachedValue = this.valueSync = $event.target.value = this.cachedValue.slice(0, -1)
              $event.target.removeEventListener('blur', this.__clearCachedValue)
            }
            $event.target.addEventListener('blur', this.__clearCachedValue)
            return false
          }
        } else if ($event.inputType === 'deleteContentBackward') {
          // ios 无法删除小数
          if (resolveDigitDecimalPointDeleteContentBackward()) {
            if (this.cachedValue.slice(-2, -1) === '.') {
              this.cachedValue = this.valueSync = $event.target.value = this.cachedValue.slice(0, -2)
              this.$triggerInput($event, {
                value: this.valueSync
              }, force)
              return false
            }
          }
        }
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
          $event.target.value = $event.target.value.slice(0, maxlength)
          this.valueSync = $event.target.value
          // 粘贴时过长的字符时，需判断和之前的value是否一致，一致则不更新input
          const preValue = (this.value !== null && this.value !== undefined)
            ? this.value.toString()
            : ''
          if (preValue === $event.target.value) {
            outOfMaxlength = true
          }
        }

        // 数字类型输入错误时无法获取具体的值，自定义校验和纠正。
        this.__clearCachedValue && $event.target.removeEventListener('blur', this.__clearCachedValue)
        if ($event.target.validity && !$event.target.validity.valid) {
          if (
            ((!this.cachedValue || !$event.target.value) && $event.data === '-') ||
            (this.cachedValue[0] === '-' && $event.inputType === 'deleteContentBackward')
          ) {
            this.cachedValue = '-'
            this.valueSync = ''
            const clearCachedValue = this.__clearCachedValue = () => {
              this.cachedValue = $event.target.value = ''
            }
            $event.target.addEventListener('blur', clearCachedValue)
            return
          }
          // 处理小数点
          const res = this._resolveDigitDecimalPoint($event, force)
          if (typeof res === 'boolean') return res

          this.cachedValue = this.valueSync = $event.target.value = this.cachedValue === '-' ? '' : this.cachedValue
          // 输入非法字符不触发 input 事件
          return
        } else {
          // 处理 Safari 在 input 框中是 `1.` 的情况下继续输入 `.` ，会再次触发 input 事件，而 Chrome 不会（但统一处理）
          const res = this._resolveDigitDecimalPoint($event, force)
          if (typeof res === 'boolean') return res

          this.cachedValue = this.valueSync
        }
      }

      if (outOfMaxlength) return

      this.valueSync = this.$refs.input.value

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
