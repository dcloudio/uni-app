## color



color 属性设置元素的文本及文本装饰（text-decoration）的前景色颜色值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
color: <color>;
```



### 值限制
- color



### color 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| currentcolor | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 将颜色设置为元素的 color 属性值。但是，如果设置为 color 的值，currentcolor 将被视为 inherit。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | #000000 |
| uvue-web | canvastext |

 **注意**：W3C 默认值为：canvastext

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/color.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/color.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/color

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/color

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view class="demo-box">
        <view class="box">
          <text class="common" style="color: rgb(0, 0, 255);">color: rgb(0, 0, 255)</text>
          <text class="common" style="color: rgba(0, 0, 255, 0.5);">color: rgba(0, 0, 255, 0.5)</text>
          <text class="common" style="color: #0000ff;">color: #0000ff</text>
          <text class="common" style="color: #00f;">color: #00f</text>
          <text class="common" style="color: blue;">color: blue</text>
        </view>
        <view class="box">
          <text class="common" style="color: rgb(0, 0, 255);" flatten>color: rgb(0, 0, 255)</text>
          <text class="common" style="color: rgba(0, 0, 255, 0.5);" flatten>color: rgba(0, 0, 255, 0.5)</text>
          <text class="common" style="color: #0000ff;" flatten>color: #0000ff</text>
          <text class="common" style="color: #00f;" flatten>color: #00f</text>
          <text class="common" style="color: blue;" flatten>color: blue</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 color 测试</text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">color</text>
          <text class="uni-info">设置值: {{color}}</text>
          <text class="uni-info">获取值: {{colorActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="common test-text" :style="{ color: color }">当前 color: {{color}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">测试拍平</text>
          <text class="uni-info">设置值: {{color}}</text>
          <text class="uni-info">获取值: {{colorActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common test-text-flatten" :style="{ color: color }" flatten>当前 color: {{color}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="colorEnum" title="color 枚举值" @change="radioChangeColor" :compact="true"></enum-data>
        <input-data :defaultValue="color" title="color 自定义值" type="text" @confirm="inputChangeColor"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const colorEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'green' },
    { value: 2, name: '#942192' },
    { value: 3, name: '#000' },
    { value: 4, name: '#0000ff' },
    { value: 5, name: 'rgb(0, 255, 0)' },
    { value: 6, name: 'rgba(0, 255, 0, 0.5)' }
  ]

  const color = ref('cyan')
  const colorActual = ref('')
  const colorActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    colorActual.value = textRef.value?.style.getPropertyValue('color') ?? ''
    colorActualFlat.value = textRefFlat.value?.style.getPropertyValue('color') ?? ''
  }

  const changeColor = (value: string) => {
    color.value = value
    textRef.value?.style.setProperty('color', value)
    textRefFlat.value?.style.setProperty('color', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeColor = (index: number) => {
    const selectedItem = colorEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeColor(selectedItem.name)
    }
  }

  const inputChangeColor = (value: string) => {
    changeColor(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeColor
  })
</script>

<style>
  .common {
    font-size: 16px;
  }
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }
  .box{
    flex:1;
    height: 130px;
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

#### App平台
App端 color 样式不支持继承，

#### 浏览器或webview平台
所有元素都支持设置 color 样式，并支持继承。
同时会设置 `currentcolor` 值，`currentcolor` 可以用作其他属性的间接值，且为其他颜色属性（如 border-color）的默认值。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/color)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.color)

