<template>
  <uni-textarea
    @change.stop
    v-bind="$attrs"
  >
    <div class="uni-textarea-wrapper">
      <div
        v-show="!(composition||valueSync.length)"
        ref="placeholder"
        :style="placeholderStyle"
        :class="placeholderClass"
        class="uni-textarea-placeholder"
        v-text="placeholder"
      />
      <div
        ref="line"
        class="uni-textarea-line"
        v-text="' '"
      />
      <div class="uni-textarea-compute">
        <div
          v-for="(item,index) in valueCompute"
          :key="index"
          v-text="item.trim() ? item : '.'"
        />
        <v-uni-resize-sensor
          ref="sensor"
          @resize="_resize"
        />
      </div>
      <textarea
        ref="textarea"
        v-model="valueSync"
        :disabled="disabled"
        :maxlength="maxlengthNumber"
        :autofocus="autoFocus || focus"
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
  baseInput
} from '../../mixins'
const DARK_TEST_STRING = '(prefers-color-scheme: dark)'
export default {
  name: 'Textarea',
  mixins: [baseInput],
  props: {
    name: {
      type: String,
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
    // this._resize({
    //   height: this.$refs.sensor.$el.offsetHeight
    // })

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
        return
      }
      this.$triggerInput($event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      })
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