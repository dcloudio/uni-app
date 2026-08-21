/**
 * 上行字段集中拼装。
 *
 * 私有版痛点：`sendXxxRequest` 系列函数中各自 `Object.assign(getStatData(), ...)`，
 * 字段散落、重复、字段名硬编码、新增字段需改多处。公有版集中到本模块，按事件类型
 * 决定字段子集。
 *
 * 设计要点：
 *   - 通过依赖注入（`createStatDataBuilder(deps)`）解耦 adapter / domain，便于单测。
 *   - 字段全部经过 `s/n` 兜底转换，禁止 undefined 出现在最终上行体（统一用空串 / 0）。
 *   - 事件类型驱动：仅 lt=1 携带 fvts/lvts/tvc / sc 等启动字段；其他事件不携带。
 *   - 仅做拼装，不做副作用：不写 storage、不调 ensureSession（这些由 collector 编排）。
 *   - 严守 ES2015 baseline：禁用 `ObjectExpression > SpreadElement`，统一用 `Object.assign`。
 *
 * 与 `docs/uni统计上报参数.md` 对齐说明：
 *   - 设备 ID 使用文档字段名 `did`（内部 SessionSnapshot/Adapter 仍以 uuid 命名，仅出口处映射）。
 *   - `on`：优先 **`romName`**（厂商 ROM，如 HyperOS）及 **`romVersion`**，否则 **`osName`**。
 *   - 会话创建类型使用文档字段名 `cst`（内部 storage 仍以 sct 命名，仅出口处映射）。
 *   - 不再上行 `sst / seq / pid`（及历史 `odid`）：
 *       * sst/seq 仅本地用于会话状态机，不参与服务端入库；
 *       * pid（上一会话 sid）当前后端无入库口径。
 *     这些字段在 SessionSnapshot 里仍保留，确保会话过期判断、调试日志可继续使用。
 */

import { type IEYValue, type LTValue, toIey } from './eventTypes'

import type { LocaleAndScreen, SystemInfoStatic } from '../adapter/system'
import type { LocationResult } from '../adapter/location'
import type { NetResult } from '../adapter/network'
import type { PackageInfo } from '../adapter/package'
import type { Platform } from '../adapter/platform'
import type { WebInfo } from '../adapter/web'
import type { SessionSnapshot } from './session/machine'

/** 由 collector 在每次事件时构造，传入 builder。 */
export interface EventContext {
  /** 事件秒级时间戳。 */
  t: number
  /** 事件类型。 */
  lt: LTValue
  /** 当前页路径（不含 query）。 */
  route?: string
  /** 当前页路径（含 query），上行字段 url。 */
  url?: string
  /** 上一页路径，上行字段 urlref；lt=11/3 必填，其它事件可空。 */
  urlref?: string
  /** 上一页停留秒数（整数秒；与私有版一致，&lt;1 秒按 1 秒），lt=11/3 必填。 */
  urlref_ts?: number
  /** 当前页 title（setNavigationBarTitle 截获）。 */
  ttn?: string
  /** pages.json 配置的 title。 */
  ttpj?: string
  /** 业务自定义 title。 */
  ttc?: string
  /** 启动场景（小程序）。 */
  sc?: string
  /** session snapshot；由 collector 在 ensureSession 后传入。 */
  session?: SessionSnapshot
  /** 是否为入口页（任意输入，统一转 0/1）；仅 lt=11 使用。 */
  iey?: unknown
  /** 上级页是否为入口页；仅 lt=11 使用。 */
  ppiey?: unknown
  /** 访问字段（仅 lt=1 且首次构建时携带）。 */
  visit?: { fvts: number; lvts: number; tvc: number }
  /** 自定义事件 payload，会原样合并到 statData（key 不冲突）。 */
  custom?: Record<string, unknown>
  /** 错误事件文本，lt=31 用。 */
  errMsg?: string
  /** Push ClientID，lt=101 用。 */
  cid?: string
}

/** Builder 依赖；运行时由 runtime/install.ts 注入。 */
export interface StatDataDeps {
  /** 静态配置：ak/usv/v/ch 等。 */
  config: {
    ak: string
    usv: string
    /** 应用版本（仅 App，可空）。 */
    v?: string
    /** 渠道（仅 App，可空）。 */
    ch?: string
  }
  /**
   * 平台与可选 `p` 覆盖。
   * - `ut`：宿主类型（wx / h5 / n …）。
   * - `p`：若需强行覆盖上行操作系统字段则传入；默认取 `system.osP`。
   */
  platform: { ut: Platform | string; p?: string }
  /** 设备 / 系统静态信息。 */
  system: SystemInfoStatic
  /** 实时 locale + 屏幕。 */
  locale: LocaleAndScreen
  /** 可选的事件时快照读取器；缺省时保持使用 install 时的 locale。 */
  resolveLocale?: () => LocaleAndScreen
  /** 设备 ID（`uuid` 出口映射为上行 `did`）。 */
  device: { uuid: string }
  /** 网络快照（异步获取后由 collector 缓存）。 */
  net: NetResult
  /** 位置快照（默认全空）。 */
  location: LocationResult
  /** 包信息（mpn/tdaid/pkn/an）。 */
  pkg: PackageInfo
  /** H5 专用 Web 信息；非 H5 传 `{ domain: '' }`。 */
  web: WebInfo
  /** 若需覆盖默认 `pkg.mpn`（如历史迁移），可显式传入。 */
  legacy?: { mpn?: string }
}

/** 最终上行体；为兼容老接收端，所有字段命名与私有版一致。 */
export type StatData = Record<string, unknown>

/** 字段值兜底：把 undefined / null / NaN 转为类型默认值，避免污染上行 JSON。 */
function s(v: unknown, def = ''): string {
  if (typeof v === 'string') return v
  if (typeof v === 'number' && Number.isFinite(v)) return String(v)
  return def
}
function n(v: unknown, def = 0): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.length > 0) {
    const x = Number(v)
    if (Number.isFinite(x)) return x
  }
  return def
}

/**
 * 创建 statData 构建器。
 *
 * 调用方典型用法：
 * ```ts
 * const builder = createStatDataBuilder(deps)
 * const data = builder.build({ lt: LT.Page, t: nowSec(), route: '...' })
 * ```
 */
export function createStatDataBuilder(deps: StatDataDeps) {
  /**
   * 复用频率高的"基础字段"——每条事件都带。
   *
   * 字段映射（参考 `docs/uni统计上报参数.md`）：
   *   - `did` ← 内部 `device.uuid`（出口字段重命名为文档口径）
   *   - `p` ← `platform.p` 或 `system.osP`（仅操作系统 slug：`ios` / `android` …）
   *   - `on` ← `system.on`（ROM 展示名优先，否则 `osName`）
   *   - `mpsdk` ← `system.sdkVersion`
   *   - `mpv` ← `system.mpvHostVersion`（宿主客户端版本，与私有版 `sys.version` 同源）
   *   - `domain` ← `web.domain`（H5 含协议域名，如 `https://www.example.com`，非 H5 为空串）
   *   - `pr/ww/wh/sw/sh/lang` 来自 `locale`（实时取，修复缺陷 #18）
   *   - `lat/lng` 当前 LocationResult 仅含字符串经纬度，cn/pn/ct 留空待 adapter 扩展
   *
   * 不再装配 `odid`（老 App 兼容字段已移除）。
   */
  function baseFields(): StatData {
    const {
      config,
      platform,
      system,
      device,
      net,
      location,
      pkg,
      legacy,
      web,
    } = deps
    const locale = deps.resolveLocale ? deps.resolveLocale() : deps.locale
    return {
      ak: s(config.ak),
      usv: s(config.usv),
      v: s(config.v ?? system.appVersion),
      ch: s(config.ch),
      ut: s(platform.ut),
      p: s(platform.p ?? system.osP),
      on: s(system.on),
      did: s(device.uuid),
      brand: s(system.brand),
      md: s(system.md),
      sv: s(system.sv),
      mpsdk: s(system.sdkVersion),
      mpv: s(system.mpvHostVersion),
      pr: n(locale.pr, 1),
      ww: n(locale.ww),
      wh: n(locale.wh),
      sw: n(locale.sw),
      sh: n(locale.sh),
      lang: s(locale.lang),
      net: s(net.net, 'unknown'),
      lat: s(location.lat),
      lng: s(location.lng),
      mpn: s(legacy?.mpn ?? pkg.mpn),
      tdaid: s(pkg.tdaid),
      pkn: s(pkg.pkn),
      an: s(pkg.an),
      domain: s(web.domain),
    }
  }

  /**
   * 会话字段：所有 lt 都要带。
   *
   * 与文档对齐：仅上行 `sid` 与 `cst`；
   * 内部状态字段 `sst / seq` 不再随上行体发出，仅保留在 SessionSnapshot 中。
   */
  function sessionFields(ctx: EventContext): StatData {
    if (!ctx.session) return {}
    return {
      sid: ctx.session.sid,
      cst: ctx.session.sct,
    }
  }

  /** 页面字段：lt=11/3 / 普通页面事件携带。 */
  function pageFields(ctx: EventContext): StatData {
    const out: StatData = {}
    if (ctx.url !== undefined) out.url = s(ctx.url)
    if (ctx.urlref !== undefined) out.urlref = s(ctx.urlref)
    if (ctx.urlref_ts !== undefined) out.urlref_ts = n(ctx.urlref_ts)
    if (ctx.ttn !== undefined) out.ttn = s(ctx.ttn)
    if (ctx.ttpj !== undefined) out.ttpj = s(ctx.ttpj)
    if (ctx.ttc !== undefined) out.ttc = s(ctx.ttc)
    return out
  }

  /** 入口标记：lt=11 携带 iey + ppiey；lt=21 只携带当前页 iey。 */
  function entryFields(ctx: EventContext): StatData {
    if (ctx.lt === '11') {
      return {
        iey: toIey(ctx.iey !== undefined ? ctx.iey : false) as IEYValue,
        ppiey: toIey(ctx.ppiey !== undefined ? ctx.ppiey : false) as IEYValue,
      }
    }
    if (ctx.lt === '21' && ctx.iey !== undefined) {
      return { iey: toIey(ctx.iey) as IEYValue }
    }
    return {}
  }

  /** 访问字段：仅 lt=1（应用启动 / 新会话）且 collector 显式传入 visit 时携带。 */
  function visitFields(ctx: EventContext): StatData {
    if (ctx.lt !== '1') return {}
    if (!ctx.visit) return {}
    return {
      fvts: ctx.visit.fvts,
      lvts: ctx.visit.lvts,
      tvc: ctx.visit.tvc,
    }
  }

  /** 启动场景：仅 lt=1 携带。 */
  function launchFields(ctx: EventContext): StatData {
    if (ctx.lt !== '1') return {}
    if (ctx.sc === undefined) return {}
    return { sc: s(ctx.sc) }
  }

  /**
   * 错误事件特化字段：lt=31 时把 `errMsg`（含 stack）截断后写入 `em`。
   *
   * 截断动机：长 Error stack（尤其是 jest / Node 调用栈）轻易超过 3KB，会让单条事件
   * 触发 `SINGLE_EVENT_MAX_BYTES` 被 enqueue 丢弃；这里在 builder 阶段先做一次软截断，
   * 既能保留头部关键定位信息（错误类型、消息、第一层 stack），又能保证事件可达。
   *
   * 阈值：3KB（保留 1KB buffer 给其他字段，整体仍在 SINGLE_EVENT_MAX_BYTES = 4KB 内）。
   */
  function errorFields(ctx: EventContext): StatData {
    if (ctx.lt !== '31' || !ctx.errMsg) return {}
    const ERR_MSG_MAX = 3 * 1024
    const TRUNC_SUFFIX = '…[truncated]'
    let em = s(ctx.errMsg)
    if (em.length > ERR_MSG_MAX) {
      em = em.slice(0, ERR_MSG_MAX - TRUNC_SUFFIX.length) + TRUNC_SUFFIX
    }
    return { em }
  }

  /** Push 事件特化字段。 */
  function pushFields(ctx: EventContext): StatData {
    if (ctx.lt !== '101' || !ctx.cid) return {}
    return { cid: s(ctx.cid) }
  }

  /**
   * 拼装最终上行体。
   *
   * 合并顺序（**后者覆盖前者**）：
   *   base → session → page → entry → visit → launch → error → push → custom
   * custom 放最后，业务可控扩展，但**不允许**覆盖 lt/t/sid 等关键字段（在此过滤）。
   */
  function build(ctx: EventContext): StatData {
    const safeCustom: StatData = {}
    if (ctx.custom) {
      const reserved = new Set([
        'lt',
        't',
        'sid',
        'cst',
        'did',
        'p',
        'on',
        'mpv',
        'domain',
        'fvts',
        'lvts',
        'tvc',
        'sc',
      ])
      for (const k of Object.keys(ctx.custom)) {
        if (!reserved.has(k)) safeCustom[k] = ctx.custom[k]
      }
    }
    const out: StatData = { lt: ctx.lt, t: n(ctx.t) }
    Object.assign(
      out,
      baseFields(),
      sessionFields(ctx),
      pageFields(ctx),
      entryFields(ctx),
      visitFields(ctx),
      launchFields(ctx),
      errorFields(ctx),
      pushFields(ctx),
      safeCustom
    )
    return out
  }

  return { build }
}
