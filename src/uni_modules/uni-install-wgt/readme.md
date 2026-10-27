# uni-install-wgt

`uni.installWgt` 将本地 Zstandard 二进制解压为 ZIP，再解压并交接给 Runtime。调用方传入待处理文件路径，文件后缀不参与判断；该 API 不接收、不计算也不校验 SHA-256。

```ts
uni.installWgt({
  filePath: '/data/user/0/example/files/update.wgt.zst',
  fail(err) {
    console.error(err.errCode, err.errMsg)
  }
})
```

安装由 `workers/install-wgt-worker.uts` 执行，主线程只负责创建、销毁 Worker，调用 Runtime，并触发 API 回调。Worker 和主线程之间只传递由字符串、数字、布尔值组成的新建 `UTSJSONObject` 消息，不跨线程传递自定义业务对象。

1. Worker 在 `uni.env.CACHE_PATH/uni-app-x-wgt/staging` 对应的本地绝对目录清理上一次未完成的插件事务；iOS 和 Android 在进入 Worker 前分别使用 `UTSiOS.convert2AbsFullPath`、`UTSAndroid.convert2AbsFullPath` 转换输入路径和 staging 根。真实磁盘文件直接交给 `uni-zstd-decompress`，不产生输入副本；Android APK asset、`content://` 等不能由 `java.io.File` 直接打开、但可由 `uni-fileSystemManager` 读取的输入，才会通过 `copyFileSync` 流式复制一次到本次事务的 `input.wgt`。随后 `decompressFile` 将本地输入生成到本次事务唯一的 `payload.zip`。文件后缀不参与判断，流程不读取或构造完整文件的 `ArrayBuffer`。
2. Worker 使用 `unzipSync` 在当前 Worker 中完成 ZIP 解压；返回成功后继续校验，返回失败后清理本次事务并结束。
3. Worker 将 ZIP 解压到本次事务的 `unzip` 目录，并递归定位 `manifest.json` 所在的资源目录，因此支持资源直接位于解压根目录、`www/<resource>`、`appid/<resource>` 和 `appid/www/<resource>` 等布局。该目录必须包含 `manifest.json`、`app-config.js` 和 `app-service.js`。非真机通过 `<resource-id>/www` 交接，真机直接通过 `<root>/www` 交接。
4. 每条排队请求真正开始时，主线程一次性取得 Runtime appId、appVersion、compilerRuleVersion、`isSyncDebug` 与正式资源根目录，并随 Worker 的 `start` 消息发送不可变快照。Worker 从 manifest 读取 `id`、`version.name`、`version.code` 和 `uni-app-x.compilerRuleVersion`；`compilerRuleVersion` 接受数值类型或仅含十进制数字的字符串类型，字符串会先转换为数值，缺少或格式不合法时安装失败。Worker 严格比较 manifest.id 与 Runtime appId，并要求 WGT 与 Runtime 的 `compilerRuleVersion` 完全一致，同时要求 WGT 的 `version.name` 严格高于 Runtime appVersion，低于或等于 Runtime 版本的资源均拒绝。`ignoreVersion: true` 只跳过 WGT 资源版本高低判断，不跳过 compilerRuleVersion 校验。流程不再使用 `prepared`/`handoff` 主线程往返。非真机沿用 `<root>/<resource-id>/www`，真机使用 `<root>/www`；真机交接完成后直接回调成功，非真机才调用 `setAppPath`。
5. `getAppRootPath(appId)` 返回截止到 `appid` 的正式资源根。Worker 在非真机环境将 staging 内完整的 `<resource-id>` 候选目录通过普通 `rename` 交接到 `getAppRootPath(appId)/<resource-id>`，不覆盖已有目录。Android 真机环境会在同一次递归中扫描新旧 `www/uni_modules` 下的 `.dex` 和 `config.json` 文件，在旧 `www` 保持不变时逐个处理旧文件：若 staging `www` 中相同相对路径已经是普通文件，则使用新 WGT 文件；否则创建对应目录层级并将旧文件复制到 staging `www`。复制时保留源文件的只读属性，并将 WGT 自带 DEX 设为只读；staging 中需要保留的完整文件集合校验通过后，才将旧 `www` 备份为事务内的 `old-www` 并激活准备完成的新 `www`。该事务对正式应用资源目录的重命名、建目录和文件复制直接使用 Android/Java `File` API，避免 `uni-fileSystemManager` 对 `APP_RESOURCE_PATH` 的只读路径校验。准备阶段失败只清理 staging，不触碰旧资源；目录交接失败时恢复完整的旧 `www`。iOS 真机仍使用完整目录替换。真机资源交接完成后直接触发成功回调，不调用 `setAppPath`；非真机则把 Worker 返回的最终 `www` 路径传给 `setAppPath(appId, versionName, resourcePath)`，成功回调表示 Runtime 已接管该资源。

一般交接中，`rename` 成功前资源只属于插件 staging，失败时由 Worker 清理。Android 真机插件资源准备阶段失败时旧 `www` 保持不变；目录切换阶段失败时先回滚，回滚成功后清理 txn，回滚失败则保留 txn 中的旧资源现场。事务提交后资源归 Runtime 管理，插件不会删除正式目录，即使 Runtime 拒绝应用该资源也是如此。

当前 iOS 使用 `UTSiOS.getAppRootPath(appId)`、`UTSiOS.setAppPath(appId, versionName, path)` 和 `UTSiOS.getAppVersion()`；Android 使用对应的 `UTSAndroid.getAppRootPath(appId)`、`UTSAndroid.setAppPath(appId, versionName, path)` 和 `UTSAndroid.getAppVersion()` 正式接口。

```swift
public class func getAppRootPath(appId: String? = nil) -> String
public class func setAppPath(_ appId: String, _ versionName: String, _ path: String) -> NSNumber
```
