<template>
	<view class="index">
		<block v-for="(list, index) in lists" :key="index">
			<div class="row">
				<div class="card card-list2" v-for="(item,key) in list" @click="goDetail(item)" :key="key">
					<image class="card-img card-list2-img" :src="item.img_src"></image>
					<div class="card-num-view card-list2-num-view">
						<text class="card-num card-list2-num">{{item.img_num}}P</text>
					</div>
					<div class="card-bottm row">
						<div class="car-title-view row">
							<text class="card-title card-list2-title">{{item.title}}</text>
						</div>
						<view @click.stop="share(item)" class="card-share-view"></view>
					</div>
				</div>
			</div>
		</block>
		<text class="loadMore">{{loadMoreText}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refreshing: false,
				loadMoreText:"加载中...",
				lists: [],
				id: 0,
				fetchPageNum: 0
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: "专题：" + e.type
			})
			this.id = e.id;
			setTimeout(() => { //防止app里由于渲染导致转场动画卡顿
				this.getData();
			}, 300)
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			console.log("上拉加载刷新");
			if(this.fetchPageNum > 4){
				this.loadMoreText = "没有更多了"
				return;
			}
			this.getData();
		},
		methods: {
			getData(e) {
				uni.request({
					url: 'https://uniapp.dcloud.io/tuku/list.php?type=' + this.id,
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log("请求失败", ret)
						} else {
							if (this.refreshing && ret.data.data[0].id === this.lists[0][0].id) {
								uni.showToast({
									title: "已经最新",
									icon: "none",
								})
								this.refreshing = false;
								uni.stopPullDownRefresh()
								return;
							}
							let list = [],
								lists = [],
								data = ret.data.data;
							for (let i = 0, length = data.length; i < length; i++) {
								let index = Math.floor(i / 2);
								list.push(data[i]);
								if (i % 2 == 1) {
									lists.push(list);
									list = [];
								}
							}
							console.log("list页面得到lists", lists);
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.lists = lists;
								this.fetchPageNum = 2;
							} else {
								this.lists = this.lists.concat(lists);
								this.fetchPageNum += 1;
							}
							this.fetchPageNum += 1;
						}
					}
				});
			},
			goDetail(e) {
				uni.navigateTo({
					url: "../detail/detail?data=" + JSON.stringify(e)
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: "当前环境无分享渠道!",
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function (value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title: "uni-app模版",
							summary: e.title,
							imageUrl: e.img_src,
							href: "https://uniapp.dcloud.io",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>

</style>
