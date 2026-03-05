## text-align



text-align 属性设置元素中文本内容的水平对齐方式。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
text-align: start | end | left | right | center | justify | match-parent;
```



### 值限制
- enum



### text-align 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| left | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 行内内容向左侧边对齐。 |
| center | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 行内内容居中。 |
| right | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 行内内容向右侧边对齐。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | left |
| uvue-web | left |

 **注意**：W3C 默认值为：start

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/text-align.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/text-align.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/text-align

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/text-align

>示例
```vue
<template>
	<view style="flex-grow: 1;">
		<view class="box">
			<text class="common" style="text-align: left;">text-align: left</text>
			<text class="common" style="text-align: center;">text-align: center</text>
			<text class="common2" style="text-align: center;">text-align: center</text>
			<text class="common" style="text-align: right;">text-align: right</text>
		</view>
    <text class="uni-title-text">拍平版本</text>
		<view class="box">
			<text class="common" style="text-align: left;" flatten>text-align: left</text>
			<text class="common" style="text-align: center;" flatten>text-align: center</text>
			<text class="common2" style="text-align: center;" flatten>text-align: center</text>
			<text class="common" style="text-align: right;" flatten>text-align: right</text>
		</view>

		<view class="uni-common-mt">
			<text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 text-align </text>
		</view>

		<view class="common-box">
			<!-- 普通版本 -->
			<view class="uni-common-mt">
				<text class="uni-title-text">text-align</text>
				<text class="uni-info">设置值: {{textAlign}}</text>
				<text class="uni-info">获取值: {{textAlignActual}}</text>
				<view class="test-box">
					<text ref="textRef" class="common-text test-text" :style="{ textAlign: textAlign }">当前 text-align: {{textAlign}}</text>
				</view>
			</view>

			<!-- 拍平版本 -->
			<view class="uni-common-mt">
				<text class="uni-title-text">拍平</text>
				<text class="uni-info">设置值: {{textAlign}}</text>
				<text class="uni-info">获取值: {{textAlignActualFlat}}</text>
				<view class="test-box">
					<text ref="textRefFlat" class="common-text test-text-flatten" :style="{ textAlign: textAlign }" flatten>当前 text-align: {{textAlign}}</text>
				</view>
			</view>
		</view>

		<view class="uni-common-mt uni-common-mb">
				<text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
				<enum-data :items="textAlignEnum" title="text-align 枚举值" @change="radioChangeTextAlign" :compact="true"></enum-data>
				<input-data :defaultValue="textAlign" title="text-align 自定义值" type="text" @confirm="inputChangeTextAlign"></input-data>
		</view>
	</view>
</template>

<script setup lang="uts">
	import { ItemType } from '@/components/enum-data/enum-data-types'

	const textAlignEnum: ItemType[] = [
		{ value: 0, name: '' },
		{ value: 1, name: 'left' },
		{ value: 2, name: 'center' },
		{ value: 3, name: 'right' }
	]

	const textAlign = ref('left')
	const textAlignActual = ref('')
	const textAlignActualFlat = ref('')
	const textRef = ref(null as UniTextElement | null)
	const textRefFlat = ref(null as UniTextElement | null)

	const getPropertyValues = () => {
		textAlignActual.value = textRef.value?.style.getPropertyValue('text-align') ?? ''
		textAlignActualFlat.value = textRefFlat.value?.style.getPropertyValue('text-align') ?? ''
	}

	const changeTextAlign = (value: string) => {
		textAlign.value = value
		textRef.value?.style.setProperty('text-align', value)
		textRefFlat.value?.style.setProperty('text-align', value)
		// 使用 nextTick 确保样式已应用后再获取值
		nextTick(() => {
			getPropertyValues()
		})
	}

	const radioChangeTextAlign = (index: number) => {
		const selectedItem = textAlignEnum.find((item): boolean => item.value === index)
		if (selectedItem != null) {
			changeTextAlign(selectedItem.name)
		}
	}

	const inputChangeTextAlign = (value: string) => {
		changeTextAlign(value)
	}

	onReady(() => {
		getPropertyValues()
	})

	defineExpose({
		radioChangeTextAlign
	})
</script>

<style>
	.common {
		width: 250px;
		font-size: 20px;
	}

  .common2 {
    min-width: 250px;
    font-size: 20px;
  }

  .common-text{
    width: 100px;
    font-size: 14px;
  }

  .box{
    height: 150px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 80px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-align)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text-align)

