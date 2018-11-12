<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">默认样式</view>
			<view>
				<switch checked @change="switch1Change" />
				<switch @change="switch2Change" />
			</view>

			<view class="uni-title">推荐展示样式</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">开启中</view>
				<switch checked />
			</view>
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">关闭</view>
				<switch />
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'switch'
			}
		},
		methods: {
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function (e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			}
		}
	}
</script>

