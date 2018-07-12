<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section-title">分享内容</view>
            <view class="page-section">
                <view class="textarea-wrp">
                    <textarea class="textarea" :value="shareText" />
                </view>
            </view>
            <view class="page-section-title">分享图片：</view>
            <view class="page-section">
                <view class="uni-uploader-body">
                    <view class="uni-uploader__input-box" v-if="!image" @tap="chooseImage"></view>
                    <image class="uni-uploader__img" v-if="image" :src="image"></image>
                </view>
            </view>
            <view class="btn-area">
                <button v-for="(value,index) in providerList" :key="index" @tap="share(value)">{{value.name}}</button>
            </view>
        </view>

    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'share',
                shareText: '我正在使用HBuilderX开发移动应用，赶紧跟我一起来体验！',
                image: '',
                providerList: []
            }
        },
        onLoad: function () {
            uni.getProvider({
                service: "share",
                success: (e) => {
                    console.log("success", e);
                    this.providerList = e.provider.map((value) => {
                        switch (value) {
                            case 'weixin':
                                return {
                                    name: '分享到微信',
                                    id: value
                                }
                            case 'tencentweibo':
                                return {
                                    name: '分享到腾讯微博',
                                    id: value
                                }
                            case 'sinaweibo':
                                return {
                                    name: '分享到新浪微博',
                                    id: value
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
            share(e) {
                console.log("分享~", e);
                
                uni.share({
                    provider: e.id,
                    scene:"WXSceneSession",//WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
                    type:0,
                    title:this.shareText,
                    imageUrl :this.image,
                    href:"http://www.dcloud.io",
                    success:(e) => {
                        console.log("success",e)
                    },
                    fail:(e) => {
                        console.log("fail",e)
                        uni.showToast({
                        	title:e.errMsg
                        })
                    }
                })
            },
            chooseImage() {
                uni.chooseImage({
                    count: 1,
                    sourceType: ['album', 'camera'],
                    sizeType: ['compressed', 'original'],
                    success: (res) => {
                        this.image = res.tempFilePaths[0]
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
    @import "../../../common/uni.css";
    
    .textarea-wrp {
        padding: 0 20rpx;
    }

    .textarea {
        border: 2rpx solid #D8D8D8;
        height: 3em;
        width: 100%;
    }

    button {
        background-color: #007aff;
        color: #ffffff;
    }

    .uni-uploader-body {
        display: flex;
        justify-content: center;
    }
</style>
