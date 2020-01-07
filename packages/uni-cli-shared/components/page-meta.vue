<template>
  <view style="display: none;">
    <slot />
  </view>
</template>
<script>
const scrolldoneEvent = {
  type: 'scrolldone',
  target: {
    id: '',
    offsetLeft: 0,
    offsetTop: 0,
    dataset: {}
  },
  currentTarget: {
    id: '',
    offsetLeft: 0,
    offsetTop: 0,
    dataset: {}
  },
  detail: {}
}

export default {
  props: {
    backgroundTextStyle: {
      type: String,
      default: 'dark',
      validator (value) {
        return ['dark', 'light'].indexOf(value) !== -1
      }
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundColorTop: {
      type: String,
      default: '#ffffff'
    },
    backgroundColorBottom: {
      type: String,
      default: '#ffffff'
    },
    scrollTop: {
      type: String,
      default: ''
    },
    scrollDuration: {
      type: Number,
      default: 300
    },
    pageStyle: {
      type: String,
      default: ''
    },
    rootFontSize: {
      type: String,
      default: ''
    }
  },
  created () {
    const page = getCurrentPages()[0]
    this.$pageVm = page.$vm || page
    // event
    // h5 暂不支持生命周期 onResize,补充后，可以移除该条件编译
    // #ifdef H5
    uni.onWindowResize(evt => {
      this.$emit('resize', evt)
    })
    // #endif
    // #ifndef H5
    this.$pageVm.$on('hook:onResize', evt => {
      this.$emit('resize', evt)
    })
    // #endif
    // 父节点一定是 page
    this.$pageVm.$on('hook:onPageScroll', evt => {
      this.$emit('scroll', evt)
    })

    // props

    this.$watch('backgroundTextStyle', () => {
      this.setBackgroundTextStyle()
    })
    this.$watch(() => [
      this.rootFontSize,
      this.pageStyle
    ], () => {
      this.setPageMeta()
    })
    this.$watch(() => [
      this.backgroundColor,
      this.backgroundColorTop,
      this.backgroundColorBottom
    ], () => {
      this.setBackgroundColor()
    })
    this.$watch(() => [
      this.scrollTop,
      this.scrollDuration
    ], () => {
      this.pageScrollTo()
    })
  },
  beforeMount () {
    this.setBackgroundColor()
    if (this.rootFontSize || this.pageStyle) {
      this.setPageMeta()
    }
    this.backgroundTextStyle && this.setBackgroundTextStyle()
    this.scrollTop && this.pageScrollTo()
  },
  methods: {
    setPageMeta () {
      // h5 和 app-plus 设置 rootFontSize
      // #ifdef H5 || APP-PLUS
      uni.setPageMeta({
        pageStyle: this.pageStyle,
        rootFontSize: this.rootFontSize
      })
      // #endif
    },
    setBackgroundTextStyle () {
      // TODO h5 app-plus 暂不支持
      // #ifdef MP
      uni.setBackgroundTextStyle({
        textStyle: this.backgroundTextStyle
      })
      // #endif
    },
    setBackgroundColor () {
      // TODO h5 app-plus 暂不支持
      // #ifdef MP
      uni.setBackgroundColor({
        backgroundColor: this.backgroundColor,
        backgroundColorTop: this.backgroundColorTop,
        backgroundColorBottom: this.backgroundColorBottom
      })
      // #endif
    },
    pageScrollTo () {
      let scrollTop = String(this.scrollTop)
      if (scrollTop.indexOf('rpx') !== -1) {
        scrollTop = uni.upx2px(scrollTop.replace('rpx', ''))
      }
      scrollTop = parseFloat(scrollTop)
      if (isNaN(scrollTop)) {
        return
      }
      const pageScrollDone = (evt) => {
        if (evt.scrollTop === scrollTop) {
          this.$pageVm.$off('hook:onPageScroll', pageScrollDone)
          this.$emit('scrolldone', scrolldoneEvent)
        }
      }
      uni.pageScrollTo({
        scrollTop,
        duration: this.scrollDuration,
        success: () => {
          this.$pageVm.$on('hook:onPageScroll', pageScrollDone)
        }
      })
    }
  }
}
</script>
