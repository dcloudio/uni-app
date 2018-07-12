<template>
    <view class="page">
        <view class="banner" @click="goDetail(banner)">
        	<image class="banner-img" :src="banner.cover"></image>
        	<view class="banner-title">{{banner.title}}</view>
        </view>
        <view class="article-meta">
            <text class="article-author">{{banner.author_name}}</text>
            <text class="article-text">发表于</text>
            <text class="article-time">{{banner.published_at}}</text>
        </view>
        <view class="article-content">
            <rich-text :nodes="htmlString"></rich-text>
        </view>
    </view>
</template>

<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data: {
            title: 'list-triplex-row',
            banner:{},
            htmlString:""
        },
        onLoad(e){
            this.banner = JSON.parse(e.detailDate);
            this.getDetail();
            uni.setNavigationBarTitle({
                title:this.banner.title
            })
        },
        onUnload(){
          this.htmlString = "";
          this.banner = {}
        },
        methods:{
            getDetail(){
                uni.request({
                    url: 'http://spider.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
                    success: (data) => {
                        if (data.statusCode == 200) {
                            this.htmlString = data.data.content.replace(/\\/g,"");
                        }
                    },
                    fail: () => {
                        console.log('...fail...');
                    }
                })
            }
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    page {
        background: #efeff4;
    }
    .banner {
    	height: 180px;
    	overflow: hidden;
    	position: relative;
    	background-color: #ccc;
    }
    .banner-img{
    	width: 100%;
    }
    .banner-title{
    	max-height: 84rpx;
    	overflow: hidden;
    	position: absolute;
    	left: 30rpx;
    	bottom: 30rpx;
    	width: 90%;
    	font-size: 32rpx;
    	font-weight: 400;
    	line-height: 42rpx;
    	color: white;
    	z-index: 11;
    }
    .article-meta{
        padding: 20rpx 40rpx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: gray;
    }
    .article-text{
        font-size: 26rpx;
        line-height: 50rpx;
        margin: 0 20rpx;
    }
    .article-author,.article-time{
        font-size: 30rpx;
    }
    .article-content{
        padding: 0 30rpx;
        overflow: hidden;
        font-size: 30rpx;
    }
    
</style>
