# CSS 方法

## var

### 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.0 | 4.11 | 4.61 | - |

> uni-app x 4.0+ 提供内置 CSS 变量。
> uni-app x 4.52+ 全平台提供了安全区域相关 CSS 变量 --uni-safe-area-inset-* 。
> uni-app x 4.71+ App平台补充了自定义css变量
> 部分内置组件的特殊样式属性暂不支持CSS变量：input、textarea 的 placeholder-style、placeholder-class，picker-view 的 indicator-style、indicator-class、mask-style、mask-class

### 预置的 CSS 变量 @preset-var

- `--status-bar-height`的使用场景：当设置pages.json中的 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 `var(--status-bar-height)` 的 view 放在页面顶部，避免页面内容出现在状态栏上。App平台自4.61版本开始自动响应状态栏高度的变化动态调整页面布局
- `--uni-safe-area-inset-xxx` 的使用场景：
  1. `--uni-safe-area-inset-xxx`为安全区域边界到`position: fixed;`定位相对的区域边界距离。其中安全区域已规避LeftWindow、TopWindow、RightWindow、NavigationBar、TabBar。
  2. 在 App 和 小程序 平台，pages.json中配置的导航栏和tabbar是原生的，页面内容只能在这个区域中间。而在 Web 端，不存在原生导航栏和 tabBar，由前端 view 模拟，所以页面内容如果使用绝对定位的话，就会和 Web 平台的导航栏、tabbar重叠。为了避免重叠，可以使用`--uni-safe-area-inset-xxx`系列css变量来设置位置。例如，在有tabbar页面的需要设置了一个固定位置的居底 view，如果单纯的在css中设置 bottom 为 0 ，那么在小程序和 App 端是在 tabBar 上方，但在 Web 端会与 tabBar 重叠。此时可设置 bottom 为 css变量 `--uni-safe-area-inset-bottom`，不管在哪个端，都是固定在 tabBar 上方。因为该值在 Web 平台，会自动避让导航栏高度。
  3. Web 平台有 LeftWindow 、TopWindow、RightWindow 等宽屏适配时的页面，绝对定位时也需要避让，避免把内容显示在其他页面上。`--uni-safe-area-inset-xxx` 系列css变量也已经内部自动处理各种Window。
  4. 除了兼容处理导航栏和tabbar、兼容LeftWindow等宽屏Window之外，`--uni-safe-area-inset-xxx` 系列css变量，还兼容了手机屏幕的安全区，避让了底部手势横条、摄像头挖孔区等。确保使用了本系列变量的内容不会和屏幕上这些内容重叠。

- `--window-top` 和 `--window-bottom` 已经废弃，推荐使用 `--uni-safe-area-inset-top` 和 `--uni-safe-area-inset-bottom` 替代。废弃原因是：
  1. 这2个css变量仅处理了导航栏和tabbar，未处理LeftWindow等Window、未处理手机屏幕的底部手势横条和摄像头挖孔区等内容。
  2. 这2个css变量未包含left、right，宽屏适配和横屏时无法友好兼容
  3. 这2个css变量的命名未包含 `uni` 前缀，容易和开发者的代码中的自定义css变量命名冲突。
- 小程序平台目前这些预置CSS变量对应的值均为估计值，并不准确

### 自定义 CSS 变量 @customvar
> HBuilderX4.71起 App平台支持自定义变量

CSS自定义变量规范参考[MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)

**注意：**
App平台和web有以下差异:
- 定义变量时不支持值为var(--*) ex: --color: var(--color)
- 回退值不支持var(--*) ex: --height: var(--height1 , var(--height2))
- transtion暂不支持使用var
- 部分组件的属性不支持CSS变量：input、textarea 的 placeholder-style、placeholder-class
- 由于App平台不支持:root伪类，需要自行在页面根元素或合适的父级元素的class中定义css变量，以便在子元素生效

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/variable/variable.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/variable/variable.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/variable/variable

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/variable/variable

>示例
```vue
<template>
  <view class="page">
    <view class="status-bar-height">
      <text>通过var(--status-bar-height)获取状态栏高度</text>
    </view>
    <view class="status-bar-window" :style="{ height: statusBarHeight + 'px' }">
      <text>通过uni.getWindowInfo获取状态栏高度</text>
    </view>
    <view class="status-bar-unipage" :style="{ height: statusBarHeight2 + 'px' }">
      <text>通过this.$page.statusBarHeight获取状态栏高度</text>
    </view>
    <view class="window-top">
      <text>window top</text>
    </view>
    <view class="window-bottom">
      <text>window bottom</text>
    </view>

    <view class="uni-safe-area-inset-top">
      <text>height:var(--uni-safe-area-inset-top)</text>
    </view>
    <view class="uni-safe-area-inset-left">
      <text>height:var(--uni-safe-area-inset-left)</text>
    </view>
    <view class="uni-safe-area-inset-right">
      <text>height:var(--uni-safe-area-inset-right)</text>
    </view>
    <view class="uni-safe-area-inset-bottom">
      <text>height:var(--uni-safe-area-inset-bottom)</text>
    </view>
    <view class="uni-fixed-bottom">
      <text>此区域应显示在安全区域内</text>
    </view>
  </view>
</template>

<script setup lang="uts">

  const statusBarHeight = ref(0)
  const statusBarHeight2 = ref(0)

  const instance = getCurrentInstance()

  onReady(() => {
    statusBarHeight.value = uni.getWindowInfo().statusBarHeight
    // #ifndef MP-WEIXIN
    statusBarHeight2.value = instance?.proxy?.$page?.statusBarHeight ?? 0
    // #endif
  })
</script>

<style>
  .page {
    flex: 1;
  }

  .status-bar-height {
    height: var(--status-bar-height);
    align-items: center;
    justify-content: center;
    background-color: red;
  }

  .status-bar-window {
    background-color: yellow;
    align-items: center;
    justify-content: center;
  }

  .status-bar-unipage {
    align-items: center;
    justify-content: center;
    background-color: greenyellow;
  }

  .window-top {
    height: var(--window-top);
    align-items: center;
    background-color: green;
    margin: 2px 0px;
  }

  .window-bottom {
    height: var(--window-bottom);
    align-items: center;
    background-color: blue;
    margin: 2px 0px;
  }

  .uni-safe-area-inset-top {
    height: var(--uni-safe-area-inset-top);
    align-items: center;
    background-color: yellow;
    margin: 2px 0px;
  }

  .uni-safe-area-inset-left {
    height: var(--uni-safe-area-inset-left);
    align-items: center;
    background-color: greenyellow;
    margin: 2px 0px;
  }

  .uni-safe-area-inset-right {
    height: var(--uni-safe-area-inset-right, 60px);
    align-items: center;
    background-color: saddlebrown;
    margin: 2px 0px;
  }

  .uni-safe-area-inset-bottom {
    height: var(--uni-safe-area-inset-bottom);
    align-items: center;
    background-color: salmon;
    margin: 2px 0px;
  }

  .uni-fixed-bottom {
    position: fixed;
    left: var(--uni-safe-area-inset-left);
    right: var(--uni-safe-area-inset-right);
    bottom: var(--uni-safe-area-inset-bottom);
    align-items: center;
    background-color: blueviolet;
  }
</style>

```

:::

## env @env



内置 CSS 环境变量，即`env()`。

**注意：**\
env()主要用于在App平台补齐 web 规范。但浏览器的env不会考虑uni-app x的pages.json中配置的顶部导航栏和底部tabbar。\
所以实际开发中处理安全区时，更推荐使用本文档上方的 [--uni-safe-area-inset-xxx 系列css变量](#var)。

### 语法
```css
/* Using the four safe area inset values with no fallback values */
env(safe-area-inset-top);
env(safe-area-inset-right);
env(safe-area-inset-bottom);
env(safe-area-inset-left);

/* Using them with fallback values */
env(safe-area-inset-top, 20px);
env(safe-area-inset-right, 20px);
env(safe-area-inset-bottom, 20px);
env(safe-area-inset-left, 20px);
```

### uni-app x 兼容性
#### app平台

> app平台的 CSS 环境变量是页面相关的，即根据 uvue 页面原生导航栏和tabBar的配置自动计算。

app平台仅以下CSS属性支持使用环境变量
- padding （不支持缩写，只支持展开值，明确到具体方向，比如 padding-left）
- margin（不支持缩写，只支持展开值，明确到具体方向，比如 padding-left）
- width
- height
- top
- right
- bottom
- left

#### web平台

web平台的 CSS环境变量是应用全局值，由浏览器自动计算，与 uvue 页面无关，无法干预处理对导航栏、tabbar、leftWindow、TopWindow的兼容支持。所以不推荐使用。建议使用跨端的`--uni-safe-area-inset-xxx` 系列css变量。

web平台的 CSS环境变量规范参考[MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env)

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/function/function.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/function/function.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/function/function

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/function/function

>示例
```vue
<template>
	<view class="padding-safe-area-inset">
		<view class="text-background">我在状态栏下边</view>
    <view class="content">
      <text>此页面使用env()函数适配安全区域，仅在app平台生效。</text>
      <text>safe-area-inset-top: {{safeareaInsetTop}}px</text>
      <text>safe-area-inset-left: {{safeareaInsetLeft}}px</text>
      <text>safe-area-inset-right: {{safeareaInsetRight}}px</text>
      <text>safe-area-inset-bottom: {{safeareaInsetBottom}}px</text>
    </view>
		<view class="text-background">我在导航栏上边</view>
	</view>
</template>

<script setup lang="uts">

	const safeareaInsetTop = ref(0)
	const safeareaInsetLeft = ref(0)
	const safeareaInsetRight = ref(0)
	const safeareaInsetBottom = ref(0)

	const instance = getCurrentInstance()

	onReady(() => {
		const page = instance?.proxy?.$page
		safeareaInsetTop.value = page?.safeAreaInsets.top ?? 0
		safeareaInsetLeft.value = page?.safeAreaInsets.left ?? 0
		safeareaInsetRight.value = page?.safeAreaInsets.right ?? 0
		safeareaInsetBottom.value = page?.safeAreaInsets.bottom ?? 0
	})

	onResize((options) => {
		const page = instance?.proxy?.$page
		safeareaInsetTop.value = page?.safeAreaInsets.top ?? 0
		safeareaInsetLeft.value = page?.safeAreaInsets.left ?? 0
		safeareaInsetRight.value = page?.safeAreaInsets.right ?? 0
		safeareaInsetBottom.value = page?.safeAreaInsets.bottom ?? 0
	})
</script>

<style>
  .text-background {
    background-color: red;
  }
	.padding-safe-area-inset {
		flex: 1;
		justify-content: space-between;
/* #ifdef APP */
		padding-top: env(safe-area-inset-top, 0px);
		padding-left: env(safe-area-inset-left, 0px);
		padding-right: env(safe-area-inset-right, 0px);
		padding-bottom: env(safe-area-inset-bottom, 0px);
/* #endif */
	}
  .content{
    padding: 20px;
  }
</style>

```

:::

## rgb

根据红色、绿色和蓝色值创建颜色。

### 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - |

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/function/rgb.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/function/rgb.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/function/rgb/

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/function/rgb

>示例
```vue
<template>
  <view class="container">
    <text class="intro-text">RGB 是一种颜色表示方法，通过调整红(Red)、绿(Green)、蓝(Blue)三个通道的值（0-255）来产生不同的颜色。</text>

    <view class="section">
      <text class="section-title">数值表示 (0-255)</text>
      <view class="color-grid">
        <view class="color-item">
          <view class="color-box" style="background-color: rgb(255, 0, 0);"></view>
          <text class="color-name">红色</text>
          <text class="color-value">rgb(255, 0, 0)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgb(0, 255, 0);"></view>
          <text class="color-name">绿色</text>
          <text class="color-value">rgb(0, 255, 0)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgb(0, 0, 255);"></view>
          <text class="color-name">蓝色</text>
          <text class="color-value">rgb(0, 0, 255)</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="color-grid">
        <view class="color-item">
          <view class="color-box" style="background-color: rgb(255, 255, 0);"></view>
          <text class="color-name">黄色</text>
          <text class="color-value">rgb(255, 255, 0)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgb(255, 0, 255);"></view>
          <text class="color-name">品红</text>
          <text class="color-value">rgb(255, 0, 255)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgb(0, 255, 255);"></view>
          <text class="color-name">青色</text>
          <text class="color-value">rgb(0, 255, 255)</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.container {
  padding: 20px;
}

.intro-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.4;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.color-grid {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.color-item {
  width: 30%;
  margin-bottom: 20px;
}

.color-box {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.color-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.color-value {
  font-size: 12px;
  color: #666;
}
</style>

```

:::

## rgba

根据红色、绿色、蓝色和 alpha 值创建颜色。

### 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | - |

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/function/rgba.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/function/rgba.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/function/rgba/

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/function/rgba

>示例
```vue
<template>
  <view class="container">
    <text class="intro-text">RGBA 在 RGB 的基础上增加了透明度(Alpha)通道，取值范围为 0-1，0 表示完全透明，1 表示完全不透明。</text>

    <view class="section">
      <text class="section-title">数值表示 (RGB: 0-255, A: 0-1)</text>
      <view class="color-grid">
        <view class="color-item">
          <view class="color-box" style="background-color: rgba(255, 0, 0, 0.1);"></view>
          <text class="color-name">红色 10% 透明</text>
          <text class="color-value">rgba(255, 0, 0, 0.1)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgba(255, 0, 0, 0.5);"></view>
          <text class="color-name">红色 50% 透明</text>
          <text class="color-value">rgba(255, 0, 0, 0.5)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgba(255, 0, 0, 1);"></view>
          <text class="color-name">红色 不透明</text>
          <text class="color-value">rgba(255, 0, 0, 1)</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="color-grid">
        <view class="color-item">
          <view class="color-box" style="background-color: rgba(0, 0, 255, 0.1);"></view>
          <text class="color-name">蓝色 10% 透明</text>
          <text class="color-value">rgba(0, 0, 255, 0.1)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgba(0, 0, 255, 0.5);"></view>
          <text class="color-name">蓝色 50% 透明</text>
          <text class="color-value">rgba(0, 0, 255, 0.5)</text>
        </view>
        <view class="color-item">
          <view class="color-box" style="background-color: rgba(0, 0, 255, 1);"></view>
          <text class="color-name">蓝色 不透明</text>
          <text class="color-value">rgba(0, 0, 255, 1)</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.container {
  padding: 20px;
}

.intro-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.4;
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.color-grid {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.color-item {
  width: 30%;
  margin-bottom: 20px;
}

.color-box {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.color-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.color-value {
  font-size: 12px;
  color: #666;
}
</style>

```

:::

## url





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/function/url.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/function/url.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/function/url/

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/function/url

>示例
```vue
<template>
	<view class="container">
		<text class="intro-text">url() 函数用于加载图片、字体等资源，支持 /static 目录下的本地文件和网络链接。</text>
		<view class="section">
			<text class="section-title">字体示例</text>
			<view class="font-grid">
				<!-- #ifdef APP-IOS -->
				<view class="font-item">
					<text class="custom-font">阿里妈妈刀隶体</text>
					<text class="font-value">@font-face { font-family: 'AlimamaDaoLiTi'; src: url('/static/app-ios/AlimamaDaoLiTi.woff2') }</text>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="font-item">
					<text class="pacifico-font">Pacifico Font Example</text>
					<text class="font-value">@font-face { font-family: 'Pacifico'; src: url('/static/font/Pacifico-Regular.ttf') }</text>
				</view>
				<!-- #endif -->
				<view class="font-item">
					<text class="web-font">网络字体</text>
					<text class="font-value">@font-face { font-family: 'AlimamaDaoLiTiTTF'; src: url('https://qiniu-web-assets.dcloud.net.cn/uni-app-x/static/font/AlimamaDaoLiTi.ttf') }</text>
				</view>
			</view>
		</view>
	</view>
</template>

<style>
	@font-face {
		font-family: 'AlimamaDaoLiTi';
		src: url('/static/app-ios/AlimamaDaoLiTi.woff2'),
			 url('/static/app-ios/AlimamaDaoLiTi.woff'),
			 url('/static/font/AlimamaDaoLiTi.otf');
	}

	@font-face {
		font-family: 'Pacifico';
		src: url('/static/font/Pacifico-Regular.ttf');
	}

	@font-face {
		font-family: 'AlimamaDaoLiTiTTF';
		src: url('https://qiniu-web-assets.dcloud.net.cn/uni-app-x/static/font/AlimamaDaoLiTi.ttf');
	}

	.container {
		padding: 20px;
	}

	.intro-text {
		font-size: 14px;
		color: #333;
		margin-bottom: 30px;
		line-height: 1.6;
		padding: 15px;
		background-color: #f8f9fa;
		border-radius: 8px;
	}

	.section {
		margin-bottom: 30px;
	}

	.section-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	.font-grid {
		flex-direction: row;
		flex-wrap: wrap;
	}

	.font-item {
		width: 100%;
		margin-bottom: 20px;
	}

	.custom-font {
		font-size: 20px;
		margin-bottom: 8px;
		font-family: 'AlimamaDaoLiTi';
	}

	.pacifico-font {
		font-size: 20px;
		margin-bottom: 8px;
		font-family: 'Pacifico';
	}

	.web-font {
		font-size: 20px;
		margin-bottom: 8px;
		font-family: 'AlimamaDaoLiTiTTF';
	}

	.font-value {
		font-size: 12px;
		color: #999;
	}
</style>

```

:::
