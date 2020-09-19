<template>
  <view v-show="matches">
    <slot />
  </view>
</template>

<script>
let mediaQueryObserver
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
      matches: true
    }
  },

  mounted () {
    mediaQueryObserver = uni.createMediaQueryObserver(this)
    mediaQueryObserver.observe({
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

  destroyed () {
    mediaQueryObserver.disconnect()
  }
}
</script>

<style>
	view {
		display: block;
	}
</style>
