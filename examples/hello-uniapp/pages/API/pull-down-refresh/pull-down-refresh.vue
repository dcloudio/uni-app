<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="text" v-for="(num,index) in data" :key="index">list - {{num}}</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: '下拉刷新 + 加载更多',
				data: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0
			}
		},
		onLoad() {
			this.initData();
		},
		onUnload() {
			this.max = 0,
			this.data = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		onReachBottom() {
			console.log("onReachBottom");
			if (this.max > 40) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setDate();
			}, 300);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.initData();
		},
		methods: {
			initData(){
				setTimeout(() => {
					this.max = 0;
					this.data = [];
					let data = [];
					this.max += 10;
					for (var i = this.max - 9; i < this.max + 1; i++) {
						data.push(i)
					}
					this.data = this.data.concat(data);
					uni.stopPullDownRefresh();
				}, 300);
			},
			setDate() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
			}
		}
	}
</script>

<style>
	.text {
		margin: 16upx 0;
		width:100%;
		background-color: #fff;
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		color: #555;
		border-radius: 8upx;
	}
</style>
