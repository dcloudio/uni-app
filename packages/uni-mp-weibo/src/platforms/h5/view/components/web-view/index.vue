<template>
  <uni-web-view
    ref="webviewContainer"
    :class="{'uni-webview--fullscreen':fullscreen}"
    v-on="$listeners"
  >
    <v-uni-resize-sensor
      ref="sensor"
      @resize="_resize"
    />
  </uni-web-view>
</template>

<script>
export default {
  name: 'WebView',
  props: {
    src: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    src (val, oldVal) {
      this.iframe && (this.iframe.src = this.$getRealPath(this.src))
    }
  },
  mounted () {
    this.iframe = document.createElement('iframe')
    Object.keys(this.$attrs).forEach(key => {
      this.iframe[key] = this.$attrs[key]
    })
    this.iframe.src = this.$getRealPath(this.src)
    if (this.fullscreen) {
      document.body.appendChild(this.iframe)
    } else {
      this.$refs.webviewContainer.appendChild(this.iframe)
    }
    this._resize()
  },
  activated () {
    this.fullscreen && (this.iframe.style.display = 'block')
  },
  deactivated () {
    this.fullscreen && (this.iframe.style.display = 'none')
  },
  beforeDestroy () {
    this.fullscreen && document.body.removeChild(this.iframe)
  },
  methods: {
    _resize () {
      if (this.fullscreen) {
        const {
          top,
          left,
          width,
          height
        } = this.$el.getBoundingClientRect()

        this.iframe.style.position = 'absolute'
        this.iframe.style.display = 'block'
        this.iframe.style.border = 0
        this.iframe.style.top = top + 'px'
        this.iframe.style.left = left + 'px'
        this.iframe.style.width = width + 'px'
        this.iframe.style.height = height + 'px'
      } else {
        this.iframe.style.width = this.$refs.webviewContainer.style.width || '300px'
        this.iframe.style.height = this.$refs.webviewContainer.style.height || '150px'
      }
    }
  }
}
</script>
<style>
  uni-web-view {
    display: flex;
  }
  uni-web-view.uni-webview--fullscreen {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
