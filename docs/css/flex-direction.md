## flex-direction



flex-direction 属性设置弹性容器中的子元素的布局方向，该方向定义为主轴，另一个垂直与它的方向为交叉轴。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex-direction: row | row-reverse | column | column-reverse;
```



### 值限制
- enum



### flex-direction 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| row | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | flex 容器的主轴被定义为与文本方向相同。主轴起点和主轴终点与内容方向相同。 |
| row-reverse | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 表现和 row 相同，但是置换了主轴起点和主轴终点 |
| column | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | flex 容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同 |
| column-reverse | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 表现和column相同，但是置换了主轴起点和主轴终点 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | column |

 **注意**：W3C 默认值为：row

### 适用组件 @unix-tags 
 - [view](/component/view.md)
- [scroll-view](/component/scroll-view.md)
- [list-item](/component/list-item.md)
- [swiper-item](/component/swiper-item.md)
- [flow-item](/component/flow-item.md)
- [navigator](/component/navigator.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/flex-direction.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/flex-direction.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/flex-direction

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/flex-direction

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>flex-direction: row</text>
        <view class="demo-box">
          <view class="common" style="flex-direction: row">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-direction: row" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-direction: row-reverse</text>
        <view class="demo-box">
          <view class="common" style="flex-direction: row-reverse">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-direction: row-reverse" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-direction: column</text>
        <view class="demo-box">
          <view class="common" style="flex-direction: column">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-direction: column" flatten>
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-direction: column-reverse</text>
        <view class="demo-box">
          <view class="common" style="flex-direction: column-reverse">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </view>
          <view class="common" style="flex-direction: column-reverse" flatten>
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
        <text class="uni-subtitle-text">flex-direction：row 和 column</text>
        <view class="demo-box">
          <scroll-view class="common" style="flex-direction: row;" direction="horizontal">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </scroll-view>
          <scroll-view class="common" style="flex-direction: column;" direction="horizontal">
            <view class="flex-item red"></view>
            <view class="flex-item green"></view>
            <view class="flex-item blue"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 flex-direction </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">flex-direction</text>
          <text class="uni-info">设置值: {{flexDirection}}</text>
          <text class="uni-info">获取值: {{flexDirectionActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="test-flex-container test-view" :style="{ flexDirection: flexDirection }">
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{flexDirection}}</text>
          <text class="uni-info">获取值: {{flexDirectionActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="test-flex-container test-view-flatten" :style="{ flexDirection: flexDirection }" flatten>
              <view class="test-item-small red"></view>
              <view class="test-item-small green"></view>
              <view class="test-item-small blue"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="flexDirectionEnum" title="flex-direction 枚举值" @change="radioChangeFlexDirection" :compact="true"></enum-data>
        <input-data :defaultValue="flexDirection" title="flex-direction 自定义值" type="text" @confirm="inputChangeFlexDirection"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const flexDirectionEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'row' },
    { value: 2, name: 'row-reverse' },
    { value: 3, name: 'column' },
    { value: 4, name: 'column-reverse' }
  ]

  const flexDirection = ref('row')
  const flexDirectionActual = ref('')
  const flexDirectionActualFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)

  const getPropertyValues = () => {
    flexDirectionActual.value = viewRef.value?.style.getPropertyValue('flex-direction') ?? ''
    flexDirectionActualFlat.value = viewRefFlat.value?.style.getPropertyValue('flex-direction') ?? ''
  }

  const changeFlexDirection = (value: string) => {
    flexDirection.value = value
    viewRef.value?.style.setProperty('flex-direction', value)
    viewRefFlat.value?.style.setProperty('flex-direction', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFlexDirection = (index: number) => {
    const selectedItem = flexDirectionEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFlexDirection(selectedItem.name)
    }
  }

  const inputChangeFlexDirection = (value: string) => {
    changeFlexDirection(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFlexDirection
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
    height: 220px;
    background-color: gray;
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
  }

  .test-item-small {
    width: 30px;
    height: 30px;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-direction)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex-direction)

