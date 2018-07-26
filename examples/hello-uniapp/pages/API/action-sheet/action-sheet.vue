<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="btn-area">
				<button type="default" @tap="actionSheetTap">弹出action sheet</button>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue';
	export default {
		data() {
			return {
				title: 'action-sheet'
			}
		},
		methods: {
			actionSheetTap() {
				uni.showActionSheet({
					itemList: ['item1', 'item2', 'item3', 'item4'],
					success: (e) => {
						console.log(e.tapIndex)
					}
				})
			}
		},
		components: {
			pageHead
		}
	}
</script>
