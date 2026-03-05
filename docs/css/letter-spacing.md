## letter-spacing



letter-spacing 属性用于设置文本字符的间距表现，正值会导致字符分布得更远，而负值会使字符更接近。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
letter-spacing: normal | <length>;
```



### 值限制
- length



### letter-spacing 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 此间距是按照当前字体的正常间距确定的。和 0 不同的是，normal 会让用户代理调整文字之间空间来对齐文字。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | 0 |

 **注意**：W3C 默认值为：normal

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/letter-spacing.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/letter-spacing.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/letter-spacing

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/letter-spacing

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <template v-if="autoTestData.begin">
      <view>
        <text id="testText"
          :style="`letter-spacing:${letterSpacing_mix}px;`">
          uni-app 是一个使用 Vue.js
          开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、鸿蒙Next、Web（响应式）、以及各种小程序（微信/支付宝/百度/抖音/飞书/QQ/快手/钉钉/淘宝/京东/小红书）、快应用、鸿蒙元服务等多个平台。</text>
        <view style="flex-direction: row;">
          <button @click="plusLetterSpacing">+字宽</button>
          <button @click="minusLetterSpacing">-字宽</button>
        </view>
      </view>
    </template>
    <view style="flex-grow: 1;">
      <view class="box">
        <text class="common">letter-spacing</text>
        <text class="common" style="letter-spacing: 5px;">letter-spacing: 5px</text>
        <text class="common" style="letter-spacing: -2px;">letter-spacing: -2px</text>
      </view>
      <text class="uni-title-text">拍平</text>
      <view class="box">
        <text class="common">letter-spacing</text>
        <text class="common" style="letter-spacing: 5px;" flatten>letter-spacing: 5px</text>
        <text class="common" style="letter-spacing: -2px;" flatten>letter-spacing: -2px</text>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 letter-spacing 测试</text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">letter-spacing</text>
          <text class="uni-info">设置值: {{letterSpacing}}</text>
          <text class="uni-info">获取值: {{letterSpacingActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-text" :style="{ letterSpacing: letterSpacing }">当前 letter-spacing: {{letterSpacing}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{letterSpacing}}</text>
          <text class="uni-info">获取值: {{letterSpacingActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-text" :style="{ letterSpacing: letterSpacing }" flatten>当前 letter-spacing: {{letterSpacing}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="letterSpacingEnum" title="letter-spacing 枚举值" @change="radioChangeLetterSpacing" :compact="true"></enum-data>
          <input-data :defaultValue="letterSpacing" title="letter-spacing 自定义值" type="text" @confirm="inputChangeLetterSpacing"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
	import { ItemType } from '@/components/enum-data/enum-data-types'

	const letterSpacingEnum: ItemType[] = [
		{ value: 0, name: '' },
		{ value: 1, name: '0' },
		{ value: 2, name: '0px' },
		{ value: 3, name: '-2px' },
		{ value: 4, name: '2px' },
		{ value: 5, name: '5px' },
		{ value: 6, name: '10px' }
	]

	const letterSpacing = ref('0px')
	const letterSpacingActual = ref('')
	const letterSpacingActualFlat = ref('')
	const textRef = ref(null as UniTextElement | null)
	const textRefFlat = ref(null as UniTextElement | null)

	const getPropertyValues = () => {
		letterSpacingActual.value = textRef.value?.style.getPropertyValue('letter-spacing') ?? ''
		letterSpacingActualFlat.value = textRefFlat.value?.style.getPropertyValue('letter-spacing') ?? ''
	}

	const changeLetterSpacing = (value: string) => {
		letterSpacing.value = value
		textRef.value?.style.setProperty('letter-spacing', value)
		textRefFlat.value?.style.setProperty('letter-spacing', value)
		// 使用 nextTick 确保样式已应用后再获取值
		nextTick(() => {
			getPropertyValues()
		})
	}

	const radioChangeLetterSpacing = (index: number) => {
		const selectedItem = letterSpacingEnum.find((item): boolean => item.value === index)
		if (selectedItem != null) {
			changeLetterSpacing(selectedItem.name)
		}
	}

	const inputChangeLetterSpacing = (value: string) => {
		changeLetterSpacing(value)
	}

  /**
   * * * * * * * * * * * * * *
   * 自动化测试
   * * * * * * * * * * * * * *
   */
  type AutoTextData = {
    begin: boolean
  }
  const autoTestData = reactive<AutoTextData>({
    begin: false
  } as AutoTextData)

  const letterSpacing_mix = ref(1)

  function plusLetterSpacing() {
    letterSpacing_mix.value += 0.2
  }
  function minusLetterSpacing() {
    letterSpacing_mix.value -= 0.2
  }
  function getLetterSpacing() {
    const testText = uni.getElementById('testText')
    if (testText != null) {
      return parseFloat(testText.style.getPropertyValue('letter-spacing'))
    }
    return 0
  }

  defineExpose({
    autoTestData,
    getLetterSpacing,
    plusLetterSpacing,
    minusLetterSpacing
  })
  /**
   * * * * * * * * * * * * * *
   * 自动化测试 END
   * * * * * * * * * * * * * *
   */

	onReady(() => {
		getPropertyValues()
	})
</script>

<style>
	.common {
		font-size: 20px;
	}
  .box{
    height: 110px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }
  .common-text{
    font-size: 14px;
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
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/letter-spacing)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.letter-spacing)

