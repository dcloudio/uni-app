<template>
  <div class="container">
    <image class="cover" :src="data.hp_img_url" mode="widthFix" />
    <view class="cover-author">
      <text class="gray">{{data.hp_author}}</text>
    </view>
    <view class="content">
      <text>{{content}}</text>
    </view>
    <view class="content-author">
      <text class="gray">{{data.text_authors}}</text>
    </view>
    <weather :weather="weather" v-if="weather.status === 'ok'"></weather>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import weather from './weather'
export default {
  mounted() {
    this.initPage()
  },
  components: {
    weather
  },
  computed: {
    ...mapState('home', ['data']),
    ...mapState('weather', ['weather']),
    content() {
      return this.data.hp_content.split('by')[0]
    }
  },
  methods: {
    ...mapActions('home', ['getNewIds', 'getHomeData']),
    async initPage() {
      await this.getNewIds()
      await this.getHomeData()
    }
  }
}
</script>

<style scoped>
  .cover {
    width: 100%;
  }
  .cover-author {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    margin-bottom: 30rpx;
  }
  .content {
    width: 80%;
    margin: 0 auto;
    line-height: 58rpx;
    text-align: left;
  }
  .content-author {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 20rpx;
  }
</style>
