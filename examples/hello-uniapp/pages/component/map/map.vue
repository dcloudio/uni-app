<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<view>
				<map :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.9085,
					longitude: 116.39747,
					iconPath: '../../../static/location@3x.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location@3x.png'
				}]
			}
		},
		methods: {

		}
	}
</script>
<style>
	map {
		width: 100%;
		height: 600upx;
	}
</style>
