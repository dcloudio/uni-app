<template>
  <block>
    <view class="list-container" v-if="movie.subtitle">
      <view class="content">
        <view class="view-title title">
          <text>{{movie.title}}</text>
        </view>
        <view class="author">
          <!-- <text>{{movie.author_list[0].user_name}} —— </text> -->
          <!-- <text>{{movie.author_list[0].desc}}</text> -->
          <text>{{movie.subtitle}}</text>
        </view>
      </view>
      <view>
        <image class="avatar" :src="movie.img_url || 'https://petrify.oss-cn-beijing.aliyuncs.com/arrow-right.png'" />
      </view>
    </view>
    <block v-else>
      <view class="only-title title">
        <text>{{movie.title}}</text>
        <image class="arraw" src="https://petrify.oss-cn-beijing.aliyuncs.com/arrow-right.png" />
      </view>
    </block>
  </block>
</template>

<script>
export default {
  props: {
    movie: Object
  }
}
</script>

<style>
  .title {
    font-size: 28rpx;
    line-height: 40rpx;
    margin-bottom: 10rpx;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .only-title {
    height: 100%;
    line-height: 170rpx;
    text-align: left;
    padding-left: 20rpx;
    display: flex;
    align-items: center;
  }

  .only-title text {
    width: 680rpx;
  }

  .arraw {
    width: 28rpx;
    height: 28rpx;
  }

  .view-title {
    text-align: left;
  }

  .avatar {
    width: 100rpx;
    height: 100rpx;
    padding-right: 20rpx;
  }

  .list-container {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 20rpx;
  }

  .content {
    width: 600rpx;
  }

  .author {
    text-align: left;
    color: #979794;
  }
</style>

