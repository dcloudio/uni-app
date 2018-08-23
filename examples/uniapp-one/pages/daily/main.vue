<style scoped>
  li {
    min-height: 160rpx; 
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #fafbff;
    padding: 0 20rpx;
  }
  li:active {
    background-color: #f15549;
    padding-left: 20rpx;
  }
  li:active .title, li:active .subtitle {
    color: #fff;
  }
  li img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: block;
  }
  .desc {
    width: 480rpx;
    text-align: left;
    line-height: 48rpx;
    padding-left: 40rpx;
  }
  .title {
    color: #7f7f7f;
    font-size: 32rpx;
  }
  .play {
    margin-left: 40rpx;
  }
  .play img {
    width: 40rpx;
    height: 40rpx;
  }
  .slide-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .item-title {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 0 40rpx 60rpx;
    font-size: 36rpx;
    text-align: left;
    color: #fff;
    left: 0;
    bottom: 0;
    z-index: 11;
  }
  swiper {
    width: 100%;
    height: 400rpx;
    position: fixed;
    top: 0;
    left: 0;
  }
  swiper-item {
    position: relative;
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .3));
  }
  .list {
    margin-top: 400rpx;
  }
</style>
<template>
  <div class="container">
    <swiper :indicator-dots="true" :autoplay="true" :circular="true">
      <block v-for="v in top_stories" :key="v.id">
        <swiper-item @tap="toDtl(v.id)">
          <image :src="v.image" class="slide-image" mode="center"/>
          <div class="item-title">{{v.title}}</div>
          <div class="layer"></div>
        </swiper-item>
      </block>
    </swiper>
    <ul class="list">
      <li v-for="v in all_stories" :key="v.id" @tap="toDtl(v.id)">
        <img :src="v.image" alt="cover">
        <div class="desc">
          <div class="title">
            {{v.title}}
          </div>
        </div>
        <div class="play">
          <img src="/static/assert/arrow-right.png" alt="play">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import API from '@/utils/api'
export default {
  data() {
    return {
      top_stories: [],
      stories: [],
      innerAudioContext: ''
    }
  },
  mounted() {
    this.getDailyList()
  },
  computed: {
    all_stories() {
      return this.stories.map(v => ({
        ...v,
        image: v.images[0]
      }))
    }
  },
  methods: {
    async getDailyList() {
      const res = await API.getZhList()
      console.log(res.top_stories)
      this.top_stories = res.top_stories
      this.stories = res.stories
    },
    toDtl(id) {
      wx.navigateTo({ url: '/pages/daily/detail/main?id=' + id })
    }
  }
}
</script>
