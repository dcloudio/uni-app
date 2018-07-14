<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class='title'>
            <text>有底色</text>
        </view>
        <view>
            <text class="uni-badge">1</text>
            <text class="uni-badge uni-badge-primary">12</text>
            <text class="uni-badge uni-badge-success">123</text>
            <text class="uni-badge uni-badge-warning">3</text>
            <text class="uni-badge uni-badge-danger">45</text>
            <text class="uni-badge uni-badge-purple">456</text>
        </view>
        <view class='title'>
            <text>无底色</text>
        </view>
        <view>
            <text class="uni-badge uni-badge-inverted">1</text>
            <text class="uni-badge uni-badge-primary uni-badge-inverted">12</text>
            <text class="uni-badge uni-badge-success uni-badge-inverted">123</text>
            <text class="uni-badge uni-badge-warning uni-badge-inverted">3</text>
            <text class="uni-badge uni-badge-danger uni-badge-inverted">45</text>
            <text class="uni-badge uni-badge-purple uni-badge-inverted">456</text>
        </view>
    </view>
</template>

<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data: {
            title: 'badge'
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

    .uni-badge,
    .title {
        margin: 20rpx;
    }
</style>
