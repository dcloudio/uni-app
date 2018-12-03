<template>
  <uni-web-view>
    <iframe
      :src="realPath"
      frameborder="0"
      width="100%"
      height="100%" />
  </uni-web-view>
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
  data () {
    return {
      realPath: this.$getRealPath(this.src)
    }
  }
}
</script>
<style>
	uni-web-view iframe {
		position: absolute;
	}
</style>
