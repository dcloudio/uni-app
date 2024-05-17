# @dcloudio/uni-mp-vite

## Entry

`packages/uni-mp-vite/src/index.ts`

小程序 vite 插件

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
