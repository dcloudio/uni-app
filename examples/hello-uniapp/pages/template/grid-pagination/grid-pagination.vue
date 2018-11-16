<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-list" style="margin-top:30px;">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">循环</view>
				<switch @change="switchChange"/>
			</view>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :circular="isCircular">
			<swiper-item>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
						<image class="uni-grid-9-image" :src="item"></image>
						<text class="uni-grid-9-text">grid</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
						<image class="uni-grid-9-image" :src="item"></image>
						<text class="uni-grid-9-text">grid</text>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="uni-grid-9">
					<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
						<image class="uni-grid-9-image" :src="item"></image>
						<text class="uni-grid-9-text">grid</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				title: 'grid',
				grids: ["../../../static/c1.png", "../../../static/c2.png", "../../../static/c3.png",
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
		}
	}
</script>

<style>
	.uni-list{
		margin-bottom: 30upx;
	}
	.uni-list-cell {
		justify-content: flex-start
	}
	swiper{
		height: 680upx;
		background:#f2f2f2;
	}
</style>
