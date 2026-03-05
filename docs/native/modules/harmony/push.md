## Push

### uni-push

#### 配置依赖

依赖har包：`@uni_modules/uni-push`，此har包未发布到鸿蒙ohpm需要自行到任意uni-app-x项目编译到鸿蒙的产物（`unpackage/dist/dev/app-harmony/libs/uni_modules__uni_push.har`）内拷贝到鸿蒙原生项目。

在鸿蒙原生项目`oh-package.json5`文件内`dependencies`字段下添加如下内容：
```json
{
  "@uni_modules/uni-push": "./libs/uni_modules__uni_push.har"
}
```

#### 配置参数

在项目模块级别下的src/main/module.json5文件中，新增metadata并配置`GETUI_APPID`和`client_id`，如下所示：
```json
{
  "module": {
     "metadata": [
      {
        "name": "GETUI_APPID",
        "value": "AppID信息"
      },
      {
        "name": "client_id",
        "value": "在华为AppGallery Connect控制台获取的client_id"
      }
     ]
  }
}
```

### 注册模块

在uni_modules入口文件`index.generated.ets`内注册uni-push api。

```typescript
import { uni } from "@dcloudio/uni-app-x-runtime";
import { getPushClientId,onPushMessage,offPushMessage,createPushMessage,setAppBadgeNumber } from '@uni_modules/uni-push'

export function initUniModules() {
  initUniExtApi();
}

function initUniExtApi() {
  uni.getPushClientId = getPushClientId
  uni.onPushMessage = onPushMessage
  uni.offPushMessage = offPushMessage
  uni.createPushMessage = createPushMessage
  uni.setAppBadgeNumber = setAppBadgeNumber
}
```