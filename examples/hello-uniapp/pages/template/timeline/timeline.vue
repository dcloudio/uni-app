<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="">
			<view class="title">双栏时间轴</view>
			<view class="timeline" style="padding: 30upx 20upx;background-color: #fff;">
				<view class="timeline-item timeline-first-item">
					<view class="timeline-item-keynode">2018.05</view>
					<view class="timeline-item-divider"></view>
					<view class="timeline-item-content">uni-app 立项</view>
				</view>
				<view class="timeline-item">
					<view class="timeline-item-keynode">2018.07</view>
					<view class="timeline-item-divider"></view>
					<view class="timeline-item-content">uni-app 正式发布，使用vue技术，开发一次，iOS、Android、微信小程序三端同时生成</view>
				</view>
				<view class="timeline-item timeline-last-item">
					<view class="timeline-item-keynode">2018.10</view>
					<view class="timeline-item-divider"></view>
					<view class="timeline-item-content">uni-app 支持使用 npm 安装依赖，支持微信小程序自定义组件</view>
				</view>
			</view>

			<view class="title">单栏时间轴</view>
			<view class="timeline" style="padding: 30upx 20upx;background-color: #fff;">
				<view class="timeline-item timeline-first-item">
					<view class="timeline-item-divider"></view>
					<view class="timeline-item-content bottom-border">
						<view>
							uni-app 立项
						</view>
						<view class="datetime">
							2018.05
						</view>

					</view>
				</view>
				<view class="timeline-item">
					<view class="timeline-item-divider"></view>
					<view class="timeline-item-content bottom-border">
						<view>uni-app 正式发布，使用vue技术，开发一次，iOS、Android、微信小程序三端同时生成</view>
						<view class="datetime">2018.07</view>
					</view>
				</view>
				<view class="timeline-item timeline-last-item">
					<view class="timeline-item-divider"></view>
					<view class="timeline-item-content bottom-border">
						<view>uni-app 支持使用 npm 安装依赖，支持微信小程序自定义组件</view>
						<view class="datetime">2018.10</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'timeline'
			}
		}
	}
</script>

<style>
	.page {
		background: #efeff4;
	}

	.title {
		padding: 20upx;
	}

	.timeline {
		margin: 35upx 0;
		display: flex;
		flex-direction: column;
		position: relative;
	}


	.timeline-item {
		display: flex;
		flex-direction: row;
		position: relative;
		padding-bottom: 20upx;
		box-sizing: border-box;
		overflow: hidden;

	}

	.timeline-item .timeline-item-keynode {
		width: 180upx;
		flex-shrink: 0;
		box-sizing: border-box;
		padding-right: 20upx;
		text-align: right;
	}

	.timeline-item .timeline-item-divider {
		flex-shrink: 0;
		position: relative;
		width: 20upx;
		height: 20upx;
		top: 15upx;
		border-radius: 50%;
		background-color: #bbb;
	}



	.timeline-item-divider::before,
	.timeline-item-divider::after {
		position: absolute;
		left: 10upx;
		width: 1upx;
		height: 100vh;
		content: '';
		background: inherit;
	}

	.timeline-item-divider::before {
		bottom: 100%;
	}

	.timeline-item-divider::after {
		top: 100%;
	}


	.timeline-last-item .timeline-item-divider:after {
		display: none;
	}

	.timeline-first-item .timeline-item-divider:before {
		display: none;
	}

	.timeline-item .timeline-item-content {
		padding-left: 20upx;
	}
	
	.bottom-border::after{
		position: absolute;
		left:40upx;
		right: 0;
		height: 1px;
		content: '';
		background-color: #bbb;
	}
	
	.timeline-last-item .bottom-border::after{
		display: none;
	}
	
	.timeline-item-content .datetime{
		color: #CCCCCC;
	}
	
	/* 自定义节点颜色 */
	.timeline-last-item .timeline-item-divider{
		background-color: #1AAD19;
	}
	
</style>
