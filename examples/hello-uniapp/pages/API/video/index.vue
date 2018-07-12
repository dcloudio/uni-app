<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-left">
                            <view class="uni-label">视频来源</view>
                        </view>
                        <view class="uni-list-cell-right">
                            <picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex">
                                <view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
                            </picker>
                        </view>
                    </view>
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-left">
                            <view class="uni-label">摄像头</view>
                        </view>
                        <view class="uni-list-cell-right">
                            <picker :range="camera" @change="cameraChange" :value="cameraIndex">
                                <view class="uni-input">{{camera[cameraIndex]}}</view>
                            </picker>
                        </view>
                    </view>
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-left">
                            <view class="uni-label">拍摄长度</view>
                        </view>
                        <view class="uni-list-cell-right">
                            <picker :range="duration" @change="durationChange" :value="durationIndex">
                                <view class="uni-input">{{duration[durationIndex]}}</view>
                            </picker>
                        </view>
                    </view>
                </view>

                <view class="page-body-info">
                    <block v-if="src === ''">
                        <view class="image-plus image-plus-nb" @tap="chooseVideo">
                            <view class="image-plus-horizontal"></view>
                            <view class="image-plus-vertical"></view>
                        </view>
                        <view class="image-plus-text">添加视频</view>
                    </block>
                    <block v-if="src != ''">
                        <video :src="src" class="video"></video>
                    </block>
                </view>
            </view>
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
    var camera = [
        ['front'],
        ['back'],
        ['front', 'back']
    ]
    var duration = Array.apply(null, {
        length: 60
    }).map(function (n, i) {
        return i + 1
    })
    export default {
        data() {
            return {
                title: 'chooseVideo',
                sourceTypeIndex: 2,
                sourceType: ['拍摄', '相册', '拍摄或相册'],
                cameraIndex: 2,
                camera: ['前置', '后置', '前置或后置'],
                durationIndex: 59,
                duration: duration.map(function (t) {
                    return t + '秒'
                }),
                src: ''
            }
        },
        methods: {
            sourceTypeChange: function (e) {
                this.sourceTypeIndex = e.target.value
            },
            cameraChange: function (e) {
                this.cameraIndex = e.target.value
            },
            durationChange: function (e) {
                this.durationIndex = e.target.value
            },
            chooseVideo: function () {
                var that = this
                uni.chooseVideo({
                    sourceType: sourceType[this.sourceTypeIndex],
                    camera: camera[this.cameraIndex],
                    maxDuration: duration[this.durationIndex],
                    success: function (res) {
                        that.src = res.tempFilePath
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
    .page-body-info {
        display: flex;
        margin-top: 40rpx;
        padding: 0;
        height: 360rpx;
        border-top: 1rpx solid #D9D9D9;
        border-bottom: 1rpx solid #D9D9D9;
        align-items: center;
        justify-content: center;
    }
</style>
