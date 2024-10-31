<template>
  <view style="display: none;">
    <slot />
  </view>
</template>
<script>
import { onMounted } from 'vue'
// #ifndef H5
import { onResize } from '@dcloudio/uni-app'
// #endif
// #ifdef H5
import { onWindowResize } from '@dcloudio/uni-h5'
// #endif
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
  name: 'PageMeta',
  setup(props, { emit }) {
    // #ifndef H5
    onResize((evt) => {
      emit('resize', evt)
    })
    // #endif

    // #ifdef H5
    onMounted(() => {
      onWindowResize(evt => {
        emit('resize', evt)
      })
    })
    // #endif

    // let currentInstance = getCurrentInstance()
    // let proxy = currentInstance.proxy
    // onPageScroll((evt) => {
    //   if (proxy._invokePageScrollToFlag === true && evt.scrollTop === proxy._invokeScrollTop) {
    //     proxy._invokePageScrollToFlag = false
    //     emit('scrolldone', scrolldoneEvent)
    //   }
    // })
  },
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
    enablePullDownRefresh: {
      type: [Boolean, String],
      default: false
    },
    rootFontSize: {
      type: String,
      default: ''
    }
  },
  created () {
    const page = getCurrentPages()[0]
    this.$pageVm = page.$vm || page
    // #ifdef APP-PLUS
    this._currentWebview = page.$getAppWebview()
    if (this.enablePullDownRefresh) {
      this.setPullDownRefresh(this._currentWebview, true)
    }
    this.$watch('enablePullDownRefresh', (val) => {
      this.setPullDownRefresh(this._currentWebview, val)
    })
    // #endif

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

    // this._invokeScrollTop = -1
    // this._invokePageScrollToFlag = false
  },
  beforeMount () {
    this.setBackgroundColor()
    if (this.rootFontSize || this.pageStyle) {
      this.setPageMeta()
    }
    this.backgroundTextStyle && this.setBackgroundTextStyle()
  },
  mounted() {
    this.scrollTop && this.pageScrollTo()
  },
  methods: {
    setPullDownRefresh (webview, enabled) {
      webview.setStyle({
        pullToRefresh: {
          support: enabled,
          style: plus.os.name === 'Android' ? 'circle' : 'default'
        }
      })
    },
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
      uni.setBackgroundTextStyle && uni.setBackgroundTextStyle({
        textStyle: this.backgroundTextStyle
      })
      // #endif
    },
    setBackgroundColor () {
      // TODO h5 app-plus 暂不支持
      // #ifdef MP
      uni.setBackgroundColor && uni.setBackgroundColor({
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

      // this._invokeScrollTop = scrollTop

      uni.pageScrollTo({
        scrollTop,
        duration: this.scrollDuration,
        success: () => {
          //this._invokePageScrollToFlag = true
        }
      })
    }
  }
}
</script>
