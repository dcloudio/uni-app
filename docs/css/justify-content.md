## justify-content



justify-content 属性设置弹性容器的子元素在主轴方向的对齐方式，控制如何在主轴方向分配内容元素之间和周围的空间。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
justify-content: normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ];
```



### 值限制
- enum



### justify-content 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| center | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素紧密地排列在主轴方向居中对齐。第一个元素到主轴首的距离将与最后一个元素到主轴尾的距离相同 |
| flex-start | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素紧密地排列在容器主轴起始侧 |
| flex-end | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素紧密地排列在容器主轴结束侧 |
| space-between | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在主轴上均匀分配元素，相邻元素间距离相同。第一个元素与主轴首对齐，最后一个元素与主轴尾对齐 |
| space-around | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素沿着主轴均匀分布在容器中，相邻元素间距离相同。主轴起始位置到第一个元素的间距，主轴结束位置到最后一个元素的间距，是相邻元素之间距离的一半 |
| space-evenly | Web: 4.0; Android: 4.61; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素都沿着主轴均匀分布在指定的对齐容器中。相邻元素之间的间距，主轴起始位置到第一个元素的间距，主轴结束位置到最后一个元素的间距，都完全一样 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | flex-start |

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
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/justify-content.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/justify-content.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/justify-content

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/justify-content

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>justify-content: center</text>
        <view class="demo-box">
          <view class="common" style="justify-content: center">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="justify-content: center" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>justify-content: flex-start</text>
        <view class="demo-box">
          <view class="common" style="justify-content: flex-start">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="justify-content: flex-start" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>justify-content: flex-end</text>
        <view class="demo-box">
          <view class="common" style="justify-content: flex-end">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="justify-content: flex-end" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>justify-content: space-between</text>
        <view class="demo-box">
          <view class="common" style="justify-content: space-between">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="justify-content: space-between" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>justify-content: space-around</text>
        <view class="demo-box">
          <view class="common" style="justify-content: space-around">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="justify-content: space-around" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>justify-content: space-evenly </text>
        <view class="demo-box">
          <view class="common" style="justify-content: space-evenly">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="justify-content: space-evenly" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view>
        <text class="uni-subtitle-text">justify-content：center 和 space-between</text>
        <view class="demo-box">
          <scroll-view class="common" style="justify-content: center;" direction="horizontal">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </scroll-view>
          <scroll-view class="common" style="justify-content: space-between;" direction="horizontal">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 justify-content </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">justify-content</text>
          <text class="uni-info">设置值: {{justifyContent}}</text>
          <text class="uni-info">获取值: {{justifyContentActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="test-flex-container test-view" :style="{ justifyContent: justifyContent }">
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{justifyContent}}</text>
          <text class="uni-info">获取值: {{justifyContentActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="test-flex-container test-view-flatten" :style="{ justifyContent: justifyContent }" flatten>
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="justifyContentEnum" title="justify-content 枚举值" @change="radioChangeJustifyContent" :compact="true"></enum-data>
        <input-data :defaultValue="justifyContent" title="justify-content 自定义值" type="text" @confirm="inputChangeJustifyContent"></input-data>
      </view>

    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const justifyContentEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'flex-start' },
    { value: 2, name: 'flex-end' },
    { value: 3, name: 'center' },
    { value: 4, name: 'space-between' },
    { value: 5, name: 'space-around' },
    { value: 6, name: 'space-evenly' }
  ]

  const justifyContent = ref('center')
  const justifyContentActual = ref('')
  const justifyContentActualFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)

  const getPropertyValues = () => {
    justifyContentActual.value = viewRef.value?.style.getPropertyValue('justify-content') ?? ''
    justifyContentActualFlat.value = viewRefFlat.value?.style.getPropertyValue('justify-content') ?? ''
  }

  const changeJustifyContent = (value: string) => {
    justifyContent.value = value
    viewRef.value?.style.setProperty('justify-content', value)
    viewRefFlat.value?.style.setProperty('justify-content', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeJustifyContent = (index: number) => {
    const selectedItem = justifyContentEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeJustifyContent(selectedItem.name)
    }
  }

  const inputChangeJustifyContent = (value: string) => {
    changeJustifyContent(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeJustifyContent
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
    height: 80px;
    background-color: gray;
    flex-direction: row;
  }

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 100px;
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
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/justify-content)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.justify-content)

