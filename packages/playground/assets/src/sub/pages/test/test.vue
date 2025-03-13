<template>
    <view class="content">
        <image class="logo" :src="url"></image>
        <view class="text-area">
            <text class="title">{{ 'title' }}</text>
        </view>
    </view>
</template>

<script>
const url = require('@/sub/static/images/sub-static-images_logo.png')
export default {
    data() {
        return {
            url,
        }
    },
    onLoad() {
        // test()
    },
    methods: {

    }
}
</script>

<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>