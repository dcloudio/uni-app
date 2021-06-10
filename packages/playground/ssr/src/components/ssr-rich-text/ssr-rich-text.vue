<template>
  <view class="content">
    <view class="uni-padding-wrap">
      <view class="uni-title uni-common-mt">
        数组类型
        <text>\nnodes属性为Array</text>
      </view>
      <view
        class="uni-common-mt"
        style="background: #fff; padding: 20rpx"
      >
        <rich-text :nodes="nodes"></rich-text>
      </view>
      <!-- #ifndef MP-ALIPAY -->
      <view class="uni-title uni-common-mt">
        字符串类型
        <text>\nnodes属性为String</text>
      </view>
      <view
        class="uni-common-mt"
        style="background: #fff; padding: 20rpx"
      >
        <rich-text :nodes="strings"></rich-text>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: "rich-text",
      nodes: [
        {
          name: "div",
          attrs: {
            class: "div-class",
            style: "line-height: 60px; color: red; text-align:center;",
          },
          children: [
            {
              type: "text",
              text: "Hello&nbsp;uni-app!",
            },
          ],
        },
      ],
      strings:
        '<div style="text-align:center;"><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/ceb770c0-5164-11eb-8a36-ebb87efcf8c0.png"/></div>',
    };
  },
};
</script>
