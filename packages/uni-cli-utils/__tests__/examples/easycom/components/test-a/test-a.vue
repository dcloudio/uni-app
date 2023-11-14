<template></template>
<script lang="ts">
export default {
    props: {
        title: {
            type: String,
            default: '',
            required: true
        }
    },
    data() {
        return {
            msg: 'hello'
        }
    }
}
</script>