#### radio-group

单项选择器，内部由多个 ``<radio>`` 组成。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|@change|EventHandle||``<radio-group>`` 中的选中项发生变化时触发 change 事件，event.detail = {value: 选中项radio的value}|

#### radio

单选项目。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|value|String||``<radio>`` 标识。当该 ``<radio>`` 选中时，``<radio-group>`` 的 change 事件会携带 ``<radio>`` 的 value|
|checked|Boolean|false|当前是否选中|
|disabled|Boolean|false|是否禁用|
|color|Color||radio的颜色，同css的color|

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/radio/radio)
 
```html
<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="uni-title">默认样式</view>
			<view>
				<label class="radio"><radio value="r1" checked="true" />选中</label>
				<label class="radio"><radio value="r2" />未选中</label>
			</view>
		</view>
		<view class="uni-title uni-common-mt uni-common-pl">推荐展示样式</view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</radio-group>
		</view>
	</view>
</template>
```
```javascript
export default {
    data() {
        return {
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
            ],
            current: 0
        }
    },
    methods: {
        radioChange: function(evt) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].value === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        }
    }
}
```
 
![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/radio.png?t=201857)

示例代码说明：以上示例代码从hello uni-app示例中复制，涉及的css样式在hello uni-app的app.vue和uni.css中

预览H5效果：使用浏览器的手机模式访问[https://uniapp.dcloud.io/h5/pages/component/radio/radio](https://uniapp.dcloud.io/h5/pages/component/radio/radio)

**注意**
- radio的默认颜色，在不同平台不一样。微信小程序是绿色的，字节跳动小程序为红色，其他平台是蓝色的。更改颜色使用color属性。
- 如需调节radio大小，可通过css的scale方法调节，如缩小到70%`style="transform:scale(0.7)"`
- radio不是checkbox，点击一个已经选中的radio，不会将其取消选中