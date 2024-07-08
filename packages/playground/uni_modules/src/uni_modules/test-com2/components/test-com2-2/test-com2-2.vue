<template>
    <text class="text2">{{ msg }}{{ api }}</text>
    <image :src="api" />
</template>
<script>
import Api from '../test-com2-1/api.png'
export default {
    data() {
        return {
            msg: 'test-com2-2',
            api: Api
        }
    }
}
</script>
<style>
.text2 {
    color: red;
}
</style>