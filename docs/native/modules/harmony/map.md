## 腾讯地图

### 模块依赖

依赖har包：`@uni_modules/uni-map-tencent`，此har包未发布到鸿蒙ohpm需要自行到任意uni-app-x项目编译到鸿蒙的产物（`unpackage/dist/dev/app-harmony/libs/uni_modules__uni_map_tencent.har`）内拷贝到鸿蒙原生项目。

### 配置腾讯地图key

在`entry/src/main/module.json5`文件内配置腾讯地图key。

```json
{
  "module": {
    // ...
    "metadata": [
      {
        "name": "TENCENT_MAP_KEY",
        "value": "腾讯地图的key"
      }
    ],
    // ...
  }
  // ...
}
```

### 注册模块
在uni_modules入口文件`index.generated.ets`内注册腾讯地图api。

```typescript
import { registerUniProvider, uni } from "@dcloudio/uni-app-x-runtime";
import { createMapContext } from '@uni_modules/uni-map-tencent'
import { UniMapElement } from '@uni_modules/uni-map-tencent'
import * as uniMapTencent from '@uni_modules/uni-map-tencent'

export function initUniModules() {
  initUniExtApi();
  uni.registerUTSPlugin('uni_modules/uni-map-tencent', uniMapTencent)
}

function initUniExtApi() {
  uni.createMapContext = createMapContext
  globalThis.UniMapElement = UniMapElement
}
```