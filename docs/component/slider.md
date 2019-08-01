#### slider

滑动选择器。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|min|Number|0|最小值|
|max|Number|100|最大值|
|step|Number|1|步长，取值必须大于 0，并且可被(max - min)整除|
|disabled|Boolean|false|是否禁用|
|value|Number|0|当前取值|
|activeColor|Color|各个平台不同，详见下|滑块左侧已选择部分的线条颜色|
|backgroundColor|Color|#e9e9e9|滑块右侧背景条的颜色|
|block-size|Number|28|滑块的大小，取值范围为 12 - 28				
|block-color|Color|#ffffff|滑块的颜色|
|show-value|Boolean|false|是否显示当前 value|
|@change|EventHandle||完成一次拖动后触发的事件，event.detail = {value: value}|
|@changing|EventHandle||拖动过程中触发的事件，event.detail = {value: value}|

<!-- |color|Color|#e9e9e9|背景条的颜色（请使用 backgroundColor）|
|selected-color|Color|#1aad19|已选择的颜色（请使用 activeColor）| -->
**Tips**

- activeColor默认值在不同平台不一样，微信是绿色(#1aad19)，头条是红色，其他平台是蓝色
- 如需要区间滑块，即一根横条上使用2个滑块选择一段范围，可见[插件市场](https://ext.dcloud.net.cn/search?q=%E5%8C%BA%E9%97%B4%E6%BB%91%E5%9D%97)

**示例**
 
```html
<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">设置step</view>
			<view>
				<slider value="60" @change="sliderChange" step="5" />
			</view>
			
			<view class="uni-title">显示当前value</view>
			<view>
				<slider value="50" @change="sliderChange" show-value />
			</view>
            
			<view class="uni-title">设置最小/最大值</view>
			<view>
				<slider value="100" @change="sliderChange" min="50" max="200" show-value />
			</view>
			
			<view class="uni-title">不同颜色和大小的滑块</view>
			<view>
				<slider value="50" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000" block-color="#8A6DE9" block-size="20" />
			</view>
        </view>
    </view>
</template>
```
 
```javascript
export default {
    data() {
        return {}
    },
    methods: {
        sliderChange(e) {
            console.log('value 发生变化：' + e.detail.value)
        }
    }
}

```
 
![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/slider.png?t=201857)

示例代码说明：以上示例代码从hello uni-app示例中复制，涉及的css样式在hello uni-app的app.vue和uni.css中

预览H5效果：使用浏览器的手机模式访问[https://uniapp.dcloud.io/h5/pages/component/slider/slider](https://uniapp.dcloud.io/h5/pages/component/slider/slider)