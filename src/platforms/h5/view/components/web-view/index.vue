<template>
  <uni-web-view />
</template>
<script>
export default {
  name: 'WebView',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  watch: {
    src (val, oldVal) {
      this.iframe && (this.iframe.src = this.$getRealPath(this.src))
    }
  },
  mounted () {
    const {
      top,
      bottom,
      width,
      height
    } = this.$el.getBoundingClientRect()

    this.iframe = document.createElement('iframe')
    this.iframe.style.position = 'absolute'
    this.iframe.style.display = 'block'
    this.iframe.style.border = 0
    this.iframe.style.top = top + 'px'
    this.iframe.style.bottom = bottom + 'px'
    this.iframe.style.width = width + 'px'
    this.iframe.style.height = height + 'px'
    this.iframe.src = this.$getRealPath(this.src)

    document.body.appendChild(this.iframe)
  },
  activated () {
    this.iframe.style.display = 'block'
  },
  deactivated () {
    this.iframe.style.display = 'none'
  },
  beforeDestroy () {
    document.body.removeChild(this.iframe)
  }
}
</script>
<style>
    uni-web-view {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>
