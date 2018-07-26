<template name="page-head">
	<view class="page-head">
		<view class="page-head-title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name: "page-head",
		props: {
			title: {
				type: String,
				default: ""
			}
		}
	}
</script>
