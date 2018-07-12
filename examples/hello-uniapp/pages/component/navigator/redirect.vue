<template>
    <view class="index">
        <page-head :title="title"></page-head>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    export default {
        data() {
            return {
                title: '当前页'
            }
        },
        components: {
            pageHead
        }
    }
</script>

