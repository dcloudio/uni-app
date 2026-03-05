## font-size



font-size 属性用于设置字体大小，更改字体大小还会更新字体大小相关的 `<length>` 单位，例如 line-height 属性的 em 单位值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
font-size: <absolute-size> | <relative-size> | <length-percentage>;
```



### 值限制
- length



### font-size 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| large | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| larger | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 相对大小关键字。字体大小将相对于父元素的字体大小变大或变小，大致按照上面用于区分绝对大小关键字的比率。 |
| medium | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| small | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| smaller | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 相对大小关键字。字体大小将相对于父元素的字体大小变大或变小，大致按照上面用于区分绝对大小关键字的比率。 |
| x-large | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| x-small | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| xx-large | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| xx-small | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| xxx-large | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 基于用户默认字体大小（medium）的绝对大小关键字。 |
| math | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用特殊的数学缩放规则来确定 font-size 属性的计算值。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | 16px |

 **注意**：W3C 默认值为：medium

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/font-size.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/font-size.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/font-size

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/font-size

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view class="demo-box">
        <view class="common">
          <text ref="text" :style="{'font-size': fontSize}">font-size: {{fontSize}}</text>
          <text style="font-size: 30px;">font-size: 30px</text>
        </view>
        <view class="common">
          <text ref="text" :style="{'font-size': fontSize}" flatten>font-size: {{fontSize}}</text>
          <text style="font-size: 30px;" flatten>font-size: 30px</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 font-size 测试</text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">font-size</text>
          <text class="uni-info">设置值: {{fontSizeProp}}</text>
          <text class="uni-info">获取值: {{fontSizeActual}}</text>
          <view class="test-box">
            <text ref="textRef" :style="{ fontSize: fontSizeProp }">当前 font-size: {{fontSizeProp}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">测试拍平</text>
          <text class="uni-info">设置值: {{fontSizeProp}}</text>
          <text class="uni-info">获取值: {{fontSizeActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" :style="{ fontSize: fontSizeProp }" flatten>当前 font-size: {{fontSizeProp}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="fontSizeEnum" title="font-size 枚举值" @change="radioChangeFontSize" :compact="true"></enum-data>
          <input-data :defaultValue="fontSizeProp" title="font-size 自定义值" type="text" @confirm="inputChangeFontSize"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const fontSize = ref('15px')
  // 自动化测试
  const setFontSize = () => {
    fontSize.value = '30px'
  }

  defineExpose({
    setFontSize
  })

  const fontSizeEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '10px' },
    { value: 4, name: '20px' },
    { value: 5, name: '0rpx' },
    { value: 6, name: '20rpx' },
  ]

  const fontSizeProp = ref('15px')
  const fontSizeActual = ref('')
  const fontSizeActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    fontSizeActual.value = textRef.value?.style.getPropertyValue('font-size') ?? ''
    fontSizeActualFlat.value = textRefFlat.value?.style.getPropertyValue('font-size') ?? ''
  }

  const changeFontSize = (value: string) => {
    fontSizeProp.value = value
    textRef.value?.style.setProperty('font-size', value)
    textRefFlat.value?.style.setProperty('font-size', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFontSize = (index: number) => {
    const selectedItem = fontSizeEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFontSize(selectedItem.name)
    }
  }

  const inputChangeFontSize = (value: string) => {
    changeFontSize(value)
  }

  onReady(() => {
    getPropertyValues()
  })
</script>

<style>
.common{
  background-color: gray;
  justify-content: center;
  height: 100px;
  flex:1;
}
.demo-box {
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-around;
}
.common-box{
  flex-direction: row;
  justify-content: space-around;
}

.test-box {
  width: 180px;
  height: 80px;
  background-color: gray;
  justify-content: center;
  align-items: center;
}
</style>

```

:::

#### App平台差异
- 字体单位说明

App平台仅支持以像素值（px）和相对像素值（rpx）设置字体大小，默认值为16px。

如果仅开发App，那么属性值可以不设置单位，不设置单位时当做 px 处理。但无法兼容web和小程序。

不支持百分比的单位、不支持基于用户默认字体大小的绝对大小关键字，如small、medium、large等、不支持em、rem、ex等单位。

虽然支持但不推荐使用rpx。

正常情况下，普通字体不需要、也不应该设置font-size。使用默认的16px即可。

更并不需要显式的设置`font-size:16px`，这种多余的代码浪费性能。

需要变大或变小的字体，基于16px的默认值，适当增加或缩小字号即可。

如果在font-size中使用rpx，类似于web开发中给字体大小设百分比，没有意义。rpx在font-size中使用有如下问题：
1. 根据屏幕宽度动态计算，在超宽屏上脱离预期的大
2. rpx性能不如px，排版引擎需要根据屏幕宽度给页面里每个text设置样式，如果text组件很多，就会加重计算耗时。尤其是一些开发者给所有text组件都设rpx，性能会很差。大部分字体应该不仅没有rpx，甚至连px也不设，就使用默认的字号即可。
3. rpx会计算出小数，小数又需要取整，在不同情况下就会产生精度误差。这个在贴边场景下会比较明显，有的屏幕下2个元素看起来是挨着的，有的屏幕下2个元素中间有条缝。

详见[rpx适用范围](./common/length.md#rpx)

- 继承说明
App平台不支持样式继承，font-size 也不例外。font-size仅对作用的当前[text](../component/text.md)组件生效。


#### Web规范
属性值必须设置单位，无单位时当做非法值处理。非法值会回退为默认值，即16px。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-size)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.font-size)

