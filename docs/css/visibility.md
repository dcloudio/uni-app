## visibility



visibility CSS 属性显示或隐藏元素而不更改文档的布局。该属性还可以隐藏 \<table> 中的行或列。


### uni-app x 兼容性 <Help />
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| x | x | x |



### 语法
```
visibility: visible | hidden | collapse;
```



### 值限制
- enum



### visibility 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| visible | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 元素框可见。 |
| hidden | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 元素框不可见（不绘制），但仍然影响常规的布局。如果将其子元素的 visibility 设置为 visible，则该子元素依然可见。元素无法获得焦点（例如通过 tab 索引进行键盘导航）。 |


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
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">visibility: {{data.visibility}} ，说明：点击切换</text>
      <view class="demo-box">
        <view @click="changeVisibility">
          <text>view组件: {{data.visibility}}</text>
          <view class="common" :style="{'visibility': data.visibility}"></view>
        </view>
        <view @click="changeVisibility">
          <text>text组件: {{data.visibility}}</text>
          <text class="common" :style="{'visibility': data.visibility}">文本</text>
        </view>
        <view @click="changeVisibility">
          <text>image组件: {{data.visibility}}</text>
          <image class="common" :style="{'visibility': data.visibility}" src="/static/test-image/logo.png"></image>
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
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.visibilityValue}}</text>
          <text class="uni-info">获取值: {{data.visibilityActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ visibility: data.visibilityValue }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.visibilityValue}}</text>
          <text class="uni-info">获取值: {{data.visibilityActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ visibility: data.visibilityValue }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.visibilityValue}}</text>
          <text class="uni-info">获取值: {{data.visibilityActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ visibility: data.visibilityValue }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="visibilityEnum" title="visibility 枚举值" @change="radioChangeVisibility" :compact="true"></enum-data>
        <input-data :defaultValue="data.visibilityValue" title="visibility 自定义值" type="text" @confirm="inputChangeVisibility"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view 组件</text>
        <view class="demo-box">
          <view>
            <text>native-view: visible</text>
            <test-native-view class="common" style="visibility: visible;"></test-native-view>
          </view>
          <view>
            <text>native-view: hidden</text>
            <test-native-view class="common" style="visibility: hidden;"></test-native-view>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  let flag = true
  const data = reactive({
    visibility: 'visible',
    visibilityValue: 'visible',
    visibilityActual: '',
    visibilityActualText: '',
    visibilityActualImage: ''
  })


  const changeVisibility = () => {
    flag = !flag
    if (flag) {
      data.visibility = 'visible'
    } else {
      data.visibility = 'hidden'
    }
  }

  const visibilityEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'visible' },
    { value: 2, name: 'hidden' }
  ]

  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    data.visibilityActual = viewRef.value?.style.getPropertyValue('visibility') ?? ''
    data.visibilityActualText = textRef.value?.style.getPropertyValue('visibility') ?? ''
    data.visibilityActualImage = imageRef.value?.style.getPropertyValue('visibility') ?? ''
  }

  const changeVisibilityProperty = (value : string) => {
    data.visibilityValue = value
    viewRef.value?.style.setProperty('visibility', value)
    textRef.value?.style.setProperty('visibility', value)
    imageRef.value?.style.setProperty('visibility', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeVisibility = (index : number) => {
    const selectedItem = visibilityEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeVisibilityProperty(selectedItem.name)
    }
  }

  const inputChangeVisibility = (value : string) => {
    changeVisibilityProperty(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeVisibility,
    data
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

