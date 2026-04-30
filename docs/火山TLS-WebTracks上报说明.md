# 火山 TLS WebTracks 与公有版 uni-stat 上报

本文说明 **uni-stat 公有版**（`packages/uni-stat`）在默认 `channelVersion: image` 时，如何对接火山引擎日志服务 TLS 的 **Web 采集**能力：同一 `host` 下 **H5** 与 **非 H5** 使用不同路径与 HTTP 方法，与官方 [WebTracks 文档](https://www.volcengine.com/docs/6470/141803?lang=zh) 对齐。

## 1. 配置位置（维护者修改）

接入点三要素在源码中维护，**不通过 manifest 暴露**：

| 字段 | 含义 |
|------|------|
| `host` | TLS 接入域名，如 `https://tls-cn-beijing.volces.com` |
| `projectId` | 日志项目 ID |
| `topicId` | 日志主题 ID |

定义文件：`packages/uni-stat/src/public/config.ts` 中的 `IMAGE_REPORT_DEFAULTS`。

调用前需在 TLS 控制台为对应日志主题 **开启 Web 采集（Web Tracking）**；写入接口为匿名开放，需注意脏数据风险（见官方说明）。

## 2. 双路径总览

| 条件 | 路径 | 方法 | 典型用途 |
|------|------|------|----------|
| `getPlatform() === 'h5'` | `{host}/WebTrack.gif` | GET | 默认 **`Image` 触发 GET**（异步 onload/onerror，绕跨域）；仅 `preferImageBeacon: false` 或无 `Image` 时用 `uni.request` GET |
| 小程序 / App 等 | `{host}/WebTracks` | POST | 与官方 WebTracks 接口一致，body 可较大 |

实现模块：`packages/uni-stat/src/public/pipeline/channel/image.ts`（`createImageChannel`）。`StatApp.install` 会传入 `ut: getPlatform()` 以区分上述行为。

## 3. H5：`GET …/WebTrack.gif`

Query 参数（与历史 WebTrack.gif 采集一致）：

- `ProjectId`、`TopicId`：与配置一致  
- `Logs`：`encodeURIComponent(payload.requests)`，`requests` 为事件数组的 **JSON 字符串**  
- `Source`：固定 `webImg`  
- `Time`：毫秒时间戳  

发送策略：

- **默认 `Image` 信标**：不依赖 XHR，便于跨域；TLS 对 `WebTrack.gif` 常返回 **HTTP 200 + `Content-Type: application/json`**，浏览器无法当图片解码，会走 **`onerror`**，但请求已送达。SDK 将 **`onload` 与 `onerror` 均视为信标完成**（与 Network 里 200 一致）；**仅长时间无任何回调**视为超时失败。  
- **`preferImageBeacon: false` 或没有 `Image` 全局** 时，才用 **`uni.request` GET**：可带 **`statusCode` 与响应体摘要**（若跨域被拦则走 `fail`，与 Network 表现可能不一致）。  
- 若以 **`uni.request` GET** 校验 HTTP，**403 等**会如实反映在控制台；信标路径下排错仍以 **Network 状态码**为准。

## 4. 非 H5：`POST …/WebTracks`

### 4.1 URL

```base
https://{host 去掉末尾斜杠}/WebTracks?ProjectId={编码后}&TopicId={编码后}
```

`ProjectId`、`TopicId` 放在 **Query**，不在 body。

### 4.2 请求头（必选）

| 头名称 | 说明 |
|--------|------|
| `Content-Type` | 固定 `application/json` |
| `x-tls-bodyrawsize` | **未压缩** 请求体 UTF-8 字节长度，字符串形式数字（与官方示例一致） |

可选：`x-tls-compresstype: lz4`（当前 SDK **未** 对 body 做 lz4 压缩，故不传此头）。

### 4.3 Body（JSON）

根对象字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `Source` | string | 与 GET 像素一致，当前固定 `webImg` |
| `Logs` | array | 由 `payload.requests` **JSON.parse** 得到的对象数组；**每个 value 必须为 string**（服务端校验 `InvalidArgumentsTypes`）。SDK 会将 `number` / `boolean` 等转为字符串，对象/数组则 `JSON.stringify` 后再作为字符串 value 写入。 |

单请求体积、条数等限制以 **官方 WebTracks / PutLogs 配额** 为准（如单请求 5 MiB、单 LogGroup 条数上限等）；实现内对 POST body 有保守上限校验，超限会抛永久错误，避免无效重试。

### 4.4 成功判定

`uni.request` 成功回调中 **HTTP 状态码 2xx**（实现为 `>= 200 && < 300`）视为送达。

## 5. 与 collector、切片的关系

- **H5**：仍受 GET URL 长度约束；`createImageChannel` 的 `maxRequestBytes()` 会按 `maxUrlLength`（默认 6KB URL）反推 `requests` 原文上限，与 `BATCH_REQUESTS_MAX_BYTES` 等取 min 后切片。详见 `docs/image-url-too-long-修复说明.md`。  
- **非 H5**：POST body 空间大得多；`maxRequestBytes()` 返回约 **4MiB** 量级的上限，切片主要受全局 `BATCH_REQUESTS_MAX_BYTES`、`BATCH_MAX_EVENTS` 与单条 `SINGLE_EVENT_MAX_BYTES` 约束。

## 6. 小程序与 App 注意事项

- 使用 `uni.request` 发 POST 时，请将 **TLS `host` 域名** 配置到各平台 **request 合法域名** 白名单。  
- 与旧版「全端 WebTrack.gif GET」相比，非 H5 不再把整批日志塞进 URL，有利于 **大包、中文堆栈** 场景。

## 7. 相关代码与文档索引

| 主题 | 位置 |
|------|------|
| 通道实现 | `packages/uni-stat/src/public/pipeline/channel/image.ts` |
| 默认装配 | `packages/uni-stat/src/public/runtime/StatApp.ts` |
| 通道选择 / 降级 | `packages/uni-stat/src/public/pipeline/channel/selector.ts` |
| 上行业务字段 | `docs/uni统计上报参数.md`（若仓库中尚未创建，以 `statData.ts` 注释与现有参数文档为准） |
| URL 过长排错 | `docs/image-url-too-long-修复说明.md` |
