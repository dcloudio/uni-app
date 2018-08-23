<template>
  <div class="container">
    <view class="mode-title" v-if="readList.essay && readList.essay.length">
      <view class="mode-title-word">
        <text>阅读</text>
      </view>
    </view>
    <navigator v-for="v in readList.essay" :key="v.content_id" :url="'/pages/read/essay/main?id=' + v.content_id">
      <read-list :item="v"></read-list>
    </navigator>
    <view class="mode-title" v-if="readList.question && readList.question.length">
      <view class="mode-title-word">
        <text>问答</text>
      </view>
    </view>
    <navigator v-for="v in readList.question" :key="v.question_id" :url="'/pages/read/question/main?id=' + v.question_id">
      <question-list :item="v"></question-list>
    </navigator>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import readList from '@/components/readList'
import questionList from '@/components/questionList'
export default {
  mounted() {
    this.getReadList()
  },
  components: {
    readList,
    questionList
  },
  computed: {
    ...mapState('read', ['readList'])
  },
  methods: {
    ...mapActions('read', ['getReadList'])
  }
}
</script>

<style scoped>
  .mode-title {
    height: 80rpx;
    line-height: 80rpx;
    position: relative;
    margin-bottom: 20rpx;
  }

  .mode-title .mode-title-word {
    width: 120rpx;
    margin: 0 auto;
    font-size: 36rpx;
    background-color: #fff;
  }
  .mode-title:before {
    content: '';
    display: block;
    width: 80%;
    height: 2rpx;
    background-color: #b4b4b5;
    position: absolute;
    top: 50%;
    left: 10%;
    z-index: -1;
  }
</style>
