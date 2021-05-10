<template>
    <text>{{ msg }}text</text>
    <text>ssr-text</text>
</template>
<script>
export default {
    data() {
        return { msg: 'ssr-' }
    }
}
</script>