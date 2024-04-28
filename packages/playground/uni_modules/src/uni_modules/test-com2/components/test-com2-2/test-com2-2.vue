<template>
    <text class="text2">{{ msg }}{{ logo }}</text>
</template>
<script>
import Logo from '../test-com2-1/logo.png'
export default {
    data() {
        return {
            msg: 'test-com2-2',
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