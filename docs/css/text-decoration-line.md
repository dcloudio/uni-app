## text-decoration-line



text-decoration-line 属性用于设置元素中文本的修饰线类型。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
text-decoration-line: none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error;
```



### 值限制
- enum



### text-decoration-line 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| underline | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在文本的下方有一条修饰线。 |
| line-through | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 有一条贯穿文本中间的修饰线。 |
| overline | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 在文本的上方有一条修饰线。 |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 表示没有文本修饰效果。 |


### 默认值 @default-value 
 `none`

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/text-decoration-line.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/text-decoration-line.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/text-decoration-line

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/text-decoration-line

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view class="content">
        <text style="text-decoration-line: underline;">text-decoration-line: underline 下划线 底部易重叠字符：,.9pQqyzgj;\{}[]</text>
        <text style="text-decoration-line: line-through;">text-decoration-line: line-through 删除线 较多文字测试换行和裁剪效果</text>
      </view>
      <view class="content">
        <text style="text-decoration-line: underline;" flatten>text-decoration-line: underline flatten</text>
        <text style="text-decoration-line: line-through;" flatten>text-decoration-line: line-through flatten</text>
      </view>
      <view class="content">
        <text class="common" style="text-decoration-line: underline;color: blue;text-overflow: ellipsis;width: 200px;white-space: nowrap;">下划线颜色和ellipsis组合</text>
        <text class="common" style="text-decoration-line: line-through;color: blue;text-overflow: ellipsis;width: 200px;white-space: nowrap;">删除线颜色和ellipsis组合</text>
      </view>
      <view style="background-color: gray;justify-content: center;align-items: center;margin-bottom: 16px;">
        <text class="common" style="text-decoration-line: underline;color: blue;" flatten>text-decoration-line: underline 自适应宽高且拍平</text>
        <text class="common" style="text-decoration-line: line-through;color: blue;" flatten>text-decoration-line: line-through 自适应宽高且拍平</text>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 text-decoration-line </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">text-decoration-line</text>
          <text class="uni-info">设置值: {{textDecorationLine}}</text>
          <text class="uni-info">获取值: {{textDecorationLineActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="common test-text" :style="{ textDecorationLine: textDecorationLine }">当前 text-decoration-line: {{textDecorationLine}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{textDecorationLine}}</text>
          <text class="uni-info">获取值: {{textDecorationLineActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common test-text-flatten" :style="{ textDecorationLine: textDecorationLine }" flatten>当前 text-decoration-line: {{textDecorationLine}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="textDecorationLineEnum" title="text-decoration-line 枚举值" @change="radioChangeTextDecorationLine" :compact="true"></enum-data>
          <input-data :defaultValue="textDecorationLine" title="text-decoration-line 自定义值" type="text" @confirm="inputChangeTextDecorationLine"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
	import { ItemType } from '@/components/enum-data/enum-data-types'

	const textDecorationLineEnum: ItemType[] = [
		{ value: 0, name: '' },
		{ value: 1, name: 'none' },
		{ value: 2, name: 'underline' },
		{ value: 3, name: 'line-through' }
	]

	const textDecorationLine = ref('none')
	const textDecorationLineActual = ref('')
	const textDecorationLineActualFlat = ref('')
	const textRef = ref(null as UniTextElement | null)
	const textRefFlat = ref(null as UniTextElement | null)

	const getPropertyValues = () => {
		textDecorationLineActual.value = textRef.value?.style.getPropertyValue('text-decoration-line') ?? ''
		textDecorationLineActualFlat.value = textRefFlat.value?.style.getPropertyValue('text-decoration-line') ?? ''
	}

	const changeTextDecorationLine = (value: string) => {
		textDecorationLine.value = value
		textRef.value?.style.setProperty('text-decoration-line', value)
		textRefFlat.value?.style.setProperty('text-decoration-line', value)
		// 使用 nextTick 确保样式已应用后再获取值
		nextTick(() => {
			getPropertyValues()
		})
	}

	const radioChangeTextDecorationLine = (index: number) => {
		const selectedItem = textDecorationLineEnum.find((item): boolean => item.value === index)
		if (selectedItem != null) {
			changeTextDecorationLine(selectedItem.name)
		}
	}

	const inputChangeTextDecorationLine = (value: string) => {
		changeTextDecorationLine(value)
	}

	onReady(() => {
		getPropertyValues()
	})

	defineExpose({
		radioChangeTextDecorationLine
	})
</script>

<style>
	.common {
		font-size: 20px;
	}
  .content {
    width: 200px;
    height: 100px;
    background-color: gray;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
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

#### App平台差异
+ text-decoration-line 样式不支持继承
+ App平台仅支持 underline 和 line-through 样式修饰线


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-decoration-line)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text-decoration-line)

