<template>
  <block>
    <view class="title">
      <text>{{title}}</text>
    </view>
    <view class="author" v-if="user_name">
      <text>文 / {{user_name}}</text>
    </view>
    <view class="summary" v-if="summary">
      <view class="line"></view>
      <text>{{summary}}</text>
    </view>
    <wx-parse :content="content"></wx-parse>
  </block>
</template>

<script>
import wxParse from './mpvue-wxparse/wxParse.vue'
export default {
  props: {
    title: String,
    user_name: String,
    content: String,
    summary: String
  },
  components: {
    wxParse
  }
}
</script>


<style scoped>
  .title {
    font-size: 36rpx;
    font-weight: 700;
    margin: .8em .8em;
    text-align: center;
  }
  .author {
    color: #cacaca;
    font-size: 24rpx;
    text-align: right;
    padding-right: 2em;
  }
  .summary {
    position: relative;
    color: #b0b0b0;
    font-size: 24rpx;
    white-space: nowrap;
    text-overflow: ellipse;
    padding-left: 40rpx;
    height: 60rpx;
    line-height: 60rpx;
  }
  .summary .line {
    position: absolute;
    top: 14rpx;
    left: 20rpx;
    width: 10rpx;
    height: 32rpx;
    background-color: #d0d0d0;
  }
</style>
