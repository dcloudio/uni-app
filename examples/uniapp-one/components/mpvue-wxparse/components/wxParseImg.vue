<template>
  <image
    class="img"
    :mode="node.image.mode"
    :lazy-load="node.image.lazyLoad"
    :class="node.classStr"
    :style="fitStyleStr"
    :data-src="node.attr.src"
    :src="node.attr.src"
    @tap="wxParseImgTap"
    @load="wxParseImgLoad"
    />
</template>

<script>
export default {
  name: 'wxParseImg',
  data() {
    return {
      realWindowWidth: 0,
      realWindowHeight: 0,
      newStyleStr: '',
    };
  },
  props: {
    node: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.getSysWH();
  },
  computed: {
    fitStyleStr() {
      return this.newStyleStr || this.node.styleStr;
    },
  },
  methods: {
    getSysWH() {
      // 获取当前设备屏幕宽度和高度, 写在这里只是为了方便调试, 最好是写到 wxParse.vue 再传入
      wx.getSystemInfo({
        success: (res) => {
          this.realWindowWidth = res.windowWidth;
          this.realWindowHeight = res.windowHeight;
        },
      });
    },
    wxParseImgTap(e) {
      const { src } = e.target.dataset;
      if (!src) return;
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: this.node.image.urls, // 需要预览的图片http链接列表
      });
    },
    // 图片视觉宽高计算函数区
    wxParseImgLoad(e) {
      const { src } = e.target.dataset;
      if (!src) return;
      if (typeof src !== 'undefined' && src !== '' && src !== null) {
        this.calMoreImageInfo(e);
      }
    },
    // 假循环获取计算图片视觉最佳宽高
    calMoreImageInfo(e) {
      const { width, height } = e.mp.detail;
      const recal = this.wxAutoImageCal(width, height);
      const { imageheight, imageWidth } = recal;
      const { padding } = this.node.image;
      this.newStyleStr = `height: ${imageheight}px; width: ${imageWidth}px; padding: 0 ${padding}px;`;
    },
    // 计算视觉优先的图片宽高
    wxAutoImageCal(originalWidth, originalHeight) {
      // 获取图片的原始长宽
      const { padding } = this.node.image;
      const windowWidth = this.realWindowWidth - (2 * padding);
      const results = {};

      // 判断按照那种方式进行缩放
      if (originalWidth > windowWidth) {
        // 在图片width大于手机屏幕width时候
        results.imageWidth = windowWidth;
        results.imageheight = windowWidth * (originalHeight / originalWidth);
      } else {
        // 否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }

      return results;
    },
  },
};
</script>
