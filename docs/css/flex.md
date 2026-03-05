## flex



flex 属性设置弹性元素如何增大或缩小以适应其弹性容器中可用的空间，是 flex-grow、flex-shrink、flex-basis 的简写。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
```



### 值限制
- number
- length
- enum



### flex 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| initial | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器。相当于将属性设置为"flex: 0 1 auto"。 |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto". |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | none |

 **注意**：W3C 默认值为：initial





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/display/flex.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/display/flex.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/display/flex

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/display/flex

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <view class="head">
        <text class="tip">下面有一个灰色区域，display默认值为flex</text>
        <text class="tip">当前display值：{{display}}</text>
      </view>
      <view class="content" :style="{display:display}">
        <text style="background-color: aquamarine;">展示display区域</text>
        <scroll-view>
          <text class="common-text" style="height: 20px;">scroll-view</text>
        </scroll-view>
        <text class="common-text" style="height: 20px;">下方有个native-view</text>
        <native-view style="width: 20px;height: 20px;background-color: cyan;"></native-view>
      </view>
      <button @tap="switchDisplay" class="uni-common-mb">切换display属性</button>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
      <text class="uni-subtitle-text">display: flex 和 display: none</text>
      <view class="demo-box">
        <scroll-view class="common-view" style="display: flex;">
          <text class="common-text">display: flex</text>
        </scroll-view>
        <scroll-view class="common-view" style="display: none;">
          <text class="common-text">display: none</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 display </text>
      </view>

      <view class="test-container">
        <!-- view 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{displayProp}}</text>
          <text class="uni-info">获取值: {{displayActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-view test-view" :style="{ display: displayProp }">
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <!-- text 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{displayProp}}</text>
          <text class="uni-info">获取值: {{displayActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-text test-text" :style="{ display: displayProp }">text</text>
          </view>
        </view>

        <!-- image 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{displayProp}}</text>
          <text class="uni-info">获取值: {{displayActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ display: displayProp }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 测试控制区域 -->
      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="displayEnum" title="display 枚举值" @change="radioChangeDisplay" :compact="true"></enum-data>
        <input-data :defaultValue="displayProp" title="display 自定义值" type="text" @confirm="inputChangeDisplay"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: display: flex 和 display: none</text>
        <view class="demo-box">
          <native-view class="common-view" style="display: flex;width:100px;"></native-view>
          <native-view class="common-view" style="display: none;width:100px;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const display = ref('flex')

  const switchDisplay = () => {
    display.value = ('flex' == display.value) ? 'none' : 'flex'
  }

  const displayEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'flex' },
    { value: 2, name: 'none' }
  ]

  const displayProp = ref('flex')
  const displayActual = ref('')
  const displayActualText = ref('')
  const displayActualImage = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    displayActual.value = viewRef.value?.style.getPropertyValue('display') ?? ''
    displayActualText.value = textRef.value?.style.getPropertyValue('display') ?? ''
    displayActualImage.value = imageRef.value?.style.getPropertyValue('display') ?? ''
  }

  const changeDisplay = (value: string) => {
    displayProp.value = value
    viewRef.value?.style.setProperty('display', value)
    textRef.value?.style.setProperty('display', value)
    imageRef.value?.style.setProperty('display', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeDisplay = (index: number) => {
    const selectedItem = displayEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeDisplay(selectedItem.name)
    }
  }

  const inputChangeDisplay = (value: string) => {
    changeDisplay(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeDisplay
  })
</script>

<style>
  .page {
    height: 100%;
  }

  .head {
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
  }

  .tip {
    color: red;
  }

  .content {
    border: 5px dotted blue;
    margin: 10px auto;
    padding: 30px;
    width: 200px;
    height: 150px;
    background-color: gray;
    align-items: center;
    justify-content: center;
  }

  /* 多组件横向布局样式 */
  .test-container {
    flex-direction: row;
    margin-top: 10px;
  }

  .test-item {
    flex: 1;
    margin: 0 5px;
  }

  .test-box {
    width: 100%;
    height: 60px;
    background-color: gray;
  }

  .common-view {
    height: 50px;
    background-color: green;
  }

  .common-text {
    height: 50px;
    background-color: green;
    font-size: 12px;
    color: white;
  }

  .common-image {
    width: 50px;
    height: 50px;
    background-color: green;
  }

  .demo-box {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex)

