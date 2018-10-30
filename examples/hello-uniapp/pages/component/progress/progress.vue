<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<view class="progress-box">
					<progress percent="20" show-info stroke-width="3" />
				</view>
				<view class="progress-box">
					<progress percent="40" active stroke-width="3" />
					<uni-icon type="close" class="progress-cancel" color="#dd524d"></uni-icon>
				</view>
				<view class="progress-box">
					<progress percent="60" active stroke-width="3" />
				</view>
				<view class="progress-box">
					<progress percent="80" color="#10AEFF" active stroke-width="3" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
    import uniIcon from '../../../components/uni-icon.vue'
	export default {
		data() {
			return {
				title: 'progress'
			}
		},
        components: {
        	uniIcon
        },
	}
</script>

<style>
	progress {
		width: 100%;
	}

	.progress-box {
		display: flex;
		height: 50upx;
		margin-bottom: 60upx;
	}

	.progress-cancel {
		margin-left: 40upx;
	}
</style>
