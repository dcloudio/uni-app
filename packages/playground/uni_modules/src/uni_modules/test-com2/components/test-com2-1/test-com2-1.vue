<template>
    <text class="text">{{ msg }}{{ api }}</text>
    <image :src="api" />
    <video src="https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4" />
</template>
<script>
import Api from './api.png'
export default {
    data() {
        return {
            msg: 'test-com2-1',
            api: Api
        }
    }
}
</script>
<style>
.text {
    color: red;
}

.image {
    background: url('./api.png');
}
</style>