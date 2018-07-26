<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="btn-area" id="buttonContainer">
				<button type="primary">页面主操作 Normal</button>
				<button type="primary" loading="true">页面主操作 Loading</button>
				<button type="primary" disabled="true">页面主操作 Disabled</button>

				<button type="default">页面次要操作 Normal</button>
				<button type="default" disabled="true">页面次要操作 Disabled</button>

				<button type="warn">警告类操作 Normal</button>
				<button type="warn" disabled="true">警告类操作 Disabled</button>

				<view class="button-sp-area">
					<button type="primary" plain="true">按钮</button>
					<button type="primary" disabled="true" plain="true">不可点击的按钮</button>

					<button type="default" plain="true">按钮</button>
					<button type="default" disabled="true" plain="true">按钮</button>

					<button class="mini-btn" type="primary" size="mini">按钮</button>
					<button class="mini-btn" type="default" size="mini">按钮</button>
					<button class="mini-btn" type="warn" size="mini">按钮</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				title: 'button'
			}
		},
		methods: {},
		components: {
			pageHead
		}
	}
</script>

<style>
	button {
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.button-sp-area {
		margin: 0 auto;
		width: 60%;
	}

	.mini-btn {
		margin-right: 10px;
	}
</style>
