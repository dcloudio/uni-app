## backdrop-filter



backdrop-filter 属性设置元素的背景滤镜效果，即对其后方（背景透出）的所有内容添加图形效果（如毛玻璃、背景高斯模糊等）。为了看到效果，必须使元素或其背景至少部分透明。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.25 | x | 5.25 | x | 5.25 |






### 语法
```
backdrop-filter: none | <filter-function-list>;
```



### backdrop-filter 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 清除/禁用背景滤镜效果 |
| blur() | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 对背景内容添加高斯模糊（Gaussian Blur）滤镜效果 |






### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/backdrop-filter/backdrop-filter.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/backdrop-filter/backdrop-filter.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/backdrop-filter/backdrop-filter

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/backdrop-filter/backdrop-filter

>示例
```vue
<template>
  <view class="page-root uni-theme-root">
    <fps />

    <view class="control-panel">
      <view class="control-section">
        <text class="control-label">模糊半径</text>
        <slider class="control-wrapper"
          :min="0"
          :max="15"
          :step="1"
          :value="blurValue"
          :show-value="true"
          @changing="updateBlurValue"
          @change="updateBlurValue"
        />
      </view>

      <view class="control-section">
        <text class="control-label">背景颜色</text>
        <view class="control-wrapper">
          <radio-group class="radio-group" @change="updateBackgroundColor">
            <radio class="control-radio" value="rgba(255, 255, 255, 0.3)" :checked="backgroundColor == 'rgba(255, 255, 255, 0.3)'">白色</radio>
            <radio class="control-radio" value="rgba(255, 0, 0, 0.3)" :checked="backgroundColor == 'rgba(255, 0, 0, 0.3)'">红色</radio>
            <radio class="control-radio" value="rgba(0, 255, 0, 0.3)" :checked="backgroundColor == 'rgba(0, 255, 0, 0.3)'">绿色</radio>
            <radio class="control-radio" value="rgba(0, 0, 255, 0.3)" :checked="backgroundColor == 'rgba(0, 0, 255, 0.3)'">蓝色</radio>
          </radio-group>
        </view>
      </view>

      <view class="control-section">
        <text class="control-label">边框宽度</text>
        <slider class="control-wrapper"
          :min="0"
          :max="20"
          :step="1"
          :value="borderWidthValue"
          :show-value="true"
          @changing="updateBorderWidth"
          @change="updateBorderWidth"
        />
      </view>
    </view>

    <view class="scroll-panel">
      <view class="floating-display-layer">
        <view class="demo-section">
          <view class="demo-slot">
            <view class="glass-box" style="backdrop-filter: blur(4px);"></view>
            <text class="demo-label">静态 4px</text>
          </view>
          <view class="demo-slot">
            <view class="glass-box" style="backdrop-filter: blur(8px);"></view>
            <text class="demo-label">静态 8px</text>
          </view>
          <view class="demo-slot">
            <view class="glass-box" style="backdrop-filter: blur(12px);"></view>
            <text class="demo-label">静态 12px</text>
          </view>
        </view>

        <view class="demo-section">
          <view class="demo-slot">
            <view class="glass-box" :style="`backdrop-filter: blur(${blurValue}px);`"></view>
            <text class="demo-label">动态 {{ blurValue }}px</text>
          </view>
          <view class="demo-slot">
            <view class="glass-box" :style="`backdrop-filter: blur(${blurValue}px); background-color: ${backgroundColor}; border-width: ${borderWidthValue}px;`"></view>
            <view class="demo-label demo-label-stack">
              <text class="demo-label-text">动态 {{ blurValue }}px</text>
              <text class="demo-label-text">{{ colorLabel }} / {{ borderWidthValue }}px</text>
            </view>
          </view>
          <view class="demo-slot"></view>
        </view>
      </view>

      <scroll-view class="content-scroll-view" direction="vertical" :show-scrollbar="true">
        <view class="background-content">
          <view v-for="section in backgroundSections" :key="section" class="uni-common-mb">
            <view class="logo-row">
              <image v-for="logoIndex in logoIndexes" :key="logoIndex" class="logo-item" src="/static/test-image/logo.png" mode="widthFix"></image>
            </view>
            <view class="uni-row uni-common-mt">
              <view v-for="(color, colorIndex) in solidColors1" :key="colorIndex" class="color-box" :style="`background-color: ${color};`"></view>
            </view>
            <view class="uni-row">
              <view v-for="(color, colorIndex) in solidColors2" :key="colorIndex" class="color-box" :style="`background-color: ${color};`"></view>
            </view>
            <view class="uni-row uni-common-mt">
              <view v-for="(gradientStyle, gradientIndex) in gradientStyles1" :key="gradientIndex" class="color-box" :style="gradientStyle"></view>
            </view>
            <view class="uni-row">
              <view v-for="(gradientStyle, gradientIndex) in gradientStyles2" :key="gradientIndex" class="color-box" :style="gradientStyle"></view>
            </view>
            <view class="uni-common-mt uni-common-mb">
              <text class="sample-line uni-common-mb" v-for="(line, lineIndex) in sampleLines" :key="lineIndex">{{ line }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="uts">
  const backgroundSections = [1, 2, 3, 4, 5, 6]
  const logoIndexes = [1, 2, 3]
  const solidColors1 = ['#ff0000', '#00ff00', '#ff0000', '#00ff00', '#ff0000', '#00ff00']
  const solidColors2 = ['#0000ff', '#000000', '#0000ff', '#000000', '#0000ff', '#000000']
  const gradientStyles1 = [
    'background-image: linear-gradient(45deg, #ff0000, #ffffff);',
    'background-image: linear-gradient(90deg, #00ff00, #ffffff);',
    'background-image: linear-gradient(45deg, #ff0000, #ffffff);',
    'background-image: linear-gradient(90deg, #00ff00, #ffffff);',
    'background-image: linear-gradient(45deg, #ff0000, #ffffff);',
    'background-image: linear-gradient(90deg, #00ff00, #ffffff);'
  ]
  const gradientStyles2 = [
    'background-image: linear-gradient(0deg, #0000ff, #ffffff);',
    'background-image: linear-gradient(135deg, #000000, #ffffff);',
    'background-image: linear-gradient(0deg, #0000ff, #ffffff);',
    'background-image: linear-gradient(135deg, #000000, #ffffff);',
    'background-image: linear-gradient(0deg, #0000ff, #ffffff);',
    'background-image: linear-gradient(135deg, #000000, #ffffff);'
  ]
  const sampleLines = Array.from({ length: 20 }, () : string => 'uni-app x 蒸汽模式 uni-app x 蒸汽模式')

  const blurValue = ref(8)
  const borderWidthValue = ref(2)
  const backgroundColor = ref('rgba(255, 255, 255, 0.3)')
  const colorLabel = ref('白色')

  const updateBlurValue = (event : UniSliderChangeEvent) => {
    blurValue.value = event.detail.value
  }

  const updateBorderWidth = (event : UniSliderChangeEvent) => {
    borderWidthValue.value = event.detail.value
  }

  const updateBackgroundColor = (event : UniRadioGroupChangeEvent) => {
    backgroundColor.value = event.detail.value
    if (event.detail.value == 'rgba(255, 0, 0, 0.3)') {
      colorLabel.value = '红色'
    } else if (event.detail.value == 'rgba(0, 255, 0, 0.3)') {
      colorLabel.value = '绿色'
    } else if (event.detail.value == 'rgba(0, 0, 255, 0.3)') {
      colorLabel.value = '蓝色'
    } else {
      colorLabel.value = '白色'
    }
  }
</script>

<style>
.page-root {
  flex: 1;
}

.control-panel {
  padding: 20px;
}

.scroll-panel {
  flex: 1;
  position: relative;
}

.content-scroll-view {
  flex: 1;
}

.background-content {
  padding: 10px 20px 80px 20px;
}

.floating-display-layer {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  pointer-events: none;
  z-index: 10;
}

.logo-row {
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
}

.logo-item {
  width: 33%;
}

.color-box {
  flex: 1;
  height: 64px;
}

.demo-section {
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
}

.demo-slot {
  flex: 1;
  align-items: center;
}

.demo-label {
  margin: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px 6px;
  box-shadow: 3px 3px 3px gray;
  color: #1a1a1a;
}

.demo-label-text {
  color: #1a1a1a;
}

.glass-box {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.3);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.4);
  border-radius: 16px;
}

.demo-label-stack {
  align-items: center;
}

.control-section {
  flex-direction: row;
  align-items: center;
  background-color: var(--list-background-color, rgba(255, 255, 255, 0.9));
  margin-bottom: 6px;
  padding: 5px 10px;
}

.control-label {
  margin-right: 10px;
  color: var(--text-color, #1a1a1a);
}

.control-radio {
  color: var(--text-color, #1a1a1a);
}

.sample-line {
  color: var(--text-color, #333333);
}

.control-wrapper {
  flex: 1;
}

.radio-group {
  flex-direction: row;
  justify-content: space-around;
}
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/backdrop-filter)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.backdrop-filter)
