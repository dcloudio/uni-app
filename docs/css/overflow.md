## overflow



overflow 是 CSS 的简写属性，其设置了元素溢出时所需的行为——即当元素的内容太大而无法适应它的块级格式化上下文时。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
overflow: [ visible | hidden | clip | scroll | auto ]{1,2};
```



### 值限制
- enum



### overflow 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| visible | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 暂时仅view组件支持visible，其他组件支持不支持 |
| hidden | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 如果需要，内容将被裁减以适应边距（padding）盒。不提供滚动条，也不支持允许用户滚动（例如通过拖拽或者使用滚轮）。内容可以以编程的方式滚动（例如，通过设置 scrollLeft 等属性的值或 scrollTo() 方法）, 因此该元素仍然是一个滚动的容器。 |
| scroll | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 如果需要，内容将被裁减以适应边距（padding）盒。无论是否实际裁剪了任何内容，浏览器总是显示滚动条，以防止滚动条在内容改变时出现或者消失。打印机可能会打印溢出的内容。 |
| auto | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 取决于用户代理。如果内容适应边距（padding）盒，它看起来与 visible 相同，但是仍然建立了一个新的块级格式化上下文。如果内容溢出，则浏览器提供滚动条。 |
| clip | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 类似于 hidden，内容将以元素的边距（padding）盒进行裁剪。clip 和 hidden 之间的区别是 clip 关键字禁止所有滚动，包括以编程方式的滚动。该盒子不是一个滚动的容器，并且不会启动新的格式化上下文。如果你希望开启一个新的格式化上下文，你可以使用 display: flow-root 来这样做。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | hidden |

 **注意**：W3C 默认值为：visible





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/overflow/overflow.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/overflow/overflow.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/overflow/overflow

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/overflow/overflow

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1;">
  <!-- #endif -->
    <text style="font-size: 15px;">overflow=hidden效果子元素是view border圆角</text>
    <view class="backgroundview">
      <view class="box-hidden-border-radius">
        <view style="width: 50px; height: 150px; background-color: greenyellow;"></view>
      </view>
    </view>
    <text>拍平</text>
    <view class="backgroundview">
      <view class="box-hidden-border-radius" flatten>
        <view style="width: 50px; height: 150px; background-color: greenyellow;" flatten></view>
      </view>
    </view>

    <text style="font-size: 15px;">overflow=hidden效果 子元素是view border边框</text>
    <view class="backgroundview">
      <view class="box-hidden-border-width">
        <view style="width: 50px; height: 150px; background-color: greenyellow;"></view>
      </view>
    </view>
    <text>拍平</text>
    <view class="backgroundview">
      <view class="box-hidden-border-width" flatten>
        <view style="width: 50px; height: 150px; background-color: greenyellow;" flatten></view>
      </view>
    </view>

    <text style="font-size: 15px;">overflow=visible效果 子元素是view border圆角</text>
    <view class="backgroundview">
      <view class="box-visible-border-radius">
        <view style="width: 50px; height: 150px; background-color: greenyellow;"></view>
      </view>
    </view>
    <text>拍平</text>
    <view class="backgroundview">
      <view class="box-visible-border-radius" flatten>
        <view style="width: 50px; height: 150px; background-color: greenyellow;" flatten></view>
      </view>
    </view>

    <text style="font-size: 15px;">overflow=visible效果 子元素是view border边框</text>
    <view class="backgroundview">
      <view class="box-visible-border-width">
        <view style="width: 50px; height: 150px; background-color: greenyellow;"></view>
      </view>
    </view>
    <text>拍平</text>
    <view class="backgroundview">
      <view class="box-visible-border-width" flatten>
        <view style="width: 50px; height: 150px; background-color: greenyellow;" flatten></view>
      </view>
    </view>

    <view style="flex-grow: 1">
      <text style="font-size: 15px;">overflow=hidden效果 子元素是text</text>
      <view class="backgroundview">
        <view class="box-hidden-border-radius">
          <text class="text1">ABCDEFG</text>
        </view>
      </view>
      <text>拍平</text>
      <view class="backgroundview">
        <view class="box-hidden-border-radius" flatten>
          <text class="text1" flatten>ABCDEFG</text>
        </view>
      </view>

      <text style="font-size: 15px;">overflow=visible效果 子元素是text</text>
      <view class="backgroundview">
        <view class="box-visible-border-radius">
          <text class="text1">ABCDEFG</text>
        </view>
      </view>
      <text>拍平</text>
      <view class="backgroundview">
        <view class="box-visible-border-radius" flatten>
          <text class="text1" flatten>ABCDEFG</text>
        </view>
      </view>

      <text style="font-size: 15px;">overflow=hidden效果 子元素是image</text>
      <view class="backgroundview">
        <view class="box-hidden-border-radius">
          <image style="width: 150px; height: 150px;" src="/static/test-image/logo.png"></image>
        </view>
      </view>
      <text>拍平</text>
      <view class="backgroundview">
        <view class="box-hidden-border-radius" flatten>
          <image style="width: 150px; height: 150px;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>

      <text style="font-size: 15px;">overflow=visible效果 子元素是image</text>
      <view class="backgroundview">
        <view class="box-visible-border-radius">
          <image style="width: 150px; height: 150px;" src="/static/test-image/logo.png"></image>
        </view>
      </view>
      <text>拍平</text>
      <view class="backgroundview">
        <view class="box-visible-border-radius" flatten>
          <image style="width: 150px; height: 150px;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>

      <text style="font-size: 15px;">overflow=visible效果 子元素是view 父是scroll-view</text>
      <scroll-view class="backgroundview">
        <view class="box-visible-border-radius">
          <view style="width: 50px; height: 150px; background-color: greenyellow;"></view>
        </view>
      </scroll-view>
      <text>拍平</text>
      <scroll-view class="backgroundview">
        <view class="box-visible-border-radius" flatten>
          <view style="width: 50px; height: 150px; background-color: greenyellow;" flatten></view>
        </view>
      </scroll-view>

      <text style="font-size: 15px;">overflow=visible 设置阴影显示文字</text>
      <view class="backgroundview">
        <view class="" style="overflow: visible;width: 100px;height: 100px;background-color: green;box-shadow: 10px 10px #000;margin-top: 10px;">
          <text style="width:170px; background-color: greenyellow;">文字文字文字文字文字</text>
        </view>
      </view>
      <text>拍平</text>
      <view class="backgroundview">
        <view class="" style="overflow: visible;width: 100px;height: 100px;background-color: green;box-shadow: 10px 10px #000;margin-top: 10px;" flatten>
          <text style="width:170px; background-color: greenyellow;" flatten>文字文字文字文字文字</text>
        </view>
      </view>

      <text style="font-size: 15px;">overflow=visible 子view完全超出范围</text>
      <view class="backgroundview">
        <view class="box-visible-border-width">
          <view style="width: 50px; height: 50px; background-color: greenyellow;right: -70px;position: absolute;"></view>
        </view>
      </view>
      <text>拍平</text>
      <view class="backgroundview">
        <view class="box-visible-border-width" flatten>
          <view style="width: 50px; height: 50px; background-color: greenyellow;right: -70px;position: absolute;" flatten></view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
</script>

<style>
  .backgroundview {
    width: 300px;
    height: 200px;
    background-color: white;
    justify-content: center;
    align-items: center;
  }

  .box-hidden-border-radius {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
    background-color: green;
  }

  .box-hidden-border-width {
    width: 100px;
    height: 100px;
    border-width: 2px;
    border-style: solid;
    background-color: green;
  }

  .box-visible-border-radius {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: visible;
    background-color: green;
  }

  .box-visible-border-width {
    width: 100px;
    height: 100px;
    border-width: 2px;
    border-style: solid;
    overflow: visible;
    background-color: green;
  }

  .text1 {
    font-size: 50px;
    /* #ifndef VUE3-VAPOR */
    lines: 1;
    /* #endif */
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/overflow)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.overflow)


### Bug & Tips

- Android平台 当元素设置 overflow = visible 后会扩大元素的渲染区域，元素渲染及内存占用存在性能消耗，应尽量避免设置 overflow = visible
- Android平台 uni-app x 父元素设置 overflow = visible，子元素超出父元素的区域，无法正常响应touch、click事件 (4.13版本已修复该问题)
- iOS平台 当元素四个边设置了不同值的圆角，overflow = visible 会无效，超过父元素会被裁剪
- Android平台 当设置`android-layer-type`为`hardware`或`software`时，`overflow: visible`不生效。
- Android平台 当元素设置 overflow = visible 后再动态修改该元素 opacity 透明度可能导致 overflow: visible 不生效
