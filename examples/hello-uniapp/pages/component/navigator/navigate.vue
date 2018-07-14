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
                title: '新建的页面'
            }
        },
        components: {
            pageHead
        }
    }
</script>
