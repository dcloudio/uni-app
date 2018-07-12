<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="animation-element-wrapper">
                    <view class="animation-element" :animation="animationData"></view>
                </view>
                <scroll-view class="animation-buttons" scroll-y="true">
                    <button class="animation-button" @tap="rotate">旋转</button>
                    <button class="animation-button" @tap="scale">缩放</button>
                    <button class="animation-button" @tap="translate">移动</button>
                    <button class="animation-button" @tap="skew">倾斜</button>
                    <button class="animation-button" @tap="rotateAndScale">旋转并缩放</button>
                    <button class="animation-button" @tap="rotateThenScale">旋转后缩放</button>
                    <button class="animation-button" @tap="all">同时展示全部</button>
                    <button class="animation-button" @tap="allInQueue">顺序展示全部</button>
                    <button class="animation-button animation-button-reset" @tap="reset">还原</button>
                </scroll-view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'createAnimation',
                animationData: ''
            }
        },
        onReady: function () {
            this.animation = uni.createAnimation()
        },
        methods: {
            rotate: function () {
                this.animation.rotate(Math.random() * 720 - 360).step()
                this.animationData = this.animation.export()
            },
            scale: function () {
                this.animation.scale(Math.random() * 2).step()
                this.animationData = this.animation.export()
            },
            translate: function () {
                this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
                this.animationData = this.animation.export()
            },
            skew: function () {
                this.animation.skew(Math.random() * 90, Math.random() * 90).step()
                this.animationData = this.animation.export()
            },
            rotateAndScale: function () {
                this.animation.rotate(Math.random() * 720 - 360)
                    .scale(Math.random() * 2)
                    .step()
                this.animationData = this.animation.export()
            },
            rotateThenScale: function () {
                this.animation.rotate(Math.random() * 720 - 360).step()
                    .scale(Math.random() * 2).step()
                this.animationData = this.animation.export()
            },
            all: function () {
                this.animation.rotate(Math.random() * 720 - 360)
                    .scale(Math.random() * 2)
                    .translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
                    .skew(Math.random() * 90, Math.random() * 90)
                    .step()
                this.animationData = this.animation.export()
            },
            allInQueue: function () {
                this.animation.rotate(Math.random() * 720 - 360).step()
                    .scale(Math.random() * 2).step()
                    .translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step()
                    .skew(Math.random() * 90, Math.random() * 90).step()
                this.animationData = this.animation.export()
            },
            reset: function () {
                this.animation.rotate(0, 0)
                    .scale(1)
                    .translate(0, 0)
                    .skew(0, 0)
                    .step({
                        duration: 0
                    })
                this.animationData = this.animation.export()
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .animation-element-wrapper {
        display: flex;
        width: 100%;
        padding-top: 150rpx;
        padding-bottom: 150rpx;
        justify-content: center;
        overflow: hidden;
        background-color: #ffffff;
    }

    .animation-element {
        width: 200rpx;
        height: 200rpx;
        background-color: #1AAD19;
    }

    .animation-buttons {
        padding: 30rpx 50rpx 10rpx;
        width: 100%;
        height: 360rpx;
        box-sizing: border-box;
    }

    .animation-button {
        float: left;
        line-height: 2;
        width: 300rpx;
        margin: 15rpx 12rpx;
    }

    .animation-button-reset {
        width: 620rpx;
    }
</style>
