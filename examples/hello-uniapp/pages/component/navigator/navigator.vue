<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v">
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<button type="default">跳转到新页面</button>
				</navigator>
				<navigator url="redirect/redirect?title=redirect" redirect hover-class="other-navigator-hover">
					<button type="default">在当前页打开</button>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'navigator'
			}
		}
	}
</script>
