<template>
	<view class="page">
		<view class='feedback-title'>
			<text>问题和意见</text>
			<text class="feedback-quick" @tap="chooseMsg">快速键入</text>
		</view>
		<view class="feedback-body">
			<textarea placeholder="请详细描述你的问题和意见..." v-model="sendDate.content" class="feedback-textare" />
			</view>
        <view class='feedback-title'>
            <text>图片(选填,提供问题截图,总大小10M以下)</text>
        </view>
        <view class="feedback-body feedback-uploader">
            <view class="uni-uploader">
                <view class="uni-uploader-head">
                    <view class="uni-uploader-title">点击预览图片</view>
                    <view class="uni-uploader-info">{{imageList.length}}/8</view>
                </view>
                <view class="uni-uploader-body">
                    <view class="uni-uploader__files">
                        <block v-for="(image,index) in imageList" :key="index">
                            <view class="uni-uploader__file" style="position: relative;">
                                <image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
                                <view class="close-view" @click="close(index)">x</view>
                            </view>
                        </block>
                        <view class="uni-uploader__input-box" v-show="imageList.length < 8">
                        	<view class="uni-uploader__input" @tap="chooseImg"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class='feedback-title'>
            <text>QQ/邮箱</text>
        </view>
        <view class="feedback-body">
            <input class="feedback-input" v-model="sendDate.contact" placeholder="(选填,方便我们联系你 )" />
        </view>
        <view class='feedback-title feedback-star-view'>
            <text>应用评分</text>
            <view class="feedback-star-view">
                <text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < sendDate.score ? 'active' : ''" @tap="chooseStar(value)"></text>
            </view>
        </view>
        <button type="primary" class="feedback-submit" @tap="send">提交</button>
        <view class='feedback-title'>
            <text>用户反馈的结果可在app打包后于DCloud开发者中心查看</text>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                msgContents: ["界面显示错乱", "启动缓慢，卡出翔了", "UI无法直视，丑哭了", "偶发性崩溃"],
                stars: [1, 2, 3, 4, 5],
                imageList: [],
                sendDate: {
                    score: 0,
                    content: "",
                    contact: ""
                }
            }
        },
        onLoad() {
            let deviceInfo = {
                appid: plus.runtime.appid,
                imei: plus.device.imei, //设备标识
                p: plus.os.name === "Android" ? "a" : "i", //平台类型，i表示iOS平台，a表示Android平台。
                md: plus.device.model, //设备型号
                app_version: plus.runtime.version,
                plus_version: plus.runtime.innerVersion, //基座版本号
                os: plus.os.version,
                net: "" + plus.networkinfo.getCurrentType()
            }
            this.sendDate = Object.assign(deviceInfo, this.sendDate);
        },
        methods: {
            close(e){
                this.imageList.splice(e,1);
            },
            chooseMsg() { //快速输入
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.content = this.msgContents[res.tapIndex];
                    }
                })
            },
            chooseImg() { //选择图片
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    sizeType: "compressed",
                    count: 8 - this.imageList.length,
                    success: (res) => {
                        this.imageList = this.imageList.concat(res.tempFilePaths);
                    }
                })
            },
            chooseStar(e) { //点击评星
                this.sendDate.score = e;
            },
            previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
            send() { //发送反馈
                console.log(JSON.stringify(this.sendDate));
                let imgs = this.imageList.map((value,index) => {
                    return {
                        name: name: "images" + index,
                        uri: value
                    }
                })
                uni.uploadFile({
                    url: "https://service.dcloud.net.cn/feedback",
                    files: imgs,
                    formData: this.sendDate,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            uni.showToast({
                                title: "反馈成功!"
                            });
                            this.imageList = [];
                            this.sendDate = {
                                score: 0,
                                content: "",
                                contact: ""
                            }
                        }
                    },
                    fail: (res) => {
                        console.log(res)
                    }
                });
            }
        }
    }
</script>

<style>
    page {
        background-color: #EFEFF4;
    }

    .input-view {
        font-size: 28upx;
    }
    .close-view{
        text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
    }
</style>
