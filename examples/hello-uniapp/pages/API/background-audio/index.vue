<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-section">
            <view class="page-body-info">
                <text class="time-big">{{formatedPlayTime}}</text>
                <slider class="slider" min="0" max="46" step="1" :value="playTime" @change="seek"></slider>
                <view class="play-time">
                    <text>00:00</text>
                    <text>00:46</text>
                </view>
            </view>
            <view class="page-body-text">注意：离开当前页面后背景音乐将保持播放，但退出uni-app将停止</view>
            <view class="page-body-buttons">
                <block v-if="playing === true">
                    <view class="page-body-button" @tap="stop">
                        <image src="../../../static/stop.png"></image>
                    </view>
                    <view class="page-body-button" @tap="pause">
                        <image src="../../../static/pause.png"></image>
                    </view>
                </block>
                <block v-if="playing === false">
                    <view class="page-body-button"></view>
                    <view class="page-body-button" @tap="play">
                        <image src="../../../static/play.png"></image>
                    </view>
                </block>
                <view class="page-body-button"></view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    var util = require('../../../common/util.js')
    export default {
        data() {
            return {
                title: 'backgroundAudio',
                bgAudioMannager:null,
                dataUrl:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/friendship.mp3',
                playing: false,
                playTime: 0,
                formatedPlayTime: '00:00:00'
            }
        },
        onLoad: function () {
            const bgAudioMannager = uni.getBackgroundAudioManager();
            bgAudioMannager.title = '友谊地久天长';
            bgAudioMannager.singer  = '群星';
            bgAudioMannager.coverImgUrl = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/friendship.jpg';
            
            bgAudioMannager.onPlay(()=>{
                console.log("开始播放");
                this.playing = true;
            })
            bgAudioMannager.onPause(()=>{
                console.log("暂停播放");
                this.playing = false;
            })
            bgAudioMannager.onEnded(()=>{
                this.playing = false;
                this.playTime = 0;
                this.formatedPlayTime = util.formatTime(0);
            })
            
            bgAudioMannager.onTimeUpdate((e)=>{
                if(Math.floor(this.bgAudioMannager.currentTime) > Math.floor(this.playTime)){
                    this.formatedPlayTime = util.formatTime(Math.floor(this.bgAudioMannager.currentTime));
                }
                this.playTime = this.bgAudioMannager.currentTime;
            })
            
            this.bgAudioMannager = bgAudioMannager;
        },
        methods: {
            play: function (res) {
                if(!this.bgAudioMannager.src){
                    this.bgAudioMannager.startTime = this.playTime;
                    this.bgAudioMannager.src = this.dataUrl;
                }else{
                    this.bgAudioMannager.seek(this.playTime);
                    this.bgAudioMannager.play();
                }
            },
            seek: function (e) {
                this.bgAudioMannager.seek(e.target.value);
            },
            pause: function () {
                this.bgAudioMannager.pause();
            },
            stop: function () {
                this.bgAudioMannager.stop();
                this.playing = false;
                this.playTime = 0;
                this.formatedPlayTime = util.formatTime(0);
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
    .page-body-text{
        padding: 0 30rpx;
    }
    .page-body-wrapper {
        margin-top: 0;
    }

    .page-body-info {
        padding-bottom: 50rpx;
    }

    .time-big {
        font-size: 60rpx;
        margin: 20rpx;
    }

    .slider {
        width: 650rpx;
    }

    .play-time {
        font-size: 28rpx;
        width: 700rpx;
        padding: 20rpx 0;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .page-body-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 100rpx;
    }

    .page-body-button {
        width: 250rpx;
        text-align: center;
    }
</style>
