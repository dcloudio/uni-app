<style scoped>
  .cover {
    width: 300rpx;
    height: 300rpx;
    margin: 20rpx auto 0;
    border-radius: 16rpx;
    box-shadow: 10rpx 10rpx 20rpx rgba(0, 0, 0, .2);
  }
  .control {
    width: 80rpx;
    height: 80rpx;
    background-color: rgba(0, 0, 0, .4);
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    margin: -60rpx 0 0 -40rpx;
  }
  .feeds_cover {
    width: 100%;
    height: 400rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .control img {
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title {
    font-size: 30rpx;
    font-weight: bold;
    height: 96rpx;
    line-height: 48rpx;
    margin-top: 40rpx;
    text-align: center;
  }
</style>

<style>
  .meta.div {
    height: 120rpx;
    padding-left: 40rpx;
    position: relative;
  }
  .meta.div::before {
    content: '';
    display: block;
    position: absolute;
    top: 12rpx;
    left: 10rpx;
    width: 0;
    height: 0;
    border-width: 12rpx 16rpx;
    border-style: solid;
    border-color: transparent transparent transparent #000;
    animation: circle 1s infinite;
    transform-origin: 25% 50%;
  }
  .meta.div::after {
    content: '';
    display: block;
    position: absolute;
    top: 12rpx;
    left: 10rpx;
    width: 0;
    height: 0;
    border-width: 12rpx 16rpx;
    border-style: solid;
    border-color: transparent transparent transparent #000;
    animation: fadeIn 1s infinite;
  }
  .meta.div .avatar {
    display: none;
  }
  .view-more.div {
    display: none;
  }
  @keyframes circle {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(16rpx);
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>


<template>
  <div class="article-container">
    <div class="title">{{title}}</div>
    <wx-parse :content="body"></wx-parse>
  </div>
</template>

<script>
import API from '@/utils/api'
import wxParse from '../../../components/mpvue-wxparse/wxParse.vue'
export default {
  data() {
    return {
      loaded: false,
      isPlay: false,
      audioContext: null,
      body: '',
      title: ''
    }
  },
  components: {
    wxParse
  },
  onLoad(query) {
    const id = query.id
    if (!id) console.log('error coured no id find.')
    this.getDetail(id)
  },
  methods: {
    async getDetail(id) {
      const data = await API.getZhDtl(id)
      this.body = data.body
      this.title = data.title
    }
  }
}
</script>

<style scoped>

</style>
