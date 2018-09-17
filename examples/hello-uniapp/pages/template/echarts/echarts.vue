<template>
	<div class="container">
		<view class="page-section-title" style="display: block;">
			<text>这是uni-app集成mpvue-echarts的图表示例，mpvue-echarts组件的用法参考：</text>
			<text class="navigate" @tap="goBrowser" selectable>https://github.com/F-loat/mpvue-echarts</text>
		</view>
		<view class="canvasView">
			<view class="title">饼图示例</view>
			<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" />
		</view>
		<view class="canvasView">
			<view class="title">折线图示例</view>
			<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" />
		</view>
	</div>
</template>

<script>
	import * as echarts from '../../../components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../../components/mpvue-echarts/src/echarts.vue';

	function getPieOption() {
		return {
			animation: false,
			backgroundColor: '#F8F8F8',
			color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
			series: [{
				label: {
					normal: {
						fontSize: 14
					}
				},
				type: 'pie',
				center: ['50%', '50%'],
				radius: [0, '60%'],
				data: [{
					value: 55,
					name: '北京'
				}, {
					value: 20,
					name: '武汉'
				}, {
					value: 10,
					name: '杭州'
				}, {
					value: 20,
					name: '广州'
				}, {
					value: 38,
					name: '上海'
				}],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 2, 2, 0.3)'
					}
				}
			}]
		}
	}

	function getLineOption() {
		return {
			animation: false,
			color: ['#37A2DA', '#9FE6B8'],
			legend: {
				data: ['蒸发量', '降水量']
			},
			grid: {
				x: 35,
				x2: 10,
				y: 30,
				y2: 25
			},
			calculable: false,
			xAxis: [{
				type: 'category',
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			}],
			yAxis: [{
				type: 'value',
				splitArea: {
					show: true
				}
			}],
			series: [{
				name: '蒸发量',
				type: 'line',
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			}, {
				name: '降水量',
				type: 'line',
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}]
		}
	}

	export default {
		data() {
			return {
				echarts,
				pieInit: function (canvas, width, height) {
					let pieChart = echarts.init(canvas, null, {
						width: width,
						height: height
					})
					canvas.setChart(pieChart)

					pieChart.setOption(getPieOption())
					return pieChart
				},
				lineInit: function (canvas, width, height) {
					let lineChart = echarts.init(canvas, null, {
						width: width,
						height: height
					})
					canvas.setChart(lineChart)

					lineChart.setOption(getLineOption())
					return lineChart
				}
			}
		},
		methods: {
			goBrowser() {
				// #ifdef APP-PLUS
				plus.runtime.openURL("https://github.com/F-loat/mpvue-echarts");
				// #endif
				// #ifdef MP-WEIXIN
				uni.showModal({
					content:"请复制链接在浏览器里打开",
					showCancel:false
				})
				// #endif
			}
		},
		components: {
			mpvueEcharts
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}

	.title {
		margin-left: 30upx;
		color: #8f8f94;
	}

	.container {
		padding-bottom: 30upx;
		box-sizing: border-box;
	}

	.container,
	.canvasView {
		flex: 1;
		flex-direction: column;
	}

	.navigate {
		color: #007AFF;
	}
</style>
