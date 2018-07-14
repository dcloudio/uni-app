<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section-title">扫码结果</view>
            <view class="uni-list">
                <view class="uni-cell">
                    <view class="uni-input">{{result}}</view>
                </view>
            </view>
            <view class="btn-area">
                <button @tap="scanCode">扫一扫</button>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'scanCode',
                result: ''
            }
        },
        methods: {
            scanCode: function () {
                var that = this
                uni.scanCode({
                    success: function (res) {
                        that.result = res.result
                    },
                    fail: function (res) {}
                })
            }
        },
        components: {
            pageHead

        }
    }
</script>

<style>
    @import "../../../common/uni.css";

    .uni-input {
        padding: 0 30rpx;
        word-break: break-all;
    }

    button {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
