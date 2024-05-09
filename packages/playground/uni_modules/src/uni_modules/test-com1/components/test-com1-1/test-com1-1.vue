<template>
    <text class="text">{{ msg }}{{ logo }}</text>
    <image src="./logo.png" />
</template>
<script>
import Logo from './logo.png'
export default {
    data() {
        return {
            msg: 'test-com1-1',
            logo: Logo
        }
    },
    onLoad() {
        uni.getSystemInfo({
            success: function (res) {
                console.log(res)
            }
        });
    }
}
</script>
<style>
.text {
    color: red;
}

.image {
    background: url('./logo.png');
}
</style>