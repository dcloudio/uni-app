<template>
    <view>{{[disabled1,disabled2,disabled3,disabled4,disabled5]}}</view>
</template>
<script>
    export default {
        props: {
            // disabled 将被转换为 true
            disabled1: Boolean,
            // disabled 将被转换为 true
            disabled2: [Boolean, Number],
            // disabled 将被转换为 true
            disabled3: [Boolean, String],
            // disabled 将被转换为 true
            disabled4: [Number, Boolean],
            // disabled 将被解析为空字符串 (disabled="")
            disabled5: [String, Boolean]
        },
        created(){
            console.log(this.disabled1)
        }
    }
</script>