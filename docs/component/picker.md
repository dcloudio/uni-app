#### picker

从底部弹起的滚动选择器。支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。

**普通选择器**

``mode = selector``

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|range|Array / Array＜Object＞|[]|mode为 selector 或 multiSelector 时，range 有效|
|range-key|String||当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容|
|value|Number|0|value 的值表示选择了 range 中的第几个（下标从 0 开始）|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}|
|disabled|Boolean|false|是否禁用|
|@cancel|EventHandle||取消选择或点遮罩层收起 picker 时触发|

- picker在各平台的实现是有UI差异的，有的平台如百度、支付宝小程序的Android端是从中间弹出的；有的平台支持循环滚动如微信、百度小程序；有的平台没有取消按钮如App端。但均不影响功能使用。

**多列选择器**

``mode = multiSelector``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|vue支持，nvue自2.4起支持|√|√|x|√|√|√|

支付宝小程序 picker 组件不支持多列选择，可以使用 picker-view 组件替代。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|range|二维 Array / 二维 Array＜Object＞|[]|mode为 selector 或 multiSelector 时，range 有效。二维数组，长度表示多少列，数组的每项表示每列的数据，如[["a","b"], ["c","d"]]|
|range-key|String||当 range 是一个二维 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容|
|value|Array|[]|value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始）|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}|
|@columnchange|EventHandle||某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标|
|@cancel|EventHandle||取消选择时触发|
|disabled|Boolean|false|是否禁用|

**bug & tips**
- 由于 JavaScript 的限制 vue 不能观测如下方式设置 value：``this.value[0] = 0`` （[vue 注意事项](https://cn.vuejs.org/v2/guide/list.html#注意事项)），解决方式参考：[hello-uniapp 示例](https://github.com/dcloudio/hello-uniapp/commit/59264474172a591c865431d02a2a1e3583978827)
- 微信开发工具的pc模拟器有可能出现拖动数据错乱，使用真机正常

**时间选择器**

``mode = time``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

- 时间选择在App端调用的是os的原生时间选择控件，在不同平台有不同的ui表现

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|value|String||表示选中的时间，格式为"hh:mm"||
|start|String||表示有效时间范围的开始，字符串格式为"hh:mm"|App 不支持|
|end|String||表示有效时间范围的结束，字符串格式为"hh:mm"|App 不支持|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}||
|@cancel|EventHandle||取消选择时触发||
|disabled|Boolean|false|是否禁用|&nbsp;|

**日期选择器**

``mode = date``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

- 日期选择在App端调用的是os的原生日期选择控件，在不同平台有不同的ui表现。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|value|String|0|表示选中的日期，格式为"YYYY-MM-DD"||
|start|String||表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"||
|end|String||表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"||
|fields|String|day|有效值 year,month,day，表示选择器的粒度|H5、App 2.6.3+、微信小程序、百度小程序、字节跳动小程序|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}||
|@cancel|EventHandle||取消选择时触发||
|disabled|Boolean|false|是否禁用|&nbsp;|

**fields 有效值**

|值|说明|
|:-|:-|
|year|选择器粒度为年|
|month|选择器粒度为月份|
|day|选择器粒度为天|

**省市区选择器**

``mode = region``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|

- 因省市区选择器包含大量数据，占用体积，并非所有应用都需要，且很多城市数据有自维护需求，所以在App和H5平台没有内置。可以基于多列picker或picker-view，自行填充城市数据，插件市场有较多类似插件，[详见](https://ext.dcloud.net.cn/search?q=%E5%9F%8E%E5%B8%82%E9%80%89%E6%8B%A9)。注意基于多列picker方式的地区选择不能运行在支付宝小程序上，只有基于picker-view的可以全端运行。这些插件中，比较推荐的是[SimpleJalon的地址联动选择插件](https://ext.dcloud.net.cn/plugin?id=1084)，它可以同时兼容app-nvue、app-vue、h5、及各端小程序。

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|value|Array|[]|表示选中的省市区，默认选中每一列的第一个值|
|custom-item|String||可为每一列的顶部添加一个自定义的项|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}|
|@cancel|EventHandle||取消选择时触发|
|disabled|Boolean|false|是否禁用|

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/picker/picker)
 
```html
<template>
	<view>
		<view class="uni-title uni-common-pl">地区选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="uni-title uni-common-pl">时间选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="uni-title uni-common-pl">日期选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>
```
```javascript
export default {
    data() {
        const currentDate = this.getDate({
            format: true
        })
        return {
            title: 'picker',
            array: ['中国', '美国', '巴西', '日本'],
            index: 0,
            date: currentDate,
            time: '12:01'
        }
    },
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods: {
        bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value
        },
        bindDateChange: function(e) {
            this.date = e.target.value
        },
        bindTimeChange: function(e) {
            this.time = e.target.value
        },
        getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
    }
}
```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/picker.png?t=201857)

示例代码说明：以上示例代码从hello uni-app示例中复制，涉及的css样式在hello uni-app的app.vue和uni.css中

预览H5效果：使用浏览器的手机模式访问[https://uniapp.dcloud.io/h5/pages/component/picker/picker](https://uniapp.dcloud.io/h5/pages/component/picker/picker)

**注意**
- 在picker内容还在滚动时或滚动回弹动画还未结束时，点确定关闭弹出的picker，数据无法及时更新。需等待一下，或手动触停滚动再点确定。所有平台均如此
- 如果需要在PC端使用`picker`，需注意pc端没有touchmove事件，可以配置[H5模版](https://uniapp.dcloud.io/collocation/manifest?id=h5-template)，并引入[touch-emulator.js](https://github.com/dcloudio/touchemulator)来解决。hello uni-app的pc版也是使用了这个方案。
