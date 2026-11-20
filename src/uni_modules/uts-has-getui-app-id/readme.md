# hasGetuiAppId

仅用于鸿蒙平台，检查应用 metadata 的 entry 数组中是否存在 `GETUI_APPID` 配置项。
同步返回 boolean；查询失败时输出警告并返回 false。不校验 AppId 的值或推送服务是否可用。

```ts
// #ifdef APP-HARMONY
import { hasGetuiAppId } from '@/uni_modules/uts-has-getui-app-id'

const configured = hasGetuiAppId()
// #endif
```

鸿蒙原生包只在 `utssdk/app-harmony/index.uts` 中引用，页面通过 UTS 插件调用。
