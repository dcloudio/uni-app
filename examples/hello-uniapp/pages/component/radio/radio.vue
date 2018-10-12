<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<view class="page-section-title">默认样式</view>
				<label class="radio">
					<radio value="r1" checked="true" />选中
				</label>
				<label class="radio">
					<radio value="r2" />未选中
				</label>
			</view>
			<view class="page-section">
				<view class="page-section-title">推荐展示样式</view>
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
							<view>
								<radio :value="item.value" checked="true" />
							</view>
							<view>{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'radio',
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				]
			}
		},
		methods: {
			radioChange: function (e) {
				console.log('radio发生change事件，携带value值为：', e.target.value)
				var items = this.items;
				for (var i = 0, len = items.length; i < len; ++i) {
					items[i].checked = items[i].value == e.target.value
				}

				this.items = items
			}
		}
	}
</script>

<style>
	.uni-list-cell {
		justify-content: flex-start
	}
</style>
