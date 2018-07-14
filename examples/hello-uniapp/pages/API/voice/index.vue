<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <block v-if="recording === false && playing === false && hasRecord === false">
                    <view class="page-body-time">
                        <text class="time-big">{{formatedRecordTime}}</text>
                    </view>
                    <view class="page-body-buttons">
                        <view class="page-body-button"></view>
                        <view class="page-body-button" @tap="startRecord">
                            <image src="../../../static/record.png"></image>
                        </view>
                        <view class="page-body-button"></view>
                    </view>
                </block>
                <block v-if="recording === true">
                    <view class="page-body-time">
                        <text class="time-big">{{formatedRecordTime}}</text>
                    </view>
                    <view class="page-body-buttons">
                        <view class="page-body-button"></view>
                        <view class="page-body-button" @tap="stopRecord">
                            <view class="button-stop-record"></view>
                        </view>
                        <view class="page-body-button"></view>
                    </view>
                </block>
                <block v-if="hasRecord === true && playing === false">
                    <view class="page-body-time">
                        <text class="time-big">{{formatedPlayTime}}</text>
                        <text class="time-small">{{formatedRecordTime}}</text>
                    </view>
                    <view class="page-body-buttons">
                        <view class="page-body-button"></view>
                        <view class="page-body-button" @tap="playVoice">
                            <image src="../../../static/play.png"></image>
                        </view>
                        <view class="page-body-button" @tap="clear">
                            <image src="../../../static/trash.png"></image>
                        </view>
                    </view>
                </block>
                <block v-if="hasRecord === true && playing === true">
                    <view class="page-body-time">
                        <text class="time-big">{{formatedPlayTime}}</text>
                        <text class="time-small">{{formatedRecordTime}}</text>
                    </view>
                    <view class="page-body-buttons">
                        <view class="page-body-button" @tap="stopVoice">
                            <image src="../../../static/stop.png"></image>
                        </view>
                        <view class="page-body-button" @tap="clear">
                            <image src="../../../static/trash.png"></image>
                        </view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    var util = require('../../../common/util.js')
    var playTimeInterval = null;
    var recordTimeInterval = null;
    var recorderManager = null;
    var music = null;
    export default {
        data() {
            return {
                title: 'start/stopRecord、play/stopVoice',
                recording: false, //录音中
                playing: false, //播放中
                hasRecord: false, //是否有了一个
                tempFilePath: '',
                recordTime: 0,
                playTime: 0,
                formatedRecordTime: '00:00:00', //录音的总时间
                formatedPlayTime: '00:00:00' //播放录音的当前时间
            }
        },
        onUnload: function () {
            this.end();
        },
        onLoad: function () {
            music = uni.createInnerAudioContext();
            music.onEnded(() => {
                console.log('结束');
                clearInterval(playTimeInterval)
                var playTime = 0
                console.log('play voice finished')
                this.playing = false;
                this.formatedPlayTime = util.formatTime(playTime);
                this.playTime = playTime;
            });
            recorderManager = uni.getRecorderManager();
            recorderManager.onStart(() => {
                console.log('recorder start');
            });
            recorderManager.onStop((res) => {
                console.log('停止录音 stop', res);

                music.src = res.tempFilePath;

                this.hasRecord = true;
                this.recording = false;
            });
        },
        methods: {
            startRecord() { //开始录音
                this.recording = true;

                recordTimeInterval = setInterval(() => {
                    this.recordTime += 1;
                    this.formatedRecordTime = util.formatTime(this.recordTime);
                }, 1000)

                recorderManager.start();
            },
            stopRecord() { //停止录音
                recorderManager.stop();
                clearInterval(recordTimeInterval);
            },
            playVoice() {
                playTimeInterval = setInterval(() => {
                    this.playing = true;
                    this.playTime += 1;
                    this.formatedPlayTime = util.formatTime(this.playTime);
                }, 1000)
                music.play();
            },
            stopVoice() {
                clearInterval(playTimeInterval)
                this.playing = false,
                    this.formatedPlayTime = util.formatTime(0),
                    this.playTime = 0;
                music.stop();
            },
            end() {
                music.stop();
                recorderManager.stop();
                clearInterval(recordTimeInterval)
                clearInterval(playTimeInterval);
                this.recording = false, this.playing = false, this.hasRecord = false;
                this.playTime = 0, this.recordTime = 0;
                this.formatedRecordTime = "00:00:00", this.formatedRecordTime = "00:00:00";
            },
            clear() {
                this.end();
            }
        },
        components: {
            pageHead

        }
    }
</script>

<style>
    image {
        width: 150rpx;
        height: 150rpx;
    }

    .page-body-wrapper {
        justify-content: space-between;
        flex-grow: 1;
        margin-bottom: 300rpx;
    }

    .page-body-time {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .time-big {
        font-size: 60rpx;
        margin: 20rpx;
    }

    .time-small {
        font-size: 30rpx;
    }

    .page-body-buttons {
        margin-top: 60rpx;
        display: flex;
        justify-content: space-around;
    }

    .page-body-button {
        width: 250rpx;
        text-align: center;
    }

    .button-stop-record {
        width: 110rpx;
        height: 110rpx;
        border: 20rpx solid #fff;
        background-color: #f55c23;
        border-radius: 130rpx;
        margin: 0 auto;
    }
</style>
