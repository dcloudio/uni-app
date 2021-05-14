<template>
  <uni-cover-view :scroll-top="scrollTop">
    <div ref="content" class="uni-cover-view">
      <slot />
    </div>
  </uni-cover-view>
</template>
<script>
import { ref } from "vue";

export default {
  name: "CoverView",
  compatConfig: {
    MODE: 3
  },
  props: {
    scrollTop: {
      type: [String, Number],
      default: 0,
    },
  },
  watch: {
    scrollTop(val) {
      this.setScrollTop(val);
    },
  },
  mounted() {
    this.setScrollTop(this.scrollTop);
  },
  methods: {
    setScrollTop(val) {
      var content = this.content;
      if (getComputedStyle(content).overflowY === "scroll") {
        content.scrollTop = this._upx2pxNum(val);
      }
    },
    _upx2pxNum(val) {
      if (/\d+[ur]px$/i.test(val)) {
        val.replace(/\d+[ur]px$/i, (text) => {
          return uni.upx2px(parseFloat(text));
        });
      }
      return parseFloat(val) || 0;
    },
  },
  setup() {
    const content = ref(null);

    return {
      content,
    };
  },
};
</script>