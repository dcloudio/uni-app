## flex-grow



flex-grow 属性设置弹性元素在主轴方向的增长系数。此属性定义了元素在弹性容器中分配主轴方向剩余空间的相对比例（即弹性增长因子），增长的可能是弹性元素的宽度或高度，取决于 flex-direction 值。<br/>剩余空间是指弹性容器尺寸减去所有子元素尺寸之和后的空间。若所有子元素有相同的增长系数，则各子元素将获得等量的剩余空间，否则按不同增长系数的比例进行分配。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex-grow: <number>;
```



### 值限制
- number




### 默认值 @default-value 
 `0`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/flex-grow.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/flex-grow.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/flex-grow

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/flex-grow

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>flex-grow</text>
        <view class="demo-box">
          <view class="flex-container">
            <view class="common red" style="flex-grow: 0.5">
              <text>0.5</text>
            </view>
            <view class="common green" style="flex-grow: 1">
              <text>1</text>
            </view>
            <view class="common blue" style="flex-grow: 2">
              <text>2</text>
            </view>
          </view>
          <view class="flex-container">
            <view class="common red" style="flex-grow: 0.5" flatten>
              <text>0.5</text>
            </view>
            <view class="common green" style="flex-grow: 1" flatten>
              <text>1</text>
            </view>
            <view class="common blue" style="flex-grow: 2" flatten>
              <text>2</text>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <view class="flex-container-compare" style="margin-right:10px;">
          <view class="common red width-30-no-grow"></view>
          <scroll-view class="scroll-view-grow green" style="flex-grow: 0.5;">
            <text class="scroll-view-label">flex-grow: 0.5</text>
          </scroll-view>
          <view class="common blue width-30-no-grow"></view>
        </view>
        <view class="flex-container-compare">
          <view class="common red width-30-no-grow"></view>
          <scroll-view class="scroll-view-grow green" style="flex-grow: 1;">
            <text class="scroll-view-label">flex-grow: 1</text>
          </scroll-view>
          <view class="common blue width-30-no-grow"></view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 flex-grow </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <!-- view 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{flexGrow}}</text>
          <text class="uni-info">获取值: {{flexGrowActual}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <view class="common-image red"></view>
              <view ref="viewRef" class="common-image green test-view" :style="{ flexGrow: flexGrow }">
                <text class="common-text">{{flexGrow}}</text>
              </view>
              <view class="common-image blue"></view>
            </view>
          </view>
        </view>

        <!-- text 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{flexGrow}}</text>
          <text class="uni-info">获取值: {{flexGrowActualText}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <text class="common-text red">红色</text>
              <text ref="textRef" class="common-text green test-text" :style="{ flexGrow: flexGrow }">text</text>
              <text class="common-text blue">蓝色</text>
            </view>
          </view>
        </view>

        <!-- image 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{flexGrow}}</text>
          <text class="uni-info">获取值: {{flexGrowActualImage}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <image class="common-image red" src="/static/test-image/logo.png"></image>
              <image ref="imageRef" class="common-image green test-image" :style="{ flexGrow: flexGrow }" src="/static/test-image/logo.png"></image>
              <image class="common-image blue" src="/static/test-image/logo.png"></image>
            </view>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <!-- view 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{flexGrow}}</text>
          <text class="uni-info">获取值: {{flexGrowActualFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <view class="common-image red"></view>
              <view ref="viewRefFlat" class="common-image green test-view-flatten" :style="{ flexGrow: flexGrow }" flatten>
                <text class="common-text">{{flexGrow}}</text>
              </view>
              <view class="common-image blue"></view>
            </view>
          </view>
        </view>

        <!-- text 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{flexGrow}}</text>
          <text class="uni-info">获取值: {{flexGrowActualTextFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <text class="common-text red">红色</text>
              <text ref="textRefFlat" class="common-text green test-text-flatten" :style="{ flexGrow: flexGrow }" flatten>text</text>
              <text class="common-text blue">蓝色</text>
            </view>
          </view>
        </view>

        <!-- image 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{flexGrow}}</text>
          <text class="uni-info">获取值: {{flexGrowActualImageFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <image class="common-image red" src="/static/test-image/logo.png"></image>
              <image ref="imageRefFlat" class="common-image green test-image-flatten" :style="{ flexGrow: flexGrow }" flatten src="/static/test-image/logo.png"></image>
              <image class="common-image blue" src="/static/test-image/logo.png"></image>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="flexGrowEnum" title="flex-grow 枚举值" @change="radioChangeFlexGrow" :compact="true"></enum-data>
        <input-data :defaultValue="flexGrow" title="flex-grow 自定义值" type="text" @confirm="inputChangeFlexGrow"></input-data>
      </view>

      <text class="uni-title-text uni-common-mt">native-view 组件：flex-grow: 0.5 和 flex-grow: 1</text>
      <view class="demo-box uni-common-mb">
        <view class="flex-container-compare" style="margin-right:10px;">
          <view class="common red width-30-no-grow"></view>
          <native-view class="native-view-grow green" style="flex-grow: 0.5;"></native-view>
          <view class="common blue width-30-no-grow"></view>
        </view>
        <view class="flex-container-compare">
          <view class="common red width-30-no-grow"></view>
          <native-view class="native-view-grow green" style="flex-grow: 1;"></native-view>
          <view class="common blue width-30-no-grow"></view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const flexGrowEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0.5' },
    { value: 3, name: '1' },
    { value: 4, name: '2' },
  ]

  const flexGrow = ref('0')
  const flexGrowActual = ref('')
  const flexGrowActualFlat = ref('')
  const flexGrowActualText = ref('')
  const flexGrowActualImage = ref('')
  const flexGrowActualTextFlat = ref('')
  const flexGrowActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    flexGrowActual.value = viewRef.value?.style.getPropertyValue('flex-grow') ?? ''
    flexGrowActualFlat.value = viewRefFlat.value?.style.getPropertyValue('flex-grow') ?? ''
    flexGrowActualText.value = textRef.value?.style.getPropertyValue('flex-grow') ?? ''
    flexGrowActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('flex-grow') ?? ''
    flexGrowActualImage.value = imageRef.value?.style.getPropertyValue('flex-grow') ?? ''
    flexGrowActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('flex-grow') ?? ''
  }

  const changeFlexGrow = (value: string) => {
    flexGrow.value = value
    viewRef.value?.style.setProperty('flex-grow', value)
    viewRefFlat.value?.style.setProperty('flex-grow', value)
    textRef.value?.style.setProperty('flex-grow', value)
    textRefFlat.value?.style.setProperty('flex-grow', value)
    imageRef.value?.style.setProperty('flex-grow', value)
    imageRefFlat.value?.style.setProperty('flex-grow', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFlexGrow = (index: number) => {
    const selectedItem = flexGrowEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFlexGrow(selectedItem.name)
    }
  }

  const inputChangeFlexGrow = (value: string) => {
    changeFlexGrow(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFlexGrow
  })
</script>

<style>
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .flex-container {
    flex: 1;
    margin: 0 10px;
    height: 100px;
    background-color: gray;
    flex-direction: row;
  }
  .common {
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
  }

  .common-text {
    height: 30px;
    background-color: green;
    font-size: 14px;
    color: white;
  }

  .common-image {
    width: 30px;
    height: 30px;
    background-color: green;
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
    height: 50px;
    background-color: gray;
  }


  .test-flex-container {
    width: 100%;
    height: 100%;
    flex-direction: row;
  }

  .red {
    background-color: red;
  }

  .blue {
    background-color: blue;
  }

  .green {
    background-color: green;
  }

  .scroll-view-label {
    font-size: 12px;
    line-height: 50px;
    text-align: center;
  }

  .flex-container-compare {
    width: 180px;
    height: 100px;
    background-color: gray;
    flex-direction: row;
  }

  .scroll-view-grow {
    height: 50px;
    justify-content: center;
    align-items: center;
  }

  .native-view-grow {
    height: 50px;
    justify-content: center;
    align-items: center;
  }

  .width-30-no-grow {
    width: 30px;
    flex-grow: 0;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-grow)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex-grow)

