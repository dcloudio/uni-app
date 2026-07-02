# @dcloudio/uni-mp-vite

## Entry

`packages/uni-mp-vite/src/index.ts`

小程序 vite 插件

## 微信独立分包 root main

独立分包 root 下可选放置 `main.uts`、`main.ts` 或 `main.js`，并导出 `createApp(app)`。编译器会在该独立分包的 `common/main.js` 中创建当前 root 的 Vue app，并调用 `createApp(app)`，用于配置当前独立分包自己的 Vue app，例如 `app.use()`、`app.provide()`。

该入口不会执行项目根目录的 `main.*`。独立分包 root main 暂不支持通过 `app.component()` 注册小程序全局组件；需要组件时请在独立分包页面或组件内局部引用。

```js
// main.js
import { uniMainJsPlugin } from './plugins/mainJs'
// manifest.json
import { uniManifestJsonPlugin } from './plugins/manifestJson'
// pages.json
import { uniPagesJsonPlugin } from './plugins/pagesJson'
// entry uni:virtual uniPage:// uniComponent://
import { uniEntryPlugin } from './plugins/entry'
// 'uni:mp-inject'
// packages/uni-cli-shared/src/vite/plugins/inject.ts
// options.vite.inject
import { uniViteInjectPlugin } from '@dcloudio/uni-cli-shared'
// render js 过滤 options.template.filter 的内容
import { uniRenderjsPlugin } from './plugins/renderjs'
// runtime hooks uni:mp-runtime-hooks enforce='post'
import { uniRuntimeHooksPlugin } from './plugins/runtimeHooks'
// uniMiniProgramPlugin 'uni:mp', 重新组织 vite config
import { uniMiniProgramPlugin } from './plugin'
// uniUsingComponentsPlugin
import { uniUsingComponentsPlugin } from './plugins/usingComponents'

// UNI_SUBPACKAGE UNI_MP_PLUGIN
```
