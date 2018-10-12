<template>
	<view class="page">
		<view class="img-view" v-if="!showSwiper">
			<image :src="imgUrls[0]"></image>
		</view>
		<swiper v-if="showSwiper" indicator-dots="true">
			<swiper-item v-for="(img,key) in imgUrls" :key="key">
				<image :src="img" />
			</swiper-item>
		</swiper>
		<view class="page-section">
			<view class="page-section-title">
				<view>在App端默认为标题栏透明，当用户向下滚动时，标题栏逐渐由透明转变为不透明；当用户再次向上滚动时，标题栏又从不透明变为透明状态。</view>
				<view>在微信小程序端，导航栏始终为不透明样式。</view>
			</view>
			<view class="page-section-title">图片类型</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="index">
						<view>{{item.name}}</view>
						<view>
							<radio :value="item.value" :checked="item.checked" />
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view style="height: 1000upx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSwiper: false,
				imgUrls: [
					"../../../static/shuijiao.jpg",
					"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
					"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
				],
				items: [{
						value: "img",
						name: '静态图',
						checked: true
					},
					{
						value: "swiper",
						name: '轮播图',
						checked: false
					}
				]
			}
		},
		methods: {
			radioChange(e) {
				this.showSwiper = e.detail.value === "swiper";
			}
		}
	}
</script>

<style>
	image,
	swiper,
	.img-view {
		width: 750upx;
		height: 500upx;
	}
	.page-section-title{
		margin-top: 50upx;
	}
</style>
