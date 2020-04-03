<template>
  <view style="display: none;" />
</template>

<script>
const attrs = [
  'titleIcon',
  'titleIconRadius',
  'subtitleText',
  'subtitleSize',
  'subtitleColor',
  'subtitleOverflow',
  'titleAlign',
  'backgroundImage',
  'backgroundRepeat',
  'blurEffect'
]
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    titleIcon: {
      type: String,
      default: ''
    },
    titleIconRadius: {
      type: String,
      default: ''
    },
    subtitleText: {
      type: String,
      default: ''
    },
    subtitleSize: {
      type: String,
      default: ''
    },
    subtitleColor: {
      type: String,
      default: ''
    },
    subtitleOverflow: {
      type: String,
      default: ''
    },
    titleAlign: {
      type: String,
      default: ''
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundRepeat: {
      type: String,
      default: ''
    },
    blurEffect: {
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
    let pages = getCurrentPages()
    let page = pages[pages.length - 1]
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
    // #ifdef APP-PLUS
    this._webview = page.$getAppWebview()
    attrs.forEach(key => {
      let titleNView = {}
      if (this[key] || this[key].length > 0) {
        titleNView[key] = this[key]
      }
      this.setTitleNView(titleNView)
      this.$watch(key, (val) => {
        let titleStyle = {}
        titleStyle[key] = val
        this.setTitleNView(titleStyle)
      })
    })
    // #endif
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
    },
    setTitleNView (titleNView) {
      const webview = this._webview
      const style = webview.getStyle()
      if (style && style.titleNView) {
        webview.setStyle({
          titleNView: titleNView
        })
      }
    }
  }
}
</script>
