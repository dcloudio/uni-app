<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <view class="page-section-title">Local Image</view>
                <view class="page-section-ctn">
                    <image class="image" src="../../../static/uni@2x.png" />
                </view>
            </view>
            <view class="page-section page-section-gap">
                <view class="page-section-title">Internet Image</view>
                <view class="page-section-ctn">
                    <image class="image" src="http://img-cdn-qiniu.dcloud.net.cn/newpage/images/uni@2x.png" />
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
                title: 'image'
            }
        },
        methods: {},
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .page-section-ctn {
        text-align: center;
    }

    .image {
        margin-top: 30rpx;
        width: 200rpx;
        height: 200rpx;
    }
</style>
