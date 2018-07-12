<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-body-info">
                    <view class="page-body-title">网络状态</view>
                    <block v-if="hasNetworkType === false">
                        <text class="page-body-text">未获取</text>
                        <text class="page-body-text">点击绿色按钮可获取网络状态</text>
                    </block>
                    <block v-if="hasNetworkType === true">
                        <text class="page-body-text-network-type">{{networkType}}</text>
                    </block>
                </view>
                <view class="btn-area">
                    <button class="btn-load" @tap="getNetworkType">获取手机网络状态</button>
                    <button @tap="clear">清空</button>
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
                title: 'getNetworkType',
                hasNetworkType: false,
                networkType: ''
            }
        },
        methods: {
            getNetworkType: function () {
                uni.getNetworkType({
                    success: (res) => {
                        console.log(res)
                        this.hasNetworkType = true,this.networkType = res.subtype || res.networkType
                    }
                })
            },
            clear: function () {
                this.hasNetworkType = false,
                this.networkType = ''
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .page-body-info {
        height: 200rpx;
    }

    .page-body-text-network-type {
        font-size: 80rpx;
        font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
    }
    .btn-load{
    	background-color:#007aff;
    	color: #ffffff;
    }
</style>
