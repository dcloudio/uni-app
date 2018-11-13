<template>
    <view>
        <page-head :title="title"></page-head>
        <view style="padding:200upx 15%;">
            <button type="primary" @tap="showBanner">打开弹窗</button>
        </view>
        <!-- 弹出层 -->
        <view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
            <view style="justify-content:flex-end;" @tap="closeBanner">
                <view style="justify-content:flex-end; text-align:right; padding:20upx;">
                    <text class="uni-icon uni-icon-close"></text>
                </view>
            </view>
            <view>
                <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" style="width:100%;" mode="widthFix"></image>
            </view>
            <view style="padding:50upx 0; padding-bottom:68upx;">
                <button type='warn' class="mini-btn" style="background:#F6644D; margin:0 80upx;">一个按钮</button>
            </view>
        </view>
        <view class="uni-mask" v-if="bannerShow"></view>
        <!-- 弹出层 -->
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: '插屏弹窗',
                bannerShow: true
            }
        },
        onBackPress() {
        	if (this.bannerShow) {
        		this.bannerShow = false;
        		return true;
        	}
        },
        methods: {
            closeBanner: function() {
                this.bannerShow = false;
            },
            showBanner: function() {
                this.bannerShow = true;
            },
        }
    }
</script>

<style>
	@import "../../../common/icon.css";
    /* 遮罩层 */
    .uni-mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
    }

    /* 弹出层形式的广告 */
    .uni-banner {
        width: 70%;
        position: fixed;
        left: 50%;
        top: 50%;
        background: #FFF;
        border-radius: 10upx;
        z-index: 99;
        transform: translate(-50%, -50%);
    }
</style>
