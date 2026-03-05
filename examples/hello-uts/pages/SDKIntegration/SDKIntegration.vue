<template>
    <view class="uni-container">
        <page-head :title="title"></page-head>

        <view class="uni-panel" v-for="(item, index) in list" :key="index">
            <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="goDetailPage(item)" hover-class="uni-navigate-item-active">
                <text class="uni-panel-text">{{item.name}}</text>
                <image :src="arrowRightIcon" class="uni-icon"></image>
            </view>
        </view>
    </view>
</template>
<script>
    import {
        checkHasIntegration
    } from "@/uni_modules/uts-tencentgeolocation";
    import {
        checkHasLottieIntegration
    } from "@/uni_modules/uts-animation-view";
    

    export default {
        data() {
            return {
                title: 'SDK集成示例',

                list: [{
                        name: "腾讯定位sdk集成示例",
                        function: "gotoTencentLocation"
                    },
                    {
                        name: "Toast示例",
                        url: "SDKIntegration/Toast/Toast"
                    },
                    {
                        name: "Lottie动画示例",
                        function: "gotoLottie"
                    }
                ],
                arrowRightIcon: '/static/icons/arrow-right.png',
            }
        },
        methods: {
            goDetailPage(e) {
                if (e.function) {
                    this[e.function]()
                    return
                }
                uni.navigateTo({
                    url: `/pages/${e.url}`
                })
            },
            gotoLottie: function(e) {
              if (checkHasLottieIntegration()) {
                  uni.navigateTo({
                      url: '/pages/SDKIntegration/Lottie/index'
                  })
              } else {
                  uni.showToast({
                      icon: 'none',
                      title: '需要在自定义基座中运行'
                  })
              }

            },
            gotoTencentLocation: function(e) {
                let ret = checkHasIntegration();
                if (!ret) {
                    uni.showToast({
                        icon: 'none',
                        title: '需要在自定义基座中运行'
                    })
                } else {
                    uni.navigateTo({
                        url: '/pages/SDKIntegration/TencentLocation/TencentLocation'
                    })
                }

            },
            gotoTencentMap: function(e) {
                uni.navigateTo({
                    url: '/pages/SDKIntegration/TencentMap/TencentMap'
                })
            }
        }
    }
</script>

<style>
    @import '@/common/uni-uvue.css';

    .uni-container {
        min-height: 100%;
    }
</style>