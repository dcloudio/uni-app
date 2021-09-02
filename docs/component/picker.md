#### picker

从底部弹起的滚动选择器。支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。

#### 普通选择器

``mode = selector``

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|range|Array / Array＜Object＞|[]|mode为 selector 或 multiSelector 时，range 有效||
|range-key|String||当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容||
|value|Number|0|value 的值表示选择了 range 中的第几个（下标从 0 开始）||
|selector-type|String|auto|大屏时UI类型，支持 picker、select、auto，默认在 iPad 以 picker 样式展示而在 PC 以 select 样式展示|H5 2.9.9+|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}||
|disabled|Boolean|false|是否禁用|快手小程序不支持|
|@cancel|EventHandle||取消选择或点遮罩层收起 picker 时触发|快手小程序不支持|

- picker在各平台的实现是有UI差异的，有的平台如百度、支付宝小程序的Android端是从中间弹出的；有的平台支持循环滚动如百度小程序；有的平台没有取消按钮如App-iOS端。但均不影响功能使用。

#### 多列选择器

``mode = multiSelector``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|vue支持，nvue自2.4起支持|√|√|x|√|√|√|√|

支付宝小程序 picker 组件不支持多列选择，可以使用 picker-view 组件替代。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|range|二维 Array / 二维 Array＜Object＞|[]|mode为 selector 或 multiSelector 时，range 有效。二维数组，长度表示多少列，数组的每项表示每列的数据，如[["a","b"], ["c","d"]]|
|range-key|String||当 range 是一个二维 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容|
|value|Array|[]|value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始）|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}|
|@columnchange|EventHandle||某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标|
|@cancel|EventHandle||取消选择时触发（快手小程序不支持）|
|disabled|Boolean|false|是否禁用（快手小程序不支持）|

**bug & tips**
- 由于 JavaScript 的限制 vue 不能观测如下方式设置 value：``this.value[0] = 0`` （[vue 注意事项](https://cn.vuejs.org/v2/guide/list.html#注意事项)），解决方式参考：[hello-uniapp 示例](https://github.com/dcloudio/hello-uniapp/commit/59264474172a591c865431d02a2a1e3583978827)
- 微信开发工具的pc模拟器有可能出现拖动数据错乱，使用真机正常

#### 时间选择器

``mode = time``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|x|

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

#### 日期选择器

``mode = date``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|x|

日期选择默认在App端和H5端（PC版Chrome以及PC版FireFox）调用的是os的原生日期选择控件，在不同平台有不同的ui表现，当配置fields参数后使用统一的展示方式。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|value|String|0|表示选中的日期，格式为"YYYY-MM-DD"||
|start|String||表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"||
|end|String||表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"||
|fields|String|day|有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI|H5、App 2.6.3+、微信小程序、百度小程序、字节跳动小程序|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}||
|@cancel|EventHandle||取消选择时触发||
|disabled|Boolean|false|是否禁用|&nbsp;|

**fields 有效值**

|值|说明|
|:-|:-|
|year|选择器粒度为年|
|month|选择器粒度为月份|
|day|选择器粒度为天|

#### 省市区选择器

``mode = region``

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|x|

- 小程序平台在引擎层面内置了省市区数据。但省市区包含大量数据，占用体积，并非所有应用都需要，且很多城市数据有自维护需求，所以在App和H5平台没有在前端内置这些数据。可以基于多列picker或picker-view，自行填充城市数据。插件市场有较多类似插件，[详见](https://ext.dcloud.net.cn/search?q=%E5%9F%8E%E5%B8%82%E9%80%89%E6%8B%A9)。注意基于多列picker方式的地区选择不能运行在支付宝小程序上，只有基于picker-view的可以全端运行。尤其推荐插件[uni-data-picker](https://ext.dcloud.net.cn/plugin?id=3796)，自带省市区的联网数据，自带懒加载。

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|value|Array|[]|表示选中的省市区，默认选中每一列的第一个值|
|custom-item|String||可为每一列的顶部添加一个自定义的项|
|@change|EventHandle||value 改变时触发 change 事件，event.detail = {value: value}|
|@cancel|EventHandle||取消选择时触发（快手小程序不支持）|
|disabled|Boolean|false|是否禁用（快手小程序不支持）|

**示例** [查看演示](https://hellouniapp.dcloud.net.cn/pages/component/picker/picker)
 
以下示例代码，来自于[hello uni-app项目](https://github.com/dcloudio/hello-uniapp)，推荐使用HBuilderX，新建uni-app项目，选择hello uni-app模板，可直接体验完整示例。
```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
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
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
    }
}
```

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/42826b40-4f30-11eb-b680-7980c8a877b8.png)

示例代码说明：以上示例代码从hello uni-app示例中复制，涉及的css样式在hello uni-app的app.vue和uni.css中

预览H5效果：使用浏览器的手机模式访问[https://hellouniapp.dcloud.net.cn/pages/component/picker/picker](https://hellouniapp.dcloud.net.cn/pages/component/picker/picker)

**注意**
- 在picker内容还在滚动时或滚动回弹动画还未结束时，点确定关闭弹出的picker，数据无法及时更新。需等待一下，或手动触停滚动再点确定。所有平台均如此

**扩展**
- uni ui提供了增强版`<uni-data-picker>`组件，详见：[https://ext.dcloud.net.cn/plugin?id=3796](https://ext.dcloud.net.cn/plugin?id=3796)
- 该组件优势如下：
  * 符合[datacom](/component/datacom)规范，只需传入data，就可以自动生成界面
  * 符合[uni-forms](https://ext.dcloud.net.cn/plugin?id=2773)，表单校验规范
  * 突破多列picker的3列限制，可以承载更多列数据
  * 选择区域面积更高更大
  * 支持多列数据分级加载，比如省市区选择，先选择省，然后动态联网加载该省的市。
  * uniCloud自带了[opendb](https://gitee.com/dcloud/opendb)表，[opendb-city-china](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-city-china)，包括全国的省市区数据。在`<uni-data-picker>`组件上可直接绑定该数据，生成全端可用的、联网懒加载的省市区选择。
  * unicloud数据库提供了[DB Schema](https://uniapp.dcloud.io/uniCloud/schema)，还提供了[schema2code](https://uniapp.dcloud.net.cn/uniCloud/schema?id=autocode)自动生成全套表单页面，包括界面、校验逻辑、提交入库。在schema中配置字段的格式，比如在用户地址表[uni-id-address](https://gitee.com/dcloud/opendb/tree/master/collection/uni-id-address)的字段`area_code`配置值域指向[opendb-city-china](https://gitee.com/dcloud/opendb/tree/master/collection/opendb-city-china)表，即可自动生成该用户地址的生成页面
