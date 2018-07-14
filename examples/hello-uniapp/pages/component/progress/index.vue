<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <view class="progress-box">
                    <progress percent="20" show-info stroke-width="3" />
                </view>
                <view class="progress-box">
                    <progress percent="40" active stroke-width="3" />
                    <icon class="progress-cancel" type="cancel"></icon>
                </view>
                <view class="progress-box">
                    <progress percent="60" active stroke-width="3" />
                </view>
                <view class="progress-box">
                    <progress percent="80" color="#10AEFF" active stroke-width="3" />
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
                title: 'progress'
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    progress {
        width: 100%;
    }

    .progress-box {
        display: flex;
        height: 50rpx;
        margin-bottom: 60rpx;
    }

    .progress-cancel {
        margin-left: 40rpx;
    }
</style>
