<template>
  <view style="display: none;" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    frontColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundColor: {
      type: String,
      default: '#000000'
    },
    colorAnimationDuration: {
      type: Number,
      default: 0
    },
    colorAnimationTimingFunc: {
      type: String,
      default: 'linear'
    }
  },
  created () {
    this.$watch('title', () => {
      this.setNavigationBarTitle()
    })
    this.$watch('loading', () => {
      this.setNavigationBarLoading()
    })
    this.$watch(() => [
      this.frontColor,
      this.backgroundColor,
      this.colorAnimationDuration,
      this.colorAnimationTimingFunc
    ],
    () => {
      this.setNavigationBarColor()
    })
  },
  beforeMount () {
    this.title && this.setNavigationBarTitle()
    this.setNavigationBarLoading()
    this.setNavigationBarColor()
  },
  methods: {
    setNavigationBarTitle () {
      uni.setNavigationBarTitle({
        title: this.title
      })
    },
    setNavigationBarLoading () {
      uni[(this.loading ? 'show' : 'hide') + 'NavigationBarLoading']()
    },
    setNavigationBarColor () {
      uni.setNavigationBarColor({
        frontColor: this.frontColor,
        backgroundColor: this.backgroundColor,
        animation: {
          duration: this.colorAnimationDuration,
          timingFunc: this.colorAnimationTimingFunc
        }
      })
    }
  }
}
</script>
