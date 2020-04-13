<template>
  <div
    :class="viewClass"
    class="uni-button"
    v-on="$listeners"
  >
    <text
      :class="textClass"
      class="uni-button-t"
    >
      <slot />
    </text>
  </div>
</template>
<script>
const BUTTON_TYPES = {
  default: 'd',
  primary: 'p',
  warn: 'w'
}
export default {
  name: 'Button',
  props: {
    hoverClass: {
      type: String,
      default: 'button-hover'
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    plain: {
      type: [Boolean, String],
      default: false
    },
    loading: {
      type: [Boolean, String],
      default: false
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 70
    },
    openType: {
      type: String,
      default: ''
    },
    formType: {
      type: String,
      default: '',
      validator: function validator (value) {
        return ~['', 'submit', 'reset'].indexOf(value)
      }
    }
  },
  computed: {
    viewClass () {
      return this._getClass('')
    },
    textClass () {
      return this._getClass('-t')
    }
  },
  methods: {
    _onClick ($event, isLabelClick) {
      if (this.disabled) {
        return
      }
      if (isLabelClick) {
        this.$el.click()
      }
      if (this.formType) {
        this.$dispatch('Form', this.formType === 'submit' ? 'uni-form-submit' : 'uni-form-reset', {
          type: this.formType
        }, this)
      }
    },
    _getClass (t) {
      let cl = 'uni-button-' + BUTTON_TYPES[this.type] + t
      if (this.disabled) {
        cl += '-d'
      }
      if (this.plain) {
        cl += '-plain'
      }
      if (t === '-t' && this.size === 'mini') {
        cl += ' uni-button-mini'
      }
      return cl
    },
    _getHoverClass (t) {
      if (this.disabled) {
        return ''
      }
      let cl = 'uni-button-' + BUTTON_TYPES[this.type] + t + '-hover'
      if (this.plain) {
        cl += '-plain'
      }
      return cl
    }
  }
}
</script>
<style>
.uni-button {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 30rpx;
  padding-right: 30rpx;
  overflow: hidden;
  color: #000000;
  background-color: #f8f8f8;
  border-radius: 5rpx;
  border-style: solid;
  border-width: 1px;
  border-color: #dbdbdb;
}
.uni-button-t {
  color: #000000;
  font-size: 32rpx;
  text-decoration: none;
  line-height: 88rpx;
}
.uni-button-d {
  background-color: #f8f8f8;
}
.uni-button-p {
  background-color: #007aff;
  border-color: #0062cc;
}
.uni-button-w {
  background-color: #e64340;
  border-color: #b83633;
}
.uni-button-d-t {
  color: #000000;
}
.uni-button-p-t {
  color: #ffffff;
}
.uni-button-w-t {
  color: #ffffff;
}
.uni-button-d-d {
  background-color: #f7f7f7;
}
.uni-button-p-d {
  background-color: #63acfc;
  border-color: #4f8aca;
}
.uni-button-w-d {
  background-color: #ec8b89;
  border-color: #bd6f6e;
}
.uni-button-d-t-d {
  color: #cccccc;
}
.uni-button-p-t-d {
  color: rgba(255,255,255,0.6);
}
.uni-button-w-t-d {
  color: rgba(255,255,255,0.6);
}
.uni-button-d-plain {
  border-color: #353535;
  background-color: rgba(0,0,0,0);
}
.uni-button-p-plain {
  border-color: #007aff;
  background-color: rgba(0,0,0,0);
}
.uni-button-w-plain {
  border-color: #e64340;
  background-color: rgba(0,0,0,0);
}
.uni-button-d-t-plain {
  color: #353535;
}
.uni-button-p-t-plain {
  color: #007aff;
}
.uni-button-w-t-plain {
  color: #e64340;
}
.uni-button-d-d-plain {
  border-color: #c6c6c6;
  background-color: rgba(0,0,0,0);
}
.uni-button-p-d-plain {
  border-color: #c6c6c6;
  background-color: rgba(0,0,0,0);
}
.uni-button-w-d-plain {
  border-color: #c6c6c6;
  background-color: rgba(0,0,0,0);
}
.uni-button-d-t-d-plain {
  color: rgba(0,0,0,0.2);
}
.uni-button-p-t-d-plain {
  color: rgba(0,0,0,0.2);
}
.uni-button-w-t-d-plain {
  color: rgba(0,0,0,0.2);
}
.uni-button-mini {
  line-height: 50rpx;
  font-size: 28rpx;
  padding-top: 0;
  padding-right: 30rpx;
  padding-bottom: 0;
  padding-left: 30rpx;
}
.uni-button-loading {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
.uni-button-d-loading {
  color: rgba(255,255,255,0.6);
  background-color: rgba(0,0,0,0);
}
.uni-button-p-loading {
  color: rgba(255,255,255,0.6);
  background-color: rgba(0,0,0,0);
}
.uni-button-w-loading {
  color: rgba(255,255,255,0.6);
  background-color: #ce3c39;
}
.uni-button-d-loading-plain {
  color: #353535;
}
.uni-button-p-loading-plain {
  color: #007aff;
  background-color: #0062cc;
}
.uni-button-w-loading-plain {
  color: #e64340;
  background-color: rgba(0,0,0,0);
}
.uni-button-d-hover {
  opacity: 0.8;
  background-color: #dedede;
}
.uni-button-p-hover {
  opacity: 0.8;
  background-color: #0062cc;
}
.uni-button-w-hover {
  opacity: 0.8;
  backgroundColor: #ce3c39;
}
.uni-button-d-t-hover {
  color: rgba(0,0,0,0.6);
}
.uni-button-p-t-hover {
  color: rgba(255,255,255,0.6);
}
.uni-button-w-t-hover {
  color: rgba(255,255,255,0.6);
}
.uni-button-d-hover-plain {
  color: rgba(53,53,53,0.6);
  border-color: rgba(53,53,53,0.6);
  background-color: rgba(0,0,0,0);
}
.uni-button-p-hover-plain {
  color: rgba(26,173,25,0.6);
  border-color: rgba(0,122,255,0.6);
  background-color: rgba(0,0,0,0);
}
.uni-button-w-hover-plain {
  color: rgba(230,67,64,0.6);
  border-color: rgba(230,67,64,0.6);
  background-color: rgba(0,0,0,0);
}
</style>
