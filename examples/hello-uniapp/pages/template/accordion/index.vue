<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="uni-card">
            <view class="uni-list">
                <block v-for="(list,index) in lists" :key="index">
                    <view class="uni-list-cell uni-collapse">
                        <view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
                            {{list.title}}
                        </view>
                        <view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
                            <swiper v-if="list.type === 'swiper'" autoplay="true" indicator-dots="true" circular="true">
                                <swiper-item v-for="(img,key) in imgUrls" :key="key">
                                    <image :src="img" style="width: 100%;" />
                                </swiper-item>
                            </swiper>
                            <view v-if="list.type === 'font'" style="padding: 18px;">
                                <view style="font-size: 50rpx;">hello uni-app</view>
                                <view style="font-size: 40rpx;">hello uni-app</view>
                                <view style="font-size: 30rpx;">hello uni-app</view>
                                <view style="font-size: 20rpx;">hello uni-app</view>
                                <view style="font-size: 10rpx;">hello uni-app</view>
                            </view>
                            <view v-if="list.type === 'list'">
                                <view class="uni-list">
                                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                                        <view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
                                    </view>
                                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                                        <view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
                                    </view>
                                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                                        <view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data: {
            title: 'accordion',
            lists: [{
                    title: "图片轮播",
                    type: 'swiper',
                    show: false
                },
                {
                    title: "列表",
                    type: 'list',
                    show: false
                },
                {
                    title: "文字排版",
                    type: 'font',
                    show: false
                }
            ],
            imgUrls: [
                'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ]
        },
        methods: {
            trigerCollapse(e) {
                for (let i = 0, len = this.lists.length; i < len; ++i) {
                    if (e === i) {
                        this.lists[i].show = !this.lists[i].show;
                    } else {
                        this.lists[i].show = false;
                    }
                }
            }
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

    .list-collapse {
        padding-left: 18px;
        box-sizing: border-box;
    }
</style>
