#### checkbox-group
多项选择器，内部由多个 checkbox 组成。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|@change|EventHandle||``<checkbox-group>``中选中项发生改变是触发 change 事件，detail = {value:[选中的checkbox的value的数组]}|

#### checkbox
多选项目。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|value|String||``<checkbox>`` 标识，选中时触发 ``<checkbox-group>`` 的 change 事件，并携带 ``<checkbox>`` 的 value。|
|disabled|Boolean|false|是否禁用|
|checked|Boolean|false|当前是否选中，可用来设置默认选中|
|color|Color||checkbox的颜色，同css的color|

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/checkbox/checkbox)
 
```html
<template>
	<view>
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
			<view class="uni-title uni-common-mt">不同颜色和尺寸的checkbox</view>
			<view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />选中
					</label>
					<label>
						<checkbox value="cb" color="#FFCC33" style="transform:scale(0.7)" />未选中
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
				title: 'checkbox 复选框',
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
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
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
```
 

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/checkbox.png?t=201857)

示例代码说明：以上示例代码从hello uni-app示例中复制，涉及的css样式在hello uni-app的app.vue和uni.css中

预览H5效果：使用浏览器的手机模式访问[https://uniapp.dcloud.io/h5/pages/component/checkbox/checkbox](https://uniapp.dcloud.io/h5/pages/component/checkbox/checkbox)

**注意**
- checkbox的默认颜色，在不同平台不一样。微信小程序是绿色的，头条小程序为红色，其他平台是蓝色的。更改颜色使用color属性。
- 如需调节checkbox大小，可通过css的scale方法调节，如缩小到70%`style="transform:scale(0.7)"`
