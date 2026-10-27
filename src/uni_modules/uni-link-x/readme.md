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
