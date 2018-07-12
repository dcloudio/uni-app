<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="uni-list">
            <block v-for="(item,index) in lists" :key="index">
                <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                	<view class="uni-triplex-row">
                		<view class="uni-triplex-left">
                			<text class="uni-h4 uni-ellipsis">列表主标题</text>
                			<text class="uni-h5">列表副标题</text>
                			<text class="uni-h6 uni-ellipsis">列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字</text>
                		</view>
                		<view class="uni-triplex-right">
                			<text class="uni-h5">12:15</text>
                		</view>
                	</view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data: {
            title: 'list-triplex-row',
            lists:[]
        },
        onLoad(){
            let list = [];
            for (let i = 0; i < 5; i++) {
            	list.push(i)
            }
            this.lists = list;
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    
    .page {
        padding-top: 60rpx;
    }

    page {
        background: #efeff4;
    }
    
    
    
</style>
