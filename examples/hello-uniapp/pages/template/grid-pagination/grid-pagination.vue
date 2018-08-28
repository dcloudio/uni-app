<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">循环</view>
				<switch @change="switchChange"/>
			</view>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :circular="isCircular">
			<swiper-item>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in date" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
						<image class="uni-grid-9-image" :src="item"></image>
						<text class="uni-grid-9-text">grid</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in date" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
						<image class="uni-grid-9-image" :src="item"></image>
						<text class="uni-grid-9-text">grid</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in date" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
						<image class="uni-grid-9-image" :src="item"></image>
						<text class="uni-grid-9-text">grid</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data(){
			return {
				title: 'grid',
				date: ["../../../static/c1.png", "../../../static/c2.png", "../../../static/c3.png",
					"../../../static/c4.png", "../../../static/c5.png", "../../../static/c6.png",
					"../../../static/c7.png", "../../../static/c8.png", "../../../static/c9.png"
				],
				isCircular:false
			}
		},
		methods:{
			switchChange(e){
				this.isCircular = e.detail.value;
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
	.uni-list{
		margin-bottom: 30px;
	}
	.uni-list-cell {
		justify-content: flex-start
	}
	swiper{
		height: 600px;
	}
</style>
