<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-body-wrapper">
				<text class="page-body-title">
					点击气泡icon打开客服消息界面
				</text>
				<view class="page-body-line">
					<contact-button size="40" session-from="weapp"></contact-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'customMessage'
			}
		}
	}
</script>
