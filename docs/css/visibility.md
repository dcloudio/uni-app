## visibility



visibility CSS 属性显示或隐藏元素而不更改文档的布局。该属性还可以隐藏 \<table> 中的行或列。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
visibility: visible | hidden | collapse;
```



### 值限制
- enum



### visibility 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| visible | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素框可见。 |
| hidden | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素框不可见（不绘制），但仍然影响常规的布局。如果将其子元素的 visibility 设置为 visible，则该子元素依然可见。元素无法获得焦点（例如通过 tab 索引进行键盘导航）。 |


**注意**
设置 visibility 为 hidden，或设置 display 为 none 都可以隐藏元素。差异是通过 visibility 隐藏元素仍然占据页面位置，通过 display 隐藏元素不占据页面位置。

### 默认值 @default-value 
 `visible`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/visibility.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/visibility.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/visibility

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/visibility

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">visibility: {{visibility}} ，说明：点击切换</text>
      <view class="demo-box">
        <view @click="changeVisibility">
          <text>view组件: {{visibility}}</text>
          <view class="common" :style="{'visibility': visibility}"></view>
        </view>
        <view @click="changeVisibility">
          <text>text组件: {{visibility}}</text>
          <text class="common" :style="{'visibility': visibility}">文本</text>
        </view>
        <view @click="changeVisibility">
          <text>image组件: {{visibility}}</text>
          <image class="common" :style="{'visibility': visibility}" src="/static/test-image/logo.png"></image>
        </view>
      </view>

      <view class="uni-common-mb">
        <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
        <view class="demo-box">
          <view>
            <text>scroll-view: visible</text>
            <scroll-view class="common" style="visibility: visible;"></scroll-view>
          </view>
          <view>
            <text>scroll-view: hidden</text>
            <scroll-view class="common" style="visibility: hidden;"></scroll-view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 visibility </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{visibilityValue}}</text>
          <text class="uni-info">获取值: {{visibilityActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ visibility: visibilityValue }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{visibilityValue}}</text>
          <text class="uni-info">获取值: {{visibilityActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ visibility: visibilityValue }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{visibilityValue}}</text>
          <text class="uni-info">获取值: {{visibilityActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ visibility: visibilityValue }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{visibilityValue}}</text>
          <text class="uni-info">获取值: {{visibilityActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ visibility: visibilityValue }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{visibilityValue}}</text>
          <text class="uni-info">获取值: {{visibilityActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ visibility: visibilityValue }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{visibilityValue}}</text>
          <text class="uni-info">获取值: {{visibilityActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ visibility: visibilityValue }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="visibilityEnum" title="visibility 枚举值" @change="radioChangeVisibility" :compact="true"></enum-data>
        <input-data :defaultValue="visibilityValue" title="visibility 自定义值" type="text" @confirm="inputChangeVisibility"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view 组件</text>
        <view class="demo-box">
          <view>
            <text>native-view: visible</text>
            <native-view class="common" style="visibility: visible;"></native-view>
          </view>
          <view>
            <text>native-view: hidden</text>
            <native-view class="common" style="visibility: hidden;"></native-view>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const visibility = ref('visible')
  let flag = true

  const changeVisibility = () => {
    flag = !flag
    if (flag) {
      visibility.value = 'visible'
    } else {
      visibility.value = 'hidden'
    }
  }

  const visibilityEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'visible' },
    { value: 2, name: 'hidden' }
  ]

  const visibilityValue = ref('visible')
  const visibilityActual = ref('')
  const visibilityActualText = ref('')
  const visibilityActualImage = ref('')
  const visibilityActualFlat = ref('')
  const visibilityActualTextFlat = ref('')
  const visibilityActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    visibilityActual.value = viewRef.value?.style.getPropertyValue('visibility') ?? ''
    visibilityActualFlat.value = viewRefFlat.value?.style.getPropertyValue('visibility') ?? ''
    visibilityActualText.value = textRef.value?.style.getPropertyValue('visibility') ?? ''
    visibilityActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('visibility') ?? ''
    visibilityActualImage.value = imageRef.value?.style.getPropertyValue('visibility') ?? ''
    visibilityActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('visibility') ?? ''
  }

  const changeVisibilityProperty = (value: string) => {
    visibilityValue.value = value
    viewRef.value?.style.setProperty('visibility', value)
    viewRefFlat.value?.style.setProperty('visibility', value)
    textRef.value?.style.setProperty('visibility', value)
    textRefFlat.value?.style.setProperty('visibility', value)
    imageRef.value?.style.setProperty('visibility', value)
    imageRefFlat.value?.style.setProperty('visibility', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeVisibility = (index: number) => {
    const selectedItem = visibilityEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeVisibilityProperty(selectedItem.name)
    }
  }

  const inputChangeVisibility = (value: string) => {
    changeVisibilityProperty(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeVisibility
  })
</script>

<style>
  .common {
    width: 100px;
    height: 100px;
    background-color: cyan;
  }
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }
  .common-dynamic {
    width: 100px;
    height: 100px;
    background-color: cyan;
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
    width: 100%;
    height: 100px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::

#### App平台差异
App平台设置如果元素的 visibility 设置为 hidden，其子元素将不可见，即使子元素的 visibility 设置为 visible 也不可见。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/visibility)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.visibility)

