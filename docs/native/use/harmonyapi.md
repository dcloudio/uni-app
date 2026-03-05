## 初始化 SDK

打开鸿蒙项目文件 entry/src/main/ets/entryability/EntryAbility.ets，增加 uni-app sdk 初始化逻辑。

```typescript
import { window } from "@kit.ArkUI";
import { UniEntryAbility } from "@dcloudio/uni-app-x-runtime";
import BuildProfile from "BuildProfile";

export default class EntryAbility extends UniEntryAbility {
  onImport(path: string): Promise<void | Object> {
    return import(path);
  }

  constructor() {
    super("你的APPID", {
      debug: BuildProfile.DEBUG,
    });
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    super.onWindowStageCreate(windowStage, false);

    windowStage.loadContent("pages/Index", (err) => {
      if (err.code) {
        return;
      }
    });
  }
}
```

## 启动

```typescript
export type AnimationType =
  | "slide-in-right"
  | "slide-in-left"
  | "slide-in-top"
  | "slide-in-bottom"
  | "fade-in"
  | "none";
interface IOpenUniAppConfig {
  animationType?: AnimationType;
  animationDuration?: number;
}
export declare function openUniApp(
  appID: string,
  config?: IOpenUniAppConfig
): void;
```

示例代码

```ts
import { openUniApp } from '@dcloudio/uni-app-x-runtime'

@Entry
@Component
struct Index {
  build() {
    RelativeContainer() {
      Button('Open')
        .onClick(() => {
          openUniApp('你的APPID', {
            animationType: 'fade-in',
          })
        })
    }
    .height('100%')
    .width('100%')
  }
}
```

## 退出

退出应用可以在 uni-app x 中调用 uni.exit()，整体退出 uni-app x。

## 通信

可以使用 [Emitter 模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-emitter?ha_source=Dcloud&ha_sourceId=89000448)进行消息通信。

### 原生 APP 监听消息以及向 uni-app x 发送消息

```ts
// Index.ets
import emitter from '@ohos.events.emitter'

emitter.on('launch', (data) => {
  console.log('launch:', data.data)

  emitter.emit('message', {
    data: 'hello'
  })
})
```

### uni-app x 监听消息以及向原生 APP 发送消息

```ts
// App.uvue
import emitter from '@ohos.events.emitter'

emitter.on('message', (data) => {
  console.log('message:', data.data)
})

export default {
    onLaunch: function (options) {
        emitter.emit('launch', {
          data: 'launch'
        })
    }
}
```
