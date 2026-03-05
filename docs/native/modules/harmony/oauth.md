## OAuth

OAuth模块提供了第三方登录的能力。

### 华为登录

#### 配置依赖

依赖此har包：`@uni_modules/uni-oauth-huawei`，此har包未发布到鸿蒙ohpm需要自行到任意uni-app-x项目编译到鸿蒙的产物（`unpackage/dist/dev/app-harmony/libs/uni_modules__uni_oauth_huawei.har`）内拷贝到鸿蒙原生项目。

在鸿蒙原生项目`oh-package.json5`文件内`dependencies`字段下添加如下内容：

```json
"@uni_modules/uni-oauth-huawei": "./libs/uni_modules__uni_oauth_huawei.har"
```

#### 注册模块

在uni_modules入口文件`index.generated.ets`内注册华为登录provider。

```typescript
import { registerUniProvider, uni } from "@dcloudio/uni-app-x-runtime";
import { UniOAuthHuaweiProviderImpl } from '@uni_modules/uni-oauth-huawei'

export function initUniModules() {
  initUniExtApi();
}

function initUniExtApi() {
  registerUniProvider('oauth', 'huawei', new UniOAuthHuaweiProviderImpl())
}
```


