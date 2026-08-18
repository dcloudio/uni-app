---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-link
---

::: sourceCode
## uni-link
:::

链接组件

> 本 Component 是 uni ext component，需下载插件：[uni-link](https://ext.dcloud.net.cn/plugin?id=27898)


打开web链接组件。点击后通过内置或外部浏览器打开链接，加载 `href` 属性中配置的 URL。

- `target="_self"` 时，使用 `uni_modules/uni-link-x/pages/link-webview` 页面内的 `web-view` 打开链接。
  * 注意小程序需要将域名加入应用的域名白名单。
- `target="_blank"` 时，
  * APP平台调用手机浏览器打开链接
  * Web调用 `window.open(url, '_blank')`
  * 小程序平台无法打开手机浏览器，此时会走到失败回退逻辑中

  `target="_blank"`失败时，可以通过组件属性`blank-fallback`来控制失败后的回退处理策略，`blank-fallback`属性有3个值：

  1. turn-self ：使用_self方式打开。此值为默认值。也就是 `target="_blank"` 时，小程序下默认转到内置浏览器打开。
  2. copy-link-modal ：复制链接并弹框提醒。会复制URL到剪贴板中，并弹框提示用户在外部浏览器中打开。
  3. none ：不回退。会触发组件的error事件。

- 开发者也可以通过条件编译组合使用，比如APP平台使用`_black`，小程序平台使用`_self`

常见失败原因：
- 安装本组件时未在项目的pages.json中注册组件的内置页面。（HBuilderX导入本组件到项目下时会弹框提醒注册内置页面）
- 小程序平台未将域名加入应用的域名白名单。
- iOS运行基座未包括openSchema插件，仅在无xcode时运行会触发。打包其实不会发生此错误。
- app平台，有些手机系统会弹框询问用户是否允许app打开浏览器，如果用户点了拒绝，这种情况没有失败回调。但有种判断方式是app的onHide生命周期是否触发，如果没有触发，那么意味着并没有启动系统浏览器。

### 基本用法

```html
<uni-link href="https://uniapp.dcloud.net.cn">uni-app x 文档
</uni-link>
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| error | 打开失败时触发 | `message: string` |

### 依赖

`APP` 平台依赖 `uts-openSchema`。`uni-link` 已在 `uni_modules/uni-link-x/package.json` 中声明该依赖。

组件目录下有 `pages_init.json`，会向应用的 pages.json 中注册组件中自带的内置浏览器页面。如在HBuilderX中弹框询问是否将组件中的页面注册到项目pages.json中时，请选择同意。

### 示例页面

`/pages/uni-ui/link/link`



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| href | string | "" | 链接地址，点击组件时要打开的 URL |
| target | _blank \| _self | "_self" | 打开方式。"_self" 在当前应用内置 webview 中打开；"_blank" 在外部浏览器中打开（小程序端会复制链接提示用户外部打开） |
| blankFallback | turn-self \| copy-link-modal \| none | "turn-self" | `target="_blank"`失败时，可以通过本属性控制失败回退策略。"turn-self"使用_self方式打开；"copy-link-modal"复制链接并弹框提醒；"none"不回退，触发失败回调 |
| @error | Event |   |   |

#### target 的属性描述

| 合法值 |
| :- |
| _blank |
| _self |

#### blankFallback 的属性描述

| 合法值 |
| :- |
| turn-self |
| copy-link-modal |
| none |

<!-- UTSCOMJSON.uni-link.fileFormates -->



<!-- UTSCOMJSON.uni-link.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/link/link.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/link/link.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/link/link

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/link/link

>示例
```vue
<template>
  <scroll-view class="page">
    <view class="section">
      <text class="section-title">基础用法</text>
      <view class="link-block">
        <uni-link href="https://uniapp.dcloud.net.cn" @error="onError">https://uniapp.dcloud.net.cn</uni-link>
      </view>
    </view>

    <view class="section">
      <text class="section-title">自定义样式</text>
      <view class="link-block">
        <uni-link href="https://doc.dcloud.net.cn/uni-app-x/" class="custom-link" @error="onError" >
          查看 uni-app x 文档
        </uni-link>
      </view>
    </view>

    <view class="section">
      <text class="section-title">target="_self" (默认)</text>
      <view class="link-block">
        <uni-link href="https://uniapp.dcloud.net.cn" target="_self" @error="onError" >
          在内置 webview 中打开
        </uni-link>
      </view>
    </view>

    <view class="section">
      <text class="section-title">target="_blank"</text>
      <view class="link-block">
        <uni-link href="https://uniapp.dcloud.net.cn" target="_blank" @error="onError" >
          使用外部浏览器打开
        </uni-link>
      </view>
      <text class="tip-text">APP 使用 openSchema 插件，小程序回退到内置 webview 打开，Web 打开新页签</text>
    </view>

    <view class="section">
      <text class="section-title">target="_blank" 且 失败回退策略为复制URL</text>
      <view class="link-block">
        <uni-link href="https://uniapp.dcloud.net.cn" target="_blank" blankFallback="copy-link-modal" @error="onError" >
          使用外部浏览器打开
        </uni-link>
      </view>
      <text class="tip-text">使用外部浏览器打开失败时，回退为复制URL到剪贴板且弹框提示用户手动粘贴URL到浏览器</text>
    </view>

    <view class="section">
      <text class="section-title">失败示例</text>
      <view class="link-block">
        <uni-link href="" @error="onError" >
          空链接（触发 error）
        </uni-link>
      </view>
    </view>

    <view class="section">
      <text class="section-title">最近事件</text>
      <text class="log-text">{{ data.lastEvent }}</text>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  type Data = {
    lastEvent: string
  }

  const data = reactive<Data>({
    lastEvent: '暂无事件'
  })

  function onError(message : string) {
    data.lastEvent = `error: ${message}`
    console.error(`[link] error: ${message}`)
  }

  defineExpose({
    data,
    onError
  })
</script>

<style>
  .page {
    flex: 1;
    padding: 12px;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
    color: var(--text-color, #333333);
  }

  .link-block {
    margin-top: 8px;
  }

  .tip-text {
    margin-top: 4px;
    font-size: 12px;
    color: var(--text-color, #333333);
    opacity: 0.6;
  }

  .custom-link {
    color: #007aff;
    font-size: 20px;
  }

  .log-text {
    margin-top: 8px;
    font-size: 13px;
    color: #007aff;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-link)
