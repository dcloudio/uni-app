<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">表单组件在label内</view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkboxItems" :key="item.name">
							<view>
								<checkbox :value="item.name" :checked="item.checked"></checkbox>
							</view>
							<view>{{item.value}}</view>
						</label>
					</checkbox-group>
				</view>
			</view>
			
			<view class="uni-form-item uni-column">
				<view class="title">label用for标识表单组件</view>
				<view class="uni-list">
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
							<view>
								<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
							</view>
							<view>
								<label class="label-2-text" :for="item.name">
									<text>{{item.value}}</text>
								</label>
							</view>
						</label>
					</radio-group>
				</view>
				
			</view>

			<view class="uni-form-item uni-column">
				<view class="title">label内有多个时选中第一个</view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<label class="label-3">
							<view class="uni-list-cell uni-list-cell-pd">
								<checkbox class="checkbox-3">选项一</checkbox>
							</view>
							<view class="uni-list-cell uni-list-cell-pd">
								<checkbox class="checkbox-3">选项二</checkbox>
							</view>
							<view class="uni-link uni-center" style="margin-top:20upx;">点击该label下的文字默认选中第一个checkbox</view>
						</label>
					</checkbox-group>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'label',
				checkboxItems: [{
						name: 'USA',
						value: '美国'
					},
					{
						name: 'CHN',
						value: '中国',
						checked: 'true'
					}
				],
				radioItems: [{
						name: 'USA',
						value: '美国'
					},
					{
						name: 'CHN',
						value: '中国',
						checked: 'true'
					}
				],
				hidden: false
			}
		},
		methods: {
			checkboxChange: function (e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.checkboxItems.length; i++) {
					if (checked.indexOf(this.checkboxItems[i].name) !== -1) {
						changed['checkboxItems[' + i + '].checked'] = true
					} else {
						changed['checkboxItems[' + i + '].checked'] = false
					}
				}
			},
			radioChange: function (e) {
				var checked = e.target.value
				var changed = {}
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].name) !== -1) {
						changed['radioItems[' + i + '].checked'] = true
					} else {
						changed['radioItems[' + i + '].checked'] = false
					}
				}
			},
			tapEvent: function (e) {
				console.log('按钮被点击')
			}
		}
	}
</script>

<style>
.uni-list-cell {
	justify-content: flex-start
}
</style>
