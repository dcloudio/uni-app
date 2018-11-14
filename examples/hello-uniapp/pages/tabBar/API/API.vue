<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class="uni-header-logo">
			<image src="../../../static/apiIndex.png"></image>
		</view>
		<view class="uni-hello-text uni-common-pb">
			以下将演示uni-app接口能力，具体属性参数详见uni-app开发文档。
		</view>
		<view class="uni-card" v-for="(list,index) in lists" :key="index">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''"
					 @click="trigerCollapse(index)">
						{{list.name}}
					</view>
					<view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" :url="item.url"
						 @click="goDetailPage(item.url)">
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
					id: 'page',
					name: '界面',
					open: false,
					pages: [{
							name: '设置界面标题',
							url: 'set-navigation-bar-title'
						}, {
							name: '页面跳转',
							url: 'navigator'
						}, {
							name: '下拉刷新',
							url: 'pull-down-refresh'
						},
						//#ifndef H5
						{
							name: '创建动画',
							url: 'animation'
						},
						{
							name: '创建绘画',
							url: 'canvas'
						},
						//#endif
						{
							name: '显示操作菜单',
							url: 'action-sheet'
						}, {
							name: '显示模态弹窗',
							url: 'modal'
						}, {
							name: '显示加载提示框',
							url: 'show-loading'
						}, {
							name: '显示消息提示框',
							url: 'toast'
						}
					]
				}, {
					id: 'device',
					name: '设备',
					open: false,
					pages: [{
							name: '获取手机网络状态',
							url: 'get-network-type'
						}, {
							name: '获取手机系统信息',
							url: 'get-system-info'
						}, {
							name: '打电话',
							url: 'make-phone-call'
						}, 
						//#ifndef H5
						{
							name: '扫码',
							url: 'scan-code'
						}, {
							name: '剪贴板',
							url: 'clipboard'
						}, 
						//#endif
						{
							name: '监听加速度传感器',
							url: 'on-accelerometer-change'
						}, {
							name: '监听罗盘数据',
							url: 'on-compass-change'
						}
						//#ifdef APP-PLUS
						, {
							name: '监听距离传感器',
							url: '/platforms/app-plus/proximity/proximity'
						}, {
							name: '监听方向传感器',
							url: '/platforms/app-plus/orientation/orientation'
						}
						//#endif
					]
				}, {
					id: 'network',
					name: '网络',
					open: false,
					pages: [{
						name: '发起一个请求',
						url: 'request'
					}, {
						name: '上传文件',
						url: 'upload-file'
					}, {
						name: '下载文件',
						url: 'download-file'
					}]
				}, {
					id: 'media',
					name: '媒体',
					open: false,
					pages: [{
						name: '图片',
						url: 'image'
					}, 
					//#ifndef H5
					{
						name: '录音',
						url: 'voice'
					}, {
						name: '背景音频',
						url: 'background-audio'
					}, 
					//#endif
					{
						name: '视频',
						url: 'video'
					}, 
					//#ifndef H5
					{
						name: '文件',
						url: 'file'
					},
					//#endif
					]
				}, {
					id: 'location',
					name: '位置',
					open: false,
					pages: [{
						name: '获取当前位置',
						url: 'get-location'
					}, {
						name: '使用地图查看位置',
						url: 'open-location'
					}, {
						name: '使用地图选择位置',
						url: 'choose-location'
					}]
				}, {
					id: 'storage',
					name: '数据',
					open: false,
					pages: [{
						name: '数据存储',
						url: 'storage'
					}]
				}, 
				//#ifndef H5
				{
					id: 'login',
					name: '登录',
					open: false,
					pages: [{
						name: '登录',
						url: 'login'
					}, {
						name: '获取用户信息',
						url: 'get-user-info'
					}]
				}, 
				{
					id: 'payment',
					name: '支付',
					open: false,
					pages: [{
						name: '发起支付',
						url: 'request-payment'
					}]
				}, 
				{
					id: 'share',
					name: '分享',
					open: false,
					pages: [{
						name: '分享',
						url: 'share'
					}]
				},
				//#endif
				//#ifdef APP-PLUS
				{
					id: 'speech',
					name: '语音',
					open: false,
					pages: [{
						name: '语音识别',
						url: '/platforms/app-plus/speech/speech'
					}]
				}, {
					id: 'push',
					name: '推送',
					open: false,
					pages: [{
						name: '推送',
						url: '/platforms/app-plus/push/push'
					}]
				},
				//#endif
			];
			return {
				lists: list
			}
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uni-app',
				path: '/pages/tabBar/API/API'
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/platforms/app-plus/about/about'
			})
		},
		methods: {
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[i].open;
					} else {
						this.lists[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
				uni.navigateTo({
					url: url
				})
			}

		}
	}
</script>

<style>
	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}
</style>
