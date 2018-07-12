<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-body-wording">
                <text class="page-body-text">
                    点击向服务器发起请求
                </text>
            </view>
            <view class="btn-area">
                <button @tap="makeRequest" :loading="loading">request</button>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    const requestUrl = "https://service.dcloud.net.cn/ajax/echo/text?name=uni-app"
    const duration = 2000
    export default {
        data() {
            return {
                title: 'request',
                loading: false
            }
        },
        methods: {
            makeRequest: function () {
                var self = this
                this.loading = true
                uni.request({
                    url: requestUrl,
                    data: {
                        noncestr: Date.now()
                    },
                    success: function (result) {
                        uni.showToast({
                            title: '请求成功',
                            icon: 'success',
                            mask: true,
                            duration: duration
                        })
                        self.loading = false
                        console.log('request success', result)
                    },

                    fail: function ({
                        errMsg
                    }) {
                        console.log('request fail', errMsg)
                        this.loading = false
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
    button{
    	background-color:#007aff;
    	color: #ffffff;
    }
</style>
