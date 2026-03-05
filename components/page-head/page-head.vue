<template name="page-head">
    <view class="common-page-head">
        <view class="common-page-head-title-box">
            <text class="common-page-head-title">{{title}}</text>
        </view>
    </view>
</template>
<script>
    export default {
        name: "page-head",
        props: {
            title: {
                type: String,
                default: ""
            }
        }
    }
</script>
<style>
    .common-page-head {
        display: flex;
        padding: 35rpx;
        flex-direction: row;
        justify-content: center;
    }

    .common-page-head-title-box {
        padding: 0 40rpx;
        height: 88rpx;
        border-bottom: 2rpx solid #D8D8D8;
    }

    .common-page-head-title {
        line-height: 88rpx;
        font-size: 30rpx;
        color: #BEBEBE;
    }
</style>