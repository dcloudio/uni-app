<template>
    <view class="uni-container">
        <page-head :title="title"></page-head>

        <view class="uni-panel" v-for="(item, index) in list" :key="index">
            <view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index, item)">
                <text class="uni-panel-text">{{item.name}}</text>
                <image :src="item.pages.length > 0 ? item.open ? arrowUpIcon : arrowDownIcon : arrowRightIcon"
                    class="uni-icon"></image>
            </view>
            <view class="uni-panel-c" v-if="item.open">
                <view class="uni-navigate-item" v-for="(page,key) in item.pages" :key="key" @click="goDetailPage(page)" hover-class="uni-navigate-item-active">
                    <text class="uni-navigate-text">{{page.name}}</text>
                    <image :src="arrowRightIcon" class="uni-icon" v-if="page.url"></image>
                </view>
            </view>
        </view>
    </view>
</template>·
<script>
    import { gotoDemoActivity } from "@/uni_modules/uts-nativepage";
    import { getBatteryInfo } from "@/uni_modules/uts-getbatteryinfo";

    export default {
        data() {
            return {
                title: '系统API示例',

                list: [{
                        name: "设备相关",
                        open: false,
                        pages: [{
                            name: "获取电池电量",
                            function: "testGetBatteryCapacity"
                        }]
                    },
                    {
                        name: "系统事件",
                        open: false,
                        pages: [{
                            name: "监听系统截屏",
                            url: "SystemAPI/ScreenListen/screenlisten"
                        }]
                    },
                    {
                        name: "Alert系统弹窗",
                        open: false,
                        pages: [{
                            name: "Alert弹窗",
                            url: "SystemAPI/Alert/alert"
                        }]
                    },
                    {
                        name: "android平台",
                        open: false,
                        pages: [{
                            name: "自定义activity(需自定义基座)",
                            function: "testGotoDemoActivity"
                        }]
                    }
                ],
                arrowUpIcon: '/static/icons/arrow-up.png',
                arrowDownIcon: '/static/icons/arrow-down.png',
                arrowRightIcon: '/static/icons/arrow-right.png',
            }
        },
        methods: {
            triggerCollapse(index) {
                for (var i = 0; i < this.list.length; ++i) {
                    if (index == i) {
                        this.list[i].open = !this.list[i].open;
                    } else {
                        this.list[i].open = false;
                    }
                }
            },
            goDetailPage(e) {
                if (e.function) {
                    this[e.function]()
                    return
                }
                uni.navigateTo({
                    url: `/pages/${e.url}`
                })
            },

            testGetBatteryCapacity() {
                getBatteryInfo({
                    success(res) {
                        console.log(res)
                        uni.showToast({
                            title: "当前电量：" + res.level + '%',
                            icon: 'none'
                        });
                    }
                })
            },
            testGotoDemoActivity() {
                let ret = gotoDemoActivity();
                if (!ret) {
                    uni.showToast({
                        icon: 'none',
                        title: '需要在自定义基座中运行'
                    })
                }
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