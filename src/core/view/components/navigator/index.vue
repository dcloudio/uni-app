<template>
  <uni-navigator
    v-if="hoverClass && hoverClass !== 'none'"
    :class="[hovering ? hoverClass : '']"
    @touchstart="_hoverTouchStart"
    @touchend="_hoverTouchEnd"
    @touchcancel="_hoverTouchCancel"
    @click="_onClick"
    v-on="$listeners">
    <slot />
  </uni-navigator>
  <uni-navigator
    v-else
    @click="_onClick"
    v-on="$listeners">
    <slot />
  </uni-navigator>
</template>
<script>
import {
  hover
} from 'uni-mixins'

const OPEN_TYPES = ['navigate', 'redirect', 'switchTab', 'reLaunch', 'navigateBack']

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
      type: Number,
      default: 20
    },
    hoverStayTime: {
      type: Number,
      default: 600
    }
  },

  methods: {
    _onClick ($event) {
      if (!this.url) {
        console.error(`<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab`)
        return
      }

      switch (this.openType) {
        case 'navigate':
          uni.navigateTo({
            url: this.url
          })
          break
        case 'redirect':
          uni.redirectTo({
            url: this.url
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
            url: this.delta
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
  .navigator-hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
  }

  uni-navigator {
    height: auto;
    width: auto;
    display: block;
  }

  uni-navigator[hidden] {
    display: none;
  }
</style>
