## align-content



align-content 属性用于在 Flex 弹性布局中设置多行（或多列）作为一个整体在交叉轴方向的分布方式。注意：如果子元素只有一行（或一列）该属性不起作用，需配合 flex-wrap: wrap 使用。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
align-content: normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>;
```



### 值限制
- enum



### align-content 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| center | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所有行朝向容器的中心填充。每行互相紧挨，相对于容器居中对齐。容器的交叉轴起点边和第一行的距离相等于容器的交叉轴终点边和最后一行的距离。 |
| flex-start | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所有行从容器交叉轴起点开始填充。第一行的交叉轴起点边和容器的交叉轴起点边对齐。接下来的每一行紧跟前一行。 |
| flex-end | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所有行从容器交叉轴末尾开始填充。最后一行的交叉轴终点和容器的交叉轴终点对齐，同时所有后续行与前一个对齐。 |
| space-between | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所有行在容器中平均分布，相邻两行间距相等。容器的交叉轴起点边和终点边分别与第一行和最后一行的边对齐。 |
| space-around | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 所有行在容器中平均分布，相邻两行间距相等。容器的交叉轴起点边和终点边分别与第一行和最后一行的距离是相邻两行间距的一半。 |
| stretch | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 拉伸所有行来填满剩余空间，剩余空间平均地分配给每一行。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | stretch |

 **注意**：W3C 默认值为：normal

按W3C规范，normal值在弹性布局（display: flex）中行为与stretch一致，详情参考：[CSS Box Alignment](https://drafts.csswg.org/css-align/#distribution-flex)。

### 适用组件 @unix-tags 
 - [view](/component/view.md)
- [scroll-view](/component/scroll-view.md)
- [list-view](/component/list-view.md)
- [list-item](/component/list-item.md)
- [flow-item](/component/flow-item.md)
- [swiper-item](/component/swiper-item.md)
- [navigator](/component/navigator.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/align-content.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/align-content.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/align-content

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/align-content

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>align-content: center</text>
        <view class="demo-box">
          <view class="common" style="align-content: center">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-content: center" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-content: flex-start</text>
        <view class="demo-box">
          <view class="common" style="align-content: flex-start">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-content: flex-start" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-content: flex-end</text>
        <view class="demo-box">
          <view class="common" style="align-content: flex-end">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-content: flex-end" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-content: space-between</text>
        <view class="demo-box">
          <view class="common" style="align-content: space-between">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-content: space-between" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-content: space-around</text>
        <view class="demo-box">
          <view class="common" style="align-content: space-around">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="align-content: space-around" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>align-content: stretch</text>
        <view class="demo-box">
          <view class="common" style="align-content: stretch">
            <view class="flex-item-stretch red"></view>
            <view class="flex-item-stretch green"></view>
            <view class="flex-item-stretch blue"></view>
            <view class="flex-item-stretch red"></view>
            <view class="flex-item-stretch green"></view>
            <view class="flex-item-stretch blue"></view>
          </view>
          <view class="common" style="align-content: stretch" flatten>
            <view class="flex-item-stretch red"></view>
            <view class="flex-item-stretch green"></view>
            <view class="flex-item-stretch blue"></view>
            <view class="flex-item-stretch red"></view>
            <view class="flex-item-stretch green"></view>
            <view class="flex-item-stretch blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
        <text class="uni-subtitle-text">align-content: center; 和 align-content: flex-start;</text>
      </view>

      <view class="demo-box">
        <scroll-view class="common" style="align-content: center;" direction="horizontal">
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </scroll-view>
        <scroll-view class="common" style="align-content: flex-start;" direction="horizontal">
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
          <view class="flex-item red"></view>
          <view class="flex-item green"></view>
          <view class="flex-item blue"></view>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 align-content </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">align-content</text>
          <text class="uni-info">设置值: {{alignContent}}</text>
          <text class="uni-info">获取值: {{alignContentActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="test-flex-container test-view" :style="{ alignContent: alignContent }">
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{alignContent}}</text>
          <text class="uni-info">获取值: {{alignContentActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="test-flex-container test-view-flatten" :style="{ alignContent: alignContent }" flatten>
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="alignContentEnum" title="align-content 枚举值" @change="radioChangeAlignContent" :compact="true"></enum-data>
        <input-data :defaultValue="alignContent" title="align-content 自定义值" type="text" @confirm="inputChangeAlignContent"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const alignContentEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'flex-start' },
    { value: 2, name: 'flex-end' },
    { value: 3, name: 'center' },
    { value: 4, name: 'space-between' },
    { value: 5, name: 'space-around' },
    { value: 6, name: 'stretch' }
  ]

  const alignContent = ref('center')
  const alignContentActual = ref('')
  const alignContentActualFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)

  const getPropertyValues = () => {
    alignContentActual.value = viewRef.value?.style.getPropertyValue('align-content') ?? ''
    alignContentActualFlat.value = viewRefFlat.value?.style.getPropertyValue('align-content') ?? ''
  }

  const changeAlignContent = (value: string) => {
    alignContent.value = value
    viewRef.value?.style.setProperty('align-content', value)
    viewRefFlat.value?.style.setProperty('align-content', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeAlignContent = (index: number) => {
    const selectedItem = alignContentEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeAlignContent(selectedItem.name)
    }
  }

  const inputChangeAlignContent = (value: string) => {
    changeAlignContent(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeAlignContent
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
    border-bottom:#ddd solid 1px;
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
    height: 160px;
    background-color: gray;
    flex-flow: row wrap;
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
    flex-flow: row wrap;
  }

  .test-item-small {
    width: 35px;
    height: 35px;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/align-content)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.align-content)

