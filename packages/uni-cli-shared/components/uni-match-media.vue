<template>
  <view
    v-show="matches"
  > 
    <slot />
  </view>
</template>

<script>
export default {
  name: 'UniMatchMedia',
  props: {
    width: {
      type: [Number, String],
      default: ''
    },
    minWidth: {
      type: [Number, String],
      default: ''
    },
    maxWidth: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    minHeight: {
      type: [Number, String],
      default: ''
    },
    maxHeight: {
      type: [Number, String],
      default: ''
    },
    orientation: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      matches: false
    }
  },

  mounted() {
    const mediaQ = uni.createMediaQueryObserver()
    mediaQ.observe({
        width: this.width,
        maxWidth: this.maxWidth,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        orientation: this.orientation
      }, matches => {
        this.matches = matches
      })
  },

}
</script>

<style>
  view {
    display: block;
  }

  view[hidden] {
    display: none;
  }
</style>
