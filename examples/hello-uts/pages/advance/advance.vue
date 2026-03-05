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
</template>
<script>
    import {
        doTimerTask,
        doIntervalTask,
        clearIntervalTask,
        playAssetAudio,
        getMetaConfig,
        quitApp,
		arrayConvert
    } from "../../uni_modules/uts-advance";
	
	import {openFileWithProvider} from '../../uni_modules/uts-advance'

    export default {
        data() {
            return {
                title: 'UTS进阶示例',
                taskId: 0,

                list: [{
                        name: "延迟任务",
                        open: false,
                        pages: [{
                            name: "开启延迟任务",
                            function: "testTimer"
                        }]
                    },
                    {
                        name: "定时任务",
                        open: false,
                        pages: [{
                            name: "开启定时任务",
                            function: "testInterval"
                        }, {
                            name: "关闭定时任务",
                            function: "testClearInterval"
                        }]
                    },
					{
					    name: "资源加载示例",
					    open: false,
					    pages: [{
					        name: "图片加载示例",
					        url: "resource/resource"
					    }]
					},
					{
					    name: "组件开发示例",
					    open: false,
					    pages: [{
					        name: "Hello UTS Component",
					        url: "component/helloView"
					    }]
					},
					{
					    name: "android平台示例",
					    open: false,
					    pages: [{
					        name: "activity生命周期监听",
					        url: "lifecycle/lifecycle"
					    }, {
					        name: "播放asset音频(需自定义基座)",
					        url: "advance/android/assetaudio"
					    }, 
						{
						    name: "使用三方应用打开项目文件",
						    function: "testOpenFileWithProvider"
						},
						{
					        name: "操作DecorView",
					        url: "advance/android/decorview"
					    }, {
					        name: "读取meta配置",
					        function: "testMetaRead"
					    }, {
					        name: "退出当前应用",
					        function: "testQuitApp"
					    },{
					        name: "数组转换测试",
					        function: "testArrayConvert"
					    }]
					},
					{
					    name: "iOS平台示例",
					    open: false,
					    pages: [{
					        name: "资源路径获取示例",
					        url: "advance/iOS/getResourcePath"
					    }]
					},
                    {
                        name: "语法示例",
                        open: false,
                        pages: [{
                            name: "进阶语法示例",
                            url: "SyntaxCase/index"
                        }, {
                            name: "参数传递示例",
                            url: "SyntaxCase/paramTest"
                        },
                        {
                            name: "实例测试示例",
                            url: "SyntaxCase/instanceTest"
                        },
                        // #ifdef UNI-APP-X
                        {
                            name: "默认值测试示例",
                            url: "SyntaxCase/defaultValueTest"
                        },
                        // #endif
                        {
                            name: "混编测试示例",
                            url: "SyntaxCase/MixNativeCode"
                        },
                        {
                            name: "nvue语法示例",
                            url: "SyntaxCase/nvueTest"
                        }
                        ]
                    },
					{
					    name: "日志打印",
					    open: false,
					    pages: [{
					        name: "console示例",
					        url: "SyntaxCase/consoleTest"
					    }]
					},
                    {
                        name: "平台代码示例",
                        open: false,
                        pages: [{
                            name: "UTSAndroid",
                            url: "SyntaxCase/utsAndroid"
                        }, {
                            name: "UTSiOS",
                            url: "SyntaxCase/utsiOS"
                        }]
                    },
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

            /**
             * 测试延迟任务
             */
            testTimer: function() {
                doTimerTask({
                    start: function(response) {
                        uni.showToast({
                            title: response,
                            icon: 'none'
                        });
                    },
                    work: function(response) {
                        uni.showToast({
                            title: response,
                            icon: 'none'
                        });
                    },
                });
            },
            /**
             * 测试周期任务
             */
            testInterval: function() {
                var ret = doIntervalTask({
                    start: function(response) {
                        uni.showToast({
                            title: response,
                            icon: 'none'
                        });
                    },
                    work: function(response) {
                        uni.showToast({
                            title: response,
                            icon: 'none'
                        });
                    },
                });
                this.taskId = ret.taskId;
            },
            /**
             * 取消周期任务
             */
            testClearInterval: function() {
                console.log(this.taskId);
                clearIntervalTask(this.taskId);
            },
            testInputDialog() {
                getUserInput(function(res) {
                    console.log(res);
                });
            },
            testQuitApp() {
                quitApp()
            },
            testOpenFileWithProvider() {
                openFileWithProvider()
            },
            testArrayConvert() {
              let convertRet = arrayConvert()
              if(convertRet){
                uni.showToast({
                    icon: "none",
                    title: '数组转换成功'
                });
              }
            },
            testMetaRead() {
                let ret = getMetaConfig();
                uni.showToast({
                    icon: "none",
                    title: '读取成功,注意查看控制台输出'
                });
                console.log(ret);
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