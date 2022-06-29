<template>
  <uni-textarea v-on="$listeners">
    <div
      ref="wrapper"
      class="uni-textarea-wrapper"
    >
      <div
        v-show="!(composing || valueSync.length)"
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
          v-for="(item, index) in valueCompute"
          :key="index"
          v-text="item.trim() ? item : '.'"
        />
        <v-uni-resize-sensor
          ref="sensor"
          @resize="_resize"
        />
      </div>
      <textarea
        v-if="!disabled || !fixColor"
        ref="textarea"
        v-model="valueSync"
        v-keyboard
        v-field
        :disabled="disabled"
        :maxlength="maxlengthNumber"
        :class="{ 'uni-textarea-textarea-fix-margin': fixMargin }"
        :style="{ 'overflow-y': autoHeight ? 'hidden' : 'auto' }"
        :enterkeyhint="confirmType"
        class="uni-textarea-textarea"
        @change.stop
        @compositionstart.stop="_onComposition"
        @compositionend.stop="_onComposition"
        @compositionupdate.stop="_onComposition"
        @input.stop="_onInput"
        @focus="_onFocus"
        @blur="_onBlur"
        @touchstart.passive="_onTouchstart"
        @keyup.enter="_onKeyUpEnter"
        @keydown.enter="_onKeyDownEnter"
      />
      <!-- fix: 禁止 readonly 状态获取焦点 -->
      <textarea
        v-if="disabled && fixColor"
        ref="textarea"
        :value="valueSync"
        tabindex="-1"
        :readonly="disabled"
        :maxlength="maxlengthNumber"
        :class="{ 'uni-textarea-textarea-fix-margin': fixMargin }"
        :style="{ 'overflow-y': autoHeight ? 'hidden' : 'auto' }"
        class="uni-textarea-textarea"
        @focus="($event) => $event.target.blur()"
      />
    </div>
  </uni-textarea>
</template>
<script>
import {
  field
} from 'uni-mixins'
const DARK_TEST_STRING = '(prefers-color-scheme: dark)'
const ConfirmTypes = ['done', 'go', 'next', 'search', 'send'] // 'return'
export default {
  name: 'Textarea',
  mixins: [field],
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
    confirmType: {
      type: String,
      default: 'return',
      validator (val) {
        return ConfirmTypes.concat('return').includes(val)
      }
    }
  },
  data () {
    return {
      valueComposition: '',
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
    valueCompute () {
      return (this.composing ? this.valueComposition : this.valueSync).split('\n')
    },
    isDone () {
      return ConfirmTypes.includes(this.confirmType)
    }
  },
  watch: {
    focus (val) {
      if (val) {
        this.focusChangeSource = 'focus'
      }
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
        this.$el.style.height = 'auto'
        this.$refs.wrapper.style.height = this.height + 'px'
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
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _onKeyDownEnter: function ($event) {
      if (this.isDone) {
        $event.preventDefault()
      }
    },
    _onKeyUpEnter: function ($event) {
      if (this.isDone) {
        this._confirm($event)
        !this.confirmHold && this.$refs.textarea.blur()
      }
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
    _onTouchstart () {
      this.focusChangeSource = 'touch'
    },
    _resize ({ height }) {
      this.height = height
    },
    _onInput ($event, force) {
      if (this.composing && this.ignoreCompositionEvent) {
        this.valueComposition = $event.target.value
        return
      }

      if (!this.ignoreCompositionEvent) this.valueSync = this.$refs.textarea.value

      this.$triggerInput($event, {
        value: this.valueSync,
        cursor: this.$refs.textarea.selectionEnd
      }, force)
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
  white-space: pre-wrap;
  word-break: break-all;
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
  min-height: inherit;
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
  white-space: inherit;
  word-break: inherit;
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
.uni-textarea-textarea:disabled {
  /* 用于重置iOS14以下禁用状态文字颜色 */
  -webkit-text-fill-color: currentcolor;
}
</style>
