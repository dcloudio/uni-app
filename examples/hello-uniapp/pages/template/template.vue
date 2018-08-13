<template>
	<view class="index">
		<view class="index-hd">
			<image class="index-logo" src="../../static/templateIndex.png"></image>
			<view class="page-section-title">以下是uni-app的部分模版示例，欢迎大家积极分享更多的模版，一起完善uni-app生态。</view>
		</view>
		<view class="uni-card" v-for="(list,index) in lists" :key="index">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate" hover-class="uni-list-cell-hover" :class="[list.open ? 'uni-active' : '',list.pages ? 'uni-navigate-bottom' : 'uni-navigate-right']"
					    @click="trigerCollapse(index)">
						{{list.name}}
					</view>
					<view class="uni-list uni-collapse" v-if="list.pages" :class="list.open ? 'uni-active' : ''">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" @click="goDetailPage(item)">
							<view class="uni-list-cell-navigate uni-navigate-right"> {{item.name ? item.name : item}} </view>
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
			return {
				lists: [{
						name: '折叠面板',
						url: 'accordion'
					}, {
						name: '数字角标',
						url: 'badge'
					}, {
						name: '卡片视图',
						url: 'cardview'
					}, {
						id: 'lists',
						name: '列表',
						open: false,
						pages: [{
							name: '右侧带角标',
							url: 'list-with-badges'
						}, {
							name: '二级列表',
							url: 'list-with-collapses'
						}, {
							name: '三行列表',
							url: 'list-triplex-row'
						}]
					}, {
						name: '图文列表',
						url: 'media-list'
					},  {
						name: '商品列表',
						url: 'product-list'
					},{
						name: '九宫格',
						url: 'grid'
					}, {
						name: 'popup',
						url: 'popup'
					}, {
						name: '选项卡',
						url: 'tabbar'
					},
// 					{
// 						name: '问题反馈',
// 						url: '/platforms/app-plus/feedback/feedback'
// 					},
					{
						name: '数字选择框',
						url: 'number-box'
					}, {
						name: '列表到详情示例',
						url: 'list2detail-list'
					}
				]
			}
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uni-app',
				path: '/pages/template/template'
			}
		},
		methods: {
			trigerCollapse(e) {
				for (var i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].pages ? this.lists[i].open = !this.lists[e].open : this.goDetailPage(this.lists[i]
							.url);
					} else {
						this.lists[i].pages ? this.lists[i].open = false : "";
					}
				}
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? e : '/pages/template/' + path + '/' + path;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	@import "../../common/uni.css";
	
	.index{
		padding-bottom: 1px;
	}
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
