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
  await updateManager.showUpdate()
}
```

`showUpdate` 不传更新包信息时，会使用最近一次 `checkUpdate` 返回的更新包及其任务上下文。重复调用时，在上一次弹窗打开完成前会复用同一个 Promise，避免重复打开升级页面。

### 平台约定

- uni-app x 使用 `uni.openDialogPage` 打开内置升级页，打开失败时会清理临时存储。
- 传统 App 使用 `uni.navigateTo` 打开升级页，打开失败时同样会清理临时存储。
- HarmonyOS Next 需要传入平台升级组件作为第二个参数：`showUpdate(packageInfo, component)`。
- `cloud://` 下载地址会先解析为临时 URL；解析失败时 `showUpdate` 会 reject，不会继续打开无效地址。
- Vapor wgt 安装完成后不会自动重启，业务可调用 `applyUpdate()`，或使用 `notifyUpdateReady` 的提示策略。

### 任务身份

`UpdateTaskContext` 为 `{ taskId: string, checkId: number }`。管理器在检查开始时生成一次不透明 `taskId`，`UpdateCheckEvent.taskContext` 将它与本次 `checkId` 关联。解析 `cloud://`、下载、校验、安装、WGT ready、提醒及重启失败均传递同一任务身份；`taskId` 不包含下载 URL 或阶段，不应由调用方解析。后续检查不会改写已经开始的异步任务上下文。

- 无参 `showUpdate()` 使用缓存包及缓存上下文；显式 `showUpdate(packageInfo)` 没有上下文时视为手动升级，分配新任务且 `checkId = 0`，即使传入的包来自最近一次检查也不自动关联。
- 需要显式关联检查时使用 `showUpdate(event.packageInfo, component, event.taskContext)`，非 Harmony 平台的 `component` 可传 `null`。旧 `check-update` 入口会自动传递本次检查上下文，原有 options 和组件参数不变。
- 自定义下载或安装流程可调用 `createTaskContext(checkId?)` 创建上下文，省略 `checkId` 时为 `0`。一次尝试只创建一次，并将其传到后续回调；新尝试应创建新上下文。
- `UpdateReadyEvent.checkId` 与 `UpdateCheckEvent.taskContext` 在类型中是可选字段，保持旧事件对象的构造兼容；当前管理器发出的事件会填写它们。重启失败事件保留 ready 包的 `packageInfo`、`taskId` 和 `checkId`，并恢复 ready 状态以便再次调用 `applyUpdate()`。
- `notifyUpdateReady(packageInfo, taskId?, promptAfterInstall?, taskContext?)` 保留原前三个参数，额外上下文是第四个可选参数；显式 `taskId` 仍优先使用，没有上下文时 `checkId = 0`。
- `notifyApkDownloaded(packageInfo, filePath, taskContext?)` 与 `startNotificationDownload(packageInfo, taskContext?)` 只增加末尾可选上下文。管理器会复制上下文字段；后台 WGT 和通知下载各自保留开始时的上下文，已下载通知包复用原任务。

两种内置升级页使用独立的临时存储 key，传递 `{ packageInfo, taskContext }`，不会往安装包字段中混入上下文。每次打开使用不同 key，页面 `onLoad` 读取后立即删除本次 key，打开失败也清理本次 key。读取兼容历史裸包和 `check-update-nvue` 入口；裸包按手动任务处理，不重写旧 nvue 检查流程。

uni1 Harmony 组件的 `show(true, packageInfo, taskContext?)` 保留原前两个参数。自定义的旧两参数组件可以忽略第三个值并正常显示；需要事件身份关联的外部组件必须接收并转发这个可选上下文，没有适配时不会推测它的新 API 或自动借用最近一次检查。

### 提醒与失败

Android APK 的 `is_update_prompt = true` 直接进入通知下载，不打开初始升级页，下载完成后等待用户确认；uni-app x 仅在确认安装后按 `verify_sha256` 校验并唤起安装器。`false` 或缺失时保留普通升级页，`is_silently` 不作为 APK 下载分流条件。APK 不发 WGT ready 或重启事件。通知插件异常只影响通知展示，不阻塞下载完成提示、校验和安装。

支持 WGT 的 Vapor Android/iOS 和 uni1 保留自动下载安装后的 ready、modal/toast 提醒和重复通知守卫；静默 WGT 只安装，不提示或主动重启。两种 popup 下载及安装失败也会发失败事件，APK 校验失败的 UI 重置不会额外重复发一个 download 阶段事件；popup 的 WGT 重启统一调用 `applyUpdate()`。

### APK SHA256 校验

发布记录开启 `verify_sha256` 后，uni-app x 客户端会在安装 APK 前校验安装包 SHA256：摘要不匹配会阻止安装并提示重新下载，开关开启但摘要为空会提示配置错误。该开关与校验仅对 uni-app x 生效，uni1 客户端会忽略。

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

## 纯 Node 回归

持久测试位于本模块 `tests/`，可随模块同步到测试项目，无需复制临时脚本或修改同步脚本。从项目根目录运行：

```sh
HBUILDERX_PATH="<HBuilderX .app 或包含 plugins 的目录>" node --test uni_modules/uni-upgrade-center-app/tests/*.test.cjs
```

前置条件为支持 `node:test` 的 Node.js（建议 Node.js 20+）和已安装 HBuilderX 的 UTS 插件。测试通过 `HBUILDERX_PATH` 定位 `plugins/uniapp-uts-v1/node_modules/@dcloudio/uni-uts-v1/lib/typescript/lib/typescript.js`；路径缺失或文件不存在时明确报错，不回退到硬编码机器或工作区路径。源码位置相对测试文件定位。

测试 helper 支持嵌套条件编译、`&&`/`||`/否定/括号/`#else`，使用 HBuilderX TypeScript 的 `transpileModule` 将所选模式的脚本交给 Node VM。覆盖 Vapor/VDOM、iOS、uni1/nvue 和 Harmony 检查参数，APK/WGT 提醒、SHA256 安装前调用、通知异常隔离、任务身份及 A/B 检查隔离、popup 新旧存储兼容与清理、旧组件签名和重启失败恢复。

这些是纯 Node 模拟回归，下载、文件系统、原生安装、通知、Vue 状态及生命周期均由测试桩提供，不是设备实测，也不是 UTS/Kotlin 编译验证。真实摘要计算、安装器回调、Harmony 外部组件适配及各平台原生编译仍需人工验证；运行此命令不会调用 HBuilder CLI、部署、启动模拟器或浏览器。
