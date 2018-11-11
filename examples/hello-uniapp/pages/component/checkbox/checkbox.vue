<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">默认样式</view>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" />选中
					</label>
					<label>
						<checkbox value="cb" />未选中
					</label>
				</checkbox-group>
			</view>
		</view>
		
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				推荐展示样式
				<text>\n使用 uni-list 布局</text>
			</view>
		</view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'checkbox',
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
					}
				]
			}
		},
		methods: {
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			}
		}
	}
</script>

<style>
.uni-list-cell {
	justify-content: flex-start
}
</style>
