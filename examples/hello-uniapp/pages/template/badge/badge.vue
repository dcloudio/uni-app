<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class='title'>
			<text>有底色</text>
		</view>
		<view>
			<uni-badge text="1"></uni-badge>
			<uni-badge text="12" type="primary"></uni-badge>
			<uni-badge text="123" type="success"></uni-badge>
			<uni-badge text="3" type="warning"></uni-badge>
			<uni-badge text="45" type="danger"></uni-badge>
			<uni-badge text="456" type="purple"></uni-badge>
		</view>
		<view class='title'>
			<text>无底色</text>
		</view>
		<view>
			<uni-badge text="1" :inverted="true"></uni-badge>
			<uni-badge text="12" type="primary" :inverted="true"></uni-badge>
			<uni-badge text="123" type="success" :inverted="true"></uni-badge>
			<uni-badge text="3" type="warning" :inverted="true"></uni-badge>
			<uni-badge text="45" type="danger" :inverted="true"></uni-badge>
			<uni-badge text="456" type="purple" :inverted="true"></uni-badge>
		</view>
	</view>
</template>

<script>
	import uniBadge from "../../../components/uni-badge.vue";
	export default {
		data() {
			return {
				title: "badge"
			}
		},
		components: {
			uniBadge
		}
	}
</script>

<style>
	.page {
		padding-top: 60upx;
	}

	page {
		background: #efeff4;
	}

	.uni-badge,
	.title {
		margin: 20upx;
	}
</style>
