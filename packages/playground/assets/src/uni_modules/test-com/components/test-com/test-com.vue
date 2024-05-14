<template>
    <view>
        <view>
            <view>1:{{shuijiao}}</view>
            <image src="../../static/shuijiao.jpg"></image>
        </view>
        <view>
            <view>2:{{logo}}</view>
            <image :src="logo"></image>
        </view>
    </view>
</template>
<script>
    import shuijiao from '../../static/shuijiao.jpg'
    import logo from '../../static/logo.png'
    export default {
        data() {
            return {
                shuijiao,
                logo
            }
        }
    }
</script>
<style>
</style>