## align-self



align-self 属性在 Flex 弹性布局中设置元素在容器中的交叉轴方向的对齐方式，覆盖父元素设置的 align-items 值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
align-self: auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>;
```



### 值限制
- enum



### align-self 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 默认值。与父元素的 align-items 值一致。 |
| center | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴上居中。如果元素在交叉轴上的尺寸（高度/宽度）大于其容器，那么在两个方向均等溢出。 |
| flex-start | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴上对齐起始位置。 |
| flex-end | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴上对齐结尾位置。 |
| stretch | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 如果元素未设置高度或设为auto，将占满整个容器的高度。 |
| baseline | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 所有元素向基线对齐。交叉轴起点到元素基线距离最大的元素将会于交叉轴起点对齐以确定基线。 |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/align-self.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/align-self.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/align-self

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/align-self

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
  <view style="flex-grow: 1;">
    <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
    <view>
      <text>align-self: auto</text>
      <view class="demo-box">
        <view class="demo-container align-start">
          <view class="common" style="align-self: auto;"></view>
        </view>
        <view class="demo-container align-start">
          <view class="common" style="align-self: auto;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text>align-self: center</text>
      <view class="demo-box">
        <view class="demo-container align-center">
          <view class="common" style="align-self: center;"></view>
        </view>
        <view class="demo-container align-center">
          <view class="common" style="align-self: center;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text>align-self: flex-start</text>
      <view class="demo-box">
        <view class="demo-container align-start">
          <view class="common" style="align-self: flex-start;"></view>
        </view>
        <view class="demo-container align-start">
          <view class="common" style="align-self: flex-start;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text>align-self: flex-end</text>
      <view class="demo-box">
        <view class="demo-container">
          <view class="common" style="align-self: flex-end;"></view>
        </view>
        <view class="demo-container">
          <view class="common" style="align-self: flex-end;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text>align-self: stretch</text>
      <view class="demo-box">
        <view class="demo-container">
          <view class="common" style="align-self: stretch;"></view>
        </view>
        <view class="demo-container">
          <view class="common" style="align-self: stretch;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">scroll-view 组件</text>
    </view>

    <view class="demo-box">
      <view class="demo-container align-center">
        <scroll-view class="common" style="align-self: center;" direction="horizontal">
          <text class="scroll-view-label">align-self: center</text>
        </scroll-view>
      </view>
      <view class="demo-container align-center">
        <scroll-view class="common" style="align-self: flex-start;" direction="horizontal">
          <text class="scroll-view-label">align-self: flex-start</text>
        </scroll-view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 align-self </text>
    </view>

    <!-- 普通版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件</text>
        <text class="uni-info">设置值: {{alignSelf}}</text>
        <text class="uni-info">获取值: {{alignSelfActual}}</text>
        <view class="test-box">
          <view ref="viewRef" class="common test-view" :style="{ alignSelf: alignSelf }">
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件</text>
        <text class="uni-info">设置值: {{alignSelf}}</text>
        <text class="uni-info">获取值: {{alignSelfActualText}}</text>
        <view class="test-box">
          <text ref="textRef" class="common test-text" :style="{ alignSelf: alignSelf }">text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件</text>
        <text class="uni-info">设置值: {{alignSelf}}</text>
        <text class="uni-info">获取值: {{alignSelfActualImage}}</text>
        <view class="test-box">
          <image ref="imageRef" class="common test-image" :style="{ alignSelf: alignSelf }" src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <!-- 拍平版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件拍平</text>
        <text class="uni-info">设置值: {{alignSelf}}</text>
        <text class="uni-info">获取值: {{alignSelfActualFlat}}</text>
        <view class="test-box">
          <view ref="viewRefFlat" class="common test-view-flatten" :style="{ alignSelf: alignSelf }" flatten>
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件拍平</text>
        <text class="uni-info">设置值: {{alignSelf}}</text>
        <text class="uni-info">获取值: {{alignSelfActualTextFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common test-text-flatten" :style="{ alignSelf: alignSelf }" flatten>text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件拍平</text>
        <text class="uni-info">设置值: {{alignSelf}}</text>
        <text class="uni-info">获取值: {{alignSelfActualImageFlat}}</text>
        <view class="test-box">
          <image ref="imageRefFlat" class="common test-image-flatten" :style="{ alignSelf: alignSelf }" flatten src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
      <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
      <enum-data :items="alignSelfEnum" title="align-self 枚举值" @change="radioChangeAlignSelf" :compact="true"></enum-data>
      <input-data :defaultValue="alignSelf" title="align-self 自定义值" type="text" @confirm="inputChangeAlignSelf"></input-data>
    </view>

    <text class="uni-title-text uni-common-mt">native-view 组件：align-self: center 和 flex-start</text>
    <text class="uni-subtitle-text">native-view 作为 flex 子项</text>
    <view class="demo-box uni-common-mb">
      <view class="demo-container align-center">
        <native-view class="common" style="align-self: center;"></native-view>
      </view>
      <view class="demo-container align-center">
        <native-view class="common" style="align-self: flex-start;"></native-view>
      </view>
    </view>
  </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const alignSelfEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'auto' },
    { value: 2, name: 'center' },
    { value: 3, name: 'flex-start' },
    { value: 4, name: 'flex-end' },
    { value: 5, name: 'stretch' }
  ]

  const alignSelf = ref('center')
  const alignSelfActual = ref('')
  const alignSelfActualText = ref('')
  const alignSelfActualImage = ref('')
  const alignSelfActualFlat = ref('')
  const alignSelfActualTextFlat = ref('')
  const alignSelfActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    alignSelfActual.value = viewRef.value?.style.getPropertyValue('align-self') ?? ''
    alignSelfActualFlat.value = viewRefFlat.value?.style.getPropertyValue('align-self') ?? ''
    alignSelfActualText.value = textRef.value?.style.getPropertyValue('align-self') ?? ''
    alignSelfActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('align-self') ?? ''
    alignSelfActualImage.value = imageRef.value?.style.getPropertyValue('align-self') ?? ''
    alignSelfActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('align-self') ?? ''
  }

  const changeAlignSelf = (value: string) => {
    alignSelf.value = value
    viewRef.value?.style.setProperty('align-self', value)
    viewRefFlat.value?.style.setProperty('align-self', value)
    textRef.value?.style.setProperty('align-self', value)
    textRefFlat.value?.style.setProperty('align-self', value)
    imageRef.value?.style.setProperty('align-self', value)
    imageRefFlat.value?.style.setProperty('align-self', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeAlignSelf = (index: number) => {
    const selectedItem = alignSelfEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeAlignSelf(selectedItem.name)
    }
  }

  const inputChangeAlignSelf = (value: string) => {
    changeAlignSelf(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeAlignSelf
  })
</script>

<style>
  .demo-container {
    display: flex;
    background-color: #cdcbcb;
    border: #ddd solid 1px;
    flex: 1;
    margin: 0 10px;
  }
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .align-start {
    align-items: flex-start;
  }

  .align-center {
    align-items: center;
  }

  .common {
    width: 80px;
    height: 80px;
    background-color: cyan;
  }

  .common-text {
    width: 50px;
  }

  .test-container {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }

  .test-item {
    flex: 1;
    margin: 0 5px;
  }

  .test-box {
    display: flex;
    width: 100%;
    height: 80px;
    background-color: gray;
    align-items: flex-start;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/align-self)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.align-self)

