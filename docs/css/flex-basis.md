## flex-basis



flex-basis 属性设置弹性元素在主轴方向的初始大小，即在分配剩余空间（flex-grow）或收缩溢出空间（flex-shrink）的基准尺寸。当弹性元素同时设置了 flex-basis（除 auto 外的值）和 width（或 flex-direction 为 column 时设置了 height），flex-basis 的优先级更高。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex-basis: content | <'width'>;
```



### 值限制
- number
- length
- percentage



### flex-basis 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 参照元素的 `width` 和 `height` 属性计算初始大小。 |
| content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 基于 flex 的元素的内容自动调整大小。<br/>    <br/>      **备注：**由于最初规范中没有包括这个值，在一些早期的浏览器实现的 flex 布局中，content 值无效，可以利用设置 (width 或 height) 为 auto 达到同样的效果。<br/>    <br/>    <br/>      备注： 简史<br/>      <br/>        最初，"flex-basis:auto" 的含义是 "参照我的width和height属性".<br/>        在此之后，"flex-basis:auto" 的含义变成了自动尺寸，而 "main-size" 变成了 "参照我的width和height属性"。实际执行于 bug 1032922.<br/>        然后呢，这个更改又在 bug 1093316 中被撤销了，所以 "auto" 变回了原来的含义; 而一个新的关键字 'content' 变成了自动尺寸。 (Firefox bug 1105111 包括了增加这个关键字). |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/flex-basis.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/flex-basis.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/flex-basis

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/flex-basis

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>flex-basis</text>
        <view class="demo-box">
          <view class="flex-container">
            <view class="common" style="flex-basis: 100px">
              <text>100px</text>
            </view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="flex-container">
            <view class="common" style="flex-basis: 100px" flatten>
              <text>100px</text>
            </view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <view class="flex-container">
          <scroll-view class="common" style="flex-basis: 50px;">
            <text class="scroll-view-label">50px</text>
          </scroll-view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </view>
        <view class="flex-container">
          <scroll-view class="common" style="flex-basis: 100px;">
            <text class="scroll-view-label">100px</text>
          </scroll-view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 flex-basis </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <!-- view 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{flexBasis}}</text>
          <text class="uni-info">获取值: {{flexBasisActual}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <view class="common-image red"></view>
              <view ref="viewRef" class="common-image green test-view" :style="{ flexBasis: flexBasis }">
                <text class="test-label">view</text>
              </view>
              <view class="common-image blue"></view>
            </view>
          </view>
        </view>

        <!-- text 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{flexBasis}}</text>
          <text class="uni-info">获取值: {{flexBasisActualText}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <text class="common-text red">红色</text>
              <text ref="textRef" class="common-text green test-text" :style="{ flexBasis: flexBasis }">text</text>
              <text class="common-text blue">蓝色</text>
            </view>
          </view>
        </view>

        <!-- image 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{flexBasis}}</text>
          <text class="uni-info">获取值: {{flexBasisActualImage}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <image class="common-image red" src="/static/test-image/logo.png"></image>
              <image ref="imageRef" class="common-image green test-image" :style="{ flexBasis: flexBasis }" src="/static/test-image/logo.png"></image>
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
          <text class="uni-info">设置值: {{flexBasis}}</text>
          <text class="uni-info">获取值: {{flexBasisActualFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <view class="common-image red"></view>
              <view ref="viewRefFlat" class="common-image green test-view-flatten" :style="{ flexBasis: flexBasis }" flatten>
                <text class="test-label">view</text>
              </view>
              <view class="common-image blue"></view>
            </view>
          </view>
        </view>

        <!-- text 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{flexBasis}}</text>
          <text class="uni-info">获取值: {{flexBasisActualTextFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <text class="common-text red">红色</text>
              <text ref="textRefFlat" class="common-text green test-text-flatten" :style="{ flexBasis: flexBasis }" flatten>text</text>
              <text class="common-text blue">蓝色</text>
            </view>
          </view>
        </view>

        <!-- image 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{flexBasis}}</text>
          <text class="uni-info">获取值: {{flexBasisActualImageFlat}}</text>
          <view class="test-box">
            <view class="test-flex-container">
              <image class="common-image red" src="/static/test-image/logo.png"></image>
              <image ref="imageRefFlat" class="common-image green test-image-flatten" :style="{ flexBasis: flexBasis }" flatten src="/static/test-image/logo.png"></image>
              <image class="common-image blue" src="/static/test-image/logo.png"></image>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="flexBasisEnum" title="flex-basis 枚举值" @change="radioChangeFlexBasis" :compact="true"></enum-data>
        <input-data :defaultValue="flexBasis" title="flex-basis 自定义值" type="text" @confirm="inputChangeFlexBasis"></input-data>
      </view>

      <text class="uni-title-text">native-view 组件：flex-basis: 50px 和 100px</text>
      <view class="demo-box uni-common-mb">
        <view class="flex-container">
          <native-view class="common" style="flex-basis: 50px;"></native-view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </view>
        <view class="flex-container">
          <native-view class="common" style="flex-basis: 100px;"></native-view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const flexBasisEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '50px' },
    { value: 4, name: '0%' },
    { value: 5, name: '50%' },
    { value: 6, name: 'auto' },
  ]

  const flexBasis = ref('30px')
  const flexBasisActual = ref('')
  const flexBasisActualFlat = ref('')
  const flexBasisActualText = ref('')
  const flexBasisActualImage = ref('')
  const flexBasisActualTextFlat = ref('')
  const flexBasisActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    flexBasisActual.value = viewRef.value?.style.getPropertyValue('flex-basis') ?? ''
    flexBasisActualFlat.value = viewRefFlat.value?.style.getPropertyValue('flex-basis') ?? ''
    flexBasisActualText.value = textRef.value?.style.getPropertyValue('flex-basis') ?? ''
    flexBasisActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('flex-basis') ?? ''
    flexBasisActualImage.value = imageRef.value?.style.getPropertyValue('flex-basis') ?? ''
    flexBasisActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('flex-basis') ?? ''
  }

  const changeFlexBasis = (value: string) => {
    flexBasis.value = value
    viewRef.value?.style.setProperty('flex-basis', value)
    viewRefFlat.value?.style.setProperty('flex-basis', value)
    textRef.value?.style.setProperty('flex-basis', value)
    textRefFlat.value?.style.setProperty('flex-basis', value)
    imageRef.value?.style.setProperty('flex-basis', value)
    imageRefFlat.value?.style.setProperty('flex-basis', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFlexBasis = (index: number) => {
    const selectedItem = flexBasisEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFlexBasis(selectedItem.name)
    }
  }

  const inputChangeFlexBasis = (value: string) => {
    changeFlexBasis(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFlexBasis
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
    height: 80px;
    background-color: gray;
    flex-direction: row;
  }
  .flex-item {
    width: 40px;
    height: 40px;
  }
  .red {
    background-color: red;
  }
  .green {
    background-color: green;
  }
  .blue {
    background-color: blue;
  }
  .common {
    width: 40px;
    height: 40px;
    background-color: red;
    justify-content: center;
    align-items: center;
  }

  .common-text {
    width: 30px;
    height: 30px;
    font-size: 12px;
    color: white;
  }

  .common-image {
    width: 30px;
    height: 30px;
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


  .test-label {
    font-size: 12px;
  }

  .scroll-view-label {
    font-size: 12px;
    line-height: 50px;
    text-align: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-basis)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex-basis)

