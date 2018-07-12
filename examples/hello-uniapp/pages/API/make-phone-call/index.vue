<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="desc">请在下方输入电话号码</view>
                <input class="input" type="number" name="input" @input="bindInput" />
                <view class="btn-area">
                    <button  @tap="makePhoneCall" :disabled="disabled">拨打</button>
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
                title: 'makePhoneCall',
                disabled: true
            }
        },
        methods: {
            bindInput: function (e) {
                this.inputValue = e.target.value
                if (this.inputValue.length > 0) {
                    this.disabled = false
                } else {
                    this.disabled = true
                }
            },
            makePhoneCall: function () {
                var that = this
                uni.makePhoneCall({
                    phoneNumber: this.inputValue,
                    success: function () {
                        console.log("成功拨打电话")
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
    .page-section {
        width: auto;
        margin: 30rpx;
        padding: 44rpx 60rpx 60rpx;
        background-color: #fff;
        font-size: 28rpx;
    }

    .desc {
        margin-bottom: 20rpx;
    }

    .input {
        height: 119rpx;
        line-height: 119rpx;
        font-size: 78rpx;
        border-bottom: 1rpx solid #E2E2E2;
    }

    .btn-area {
        padding: 0;
    }
    
    button{
    	background-color:#007aff;
    	color: #ffffff;
    }
</style>
