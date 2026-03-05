## align-items



align-items 属性将所有直接子元素上的 align-self 值设置为一个组。在 Flex 弹性布局中控制子元素在交叉轴方向的对齐方式，相当于为所有子元素设置了默认的 align-self 值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
align-items: normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ];
```



### 值限制
- enum



### align-items 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| center | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴上居中。如果元素在交叉轴上的尺寸（高度/宽度）大于其容器，那么在两个方向均等溢出。 |
| flex-start | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴上对齐起始位置。 |
| flex-end | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴上对齐结尾位置。 |
| stretch | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素在交叉轴方向未设置尺寸（高度/宽度）或设置为 auto，会被拉伸到与行相同的高度或列相同的宽度。同时元素仍然保持其宽高比例的约束。 |
| baseline | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 所有元素向基线对齐。交叉轴起点到元素基线距离最大的元素将会于交叉轴起点对齐以确定基线。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | stretch |

 **注意**：W3C 默认值为：normal

### 适用组件 @unix-tags 
 - [view](/component/view.md)
- [scroll-view](/component/scroll-view.md)
- [list-view](/component/list-view.md)
- [list-item](/component/list-item.md)
- [flow-item](/component/flow-item.md)
- [swiper-item](/component/swiper-item.md)
- [navigator](/component/navigator.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/align-items.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/align-items.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/align-items

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/align-items

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>align-items: center</text>
        <view class="demo-box">
          <view class="common" style="align-items: center">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-items: center" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-items: flex-start</text>
        <view class="demo-box">
          <view class="common" style="align-items: flex-start">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-items: flex-start" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-items: flex-end</text>
        <view class="demo-box">
          <view class="common" style="align-items: flex-end">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-items: flex-end" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-items: stretch</text>
        <view class="demo-box">
          <view class="common" style="align-items: stretch">
            <view class="flex-item-stretch red"></view>
            <view class="flex-item-stretch green"></view>
            <view class="flex-item-stretch blue"></view>
          </view>
          <view class="common" style="align-items: stretch" flatten>
            <view class="flex-item-stretch red"></view>
            <view class="flex-item-stretch green"></view>
            <view class="flex-item-stretch blue"></view>
          </view>
        </view>
        </view>
      </view>

      <view>
        <text>text组件 align-items: center</text>
        <view class="demo-box">
          <view class="common" style="align-items: center">
            <text class="flex-item red">text1</text>
            <text class="flex-item green">text2</text>
            <text class="flex-item blue">text3</text>
          </view>
          <view class="common" style="align-items: center" flatten>
            <text class="flex-item red">text1</text>
            <text class="flex-item green">text2</text>
            <text class="flex-item blue">text3</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view>
        <text class="uni-subtitle-text">align-items: center; 和 align-items: flex-start;</text>
        <view class="demo-box">
          <scroll-view class="common" style="align-items: center;" direction="horizontal">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </scroll-view>
          <scroll-view class="common" style="align-items: flex-start;" direction="horizontal">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 align-items </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">align-items</text>
          <text class="uni-info">设置值: {{alignItems}}</text>
          <text class="uni-info">获取值: {{alignItemsActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="test-flex-container test-view" :style="{ alignItems: alignItems }">
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{alignItems}}</text>
          <text class="uni-info">获取值: {{alignItemsActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="test-flex-container test-view-flatten" :style="{ alignItems: alignItems }" flatten>
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="alignItemsEnum" title="align-items 枚举值" @change="radioChangeAlignItems" :compact="true"></enum-data>
          <input-data :defaultValue="alignItems" title="align-items 自定义值" type="text" @confirm="inputChangeAlignItems"></input-data>
      </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const alignItemsEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'flex-start' },
    { value: 2, name: 'flex-end' },
    { value: 3, name: 'center' },
    { value: 4, name: 'stretch' }
  ]

  const alignItems = ref('center')
  const alignItemsActual = ref('')
  const alignItemsActualFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)

  const getPropertyValues = () => {
    alignItemsActual.value = viewRef.value?.style.getPropertyValue('align-items') ?? ''
    alignItemsActualFlat.value = viewRefFlat.value?.style.getPropertyValue('align-items') ?? ''
  }

  const changeAlignItems = (value: string) => {
    alignItems.value = value
    viewRef.value?.style.setProperty('align-items', value)
    viewRefFlat.value?.style.setProperty('align-items', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeAlignItems = (index: number) => {
    const selectedItem = alignItemsEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeAlignItems(selectedItem.name)
    }
  }

  const inputChangeAlignItems = (value: string) => {
    changeAlignItems(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeAlignItems
  })
</script>

<style>
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .flex-item {
    width: 40px;
    height: 40px;
  }

  .flex-item-stretch {
    width: 40px;
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
    flex: 1;
    margin: 0 10px;
    height: 100px;
    background-color: gray;
    flex-direction: row;
  }

  .common-scroll {
    flex: 1;
    margin: 0 10px;
    height: 100px;
    background-color: gray;
    flex-direction: row;
  }

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 150px;
    background-color: gray;
  }


  .test-flex-container {
    width: 100%;
    height: 100%;
    background-color: gray;
    flex-direction: row;
  }

  .test-item-small {
    width: 30px;
    height: 30px;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/align-items)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.align-items)

