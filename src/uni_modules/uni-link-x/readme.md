# uni-link 链接组件

## 用途和场景

uni-link 用于在页面中展示可点击的链接文字，点击后按配置在应用内置浏览器或系统外部浏览器中打开目标 URL。适合展示帮助文档、协议条款、第三方网站等需要在应用内或应用外打开网页的场景。

## 使用方式（职责分工）

组件内部负责：

- 渲染带下划线的可点击文本，内容由默认插槽决定。
- 校验 `href`，按 `target` 选择内置 `web-view` 页面或系统外部浏览器打开。
- `target="_blank"` 打开失败时按 `blank-fallback` 执行回退策略（转 `_self`、复制链接弹框、或不回退并抛出错误）。
- 打开失败时抛出 `error` 事件。

使用者负责：

- 传入 `href`，并在需要时选择 `target`（`_self` / `_blank`）与 `blank-fallback`。
- 在项目的 `pages.json` 中注册组件自带的 `link-webview` 页面（HBuilderX 导入本组件时会弹框提醒）。
- 小程序平台需要将域名加入应用的域名白名单。
- 监听 `error` 事件处理打开失败。

## 基本用法

```html
<uni-link href="https://uniapp.dcloud.net.cn">uni-app x 文档</uni-link>
```

`target="_self"` 时使用 `uni_modules/uni-link-x/pages/link-webview` 页面内的 `web-view` 打开。`target="_blank"` 时，APP 平台调用系统浏览器打开，Web 平台调用 `window.open(url, '_blank')`，小程序平台无法打开系统浏览器，会进入失败回退逻辑。

`target="_blank"` 失败时，通过 `blank-fallback` 控制回退处理策略：

1. `turn-self`（默认）：改用 `_self` 方式打开。
2. `copy-link-modal`：复制链接到剪贴板并弹框提示用户在外部浏览器中打开。
3. `none`：不回退，触发组件的 `error` 事件。

```html
<uni-link href="https://uniapp.dcloud.net.cn" target="_blank" blank-fallback="copy-link-modal">
  使用外部浏览器打开
</uni-link>
```

在 Web 平台，组件同时支持鼠标点击与键盘操作：获得焦点后可按回车或空格打开链接。

## 注意事项

- 组件内部只负责打开链接，不做跳转后的页面管理，回退策略以外的行为由使用者自行处理。
- 打开失败的常见原因：
  - 安装本组件时未在项目的 `pages.json` 中注册组件自带的内置页面（HBuilderX 导入时会弹框提醒注册）。
  - 小程序平台未将域名加入应用的域名白名单。
  - iOS 运行基座未包含 `openSchema` 插件，仅在无 Xcode 时运行会触发，正式打包不会出现。
  - APP 平台部分手机系统会弹框询问是否允许打开浏览器，用户拒绝时没有失败回调；可借助 APP 的 `onHide` 生命周期是否触发来判断系统浏览器是否真正启动。
- APP 平台依赖 `uts-openSchema`，已在 `uni_modules/uni-link-x/package.json` 中声明该依赖。

## 示例页面

`/pages/uni-ui/link/link`
