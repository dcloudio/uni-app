<template>
  <view class="read-item">
    <view class="dot"></view>
    <view class="date">{{content.hp_makettime}}</view>
    <view class="content">
      <view class="title">
        <text>{{content.hp_title}}</text>
      </view>
      <view class="guide">
        <text>{{content.guide_word}}</text>
      </view>
      <view class="author" v-if="content.author && content.author.length">
        <text>— {{content.author[0].user_name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    content() {
      const item = this.item
      item.hp_makettime = item.hp_makettime.substr(5, 5).split('-').join('月') + '日'
      return item
    }
  }
}
</script>

<style scoped>
  .read-item {
    width: 100%;
    height: 300rpx;
    position: relative;
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  .date {
    width: 160rpx;
    text-indent: 1em;
    white-space: nowrap;
    line-height: 70rpx;
  }
  .title {
    line-height: 80rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 36rpx;
  }
  .guide {
    line-height: 38rpx;
    height: 76rpx;
    overflow: hidden;
  }
  .author {
    text-align: right;
    margin-right: 20rpx;
  }
  .content {
    width: 540rpx;
    height: 246rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
    /* background-color: #42adda; */
    background: linear-gradient(to bottom right, #9653fe, #507fff);
    color: #fff;
    position: relative;
    margin-right: 20rpx;
    padding: 2rpx 12rpx 0;
  }
  .content::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 15rpx 12rpx;
    border-style: solid;
    border-color: transparent #9653fe transparent transparent;
    position: absolute;
    top: 20rpx;
    left: -20rpx;
  }
  .dot {
    width: 18rpx;
    height: 18rpx;
    background-color: rgba(150, 83, 254, .6);
    position: absolute;
    top: 26rpx;
    left: 150rpx;
    border-radius: 50%;
  }
</style>
