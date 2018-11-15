<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="">
			<view class="uni-title uni-center">双栏时间轴</view>
			<view class="uni-timeline" style="padding: 30upx 20upx;background-color: #fff;">
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-keynode">2018.05</view>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">uni-app 立项</view>
				</view>
				<view class="uni-timeline-item">
					<view class="uni-timeline-item-keynode">2018.07</view>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">uni-app 正式发布，使用vue技术，开发一次，iOS、Android、微信小程序三端同时生成</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-keynode">2018.10</view>
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">uni-app 支持使用 npm 安装依赖，支持微信小程序自定义组件</view>
				</view>
			</view>

			<view class="uni-title uni-center">单栏时间轴</view>
			<view class="uni-timeline" style="padding: 30upx 20upx;background-color: #fff;">
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view>
							uni-app 立项
						</view>
						<view class="datetime">
							2018.05
						</view>
					</view>
				</view>
				<view class="uni-timeline-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view>uni-app 正式发布，使用vue技术，开发一次，iOS、Android、微信小程序三端同时生成</view>
						<view class="datetime">2018.07</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
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
	
</style>
