<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="title">缩略图居左</view>
        <view class="uni-list">
        	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in date" :key="key">
        		<view class="uni-media-list">
        			<image class="uni-media-list-logo" :src="value.img"></image>
        			<view class="uni-media-list-body">
        				<view class="uni-media-list-text-top">{{value.title}}</view>
        				<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
        			</view>
        		</view>
        	</view>
        </view>
        <view class="title">缩略图居右</view>
        <view class="uni-list">
        	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in date" :key="key">
        		<view class="uni-media-list uni-pull-right">
        			<image class="uni-media-list-logo" :src="value.img"></image>
        			<view class="uni-media-list-body">
        				<view class="uni-media-list-text-top">{{value.title}}</view>
        				<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
        			</view>
        		</view>
        	</view>
        </view>
        <view class="title">右侧带箭头</view>
        <view class="uni-list">
        	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in date" :key="key">
                <view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
                    <image class="uni-media-list-logo" :src="value.img"></image>
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top">{{value.title}}</view>
                        <view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
                    </view>
                </view>
        	</view>
        </view>
        <view class="title">卡片列表</view>
        <view class="uni-card">
            <view class="uni-list">
            	<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in date" :key="key">
            		<view class="uni-media-list uni-pull-right">
            			<image class="uni-media-list-logo" :src="value.img"></image>
            			<view class="uni-media-list-body">
            				<view class="uni-media-list-text-top">{{value.title}}</view>
            				<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
            			</view>
            		</view>
            	</view>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data: {
            title: 'media-list',
            date: [
                {
                    title: "幸福",
                    content: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
                    img: "../../../static/shuijiao.jpg"
                },
                {
                    title: "木屋",
                    content: "想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖。",
                    img: "../../../static/muwu.jpg"
                },
                {
                    title: "CBD",
                    content: "烤炉模式的城，到黄昏，如同打翻的调色盘一般。",
                    img: "../../../static/cbd.jpg"
                }
            ]
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    
    .page {
        background: #efeff4;
    }
    .title{
        padding: 10px;
    }
</style>