<template>
  <div class="wrapper">
    <view class="title">
      <text>{{detail.question_title}}</text>
    </view>
    <view class="ask">
      <view class="asker" v-if="detail.answerer">
        <text>{{detail.asker.user_name}}问：</text>
      </view>
      <view class="asker" v-else>
        <text>网友问：</text>
      </view>
      <wx-parse :content="detail.question_content || ''"></wx-parse>
    </view>
    <view class="divider"></view>
    <view class="answer">
      <view class="answerer" v-if="detail.answerer">
        <text>{{detail.answerer.user_name}}答：</text>
      </view>
      <view class="answerer" v-else>
        <text>网友答：</text>
      </view>
      <wx-parse :content="detail.answer_content || ''"></wx-parse>
    </view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import wxParse from '../../../components/mpvue-wxparse/wxParse.vue'
export default {
  onLoad(params) {
    this.clearReadContent({type: 'question'})
    const { id } = params
    this.getReadContent({ type: 'question', id })
  },
  components: {
    wxParse
  },
  computed: {
    ...mapState('read', ['readContent']),
    detail() {
      return this.readContent.question
    }
  },
  methods: {
    ...mapActions('read', ['getReadContent', 'clearReadContent'])
  }
}
</script>

<style scoped>
  .title {
    font-size: 32rpx;
    overflow: hidden;
    text-align: center;
    padding: .8em;
    font-weight: bold;
  }
  .asker, .answerer {
    font-size: 30rpx;
    padding-left: 1em;
    height: 60rpx;
  }
  .divider {
    width: 90%;
    margin: 15rpx auto;
    position: relative;
    height: 2rpx;
    background-color: #b4b4b4;
  }
  .divider::before {
    content: '';
    width: 50rpx;
    height: 2rpx;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: calc(50% - 25rpx);
  }
  .divider::after {
    content: '';
    display: block;
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background-color: #b4b4b4;
    position: absolute;
    top: -4rpx;
    left: calc(50% - 5rpx);
  }
</style>
