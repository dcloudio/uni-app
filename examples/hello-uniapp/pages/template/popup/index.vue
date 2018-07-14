<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="mask" v-show="showMask" @click="hide"></view>
        <view class="popup popup-middle" v-show="showState.middle">
            <view class="desc">
                <text>Hello</text>
            </view>
        </view>
        <view class="popup popup-top" v-show="showState.top">
            <text>顶部 popup</text>
        </view>
        <view class="popup popup-bottom" v-show="showState.bottom">
            <text>底部 popup</text>
        </view>
        <view class="btn-row">
            <button class="btn" type="button" @click="show">弹出 popup</button>
            <button class="btn" type="button" @click="show" data-position="top">顶部弹出 popup</button>
            <button class="btn" type="button" @click="show" data-position="bottom">底部弹出 popup</button>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'popup',
                showState: {
                    top: false,
                    middle: false,
                    bottom: false
                },
                showMask: false,
                activePop: 'middle'
            }
        },
        components: {
            pageHead
        },
        methods: {
            show(evt) {
                var pos = evt.target.dataset.position
                switch (pos) {
                    case 'top':
                        this.activePop = 'top'
                        break
                    case 'bottom':
                        this.activePop = 'bottom'
                        break
                    default:
                        this.activePop = 'middle'
                }
                this.showMask = true
                this.showState[this.activePop] = true
            },
            hide() {
                this.showMask = false
                this.showState[this.activePop] = false
            }
        }
    }
</script>
<style>
    .mask {
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
    }

    .popup {
        position: absolute;
        z-index: 999;
        background-color: #ffffff;
        -webkit-box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
        box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
    }

    .popup-middle {
        width: 400rpx;
        height: 400rpx;
        border-radius: 10rpx;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }

    .popup-top {
        top: 0;
        width: 100%;
        height: 100rpx;
        text-align: center;
    }

    .popup-top text {
        line-height: 100rpx;
        margin-left: 20rpx;
        font-size: 32rpx;
    }

    .popup-bottom {
        bottom: 0;
        width: 100%;
        height: 100rpx;
        text-align: center;
    }

    .popup-bottom text {
        line-height: 100rpx;
        font-size: 32rpx;
    }

    .popup .list-view {
        height: 600rpx;
    }

    .list-view-item {
        position: relative;
        padding: 22rpx 30rpx;
        overflow: hidden;
        font-size: 28rpx;
    }

    .list-view-item::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 30rpx;
        height: 2rpx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .btn-row .btn {
        margin: 20rpx;
    }

    .desc {
        padding: 10rpx 20rpx;
        font-size: 30rpx;
        line-height: 30rpx;
        margin-top: 150rpx;
        text-align: center;
    }
</style>
