---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-rate
---

::: sourceCode
## uni-rate
:::

评分组件

> 本 Component 是 uni ext component，需下载插件：[uni-rate](https://ext.dcloud.net.cn/plugin?id=27900)


评分组件，多用于购买商品后，对商品进行评价等场景

### 文件路径
项目下有一个 /pages/uni-ui/rate/rate.uvue 页面，里面演示了rate组件的各种用法。

### 设计

rate组件是投票评分使用的组件。它使用unicode字符实现，通过修改字体的样式，实现各种效果。

它分2个版本，一个版本是高性能版本，只有一层，不显示灰星，仅显示亮星，亮星不支持小数点，不能点击。适于长列表中显示。
另一个版本是普通版本，由背景灰星和前景亮星叠加而成，支持小数点，支持点击。
这2个版本通过属性full来切换。

本组件支持v-model绑定响应式数据。

rate组件有如下属性：
- full
	是否显示全部5颗星。当黄色不够5星时，是否填充灰星以达到5星的固定长度。不填充灰星性能更高
- readonly
	是否响应点击变化。full属性为false时不生效，即无灰星时一定只读
- plain
	灰星是否镂空
- star-class
	星星的样式
- star-style
	星星的样式
- star-active-class
	选中的星星的样式
- star-active-style
	选中的星星的样式

rate组件有onChange事件，事件回调中会给出点击触发的新评分值。



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 描述 |
| :- | :- | :- |
| value | number | 当前评分，取值范围 0~5 的数字 |
| modelValue | number | v-model 绑定值，支持双向绑定，优先级高于 value |
| full | boolean | 是否显示完整 5 颗星。为 true 时用灰星填充未选中位置；为 false 时仅显示亮星，性能更高但不支持点击交互 |
| readonly | boolean | 是否只读，为 true 时不响应点击评分（full 为 false 时始终只读） |
| plain | boolean | 灰星是否使用镂空样式（☆），为 false 时使用实心灰星（★） |
| starClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 灰星（未选中）的自定义样式类 |
| starStyle | string | 灰星（未选中）的内联样式 |
| starActiveClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 亮星（选中）的自定义样式类 |
| starActiveStyle | string | 亮星（选中）的内联样式 |
| @change | Event | 评分变化事件，参数为评分值，类型为 number |
| @update:modelValue | Event | v-model 绑定值变化事件，参数为评分值，类型为 number |

<!-- UTSCOMJSON.uni-rate.fileFormates -->



<!-- UTSCOMJSON.uni-rate.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/rate/rate.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/rate/rate.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/rate/rate

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/rate/rate

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 15px 15px 30px 15px;">
	<!-- #endif -->
	<!-- #ifndef APP -->
	<view style="padding: 15px 15px 30px 15px;">
	<!-- #endif -->
		<text class="desc">评分组件用于商品评价打分、服务态度评价、用户满意度等场景。\n
		高性能模式仅有一个text组件，不可修改评分，适合长列表中显示的场景。\n
		普通模式可以通过点击星星进行评分，且专门调大字号、调宽间距以适合点击。
		</text>
		
		<text class="title">只读评分文字</text>
		<text style="color: #ffca3e;">★★★★</text>
		
		<text class="title">高性能：只读，不显示灰星，不支持小数</text>
			<uni-rate :value="3.6"/>
		<text class="title">只读，显示灰星</text>
			<uni-rate full readonly/>
		<text class="title">只读，小数4.3</text>
			<uni-rate full readonly :value="4.3"/>
		<text class="title">只读，value大于5超限测试</text>
			<uni-rate full readonly :value="100"/>
		<text class="title">只读，value小于0超限测试</text>
			<uni-rate full readonly :value="-1"/>
		<text class="title">未选中的星星为镂空状态" </text>
			<uni-rate full :value="3.5" :plain="true" star-class="tap-rate-star" star-active-class="tap-rate-star" />
		<text class="title">未选中的星星为实心且响应change事件</text>
			<uni-rate full star-class="tap-rate-star" star-active-class="tap-rate-star" @change="onRateChange" />
		<text class="title">响应点击并双向绑定响应式变量</text>
			<uni-rate full v-model="data.vModelRateValue" star-class="tap-rate-star" star-active-class="tap-rate-star" />
			<text>{{data.vModelRateValue}}</text>
		<text class="title">只读，不触发change" </text>
			<uni-rate readonly :value="5" @change="onRateChange" />
		<text class="title">高性能只读，自定义大小和颜色（style方式）</text>
			<uni-rate style="font-size: 32px" star-active-style="color:red" :value="4.6" />
			<!-- 仅高性能版，因为单层，可以在组件的style属性上写作用于text的样式。但规范的写法是使用star-active-style -->
		<text class="title">高性能只读，自定义间隔letter-space（class方式）" </text>
			<uni-rate :value="4" star-active-class="star-active-class"/>
		<text class="title">自定义默认颜色和选中颜色 class方式</text>
			<uni-rate :value="3" full star-class="custom-default tap-rate-star" star-active-class="custom-selected tap-rate-star"/>
		<text class="title">自定义默认颜色和选中颜色 style方式</text>
			<uni-rate :value="3" full star-style="color:lightgreen;letter-spacing:8px" star-active-style="color:green"/>
		<text class="title">只读，程序动态赋值，不触发change</text>
			<uni-rate :value="data.rateValue" @change="onRateChange"/>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
	<!-- #ifndef APP -->
	</view>
	<!-- #endif -->
</template>
<script setup lang="uts">
	type Data = {
		vModelRateValue: number
		rateValue: number
	}

	const data = reactive<Data>({
		vModelRateValue: 0,
		rateValue: 0
	})
	let interval = 0
	
	/* onReady(() => {
		console.log(getCurrentInstance()!.proxy!.$page.$nativePage);
	}) */

	function onRateChange(value: number) {
		console.log('onRateChange received value:', value, 'type:', typeof value)
		
		// 检查值是否有效
		if (isNaN(value)) {
			console.error('Invalid value received:', value)
			uni.showToast({
				title: '无效值: ' + value,
				position: "bottom"
			})
			return
		}
		
		uni.showToast({
			title: 'rate改变:' + value,
			position: "bottom"
		})
	}

	// 动态赋值示例
	onMounted(() => {
		// 每2秒改变一次评分值
		interval = setInterval(() => {
			data.rateValue = Math.floor(Math.random() * 6) // 0-5之间的随机整数
		}, 2000)
	})

	onUnmounted(() => {
		if (interval != 0) {
			clearInterval(interval)
		}
	})

	defineExpose({
		data,
		onRateChange
	})
</script>
<style>
.desc {
	color: var(--text-color, #333333);
}
.custom-default{
	color:black
}
.custom-selected{
	color:red
}
.title{
	font-weight: bold;
	margin-top: 10px;
	color: var(--text-color, #333333);
}
.star-active-class{
	letter-spacing: 5px;
}
.tap-rate-star{
	font-size: 32px;
	letter-spacing: 8px;
}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-rate)
