<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-center">
				<audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author"
				    :action="audioAction" controls></audio>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'audio',
				current: {
					poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
				},
				audioAction: {
					method: 'pause'
				}
			}
		}
	}
</script>