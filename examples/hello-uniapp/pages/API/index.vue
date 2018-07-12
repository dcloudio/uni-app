<template>
    <view class="index">
        <view class="index-hd">
            <image class="index-logo" src="../../static/apiIndex.png"></image>
            <view class="page-section-title" >以下将演示uni-app接口能力，具体属性参数详见uni-app开发文档。</view>
        </view>
        <view class="uni-card" v-for="(list,index) in lists" :key="index">
        	<view class="uni-list"  >
        		<view class="uni-list-cell uni-collapse">
        			<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''" @click="trigerCollapse(index)">
        				{{list.name}}
        			</view>
        			<view class="uni-list uni-collapse"  :class="list.open ? 'uni-active' : ''">
        				<view class="uni-list-cell" hover-class="uni-list-cell-hover"  v-for="(item,key) in list.pages" :key="key" :url="item.url" @click="goDetailPage(item.url)">
        					<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name}} </view>
        				</view>
        			</view>
        		</view>
        	</view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            let list = [{
                id: 'api',
                name: '开放接口',
                open: false,
                pages: [{
                    name: '登录',
                    url: 'login/index'
                }, {
                    name: '获取用户信息',
                    url: 'get-user-info/index'
                }, {
                    name: '发起支付',
                    url: 'request-payment/index'
                }]
            }, {
                id: 'page',
                name: '界面',
                open: false,
                pages: [{
                    name: '设置界面标题',
                    url: 'set-navigation-bar-title/index'
                }, {
                    name: '标题栏加载动画',
                    url: 'navigation-bar-loading/index'
                }, {
                    name: '页面跳转',
                    url: 'navigator/index'
                }, {
                    name: '下拉刷新',
                    url: 'pull-down-refresh/index'
                }, {
                    name: '创建动画',
                    url: 'animation/index'
                }, {
                    name: '创建绘画',
                    url: 'canvas/index'
                }, {
                    name: '显示操作菜单',
                    url: 'action-sheet/index'
                }, {
                    name: '显示模态弹窗',
                    url: 'modal/index'
                }, {
                    name: '显示消息提示框',
                    url: 'toast/index'
                }]
            }, {
                id: 'device',
                name: '设备',
                open: false,
                pages: [{
                    name: '获取手机网络状态',
                    url: 'get-network-type/index'
                }, {
                    name: '获取手机系统信息',
                    url: 'get-system-info/index'
                }, {
                    name: '打电话',
                    url: 'make-phone-call/index'
                }, {
                    name: '扫码',
                    url: 'scan-code/index'
                }, {
                    name: '监听加速度传感器',
                    url: 'on-accelerometer-change/index'
                }, {
                    name: '监听罗盘数据',
                    url: 'on-compass-change/index'
                }]
            }, {
                id: 'network',
                name: '网络',
                open: false,
                pages: [{
                        name: '发起一个请求',
                        url: 'request/index'
                    }, {
                        name: '上传文件',
                        url: 'upload-file/index'
                    }, {
                        name: '下载文件',
                        url: 'download-file/index'
                    }
                ]
            }, {
                id: 'media',
                name: '媒体',
                open: false,
                pages: [{
                    name: '图片',
                    url: 'image/index'
                }, {
                    name: '录音',
                    url: 'voice/index'
                }, {
                    name: '背景音频',
                    url: 'background-audio/index'
                }, {
                    name: '文件',
                    url: 'file/index'
                }, {
                    name: '视频',
                    url: 'video/index'
                }]
            }, {
                id: 'location',
                name: '位置',
                open: false,
                pages: [{
                    name: '获取当前位置',
                    url: 'get-location/index'
                }, {
                    name: '使用原生地图查看位置',
                    url: 'open-location/index'
                }, {
                    name: '使用原生地图选择位置',
                    url: 'choose-location/index'
                }]
            }, {
                id: 'storage',
                name: '数据',
                open: false,
                pages: [{
                    name: '数据存储',
                    url: 'storage/index'
                }]
            }]
            //#ifdef MP-WEIXIN
            let list0PushItem_WEIXIN = [{
                name: '客服消息',
                url: '/platforms/mp-weixin/custom-message/index'
            }, {
                name: '模板消息',
                url: '/platforms/mp-weixin/template-message/index'
            }]
            list[0].pages.splice(list[0].pages.length, 0, ...list0PushItem_WEIXIN)
            //#endif
            
            //#ifdef APP-PLUS
            let list0PushItem = [{ name: '分享',url: '/platforms/app-plus/share/index'}]
            list[0].pages.splice(list[0].pages.length, 0, ...list0PushItem)
            let list2PushItem = [{name: '监听距离传感器',url: '/platforms/app-plus/proximity/index'},{name: '监听方向传感器',url: '/platforms/app-plus/orientation/index'}]
            list[2].pages.splice(list[2].pages.length,0,...list2PushItem);
            let plusItem = [{
                id: 'speech',
                name: '语音',
                open: false,
                pages: [{
                    name: '语音识别',
                    url: '/platforms/app-plus/speech/index'
                }]
            }, {
                id: 'push',
                name: '推送',
                open:false,
                pages:[{
                    name: '推送',
                    url: '/platforms/app-plus/push/index'
                }]
            }]
            list.splice(list.length, 0, ...plusItem)
            //#endif
            return {
                lists: list
            }
        },
        methods: {
            trigerCollapse(e){
                for (let i = 0, len = this.lists.length; i < len; ++i) {
                    if (e === i) {
                        this.lists[i].open = !this.lists[i].open;
                    } else {
                        this.lists[i].open = false;
                    }
                }
            },
            goDetailPage(e){
                let url = ~e.indexOf('platform') ? e :'/pages/API/' + e;
                uni.navigateTo({
                    url: url
                })
            }
            
        }
    }
</script>

<style>
    @import "../../common/uni.css";
    .uni-card{
    	box-shadow: none;
    }
    .uni-list:after{
    	height: 0;
    }
    .uni-list:before{
    	height: 0;
    }
</style>
