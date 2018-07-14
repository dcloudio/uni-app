<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-body-info">
                    <block v-if="tempFilePath != ''">
                        <image :src="tempFilePath" class="image" mode="aspectFit"></image>
                    </block>
                    <block v-if="tempFilePath === '' && savedFilePath != ''">
                        <image :src="savedFilePath" class="image" mode="aspectFit"></image>
                    </block>
                    <block v-if="tempFilePath === '' && savedFilePath === ''">
                        <view class="image-plus image-plus-nb" @tap="chooseImage">
                            <view class="image-plus-horizontal"></view>
                            <view class="image-plus-vertical"></view>
                        </view>
                        <view class="image-plus-text">请选择文件</view>
                    </block>
                </view>
                <view class="btn-area">
                    <button class="btn-savefile" @tap="saveFile">保存文件</button>
                    <button @tap="clear">删除文件</button>
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
                title: 'saveFile',
                tempFilePath: '',
                savedFilePath: ''
            }
        },
        onLoad: function () {
            this.savedFilePath = uni.getStorageSync('savedFilePath')
        },
        methods: {
            chooseImage: function () {
                var that = this
                uni.chooseImage({
                    count: 1,
                    success: function (res) {
                        that.tempFilePath = res.tempFilePaths[0]
                    }
                })
            },
            saveFile: function () {
                if (this.tempFilePath.length > 0) {
                    var that = this
                    uni.saveFile({
                        tempFilePath: this.tempFilePath,
                        success: function (res) {
                            that.savedFilePath = res.savedFilePath
                            uni.setStorageSync('savedFilePath', res.savedFilePath)
                            uni.showModal({
                                title: '保存成功',
                                content: '下次进入应用时，此文件仍可用',
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        },
                        fail: function (res) {
                            uni.showModal({
                                title: '保存失败',
                                content: '应该是有 bug 吧',
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                    }
                                }
                            })
                        }
                    })
                }
            },
            clear: function () {
                uni.setStorageSync('savedFilePath', '')
                this.tempFilePath = '',
                    this.savedFilePath = ''
            }
        },
        components: {
            pageHead

        }
    }
</script>

<style>
    .image {
        width: 100%;
        height: 360rpx;
    }

    .page-body-info {
        display: flex;
        box-sizing: border-box;
        padding: 30rpx;
        height: 420rpx;
        border-top: 1rpx solid #D9D9D9;
        border-bottom: 1rpx solid #D9D9D9;
        align-items: center;
        justify-content: center;
    }

    .btn-savefile {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
