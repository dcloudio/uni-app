---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-badge-view
---

::: sourceCode
## uni-badge-view
:::

数字角标（徽章）组件

> 本 Component 是 uni ext component，需下载插件：[uni-badge-view](https://ext.dcloud.net.cn/plugin?id=27844)


badge角标，可以用于显示红点、被红圈或其他颜色圈包裹的数字、文字。提醒用户此时有需要注意的新信息。

### 文件路径
项目下有一个 /pages/uni-ui/badge/badge.uvue 页面，里面演示了badge组件的各种用法。

### 设计
#### badge组件有多种用法：
1. 独立显示
	如果没有slot内容，视为要显示独立的红点和数字，此时不是角标，就是普通的红点和圆背景数字。
	在按钮或列表项的右侧，独立显示数字。也可以显示红点，但这种场景数字更多一些。

2. 作为一个容器组件，包含一个slot，在包裹内容的右上角显示一个角标view。
	badge组件包裹一个目标view时，badge组件内部的角标view的中心点位于目标view的右上角顶点。
	此时角标view是通过transform位移到右上角的，实际内容已经超出了容器本身。
	所以需要注意容器的父级的设置，留出超出容器的尺寸（即top和right边距需要留出角标view的高度和宽度的一半），避免被父级裁剪。

#### badge的text属性的用法：
在badge作为容器组件时，text属性的不同设置，可以代表不同的效果。具体见属性章节。

#### 样式自定义
badge组件的badge-class和badge-style属性，直接作用在角标view上，可以修改角标view的样式。

角标view本质是一个text组件，可以覆盖前景、背景、位置等各种样式。

#### badge组件有如下属性：
- text
	类型为 string|null
	* 值为"0"时，不显示角标；所以永远不会显示一个为0的角标。此时直接显示slot子内容，不包裹外层，减少层级，提高性能；
	* 值为null或""时，代表一个长宽为8px的红色圆点；
	* 否则显示为该文字内容的圆角红底圈套文字。
- badge-class
	直接作用于角标view的class
- badge-style
	直接作用于角标view的style



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.08 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| text | string | "" | badge 的内容。为 "0" 时不显示 badge；为空字符串时显示圆点；有文字则显示文字 |
| badgeStyle | string | "" | badge 的内联样式，用于覆盖内置 style |
| badgeClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | badge 的样式类，用于覆盖内置 class |
| alwaysWrapWithContent | boolean | false | 当有 slot 内容时，即使 text 为 "0" 也保留包裹层（badge-wrap），避免多个子 slot 时 flex 方向错乱 |

<!-- UTSCOMJSON.uni-badge-view.fileFormates -->



<!-- UTSCOMJSON.uni-badge-view.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/badge-view/badge-view.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/badge-view/badge-view.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/badge-view/badge-view

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/badge-view/badge-view

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1;padding: 20px 5px 5px;">
	<!-- #endif -->
	<!-- #ifndef APP -->
	<view style="padding: 20px 5px 5px;">
	<!-- #endif -->
	<uni-badge-view text="99+" >
		<view style="width: 50px; height: 20px; background-color: green;"></view>
	</uni-badge-view>
	<!-- TODO 上面被注掉的代码，在Android上顶部被裁剪，但web上角标上部可以露出来不少，没有拉齐表现 -->
		<text class="page-title">Badge 组件演示</text>
		<!-- 动态badge -->
		<view style="margin-bottom: 20px;">
			<text class="label">badge动态设置text属性：</text>
			<text class="label" style="margin-bottom: 10px;">输入0不显示badge，空字符串显示红点，输入其他显示文字</text>
			<input
				v-model="data.dynamicBadgeText"
				placeholder="输入badge text属性"
				class="demo-input"
			/>
			<uni-badge-view :text="data.dynamicBadgeText" >
				<view style="width: 20px;height: 20px;background-color: green;"></view>
			</uni-badge-view>
		</view>

		<!-- 不显示badge -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">不显示badge：</text>
			<uni-badge-view text="0">
				<view style="width: 20px;height: 16px;background-color: green;"></view>
			</uni-badge-view>
		</view>
		
		<!-- 不包裹内容 -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">不包裹内容的圆点：</text>
			<uni-badge-view text="">
			</uni-badge-view>
		</view>
		
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">不包裹内容的文字：</text>
			<uni-badge-view text="1" badge-style="align-self:flex-start;"/> <!-- 在flex方向为竖时，默认横向拉伸，需要设flex-start避免 -->
		</view>

		<!-- 文字样式 -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">文字样式：</text>
			<uni-badge-view text="3" >
				<view style="width: 80px;">
					<text class="label">20px区域</text>
				</view>
			</uni-badge-view>
		</view>

		<!-- text为99+ -->
		<view style="margin-bottom: 10px;overflow: visible;"> <!--  添加 overflow: visible 兼容内部宽度不够使角标被裁剪 -->
			<text class="label" style="margin-bottom: 10px;">99+是自己写的，不会自动计算max</text>
			<uni-badge-view text="99+" >
				<view style="width: 80px; background-color: #6c757d; ">
					<text style="color: white;">50px区域</text>
				</view>
			</uni-badge-view>
		</view>
		
		<uni-badge-view text="99+" >
			<view style="width: 10px; height: 20px; background-color: green;"></view>
		</uni-badge-view>

		<!-- 文字样式自定义badge-class -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">自定义badge-class（绿色badge）：</text>
			<uni-badge-view text="NEW" badge-class="custom-badge-text">
				<view style="height: 20px; background-color: #ffc107; ">
					<text>20px区域</text>
				</view>
			</uni-badge-view>
		</view>

		<!-- 文字样式自定义badge-style -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">自定义样式badge-style（紫色badge）：</text>
			<uni-badge-view text="HOT" badge-style="background-color: #6f42c1; color: yellow;">
				<view style="height: 20px; background-color: #dc3545; ">
					<text style="color: white;">20px区域</text>
				</view>
			</uni-badge-view>
		</view>

		<!-- 红点样式 -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">红点默认样式：</text>
			<uni-badge-view>
				<button size="mini">按钮</button>
			</uni-badge-view>
		</view>

		<!-- 空文字测试 -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">空文字（红点模式）：</text>
			<uni-badge-view text="">
				<view style="height: 20px; background-color: #17a2b8; border-radius: 4px; ">
					<text style="color: white;">20px区域</text>
				</view>
			</uni-badge-view>
		</view>


		<!-- 红点自定义badge-class -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">dot自定义badge-class（绿色badge）：</text>
			<uni-badge-view badge-class="custom-badge-dot">
				<view style="height: 20px; background-color: #ffc107; ">
					<text>20px区域</text>
				</view>
			</uni-badge-view>
		</view>

		<!-- 红点自定义badge-style -->
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">dot自定义badge-style（紫色badge）：</text>
			<uni-badge-view badge-style="background-color: #6f42c1;">
				<view style="height: 20px; background-color: #dc3545; ">
					<text style="color: white;">20px区域</text>
				</view>
			</uni-badge-view>
		</view>
		
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">按钮中badge文字：</text>
			<!-- <button size="mini">按钮<uni-badge-view text="9"/></button> -->
			<!-- TODO Android的button不支持子组件，上述badge样式错乱。先遗留，等button用前端重构-->
			<view	style="width: 150px; height: 30px; background-color: lightgray; border-radius: 4px; align-items: center; justify-content: center;flex-direction: row;">
				<text>按钮&nbsp;</text>
				<uni-badge-view text="9"/>
				<!-- 
				 上面加style="padding-top: 5px;" 会导致vue报错：
				 [Vue warn]: Extraneous non-props attributes (style) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. \n at <UniBadgeView>\nat <View>\nat <View>\nat <View>\nat <Badge>\nat <AsyncComponentWrapper>\nat <PageBody>\nat <Page>\nat <Anonymous>\nat <Layout>\nat <App>
				 app不报错。app也应该报错。
				 本质是因为多根节点，不知道把style属性绑定到哪个根节点，需要指定，在组件的每个根节点上使用v-bind="$attrs"绑定所有属性过去
				 -->
			</view>
		</view>
		
		<view style="margin-bottom: 10px;">
			<text class="label" style="margin-bottom: 10px;">按钮中badge红点：</text>
			<view	style="width: 150px; height: 30px; background-color: lightgray; border-radius: 4px; align-items: center; justify-content: center;flex-direction: row;">
				<text>按钮&nbsp;</text>
				<uni-badge-view/>
			</view>
		</view>

	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
	<!-- #ifndef APP -->
	</view>
	<!-- #endif -->
</template>

<script setup lang="uts">
type Data = {
	dynamicBadgeText: string
}

const data = reactive<Data>({
	dynamicBadgeText: "0"
})

/* onReady(() => {
	console.log((getCurrentInstance()!.proxy!.$page as BasePage).$nativePage!.getDomJson());
}) */

defineExpose({
	data
})
</script>

<style>
	.page-title {
		font-size: 18px;
		font-weight: bold;
		color: var(--text-color, #333333);
		margin-bottom: 20px;
	}

	.label {
		color: var(--text-color, #333333);
	}

	.demo-input {
		border-width: 1px;
		border-style: solid;
		border-color: var(--border-color, rgba(0, 0, 0, 0.06));
		border-radius: 4px;
		width: 200px;
		height: 24px;
		padding-left: 2px;
		color: var(--text-color, #333333);
	}

	.custom-badge-text {
		background-color: #28a745;
		color: black;
	}
	
	.custom-badge-dot {
		background-color: #28a745;
		width: 16px;
		height: 16px;
		border-radius: 16px;
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-badge-view)
