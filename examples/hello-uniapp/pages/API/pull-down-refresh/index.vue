<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-body-info">
                    <text class="page-body-text">下滑页面即可刷新</text>
                </view>
                <view class="btn-area">
                    <button @tap="stopPullDownRefresh">停止刷新</button>
                </view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'on/stopPullDownRefresh'
            }
        },
        methods: {
            onPullDownRefresh: function () {
                uni.showToast({
                    title: 'loading...',
                    icon: 'loading'
                })
                console.log('onPullDownRefresh', new Date())
            },
            stopPullDownRefresh: function () {
                uni.stopPullDownRefresh({
                    complete: function (res) {
                        uni.hideToast()
                        console.log(res, new Date())
                    }
                })
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .page-body-info {
        background-color: transparent;
    }

    .btn-area {
        margin-top: 300rpx;
    }
</style>
