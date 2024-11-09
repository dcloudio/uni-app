<template>
  <view>
    <view class="cover-content" v-if="showMap">
      <!-- #ifndef APP-PLUS -->

      <map></map>
      <cover-view class="cover-view">简单的cover-view</cover-view>
      <!-- #ifndef MP-QQ -->
      <cover-image class="cover-image" src="/static/logo.png"></cover-image>
      <!-- #endif -->
      <!-- #endif -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showMap: false,
    };
  },
  onLoad() {
    // #ifndef APP-PLUS || MP-BAIDU
    this.showMap = true;
    // #endif
  },
};
</script>

<style>
map {
  width: 750rpx;
  width: 100%;
  height: 600px;
}

.video {
  width: 100%;
}

.cover-content {
  position: relative;
}

.cover-view {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 375rpx;
  text-align: center;
  background-color: #dddddd;
}

.cover-image {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 96px;
  height: 96px;
}
</style>
