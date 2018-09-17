<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-title">
					这是load-more组件使用示例，配置loadingType改变组件状态，配置contentText改变文字内容，配置showImage改变loading时是否显示loading图标，配置color改变文字和loading图标颜色。
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">在列表中使用</view>
				<view class="list-view">
					<view class="list-item" v-for="(value,index) in list" :key="index">list - {{value}}</view>
				</view>
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
		</view>
	</view>
</template>
<script>
	import loadMore from '../../../components/load-more.vue'

	export default {
		data() {
			return {
				title: 'load-more',
				list: [],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onLoad() {
			let list = [];
			for (let i = 1; i < 11; i++) {
				list.push(i);
			}
			this.list = list;
		},
		onReachBottom() {
			if (this.loadingType !== 0) {
				return;
			}
			this.loadingType = 1;
			let list = [],
				maxItem = this.list[this.list.length - 1],
				length = maxItem + 6;
			for (let i = maxItem + 1; i < length; i++) {
				list.push(i);
			}
			setTimeout(() => {
				if (length > 26) {
					this.loadingType = 2;
					return;
				}
				this.list = this.list.concat(list);
				this.loadingType = 0;
			}, 800);
		},
		components: {
			loadMore
		}
	}
</script>

<style>
	@import "../../../common/uni.css";

	.list-view {
		padding: 0 30upx;
	}

	.list-item {
		margin: 10upx 0;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		border-radius: 10upx;
		border: 1upx solid #eee;
		text-align: center;
	}
</style>
