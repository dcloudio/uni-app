# WGT Worker 安装改造方案

## 1. 目标

`uni.installWgt` 的 Zstandard 二进制读取、解压为 ZIP、ZIP 解压前处理和解压后处理运行在 Worker 子线程中。主线程只负责生成 Runtime 快照、Worker 生命周期、Runtime 激活和 API 回调。解压后的 `manifest.json` 包含 `app-wgtu` 字段时，Worker 还负责从当前激活资源构造完整候选目录；不包含该字段时沿用完整包安装流程。

ZIP 使用 `uni-fileSystemManager.unzipSync` 在 Worker 中同步解压，返回成功后才继续安装流程。

## 2. 目录与职责

```text
uni_modules/uni-install-wgt/
  utssdk/index.uts                 # 主线程编排层
  workers/install-wgt-worker.uts   # 子线程安装状态机
```

主线程使用插件 Worker 固定路径创建实例：

```uts
uni.createWorker('uni_modules/uni-install-wgt/workers/install-wgt-worker.uts')
```

插件 Worker 位于固定的 `uni_modules/<plugin-id>/workers/` 目录，不需要在项目 `manifest.json` 中配置 `workers`。

`utssdk/index.uts` 通过固定 Worker 路径引用入口文件，使 `workers/install-wgt-worker.uts` 进入 UTS 模块依赖图。该文件变动会使增量构建重新生成 Worker，避免主线程与 Worker 使用不同版本的消息协议。

由于 iOS UTS 的同步文件系统 API 和 `JSON.parseObject` 在失败时通过返回值表达结果、不抛出异常，Worker 不使用 `try/catch` 判断流程结果。创建目录后检查目录是否可读；交接后检查目标资源目录存在且源目录不存在；交接前清理目录时检查清理后目录已不存在；manifest 解析直接检查返回值是否为 `null`。只有这些状态条件成立，Worker 才继续推进安装状态机。资源完成原子交接后，事务目录清理不改变 Runtime 已拥有资源这一事实，也不改变安装结果。

`manifest.id` 只允许 ASCII 字母、数字、`.`, `_`, `-` 组成的单一路径段，拒绝 `.` 与 `..`。`version.name` 使用数字点分格式；完整包安装时才与 Runtime 的 `appVersion` 比较，每个版本段去除前导零后，按数字字符串长度和字典序比较，不依赖可能精度丢失的数值转换。`version.code` 必须为纯数字元数据，不参与完整包的升降级比较。差量包不升级资源版本，其 `version.name` 和 `version.code` 必须与当前激活基准资源完全一致。正式资源目录名是规范化元数据的 32 位小写 MD5：`wgt-v1`、每个字段的 ASCII 字节长度和值、毫秒时间戳和跨端 UUID nonce 共同构成输入；nonce 不包含也不替代 SHA-256。若同名正式目录已存在，Worker 生成新的 timestamp/nonce/MD5，绝不覆盖或删除 Runtime 的既有资源。当前公开的跨端文件系统 API 未暴露 `st_dev`，因此插件只能保持“跨卷 rename 必然失败且绝不回退复制”的安全性质；契约要求的交接前同卷判定仍需由文件系统或 Runtime 提供设备号能力后补齐。

## 3. 线程模型

```text
主线程 installWgt
  -> 主线程: 获取本次安装的 Runtime 配置快照
  -> Worker: start(request + Runtime snapshot)
  -> Worker: 创建独占 txn，按需将非本地 Android 输入流式复制为 txn/input.wgt
  -> Worker: 调用 decompressFile 生成 txn/payload.zip
  -> Worker: 调用 unzipSync
  -> Worker: 校验 manifest；完整包比较版本高低，差量包核对基准版本元数据
  -> Worker: 完整包直接形成候选；差量包复制当前 www、过滤删除项并覆盖差量文件
  -> Worker: 校验完整候选资源、原子 rename
  -> 主线程: 真机 API 回调；非真机 Runtime setAppPath、API 回调；terminate
```

解压不经过主线程中继：

```text
Worker 读取并解压 zstd
  -> Worker 在当前线程调用 unzipSync
  -> 返回 true：校验资源，按完整包或差量包规则校验版本并交接资源
  -> 返回 false：清理 txn 并发送 terminal 失败
```

主线程不读取、校验、移动或删除 WGT 文件；它只在启动每条安装请求前生成 Runtime 配置快照，并在终态时调用 Runtime 和 API 回调。

## 4. 主线程职责

主线程保留现有串行队列，保证同一时刻只有一个安装事务，并完成以下工作：

1. 获取本次任务的 Runtime 信息，并创建不可变配置快照。
2. 创建 Worker，注册 `onMessage` 和 `onError`，发送 `start` 消息；消息包含：
   - `transactionId`
   - 已转换为运行期路径的输入文件路径（文件后缀不参与判断）
   - `stagingRoot`
   - `ignoreVersion`
   - `isSyncDebug`
   - Runtime appId、appVersion、compilerRuleVersion、正式资源根目录和当前激活资源根目录
3. 收到 Worker 安装成功消息后，真机直接触发 API 成功回调；非真机调用 `setAppPath`，仅在 Runtime 接受资源后触发成功回调。
4. 处理 Runtime 返回结果，触发 `success`、`fail`、`complete`，终止 Worker，并启动下一条排队请求。

Runtime 配置在每条排队请求真正开始时读取，因此后一条请求能看到前一条 `setAppPath` 完成后的最新 appVersion。当前激活资源根目录在 iOS 通过 `UTSiOS.getResourcePath("")`、Android 通过 `UTSAndroid.getResourcePath("")` 获取；参数必须是空字符串，返回值已经是当前使用的 `www` 路径，不允许再取父目录。非真机的 `setAppPath` 保留在主线程，因为 Runtime 可能在该调用中触发资源切换或重载；真机资源交接完成后不调用该接口。

## 5. Worker 状态机

Worker 使用实例字段保存单次任务状态。该状态只在 Worker 中访问；主线程和 Worker 之间只传递新建的、由字符串、数字和布尔值组成的消息对象。

| 阶段 | 执行线程 | 行为 |
| --- | --- | --- |
| `start` | Worker | 接收 Runtime 快照，使用事务序号和 UUID 创建不与其他事务共享的 `txn/unzip`；真实磁盘输入直接使用，Android asset、`content://` 等非本地输入按需流式复制为 `txn/input.wgt`；调用 `decompressFile` 生成 `txn/payload.zip`，再将 ZIP 解压到 `txn/unzip` |
| `unzip-success` | Worker | `unzipSync` 返回 true 后定位资源根、读取 manifest，并按 `app-wgtu` 字段是否存在选择完整包或差量包流程 |
| `delta-merge` | Worker | 校验差量元数据和基准版本，在 txn 内复制当前资源、过滤删除项、覆盖差量文件并校验合并结果 |
| `unzip-failure` | Worker | `unzipSync` 返回 false 后删除本次 txn，返回终态失败 |
| `terminal-success` | 主线程 | 真机直接成功回调；非真机调用 Runtime、成功回调；终止 Worker |
| `terminal-failure` | 主线程 | 失败回调、终止 Worker |

Worker 只发送一次终态消息。

## 6. WGT 资源契约

Worker 延续既有的生产 WGT 格式：

1. Zstandard 解压得到的 ZIP 必须能够定位 `manifest.json` 所在的资源目录，不要求固定的顶层目录名称或层级。
2. 完整包的 `manifest.json` 所在目录必须包含 `app-config.js` 和 `app-service.js`；差量包在合并前只要求存在 `manifest.json`，合并形成的完整候选目录必须包含这两个启动文件。manifest.id 必须与 Runtime appId 一致。
3. Worker 从 manifest 读取 `id`、`version.name`、`version.code` 和 `uni-app-x.compilerRuleVersion`；`compilerRuleVersion` 接受数值类型或仅含十进制数字的字符串类型，字符串会先转换为数值，缺少或格式不合法时拒绝安装。WGT 的 `compilerRuleVersion` 必须等于 iOS `UTSiOS.getUniCompilerRuleVersion()` / Android `UTSAndroid.getUniCompilerRuleVersion()` 的返回值。只有完整包要求 `version.name` 严格高于 Runtime `appVersion`，低于或等于 Runtime 版本的完整包必须拒绝；`ignoreVersion` 只跳过完整包的这项版本高低比较，不影响 compilerRuleVersion 校验，也不影响差量包的版本一致性校验。非真机使用 `<root>/<resource-id>/www`，真机使用 `<root>/www`。
4. 非真机校验通过后，Worker 在 staging 内将资源根移动为 `<resource-id>/www`，再将完整候选目录原子 `rename` 到：

   ```text
   <appRoot>/<resource-id>/www
   ```

   iOS 真机校验通过后，Worker 先将已有 `<appRoot>/www` 原子移动到 txn 的 `old-www`，再将 staging 资源交接到 `<appRoot>/www`；激活或验证失败时恢复旧目录，回滚失败则保留 txn 现场。Android 真机使用 DEX 与 `config.json` 保留事务，其中完整包需要从旧目录补全插件文件，差量包则直接使用已经完成基准复制、删除过滤和差量覆盖的完整候选：

   1. 完整包分别对旧目录和 staging 目录的 `www/uni_modules` 各递归一次，记录所有普通 `.dex` 和文件名为 `config.json` 的文件精确相对路径；差量包在正常准备阶段只递归 staging 候选一次，不扫描旧目录。两类文件均可以位于插件 `app-android` 的任意深度。
   2. 完整包在旧 `www` 保持正式可用的状态下逐个处理旧文件。若 staging `www` 中完全相同的相对路径已经是普通文件，则保留新 WGT 文件并跳过旧文件；若目标路径不存在，则使用 Android/Java `File.mkdirs` 和 `File.copyTo` 创建原目录层级并复制旧文件，保留源文件的只读属性；目标路径存在但不是普通文件时安装失败。这些操作不经过 `uni-fileSystemManager` 对 `APP_RESOURCE_PATH` 的只读路径校验。差量包跳过该补入步骤，`deleteFiles` 的删除结果和差量包的覆盖结果均以 `merged-www` 为准。
   3. 将扫描 staging 时已有的 DEX 设为只读，并在完整包补入旧文件后校验新 WGT 文件与应复制的旧 DEX、旧 `config.json` 均存在；差量包直接校验完整候选中扫描得到的 DEX 与 `config.json`。准备阶段失败只删除本次 txn，旧 `www` 不发生变化。
   4. staging 准备完成后，使用 Android/Java `File.renameTo` 将完整旧 `www` 原子移动到 txn 的 `old-www`，再将准备完成的 staging `www` 原子移动到正式路径。
   5. 在正式路径再次校验完整的 DEX 与 `config.json` 集合后提交，并清理 `old-www` 和 txn。

   目录切换开始后的任一步骤失败时，Worker 根据 `www`、staging 和 `old-www` 的实际目录状态回滚，而不只依赖内存中的阶段标记；新目录会整体移回 staging，再将 `old-www` 恢复到正式位置。完整包使用准备阶段收集的旧插件路径进行恢复验证；差量包仅在回滚发生时从 `old-www`（备份尚未形成时从正式旧 `www`）枚举原有 DEX 与 `config.json`，恢复后同样逐项验证。旧插件枚举失败不得阻止目录恢复，但恢复结果视为未完成验证并保留 txn。只有目录与原有插件文件均恢复成功才清理 txn；回滚失败时保留 txn 现场，避免继续删除唯一副本。该目录备份与回滚用于 iOS、Android 的 `isSyncDebug == true` 分支，Android 另执行上述插件资源保留步骤。

   真机资源交接完成后直接成功回调，不调用 `setAppPath`。非真机仍只通过普通 `rename` 交接唯一资源目录，不覆盖既有目录，并将最终 `www` 路径传给 `setAppPath`。

   其中 `resource-id` 是以下 UTF-8 规范化字符串的 32 位小写 MD5。`appid`、`version.name` 和 `version.code` 已经限定为 ASCII，因此字符长度等于 UTF-8 字节长度。

   ```text
   wgt-v1\n
   <appid-byte-length>:<appid>\n
   <version.name-byte-length>:<version.name>\n
   <version.code-byte-length>:<version.code>\n
   <timestamp-ms>\n
   <uuid-nonce>
   ```

   MD5 仅是正式目录标识，不承担完整性校验职责。每次安装都会生成新的 UUID nonce；若计算结果对应的目录已经存在，必须重新生成，不得覆盖或删除既有正式目录。

5. 一般流程中，`rename` 前资源归插件所有，失败时由 Worker 删除本次 staging txn；真机正式目录切换按上述规则备份和回滚。
6. `rename` 成功后资源归 Runtime 所有；插件和主线程均不得删除正式目录。

### 6.1 差量 WGT 契约

1. 仅按 `manifest.json` 是否实际包含 `app-wgtu` 键识别差量包。字段存在但值或子字段不合法时返回差量包错误，不回退为完整包安装。
2. 差量包仍完整校验 manifest 的 `id`、`version.name`、`version.code` 和 `uni-app-x.compilerRuleVersion`，并执行 appId 与 compilerRuleVersion 校验，但不执行目标版本高低比较。差量更新不升级版本元数据：差量包的 `version.name` 和 `version.code` 必须分别与当前激活基准资源 `manifest.json` 中的值完全一致，否则返回 `103625`。`app-wgtu.baseVersion` 必须存在、必须是合法版本字符串，并必须同时与差量包的 `version.name`、Runtime appVersion 及当前激活资源 `manifest.json` 的 `version.name` 完全一致。`ignoreVersion` 不绕过上述任何差量版本一致性或基准版本校验。
3. `app-wgtu.deleteFiles` 可省略，省略等同于空数组；提供时必须是纯字符串数组。路径相对当前激活资源的 `www` 根目录且只能表示文件，允许带一个前导 `/`；规范化后拒绝目录、空路径、根路径、空路径段、反斜杠、协议、NUL、`.`、`..` 和任何可能越出资源根的路径。重复路径去重，不存在的待删除文件按幂等删除处理。
4. Worker 只在本次 `txn` 内构造 `merged-www`：先递归复制当前激活资源并过滤 `deleteFiles`，再递归覆盖差量包内容。iOS 需要兼容应用包和 Documents 中的当前资源；Android 需要同时兼容普通文件系统路径和 `file:///android_asset/...` 下的 APK asset，读取只读资源时不得尝试修改源目录。Android 普通源文件复制后必须比较源文件与目标文件长度，asset 流复制必须统计实际写入字节数并与目标文件长度比较。
5. 覆盖阶段由差量包内容获胜：新增文件直接加入，改动文件覆盖同名旧文件，文件与目录类型冲突时先移除候选目录中的目标再写入；某路径同时出现在 `deleteFiles` 和差量包时，最终保留差量包中的新内容。当前激活资源在整个准备阶段保持不变。
6. 合并完成后再次检查完整候选目录中的 `manifest.json`、`app-config.js` 和 `app-service.js`，再进入正式目录交接流程。Android 真机直接使用 `merged-www` 中已经继承、删除或覆盖完成的 DEX 与 `config.json`，不再扫描旧 `www` 或重新补入历史插件文件，因此 `deleteFiles` 明确删除的插件文件不会被复活。

## 7. 错误和资源释放

- 一般流程中，Worker 内发生的所有正式目录交接前失败都必须删除本次 `txn`，再发送终态失败消息。Android 真机插件文件准备阶段失败时直接清理 txn，旧 `www` 保持不变；iOS、Android 的目录切换阶段失败时完整回滚旧 `www`（Android 同时验证 DEX 与 `config.json`），回滚成功后清理 txn，回滚失败则保留 txn 现场并返回 `103604`。
- `unzip` 失败在 Worker 内直接清理并返回终态失败。
- `onError` 或内部消息异常表示插件内部错误。主线程终止 Worker，并以 `103612` 返回失败；具体原因通过 `SourceError` 保存在失败结果的 `cause` 字段中。`103602` 使用 `errMsg` 标识失败的 staging 操作，并同样通过 `cause` 保存底层文件系统错误。差量更新使用 `103620` 表示缺少 `baseVersion`、`103621` 表示 `app-wgtu` 字段或删除路径不合法、`103622` 表示基准版本不匹配、`103623` 表示当前资源拷贝失败、`103624` 表示差量资源合并失败、`103625` 表示差量包的 `version.name` 或 `version.code` 与当前激活基准资源不一致；其中 `103623`、`103624` 的底层文件系统原因也通过 `SourceError` 保存在 `cause`。回滚失败而保留的 txn 与后续安装使用不同的 UUID 目录，后续 Worker 不会清理其中可能是唯一副本的 `old-www`。
- 主线程收到 Worker 终态消息后先终止当前 Worker，再处理下一条排队请求。
- 不传递回调函数、Runtime bridge、`Error` 对象或文件系统结果对象，避免 iOS 和 Android 引用类型跨线程共享导致竞态。

## 8. 验证范围

1. iOS 真实 Zstandard 二进制安装：确认读取、解压、ZIP 解压、目录校验、manifest 读取和 `rename` 不阻塞 UI 线程。
2. Android 真实 Zstandard 二进制安装：确认读取、解压和 `unzipSync` 均在 Worker 中执行，并在同步解压完成后继续安装流程。
3. Android 输入来源：云包 `/android_asset/` 和 `content://` 输入仅复制一次后安装；下载临时文件、缓存文件、沙盒文件、沙盒外真实文件和真机运行释放资源均直接解压且不复制。
4. 非法完整包：多顶层目录、目录名与 manifest `id` 不一致、缺失启动文件，以及在 `ignoreVersion` 为 `false` 时目标版本低于或等于 Runtime 版本；确认完整包既有版本行为不变。
5. 连续两次安装：确认串行队列、Worker 终止和 staging 清理。
6. 解压失败：确认主线程只中继，实际清理由 Worker 完成。
7. Runtime 拒绝已交接资源：确认正式目录保留，插件不越权清理。
8. Android 真机插件文件处理：完整包使用多插件、多层目录和 multidex 样本，确认 WGT 缺少 DEX 或 `config.json` 时旧文件从正式旧 `www` 按相对路径复制到 staging 且只读属性得到保留；新旧文件相对路径相同时使用新文件，相对路径不同时保留旧文件，包括同一目录中的旧 `classes2.dex`、子目录中的旧 DEX 和插件的旧 `config.json`。差量包确认基准 DEX 与 `config.json` 已随 `merged-www` 继承，`deleteFiles` 删除项不会重新补入，正常候选准备只递归扫描一次；在 `backup-old-www`、`activate-new-www` 和正式目录验证失败时，仅在回滚路径枚举旧插件文件，并在恢复后逐项验证。在 staging 复制和校验阶段注入失败时旧 `www` 保持不变，在备份、激活和正式目录校验阶段注入失败时完整旧 `www` 可回滚。
9. 差量包识别与字段校验：覆盖 `app-wgtu` 缺失时仍走完整包流程，以及该字段类型错误、缺少 `baseVersion`、基准版本与 Runtime 或当前资源 manifest 不一致、`deleteFiles` 非数组/含非字符串/含越界路径等场景。
10. 版本行为矩阵：差量包的 `version.name` 和 `version.code` 与当前激活基准资源相同时，即使目标 `version.name` 没有升高且 `ignoreVersion` 为 `false` 也应安装成功；任一版本字段发生改动均以 `103625` 失败，`ignoreVersion: true` 也不得绕过该校验；`baseVersion` 不一致仍以 `103622` 失败。完整包保持既有行为：`ignoreVersion` 为 `false` 时只有更高的 `version.name` 可安装，低版本或同版本返回 `103611`，`ignoreVersion: true` 时跳过完整包版本高低比较。
11. 差量文件组合：分别验证纯新增、纯修改、纯删除及三者组合；覆盖文件与目录互换、重复删除、不存在文件删除，以及同一路径先删除后由差量包重新加入。
12. 只读基准资源：iOS 应用包资源、Android APK `android_asset` 资源分别完成递归拷贝、过滤和覆盖；确认 `getResourcePath("")` 返回值直接作为 `www` 根使用。Android 本地源覆盖零字节与普通文件长度比较，asset 流覆盖缓冲区边界附近文件并核对累计写入字节数与目标文件长度。
13. 差量合并失败注入：当前资源读取、普通文件长度校验或 asset 写入字节数校验失败返回 `103623`，删除、覆盖或对应复制校验失败返回 `103624`，均携带 `cause`，且当前激活资源与正式目录保持不变。
