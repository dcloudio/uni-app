# WGT Worker 安装改造方案

## 1. 目标

`uni.installWgt` 的 Zstandard 二进制读取、解压为 ZIP、ZIP 解压前处理和解压后处理运行在 Worker 子线程中。主线程只负责生成 Runtime 快照、Worker 生命周期、Runtime 激活和 API 回调。

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

`manifest.id` 只允许 ASCII 字母、数字、`.`, `_`, `-` 组成的单一路径段，拒绝 `.` 与 `..`。`version.name` 使用数字点分格式并且只与 Runtime 的 `appVersion` 比较；每个版本段去除前导零后，按数字字符串长度和字典序比较，不依赖可能精度丢失的数值转换。`version.code` 必须为纯数字元数据，不参与升降级比较。正式资源目录名是规范化元数据的 32 位小写 MD5：`wgt-v1`、每个字段的 ASCII 字节长度和值、毫秒时间戳和跨端 UUID nonce 共同构成输入；nonce 不包含也不替代 SHA-256。若同名正式目录已存在，Worker 生成新的 timestamp/nonce/MD5，绝不覆盖或删除 Runtime 的既有资源。当前公开的跨端文件系统 API 未暴露 `st_dev`，因此插件只能保持“跨卷 rename 必然失败且绝不回退复制”的安全性质；契约要求的交接前同卷判定仍需由文件系统或 Runtime 提供设备号能力后补齐。

## 3. 线程模型

```text
主线程 installWgt
  -> 主线程: 获取本次安装的 Runtime 配置快照
  -> Worker: start(request + Runtime snapshot)
  -> Worker: 清理 staging、创建 txn，按需将非本地 Android 输入流式复制为 txn/input.wgt
  -> Worker: 调用 decompressFile 生成 txn/payload.zip
  -> Worker: 调用 unzipSync
  -> Worker: 校验资源、比较版本、原子 rename
  -> 主线程: 真机 API 回调；非真机 Runtime setAppPath、API 回调；terminate
```

解压不经过主线程中继：

```text
Worker 读取并解压 zstd
  -> Worker 在当前线程调用 unzipSync
  -> 返回 true：校验资源、比较版本并交接资源
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
   - Runtime appId、appVersion、compilerRuleVersion 和正式资源根目录
3. 收到 Worker 安装成功消息后，真机直接触发 API 成功回调；非真机调用 `setAppPath`，仅在 Runtime 接受资源后触发成功回调。
4. 处理 Runtime 返回结果，触发 `success`、`fail`、`complete`，终止 Worker，并启动下一条排队请求。

Runtime 配置在每条排队请求真正开始时读取，因此后一条请求能看到前一条 `setAppPath` 完成后的最新 appVersion。非真机的 `setAppPath` 保留在主线程，因为 Runtime 可能在该调用中触发资源切换或重载；真机资源交接完成后不调用该接口。

## 5. Worker 状态机

Worker 使用实例字段保存单次任务状态。该状态只在 Worker 中访问；主线程和 Worker 之间只传递新建的、由字符串、数字和布尔值组成的消息对象。

| 阶段 | 执行线程 | 行为 |
| --- | --- | --- |
| `start` | Worker | 接收 Runtime 快照，清理 staging、创建 `txn/unzip`；真实磁盘输入直接使用，Android asset、`content://` 等非本地输入按需流式复制为 `txn/input.wgt`；调用 `decompressFile` 生成 `txn/payload.zip`，再将 ZIP 解压到 `txn/unzip` |
| `unzip-success` | Worker | `unzipSync` 返回 true 后校验资源根、读取 manifest、比较版本并原子 `rename` |
| `unzip-failure` | Worker | `unzipSync` 返回 false 后删除本次 txn，返回终态失败 |
| `terminal-success` | 主线程 | 真机直接成功回调；非真机调用 Runtime、成功回调；终止 Worker |
| `terminal-failure` | 主线程 | 失败回调、终止 Worker |

Worker 只发送一次终态消息。

## 6. WGT 资源契约

Worker 延续既有的生产 WGT 格式：

1. Zstandard 解压得到的 ZIP 必须能够定位 `manifest.json` 所在的资源目录，不要求固定的顶层目录名称或层级。
2. `manifest.json` 所在目录必须包含 `app-config.js` 和 `app-service.js`，且 manifest.id 必须与 Runtime appId 一致。
3. Worker 从 manifest 读取 `id`、`version.name`、`version.code` 和 `uni-app-x.compilerRuleVersion`；`compilerRuleVersion` 接受数值类型或仅含十进制数字的字符串类型，字符串会先转换为数值，缺少或格式不合法时拒绝安装。WGT 的 `compilerRuleVersion` 必须等于 iOS `UTSiOS.getUniCompilerRuleVersion()` / Android `UTSAndroid.getUniCompilerRuleVersion()` 的返回值。`version.name` 必须严格高于 Runtime `appVersion`，低于或等于 Runtime 版本的资源必须拒绝。`ignoreVersion` 只影响资源版本比较，不影响 compilerRuleVersion 校验。非真机使用 `<root>/<resource-id>/www`，真机使用 `<root>/www`。
4. 非真机校验通过后，Worker 在 staging 内将资源根移动为 `<resource-id>/www`，再将完整候选目录原子 `rename` 到：

   ```text
   <appRoot>/<resource-id>/www
   ```

   iOS 真机校验通过后，Worker 清理已存在的 `<appRoot>/www`，再将 staging 资源通过普通 `rename` 交接到 `<appRoot>/www`。Android 真机使用 DEX 与 `config.json` 保留事务：

   1. 分别对旧目录和 staging 目录的 `www/uni_modules` 各递归一次，在同一次遍历中记录所有普通 `.dex` 和文件名为 `config.json` 的文件精确相对路径；两类文件均可以位于插件 `app-android` 的任意深度。
   2. 在旧 `www` 保持正式可用的状态下逐个处理旧文件。若 staging `www` 中完全相同的相对路径已经是普通文件，则保留新 WGT 文件并跳过旧文件；若目标路径不存在，则使用 Android/Java `File.mkdirs` 和 `File.copyTo` 创建原目录层级并复制旧文件，保留源文件的只读属性；目标路径存在但不是普通文件时安装失败。这些操作不经过 `uni-fileSystemManager` 对 `APP_RESOURCE_PATH` 的只读路径校验。
   3. 将新 WGT 自带的 DEX 设为只读，并在 staging 中校验新 WGT 文件与应复制的旧 DEX、旧 `config.json` 均存在。准备阶段失败只删除本次 txn，旧 `www` 不发生变化。
   4. staging 准备完成后，使用 Android/Java `File.renameTo` 将完整旧 `www` 原子移动到 txn 的 `old-www`，再将准备完成的 staging `www` 原子移动到正式路径。
   5. 在正式路径再次校验完整的 DEX 与 `config.json` 集合后提交，并清理 `old-www` 和 txn。

   目录切换开始后的任一步骤失败时，Worker 根据 `www`、staging 和 `old-www` 的实际目录状态回滚，而不只依赖内存中的阶段标记；新目录会整体移回 staging，再将始终包含全部原始插件文件的 `old-www` 恢复到正式位置。只有旧目录及其全部 DEX、`config.json` 都恢复成功才清理 txn；回滚失败时保留 txn 现场，避免继续删除唯一副本。该分支只在 Android 且 `isSyncDebug == true` 时启用，iOS 和非真机流程不变。

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

5. 一般流程中，`rename` 前资源归插件所有，失败时由 Worker 删除本次 staging txn；Android 真机插件文件保留事务按上述回滚规则处理。
6. `rename` 成功后资源归 Runtime 所有；插件和主线程均不得删除正式目录。

## 7. 错误和资源释放

- 一般流程中，Worker 内发生的所有 `rename` 前失败都必须删除本次 `txn`，再发送终态失败消息。Android 真机插件文件准备阶段失败时直接清理 txn，旧 `www` 保持不变；目录切换阶段失败时完整回滚旧 `www`、DEX 与 `config.json`，回滚成功后清理 txn，回滚失败则保留 txn 现场并返回 `103604`。
- `unzip` 失败在 Worker 内直接清理并返回终态失败。
- `onError` 或内部消息异常表示插件内部错误。主线程终止 Worker，并以 `103612` 返回失败；具体原因通过 `SourceError` 保存在失败结果的 `cause` 字段中。`103602` 使用 `errMsg` 标识失败的 staging 操作，并同样通过 `cause` 保存底层文件系统错误；其他错误码继续沿用原有 `errMsg` 行为。残留 staging 在下一次串行安装调用开始时清理。
- 主线程收到 Worker 终态消息后先终止当前 Worker，再处理下一条排队请求。
- 不传递回调函数、Runtime bridge、`Error` 对象或文件系统结果对象，避免 iOS 和 Android 引用类型跨线程共享导致竞态。

## 8. 验证范围

1. iOS 真实 Zstandard 二进制安装：确认读取、解压、ZIP 解压、目录校验、manifest 读取和 `rename` 不阻塞 UI 线程。
2. Android 真实 Zstandard 二进制安装：确认读取、解压和 `unzipSync` 均在 Worker 中执行，并在同步解压完成后继续安装流程。
3. Android 输入来源：云包 `/android_asset/` 和 `content://` 输入仅复制一次后安装；下载临时文件、缓存文件、沙盒文件、沙盒外真实文件和真机运行释放资源均直接解压且不复制。
4. 非法包：多顶层目录、目录名与 manifest `id` 不一致、缺失启动文件、低版本。
5. 连续两次安装：确认串行队列、Worker 终止和 staging 清理。
6. 解压失败：确认主线程只中继，实际清理由 Worker 完成。
7. Runtime 拒绝已交接资源：确认正式目录保留，插件不越权清理。
8. Android 真机插件文件保留：使用多插件、多层目录和 multidex 样本，确认 WGT 缺少 DEX 或 `config.json` 时旧文件从正式旧 `www` 按相对路径复制到 staging 且只读属性得到保留；新旧文件相对路径相同时使用新文件，相对路径不同时保留旧文件，包括同一目录中的旧 `classes2.dex`、子目录中的旧 DEX 和插件的旧 `config.json`；在 staging 复制和校验阶段注入失败时旧 `www` 保持不变，在备份、激活和正式目录校验阶段注入失败时完整旧 `www` 可回滚。
