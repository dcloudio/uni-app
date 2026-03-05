## white-space



white-space 属性用于设置如何处理元素中的空白字符（空格、换行符、制表符）以及文本是否自动换行。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 4.0 | 4.11 | 4.61 | 5.0 |




### 语法
```
white-space: normal | pre | nowrap | pre-wrap | pre-line | break-spaces | [ <'white-space-collapse'> || <'text-wrap'> || <'white-space-trim'> ];
```



### 值限制
- enum



### white-space 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 换行符（\n）当做空白符处理，连续的多个空白字符会合并为一个空格，文本遇到边界会自动换行，行末空白字符移除。 |
| nowrap | Web: 4.0; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 换行符（\n）当做空白符处理，连续的多个空白字符会合并为一个空格，文本遇到边界不会自动换行，行末空白字符移除。 |
| pre | Web: 4.0; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 换行符（\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界不会自动换行，行末空白字符保留。 |
| pre-wrap | Web: 4.0; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 换行符（\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界会自动换行，行末空白字符保留但“不占位置”。 |
| pre-line | Web: 4.0; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 换行符（\n）保留并换行显示，连续的多个空白字符会合并为一个空格，文本遇到边界会自动换行，行末空白字符移除。 |
| break-spaces | Web: 4.0; Android: 4.81; iOS: 4.81; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 换行符（\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界会自动换行，行末空白字符换行处理。 |
| keep | Web: x; Android: 5.0; iOS: 5.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 不对空白字符处理，保持原始值。换行符（\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界会自动换行，行末空白字符保留。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | keep |
| uvue-web | pre-line |

 **注意**：W3C 默认值为：normal

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)



### 注意@tips
#### 空白字符处理不止由white-space属性决定
对于写在模板中的text组件中的空白字符，在编译阶段，会由编译器先行处理。另外text组件的space属性也会干扰空白字符处理。规则[详见](../component/text.md#空白字符)。

uni-app x中有text组件，这是一个web没有的组件。且uni-app x在非web平台，包括小程序平台，都不支持<br>换行，所以uni-app x设计为text组件中的`\n`默认不会忽略，而是换行。
不管app平台默认值keep，还是web平台默认值pre-line，都是这个表现。

#### HBuilderX5.0版本调整  
app平台、web平台调整了 white-space 属性的实现。之前接近小程序的表现，之后按 W3C 标准规范执行。同时为了text组件性能考虑， app 平台新增支持 `keep` 属性值，且默认为 `keep`。

**默认值调整**
- app-android、app-ios平台新增支持取值 `keep`，默认值由 `normal` 调整为 `keep`  
- app-harmony平台蒸汽模式（Vapor）支持取值 `keep`，默认值为 `keep`  
- web平台平台，默认值由 `normal' 调整为 pre-line

**调整前实现规范**  
- normal（与调整后的pre-line效果一致）  
  换行符（\\n）保留并换行显示，连续的多个空白字符会合并为一个空格，文本遇到边界会自动换行，行末空白字符移除。  
- nowrap  
  换行符（\\n）保留并换行显示，连续的多个空白字符会合并为一个空格，文本遇到边界不会自动换行，行末空白字符移除。  
- pre  
  换行符（\\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界不会自动换行，行末空白字符保留。  
- pre-wrap  
  换行符（\\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界会自动换行，行末空白字符保留。  
- pre-line  
  换行符（\\n）保留并换行显示，连续的多个空白字符会合并为一个空格，文本遇到边界会自动换行，行末空白字符移除。  
- break-spaces  
  换行符（\\n）保留并换行显示，连续的多个空白字符保留，文本遇到边界会自动换行，行末空白字符保留。  

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/white-space.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/white-space.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/white-space

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/white-space

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <scroll-view style="padding: 10px 0px; background-color: gray;justify-content: center;" direction="horizontal">
        <text class="text" :style="{ whiteSpace: whiteSpace }">{{multiLineText}}</text>
      </scroll-view>
      <text>拍平</text>
      <scroll-view style="padding: 10px 0px; background-color: gray;justify-content: center;" direction="horizontal">
        <text class="text" :style="{ whiteSpace: whiteSpace }" flatten>{{multiLineText}}</text>
      </scroll-view>

      <scroll-view style="flex: 1">
        <view class="content uni-common-mt">
          <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 white-space </text>
        </view>

        <view class="common-box">
          <!-- 普通版本 -->
          <view class="uni-common-mt">
            <text class="uni-title-text">white-space</text>
            <text class="uni-info">设置值: {{whiteSpace}}</text>
            <text class="uni-info">获取值: {{whiteSpaceActual}}</text>
            <view class="test-box">
              <text ref="textRef" class="text test-text" :style="{ whiteSpace: whiteSpace }">{{multiLineText}}</text>
            </view>
          </view>

          <!-- 拍平版本 -->
          <view class="uni-common-mt">
            <text class="uni-title-text">拍平</text>
            <text class="uni-info">设置值: {{whiteSpace}}</text>
            <text class="uni-info">获取值: {{whiteSpaceActualFlat}}</text>
            <view class="test-box">
              <text ref="textRefFlat" class="text test-text-flatten" :style="{ whiteSpace: whiteSpace }" flatten>{{multiLineText}}</text>
            </view>
          </view>
        </view>

        <view class="uni-common-mt uni-common-mb">
            <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
            <enum-data :items="whiteSpaceEnum" title="white-space 枚举值" @change="radioChangeWhiteSpace" :compact="true"></enum-data>
            <input-data :defaultValue="whiteSpace" title="white-space 自定义值" type="text" @confirm="inputChangeWhiteSpace"></input-data>
        </view>
      </scroll-view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const whiteSpaceEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'normal' },
    { value: 2, name: 'nowrap' },
    { value: 3, name: 'pre' },
    { value: 4, name: 'pre-wrap' },
    { value: 5, name: 'pre-line' },
    { value: 6, name: 'break-spaces' },
    { value: 7, name: 'keep' }
  ]

  const multiLineText = ref(`HBuilderX，
	轻巧、
		极速，
			极客编辑器；
				uni-app x，
					终极跨平台方案；
				uts，
			大一统语言

HBuilderX，轻巧、极速，极客编辑器；uni-app x，终极跨平台方案；uts，大一统语言`)

  const whiteSpace = ref('normal')
  const whiteSpaceActual = ref('')
  const whiteSpaceActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    whiteSpaceActual.value = textRef.value?.style.getPropertyValue('white-space') ?? ''
    whiteSpaceActualFlat.value = textRefFlat.value?.style.getPropertyValue('white-space') ?? ''
  }

  const changeWhiteSpace = (value: string) => {
    whiteSpace.value = value
    textRef.value?.style.setProperty('white-space', value)
    textRefFlat.value?.style.setProperty('white-space', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeWhiteSpace = (index: number) => {
    const selectedItem = whiteSpaceEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeWhiteSpace(selectedItem.name)
    }
  }

  const inputChangeWhiteSpace = (value: string) => {
    changeWhiteSpace(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeWhiteSpace
  })
</script>

<style>
  .text {
    font-size: 16px;
    /* 需要设置 align-self text组件才会自适应宽度 */
    align-self: flex-start;
  }

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 200px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/white-space)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.white-space)

