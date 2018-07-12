<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-title">
                    <text>Vertical Scroll\n纵向滚动</text>
                </view>
                <view class="page-section-spacing">
                    <scroll-view scroll-y="true" style="height: 300rpx;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView"
                        :scroll-top="scrollTop">
                        <view id="demo1" class="scroll-view-item color1">A</view>
                        <view id="demo2" class="scroll-view-item color2">B</view>
                        <view id="demo3" class="scroll-view-item color3">C</view>
                    </scroll-view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">
                    <text>Horizontal Scroll\n横向滚动</text>
                </view>
                <view class="page-section-spacing">
                    <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" style="width: 100%">
                        <view id="demo1" class="scroll-view-item_H color1">A</view>
                        <view id="demo2" class="scroll-view-item_H color2">B</view>
                        <view id="demo3" class="scroll-view-item_H color3">C</view>
                    </scroll-view>
                </view>
            </view>
        </view>

    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'scroll-view',
                toView: 'green',
                order: ['demo1', 'demo2', 'demo3']
            }
        },
        methods: {
            upper: function (e) {
                console.log(e)
            },
            lower: function (e) {
                console.log(e)
            },
            scroll: function (e) {
                console.log(e)
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    .page-section-spacing {
        margin-top: 60rpx;
    }

    .scroll-view_H {
        white-space: nowrap;
    }

    .scroll-view-item {
        height: 300rpx;
        line-height: 300rpx;
        text-align: center;
        font-size: 36rpx;
    }

    .scroll-view-item_H {
        display: inline-block;
        width: 100%;
        height: 300rpx;
        line-height: 300rpx;
        text-align: center;
        font-size: 36rpx;
    }

</style>
