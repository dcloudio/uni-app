<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="btn-area">
                <navigator url="navigate?title=navigate" hover-class="navigator-hover">
                    <button type="default">跳转到新页面</button>
                </navigator>
                <navigator url="redirect?title=redirect" redirect hover-class="other-navigator-hover">
                    <button type="default">在当前页打开</button>
                </navigator>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    export default {
        data() {
            return {
                title: 'navigator'
            }
        },
        methods: {

        },
        components: {
            pageHead
        }
    }
</script>
