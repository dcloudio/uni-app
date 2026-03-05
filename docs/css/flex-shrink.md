## flex-shrink



flex-shrink 属性设置弹性元素在主轴方向的收缩系数。当所有子元素在主轴方向的尺寸之和大于容器时才会发生收缩，会根据元素的收缩系数进行收缩保证不溢出弹性容器。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex-shrink: <number>;
```



### 值限制
- number




### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | 0 |

 **注意**：W3C 默认值为：1





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/flex-shrink.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/flex-shrink.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/flex-shrink

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/flex-shrink

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>flex-shrink</text>
        <view class="demo-box">
          <view class="flex-container">
            <view class="common red" style="flex-shrink: 1">
              <text>1</text>
            </view>
            <view class="common green" style="flex-shrink: 2">
              <text>2</text>
            </view>
            <view class="common blue" style="flex-shrink: 3">
              <text>3</text>
            </view>
          </view>
          <view class="flex-container">
            <view class="common red" style="flex-shrink: 1" flatten>
              <text>1</text>
            </view>
            <view class="common green" style="flex-shrink: 2" flatten>
              <text>2</text>
            </view>
            <view class="common blue" style="flex-shrink: 3" flatten>
              <text>3</text>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件：flex-shrink: 1 、2、3</text>
      </view>
      <view class="demo-box">
        <view class="flex-container-shrink">
          <scroll-view class="scroll-view-shrink red" style="width: 100px; flex-shrink: 1;">
            <text class="scroll-view-label">flex-shrink: 1</text>
          </scroll-view>
          <scroll-view class="scroll-view-shrink green" style="width: 100px; flex-shrink: 2;">
            <text class="scroll-view-label">flex-shrink: 2</text>
          </scroll-view>
          <scroll-view class="scroll-view-shrink blue" style="width: 100px; flex-shrink: 3;">
            <text class="scroll-view-label">flex-shrink: 3</text>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 flex-shrink </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <!-- view 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{flexShrink}}</text>
          <text class="uni-info">获取值: {{flexShrinkActual}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <view class="common-image red" style="flex-shrink: 1;"></view>
              <view ref="viewRef" class="common-image green test-view" :style="{ flexShrink: flexShrink }">
                <text class="test-label">{{flexShrink}}</text>
              </view>
              <view class="common-image blue" style="flex-shrink: 1;"></view>
            </view>
          </view>
        </view>

        <!-- text 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{flexShrink}}</text>
          <text class="uni-info">获取值: {{flexShrinkActualText}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <text class="common-text red" style="flex-shrink: 1;">红色</text>
              <text ref="textRef" class="common-text green test-text" :style="{ flexShrink: flexShrink }">text</text>
              <text class="common-text blue" style="flex-shrink: 1;">蓝色</text>
            </view>
          </view>
        </view>

        <!-- image 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{flexShrink}}</text>
          <text class="uni-info">获取值: {{flexShrinkActualImage}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <image class="common-image red" style="flex-shrink: 1;" src="/static/test-image/logo.png"></image>
              <image ref="imageRef" class="common-image green test-image" :style="{ flexShrink: flexShrink }" src="/static/test-image/logo.png"></image>
              <image class="common-image blue" style="flex-shrink: 1;" src="/static/test-image/logo.png"></image>
            </view>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <!-- view 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{flexShrink}}</text>
          <text class="uni-info">获取值: {{flexShrinkActualFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <view class="common-image red" style="flex-shrink: 1;"></view>
              <view ref="viewRefFlat" class="common-image green test-view-flatten" :style="{ flexShrink: flexShrink }" flatten>
                <text class="test-label">{{flexShrink}}</text>
              </view>
              <view class="common-image blue" style="flex-shrink: 1;"></view>
            </view>
          </view>
        </view>

        <!-- text 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{flexShrink}}</text>
          <text class="uni-info">获取值: {{flexShrinkActualTextFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <text class="common-text red" style="flex-shrink: 1;">红色</text>
              <text ref="textRefFlat" class="common-text green test-text-flatten" :style="{ flexShrink: flexShrink }" flatten>text</text>
              <text class="common-text blue" style="flex-shrink: 1;">蓝色</text>
            </view>
          </view>
        </view>

        <!-- image 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{flexShrink}}</text>
          <text class="uni-info">获取值: {{flexShrinkActualImageFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <image class="common-image red" style="flex-shrink: 1;" src="/static/test-image/logo.png"></image>
              <image ref="imageRefFlat" class="common-image green test-image-flatten" :style="{ flexShrink: flexShrink }" flatten src="/static/test-image/logo.png"></image>
              <image class="common-image blue" style="flex-shrink: 1;" src="/static/test-image/logo.png"></image>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="flexShrinkEnum" title="flex-shrink 枚举值" @change="radioChangeFlexShrink" :compact="true"></enum-data>
        <input-data :defaultValue="flexShrink" title="flex-shrink 自定义值" type="text" @confirm="inputChangeFlexShrink"></input-data>
      </view>

      <text class="uni-title-text uni-common-mt">native-view 组件：flex-shrink: 1 、2、3</text>
      <view class="demo-box uni-common-mb">
        <view class="flex-container-shrink">
          <native-view class="native-view-shrink red" style="width: 100px; flex-shrink: 1;"></native-view>
          <native-view class="native-view-shrink green" style="width: 100px; flex-shrink: 2;"></native-view>
          <native-view class="native-view-shrink blue" style="width: 100px; flex-shrink: 3;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const flexShrinkEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '1' },
    { value: 3, name: '2' },
    { value: 4, name: '3' }
  ]

  const flexShrink = ref('1')
  const flexShrinkActual = ref('')
  const flexShrinkActualFlat = ref('')
  const flexShrinkActualText = ref('')
  const flexShrinkActualImage = ref('')
  const flexShrinkActualTextFlat = ref('')
  const flexShrinkActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    flexShrinkActual.value = viewRef.value?.style.getPropertyValue('flex-shrink') ?? ''
    flexShrinkActualFlat.value = viewRefFlat.value?.style.getPropertyValue('flex-shrink') ?? ''
    flexShrinkActualText.value = textRef.value?.style.getPropertyValue('flex-shrink') ?? ''
    flexShrinkActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('flex-shrink') ?? ''
    flexShrinkActualImage.value = imageRef.value?.style.getPropertyValue('flex-shrink') ?? ''
    flexShrinkActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('flex-shrink') ?? ''
  }

  const changeFlexShrink = (value: string) => {
    flexShrink.value = value
    viewRef.value?.style.setProperty('flex-shrink', value)
    viewRefFlat.value?.style.setProperty('flex-shrink', value)
    textRef.value?.style.setProperty('flex-shrink', value)
    textRefFlat.value?.style.setProperty('flex-shrink', value)
    imageRef.value?.style.setProperty('flex-shrink', value)
    imageRefFlat.value?.style.setProperty('flex-shrink', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFlexShrink = (index: number) => {
    const selectedItem = flexShrinkEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFlexShrink(selectedItem.name)
    }
  }

  const inputChangeFlexShrink = (value: string) => {
    changeFlexShrink(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFlexShrink
  })
</script>

<style>
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .flex-container {
    width: 200px;
    margin: 0 10px;
    height: 100px;
    background-color: gray;
    flex-direction: row;
  }
  .common {
    width: 100px;
    height: 50px;
    justify-content: center;
    align-items: center;
  }

  .common-text {
    width: 60px;
    height: 30px;
    background-color: green;
    font-size: 12px;
    color: white;
  }

  .common-image {
    width: 60px;
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
    width: 135px;
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

  .test-label {
    font-size: 12px;
    color: white;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }

  .flex-container-shrink {
    width: 200px;
    height: 100px;
    background-color: gray;
    flex-direction: row;
    margin: 10px;
  }

  .scroll-view-shrink {
    height: 50px;
    justify-content: center;
    align-items: center;
  }

  .native-view-shrink {
    height: 50px;
    justify-content: center;
    align-items: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-shrink)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex-shrink)

