## box-shadow



CSS box-shadow 属性用于在元素的框架上添加阴影效果。你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
box-shadow: none | <shadow>#;
```



### 值限制
- enum
- length
- color



### box-shadow 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| inset | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 如果没有指定inset，默认阴影在边框外，即阴影向外扩散。<br/>      使用 inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。 |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | No shadow. |








### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/box-shadow/box-shadow.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/box-shadow/box-shadow.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/box-shadow/box-shadow

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/box-shadow/box-shadow

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <view style="margin-bottom: 10px;">
        <text style="font-weight: bold;">说明：左边是正常版本，右边是拍平版本</text>
      </view>
      <view>
        <text>box-shadow: 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: 5px 5px 5px #00FF00</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px #00FF00"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px #00FF00" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: 5px 5px 5px rgb(0,0,255)</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 5px 5px rgb(0,0,255)"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 5px 5px rgb(0,0,255)" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: 5px 5px 5px rgba(0,255,255,0.5)</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px rgba(0,255,255,0.5)"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px rgba(0,255,255,0.5)" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5)</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5)"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5)" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: 5px 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: 5px 10px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 10px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: 5px 10px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>box-shadow: 5px 5px 5px 5px black（harmony暂不支持阴影扩散半径）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 5px 5px 5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: -5px -5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: -5px -5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="box-shadow: -5px -5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>box-shadow: inset 5px 5px black（harmony暂不支持inset）</text>
        <view class="backgroundview">
          <view class="common" style="box-shadow: inset 5px 5px black"></view>
        </view>
      </view>

      <view>
        <text>box-shadow: inset 5px 5px 5px black（harmony暂不支持inset）</text>
        <view class="backgroundview">
          <view class="common" style="box-shadow: inset 5px 5px 5px black"></view>
        </view>
      </view>

      <view>
        <text>box-shadow: inset 5px 10px 5px black（harmony暂不支持inset）</text>
        <view class="backgroundview">
          <view class="common" style="box-shadow: inset 5px 10px 5px black"></view>
        </view>
      </view>

      <view>
        <text>box-shadow: inset 5px 5px 5px 5px black（harmony暂不支持inset）</text>
        <view class="backgroundview">
          <view class="common" style="box-shadow: inset 5px 5px 5px 5px black"></view>
        </view>
      </view>

      <view>
        <text>box-shadow: inset -5px -5px 5px black（harmony暂不支持inset）</text>
        <view class="backgroundview">
          <view class="common" style="box-shadow: inset -5px -5px 5px black"></view>
        </view>
      </view>

      <view>
        <text>box-shadow: 0px 1px 3px rgba(0,0,0,0.4)</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4)"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4)" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>circle: box-shadow: 5px 5px black（正圆）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="border-radius: 31px; box-shadow: 5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="border-radius: 31px; box-shadow: 5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>circle: box-shadow: 5px 5px 5px black（椭圆）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="border-radius: 24px; box-shadow: 5px 5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="border-radius: 24px; box-shadow: 5px 5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>circle: box-shadow: 5px 10px 5px black（正圆）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="border-radius: 31px; box-shadow: 5px 10px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="border-radius: 31px; box-shadow: 5px 10px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>circle: box-shadow: 5px 5px 5px 5px black（椭圆）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="border-radius: 24px; box-shadow: 5px 5px 5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="border-radius: 24px; box-shadow: 5px 5px 5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>circle: box-shadow: -5px -5px 5px black（正圆）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="border-radius: 31px; box-shadow: -5px -5px 5px black"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view class="common" style="border-radius: 31px; box-shadow: -5px -5px 5px black" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>circle: box-shadow: 0px 1px 3px rgba(0,0,0,0.4)（椭圆）</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="border-radius: 24px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4)"></view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <view class="common-rect" style="border-radius: 24px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4)" flatten></view>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text>点击动态切换 box-shadow: none</text>
        <view class="backgroundview" @click="changed">
          <view :class="['common', disabled ? 'disabledShadow' : 'shadow']"></view>
        </view>
      </view>

      <view>
        <text>点击动态切换 box-shadow: 非法值</text>
        <view class="backgroundview" @click="changed">
          <view :class="['common', disabled ? 'invalidShadow' : 'shadow']"></view>
        </view>
      </view>

      <view>
        <text>box-shadow父视图动态改变高度的渲染效果</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <view style="justify-content: center;align-items: center;width: 75px;background-color: green;box-shadow: 0 0 10px">
                <view>
                  <textarea id="dynamic-height-textarea" style="margin: 10px;background-color: aqua;height: 16px;width: 55px;" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"></textarea>
                </view>
              </view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <view style="justify-content: center;align-items: center;width: 75px;background-color: green;box-shadow: 0 0 10px" flatten>
                <view>
                  <textarea id="dynamic-height-textarea-flat" style="margin: 10px;background-color: aqua;height: 16px;width: 55px;" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"></textarea>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>text组件: box-shadow: 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <text class="text-shadow" style="box-shadow: 5px 5px black;">文本</text>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <text class="text-shadow" style="box-shadow: 5px 5px black;" flatten>文本</text>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>text组件: box-shadow: 5px 5px 5px #00FF00</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <text class="text-shadow-rect" style="box-shadow: 5px 5px 5px #00FF00;">文本</text>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <text class="text-shadow-rect" style="box-shadow: 5px 5px 5px #00FF00;" flatten>文本</text>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text style="font-weight: bold; margin-top: 20px;">圆形图片</text>
      </view>

      <view>
        <text>image组件: box-shadow: 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow" style="box-shadow: 5px 5px black;" src="/static/test-image/logo.png"></image>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow" style="box-shadow: 5px 5px black;" src="/static/test-image/logo.png" flatten></image>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>image组件: box-shadow: 5px 5px 5px #00FF00</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <image class="image-shadow-rect" style="box-shadow: 5px 5px 5px #00FF00;" src="/static/test-image/logo.png"></image>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <image class="image-shadow-rect" style="box-shadow: 5px 5px 5px #00FF00;" src="/static/test-image/logo.png" flatten></image>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>image组件（正圆）: box-shadow: 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow-circle" style="border-radius: 31px; box-shadow: 5px 5px black;" src="/static/test-image/logo.png"></image>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow-circle" style="border-radius: 31px; box-shadow: 5px 5px black;" src="/static/test-image/logo.png" flatten></image>
            </view>
          </view>
        </view>
      </view>

      <view>
        <text style="font-weight: bold; margin-top: 20px;">方形图片</text>
      </view>

      <view>
        <text>image组件: box-shadow: 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow" style="box-shadow: 5px 5px black;" src="/static/logo_square.jpeg"></image>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow" style="box-shadow: 5px 5px black;" src="/static/logo_square.jpeg" flatten></image>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>image组件: box-shadow: 5px 5px 5px #00FF00</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview-rect">
              <image class="image-shadow-rect" style="box-shadow: 5px 5px 5px #00FF00;" src="/static/logo_square.jpeg"></image>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview-rect">
              <image class="image-shadow-rect" style="box-shadow: 5px 5px 5px #00FF00;" src="/static/logo_square.jpeg" flatten></image>
            </view>
          </view>
        </view>
      </view>
      <view>
        <text>image组件（正圆）: box-shadow: 5px 5px black</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow-circle" style="border-radius: 31px; box-shadow: 5px 5px black;" src="/static/logo_square.jpeg"></image>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <image class="image-shadow-circle" style="border-radius: 31px; box-shadow: 5px 5px black;" src="/static/logo_square.jpeg" flatten></image>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
        <text class="uni-subtitle-text">box-shadow: 5px 5px black 和 box-shadow: 0 0 10px blue</text>
      </view>

      <view class="row-container">
        <view class="row-item">
          <scroll-view style="width: 100px; height: 100px; box-shadow: 5px 5px black; background-color: cyan;"></scroll-view>
        </view>
        <view class="row-item">
          <scroll-view style="width: 100px; height: 100px; box-shadow: 0 0 10px blue; background-color: green;"></scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 box-shadow </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <!-- view 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{boxShadow}}</text>
          <text class="uni-info">获取值: {{boxShadowActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ boxShadow: boxShadow }">
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <!-- text 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{boxShadow}}</text>
          <text class="uni-info">获取值: {{boxShadowActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic common-text test-text" :style="{ boxShadow: boxShadow }">text</text>
          </view>
        </view>

        <!-- image 组件测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{boxShadow}}</text>
          <text class="uni-info">获取值: {{boxShadowActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ boxShadow: boxShadow }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本（注意：不支持 inset 值） -->
      <view class="test-container" v-if="!boxShadow.includes('inset')">
        <!-- view 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{boxShadow}}</text>
          <text class="uni-info">获取值: {{boxShadowActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ boxShadow: boxShadow }" flatten>
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <!-- text 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{boxShadow}}</text>
          <text class="uni-info">获取值: {{boxShadowActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic common-text test-text-flatten" :style="{ boxShadow: boxShadow }" flatten>text</text>
          </view>
        </view>

        <!-- image 组件拍平测试 -->
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{boxShadow}}</text>
          <text class="uni-info">获取值: {{boxShadowActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ boxShadow: boxShadow }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 测试控制区域 -->
      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :compact="true" :items="boxShadowEnum" title="box-shadow 枚举值" @change="radioChangeBoxShadow"></enum-data>
        <input-data :defaultValue="boxShadow" title="box-shadow 自定义值" type="text" @confirm="inputChangeBoxShadow"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: box-shadow: 5px 5px black 和 box-shadow: 0 0 10px blue</text>
        <view class="row-container">
          <view class="row-item">
            <view class="backgroundview">
              <native-view class="common" style="box-shadow: 5px 5px black;"></native-view>
            </view>
          </view>
          <view class="row-item">
            <view class="backgroundview">
              <native-view class="common" style="box-shadow: 0 0 10px blue;"></native-view>
            </view>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const disabled = ref(false)
  const changed = () => {
    disabled.value = !disabled.value
  }

  const boxShadow = ref('5px 5px black')
  const boxShadowActual = ref('')
  const boxShadowActualText = ref('')
  const boxShadowActualImage = ref('')
  const boxShadowActualFlat = ref('')
  const boxShadowActualTextFlat = ref('')
  const boxShadowActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const boxShadowEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: '5px 5px black' },
    { value: 3, name: '5px 5px 5px black' },
    { value: 4, name: '10px 10px 10px red' },
    { value: 5, name: '5px 5px 5px 5px black' },
    { value: 6, name: '-5px -5px 5px black' },
    { value: 7, name: '0px 1px 3px rgba(0,0,0,0.4)' },
  ]

  const getPropertyValues = (value: string) => {
    boxShadowActual.value = viewRef.value?.style.getPropertyValue('box-shadow') ?? ''
    if (!value.includes('inset')) {
      boxShadowActualFlat.value = viewRefFlat.value?.style.getPropertyValue('box-shadow') ?? ''
    } else {
      boxShadowActualFlat.value = '不支持 inset'
    }
    boxShadowActualText.value = textRef.value?.style.getPropertyValue('box-shadow') ?? ''
    if (!value.includes('inset')) {
      boxShadowActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('box-shadow') ?? ''
    } else {
      boxShadowActualTextFlat.value = '不支持 inset'
    }
    boxShadowActualImage.value = imageRef.value?.style.getPropertyValue('box-shadow') ?? ''
    if (!value.includes('inset')) {
      boxShadowActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('box-shadow') ?? ''
    } else {
      boxShadowActualImageFlat.value = '不支持 inset'
    }
  }

  const changeBoxShadow = (value: string) => {
    boxShadow.value = value
    viewRef.value?.style.setProperty('box-shadow', value)
    if (!value.includes('inset')) {
      viewRefFlat.value?.style.setProperty('box-shadow', value)
    }
    textRef.value?.style.setProperty('box-shadow', value)
    if (!value.includes('inset')) {
      textRefFlat.value?.style.setProperty('box-shadow', value)
    }
    imageRef.value?.style.setProperty('box-shadow', value)
    if (!value.includes('inset')) {
      imageRefFlat.value?.style.setProperty('box-shadow', value)
    }
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues(value)
    })
  }

  const radioChangeBoxShadow = (index: number) => {
    const selectedItem = boxShadowEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBoxShadow(selectedItem.name)
    }
  }

  const inputChangeBoxShadow = (value: string) => {
    changeBoxShadow(value)
  }

  onReady(() => {
    nextTick(() => {
      const element = uni.getElementById("dynamic-height-textarea")
      element?.style.setProperty("height", "26px")
    })
    getPropertyValues(boxShadow.value)
  })

  defineExpose({
    radioChangeBoxShadow
  })
</script>

<style>
  .common {
    width: 50px;
    height: 50px;
    background-color: brown;
  }

  .common-rect {
    width: 48px;
    height: 24px;
    background-color: brown;
  }

  .backgroundview {
    width: 75px;
    height: 75px;
    background-color: white;
    justify-content: center;
    align-items: center;
  }

  .backgroundview-rect {
    width: 75px;
    height: 50px;
    background-color: white;
    justify-content: center;
    align-items: center;
  }

  .row-container {
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .row-item {
    flex: 1;
    margin-right: 10px;
  }

  .big{
    width: 200px;
    height: 200px;
  }

  .shadow {
    box-shadow: 5px 5px black;
  }

  .disabledShadow {
    box-shadow: none;
  }

  .invalidShadow {
    box-shadow: abcd;
  }

  .text-shadow {
    width: 62px;
    height: 62px;
    background-color: brown;
    font-size: 12px;
    color: white;
  }

  .text-shadow-rect {
    width: 62px;
    height: 31px;
    background-color: brown;
    font-size: 12px;
    color: white;
  }

  .image-shadow {
    width: 62px;
    height: 62px;
    background-color: brown;
  }

  .image-shadow-rect {
    width: 62px;
    height: 31px;
    background-color: brown;
  }

  .image-shadow-circle {
    width: 62px;
    height: 62px;
    background-color: brown;
  }

  .image-shadow-ellipse {
    width: 62px;
    height: 40px;
    background-color: brown;
  }

  /* 多组件横向布局样式 */
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
    height: 80px;
    padding: 10px;
    background-color: gray;
  }

  .common-dynamic{
    width: 50px;
    height: 50px;
    background-color: green;
  }

  .common-text {
    font-size: 10px;
    color: white;
  }

  .scroll-view-label {
    font-size: 12px;
    line-height: 100px;
    text-align: center;
  }
</style>

```

:::

#### App平台差异
- app平台 默认阴影颜色为黑色（#000000）
- app-ios平台 box-shadow 和 overflow: hidden 不能同时设置，添加了阴影会导致 overflow：hidden 失效
- app-ios平台 设置box-shadow的view背景无法透明，因为iOS系统 box-shadow 是在view的背景下绘制的，当view背景色为透明时，背景将显示box-shadow的颜色，因此为避免此差异建议给box-shadow的view设置非透明背景色
- app-Harmony 平台不支持 inset 和阴影扩散半径


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-shadow)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.box-shadow)

