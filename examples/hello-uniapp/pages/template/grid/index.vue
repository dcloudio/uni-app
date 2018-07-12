<template>
  <view class="page">
    <page-head :title="title"></page-head>
    <view class="uni-grid-9">
      <view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in date" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
        <image class="uni-grid-9-image" :src="item"></image>
        <text class="uni-grid-9-text">grid</text>
      </view>
    </view>
  </view>
</template>

<script>
  import pageHead from '../../../components/page-head.vue'
  
  export default {
    data:{
      title: 'grid',
      date:["../../../static/c1.png","../../../static/c2.png","../../../static/c3.png","../../../static/c4.png","../../../static/c5.png","../../../static/c6.png","../../../static/c7.png","../../../static/c8.png","../../../static/c9.png"]
    },

    created () {
      
    },
    components: {
    	pageHead
    }
  }
</script>

<style>
  @import "../../../common/uni.css";
  .page{
    padding-top: 60rpx;
  }
  page{
  	background: #efeff4;
  }
</style>
