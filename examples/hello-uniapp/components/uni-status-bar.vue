<template>
    <view class="uni-status-bar" :style="style">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        computed: {
            style() {
                //#ifdef MP-WEIXIN
                var systemInfo = uni.getSystemInfoSync()
                return `height:${systemInfo.statusBarHeight}px`
                //#endif
                //#ifdef APP-PLUS
                return ''
                //#endif
            }
        }
    }
</script>

<style>
    .uni-status-bar {
        display: block;
        width: 100%;
        height: 20px;
        height: var(--status-bar-height);
    }
</style>
