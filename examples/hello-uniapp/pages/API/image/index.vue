<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <form>
                <view class="page-section">
                    <view class="uni-list">
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">图片来源</view>
                            </view>
                            <view class="uni-list-cell-right">
                                <picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">
                                    <view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
                                </picker>
                            </view>
                        </view>

                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">图片质量</view>
                            </view>
                            <view class="uni-list-cell-right">
                                <picker :range="sizeType" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">
                                    <view class="uni-input">{{sizeType[sizeTypeIndex]}}</view>
                                </picker>
                            </view>
                        </view>
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">数量限制</view>
                            </view>
                            <view class="uni-list-cell-right">
                                <picker :range="count" @change="countChange" :value="countIndex" mode="selector">
                                    <view class="uni-input">{{count[countIndex]}}</view>
                                </picker>
                            </view>
                        </view>
                    </view>

                    <view class="uni-list" style="margin-top: 50rpx;">
                        <view class="uni-list-cell cell-pd">
                            <view class="uni-uploader">
                                <view class="uni-uploader-head">
                                    <view class="uni-uploader-title">点击可预览选好的图片</view>
                                    <view class="uni-uploader-info">{{imageList.length}}/{{count[countIndex]}}</view>
                                </view>
                                <view class="uni-uploader-body">
                                    <view class="uni-uploader__files">
                                        <block v-for="(image,index) in imageList" :key="index">
                                            <view class="uni-uploader__file">
                                                <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
                                            </view>
                                        </block>
                                    </view>
                                    <view class="uni-uploader__input-box">
                                        <view class="uni-uploader__input" @tap="chooseImage"></view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>

                </view>
            </form>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    var sourceType = [
        ['camera'],
        ['album'],
        ['camera', 'album']
    ]
    var sizeType = [
        ['compressed'],
        ['original'],
        ['compressed', 'original']
    ]
    export default {
        data() {
            return {
                title: 'choose/previewImage',
                imageList: [],
                sourceTypeIndex: 2,
                sourceType: ['拍照', '相册', '拍照或相册'],
                sizeTypeIndex: 2,
                sizeType: ['压缩', '原图', '压缩或原图'],
                countIndex: 8,
                count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        },
        methods: {
            sourceTypeChange: function (e) {
                console.log('1....................' + JSON.stringify(sourceType));
                this.sourceTypeIndex = e.target.value
            },
            sizeTypeChange: function (e) {
                this.sizeTypeIndex = e.target.value
            },
            countChange: function (e) {
                this.countIndex = e.target.value
            },
            chooseImage: function () {
                var that = this
                uni.chooseImage({
                    sourceType: sourceType[that.sourceTypeIndex],
                    sizeType: sizeType[that.sizeTypeIndex],
                    count: that.count[that.countIndex],
                    success: function (res) {
                        console.log(res)
                        that.imageList = res.tempFilePaths
                    }
                })
            },
            previewImage: function (e) {
                var that = this;
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: that.imageList
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
    .uni-label {
        width: 105px;
    }

    .cell-pd {
        padding: 22rpx 30rpx;
    }
</style>
