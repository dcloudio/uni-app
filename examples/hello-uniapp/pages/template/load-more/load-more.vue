<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-helllo-text">
				这是uni-load-more组件使用示例，配置loadingType改变组件状态，配置contentText改变文字内容，配置showImage改变loading时是否显示loading图标，配置color改变文字和loading图标颜色。
			</view>
			<view class="uni-title">在列表中使用</view>
			<view>
				<view class="list-view">
					<view class="list-item" v-for="(value,index) in list" :key="index">list - {{value}}</view>
				</view>
				<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			</view>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from '../../../components/uni-load-more.vue'

	export default {
		data() {
			return {
				title: 'uni-load-more',
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
			uniLoadMore
		}
	}
</script>

<style>
	.list-view {
		padding:10upx 0;
	}

	.list-item {
		margin: 20upx 0;
		height: 100upx;
		line-height: 100upx;
		width: 100%;
		border-radius: 10upx;
		border: 1upx solid #eee;
		text-align: center;
		background:#FFF;
	}
</style>
