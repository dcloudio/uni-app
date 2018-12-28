<template>
  <uni-cover-view
    :scroll-top="scrollTop"
    v-on="$listeners">
    <div
      ref="content"
      class="uni-cover-view">
      <slot/>
    </div>
  </uni-cover-view>
</template>
<script>
export default {
  name: 'CoverView',
  props: {
    scrollTop: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    scrollTop (val) {
      this.setScrollTop(val)
    }
  },
  mounted () {
    this.setScrollTop(this.scrollTop)
  },
  methods: {
    setScrollTop (val) {
      var content = this.$refs.content
      if (getComputedStyle(content).overflowY === 'scroll') {
        content.scrollTop = this._upx2pxNum(val)
      }
    },
    _upx2pxNum (val) {
      if (/\d+[ur]px$/i.test(val)) {
        val.replace(/\d+[ur]px$/i, text => {
          return uni.upx2px(parseFloat(text))
        })
      }
      return parseFloat(val) || 0
    }
  }
}
</script>
<style>
uni-cover-view {
  display: block;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
}

uni-cover-view[hidden] {
  display: none;
}

uni-cover-view .uni-cover-view {
  width: 100%;
  height: 100%;
  text-overflow: inherit;
  overflow: hidden;
  white-space: inherit;
  -webkit-align-items: inherit;
  align-items: inherit;
  -webkit-justify-content: inherit;
  justify-content: inherit;
  -webkit-flex-direction: inherit;
  flex-direction: inherit;
  -webkit-flex-wrap: inherit;
  flex-wrap: inherit;
  display: inherit;
  overflow: inherit;
}
</style>
