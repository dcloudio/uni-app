## 文档

完整的升级中心配置、云函数和管理后台说明请参阅
[uni-upgrade-center](https://uniapp.dcloud.net.cn/uniCloud/upgrade-center.html)。

## UpdateManager

`UpdateManager` 统一管理检查更新、打开升级弹窗、安装完成通知、重启生效和失败事件。推荐在应用入口和业务页面复用同一个管理器实例：

```ts
import { createUpdateManager } from '@/uni_modules/uni-upgrade-center-app/utils/update-manager'

const updateManager = createUpdateManager()
const result = await updateManager.checkUpdate()
if (result.hasUpdate && result.packageInfo != null) {
  await updateManager.showUpdate(result.packageInfo)
}
```

`showUpdate` 不传更新包信息时，会使用最近一次 `checkUpdate` 返回的更新包。重复调用时，在上一次弹窗打开完成前会复用同一个 Promise，避免重复打开升级页面。

### 平台约定

- uni-app x 使用 `uni.openDialogPage` 打开内置升级页，打开失败时会清理临时存储。
- 传统 App 使用 `uni.navigateTo` 打开升级页，打开失败时同样会清理临时存储。
- HarmonyOS Next 需要传入平台升级组件作为第二个参数：`showUpdate(packageInfo, component)`。
- `cloud://` 下载地址会先解析为临时 URL；解析失败时 `showUpdate` 会 reject，不会继续打开无效地址。
- Vapor wgt 安装完成后不会自动重启，业务可调用 `applyUpdate()`，或使用 `notifyUpdateReady` 的提示策略。

### 应用生命周期

如果需要支持用户取消重启后在应用切后台时自动生效，请在 `App.uvue` 中转发应用生命周期：

```ts
const updateManager = createUpdateManager()

onAppShow(() => updateManager.handleAppShow())
onAppHide(() => updateManager.handleAppHide())
```

### 事件监听

可通过以下方法监听更新状态，并在页面卸载或不再需要时移除监听：

- `onCheckForUpdate` / `offCheckForUpdate`
- `onUpdateReady` / `offUpdateReady`
- `onUpdateFailed` / `offUpdateFailed`

检查更新的测试参数类型为 `CheckUpdateOptions`，支持注入 `appid`、`appVersion` 和 `appWgtVersion`；正式环境不传参数时会读取当前应用信息。
