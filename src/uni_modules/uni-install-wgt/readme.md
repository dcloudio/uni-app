# uni-install-wgt

Harmony 平台接入所需的 Runtime API、Worker/文件系统能力、资源路由契约及验收清单，见 [Harmony `uni.installWgt` 平台接口与接入说明](./harmony-platform-api-requirements.md)。

`uni.installWgt` 将本地 Zstandard 二进制解压为 ZIP，再解压并交接给 Runtime。调用方传入待处理文件路径，文件后缀不参与判断；该 API 不接收、不计算也不校验 SHA-256。解压所得 `manifest.json` 包含 `app-wgtu` 时按差量包处理，否则按完整 WGT 包处理，调用方式不变。

```ts
uni.installWgt({
  filePath: '/data/user/0/example/files/update.wgt.zst',
  fail(err) {
    console.error(err.errCode, err.errMsg)
  }
})
```

安装由 `workers/install-wgt-worker.uts` 执行，主线程只负责创建、销毁 Worker，调用 Runtime，并触发 API 回调。Worker 和主线程之间只传递由字符串、数字、布尔值组成的新建 `UTSJSONObject` 消息，不跨线程传递自定义业务对象。

1. Worker 在 `uni.env.CACHE_PATH/uni-app-x-wgt/staging` 对应的本地绝对目录下，使用事务序号和 UUID 创建本次安装独占的 `txn-*` 目录，不会清理其他事务目录，iOS 和 Android 在进入 Worker 前分别使用 `UTSiOS.convert2AbsFullPath`、`UTSAndroid.convert2AbsFullPath` 转换输入路径和 staging 根。真实磁盘文件直接交给 `uni-zstd-decompress`，不产生输入副本；Android APK asset、`content://` 等不能由 `java.io.File` 直接打开、但可由 `uni-fileSystemManager` 读取的输入，才会通过 `copyFileSync` 流式复制一次到本次事务的 `input.wgt`。随后 `decompressFile` 将本地输入生成到本次事务唯一的 `payload.zip`。文件后缀不参与判断，流程不读取或构造完整文件的 `ArrayBuffer`。
2. Worker 使用 `unzipSync` 在当前 Worker 中完成 ZIP 解压；返回成功后继续校验，返回失败后清理本次事务并结束。
3. Worker 将 ZIP 解压到本次事务的 `unzip` 目录，并递归定位 `manifest.json` 所在的资源目录，因此支持资源直接位于解压根目录、`www/<resource>`、`appid/<resource>` 和 `appid/www/<resource>` 等布局。完整包目录必须直接包含 `manifest.json`、`app-config.js` 和 `app-service.js`；差量包只保证直接包含 `manifest.json`，必需启动资源在合并后校验。
4. 每条排队请求真正开始时，主线程一次性取得 Runtime appId、appVersion、compilerRuleVersion、`isSyncDebug`、正式资源根目录与当前激活资源根目录，并随 Worker 的 `start` 消息发送不可变快照。iOS 和 Android 分别通过 `UTSiOS.getResourcePath("")` 与 `UTSAndroid.getResourcePath("")` 获取当前激活资源；必须传入空字符串，返回值本身就是当前 `www` 根目录，不再取父目录。
5. Worker 对完整包和差量包执行相同的 manifest 字段校验：读取 `id`、`version.name`、`version.code` 和 `uni-app-x.compilerRuleVersion`；`compilerRuleVersion` 接受数值类型或仅含十进制数字的字符串类型，字符串会先转换为数值，缺少或格式不合法时安装失败。Worker 严格比较 manifest.id 与 Runtime appId，并要求 WGT 与 Runtime 的 `compilerRuleVersion` 完全一致。只有完整包用于升级资源版本：`ignoreVersion` 为 `false` 时，完整包的 `version.name` 必须严格高于 Runtime appVersion，低于或等于 Runtime 版本的完整包以 `103611` 拒绝；`ignoreVersion: true` 只跳过这项完整包版本高低判断，不跳过其他 manifest 校验。
6. 差量包不升级资源版本，其 manifest 中的 `version.name` 和 `version.code` 必须分别与当前激活基准资源 `manifest.json` 中的值完全一致，否则以 `103625` 拒绝。`app-wgtu.baseVersion` 为必填的版本名，必须同时与差量包的 `version.name`、安装前 Runtime appVersion、当前激活资源 `manifest.json` 的 `version.name` 完全一致；`ignoreVersion: true` 不绕过这些差量版本一致性校验。`deleteFiles` 可省略；提供时必须是字符串数组，每项是相对当前资源根的文件路径，允许以单个 `/` 开头，但不允许指向目录，也不允许空路径、反斜杠、协议、空路径段、`.`、`..` 或越出资源根。Worker 在事务目录创建 `merged-www`，从当前激活的只读或可写资源中复制基准资源并过滤待删除文件，再将差量包内文件递归覆盖到该目录；因此同名文件由差量包覆盖，新增文件被加入，而同时出现在 `deleteFiles` 与差量包中的文件最终以差量包内容为准。Android 普通文件复制会比较源文件与目标文件长度，APK asset 复制会统计实际写入字节数并与目标文件长度比较。合并结果必须再次具备 `manifest.json`、`app-config.js` 和 `app-service.js`，正式资源在完整候选目录形成前不会被修改。
7. `getAppRootPath(appId)` 返回截止到 `appid` 的正式资源根。Worker 在非真机环境将 staging 内完整的 `<resource-id>` 候选目录通过普通 `rename` 交接到 `getAppRootPath(appId)/<resource-id>`，不覆盖已有目录。Android 真机安装完整包时会分别递归扫描旧 `www` 与 staging `www` 的 `uni_modules`，收集 `.dex` 和 `config.json` 文件；在旧 `www` 保持不变时，若 staging 中相同相对路径已经是普通文件则使用新 WGT 文件，否则创建对应目录层级并将旧文件复制到 staging。差量包的 `merged-www` 已经通过复制当前资源、过滤 `deleteFiles` 和覆盖差量文件形成完整候选，因此正常准备阶段只扫描 staging 候选用于 DEX 只读处理与完整性校验，不再扫描旧 `www` 或二次补入旧插件文件。复制时保留源文件的只读属性，并将 WGT 自带 DEX 设为只读；staging 中需要保留的完整文件集合校验通过后，才将旧 `www` 备份为事务内的 `old-www` 并激活准备完成的新 `www`。该事务对正式应用资源目录的重命名、建目录和文件复制直接使用 Android/Java `File` API，避免 `uni-fileSystemManager` 对 `APP_RESOURCE_PATH` 的只读路径校验。准备阶段失败只清理 staging，不触碰旧资源；目录交接失败时恢复完整的旧 `www`。完整包使用准备阶段收集的旧插件路径进行回滚验证；差量包仅在发生回滚时从 `old-www`（备份尚未形成时从正式旧 `www`）枚举原有 DEX 与 `config.json`，恢复后同样逐项验证。iOS 真机同样先将旧 `www` 备份到事务目录，再激活新目录，失败时恢复旧目录。真机资源交接完成后直接触发成功回调，不调用 `setAppPath`；非真机则把 Worker 返回的最终 `www` 路径传给 `setAppPath(appId, versionName, resourcePath)`，成功回调表示 Runtime 已接管该资源。

一般交接中，`rename` 成功前资源只属于插件 staging，失败时由 Worker 清理。真机资源目录切换前会备份旧 `www`；切换失败时先回滚，回滚成功后清理 txn，回滚失败则保留 txn 中的旧资源现场。事务提交后资源归 Runtime 管理，插件不会删除正式目录，即使 Runtime 拒绝应用该资源也是如此。

当前 iOS 使用 `UTSiOS.getAppRootPath(appId)`、`UTSiOS.getResourcePath("")`、`UTSiOS.setAppPath(appId, versionName, path)` 和 `UTSiOS.getAppWgtVersion()`；Android 使用对应的 `UTSAndroid.getAppRootPath(appId)`、`UTSAndroid.getResourcePath("")`、`UTSAndroid.setAppPath(appId, versionName, path)` 和 `UTSAndroid.getAppWgtVersion()` 正式接口。`getResourcePath("")` 返回当前激活资源的 `www` 根目录。

```swift
public class func getAppRootPath(appId: String? = nil) -> String
public class func setAppPath(_ appId: String, _ versionName: String, _ path: String) -> NSNumber
```

差量更新新增错误码如下：

| 错误码 | 含义 |
| --- | --- |
| `103620` | 缺少必填的 `app-wgtu.baseVersion` |
| `103621` | `app-wgtu` 或 `deleteFiles` 字段格式、路径不合法 |
| `103622` | `baseVersion` 与升级前使用的 WGT 版本不一致 |
| `103623` | 当前激活 WGT 资源读取或拷贝失败，底层原因保存在 `cause` |
| `103624` | 差量资源删除、覆盖或合并失败，底层原因保存在 `cause` |
| `103625` | 差量包的 `version.name` 或 `version.code` 与当前激活基准资源不一致 |
