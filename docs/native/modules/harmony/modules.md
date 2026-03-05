如在uni-app项目manifest.json内已勾选对应的鸿蒙模块，则在编译产物的uni_modules目录下会生成对应的`index.generated.ets`和`oh-package.json5`文件，参考[集成编译产物到项目内](../../importfeproject/harmony.md)文档将这两个文件集成到鸿蒙项目内即可。

为简化描述，此处约定后文中的部分概念：

- `index.generated.ets`: 鸿蒙原生工程内的uni_modules入口文件，位于`/entry/src/main/ets/uni_modules/index.generated.ets`，如果没有请自行创建
- `oh-package.json5`: 鸿蒙原生工程内根目录的`/oh-package.json5`文件

鸿蒙项目的`entry/src/main/ets/entryability/EntryAbility.ets`文件中添加如下代码。

```ts
import { initUniModules } from '../uni_modules/index.generated'
initUniModules()
```

目前如下模块涉及配置依赖或参数：

- [地图](./map.md)
- [推送](./push.md)
- [三方登录](./oauth.md)
- [实人认证](./facialVerify.md)
- [支付](./pay.md)
- [一键登录](./verify.md)
- [定位](./location.md)
