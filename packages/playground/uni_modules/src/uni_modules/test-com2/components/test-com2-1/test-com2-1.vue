<template>
    <text class="text">{{ msg }}{{ api }}</text>
    <image :src="api" />
    <video />
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