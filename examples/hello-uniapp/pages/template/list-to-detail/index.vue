<template>
    <view class="page">
        <view class="banner" @click="goDetail(banner)">
            <image class="banner-img" :src="banner.cover"></image>
            <view class="banner-title">{{banner.title}}</view>
        </view>
        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in listData" :key="key" @click="goDetail(value)">
                <view class="uni-media-list">
                    <image class="uni-media-list-logo" :src="value.cover"></image>
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top">{{value.title}}</view>
                        <view class="uni-media-list-text-bottom">
                            <text>{{value.author_name}}</text>
                            <text>{{value.published_at}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    var dateUtils = require('../../../common/util.js').dateUtils;

    export default {
        data: {
            banner: {},
            listData: [],
            last_id: "",
            reload: false
        },
        onLoad() {
            this.getBanner();
            this.getList();
        },
        onPullDownRefresh() {
            this.reload = true;
            this.last_id = "";
            this.getBanner();
            this.getList();
        },
        onUnload() {
            this.banner = {},
                this.listData = [],
                this.last_id = "";
        },
        onReachBottom() {
            this.getList();
        },
        methods: {
            getBanner() {
                let data = {
                    column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
                };
                uni.request({
                    url: 'http://spider.dcloud.net.cn/api/banner/36kr',
                    data: data,
                    success: (data) => {
                        uni.stopPullDownRefresh();
                        if (data.statusCode == 200) {
                            console.log(data.data)
                            this.banner = data.data;
                        }
                    },
                    fail: (data, code) => {
                        console.log('...fail...');
                    }
                })
            },
            getList() {
                var data = {
                    column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
                };
                console.log(this.last_id);
                if (this.last_id) { //说明已有数据，目前处于上拉加载
                    data.minId = this.last_id;
                    data.time = new Date().getTime() + "";
                    data.pageSize = 10;
                }
                uni.request({
                    url: 'http://spider.dcloud.net.cn/api/news',
                    data: data,
                    success: (data) => {
                        if (data.statusCode == 200) {
                            console.log(data.data)
                            let list = this.setTime(data.data);
                            this.listData = this.reload ? list : this.listData.concat(list);
                            this.last_id = list[list.length - 1].id;
                            this.reload = false;
                        }
                    },
                    fail: (data, code) => {
                        console.log('...fail...');
                    }
                })
            },
            goDetail: function (e) {
                console.log(e);
                if (!/前|刚刚/.test(e.published_at)) {
                    e.published_at = dateUtils.format(e.published_at);
                }
                let detail = {
                    author_name: e.author_name,
                    cover: e.cover,
                    id: e.id,
                    post_id: e.post_id,
                    published_at: e.published_at,
                    title: e.title
                }
                uni.navigateTo({
                    url: "./detail?detailDate=" + JSON.stringify(detail)
                })
            },
            setTime: function (items) {
                var newItems = [];
                items.forEach(function (e) {
                    newItems.push({
                        author_name: e.author_name,
                        cover: e.cover,
                        id: e.id,
                        post_id: e.post_id,
                        published_at: dateUtils.format(e.published_at),
                        title: e.title
                    });
                });
                return newItems;
            }
        },
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

    .banner-img {
        width: 100%;
    }

    .banner-title {
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

    .uni-media-list-logo {
        width: 180rpx;
        height: 140rpx;
    }

    .uni-media-list-body {
        height: auto;
        justify-content: space-around;
    }

    .uni-media-list-text-top {
        height: 74rpx;
        font-size: 28rpx;
        overflow: hidden;
    }

    .uni-media-list-text-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
