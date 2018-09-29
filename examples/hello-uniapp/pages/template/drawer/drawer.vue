<template>
	<view>
		<view class="header">
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="icon" @tap="showRightDrawer">
				<uni-icon type="bars" color="#666666" size="22"></uni-icon>
			</view>
			<!-- #endif -->
		</view>

		<view class="page-content">
			这是抽屉式导航组件使用示例，可以指定菜单左侧或者右侧弹出（仅初始化生效），组件内部可以放置任何内容。点击页面右上角的按钮即可显示导航菜单。
		</view>
		<uni-drawer :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
			<view class="drawer-content">
				<view class="title">抽屉式导航</view>
				<view class="text">
					这是抽屉式导航组件使用示例，你可以在这里放置任何内容。关闭抽屉式导航有多种方式：1.点击本抽屉式导航之外的任意位置；2.点击如下红色按钮；
					<!-- #ifdef APP-PLUS -->
					<text>3.点击页面右上角的按钮；</text>
					<!-- #endif -->
				</view>
				<button class="button" type="warn" @tap="closeRightDrawer">关闭抽屉式导航</button>
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate uni-navigate-right" @tap="item1">
							Item1
						</view>
					</view>
					<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate uni-navigate-right" @tap="item1">
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
	.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}

	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}

	.page-content {
		padding: 15px;
		font-size: 16px;
		color: #6d6d6d;
		text-indent: 2em;
	}

	.uni-list {
		margin-top: 15px;
	}

	.drawer-content {
		padding: 15px;
	}

	.drawer-content>.title {
		font-size: 18px;
	}

	.drawer-content>.text {
		font-size: 15px;
	}

	.drawer-content>.button {
		font-size: 14px;
	}
</style>
