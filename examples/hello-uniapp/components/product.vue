<template>
	<view class="product">
		<image class="product-image" :src="image ? image : 'http://via.placeholder.com/150x200'"></image>
		<view class="product-title">{{title}}</view>
		<view class="product-price">
			<text class="product-price-favour">￥{{originalPrice}}</text>
			<text class="product-price-original">￥{{favourPrice}}</text>
			<text class="product-tip">{{tip}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'product',
		props: ['image', 'title', 'originalPrice', 'favourPrice', 'tip']
	}
</script>

<style>
	.product {
		padding: 10upx 20upx;
		display: flex;
		flex-direction: column;
	}

	.product-image {
		height: 330upx;
		width: 330upx;
	}

	.product-title {
		width: 300upx;
		font-size: 32upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.product-price {
		font-size: 28upx;
		position: relative;
	}

	.product-price-original {
		color: #E80080;
	}

	.product-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10upx;
	}

	.product-tip {
		position: absolute;
		right: 10upx;
		background-color: #FF3333;
		color: #FFFFFF;
		padding: 0 10upx;
		border-radius: 5upx;
	}
</style>
