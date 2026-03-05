## 一键登录

### 配置依赖

依赖har包：`@uni_modules/uni-verify`，此har包未发布到鸿蒙ohpm需要自行到任意uni-app-x项目编译到鸿蒙的产物（`unpackage/dist/dev/app-harmony/libs/uni_modules__uni_verify.har`）内拷贝到鸿蒙原生项目。
在鸿蒙原生项目`oh-package.json5`文件内`dependencies`字段下添加如下内容：

```json
"@uni_modules/uni-verify": "./libs/uni_modules__uni_verify.har"
```
### 注册模块

在uni_modules入口文件`index.generated.ets`内注册一键登录api。

```typescript
import { registerUniProvider, uni } from "@dcloudio/uni-app-x-runtime";

import { getUniVerifyManager } from '@uni_modules/uni-verify'

export function initUniModules() {
  initUniExtApi()

}

function initUniExtApi() {
  uni.getUniVerifyManager = getUniVerifyManager
}
```