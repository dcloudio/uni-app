<template>
  <div>
    <video
      id='video1'
      class="video"
      :src="src"
      autoplay="false"
      duration=""
      controls="true"
      :danmu-list="list"
      danmu-btn="true"
      enable-danmu="true"
      :loop="true"
      muted="true"
      initial-time=""
      direction="-90"
      show-mute-btn="true"
      @play="onstart"
      @pause="onpause"
      @ended="onfinish"
      @error="onfail"
      @waiting="waiting"
      @timeupdate="timeupdate"
      @fullscreenchange="fullscreenchange"
    ></video>
    <button
      class="btn"
      @click="play"
    >播放</button>
    <button
      class="btn"
      @click="pause"
    >暂停</button>
    <button
      class="btn"
      @click="seek"
    >跳转到指定位置</button>
    <button
      class="btn"
      @click="stop"
    >停止</button>
    <button
      class="btn"
      @click="fullScreen"
    >全屏</button>
    <button
      class="btn"
      @click="exitFullScreen"
    >退出全屏</button>
    <button
      class="btn"
      @click="playbackRate"
    >设置倍速</button>
    <button
      class="btn"
      @click="sendDanmu"
    >发送弹幕</button>
  </div>
</template>

<script>
export default {
  data: {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v",
    fil: true,
    list: [{
      text: '要显示的文本',
      color: '#FF0000',
      time: 9
    }]
  },
  onReady() {
    this.context = uni.createVideoContext("video1", this);
  },
  methods: {
    onstart(e) {
      console.log("onstart:" + JSON.stringify(e));
    },
    onpause(e) {
      console.log("onpause:" + JSON.stringify(e));
    },
    onfinish(e) {
      console.log("onfinish:" + JSON.stringify(e));
    },
    onfail(e) {
      console.log("onfail:" + JSON.stringify(e));
    },
    fullscreenchange(e) {
      console.log("fullscreenchange:" + JSON.stringify(e));
    },
    waiting(e) {
      console.log("waiting:" + JSON.stringify(e));
    },
    timeupdate(e) {
      console.log("timeupdate:" + JSON.stringify(e));
    },

    play() {
      this.context.play();
    },
    pause() {
      this.context.pause();
    },
    seek() {
      this.context.seek(20);
    },
    stop() {
      this.context.stop();
    },
    fullScreen() {
      this.context.requestFullScreen({
        direction: 90
      });
    },
    exitFullScreen() {
      this.context.exitFullScreen();
    },
    sendDanmu() {
      this.context.sendDanmu({
        text: '要显示的弹幕文本',
        color: '#FF0000'
      });
    },
    playbackRate() {
      this.context.playbackRate(2);
    }
  }
}
</script>

<style>
.video {
  width: 750rpx;
  /* #ifdef H5 */
  width: 100%;
  /* #endif */
  height: 400rpx;
  background-color: #808080;
}

.btn {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
