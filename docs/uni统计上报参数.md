# uni 统计公有版上报参数说明

本文与 **`packages/uni-stat/src/public/domain/statData.ts`** 中 `createStatDataBuilder` 的拼装逻辑对齐，描述公有版默认上行 JSON 中的常用字段含义。传输层（火山 TLS **WebTrack.gif** / **WebTracks POST**）见 **`docs/火山TLS-WebTracks上报说明.md`**。

## 1. 通用约定

- 字段经 `s()` / `n()` 兜底：**不出现 `undefined`**；字符串缺省为 `''`，数字缺省为 `0`。  
- 事件类型字段 **`lt`**：见 `packages/uni-stat/src/public/domain/eventTypes.ts`。  
- **`usv`**：uni-app **编译器版本号**（构建期 `UNI_COMPILER_VERSION`），与旧版「写死 SDK 协议号」不同。

## 2. 每条事件携带的基础字段（`baseFields`）

| 字段 | 含义与来源（摘要） |
|------|-------------------|
| `ak` | 应用统计 key，一般为 appid |
| `usv` | 编译器版本字符串 |
| `v` | 应用版本；缺省取 `system.appVersion` |
| `ch` | 渠道 |
| `ut` | 宿主短码（如 wx、h5、app 等） |
| `p` | 操作系统 slug（如 `ios`、`android`），来自 `system.osP` 或覆盖 |
| `on` | 系统/ROM 展示名：优先 ROM（`romName`/`romVersion`），否则 `osName`；见 `adapter/system.ts` |
| `did` | 设备 ID（内部 uuid 出口名） |
| `brand` / `md` | 设备品牌 / 型号 |
| `sv` | 系统版本类文案 |
| `mpsdk` | 小程序等宿主 SDK 版本 |
| `mpv` | **仅宿主类型展示名**（如 微信、H5、App），与 `p`/`on` 分工独立 |
| `pr` | 像素比 |
| `ww` / `wh` | 窗口宽高（实时） |
| `sw` / `sh` | 屏幕宽高（实时） |
| `lang` | 语言（实时） |
| `net` | 网络类型 |
| `lat` / `lng` | 经纬度（当前 adapter 可空） |
| `mpn` / `tdaid` / `pkn` / `an` | 包维度：兼容包名、三方 appid、原生包名、应用展示名 |

## 3. 会话与页面相关

- **`sid` / `cst`**：会话 id、会话创建类型；见 `sessionFields`。  
- 页面路径、标题、上一页等：见 `pageFields`（`url`、`urlref`、`ttn` 等）。  
- **`lt=11`** 入口标记：`iey`、`ppiey`；仅页面进入类事件携带，见 `entryFields`。

## 4. 自定义合并与保留字段

`custom` 合并到上行体时，**保留字段**不可被业务覆盖（含 `p`、`on`、`mpv` 等），详见 `statData.ts` 内 `reserved` 列表。

## 5. 请求体形状（TLS 通道）

批量上报时，序列化结果为 **`requests`** 字符串，其内容为 **事件对象组成的 JSON 数组**。

```base
[{"lt":"1","t":1730000000,"ak":"__UNI__xxx",...}, ...]
```

- **H5**：该字符串经编码后放入 `WebTrack.gif` 的 Query 参数 `Logs`。  
- **非 H5**：解析为数组后，作为 JSON body 中的 **`Logs`** 字段提交，见 **`docs/火山TLS-WebTracks上报说明.md`**。

## 6. 相关文档

| 文档 | 内容 |
|------|------|
| `docs/火山TLS-WebTracks上报说明.md` | TLS 域名、双路径、POST 头与 body |
| `docs/image-url-too-long-修复说明.md` | H5 URL 长度、切片与排错 |
