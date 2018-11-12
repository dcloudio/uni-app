<template>
    <view>
        <page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<block v-if="tempFilePath != ''">
				<image :src="tempFilePath" class="image" mode="aspectFit"></image>
			</block>
			<block v-if="tempFilePath === '' && savedFilePath != ''">
				<image :src="savedFilePath" class="image" mode="aspectFit"></image>
			</block>
			<block v-if="tempFilePath === '' && savedFilePath === ''">
				<view class="uni-hello-addfile" @tap="chooseImage">+ 请选择文件</view>
			</block>
			<view class="uni-btn-v">
				<button class="btn-savefile" @tap="saveFile">保存文件</button>
				<button @tap="clear">删除文件</button>
			</view>
			<view class="btn-area">
				<button @tap="openDocument">打开pdf文件</button>
			</view>
		</view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'saveFile',
                tempFilePath: '',
                savedFilePath: ''
            }
        },
        onLoad() {
            this.savedFilePath = uni.getStorageSync('savedFilePath')
        },
        onUnload() {
            this.tempFilePath = "",
                this.savedFilePath = ""
        },
        methods: {
            chooseImage() {
                uni.chooseImage({
                    count: 1,
                    success: (res) => {
                        this.tempFilePath = res.tempFilePaths[0]
                    }
                })
            },
            saveFile() {
                if (this.tempFilePath.length > 0) {
                    uni.saveFile({
                        tempFilePath: this.tempFilePath,
                        success: (res) => {
                            this.savedFilePath = res.savedFilePath
                            uni.setStorageSync('savedFilePath', res.savedFilePath)
                            uni.showModal({
                                title: '保存成功',
                                content: '下次进入页面时，此文件仍可用',
                                showCancel: false
                            })
                        },
                        fail: (res) => {
                            uni.showModal({
                                title: '保存失败',
                                content: '失败原因: ' + JSON.stringify(res),
                                showCancel: false
                            })
                        }
                    })
                } else {
                    uni.showModal({
                        content: "请选择文件",
                        showCancel: false
                    })
                }
            },
            clear() {
                uni.setStorageSync('savedFilePath', '')
                this.tempFilePath = '',
                    this.savedFilePath = ''
            },
            openDocument() {
                uni.downloadFile({
                    url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/examples/learning/helloworld.pdf',
                    success: function (res) {
                        var filePath = res.tempFilePath
                        uni.openDocument({
                            filePath: filePath,
                            success: function (res) {
                                console.log('打开文档成功')
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style>
    .image {
        width: 100%;
        height: 360upx;
    }

    .btn-savefile {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
