<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-card">
			<view class="uni-list">
				<block v-for="(list,index) in lists" :key="index">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
							{{list.title}}
						</view>
						<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
							<swiper v-if="list.type === 'swiper'" autoplay="true" indicator-dots="true" circular="true" style="height: 400px;">
								<swiper-item v-for="(img,key) in imgUrls" :key="key">
									<image :src="img" style="height: 400px;"/>
								</swiper-item>
							</swiper>
							<view v-if="list.type === 'font'" class="page-pd">
								<view class="size-5">hello uni-app</view>
								<view class="size-4">hello uni-app</view>
								<view class="size-3">hello uni-app</view>
								<view class="size-2">hello uni-app</view>
								<view class="size-1">hello uni-app</view>
							</view>
							<view v-if="list.type === 'list'">
								<view class="uni-list">
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
									</view>
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
									</view>
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data: {
			title: 'accordion',
			lists: [{
					title: "图片轮播",
					type: 'swiper',
					show: false
				},
				{
					title: "列表",
					type: 'list',
					show: false
				},
				{
					title: "文字排版",
					type: 'font',
					show: false
				}
			],
			imgUrls: [
				'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
				'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
				'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'
			]
		},
		methods: {
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].show = !this.lists[i].show;
					} else {
						this.lists[i].show = false;
					}
				}
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	@import "../../../common/uni.css";

	.page {
		padding-top: 60px;
	}

	page {
		background: #efeff4;
	}

	.list-collapse {
		padding-left: 36px;
		box-sizing: border-box;
	}

	image {
		width: 100%;
	}

	.page-pd {
		padding: 36px;
	}

	.size-5 {
		font-size: 50px;
	}

	.size-4 {
		font-size: 40px;
	}

	.size-3 {
		font-size: 30px;
	}

	.size-2 {
		font-size: 20px;
	}

	.size-1 {
		font-size: 10px;
	}
</style>
