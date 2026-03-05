## flex-wrap



flex-wrap 属性设置弹性容器中的子元素在主轴方向是单行（列）还是多行（列）显示，以及多行（列）显示时的堆叠方向。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
flex-wrap: nowrap | wrap | wrap-reverse;
```



### 值限制
- enum



### flex-wrap 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| nowrap | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。cross-start 会根据 flex-direction 的值等价于 start 或 before。为该属性的默认值。 |
| wrap | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 换行，第一行在上方。 |
| wrap-reverse | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 和 wrap 的行为一样，但是 cross-start 和 cross-end 互换。 |


### 默认值 @default-value 
 `nowrap`

### 适用组件 @unix-tags 
 - [view](/component/view.md)
- [scroll-view](/component/scroll-view.md)
- [list-item](/component/list-item.md)
- [flow-item](/component/flow-item.md)
- [swiper-item](/component/swiper-item.md)
- [navigator](/component/navigator.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/flex/flex-wrap.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/flex/flex-wrap.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/flex/flex-wrap

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/flex/flex-wrap

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>flex-wrap: nowrap</text>
        <view class="demo-box">
          <view class="common" style="flex-wrap: nowrap">
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
          </view>
          <view class="common" style="flex-wrap: nowrap" flatten>
            <view class="common-item red" flatten></view>
            <view class="common-item green" flatten></view>
            <view class="common-item blue" flatten></view>
            <view class="common-item red" flatten></view>
            <view class="common-item green" flatten></view>
            <view class="common-item blue" flatten></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-wrap: wrap</text>
        <view class="demo-box">
          <view class="common" style="flex-wrap: wrap">
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
          </view>
          <view class="common" style="flex-wrap: wrap" flatten>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>flex-wrap: wrap-reverse</text>
        <view class="demo-box">
          <view class="common" style="flex-wrap: wrap-reverse">
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
          </view>
          <view class="common" style="flex-wrap: wrap-reverse" flatten>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
            <view class="common-item red"></view>
            <view class="common-item green"></view>
            <view class="common-item blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>
      <text class="uni-subtitle-text">flex-wrap: wrap 和 nowrap</text>
      <view class="demo-box">
        <scroll-view class="common" style="flex-wrap: wrap;" direction="horizontal">
          <view class="common-item red"></view>
          <view class="common-item green"></view>
          <view class="common-item blue"></view>
          <view class="common-item red"></view>
          <view class="common-item green"></view>
          <view class="common-item blue"></view>
        </scroll-view>
        <scroll-view class="common" style="flex-wrap: nowrap;" direction="horizontal">
          <view class="common-item red"></view>
          <view class="common-item green"></view>
          <view class="common-item blue"></view>
          <view class="common-item red"></view>
          <view class="common-item green"></view>
          <view class="common-item blue"></view>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 flex-wrap </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">flex-wrap</text>
          <text class="uni-info">设置值: {{flexWrap}}</text>
          <text class="uni-info">获取值: {{flexWrapActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="test-flex-container test-view" :style="{ flexWrap: flexWrap }">
              <view class="common-item red"></view>
              <view class="common-item green"></view>
              <view class="common-item blue"></view>
              <view class="common-item red"></view>
              <view class="common-item green"></view>
              <view class="common-item blue"></view>
            </view>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{flexWrap}}</text>
          <text class="uni-info">获取值: {{flexWrapActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="test-flex-container test-view-flatten" :style="{ flexWrap: flexWrap }" flatten>
              <view class="common-item red"></view>
              <view class="common-item green"></view>
              <view class="common-item blue"></view>
              <view class="common-item red"></view>
              <view class="common-item green"></view>
              <view class="common-item blue"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="flexWrapEnum" title="flex-wrap 枚举值" @change="radioChangeFlexWrap"
          :compact="true"></enum-data>
        <input-data :defaultValue="flexWrap" title="flex-wrap 自定义值" type="text"
          @confirm="inputChangeFlexWrap"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const flexWrapEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'nowrap' },
    { value: 2, name: 'wrap' },
    { value: 3, name: 'wrap-reverse' }
  ]

  const flexWrap = ref('nowrap')
  const flexWrapActual = ref('')
  const flexWrapActualFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const viewRefFlat = ref(null as UniElement | null)

  const getPropertyValues = () => {
    flexWrapActual.value = viewRef.value?.style.getPropertyValue('flex-wrap') ?? ''
    flexWrapActualFlat.value = viewRefFlat.value?.style.getPropertyValue('flex-wrap') ?? ''
  }

  const changeFlexWrap = (value : string) => {
    flexWrap.value = value
    viewRef.value?.style.setProperty('flex-wrap', value)
    viewRefFlat.value?.style.setProperty('flex-wrap', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFlexWrap = (index : number) => {
    const selectedItem = flexWrapEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeFlexWrap(selectedItem.name)
    }
  }

  const inputChangeFlexWrap = (value : string) => {
    changeFlexWrap(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFlexWrap
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
    height: 150px;
    background-color: gray;
    flex-direction: row;
  }

  .common-box {
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 140px;
    background-color: gray;
  }


  .test-flex-container {
    width: 100%;
    height: 100%;
    background-color: gray;
    flex-direction: row;
  }

  .common-item {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
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

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/flex-wrap)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.flex-wrap)

