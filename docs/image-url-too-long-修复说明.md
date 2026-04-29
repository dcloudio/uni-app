# image / WebTrack 上报「URL 过长」与切片说明

## 1. 适用范围

- **仅 H5** 走 `GET {host}/WebTrack.gif?...&Logs=encodeURIComponent(requests)...` 时，`Logs` 在 URL 中经 `encodeURIComponent` 后长度会膨胀（纯中文最坏约 **3 倍**），整体 URL 易被网关、CDN 或浏览器限制在约 **8KB** 以内。  
- **小程序、App 等** 已改为 **`POST {host}/WebTracks`**（见 `docs/火山TLS-WebTracks上报说明.md`），**不再**受「整段日志塞进 Query」的 URL 上限约束；若仍出现失败，多为 **body 超限**、**JSON 非法** 或 **网络 / 域名白名单** 问题。

## 2. H5 上出现 `image url too long` 的原因

公有版在 `createImageChannel` 内对 GIF URL 做 **preflight**：若拼接后长度大于 `maxUrlLength`（默认 **6144**），会抛出 **`PermanentChannelError`**，且 **不会** 对该批做网络重试（重试同一批必然仍超长）。

同时，`collector` flush 时会取通道的 `maxRequestBytes()` 与全局 **`BATCH_REQUESTS_MAX_BYTES`**、**`BATCH_MAX_EVENTS`** 的较小值，对事件做 **`chunkEvents` 切片**，使每片 `requests` 经编码后仍低于 URL 上限。

## 3. 单条事件过大（任意端）

若单条事件序列化后超过 **`SINGLE_EVENT_MAX_BYTES`**（默认 4KB，定义于 `packages/uni-stat/src/public/config.ts`），**`queue.enqueue`** 会直接丢弃该条并打日志，避免「单条即超过 URL/body 策略」导致队列死锁。

业务侧应收敛自定义字段、错误堆栈、大 JSON；**不要把大段 base64、整页 HTML** 塞进统计事件。

## 4. 排查步骤（H5 URL 超长）

1. 打开调试日志，确认通道名为 **`image`**，且报错信息含 **`image url too long`**。  
2. 检查是否 **H5**（`ut === 'h5'`）；非 H5 不应再走 GIF URL 超长逻辑。  
3. 缩小单批事件数或缩短自定义字段；确认 **`BATCH_REQUESTS_MAX_BYTES`**、**`BATCH_MAX_EVENTS`** 未被改得过大。  
4. 若合法仍超长，可在**维护者可控**前提下调整 `createImageChannel` 的 `maxUrlLength`（不推荐盲目增大，可能触发网关拒绝）。

## 5. 非 H5 POST 相关错误

| 现象 | 可能原因 |
|------|----------|
| `webtracks invalid requests json` | `requests` 不是合法 JSON 字符串 |
| `webtracks Logs must be a json array` | 解析结果不是数组 |
| `webtracks body too large` | 整批 POST body 超过实现内安全上限（仍应低于官方 5MiB 量级） |
| `webtracks status 4xx/5xx` | Topic 未开 Web 采集、Project/Topic 错误、或服务端拒绝 |
| `uni.request unavailable` | 运行环境无 `uni.request` |

## 6. 实现索引

- 通道：`packages/uni-stat/src/public/pipeline/channel/image.ts`  
- 切片与 flush：`packages/uni-stat/src/public/pipeline/collector.ts`  
- 常量：`packages/uni-stat/src/public/config.ts`  

更完整的 TLS 路径与头字段说明见 **`docs/火山TLS-WebTracks上报说明.md`**。
