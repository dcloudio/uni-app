<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-title">
                    <text>flex-direction: row\n横向布局</text>
                </view>
                <view class="page-section-spacing">
                    <view class="uni-flex" style="flex-direction:row;">
                        <view class="flex-item color1">A</view>
                        <view class="flex-item color2">B</view>
                        <view class="flex-item color3">C</view>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">
                    <text>flex-direction: column\n纵向布局</text>
                </view>
                <view class="uni-flex" style="flex-direction:column;">
                    <view class="flex-item flex-item-V color1">A</view>
                    <view class="flex-item flex-item-V color2">B</view>
                    <view class="flex-item flex-item-V color3">C</view>
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
                title: 'view'
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    
    .uni-flex {
        margin-top: 60rpx;
    }

    .flex-item {
        width: 200rpx;
        height: 300rpx;
        text-align: center;
        line-height: 300rpx;
        font-size: 26rpx;
    }

    .flex-item-V {
        margin: 0 auto;
        width: 300rpx;
        height: 200rpx;
        text-align: center;
        line-height: 200rpx;
    }
</style>
