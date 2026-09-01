## direction



direction CSS 属性用于设置文本水平溢出的方向。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.25 | x | 5.25 | x | 5.25 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| 5.25 | 5.25 | 4.26 |





### 语法
```
direction: ltr | rtl;
```



### direction 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| ltr | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 默认属性。可设置文本和其他元素的默认方向是从左到右。 |
| rtl | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 可设置文本和其他元素的默认方向是从右到左。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | ltr |
| uvue-web | ltr |

 **注意**：W3C 默认值为：ltr

### 适用组件 @unix-tags 
 - [text](/component/text.md)

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/direction.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/direction.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/direction

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/direction

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view class="demo-box">
        <view class="common">
          <text class="uni-info">direction: ltr</text>
          <text class="common-text" style="direction: ltr;">hello مرحبا</text>
          <text class="uni-info">direction: rtl</text>
          <text class="common-text" style="direction: rtl;">hello مرحبا</text>
        </view>
        <view class="common">
          <text class="uni-info">direction: ltr</text>
          <text class="common-text" style="direction: ltr;" flatten>hello مرحبا</text>
          <text class="uni-info">direction: rtl</text>
          <text class="common-text" style="direction: rtl;" flatten>hello مرحبا</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <view class="common-box">
        <view class="uni-common-mt">
          <text class="uni-title-text">direction</text>
          <text class="uni-info">设置值: {{data.direction}}</text>
          <text class="uni-info">获取值: {{data.directionActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="test-text" :style="{ direction: data.direction }">hello مرحبا</text>
          </view>
        </view>

        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{data.direction}}</text>
          <text class="uni-info">获取值: {{data.directionActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="test-text" :style="{ direction: data.direction }" flatten>hello مرحبا</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="directionEnum" title="direction 枚举值" @change="radioChangeDirection"
          :compact="true"></enum-data>
        <input-data :defaultValue="data.direction" title="direction 自定义值" type="text"
          @confirm="inputChangeDirection"></input-data>
      </view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const directionEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'ltr' },
    { value: 2, name: 'rtl' }
  ]

  const data = reactive({
    direction: 'ltr',
    directionActual: '',
    directionActualFlat: ''
  })
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    data.directionActual = textRef.value?.style.getPropertyValue('direction') ?? ''
    data.directionActualFlat = textRefFlat.value?.style.getPropertyValue('direction') ?? ''
  }

  const changeDirection = (value : string) => {
    data.direction = value
    textRef.value?.style.setProperty('direction', value)
    textRefFlat.value?.style.setProperty('direction', value)
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeDirection = (index : number) => {
    const selectedItem = directionEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeDirection(selectedItem.name)
    }
  }

  const inputChangeDirection = (value : string) => {
    changeDirection(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeDirection,
    data
  })
</script>

<style>
  .common-text {
    width: 150px;
    font-size: 18px;
  }

  .common {
    flex: 1;
    height: 150px;
    padding: 10px;
    background-color: gray;
    justify-content: center;
  }

  .demo-box {
    flex-direction: row;
    margin-top: 10px;
  }

  .common-box {
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 80px;
    padding: 10px;
    background-color: gray;
    justify-content: center;
  }

  .test-text {
    width: 160px;
    font-size: 18px;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/direction)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text.direction)
