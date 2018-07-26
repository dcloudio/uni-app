<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-info">
					<text class="page-body-text">下拉页面加载数据</text>
				</view>
				<view class="page-body-content">
					<view class="text" v-for="(num,index) in data" :key="index">list - {{num}}</view>
					<view class="loadMore" v-if="showLoadMore">{{loadMoreText}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				title: 'on/stopPullDownRefresh',
				data: [],
				loadMoreText: "加载更多...",
				showLoadMore: false,
				max: 0
			}
		},
		onUnload() {
			this.max = 0,
			this.data = [],
			this.loadMoreText = "加载更多...",
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
			if(this.max > 40){
				this.loadMoreText = "没有更多数据了!";
				uni.showToast({
					title:"没有新内容了",
					icon:"none",
				})
				uni.stopPullDownRefresh();
				return;
			}
			setTimeout(() => {
				if(this.max === 0){
					this.setDate()
				}else{
					let data = []
					this.max += 3;
					for (var i = this.max + 1 ; i > this.max - 2; i--) {
						data.push(i)
					}
					this.data.splice(0, 0, ...data);
				}
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			setDate() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	.page-body-info {
		background-color: transparent;
	}

	.page-body-content {
		padding: 0 30px;
	}

	.text {
		margin: 16px 0;
		width: 690px;
		background-color: #fff;
		height: 90px;
		line-height: 90px;
		text-align: center;
		color: #555;
		border-radius: 8px;
	}

	.loadMore {
		text-align: center;
	}
</style>
