<template>
    <text class="text2">{{ msg }}{{ logo }}</text>
    <image src="../test-com1-1/logo.png" />
</template>
<script>
import Logo from '../test-com1-1/logo.png'
export default {
    data() {
        return {
            msg: 'test-com1-2',
            logo: Logo
        }
    }
}
</script>
<style>
.text2 {
    color: red;
}
</style>