## word-break



word-break 属性指定文本在内容框内溢出时的断行规则。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.31 | x | 5.31 | x | 5.31 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| 5.31 | 5.31 | 5.31 |





### 语法
```
word-break: normal | break-all | keep-all | break-word;
```



### word-break 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.31; iOS(VDOM): x; iOS(Vapor): 5.31; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.31 | 使用默认的断行规则。 |
| break-all | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.31; iOS(VDOM): x; iOS(Vapor): 5.31; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.31 | 对于非中日韩文本，可在任意字符间断行。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | normal |
| uvue-web | normal |

 **注意**：W3C 默认值为：normal

### 适用组件 @unix-tags 
 - [text](/component/text.md)

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/word-break.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/word-break.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/word-break

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/word-break

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>

      <view class="demo-box">
        <view class="demo-column">
          <text class="uni-info">word-break: normal</text>
          <text class="demo-text" style="word-break: normal;">hello uni-app x word-break example</text>
          <text class="uni-info uni-common-mt">word-break: break-all</text>
          <text class="demo-text" style="word-break: break-all;">hello uni-app x word-break example</text>
        </view>

        <view class="demo-column">
          <text class="uni-info">word-break: normal</text>
          <text class="demo-text" style="word-break: normal;" flatten>hello uni-app x word-break example</text>
          <text class="uni-info uni-common-mt">word-break: break-all</text>
          <text class="demo-text" style="word-break: break-all;" flatten>hello uni-app x word-break example</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <view class="common-box">
        <view class="uni-common-mt">
          <text class="uni-title-text">word-break</text>
          <text class="uni-info">设置值: {{data.wordBreak}}</text>
          <text class="uni-info">获取值: {{data.wordBreakActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="test-text" :style="{ wordBreak: data.wordBreak }">hello uni-app x word-break example</text>
          </view>
        </view>

        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{data.wordBreak}}</text>
          <text class="uni-info">获取值: {{data.wordBreakActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="test-text" :style="{ wordBreak: data.wordBreak }" flatten>hello uni-app x word-break example</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="wordBreakEnum" title="word-break 枚举值" @change="radioChangeWordBreak"
          :compact="true"></enum-data>
        <input-data :defaultValue="data.wordBreak" title="word-break 自定义值" type="text"
          @confirm="inputChangeWordBreak"></input-data>
      </view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="ts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const wordBreakEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'normal' },
    { value: 2, name: 'break-all' }
  ]

  const data = reactive({
    wordBreak: 'normal',
    wordBreakActual: '',
    wordBreakActualFlat: ''
  })

  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    data.wordBreakActual = textRef.value?.style.getPropertyValue('word-break') ?? ''
    data.wordBreakActualFlat = textRefFlat.value?.style.getPropertyValue('word-break') ?? ''
  }

  const changeWordBreak = (value : string) => {
    data.wordBreak = value
    textRef.value?.style.setProperty('word-break', value)
    textRefFlat.value?.style.setProperty('word-break', value)
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeWordBreak = (index : number) => {
    const selectedItem = wordBreakEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeWordBreak(selectedItem.name)
    }
  }

  const inputChangeWordBreak = (value : string) => {
    changeWordBreak(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeWordBreak,
    data
  })
</script>

<style>
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
  }

  .demo-column {
    flex: 1;
    min-width: 0;
    height: 240px;
    padding: 10px;
    background-color: gray;
  }

  .demo-text {
    width: 140px;
    height: 70px;
    font-size: 18px;
    background-color: lightgray;
  }

  .common-box {
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 110px;
    padding: 10px;
    background-color: gray;
    justify-content: center;
  }

  .test-text {
    width: 140px;
    font-size: 18px;
    background-color: lightgray;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/word-break)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.word-break)
