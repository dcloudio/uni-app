<!--**
 * author: F-loat <chaimaoyuan@foxmail.com>
 *
 * github地址: https://github.com/F-loat/mpvue-wxParse
 *
 * for: Mpvue框架下 微信小程序富文本解析
 */-->

<template>
<!--基础元素-->
<div class="wxParse" :class="className" v-if="!loading">
  <block v-for="(node,index) of nodes" :key="index">
    <wxParseTemplate :node="node" />
  </block>
</div>
</template>

<script>
import HtmlToJson from './libs/html2json';
import wxParseTemplate from './components/wxParseTemplate0';

export default {
  name: 'wxParse',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    noData: {
      type: String,
      default: '<div style="color: red;">数据不能为空</div>',
    },
    startHandler: {
      type: Function,
      default() {
        return (node) => {
          node.attr.class = null;
          node.attr.style = null;
        };
      },
    },
    endHandler: {
      type: Function,
      default: null,
    },
    charsHandler: {
      type: Function,
      default: null,
    },
    imageProp: {
      type: Object,
      default() {
        return {
          mode: 'aspectFit',
          padding: 0,
          lazyLoad: false,
          domain: '',
        };
      },
    },
  },
  components: {
    wxParseTemplate,
  },
  data() {
    return {
      imageUrls: [],
    };
  },
  computed: {
    nodes() {
      const {
        content,
        noData,
        imageProp,
        startHandler,
        endHandler,
        charsHandler,
      } = this;
      const parseData = content || noData;
      const customHandler = {
        start: startHandler,
        end: endHandler,
        chars: charsHandler,
      };
      const results = HtmlToJson(parseData, customHandler, imageProp, this);
      this.imageUrls = results.imageUrls;
      console.log(results)
      return results.nodes;
    },
  },
  methods: {
    navigate(href, $event) {
      this.$emit('navigate', href, $event);
    },
    preview(src, $event) {
      if (!this.imageUrls.length) return;
      wx.previewImage({
        current: src,
        urls: this.imageUrls,
      });
      this.$emit('preview', src, $event);
    },
    removeImageUrl(src) {
      const { imageUrls } = this;
      imageUrls.splice(imageUrls.indexOf(src), 1);
    },
  },
};
</script>
