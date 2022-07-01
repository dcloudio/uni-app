<template>
  <uni-navigator
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering ? hoverClass : '']"
    @touchstart="_hoverTouchStart"
    @touchend="_hoverTouchEnd"
    @touchcancel="_hoverTouchCancel"
    @mousedown="_hoverMousedown"
    @mouseup="_hoverMouseup"
    @click="_onClick"
    v-on="$listeners"
  >
    <slot />
  </uni-navigator>
  <uni-navigator
    v-else
    @click="_onClick"
    v-on="$listeners"
  >
    <slot />
  </uni-navigator>
</template>
<script>
import {
  hover
} from 'uni-mixins'

const OPEN_TYPES = [
  'navigate',
  'redirect',
  'switchTab',
  'reLaunch',
  'navigateBack'
]
const ANIMATION_TYPE_IN = [
  'slide-in-right',
  'slide-in-left',
  'slide-in-top',
  'slide-in-bottom',
  'fade-in',
  'zoom-out',
  'zoom-fade-out',
  'pop-in',
  'none'
]
const ANIMATION_TYPE_OUT = [
  'slide-out-right',
  'slide-out-left',
  'slide-out-top',
  'slide-out-bottom',
  'fade-out',
  'zoom-in',
  'zoom-fade-in',
  'pop-out',
  'none'
]

export default {
  name: 'Navigator',
  mixins: [hover],
  props: {
    hoverClass: {
      type: String,
      default: 'navigator-hover'
    },
    url: {
      type: String,
      default: ''
    },
    openType: {
      type: String,
      default: 'navigate',
      validator (value) {
        return ~OPEN_TYPES.indexOf(value)
      }
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50
    },
    hoverStayTime: {
      type: [Number, String],
      default: 600
    },
    exists: {
      type: String,
      default: ''
    },
    animationType: {
      type: String,
      validator (value) {
        return !value || ~ANIMATION_TYPE_IN.concat(ANIMATION_TYPE_OUT).indexOf(value)
      },
      default: ''
    },
    animationDuration: {
      type: [String, Number],
      default: 300
    }
  },

  methods: {
    _onClick ($event) {
      if (this.openType !== 'navigateBack' && !this.url) {
        console.error(
          '<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab')
        return
      }

      const animationDuration = parseInt(this.animationDuration)

      switch (this.openType) {
        case 'navigate':
          uni.navigateTo({
            url: this.url,
            animationType: this.animationType || 'pop-in',
            animationDuration
          })
          break
        case 'redirect':
          uni.redirectTo({
            url: this.url,
            exists: this.exists
          })
          break
        case 'switchTab':
          uni.switchTab({
            url: this.url
          })
          break
        case 'reLaunch':
          uni.reLaunch({
            url: this.url
          })
          break
        case 'navigateBack':
          uni.navigateBack({
            delta: this.delta,
            animationType: this.animationType || 'pop-out',
            animationDuration
          })
          break
        default:
          break
      }
    }
  }
}
</script>
<style>
  uni-navigator {
    height: auto;
    width: auto;
    display: block;
    cursor: pointer;
  }

  uni-navigator[hidden] {
    display: none;
  }

  .navigator-hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
  }
</style>
