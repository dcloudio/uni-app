# Harmony `uni.installWgt` 平台接口与接入说明

> 状态：平台评审稿；基线：`dev@c3396b8`，2026-11-02；适用范围：uni-app x Vapor 的 HarmonyOS 端 WGT 完整包与差量包安装。

## 1. 结论

Harmony 端不新增另一套面向应用开发者的安装 API，继续复用现有公开接口：

```ts
interface Uni {
  installWgt(options: InstallWgtOptions): void
}
```

为了让现有 iOS 安装流程在 Harmony 端成立，Harmony V1 需要在公开 `UTSHarmony` 平台接口中提供或补齐以下 8 个能力，与 iOS 保持一致：

```ts
declare namespace UTSHarmony {
  function convert2AbsFullPath(path: string): string
  function getAppId(): string
  function getAppWgtVersion(): string
  function getUniCompilerRuleVersion(): number
  function isSyncDebug(): boolean
  function getAppRootPath(appId?: string): string
  function getResourcePath(relativePath: string): string
  function setAppPath(
    appId: string,
    versionName: string,
    resourcePath: string
  ): number
}
```

当前 Harmony Vapor 与 DOM Runtime 均已确认存在 `convert2AbsFullPath`、`getAppId`、`getResourcePath` 同名能力，其中 `getResourcePath("")` 的现有行为不满足安装契约。当前 `project-dom2` 的 Vapor Runtime 源码已有 `getUniCompilerRuleVersion` 的常量实现，但公共 `UTSHarmony` 类型尚未声明，其他 Runtime 形态也未统一；`getAppWgtVersion`、`isSyncDebug`、`getAppRootPath`、`setAppPath` 需要新增。

仅增加函数签名还不足以完成热更新。Runtime 必须同时做到：

- 原子持久化新的相对资源指针，并在安装回调结束后的下一次启动/显式重载时生成单一执行快照；
- 使用同一个执行快照解析 manifest、`app-config`、`app-service`、页面字节码和静态资源；
- 外置资源无效时安全回退到 HAP 内置资源；
- 支持 Worker 内的同步文件操作、ZIP 解压和文件到文件的 Zstandard 解压。

`getAppWgtVersion/getResourcePath("")` 表示 Runtime 最近接受并持久化的 selected resource，供安装器连续安装或构造差量基准；当前页面实际执行的资源由 Runtime 私有的 executing snapshot 保存，不新增公开接口。`setAppPath` 不得销毁当前 UTS 调用栈或同步重建协调器。HAP 内置资源若不可枚举，按第 5.8 节采用启动期物化或差量识别后的 Worker 复制；缓存目录与正式资源根不同卷时，还需第 5.7 节的专用 staging 根。

Harmony V1 的支持边界是：`isSyncDebug()` 固定为 `false`，同一 appId 只允许单进程/单 Runtime 实例执行安装。放开任一限制前，必须补齐第 6、9 节的资源快照或跨进程事务能力。

### 1.1 P0 交付门槛

| 能力 | 责任方 | 当前结论 |
| --- | --- | --- |
| 8 个 Runtime API | Harmony Runtime | 3 个同名能力已确认，其中空资源路径语义需补；1 个内部已有但缺公共声明；4 个待新增 |
| selected/executing 资源模型与统一入口路由 | Harmony Runtime | 当前入口仍固定到 HAP `www/import`，未满足 |
| Harmony WGT 可执行产物 | Runtime + 编译器 | 待确定沙盒加载格式 |
| Worker 文件系统、ZIP、Zstandard | UTS + provider | 文件 API 需 Worker 联调；Zstandard provider 待确认；现有同步 ZIP 要求 API 26 |
| 动态资源/代码合规结论 | 平台 + 合规 | 待确认 |

## 2. 范围与非目标

本文档定义：

- Harmony Runtime 需要提供的 `UTSHarmony` 平台 API 及其精确语义；
- Harmony Worker、文件系统、Zstandard、ZIP 和资源加载器需要满足的能力；
- 与 iOS 对齐的目录交接、回滚、回调和错误行为；
- 平台联调和验收范围。

本文档不定义：

- WGT 下载、网络重试和更新弹窗；
- WGT 完整性/真实性校验。`uni.installWgt` 自身不接收也不计算 SHA-256，也不验证业务签名；需要这些保障时，由调用方（例如升级中心）在安装前完成；
- Harmony 应用商店对动态代码或资源更新的合规结论，该项需要平台和合规团队单独确认；
- 在 WGT 中更新 HAR、HSP 或其他原生能力。原生模块仍随 HAP 发布。

## 3. 公开 API 保持跨端一致

公开类型继续以 [`utssdk/interface.uts`](./utssdk/interface.uts) 为准：

```ts
type InstallWgtOptions = {
  filePath: string
  ignoreVersion?: boolean
  success?: ((result: InstallWgtSuccess) => void) | null
  fail?: ((result: InstallWgtFail) => void) | null
  complete?: ((result: any) => void) | null
}

type InstallWgt = (options: InstallWgtOptions) => void
```

参数和回调契约：

| 项目 | 契约 |
| --- | --- |
| `filePath` | 必填。待安装的本地 Zstandard 文件路径；后缀不参与格式判断 |
| `ignoreVersion` | 默认 `false`；仅跳过完整包 `version.name` 必须高于当前版本的校验 |
| `success` | 候选资源完成正式交接后触发；非 SyncDebug 还要求 `setAppPath == 0`；当前成功对象无业务字段 |
| `fail` | 返回 `errSubject`、`errCode`、`errMsg`，部分内部或文件错误带 `cause` |
| `complete` | 在 `success` 或 `fail` 之后触发，参数为同一个结果对象 |
| 返回值 | `void` |

回调顺序固定为：

```text
success -> complete

或

fail -> complete
```

这是目标公开契约。当前共享协调器没有用 `try/finally` 隔离用户回调；若 UTS 回调异常会向外传播，则可能跳过 `complete` 或卡住队列，需在三端共享代码中补齐保护后才能宣称严格保证，不能只在 Harmony 分支修复。

同一个 UTS 模块/Runtime 实例内，多个调用按进入顺序串行执行，同一时刻只能有一个安装 Worker。后一项请求真正开始时才读取 selected Runtime 状态，因此必须能看到前一项安装后的最新 WGT 版本和资源路径。如果同一 appId 允许多个 Ability 或进程同时调用安装，Runtime 还必须提供跨实例文件锁/进程锁；否则产品必须明确限制为单进程单实例安装。

Harmony V1 采用后一种限制。未来跨实例锁必须覆盖“原子读取 appId/selected 版本/selected 路径 → Worker 完整事务 → `setAppPath` 或失败收尾”的整个区间，不能只锁最终 rename；快照中的版本和路径也必须在同一 generation 下原子读取。

## 4. iOS 参考流程

现有主线程编排位于 [`utssdk/index.uts`](./utssdk/index.uts)，Worker 状态机位于 [`workers/install-wgt-worker.uts`](./workers/install-wgt-worker.uts)。Harmony 应保持相同阶段和终态语义：

```text
uni.installWgt 入队
  -> 主线程校验原始 filePath 非空
  -> 主线程读取 Runtime 快照
  -> 创建本次安装独占 Worker
  -> 转换输入路径和 staging 路径，发送 start 消息
  -> Worker 预检输入文件与启动快照
  -> 创建 txn-<transactionId>-<uuid>
  -> Zstandard 文件到文件解压为 payload.zip
  -> unzipSync 解压 ZIP
  -> 递归定位 manifest.json
  -> 依据是否存在 app-wgtu 键识别完整包/差量包
  -> 完整包：先检查启动文件，再校验 manifest 公共字段和 Runtime 元数据
     差量包：校验 manifest 公共字段、app-wgtu 和 Runtime 元数据；
              复制当前 www、过滤 deleteFiles、覆盖差量文件，
              再检查合并后的 manifest 可解析且启动文件存在
  -> 原子 rename 到正式资源根
  -> Worker 发送唯一终态消息
  -> 主线程先 terminate Worker
  -> 非 SyncDebug：主线程调用 setAppPath，仅提交 selected pointer
     SyncDebug：Worker 已替换固定 www，不调用 setAppPath
  -> success/fail -> complete -> 下一请求
```

主线程只负责队列、Runtime 快照、Worker 生命周期、`setAppPath` 和公开回调。读取、解压、校验、复制、删除、移动和回滚全部在 Worker 中执行，不能阻塞 UI 主线程。

Harmony 分支构造 Worker 快照时，`runtimeAppVersion` 和 `currentResourcePath` 分别来自现有 `getAppWgtVersion()`、`getResourcePath("")`；二者必须读取同一份 selected resource 记录。

上图描述当前 iOS 的实际阶段顺序。第 5.1 节要求在共享主线程协调器中提前预检转换结果，使无法解析的非空输入稳定返回 `1030601`；这不是当前 iOS 已有行为，但属于 Harmony 上线前必须完成的三端共享改造，不能只在 Harmony 分支改变。改造前的诊断基线是：转换后的 `zipFilePath`、`stagingRoot`、`rootPath` 为空或必填消息字段为 `null` 时返回 `103612`；`currentResourcePath == ""` 允许完整包继续、差量包后续返回 `103623`；输入不存在或不是普通文件返回 `1030601`，staging 创建失败返回 `103602`，appRoot 创建或正式放置失败返回 `103604`。其他非空但非法的 Runtime 字段沿用后续 manifest/版本比较产生的既有错误码。

## 5. Harmony Runtime 平台 API

### 5.1 接口总表

| 接口 | 当前 Harmony 状态 | 调用线程 | 用途 |
| --- | --- | --- | --- |
| `convert2AbsFullPath(path)` | Vapor/DOM 已有，需验收安装场景 | 主线程 | 将虚拟路径转换为 Worker 可识别的本地绝对路径或可物化输入描述符 |
| `getAppId()` | Vapor/DOM 已有 | 主线程 | 获取 uni-app 逻辑 appId |
| `getAppWgtVersion()` | 需新增 | 主线程 | 获取 Runtime 最近接受的 selected resource 的 `version.name` |
| `getUniCompilerRuleVersion()` | Vapor SDK 内部已有，需统一公共类型和导出 | 主线程 | 获取 Runtime 支持的编译规则版本 |
| `isSyncDebug()` | 需新增 | 主线程 | 描述正式资源目录采用固定目录还是版本化目录 |
| `getAppRootPath(appId?)` | 需新增 | 主线程 | 获取可写的正式资源根目录 |
| `getResourcePath(relativePath)` | 已有，但空路径语义需补齐 | 主线程 | 空参数时获取 selected resource 的 `www` 根；非空参数保持既有公开语义 |
| `setAppPath(appId, versionName, resourcePath)` | 需新增 | 主线程 | 接管并持久化已安装资源，V1 不同步重载 |

以下条件能力不计入上述 8 个接口，但命中条件时必须提供；它们可以是 Runtime/Worker 私有能力，不要求扩展公开 `UTSHarmony`：

| 条件 | 额外能力 |
| --- | --- |
| cache staging 与 appRoot 不同卷 | 直接使用 `<appRoot>/.install-staging` 或 Runtime/Worker 私有解析能力，不新增公开 API |
| HAP 内置 `www` 不做启动期物化 | Worker 可调用的 `copySelectedResourceTo(targetPath)` 等价能力 |
| 允许多 Ability/进程安装 | 覆盖完整事务的跨进程 lease/锁，以及同 generation 的原子 Runtime 快照 |

所有接口均为同步接口，不得向调用方抛出异常。初始化完成的 Runtime 必须保证 appId、版本、编译规则版本和应用根有效，不能把非法值送进 Worker 后再依赖偶然的下游错误。selected 资源路径是例外：启动期物化失败或采用按需复制时可以为空，不能因此阻止完整包；只有 Worker 识别为差量包后才要求可枚举基准，无法取得时返回 `103623`。

Harmony 上线前必须在共享主线程协调器中、创建 Worker 前完成一次快照预检，并同步用于 iOS、Android 和 Harmony：

- 输入解析结果为空、是本地目录，或既不是普通文件也不是平台明确声明可由 Worker 物化的 asset/URI，统一返回 `1030601`；普通文件和 `canMaterializeInput == true` 的非本地来源都允许进入 Worker；
- staging/appRoot 无法解析、必填 Runtime 快照字段缺失/非法或接口调用失败，映射为 `103612`；selected 资源路径为空按上述差量规则处理；
- staging 的实际创建继续由 Worker 执行，失败映射为 `103602`；
- appRoot 的实际创建和正式资源放置继续由 Worker 执行，失败映射为 `103604`；
- `setAppPath` 失败通过非零返回值表达，并映射为 `103605`。

仅让 `convert2AbsFullPath` 返回空字符串会使当前 Worker 落入 `103612`，不能保证 `1030601`。因此共享预检是启用 Harmony 支持的前置任务；完成后第 10、12 节的 `1030601` 才成为三端统一目标行为。

### 5.2 `convert2AbsFullPath`

```ts
function convert2AbsFullPath(path: string): string
```

用途：将平台支持的 uni 虚拟路径或本地路径转换为 Worker 可识别的本地绝对路径；确实无法直接暴露为文件的受支持资源，可以转换为可物化输入描述符。下载缓存、项目静态资源、应用沙盒路径和 `file://` URI只是常见来源示例，不构成必须支持的固定 scheme 清单；实际范围以 Harmony 的 uni 路径规范为准。

输入：

- `path` 可以是 Harmony 已声明支持的 uni 虚拟路径、项目资源路径、文件 URI 或本地绝对路径。

返回：

- 普通文件成功时返回规范化的本地绝对路径，不带 `file://`；
- 对平台明确支持 Worker 物化的 asset/URI，可以返回稳定的输入描述符，但 Harmony Worker 必须在调用 Zstandard 前把它流式复制到本次 txn；
- 无法转换为本地文件时返回空字符串；
- 已是绝对路径时必须幂等，不得改变其指向。

安装场景的附加要求：

- 输入 WGT 必须最终表现为 Worker 可读的普通文件；
- staging 根必须表现为可创建、删除和重命名的普通目录；
- 不得通过一次性读取整个文件到 `ArrayBuffer` 的方式完成转换；
- 主线程转换后，Worker 使用该绝对路径或输入描述符时不得依赖页面上下文。

如果项目 `/static` 在 HAP 中只能表现为 rawfile/资源 URI，不能在 `convert2AbsFullPath` 的主线程同步调用中复制大文件。平台要么在构建/启动阶段提供对应的真实本地文件，要么像 Android 非本地输入一样扩展 Harmony Worker，在 txn 内流式复制为 `input.wgt`；V1 验收前必须明确采用哪一种。下载缓存和沙盒普通文件不需要该分支。

### 5.3 `getAppId`

```ts
function getAppId(): string
```

返回当前 Runtime 的 uni-app 逻辑 appId。

契约：

- 返回值必须与当前 WGT `manifest.json.id` 使用同一标识体系，不能用 Harmony bundle name 替代；
- 返回值非空，且在单次安装事务中保持稳定；
- 只能包含 ASCII 字母、数字、`.`、`_`、`-`，且不能为 `.` 或 `..`；
- Runtime 快照本身非法时在创建 Worker 前返回 `103612`；WGT 中 appId 格式非法返回 `103610`，与 Runtime appId 不一致返回 `103614`。

### 5.4 `getAppWgtVersion`

```ts
function getAppWgtVersion(): string
```

返回 Runtime 最近接受并持久化的 selected resource 的 WGT `manifest.version.name`，不是 HAP 的 `versionName`，也不是 Runtime 产品版本。该接口直接作为下一次完整包或差量包安装的版本基准。

当前 Harmony 的 `getAppVersion().name` 读取启动时已经载入的 HAP 内置 manifest；在资源路由完成改造前，它不能替代本接口。

契约：

- 格式为数字点分版本，例如 `1.2.3`；
- 首次启动且尚未安装外置 WGT 时，返回 HAP 内置 WGT manifest 的版本；
- `setAppPath` 返回成功后，本接口必须立即返回传入的新 `versionName`，即使当前页面尚未重载；
- 未来若支持 `isSyncDebug() == true`，该路径没有 `setAppPath`，固定目录切换成功后必须立即返回新版本；
- 应用重启后仍返回已持久化资源的版本；
- 持久化资源失效后，原子回退安全资源并返回其版本；默认安全资源为当前 HAP 内置 WGT；
- 差量更新使用该值校验 `app-wgtu.baseVersion`，错误值会导致 `103622`。

本接口只描述 selected 状态。当前页面的 executing version 由 Runtime 私有快照维护；`getAppBaseInfo().appWgtVersion` 等面向当前会话的字段在重载前仍可报告旧 executing 版本。

### 5.5 `getUniCompilerRuleVersion`

```ts
function getUniCompilerRuleVersion(): number
```

返回当前 Runtime 能够执行的 `uni-app-x.compilerRuleVersion`。

契约：

- 返回非负整数；
- 值来自 Runtime 自身的兼容性常量，不能读取待安装 WGT 的 manifest 后原样返回，否则校验失去意义；
- 必须与编译器写入 WGT manifest 的版本体系一致；
- 不等于 Runtime 产品版本、编译器产品版本或 Harmony API level；
- WGT 与 Runtime 不一致时，插件返回 `103619`。

当前 Vapor SDK 内部已有基于 `UNI_COMPILER_RULE_VERSION` 常量的实现，可以复用；接入工作重点是补齐公共 `UTSHarmony` 类型、导出，并保证主线程安装代码可调用同一实现。

“非负整数”是 Runtime 接口和目标包格式的规范要求。当前共享 Worker 对字符串会做十进制归一化，但对 JSON number 尚未显式检查非负和整数；接入 Harmony 时应在共享代码中补齐该校验，不能只在 Harmony 分支收紧行为。

### 5.6 `isSyncDebug`

```ts
function isSyncDebug(): boolean
```

该值描述资源目录和激活方式，不应简单理解为“是否真机”。

| 返回值 | 目录布局 | 激活方式 |
| --- | --- | --- |
| `false` | `<appRoot>/<resource-id>/www` | Worker 交接候选目录后，主线程调用 `setAppPath` |
| `true` | `<appRoot>/www` | Worker 直接备份并替换固定 `www`，成功后不调用 `setAppPath` |

契约：

- 该值必须与 `getAppRootPath` 和 `getResourcePath("")` 的实际布局一致；
- Harmony V1 必须返回 `false`；固定 `www` 模式通过第 6.1 节的会话一致性和第 9.2 节的持久化恢复验收后，才能在后续版本返回 `true`；
- 如果任一环境可能返回 `true`，必须完整实现持久化切换日志、进程崩溃恢复、备份和回滚语义，并保证当前 executing snapshot 不会在目录替换后混读新文件；不能只做进程内异常回滚或直接覆盖旧目录。

### 5.7 `getAppRootPath`

```ts
function getAppRootPath(appId?: string): string
```

返回指定 appId 的可写正式资源根，路径截止到 appId 层，不包含 `www`，也不包含某个 `resource-id`。

建议布局：

```text
<AbilityContext.filesDir>/uni-app-x/apps/<appId>
```

契约：

- 省略 `appId` 时使用当前应用 appId；插件当前会显式传入 appId；
- 返回本地绝对路径，不带 `file://`；
- 目录不存在时允许 Worker 递归创建；
- Runtime 和文件系统允许插件在该目录下创建并原子移动资源目录；
- 不能返回 HAP 的只读 `resourceDir`、缓存目录或当前某个 `www`；
- 必须保证 `uni.env.CACHE_PATH/uni-app-x-wgt/staging` 与该目录位于支持原子目录 rename 的同一文件系统。

如果平台无法保证 cache staging 与正式资源根同卷，Harmony 分支应直接在 `<appRoot>/.install-staging` 建立私有 staging，或由 Runtime/Worker 私有解析器返回等价位置；不需要为此增加公开 `UTSHarmony` 接口。不能在 rename 失败后自动退化为递归复制，否则会破坏提交和回滚的原子性。

### 5.8 `getResourcePath`

```ts
function getResourcePath(relativePath: string): string
```

`installWgt` 只依赖 `getResourcePath("")`：它返回 Runtime 最近接受并持久化的 selected `www` 根，作为连续安装和差量合并基准。非空参数继续遵守该公开接口已有的平台语义，不因 Harmony 接入额外改变。

关键契约：

- selected 资源已物化或位于普通文件系统时，`getResourcePath("")` 必须直接返回其 `www` 根目录，不能返回 appId 目录或 `www` 的父目录；采用按需私有复制且内置资源尚不可枚举时允许暂时返回空字符串；
- 返回本地绝对路径，不带 `file://`；
- 当前使用内置资源时，返回内置 selected 资源对应的路径；该返回值并不必然表示 Worker 可以递归枚举；
- `setAppPath == 0` 后立即返回 Runtime 新接受的目录，即使当前页面尚未重载；
- 空参数结果必须与 `getAppWgtVersion()` 来自同一份 selected resource record，不能出现新版本配旧路径。

如果 HAP 内置资源只能通过 `$rawfile`、`resource://rawfile` 或其他不可递归枚举的资源接口访问，返回该 URI 不满足差量安装契约。平台必须选择以下一种模型：

1. **V1 推荐：启动期物化。** Runtime 在初始化阶段把完整内置 `www` 原子物化到应用私有、不可被系统自动清理的目录；安装时 `getResourcePath("")` 只返回已经就绪的本地快照，不在 UI 主线程复制。
2. **按需 Worker 复制。** 提供仅在 Worker 识别出差量包后调用的 `copySelectedResourceTo(targetPath)` 私有能力，并扩展 Worker 消息/状态机；该能力必须复制调用时的 selected generation，产生一致快照，支持完整递归复制和失败清理。它不能设计成主线程同步执行的大规模 `materializeCurrentResource()`。

按需能力的建议最小契约为：

```ts
// Runtime/Worker 私有能力，不放入公开 UTSHarmony；必须可从安装 Worker 调用。
function copySelectedResourceTo(
  appId: string,
  expectedVersionName: string,
  targetPath: string
): number
```

`targetPath` 必须是本次 txn 下尚不存在的目录。返回 `0` 表示已把与 `expectedVersionName` 同一 selected generation 的完整 `www` 快照复制到目标；非零表示未复制成功，调用方清理部分目标并返回 `103623`。该能力不得读取旧 executing snapshot，也不得在复制过程中切换 generation。

完整包不依赖当前基准资源，当前路径为空或启动期物化失败都不能阻止 Worker 启动；只有识别为差量包后，才需要 selected 路径或调用按需复制，失败返回 `103623`。采用模型 2 时，该能力保持 Runtime/Worker 私有，不要求新增公开 `UTSHarmony` 接口。

当前 Harmony Runtime 虽然已有该函数，但其实现只是对参数执行通用路径转换；传入空字符串时不能得到当前 `www` 根，需要为 WGT 资源路由补充专门语义。

### 5.9 `setAppPath`

```ts
function setAppPath(
  appId: string,
  versionName: string,
  resourcePath: string
): number
```

在 `isSyncDebug() == false` 时，由主线程同步通知 Runtime 接管已完成交接的资源。

输入：

- `appId`：WGT manifest 中已校验通过的 appId；
- `versionName`：WGT manifest 中已校验通过的 `version.name`；
- `resourcePath`：绝对 `www` 路径，形如 `<appRoot>/<resource-id>/www`。

返回：

- `0`：Runtime 已验证、接受并原子持久化该资源；
- 非 `0`：Runtime 拒绝该资源，公开 API 映射为 `103605`；
- 不得抛出异常。

返回 `0` 前必须完成：

1. 校验 `appId` 是当前应用；
2. 规范化并解析真实路径，确认它是 `getAppRootPath(appId)` 下某个已完成交接的 `<resource-id>/www`；`resource-id` 必须是单一安全路径段并符合 Worker 生成的 32 位小写十六进制格式，拒绝符号链接或路径穿越逃逸；
3. 做轻量防御性检查：确认目录存在、可读且 `versionName` 格式合法，并只读取小型 `manifest.json` 核对其 appId/version 与参数一致；
4. 从绝对路径派生并保存相对 `relativeWwwPath`，原子持久化已选定资源记录；
5. 更新内存中的已选定资源记录，使后续排队请求立即看到新状态。

Worker 已负责候选资源的完整 manifest、appId、版本、编译规则和启动文件校验；上述小型 manifest 读取只用于防御 Worker 交接到 Runtime 接管之间的路径替换，`setAppPath` 不应在 UI 主线程再次递归扫描、复制、散列整个资源树。Runtime 在下一次启动或显式重载、真正执行候选资源前，仍须按第 6.2 节独立复核 manifest 和入口文件。

成功后的可观察结果：

```text
getResourcePath("") == resourcePath
getAppWgtVersion() == versionName
```

`setAppPath` 不同步重载或销毁当前 UTS/JS 上下文。当前进程已经执行的 JS、字节码、页面和普通资源继续使用本次会话冻结的 executing snapshot；但上述两个现有 getter 立即反映新 selected pointer，供后续安装请求和下一次启动/显式重载使用。

所有权要求：

- 调用前，Worker 已把候选目录原子交接到正式资源根；
- 调用后，无论 Runtime 接受还是拒绝，插件都不会删除正式目录；
- Runtime 负责正式目录的保留、垃圾回收和异常恢复；
- 拒绝时不得破坏当前仍在使用的旧资源。

## 6. Runtime 资源路由与持久化

### 6.1 已选定指针与执行快照

不需要为了区分安装状态和执行状态增加公开接口。Runtime 内部区分两个状态即可：

- **已选定资源（selected resource）**：Runtime 已接受并持久化的资源指针；现有 `getAppWgtVersion()`、`getResourcePath("")` 和后续排队安装读取该状态；
- **执行资源（executing resource）**：本次应用启动或显式 Runtime 重载时选定并冻结的私有资源快照；JS、字节码、页面、静态资源以及面向应用的版本信息在本次会话内始终读取该状态，不对 `UTSHarmony` 暴露新的 getter。

`setAppPath` 只原子更新 selected pointer，当前 executing snapshot 保持旧值。`installWgt` 成功只承诺 selected pointer 完成提交，不承诺回调前已经重载。这样既保证下一条排队安装读取新基准，也不会因同步重载销毁当前调用栈、回调环境或内存队列。

状态矩阵：

| 时点 | `getAppWgtVersion/getResourcePath("")` | Runtime 私有资源加载及 `getAppBaseInfo().appWgtVersion` |
| --- | --- | --- |
| 安装前 | A | A |
| `setAppPath(B)` 成功、尚未重载 | B | A |
| 重启/显式重载成功 | B | B |
| B 在启动校验中失败 | 原子清除失效记录并回退安全资源 H | H |

其中 H 通常是当前 HAP 内置 WGT；如果 Runtime 另行持久化 last-known-good 记录，也可以是经过完整复核的上一资源。

当前 Harmony 审计版本的 `getResourcePath("")` 只会得到空字符串，尚没有可用的“空参数表示 executing 根”行为；因此为该空参数补充 selected 根语义属于安装能力接入。非空参数保持原有公开语义不变。仍需审计第三方调用方；普通 Runtime 资源加载器、WebView、组件和 `convert2AbsFullPath` 不得把这个空参数 getter 当作会话中的 executing resolver。

建议 Runtime 为每个 appId 维护一条原子持久化记录：

```ts
type SelectedWgtRecord = {
  schemaVersion: number
  appId: string
  versionName: string
  relativeWwwPath: string
  installedAgainstBundleIdentity: string
}
```

非 SyncDebug 的 `relativeWwwPath` 形如 `<resource-id>/www`；固定目录模式为 `www`。持久化记录不保存沙盒绝对路径，启动时基于当前 `getAppRootPath(appId)` 重新构造。`installedAgainstBundleIdentity` 可以使用 HAP version code 或其他稳定构建标识，用于检测原生包已经升级并触发外置资源重新评估。

记录更新应使用“同目录临时文件 + 完整落盘 + 原子替换”或平台等价事务；任何一步失败都保留上一条有效记录并让 `setAppPath` 返回非零。正式目录垃圾回收必须 pin 住 selected resource、所有存活进程的 executing resource、活跃事务目录以及恢复日志引用的候选/备份，不能只保护最新 selected 目录。

状态切换规则：

1. 启动或显式重载时，Runtime 按第 6.2 节验证 selected pointer，并一次性生成 executing resource；
2. executing resource 在该会话内冻结，所有正常资源消费者始终使用同一个执行根；
3. 安装成功后，现有两个 getter 立即观察到新的 selected pointer，以便连续安装或差量合并；
4. 下一次启动/显式重载时完成 selected → executing；失败则原子清除失效记录、回退内置资源，并让两个 getter 一并返回回退后的状态。

因此，`getAppBaseInfo().appWgtVersion` 等面向当前运行会话的字段应报告 executing resource 的版本，在重载前不应因为安装完成而提前变更。Runtime 内部不得让入口加载器或普通资源 URL 在会话中途调用 `getResourcePath("")`，否则会出现“旧代码配新静态资源”的混合状态。

### 6.2 启动选择顺序

应用启动或显式 Runtime 重载时按以下顺序选择执行资源：

1. 读取持久化的外置资源记录；
2. 校验路径位于本应用正式资源根内；
3. 校验目录、manifest、appId、version 和必要入口文件；
4. 校验成功则使用外置资源；
5. 任一步失败则记录诊断日志、废弃该激活记录并回退到 HAP 内置资源。

不能因为外置资源丢失或损坏而让应用无法启动。

安装新的 HAP 后，必须使用新 Runtime 的 `compilerRuleVersion` 重新校验已持久化的外置 WGT；不兼容时回退内置资源。对于“新 HAP 内置 WGT 版本高于历史外置 WGT”的场景，建议忽略旧 pointer 并使用内置资源，但该优先级仍须按第 13 节与 iOS 统一后定稿。若采用版本比较，必须复用 Worker 的任意长度数字分段算法，不能转换为可能丢失精度的普通整数。

### 6.3 所有执行资源入口必须统一切换

当前 Harmony Runtime 的资源解析不能只修改安装 getter。在每次启动/重载完成选择后，以下消费者都必须从同一个、会话内冻结的 executing `www` 根解析：

- `manifest.json`；
- `app-config` 和 `app-service` 入口；
- 页面或共享数据字节码；
- `static`、`uni_modules` 等普通资源；
- WebView 和原生组件使用的应用资源 URL；
- `getAppBaseInfo().appWgtVersion` 等面向当前运行会话的版本信息。

如果 Runtime 的入口模块仍硬编码为 HAP 内 `resources/resfile/.../www/import`，即使文件已经安装成功也无法真正激活 WGT。

### 6.4 Harmony WGT 可执行格式是 P0 前置决策

平台与编译器需要先确定 Harmony WGT 的可执行资源格式：

- Runtime 能否从应用沙盒加载 WGT 中的 `app-config.js`、`app-service.js`；或
- Harmony 编译器是否需要在 WGT 中输出可从沙盒加载的 `www/import/...` 产物；或
- 是否由 Runtime 在安装后把 WGT 资源转换为可加载格式。

`setAppPath` 只有在 Runtime 能实际加载该候选资源时才能返回 `0`。不能只保存路径而继续执行 HAP 内置入口。

同样需要确认 HarmonyOS 和应用市场对下载后执行代码的安全与分发政策。该结论不改变 API 契约，但可能影响产品是否允许发布此能力。

## 7. Worker 和基础能力要求

以下能力不一定需要新增为 `UTSHarmony` 接口，但必须在 Harmony UTS Worker 中可用。

### 7.1 Worker

必须支持：

```ts
const worker = uni.createWorker(workerPath)
worker.onMessage(callback)
worker.onError(callback)
worker.postMessage(message, null)
worker.terminate()
```

约束：

- Worker 中可以调用本节列出的同步文件 API 和 Zstandard API；
- 主线程与 Worker 只传递新建的 `UTSJSONObject`，字段只包含字符串、数字和布尔值；
- `UTSJSONObject` 序列化后仍能被 Worker 识别或按相同字段读取；
- Worker 崩溃、序列化失败或不支持某 API 时，必须触发 `onError`；
- 每个 Worker 最多发送一次安装终态消息。

### 7.2 文件系统

Worker 至少需要以下同步能力：

| 能力 | 使用场景 |
| --- | --- |
| exists / `statSync` | 判断普通文件、目录及资源是否存在 |
| `mkdirSync(path, true)` | 创建 staging、txn 和候选目录 |
| `rmdirSync(path, true)` | 清理本次事务目录 |
| `readdirSync(path)` | 定位 manifest、递归复制差量基准资源 |
| `readFileSync(path, "utf-8")` | 读取 manifest |
| `copyFileSync(source, target)` | 构造差量候选目录 |
| `unlinkSync(path)` | 处理文件与目录类型冲突 |
| `renameSync(source, target)` | 原子交接资源和 SyncDebug 回滚 |
| `lstatSync`、`realpathSync` 或等价能力 | 识别符号链接并验证规范化后的真实路径仍在允许根目录内 |
| `statfs`/可用空间查询或等价能力 | 安装前执行 staging、差量副本和回滚空间预算 |
| `unzipSync({ zipFilePath, targetPath })` | 在 Worker 中同步解压 ZIP |

语义要求：

- 同步 API 失败时可以抛出异常，但 Harmony 适配层必须在 Worker 内捕获并转换为当前阶段对应的既有 `installWgt` 错误码；
- `renameSync` 的目标已存在时必须失败，不得静默覆盖；
- `renameSync` 必须是同卷原子移动，跨卷时失败且不得自动复制；
- 内置 HAP 资源允许只读，但必须支持 `stat`、`readdir`、`readFile` 和复制到可写事务目录；
- 复制普通文件后需要校验目标存在；建议同时比较源、目标长度；
- 路径判断应拒绝符号链接逃逸，尤其是正式资源根和差量复制路径。

`unzipSync` 还必须防止 ZIP Slip：拒绝绝对路径、`..` 越界、符号链接或任何会把条目写到 `targetPath` 之外的 ZIP 条目。Harmony 适配层必须同时处理“返回 `false`”和“抛异常”两种失败形态，并统一映射为 `103607`；解压失败时不能在正式资源目录留下内容。

当前 Harmony `uni-fileSystemManager` 已具备上述大部分方法；仍需逐项验证它们可以从 `ThreadWorker` 调用，并能同时读取 HAP 资源目录和写入应用沙盒。当前 `unzipSync` 实现要求 Harmony API 26 或更高，产品最低系统版本必须据此确认，低版本需要提供兼容实现。

### 7.3 Zstandard

Harmony 端需要确认内建调用 `uni.__zstdDecompressFile` 在 ThreadWorker 中已有可用 provider；如果没有，由该 provider 的维护方补齐 Harmony 实现。实现可以采用 UASM、NAPI 或 ArkTS，只要保持现有内部接口和线程/文件语义：

```ts
type DecompressFileResult = {
  success: boolean
  errCode: number
  errMsg: string
  outputPath: string
}

function __zstdDecompressFile(
  fromPath: string,
  toPath: string,
  maximumOutputSize?: number | null
): DecompressFileResult
```

上面的结果类型只列出安装器需要的结构；当前 Worker 实际读取 `success`、`errMsg` 和 `outputPath`，不读取 `errCode`，最终字段类型仍需以 provider 的正式声明为准。

安装流程实际调用：

```ts
uni.__zstdDecompressFile(inputPath, payloadZipPath, null)
```

契约：

- 输入、输出均为本地绝对路径；
- 使用文件到文件的流式解压，不能把完整 WGT 或完整 ZIP 一次性读入内存；
- `success == true` 时，`outputPath` 指向完整且已关闭的 ZIP 文件；
- 失败时 `success == false` 并提供可诊断的 `errMsg`；
- 必须可以从安装 Worker 调用；
- 输出必须限制在调用方提供的事务目录内；
- 部分输出由本次事务清理，不能写入或覆盖正式资源目录；
- provider 返回失败或抛出异常都必须在 Worker 内捕获并映射为 `103606`。

本仓库没有包含该内建 provider 的 Harmony 源码，因此不能仅凭 `uni-install-wgt/package.json` 中本插件的 `arkts` 标记推断 Zstandard 是否可用；必须以目标 HBuilderX/Runtime 构建中的实际 provider 和 ThreadWorker 联调结果为准。

### 7.4 UUID 和 MD5

Worker 需要：

- 随机 UUID，用于事务目录 nonce；
- 对小段规范化 UTF-8 文本计算 MD5，输出 32 位小写十六进制，用作 `resource-id`。

这两项可以直接使用 Harmony 标准库，不要求 Runtime 新增 bridge。MD5 仅用于生成不重复的目录名，不承担 WGT 完整性或安全校验职责。

### 7.5 解压与磁盘资源上限

为防止解压炸弹和磁盘耗尽，安装链路必须定义并执行统一的跨平台限制，而不是只在 Harmony 端引入不同规则：

- 输入 WGT 压缩文件最大字节数；
- Zstandard 输出 ZIP 的最大字节数，并通过 `maximumOutputSize` 或等价流式计数强制执行；
- ZIP 条目总数、单条目解压后大小、所有条目解压后总大小和最大目录深度；
- 安装前的可用磁盘预检，预算需要覆盖 ZIP、解压目录、差量基准副本、候选目录和可能的回滚副本；
- 处理过程中的增量计数和硬中止，不能只信任 ZIP header 中声明的大小。

当前 Worker 向 `__zstdDecompressFile` 传入 `null`，接入资源上限时需要改为平台统一的明确上限。压缩 WGT/Zstandard 输出超限返回 `103606`，ZIP 条目或解压总量超限返回 `103607`，staging 磁盘预检失败返回 `103602`，差量基准复制或覆盖阶段耗尽预算分别返回 `103623`/`103624`。所有场景都要清理本次部分 txn，且不得触碰正式资源目录。具体阈值由产品、iOS、Android 和 Harmony 共同确定并版本化。

## 8. WGT 包契约

完整包和差量包都必须包含合法的 `manifest.json`，并至少提供：

```json
{
  "id": "__UNI__XXXXXXX",
  "version": {
    "name": "1.2.3",
    "code": "123"
  },
  "uni-app-x": {
    "compilerRuleVersion": 2
  }
}
```

生产包必须只有一个可作为资源根的 `manifest.json`。当前共享 Worker 会取递归遍历遇到的第一个文件，而 `readdirSync` 顺序可能跨平台不同；需要在共享实现中收集候选并在多个候选时以 `103603` 拒绝，不能让 Harmony 独自选择不同顺序。在该加固完成前，打包器和测试资源必须保证唯一性。

字段归一化契约：

- `version.name` 必须是数字点分字符串；
- `version.code` 接受十进制数字字符串或非负整数，统一为十进制数字字符串后参与比较和资源 ID 生成；字符串按其数字字符保留，整数使用标准十进制表示；
- `uni-app-x.compilerRuleVersion` 的目标契约接受非负整数或十进制数字字符串，归一化为整数后与 Runtime 比较；当前共享 Worker 对 number 缺少非负整数检查，需要三端共同补齐；
- `app-wgtu.deleteFiles` 的每项允许恰好一个前导 `/`，去除后按相对路径处理；多个前导 `/`、空段、`.`、`..`、反斜杠、协议和 NUL 均非法。

完整包：

- manifest 所在目录必须直接包含 `app-config.js` 和 `app-service.js`；
- `ignoreVersion == false` 时，目标 `version.name` 必须严格高于当前 WGT 版本；
- appId 和 compilerRuleVersion 始终严格校验。

差量包：

- 通过 manifest 是否实际包含 `app-wgtu` 键识别；
- `app-wgtu.baseVersion` 必填；
- 差量包不改变版本身份，`version.name` 和 `version.code` 必须与当前基准资源一致；
- `baseVersion` 与差量包自身 `version.name` 不一致返回 `103625`；与 Runtime 版本或当前资源 manifest 的 `version.name` 不一致返回 `103622`；差量包版本名或规范化后的版本码与当前资源不一致返回 `103625`；
- 字符串型 `version.code` 保留前导零，因此字符串 `"001"` 与数值 `1` 归一化后并不相等；
- `ignoreVersion` 不跳过差量包的基准版本校验；
- `deleteFiles` 只能包含当前 `www` 下的文件相对路径，禁止目录、空路径、反斜杠、协议、NUL、空路径段、`.`、`..` 和越界路径；
- Worker 在 txn 内复制当前资源、过滤删除项、覆盖差量资源，完成后再检查启动文件。

Harmony WGT 必须由 Harmony 目标构建产出。现有仅含 `app-ios` 配置或 iOS 专用入口产物的测试 WGT 不能作为 Harmony 验收包。

## 9. 目录、提交与回滚

### 9.1 非 SyncDebug

最终目录：

```text
<appRoot>/<resource-id>/www
```

流程：

1. 在 txn 内形成完整的 `<resource-id>/www`；
2. 将整个 `<resource-id>` 原子 rename 到 `<appRoot>/<resource-id>`；
3. 删除本次 txn 中已无所有权的临时内容；
4. 主线程调用 `setAppPath(appId, versionName, finalWwwPath)`；
5. `setAppPath == 0` 后触发成功回调。

第 4 步只提交 selected pointer，不在同步调用中销毁或重建当前 Runtime；应用重启/显式重载由回调完成后的产品流程处理。

一旦第 2 步成功，正式目录归 Runtime 管理；即使第 4 步被 Runtime 拒绝，插件也不能删除它。

### 9.2 SyncDebug

Harmony V1 禁止启用 `isSyncDebug() == true`；只有同时满足会话一致性和崩溃恢复后才能在后续版本开放。以下要求高于当前 iOS 仅提供的进程内回滚能力；如果要把它称为统一跨端契约，iOS/Android 也需要同步升级。

固定正式目录与稳定事务区：

```text
<appRoot>/www
<appRoot>/.install-txn/<transactionId>-<uuid>/
```

候选目录可以先在 cache staging 中形成，但进入正式切换前必须原子交接到上述不可被系统自动清理、与正式根同卷的稳定事务区。旧 `www` 的唯一副本、恢复日志和待激活候选都不能留在 `CACHE_PATH`。

提交顺序：

```text
cache txn/候选资源 -> <appRoot>/.install-txn/<id>/new-www
<appRoot>/www -> <appRoot>/.install-txn/<id>/old-www
<appRoot>/.install-txn/<id>/new-www -> <appRoot>/www
校验新 www
整体重载 Runtime 并验证 executing snapshot
登记新版本；清理 old-www、日志和稳定 txn
```

固定路径被替换后，普通资源消费者不能继续按原路径懒加载。未来实现必须在切换前暂停旧资源消费者，并在成功回调前完成一次整体 Runtime 重载，使新目录成为唯一 executing snapshot；重载失败时恢复 `old-www` 并恢复旧 Runtime。现有 Worker-only SyncDebug 流程没有该协调点，Harmony 若启用此模式必须扩展主线程/Runtime 协议，不能直接照搬。

切换失败时：

1. 如果新目录已经到达正式位置，先把它移回 txn；
2. 把 `txn/old-www` 恢复为 `<appRoot>/www`；
3. 验证旧目录恢复成功；
4. 回滚成功后清理 txn 并返回 `103604`；
5. 回滚失败时保留整个 txn，因为 `old-www` 可能是旧资源的唯一副本。

在第一次 rename 前，Runtime/Worker 必须在上述稳定事务区写入持久化切换日志，而不是只在内存中记录状态。日志至少包含 transactionId、`hadOldWww`、旧目录/新目录/备份目录、旧/新 manifest 的 appId 与 version identity、切换前 selected generation、目标 generation 以及阶段，并通过“临时文件 + 原子 rename”推进：

```text
prepared -> old-backed-up -> new-activated -> verified -> cleared
```

应用启动时必须先恢复未完成事务，再选择 executing resource。日志阶段只能作为提示，因为进程可能在目录 rename 成功、阶段记录尚未推进的窗口崩溃；恢复器必须同时检查正式 `www`、`new-www`、`old-www` 的真实存在状态和 manifest 身份，并对每种组合做幂等 reconciliation：

- 正式旧目录仍完整且候选未激活：保留正式旧目录，清理未提交候选；
- `old-www` 存在而正式目录缺失：优先恢复 `old-www`；
- 正式目录是完整的新版本且 `old-www` 存在：可完成新版本重载，失败则移走新目录并恢复旧目录；
- 无法唯一判定、任一候选不完整或恢复失败：保留日志和所有候选/备份目录，记录可诊断错误，不得把可能唯一的旧资源当作垃圾清理。

只有新目录验证、Runtime 重载成功且 `old-www` 已不再承担恢复职责时，才可删除它并清除日志。日志写入与目录 rename 的落盘顺序需要由 Harmony 文件系统团队确认；只实现 `try/catch` 回滚不满足该契约。测试必须覆盖每次 rename 与每次日志更新之间的崩溃窗口。

Harmony 不需要照搬 Android 对 DEX 和 `config.json` 的特殊保留逻辑。只有当平台确认某些 Harmony 原生产物确实存放在 `www` 且不能由新 WGT 提供时，才应另行定义保留规则；HAR、HSP 等原生包默认不属于 WGT 可更新范围。

## 10. 错误映射

Harmony 必须复用现有跨端错误码，不增加只在单端出现的公开错误语义：

| 错误码 | 含义 |
| --- | --- |
| `1030601` | `filePath` 为空、无法解析、对应文件不存在，或不是受支持的普通文件/可物化输入来源 |
| `103602` | staging 或事务目录操作失败 |
| `103604` | 正式资源放置、切换或回滚失败 |
| `103605` | Runtime `setAppPath` 拒绝资源 |
| `103606` | Zstandard 解压失败 |
| `103607` | ZIP 解压失败 |
| `103608` | manifest 缺失或无法读取 |
| `103609` | 必需启动资源缺失 |
| `103610` | manifest 字段不合法 |
| `103611` | 完整包版本不高于当前 Runtime WGT 版本 |
| `103612` | Worker、消息协议或其他内部错误 |
| `103613` | manifest JSON 解析失败 |
| `103614` | WGT appId 与 Runtime appId 不一致 |
| `103618` | `uni-app-x` 存在时，`compilerRuleVersion` 缺失或格式非法 |
| `103619` | WGT 与 Runtime 的 `compilerRuleVersion` 不一致 |
| `103620` | 差量包缺少 `baseVersion` |
| `103621` | `app-wgtu` 或 `deleteFiles` 字段不合法 |
| `103622` | 差量基准版本与当前 WGT 版本不一致 |
| `103623` | 当前激活资源读取或复制失败 |
| `103624` | 差量资源删除、覆盖或合并失败 |
| `103625` | 差量包版本身份与当前基准资源不一致 |

兼容保留但当前 Worker 不主动产生：

- `103600`：成功码；当前成功回调对象没有 `errCode`；
- `103603`：WGT 资源目录结构不合法；
- `103615`：`minRuntimeVersion` 高于 Runtime；
- `103617`：缺少 `minRuntimeVersion`。

当前 Worker 已移除 `minRuntimeVersion` 校验，Harmony 首版不能单独恢复该校验，否则会形成三端行为差异。

底层原因只对 `103602`、`103612`、`103623`、`103624` 通过 `SourceError` 暴露在 `cause` 中。

Harmony 适配层必须把异常放回其所属阶段：输入路径预检失败为 `1030601`，Zstandard provider 返回失败或抛错为 `103606`，`unzipSync` 返回 `false` 或抛错为 `103607`，其他文件异常再按 staging、正式交接、读取当前资源或差量合并阶段映射。不能把所有 ArkTS 异常统一降级为 `103612`。

## 11. 当前 Harmony 缺口清单

### 11.1 Runtime 团队

- [ ] 新增 `getAppWgtVersion`；
- [ ] 将 Vapor SDK 已有的 `getUniCompilerRuleVersion` 实现统一到公共类型和 Runtime 导出；
- [ ] 新增 `isSyncDebug`；
- [ ] 新增 `getAppRootPath`；
- [ ] 新增 `setAppPath`；
- [ ] 修改 `getResourcePath("")`，返回 selected `www` 根，并与 `getAppWgtVersion` 来自同一 generation；
- [ ] 建立原子持久化的已选定资源记录和内置资源回退；
- [ ] `setAppPath` 只提交、不销毁当前协调器；成功后两个现有 getter 立即反映新 selected 状态；
- [ ] 区分 selected pointer 与 Runtime 私有 executing snapshot，安装后不在当前会话混用新旧资源；
- [ ] 审计 `getResourcePath("")` 的所有调用方；普通 Runtime 加载器、WebView、组件和 `convert2AbsFullPath` 均不把它用作 executing resolver；
- [ ] 保持 `getResourcePath(nonEmptyPath)` 的既有公开兼容行为；
- [ ] 让 manifest、入口模块、字节码和静态资源统一使用本次会话的 executing 根；
- [ ] 若 HAP 内置 `www` 不可枚举，提供物化目录或等价的一致性复制能力；
- [ ] 明确 Harmony WGT 的可加载入口格式；
- [ ] 保证 staging 与正式资源根同卷，或提供专用 staging 根；
- [ ] V1 明确限制单进程/单 Runtime 实例；未来多实例支持需增加原子快照和覆盖“读取快照 → Worker 全事务 → `setAppPath`/失败收尾”的跨进程锁；
- [ ] 若支持 SyncDebug，提供持久化切换日志和启动恢复；
- [ ] 定义正式资源目录垃圾回收策略，并 pin 住 selected、所有存活 executing、活跃 txn 和恢复日志引用的全部目录。

### 11.2 扩展 API / UTS 团队

- [ ] 为 `uni-install-wgt` 将 `arkts` 支持从 `false` 改为可用；
- [ ] 更新 `package.json` 的 Harmony 平台支持元数据；
- [ ] 在 `utssdk/index.uts` 增加 `APP-HARMONY` 路径转换、输入/Runtime 快照预检和 `setAppPath` 分支；
- [ ] 采用专用 staging 根时修改 `resolveStagingRoot()`；Harmony Worker 快照读取现有 `getAppWgtVersion/getResourcePath("")`；
- [ ] HAP `/static` 不能映射为普通文件时，接入 Worker 内的输入流式复制能力；
- [ ] 在 Worker 中增加 Harmony 文件判断、建删目录、复制、移动、UUID 和 MD5 实现；
- [ ] 提供 `lstat`/`realpath` 等价能力并拒绝符号链接逃逸；
- [ ] 验证 `UTSJSONObject` 在 Harmony Worker 消息中的读取方式；
- [ ] 验证全部同步文件 API 可在 Worker 使用；
- [ ] 若未采用启动期物化，接入仅在差量识别后执行的 Worker 资源复制能力及消息状态机；
- [ ] 确认 `uni.__zstdDecompressFile` 的 Harmony provider 可在 Worker 使用；缺失时由 provider 团队补齐；
- [ ] 捕获 Zstandard 和 `unzipSync` 的抛错形态并映射为 `103606`、`103607`；
- [ ] 与 iOS、Android 共同落地 WGT、ZIP、条目、目录深度及磁盘预算上限；
- [ ] 用 `try/finally` 或等价机制隔离用户回调异常，确保 `complete` 和队列推进的目标契约；
- [ ] 对 `compilerRuleVersion` 的 JSON number 在共享 Worker 中补非负整数校验；
- [ ] 使用 Harmony 构建产物补齐完整包、差量包和失败注入测试资源。

### 11.3 升级中心团队

平台和插件能力验收后再处理：

- [ ] 移除 `uni-upgrade-center-app` 对 Vapor Harmony 的 `!APP-HARMONY` 排除；
- [ ] 验证 Harmony `getFileInfo(..., digestAlgorithm: "sha256")`；
- [ ] 提供可用的应用重启或重新加载策略；
- [ ] 安装成功后清理下载缓存，但不清理 Runtime 正式资源目录。

## 12. 验收测试

### 12.1 Runtime API

- [ ] 内置资源启动时，`getAppId`、`getAppWgtVersion`、`getResourcePath("")` 相互一致；
- [ ] V1 所有环境的 `isSyncDebug()` 均返回 `false`；
- [ ] `getAppWgtVersion/getResourcePath("")` 始终来自同一 selected generation；启动期物化模型下路径可递归读取，按需模型下允许为空且 Worker 复制能力可用；
- [ ] `getAppRootPath` 返回可写 appId 根且不包含 `www`；
- [ ] `setAppPath` 成功后，两个现有 getter 立即反映新 selected pointer；
- [ ] 尚未重启/重载时，Runtime 私有资源入口和 `getAppBaseInfo().appWgtVersion` 仍一致地指向旧 executing snapshot；
- [ ] 当前 UTS 调用栈、`success/complete` 回调和安装队列不会被 `setAppPath` 销毁；
- [ ] 重启后仍加载新资源；
- [ ] 删除或损坏外置资源后，下次启动安全回退内置资源；
- [ ] 先安装外置 WGT 再升级 HAP；旧资源不兼容或新内置 WGT 版本更高时使用内置资源；
- [ ] `setAppPath` 拒绝越界路径、符号链接路径、appId 不匹配和非法 version 格式；
- [ ] 启动加载器拒绝资源 manifest 与 selected record 的 appId/version 不一致，并原子回退两个 getter。

### 12.2 安装流程

- [ ] 合法完整 WGT 安装成功，UI 主线程无明显阻塞；
- [ ] 下载缓存、项目 `/static`、沙盒绝对路径均可安装；
- [ ] 空路径、无法解析路径、不存在路径和目录路径均返回 `1030601`；
- [ ] 平台声明可物化的 asset/URI 能进入 Worker 并流式复制，未知 scheme 或物化失败返回 `1030601`；
- [ ] 损坏 Zstandard 和损坏 ZIP 分别返回 `103606`、`103607`；
- [ ] Zstandard provider 与 `unzipSync` 主动抛异常时仍分别返回 `103606`、`103607`；
- [ ] ZIP 中的绝对路径、`..` 越界和符号链接条目不能写出目标目录；
- [ ] WGT 输入、Zstandard 输出、ZIP 总大小、单文件、条目数、目录深度和磁盘不足均能在上限处中止并清理 txn；
- [ ] 支持资源位于 ZIP 根、`www/`、`appid/`、`appid/www/`；
- [ ] manifest 缺失、JSON 非法、启动文件缺失分别返回对应错误；
- [ ] ZIP 中存在多个资源根 manifest 时，经三端共享加固后稳定返回 `103603`；
- [ ] appId 和 compilerRuleVersion 不匹配时拒绝安装；
- [ ] compilerRuleVersion 为负数、小数或非法数字字符串时，经共享加固后返回 `103618`；
- [ ] 完整包高版本、同版本、低版本及 `ignoreVersion` 组合行为与 iOS 一致；
- [ ] 两次并发调用严格串行，第二次能读到第一次的新版本；
- [ ] 完整包 B 成功后不重启，下一完整包按 B 的 selected 版本执行高低比较；
- [ ] 完整包 B 成功后不重启，紧接的差量包从 B 的 selected 路径复制和合并；
- [ ] 上述连续安装期间页面代码、静态资源和 `getAppBaseInfo().appWgtVersion` 始终保持旧 executing 快照，重启/重载后再一次性切换；
- [ ] 若支持多 Ability/进程并发，跨实例锁保证只有一个正式交接；
- [ ] Runtime 拒绝新路径时返回 `103605`，且旧激活资源保持可用；
- [ ] `success`、`fail` 或 `complete` 回调主动抛异常时，不会永久阻塞队列，目标 `complete` 语义按统一实现验证。

### 12.3 差量与回滚

- [ ] 差量新增、修改、删除及组合场景；
- [ ] 文件与目录互换、重复删除、不存在文件删除；
- [ ] `deleteFiles` 中的 `..`、协议、反斜杠、空路径和目录目标被拒绝；
- [ ] 当前资源位于 HAP 只读目录时可完整复制并合并；启动期物化失败不影响完整包，差量包按需复制失败返回 `103623`；
- [ ] `baseVersion`、`version.name`、`version.code` 任一不一致时拒绝；
- [ ] 在旧目录备份、新目录激活、正式目录验证阶段分别注入失败；
- [ ] 若未来支持 SyncDebug，在每次目录 rename 前后、每次日志更新前后强制杀进程，恢复器依据日志和真实目录状态幂等恢复到唯一完整版本；
- [ ] SyncDebug 的日志、候选和 `old-www` 均位于不可被系统自动清理的稳定事务区；
- [ ] 回滚成功时旧资源完整恢复；
- [ ] 回滚失败时保留含 `old-www` 的 txn 现场；
- [ ] 大包处理不构造完整文件 `ArrayBuffer`，内存峰值符合平台要求。

## 13. 上线前必须确认的决策

1. Harmony WGT 的入口产物格式，以及 Runtime 从沙盒加载该产物的实现方式；
2. 下载后执行代码在目标 HarmonyOS 版本和应用市场中的合规性；
3. Harmony V1 固定 `isSyncDebug == false`；后续是否开放固定目录模式及其产品场景；
4. `CACHE_PATH` 与正式资源根是否保证同卷；
5. 最低 Harmony API level；当前同步 ZIP 解压实现要求 API 26；
6. 安装成功后的应用重启或 Runtime 重载方式；
7. HAP 内置资源采用启动期物化，还是扩展 Worker 按需复制协议；
8. 正式资源目录的保留数量、垃圾回收时机和异常 txn 的人工诊断策略；
9. HAP 升级后，较新的内置 WGT 与历史外置 WGT 的启动优先级，并与 iOS 行为对齐；
10. WGT、Zstandard 输出、ZIP、单文件、条目数、目录深度和磁盘预算的跨端统一阈值；
11. 是否允许多 Ability/进程调用安装；V1 默认单实例，未来放开时需定义跨实例锁和原子快照接口。

## 14. 代码依据

### 14.1 本仓库

- 主线程串行队列、Runtime 快照及 `setAppPath`：[`utssdk/index.uts`](./utssdk/index.uts)
- Worker 解压、校验、差量合并、交接与回滚：[`workers/install-wgt-worker.uts`](./workers/install-wgt-worker.uts)
- 公开参数和错误类型：[`utssdk/interface.uts`](./utssdk/interface.uts)
- 错误文案：[`utssdk/unierror.uts`](./utssdk/unierror.uts)
- 现有跨端 Worker 设计：[`worker-installation-design.md`](./worker-installation-design.md)
- Harmony 当前尚未启用 `installWgt`：[`package.json`](./package.json)

### 14.2 Harmony 现状审计基线

以下结论来自 2026-11-02 本机安装包审计，仅用于定位当前缺口，不是长期 API 保证：

- HBuilderX-Dev：`5.35.2026103004-dev`；Harmony launcher：`5.35.2026102914.4354`；
- Vapor 路径转换与 appId：`project-dom2.zip!/libs/sdk.har!/package/src/main/ets/runtime/UTSHarmony/convert2AbsFullPath.ets:5`、`.../UTSHarmony/getAppId.ets:7`；导出分别位于 `.../UTSHarmony/index.ets:21`、`:1`；
- DOM 对应实现：`project-x.zip!/libs/runtime.har!/package/src/main/ets/runtime/UTSHarmony/convert2AbsFullPath.ets:5`、`.../UTSHarmony/getAppId.ets:7`；导出分别位于 `.../UTSHarmony/index.ets:20`、`:1`；
- Vapor SDK（构建标识 `20261029-143622-dev-2883fac0-nc`）的 compiler rule 导出：`project-dom2.zip!/libs/sdk.har!/package/src/main/ets/runtime/UTSHarmony/index.ets:5`；实现：`.../UTSHarmony/getUniCompilerRuleVersion.ets:1-5`；公共 `hbuilderx-language-services/builtin-dts/uts-types/app-harmony/UTSHarmony.d.ts` 尚未声明；
- DOM Runtime 的通用路径转换：`project-x.zip!/libs/runtime.har!/package/src/main/ets/runtime/UTSHarmony/getResourcePath.ets:1-10`；
- HAP `www` 固定映射：`project-x.zip!/libs/runtime.har!/package/src/main/ets/runtime/helper/io.ets:118-138`；
- `www/import` 入口硬编码：`project-x.zip!/libs/runtime.har!/package/src/main/ets/runtime/UniNativeApp.ets:189-194`；
- 同步 ZIP 的 API 26 判断：`project-dom2.zip!/libs/sdk.har!/package/src/main/ets/modules/uni_modules/uni-fileSystemManager/utssdk/app-harmony/index.ets:2649-2652`；DOM 对应实现位于 `project-x.zip!/libs/runtime.har!/package/src/main/ets/modules/uni_modules/uni-fileSystemManager/utssdk/app-harmony/index.ets:2649-2652`。

归档位于 HBuilderX 的 `plugins/launcher-harmony/base/` 目录；升级 HBuilderX 后需要重新审计这些实现和行号。
