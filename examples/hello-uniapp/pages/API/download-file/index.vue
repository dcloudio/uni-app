<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <image v-if="imageSrc" :src="imageSrc" mode="center" />
            <block v-else>
                <view class="page-body-wording">
                    <text class="page-body-text">
                        点击按钮下载服务端示例图片
                    </text>
                </view>
                <view class="btn-area">
                    <button @tap="downloadImage">下载</button>
                </view>
            </block>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'downloadFile',
                imageSrc: ''
            }
        },
        onUnload(){
          this.imageSrc = '';  
        },
        methods: {
            downloadImage: function () {
                var self = this
                uni.downloadFile({
                    url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                    success: function (res) {
                        console.log('downloadFile success, res is', res)
                        self.imageSrc = res.tempFilePath
                    },
                    fail: function ({
                        errMsg
                    }) {
                        console.log('downloadFile fail, err is:', errMsg)
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
    .page-body image {
        width: 600rpx;
        height: 600rpx;

        margin: 0 75rpx;
    }
    button{
    	background-color:#007aff;
    	color: #ffffff;
    }
</style>
