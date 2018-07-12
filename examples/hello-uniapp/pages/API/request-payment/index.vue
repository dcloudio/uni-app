<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view>支付金额</view>
                <view class="price">0.01</view>
                <view class="desc">实际应用中可自定义金额</view>
                <view class="btn-area">
                    <button v-for="(item,index) in providerList" :key="index" @tap="requestPayment(item,index)" :loading="item.loading">{{item.name}}支付</button>
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
                title: 'request-payment',
                providerList: []
            }
        },
        onLoad: function () {
            uni.getProvider({
                service: "payment",
                success: (e) => {
                    console.log("payment success", e);
                    this.providerList = e.provider.map((value) => {
                        switch (value) {
                            case 'alipay':
                                return {
                                    name: '支付宝',
                                    id: value,
                                    loading: false
                                }
                            case 'wxpay':
                                return {
                                    name: '微信',
                                    id: value,
                                    loading: false
                                }
                        }
                    })
                },
                fail: (e) => {
                    console.log("获取登录通道失败", e);
                }
            });
        },
        methods: {
            async requestPayment(e,index) {
                this.providerList[index].loading = true;
                let orderInfo = await this.getOrderInfo(e.id);
                console.log("得到订单信息",orderInfo);
                if(orderInfo.statusCode !== 200){
                    console.log("获得订单信息失败",orderInfo);
                    return;
                }
                uni.requestPayment({
                    provider: e.id,
                    orderInfo: orderInfo.data,
                    success: (e) => {
                        console.log("success", e);
                        uni.showToast({
                            title:"感谢您的赞助!"
                        })
                    },
                    fail: (e) => {
                        console.log("fail", e)
                    },
                    complete:() => {
                        this.providerList[index].loading = false;
                    }
                })
            },
            getOrderInfo(e){
                let appid = uni.os.plus ? plus.runtime.appid : "";
                
                let url = 'http://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=0.01';
                return new Promise((res) => {
                    uni.request({
                        url: url,
                        success: function (result) {
                            res(result);
                        },
                        fail: function (e) {
                            res(e);
                        }
                    })
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
        padding: 64rpx 30rpx;
        background-color: #fff;
        text-align: center;
        font-size: 28rpx;
    }

    .desc {
        color: #B2B2B2;
    }

    .price {
        margin-top: 30rpx;
        margin-bottom: 25rpx;
        position: relative;
        display: inline-block;
        font-size: 78rpx;
        line-height: 1;
    }

    .price:before {
        content: "¥";
        position: absolute;
        font-size: 40rpx;
        top: 8rpx;
        left: -40rpx;
    }

    button {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
