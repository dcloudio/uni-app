<template>
  <uni-textarea
    @change.stop
    v-on="$listeners">
    <div class="uni-textarea-wrapper">
      <div
        v-show="!(composition||valueSync.length)"
        ref="placeholder"
        :style="placeholderStyle"
        :class="placeholderClass"
        class="uni-textarea-placeholder"
      >{{ placeholder }}</div>
      <div
        ref="line"
        class="uni-textarea-line">&nbsp;</div>
      <div class="uni-textarea-compute">
        <div
          v-for="(item,index) in valueCompute"
          :key="index">{{ item.trim() ? item : '.' }}</div>
        <v-uni-resize-sensor
          ref="sensor"
          @resize="_resize" />
      </div>
      <textarea
        ref="textarea"
        v-model="valueSync"
        :disabled="disabled"
        :maxlength="maxlengthNumber"
        :autofocus="autoFocus"
        :class="{'uni-textarea-textarea-fix-margin': fixMargin}"
        :style="{'overflow-y': autoHeight? 'hidden':'auto'}"
        class="uni-textarea-textarea"
        @compositionstart="_compositionstart"
        @compositionend="_compositionend"
        @input.stop="_input"
        @focus="_focus"
        @blur="_blur"
        @touchstart.passive="_touchstart"
      />
    </div>
  </uni-textarea>
</template>
<script>
import {
  emitter,
  keyboard
} from 'uni-mixins'
const DARK_TEST_STRING = '(prefers-color-scheme: dark)'
export default {
  name: 'Textarea',
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
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    placeholderClass: {
      type: String,
      default: 'textarea-placeholder'
    },
    placeholderStyle: {
      type: String,
      default: ''
    },
    autoHeight: {
      type: [Boolean, String],
      default: false
    },
    cursor: {
      type: [Number, String],
      default: -1
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    }
  },
  data () {
    return {
      valueSync: String(this.value),
      valueComposition: '',
      composition: false,
      focusSync: this.focus,
      height: 0,
      focusChangeSource: '',
      // iOS 13 以下版本需要修正边距
      fixMargin: String(navigator.platform).indexOf('iP') === 0 && String(navigator.vendor).indexOf('Apple') === 0 && window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING
    }
  },
  computed: {
    maxlengthNumber () {
      var maxlength = Number(this.maxlength)
      return isNaN(maxlength) ? 140 : maxlength
    },
    cursorNumber () {
      var cursor = Number(this.cursor)
      return isNaN(cursor) ? -1 : cursor
    },
    selectionStartNumber () {
      var selectionStart = Number(this.selectionStart)
      return isNaN(selectionStart) ? -1 : selectionStart
    },
    selectionEndNumber () {
      var selectionEnd = Number(this.selectionEnd)
      return isNaN(selectionEnd) ? -1 : selectionEnd
    },
    valueCompute () {
      return (this.composition ? this.valueComposition : this.valueSync).split('\n')
    }
  },
  watch: {
    value (val) {
      this.valueSync = String(val)
    },
    valueSync (val) {
      if (val !== this._oldValue) {
        this._oldValue = val
        this.$trigger('input', {}, {
          value: val,
          cursor: this.$refs.textarea.selectionEnd
        })
        this.$emit('update:value', val)
      }
    },
    focus (val) {
      if (val) {
        this.focusChangeSource = 'focus'
        if (this.$refs.textarea) {
          this.$refs.textarea.focus()
        }
      } else {
        if (this.$refs.textarea) {
          this.$refs.textarea.blur()
        }
      }
    },
    focusSync (val) {
      this.$emit('update:focus', val)
      this._checkSelection()
      this._checkCursor()
    },
    cursorNumber () {
      this._checkCursor()
    },
    selectionStartNumber () {
      this._checkSelection()
    },
    selectionEndNumber () {
      this._checkSelection()
    },
    height (height) {
      let lineHeight = parseFloat(getComputedStyle(this.$el).lineHeight)
      if (isNaN(lineHeight)) {
        lineHeight = this.$refs.line.offsetHeight
      }
      var lineCount = Math.round(height / lineHeight)
      this.$trigger('linechange', {}, {
        height,
        heightRpx: 750 / window.innerWidth * height,
        lineCount
      })
      if (this.autoHeight) {
        this.$el.style.height = this.height + 'px'
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
    this._oldValue = this.$refs.textarea.value = this.valueSync
    this._resize({
      height: this.$refs.sensor.$el.offsetHeight
    })

    let $vm = this
    while ($vm) {
      const scopeId = $vm.$options._scopeId
      if (scopeId) {
        this.$refs.placeholder.setAttribute(scopeId, '')
      }
      $vm = $vm.$parent
    }

    this.initKeyboard(this.$refs.textarea)
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _focus: function ($event) {
      this.focusSync = true
      this.$trigger('focus', $event, {
        value: this.valueSync
      })
    },
    _checkSelection () {
      if (this.focusSync && (!this.focusChangeSource) && this.selectionStartNumber > -1 && this.selectionEndNumber > -1) {
        this.$refs.textarea.selectionStart = this.selectionStartNumber
        this.$refs.textarea.selectionEnd = this.selectionEndNumber
      }
    },
    _checkCursor () {
      if (this.focusSync && (this.focusChangeSource === 'focus' || ((!this.focusChangeSource) && this.selectionStartNumber < 0 && this.selectionEndNumber < 0)) && this.cursorNumber > -1) {
        this.$refs.textarea.selectionEnd = this.$refs.textarea.selectionStart = this.cursorNumber
      }
    },
    _blur: function ($event) {
      this.focusSync = false
      this.$trigger('blur', $event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      })
    },
    _compositionstart ($event) {
      this.composition = true
    },
    _compositionend ($event) {
      this.composition = false
    },
    // 暂无完成按钮，此功能未实现
    _confirm ($event) {
      this.$trigger('confirm', $event, {
        value: this.valueSync
      })
    },
    _linechange ($event) {
      this.$trigger('linechange', $event, {
        value: this.valueSync
      })
    },
    _touchstart () {
      this.focusChangeSource = 'touch'
    },
    _resize ({ height }) {
      this.height = height
    },
    _input ($event) {
      if (this.composition) {
        this.valueComposition = $event.target.value
      }
    },
    _getFormData () {
      return {
        value: this.valueSync,
        key: this.name
      }
    },
    _resetFormData () {
      this.valueSync = ''
    }
  }
}
</script>

<style>
uni-textarea {
  width: 300px;
  height: 150px;
  display: block;
  position: relative;
  font-size: 16px;
  line-height: normal;
}
uni-textarea[hidden] {
  display: none;
}
.uni-textarea-wrapper,
.uni-textarea-placeholder,
.uni-textarea-line,
.uni-textarea-compute,
.uni-textarea-textarea {
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: inherit;
}
.uni-textarea-wrapper {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}
.uni-textarea-placeholder,
.uni-textarea-line,
.uni-textarea-compute,
.uni-textarea-textarea {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
.uni-textarea-placeholder {
  color: grey;
  overflow: hidden;
}
.uni-textarea-line,
.uni-textarea-compute {
  visibility: hidden;
  height: auto;
}
.uni-textarea-line {
  width: 1em;
}
.uni-textarea-textarea {
  resize: none;
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
/* 用于解决 iOS textarea 内部默认边距 */
.uni-textarea-textarea-fix-margin {
  width: auto;
  right: 0;
  margin: 0 -3px;
}
</style>
