<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-body-info">
                    <text class="page-body-text-small">当前位置经纬度</text>
                    <block v-if="hasLocation === false">
                        <text class="page-body-text">未获取</text>
                    </block>
                    <block v-if="hasLocation === true">
                        <view class="page-body-text-location">
                            <text>E: {{location.longitude[0]}}°{{location.longitude[1]}}′</text>
                            <text>N: {{location.latitude[0]}}°{{location.latitude[1]}}′</text>
                        </view>
                    </block>
                </view>
                <view class="btn-area">
                    <button class="btn-getlocation" @tap="getLocation">获取位置</button>
                    <button @tap="clear">清空</button>
                </view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    var util = require('../../../common/util.js')
    var formatLocation = util.formatLocation
    export default {
        data() {
            return {
                title: 'getLocation',
                hasLocation: false,
                location:{}
            }
        },
        methods: {
            getLocation: function () {
                var that = this
                uni.getLocation({
                    success: function (res) {
                        that.hasLocation = true,
                        that.location = formatLocation(res.longitude, res.latitude)
                    }
                })
            },
            clear: function () {
                this.hasLocation = false
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .page-body-info {
        height: 250rpx;
    }

    .page-body-text-small {
        font-size: 24rpx;
        color: #000;
        margin-bottom: 100rpx;
    }

    .page-body-text-location {
        display: flex;
        font-size: 50rpx;
    }

    .page-body-text-location text {
        margin: 10rpx;
    }
    
    .btn-getlocation{
        background-color:#007aff;
        color: #ffffff;
    }
</style>
