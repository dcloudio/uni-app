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
 *   - 事件类型驱动：lt=0/1 才带 fvts/lvts/tvc 等规则在此实现，调用方不再判断。
 *   - 仅做拼装，不做副作用：不写 storage、不调 ensureSession（这些由 collector 编排）。
 *   - 严守 ES2015 baseline：禁用 `ObjectExpression > SpreadElement`，统一用 `Object.assign`。
 */

import { type IEYValue, type LTValue, toIey } from './eventTypes'

import type { LocaleAndScreen, SystemInfoStatic } from '../adapter/system'
import type { LocationResult } from '../adapter/location'
import type { NetResult } from '../adapter/network'
import type { PackageInfo } from '../adapter/package'
import type { Platform } from '../adapter/platform'
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
  /** 上一页停留秒数，lt=11/3 必填。 */
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
  /** 上一会话 sid；仅新 session 第一条事件携带，由 collector 通过 consumePrevId 取。 */
  pid?: string
  /** 是否为入口页（任意输入，统一转 0/1）。 */
  iey?: unknown
  /** 上一页是否为入口页。 */
  ppiey?: unknown
  /** 访问字段（仅 lt=0/1 且首次构建时携带）。 */
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
  /** 平台与 OS。 */
  platform: { ut: Platform | string; p: 'a' | 'i' | 'h' | '' }
  /** 设备 / 系统静态信息。 */
  system: SystemInfoStatic
  /** 实时 locale + 屏幕。 */
  locale: LocaleAndScreen
  /** 设备 ID。 */
  device: { uuid: string; odid: string }
  /** 网络快照（异步获取后由 collector 缓存）。 */
  net: NetResult
  /** 位置快照（默认全空）。 */
  location: LocationResult
  /** 包信息（tdaid/pkn/an）。 */
  pkg: PackageInfo
  /** 私有版兼容字段（如 mpn）。 */
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
   * 字段映射（与私有版 1:1）：
   *   - `mpsdk` ← `system.sdkVersion`
   *   - `pr/ww/wh/sw/sh/lang` 来自 `locale`（实时取，修复缺陷 #18）
   *   - `lat/lng` 当前 LocationResult 仅含字符串经纬度，cn/pn/ct 留空待 adapter 扩展
   */
  function baseFields(): StatData {
    const { config, platform, system, locale, device, net, location, pkg, legacy } = deps
    return {
      ak: s(config.ak),
      usv: s(config.usv),
      v: s(config.v ?? system.appVersion),
      ch: s(config.ch),
      ut: s(platform.ut),
      p: s(platform.p),
      uuid: s(device.uuid),
      odid: s(device.odid),
      brand: s(system.brand),
      md: s(system.md),
      sv: s(system.sv),
      mpsdk: s(system.sdkVersion),
      mpv: s(system.appWgtVersion),
      pr: n(locale.pr, 1),
      ww: n(locale.ww),
      wh: n(locale.wh),
      sw: n(locale.sw),
      sh: n(locale.sh),
      lang: s(locale.lang),
      net: s(net.net, 'unknown'),
      lat: s(location.lat),
      lng: s(location.lng),
      mpn: s(legacy?.mpn),
      tdaid: s(pkg.tdaid),
      pkn: s(pkg.pkn),
      an: s(pkg.an),
    }
  }

  /** 会话字段：所有 lt 都要带。 */
  function sessionFields(ctx: EventContext): StatData {
    if (!ctx.session) return {}
    const out: StatData = {
      sid: ctx.session.sid,
      sst: ctx.session.sst,
      sct: ctx.session.sct,
      seq: ctx.session.seq,
    }
    if (ctx.pid) out.pid = ctx.pid
    return out
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

  /** 入口标记：lt=11/3 携带 iey/ppiey；其他事件不携带。 */
  function entryFields(ctx: EventContext): StatData {
    if (ctx.lt !== '11' && ctx.lt !== '3') return {}
    const out: StatData = {}
    if (ctx.iey !== undefined) out.iey = toIey(ctx.iey) as IEYValue
    if (ctx.ppiey !== undefined) out.ppiey = toIey(ctx.ppiey) as IEYValue
    return out
  }

  /** 访问字段：仅 lt=0/1 且 collector 显式传入 visit 时携带。 */
  function visitFields(ctx: EventContext): StatData {
    if (ctx.lt !== '0' && ctx.lt !== '1') return {}
    if (!ctx.visit) return {}
    return {
      fvts: ctx.visit.fvts,
      lvts: ctx.visit.lvts,
      tvc: ctx.visit.tvc,
    }
  }

  /** 启动场景：lt=0/1 携带。 */
  function launchFields(ctx: EventContext): StatData {
    if (ctx.lt !== '0' && ctx.lt !== '1') return {}
    if (ctx.sc === undefined) return {}
    return { sc: s(ctx.sc) }
  }

  /** 错误事件特化字段。 */
  function errorFields(ctx: EventContext): StatData {
    if (ctx.lt !== '31' || !ctx.errMsg) return {}
    return { em: s(ctx.errMsg) }
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
        'sst',
        'sct',
        'seq',
        'pid',
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
      safeCustom,
    )
    return out
  }

  return { build }
}
