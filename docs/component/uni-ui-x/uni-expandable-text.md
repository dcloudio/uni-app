::: sourceCode
## uni-expandable-text

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-expandable-text


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-expandable-text/components/uni-expandable-text

:::

按指定行数截断文本，并在文本溢出时显示展开/收起触发器。

> 本 Component 是 uni ext component，需下载插件：[uni-expandable-text](https://ext.dcloud.net.cn/plugin?id=30267)


# uni-expandable-text 折叠文本组件

可以控制文字（正文）默认显示几行，然后在下一行显示切换全文的文字按钮（trigger）。

可以通过externalClass来分别控制正文和trigger的样式。

本组件利用的是max-line和-webkit-line-clamp技术，控制最大显示行数。
本组件不适合处理长文内容底部的“阅读更多”，这种需求应该使用 (max-height) + 渐变遮罩 (Gradient Mask) + 平滑动画 的方案另行处理。

平台支持：
- App平台仅支持蒸汽模式，不支持App VDOM模式。
- Web平台仅支持蒸汽模式，不支持现网的Web VDOM模式。因Web蒸汽还未发布，目前可以视为暂不支持web平台。
- 小程序平台：支持。

差异：
- Web平台-webkit-line-clamp 在裁剪文本后会在文本后显示...省略号。
- App平台在max-line限高后，行尾不会出现...省略号。

## 示例页面路径
项目下 /pages/uni-ui/expandable-text/expandable-text.uvue 为组件使用示例页面。

## 设计

本组件在App平台利用text组件的max-line属性。在Web和小程序平台利用-webkit-line-clamp实现。

使用本组件后，不应再使用 CSS height 控制文本高度。应通过排版换行，利用本组件的line属性限制可视行数。

需要判断是否溢出，来决定是否显示trigger。当文本内容在line指定的行数内已经全部显示，就不再显示trigger，反之亦然。

但web、小程序、app，在计算正文文本是否溢出最大行数限制的逻辑不一样。

- web

利用 CSS 的 -webkit-line-clamp：通过 CSS 控制文字最大显示行数（如 line-clamp: 2）。

当应用了 line-clamp 后，元素的 clientHeight 是受限的高度，而 scrollHeight 是不换行/完整展开时的真实高度。

如果 scrollHeight > clientHeight：说明文字超出了指定的行数，确实发生了截断，此时应该显示trigger按钮。

如果 scrollHeight <= clientHeight：说明文字没有超过指定行数，没有发生截断，此时隐藏trigger按钮。

- 小程序

额外放置一个全部内容的text组件，隐藏。使用 uni.createSelectorQuery 异步测量正文text组件，和隐藏text组件对比。

小程序上无法监听组件的resizeObserver，虽然已经监听了文字变化，但组件宽度变化的需要动态显示/隐藏trigger的场景无法自动处理，
需要组件使用者调用组件的checkOverflow()方法主动检查溢出，该方法内部会判断溢出情况动态显示/隐藏trigger。

- app

额外放置一个全部内容的text组件，隐藏，尽量拍平。利用Element 的 getBoundRect 同步测量正文text组件，和隐藏text组件对比。

## 属性和方法

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 要显示的正文内容。 |
| lines | `number` | `1` | 折叠状态下最多显示的行数。 |
| inline | `boolean` | `false` | 是否以内联方式显示trigger。暂不支持。 |
| expand-text | `string` | 根据应用语言。中文下为"全文" | 展开状态下显示的文字。显式传入时优先使用传入值。 |
| collapse-text | `string` | 根据应用语言。中文下为"收起" | 收起状态下显示的文字。显式传入时优先使用传入值。 |
| text-class | `string` | `''` | 正文的 externalClass。 |
| trigger-class | `string` | `''` | 展开/收起trigger的 externalClass。 |
| show-collapse | `boolean` | `true` | 是否在展开状态下隐藏trigger。即不再收起 |

默认文案支持以下语言：简体中文（`zh-Hans`）、繁体中文（`zh-Hant`）、英语（`en`）、法语（`fr`）和拉丁语（`la`）。语言根据 `uni.getAppBaseInfo().appLanguage` 判断。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 展开或收起状态发生变化时触发 | `expanded: boolean`，`true` 表示已展开，`false` 表示已收起 |

### Expose

| 方法名 | 说明 |
| --- | --- |
| toggle() | 切换当前文本的展开状态。 |
| expand() | 展开文本。已经展开时不执行操作。 |
| collapse() | 收起文本。已经收起时不执行操作。 |
| checkOverflow() | 重新检查文本是否超出折叠行数。仅小程序端需要在文本容器宽度变化后主动调用。 |

### TODO
- inline尾部跟随未实现，text组件嵌套和max-line组合时目前有bug
- 在list-view中滚动时，未监听复用和回收事件。展开后的内容被复用后会折叠。观察微信朋友圈也如此，暂不实现此功能



### 兼容性 <Help />
Web(Vapor): 5.41; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| text | string | "" | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 要显示的文本内容。 |
| lines | number | 1 | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 折叠状态下最多显示的行数。 |
| inline | boolean | false | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 是否以内联方式显示触发器。 |
| expandText | string | "根据应用语言，中文下为\"全文\"" | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | 展开状态下显示的文字，不传时根据应用语言使用默认文案。 |
| collapseText | string | "根据应用语言，中文下为\"收起\"" | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 收起状态下显示的文字，不传时根据应用语言使用默认文案。 |
| textClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 正文的 externalClass。 |
| triggerClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 展开/收起触发器的 externalClass。 |
| showCollapse | boolean | true | Web(Vapor): x; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.31; iOS(Vapor): 5.31; HarmonyOS(Vapor): 5.31 | 是否在展开状态下显示收起触发器。 |
| @change | Event |   |   | 展开或收起状态发生变化时触发 |
| @update:expanded | Event |   |   | 展开状态的双向绑定更新事件，用于 v-model:expanded |

<!-- UTSCOMJSON.uni-expandable-text.fileFormates -->



<!-- UTSCOMJSON.uni-expandable-text.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/expandable-text/expandable-text.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/expandable-text/expandable-text.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/expandable-text/expandable-text
```uvue
<template>
	<!-- 行尾内联模式目前底层有bug，暂不启用 -->
	<!-- <uni-expandable-text
		:text="data.articleText"
		:lines="1"
		:inline="true"
		expand-text="展开"
		collapse-text="收起"
		text-class="custom-text"
		trigger-class="custom-trigger"
		style="width:100px;margin-bottom: 8px"
	/> -->
	<text class="uni-h4">空字符串</text>
	<uni-expandable-text />
	<text class="uni-h4">默认模式</text>
	<uni-expandable-text ref="expandabeltext1" :text="data.articleText" :style="data.dynamicStyle" text-class="test-default-text" trigger-class="test-default-trigger" />
	<text class="uni-h4">lines=1模式。监听change事件</text>
		<uni-expandable-text :text="data.articleText" :lines="1" @change="triggerEvent" trigger-class="test-single-line-trigger" style="wrefth:100px;" />
	<text class="uni-h4">lines=2模式。展开后不显示trigger</text>
		<uni-expandable-text :text="data.articleText" :lines="2" :show-collapse="false" trigger-class="test-no-collapse-trigger" style="width:100px;" />
	<text class="uni-h4">lines=2，自定义正文和trigger文字和样式</text>
	<uni-expandable-text
		ref="expandabeltext4"
		:text="data.articleText"
		:lines="2"
		text-class="custom-text"
		expand-text="展开"
		collapse-text="自定义收起文字"
		trigger-class="custom-trigger-bold"
		:style="'width:'+ data.dynamicWidth2 +'px'"
	/>
	<text class="uni-h4">测试动态调整文字内容、组件宽度，trigger是否正常的出现和消失</text>
	<button @click="changeArticleText" style="margin-top: 10px;">缩短显示文字内容，line行可以显示完整时不再出现trigger</button>
	<button @click="changeDynamicStyle" style="margin-top: 4px;">缩短默认模式的正文width，1行显示不全时自动出现trigger</button>
	<button @click="changeDynamicWidth" style="margin-top: 4px;">加宽最后一个组件的正文width，2行可以显示完整时不再出现trigger</button>
	<button @click="resetChange" style="margin-top: 4px;">reset上述3个修改</button>
	<text class="uni-h4">测试组件方法</text>
	<button @click="toggle" style="margin-top: 10px;">最后一个组件的toggle()</button>
	<button @click="expand" style="margin-top: 4px;">最后一个组件的expand()</button>
	<button @click="collapse" style="margin-top: 4px;">最后一个组件的collapse()</button>
	<!-- #ifdef MP -->
	<button @click="checkOverflow()" style="margin-top: 4px;">小程序无resize监听，手动检查是否溢出checkOverflow</button>
	<!-- #endif -->

</template>

<script setup lang="ts">

type Data = {
	articleText: string
	dynamicStyle: string
	dynamicWidth2: number
}

const data = reactive<Data>({
	articleText: "uni-app x 蒸汽模式。uni-app x 蒸汽模式。",
	dynamicStyle: "",
	dynamicWidth2: 100
})
const triggerEvent = (expanded: boolean) => {
	  console.log('触发change事件，当前展开状态：', expanded)
}
const changeArticleText = () => {
  data.articleText = "uni-app x 蒸汽模式。"
}
const changeDynamicStyle = () => {
  data.dynamicStyle = "width: 100px"
}
const changeDynamicWidth = () => {
  data.dynamicWidth2 = 180
}
const resetChange = () => {
	data.dynamicStyle = ""
	data.articleText = "uni-app x 蒸汽模式。uni-app x 蒸汽模式。"
	data.dynamicWidth2 = 100
}
const expandabeltext1 = ref<CallEasyMethodComponentPublicInstance | null>(null)
const expandabeltext4 = ref<CallEasyMethodComponentPublicInstance | null>(null)
// #ifdef MP
const checkOverflow = () => {
	expandabeltext1.value?.checkOverflow()
	expandabeltext4.value?.checkOverflow()
}
// #endif
const toggle = () => {
	expandabeltext4.value?.toggle()
}
const expand = () => {
	expandabeltext4.value?.expand()
}
const collapse = () => {
	expandabeltext4.value?.collapse()
}


defineExpose({
	data
})
</script>

<style>
page{
  padding: 10px;
}

/* 外部控制正文样式 */
.custom-text {
  font-size: 15px;
  color: #00aa00;
  line-height: 2em;
}

/* 外部控制展开/收起按钮样式 */
.custom-trigger {
  color: #ff5500;
  font-size: 14px;
}

.custom-trigger-bold {
  color: #007aff;
  font-weight: bold;
}
</style>

```
:::



