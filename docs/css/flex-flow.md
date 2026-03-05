## flex-flow



flex-flow 属性设置弹性容器中子元素的布局主轴方向及单或多行（列）堆叠方向，，是 flex-direction、flex-wrap 的简写。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex-flow: <'flex-direction'> || <'flex-wrap'>;
```



### 值限制
- enum



### flex-flow 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| column | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 主轴为垂直方向，起点在上沿。 |
| column-reverse | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 主轴为垂直方向（与column相同），起点在下沿（与column相反）。 |
| row | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 主轴为水平方向，起点在左端。 |
| row-reverse | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 主轴为水平方向（与row相同），起点在右端（与row相反）。 |
| nowrap | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不换行。 |
| wrap | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 换行，第一行在上方。 |
| wrap-reverse | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 换行（与wrap相同），第一行在下方（与wrap相反）。 |




### 适用组件 @unix-tags 
 - [view](/component/view.md)
- [scroll-view](/component/scroll-view.md)
- [list-view](/component/list-view.md)
- [list-item](/component/list-item.md)
- [flow-item](/component/flow-item.md)
- [swiper-item](/component/swiper-item.md)
- [navigator](/component/navigator.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/flex-flow.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/flex-flow.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/flex-flow

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/flex-flow

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>flex-flow: row nowrap</text>
        <view class="demo-box">
          <view class="common" style="flex-flow: row nowrap">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-flow: row nowrap" flatten>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-flow: row wrap</text>
        <view class="demo-box">
          <view class="common" style="flex-flow: row wrap">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-flow: row wrap" flatten>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-flow: column nowrap</text>
        <view class="demo-box">
          <view class="common" style="flex-flow: column nowrap">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-flow: column nowrap" flatten>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-flow: column wrap</text>
        <view class="demo-box">
          <view class="common" style="flex-flow: column wrap">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-flow: column wrap" flatten>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
            <view class="flex-item red" flatten></view>
            <view class="flex-item green" flatten></view>
            <view class="flex-item blue" flatten></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
        <text class="uni-subtitle-text">flex-flow: row wrap 和 flex-flow: column nowrap</text>
      </view>

      <view class="demo-box">
        <scroll-view class="common" style="flex-flow: row wrap;" direction="horizontal">
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </scroll-view>
        <scroll-view class="common" style="flex-flow: column nowrap;" direction="horizontal">
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 flex-flow </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">flex-flow</text>
          <text class="uni-info">设置值: {{flexFlow}}</text>
          <text class="uni-info">获取值: {{flexFlowActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="test-flex-container test-view" :style="{ flexFlow: flexFlow }">
              <view class="test-item red"></view>
              <view class="test-item green"></view>
              <view class="test-item blue"></view>
              <view class="test-item red"></view>
              <view class="test-item green"></view>
              <view class="test-item blue"></view>
            </view>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{flexFlow}}</text>
          <text class="uni-info">获取值: {{flexFlowActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="test-flex-container test-view-flatten" :style="{ flexFlow: flexFlow }" flatten>
              <view class="test-item red" flatten></view>
              <view class="test-item green" flatten></view>
              <view class="test-item blue" flatten></view>
              <view class="test-item red" flatten></view>
              <view class="test-item green" flatten></view>
              <view class="test-item blue" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="flexFlowEnum" title="flex-flow 枚举值" @change="radioChangeFlexFlow" :compact="true"></enum-data>
          <input-data :defaultValue="flexFlow" title="flex-flow 自定义值" type="text" @confirm="inputChangeFlexFlow"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const flexFlowEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'row nowrap' },
    { value: 2, name: 'row wrap' },
    { value: 3, name: 'row wrap-reverse' },
    { value: 4, name: 'column nowrap' },
    { value: 5, name: 'column wrap' },
    { value: 6, name: 'column wrap-reverse' }
  ]

  const flexFlow = ref('row wrap')
  const flexFlowActual = ref('')
  const flexFlowActualFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)

  const getPropertyValues = () => {
    flexFlowActual.value = viewRef.value?.style.getPropertyValue('flex-flow') ?? ''
    flexFlowActualFlat.value = viewRefFlat.value?.style.getPropertyValue('flex-flow') ?? ''
  }

  const changeFlexFlow = (value : string) => {
    flexFlow.value = value
    viewRef.value?.style.setProperty('flex-flow', value)
    viewRefFlat.value?.style.setProperty('flex-flow', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFlexFlow = (index: number) => {
    const selectedItem = flexFlowEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFlexFlow(selectedItem.name)
    }
  }

  const inputChangeFlexFlow = (value: string) => {
    changeFlexFlow(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFlexFlow
  })
</script>

<style>
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .common {
    flex: 1;
    margin: 0 10px;
    height: 190px;
    background-color: gray;
  }

  .flex-item {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-bottom:#ddd solid 1px;
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
  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 180px;
    background-color: gray;
  }


  .test-flex-container {
    width: 100%;
    height: 100%;
    background-color: gray;
  }

  .test-item {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-flow)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex-flow)

