<template>
    <view>
        test-com111
        <image src="../../static/shuijiao.jpg"></image>
        <image :src="src"></image>
    </view>
</template>
<script>
    import src from '../../static/shuijiao.jpg'
    export default {
        data() {
            return {
                src
            }
        }
    }
</script>
<style>
</style>