## font-weight



font-weight 属性用于设置字体的粗细程度。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
font-weight: <font-weight-absolute>{1,2};
```



### 值限制
- enum



### font-weight 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 正常粗细。与 400 等值。 |
| bold | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 加粗。与 700 等值。 |
| 400 | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 正常粗细，与 normal 等值。 |
| 500 | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Medium |
| 600 | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Semi Bold (Demi Bold) |
| 700 | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 加粗，与 bold 等值。 |


### 默认值 @default-value 
 `normal`

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)
- [loading](/component/loading.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/font-weight.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/font-weight.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/font-weight

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/font-weight

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view class="demo-box">
        <view class="common">
          <text class="common-size" style="font-weight: normal;">font-weight: normal</text>
          <text class="common-size" style="font-weight: bold;">font-weight: bold</text>
          <text class="common-size" style="font-weight: 400;">font-weight: 400</text>
          <text class="common-size" style="font-weight: 700;">font-weight: 700</text>
        </view>
        <view class="common">
          <text class="common-size" style="font-weight: normal;" flatten>font-weight: normal</text>
          <text class="common-size" style="font-weight: bold;" flatten>font-weight: bold</text>
          <text class="common-size" style="font-weight: 400;" flatten>font-weight: 400</text>
          <text class="common-size" style="font-weight: 700;" flatten>font-weight: 700</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 font-weight 测试</text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">font-weight</text>
          <text class="uni-info">设置值: {{fontWeight}}</text>
          <text class="uni-info">获取值: {{fontWeightActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-size test-text" :style="{ fontWeight: fontWeight }">当前 font-weight: {{fontWeight}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">测试拍平</text>
          <text class="uni-info">设置值: {{fontWeight}}</text>
          <text class="uni-info">获取值: {{fontWeightActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-size test-text-flatten" :style="{ fontWeight: fontWeight }" flatten>当前 font-weight: {{fontWeight}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="fontWeightEnum" title="font-weight 枚举值" @change="radioChangeFontWeight" :compact="true"></enum-data>
          <input-data :defaultValue="fontWeight" title="font-weight 自定义值" type="text" @confirm="inputChangeFontWeight"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
	import { ItemType } from '@/components/enum-data/enum-data-types'

	const fontWeightEnum: ItemType[] = [
		{ value: 0, name: '' },
		{ value: 1, name: 'normal' },
		{ value: 2, name: 'bold' },
		{ value: 3, name: '400' },
		{ value: 4, name: '500' },
		{ value: 5, name: '600' },
		{ value: 6, name: '700' }
	]

	const fontWeight = ref('normal')
	const fontWeightActual = ref('')
	const fontWeightActualFlat = ref('')
	const textRef = ref(null as UniTextElement | null)
	const textRefFlat = ref(null as UniTextElement | null)

	const getPropertyValues = () => {
		fontWeightActual.value = textRef.value?.style.getPropertyValue('font-weight') ?? ''
		fontWeightActualFlat.value = textRefFlat.value?.style.getPropertyValue('font-weight') ?? ''
	}

	const changeFontWeight = (value: string) => {
		fontWeight.value = value
		textRef.value?.style.setProperty('font-weight', value)
		textRefFlat.value?.style.setProperty('font-weight', value)
		// 使用 nextTick 确保样式已应用后再获取值
		nextTick(() => {
			getPropertyValues()
		})
	}

	const radioChangeFontWeight = (index: number) => {
		const selectedItem = fontWeightEnum.find((item): boolean => item.value === index)
		if (selectedItem != null) {
			changeFontWeight(selectedItem.name)
		}
	}

	const inputChangeFontWeight = (value: string) => {
		changeFontWeight(value)
	}

	onReady(() => {
		getPropertyValues()
	})

	defineExpose({
		radioChangeFontWeight
	})
</script>

<style>
	.common-size {
	  font-size: 20px;
	}
	.common{
	  height: 150px;
	  background-color: gray;
	  justify-content: center;
	  align-items: center;
    flex:1;
	}
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
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
- app平台 font-weight 样式不支持继承  
- app-android平台不支持任意值粗细，仅支持 normal 和 bold 两种值，大于等于 500 时按 bold （加粗）显示，小于 500 时按 normal（正常）显示
- app-android平台，部分自定义字体不支持设置 font-weight


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-weight)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.font-weight)

