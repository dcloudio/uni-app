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
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
	}

	.product-image {
		height: 330px;
		width: 330px;
	}

	.product-title {
		width: 300px;
		font-size: 32px;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.product-price {
		font-size: 28px;
		position: relative;
	}

	.product-price-original {
		color: #E80080;
	}

	.product-price-favour {
		color: #888888;
		text-decoration: line-through;
		margin-left: 10px;
	}

	.product-tip {
		position: absolute;
		right: 10px;
		background-color: #FF3333;
		color: #FFFFFF;
		padding: 0 10px;
		border-radius: 5px;
	}
</style>
