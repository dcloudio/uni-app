<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="uni-helllo-text" style="margin-top:80upx;">
				这是抽屉式导航组件使用示例，可以指定菜单左侧或者右侧弹出（仅初始化生效），组件内部可以放置任何内容。
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="uni-center uni-link uni-common-mt" @tap="showRightDrawer">
				点击这里或页面右上角的按钮显示导航菜单。
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="uni-common-mt uni-btn-v">
				<button type="primary" @tap="showRightDrawer">弹出导航</button>
			</view>
			<!-- #endif -->
		</view>
		<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
			<view style="padding:30upx;">
				<view class="uni-title">抽屉式导航</view>
				<view class="uni-helllo-text">
					这是抽屉式导航组件使用示例，你可以在这里放置任何内容。
					<text>\n关闭抽屉式导航有多种方式：</text>
					<text>\n1.点击本导航之外的任意位置；</text>
					<text>\n2.点击如下红色按钮；</text>
					<!-- #ifdef APP-PLUS -->
					<text>\n3.点击页面右上角的按钮；</text>
					<!-- #endif -->
				</view>
				<view class="uni-common-mt">
					<button class="button" type="warn" @tap="closeRightDrawer">关闭抽屉式导航</button>
				</view>
				<view class="uni-list uni-common-mt">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate uni-navigate-right" @tap="item1">
							Item1
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate uni-navigate-right" @tap="item2">
							Item2
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>
<script>
	import uniDrawer from '../../../components/uni-drawer.vue';
	import uniIcon from '../../../components/uni-icon.vue';
	export default {
		components: {
			uniDrawer,
			uniIcon
		},
		data() {
			return {
				rightDrawerVisible: false
			}
		},
		methods: {
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			item1() {
				this.rightDrawerVisible = false;
				uni.showToast({
					title: 'item1'
				});
			},
			item2() {
				this.rightDrawerVisible = false;
				uni.showToast({
					title: 'item2'
				});
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			}
		},
		onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		}
	}
</script>

<style>

</style>
