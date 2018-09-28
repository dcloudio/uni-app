<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell-divider">
					右侧带箭头
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						Item1
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						Item2
					</view>
				</view>
				<view class="uni-list-cell-divider">
					右侧带数字角标
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						Item2
						<uni-badge text="1" type="danger"></uni-badge>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						Item1
						<uni-badge text="123" type="success"></uni-badge>
					</view>
				</view>
				<view class="uni-list-cell-divider">
					右侧带数字角标+箭头
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						Item1
						<uni-badge text="123" type="success"></uni-badge>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						Item2
						<uni-badge text="12" type="primary"></uni-badge>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "../../../components/uni-badge.vue";
	export default {
		data() {
			return {
				title: 'list-with-badges'
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
</style>
