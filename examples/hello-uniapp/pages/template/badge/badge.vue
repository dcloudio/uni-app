<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">
				有底色
			</view>
			<view style="background:#FFF; padding:20upx;">
				<uni-badge text="1"></uni-badge>
				<uni-badge text="12" type="primary"></uni-badge>
				<uni-badge text="123" type="success"></uni-badge>
				<uni-badge text="3" type="warning"></uni-badge>
				<uni-badge text="45" type="danger"></uni-badge>
				<uni-badge text="456" type="purple"></uni-badge>
			</view>
			<view class="uni-title uni-common-mt">
				无底色
			</view>
			<view style="background:#FFF; padding:20upx;">
				<uni-badge text="1" :inverted="true"></uni-badge>
				<uni-badge text="12" type="primary" :inverted="true"></uni-badge>
				<uni-badge text="123" type="success" :inverted="true"></uni-badge>
				<uni-badge text="3" type="warning" :inverted="true"></uni-badge>
				<uni-badge text="45" type="danger" :inverted="true"></uni-badge>
				<uni-badge text="456" type="purple" :inverted="true"></uni-badge>
			</view>
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
	.uni-badge{margin: 20upx;}
</style>