<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="btn-area">
                <button @tap="navigateTo">跳转新页面</button>
                <button @tap="navigateBack">返回上一页</button>
                <button @tap="redirectTo">在当前页面打开</button>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'navigateTo/Back, redirectTo'
            }
        },
        methods: {
            navigateTo: function () {
                uni.navigateTo({
                    url: 'index'
                })
            },
            navigateBack: function () {
                uni.navigateBack()
            },
            redirectTo: function () {
                uni.redirectTo({
                    url: 'index'
                })
            }
        },
        components: {
            pageHead

        }
    }
</script>
