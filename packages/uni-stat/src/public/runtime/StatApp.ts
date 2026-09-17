/**
 * 公有版统计运行时门面（单例）。
 *
 * 职责：
 *   1. `install(config?, overrides?)`：一次性装配 collector / channel / 拦截器；
 *      启动时 `migrateLegacyData` → `loadVisitSnapshot` → `recoverRetry`。
 *      重复 install 幂等。
 *   2. `report(type, value)`：业务侧 `uni.report(type, value)` 的承接入口。
 *   3. `reportError(e)`：错误兜底事件（lt=31）。
 *   4. `getCollector()` / `getDeps()`：测试与 lifecycleHooks 复用。
 *
 * 设计原则：
 *   - 所有 adapter 调用都包了 `tryRun`，单端缺失 API 不影响 install。
 *   - 所有依赖通过 `defaults + overrides` 构造；测试可注入替换。
 *   - install 不抛错；任何子步骤失败都吞掉并 logger.warn。
 *   - 单例：`StatApp.getInstance()` 全局唯一；`__resetStatApp()` 仅供测试。
 */

import {
  APP_CHANNEL_FIRST_FLUSH_DELAY_MS,
  CLOUD_MAX_RETRIES,
  HTTP_MAX_RETRIES,
  IMAGE_MAX_RETRIES,
  IMAGE_REPORT_DEFAULTS,
  MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS,
  MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT,
  REPORT_INTERVAL_SEC,
  STAT_VERSION_PUBLIC,
  getAppId,
} from '../config'
import { LT } from '../domain/eventTypes'
import { createCloudChannel } from '../pipeline/channel/cloud'
import { createCollector } from '../pipeline/collector'
import { createHttpChannel } from '../pipeline/channel/http'
import { createImageChannel } from '../pipeline/channel/image'
import { createStatDataBuilder } from '../domain/statData'
import { getAppChannel } from '../adapter/channel'
import { getPlatform, getRawPlatform, isApp } from '../adapter/platform'
import { getLocaleAndScreen, getSystemInfo } from '../adapter/system'
import { getUuid } from '../adapter/device'
import { getPackageInfo } from '../adapter/package'
import { getWebInfo } from '../adapter/web'
import { handleData } from '../pipeline/serializer'
import { installAllInterceptors } from '../interceptors'
import { logger } from '../infra/logger'
import { migrateLegacyData } from '../domain/migration'
import { nowMs, nowSec } from '../infra/time'
import { selectChannel } from '../pipeline/channel/selector'
import { setReportTitle } from '../domain/title'
import { tryRun } from '../infra/safe'
import { isVaporStatRuntime } from '../infra/uniRuntime'
import { isNetworkOffline, onNetworkOnline } from './networkGate'
import { getCurrentStatPageContext } from './lifecycleHooks'

import * as queue from '../pipeline/queue'
import * as retry from '../pipeline/retry'
import * as session from '../domain/session/machine'
import * as visit from '../domain/visit/firstVisit'

import type {
  CollectorAPI,
  CollectorDeps,
  ReportInput,
} from '../pipeline/collector'
import type { Channel } from '../pipeline/types'
import type { StatVersion } from '../pipeline/channel/selector'

export interface StatAppConfig {
  /** 统计 ak（appid 维度）；缺省取构建期 `process.env.UNI_APP_ID`。 */
  ak: string
  /** 当前应用版本号（v 字段）；缺省取 system.appVersion。 */
  v?: string
  /** 渠道；App 端始终取 `plus.runtime.channel`，非 App 端可由手动 install 配置。 */
  ch?: string
  /**
   * 统计协议版本（公有版默认 'image'）：
   *   - `'image'`：火山 TLS WebTrack.gif（公有版默认，**不再走云函数**）。后端 host/projectId/topicId
   *     是 SDK 内部参数，由维护者在 `config.ts/IMAGE_REPORT_DEFAULTS` 直接维护，**不通过 manifest 暴露**。
   *   - `'1'`    ：HTTP 1.0（旧 dcloud 通道，灰度调试用）
   *   - `'2'`    ：uniCloud 2.0（私有版兼容，需要业务侧自行注入 `__stat_uniCloud_space`）
   */
  version: StatVersion
  /**
   * 后台超时（秒），session 状态机 backgroundTimeoutSec。
   *
   * 对应 manifest 字段 `uniStatistics.backgroundTimeout`（公有版扩展，私有版无此字段）。
   * 默认 300。
   */
  backgroundTimeoutSec: number
  /**
   * 前台无操作超时（秒）。
   *
   * 对应 manifest 字段 `uniStatistics.pageInactiveTimeout`（公有版扩展，私有版无此字段）。
   * 默认 1800。
   */
  pageInactiveTimeoutSec: number
  /**
   * 上报间隔（秒）。
   *
   * 对应 manifest 字段 `uniStatistics.reportInterval`（与私有版字段同名同义）。
   * 默认 10；`0` = 立即上报（仅调试）。
   */
  reportIntervalSec: number
  /**
   * 是否采集 push ClientID（对应 lt=101）。
   *
   * 对应 manifest 字段 `uniStatistics.collectItems.uniPushClientID`，与私有版语义完全一致。
   * 默认 `false`（合规要求显式开启）。
   */
  enablePush: boolean
  /**
   * 是否上报页面日志（对应 lt=11）。
   *
   * 对应 manifest 字段 `uniStatistics.collectItems.uniStatPageLog`，与私有版语义完全一致：
   * 仅控制**页面切换事件 lt=11** 的上报；**不影响** lt=1（Launch）、lt=3（AppHide）、
   * lt=21（自定义事件）、lt=31（错误）。
   * 默认 `true`。
   */
  enablePageLog: boolean
}

export interface StatAppOverrides {
  /** 测试用：注入自定义 channels。 */
  channels?: { http?: Channel; cloud?: Channel | null; image?: Channel | null }
  /** 测试用：覆盖部分 collector deps（深合并到 base）。 */
  collectorDepsPatch?: Partial<CollectorDeps>
  /** 测试用：跳过 installAllInterceptors。 */
  skipInterceptors?: boolean
  /** 测试用：跳过 migrateLegacyData。 */
  skipMigration?: boolean
  /** 测试用：跳过 recoverRetry。 */
  skipRecoverRetry?: boolean
  /** Vapor：首个 session 建立前暂存事件，避免产生无 sid 数据。 */
  deferReportsUntilSession?: boolean
}

let instance: StatApp | null = null
const MAX_DEFERRED_REPORTS = 100

export class StatApp {
  /** install 幂等哨兵。 */
  private installed = false
  /** 拦截器解绑函数。 */
  private uninstallInterceptors?: () => void
  /** 网络恢复监听解绑。 */
  private uninstallNetworkWatch?: () => void
  /** Collector 实例（install 后才有效）。 */
  private collector?: CollectorAPI
  /** Collector 依赖；测试与 lifecycleHooks 通过 getDeps 访问。 */
  private collectorDeps?: CollectorDeps
  /** 通道实例（已解析）。 */
  private httpChannel?: Channel
  private cloudChannel?: Channel
  private imageChannel?: Channel
  /** 已生效的协议版本（'1' / '2' / 'image'）。 */
  private statVersion: StatVersion = 'image'
  /** 当前生效的配置；测试用 getConfig 获取。 */
  private config?: StatAppConfig
  /** Vapor setup 早于 onLaunch 时的短暂内存队列。 */
  private deferredReports: ReportInput[] = []
  private deferReportsUntilSession = false
  private deferredReportsWarningShown = false

  static getInstance(): StatApp {
    if (!instance) instance = new StatApp()
    return instance
  }

  /**
   * 一次性装配。重复调用直接返回。
   *
   * @param config 业务配置；缺省值兼容私有版默认行为。
   * @param overrides 测试钩子。
   */
  install(
    config: Partial<StatAppConfig> = {},
    overrides: StatAppOverrides = {}
  ): void {
    if (this.installed) return

    const cfg = this.normalizeConfig(config)
    this.config = cfg
    this.statVersion = cfg.version
    this.deferReportsUntilSession = overrides.deferReportsUntilSession === true

    tryRun(
      () =>
        session.configure({
          backgroundTimeoutSec: cfg.backgroundTimeoutSec,
          pageInactiveTimeoutSec: cfg.pageInactiveTimeoutSec,
        }),
      undefined
    )
    tryRun(
      () => queue.configure({ intervalSec: cfg.reportIntervalSec }),
      undefined
    )

    if (!overrides.skipMigration) {
      tryRun(() => migrateLegacyData(), false)
    }
    tryRun(() => visit.loadVisitSnapshot(), undefined)

    this.httpChannel =
      overrides.channels?.http ??
      createHttpChannel({ ut: getPlatform(), maxRetries: HTTP_MAX_RETRIES })

    // cloud：仅在用户明确选择 channelVersion=2 或测试 override 时构造，
    // 公有版默认路径不会创建 cloud，避免触发"cloud channel unavailable"误降级警告。
    if (overrides.channels && 'cloud' in overrides.channels) {
      this.cloudChannel = overrides.channels.cloud ?? undefined
    } else if (this.statVersion === '2') {
      this.cloudChannel = createCloudChannel({ maxRetries: CLOUD_MAX_RETRIES })
    } else {
      this.cloudChannel = undefined
    }

    // image：公有版默认通道。host/projectId/topicId 来自 config.IMAGE_REPORT_DEFAULTS，
    // 由 SDK 维护者直接在源码中调整，**不暴露**到 manifest / runtime API；
    // 测试场景仍可通过 overrides.channels.image 注入伪通道做断言。
    if (overrides.channels && 'image' in overrides.channels) {
      this.imageChannel = overrides.channels.image ?? undefined
    } else if (this.statVersion === 'image') {
      this.imageChannel = createImageChannel({
        host: IMAGE_REPORT_DEFAULTS.host,
        projectId: IMAGE_REPORT_DEFAULTS.projectId,
        topicId: IMAGE_REPORT_DEFAULTS.topicId,
        maxRetries: IMAGE_MAX_RETRIES,
        ut: getPlatform(),
        rawPlatform: getRawPlatform(),
      })
    } else {
      this.imageChannel = undefined
    }

    this.collectorDeps = this.buildCollectorDeps(
      cfg,
      overrides.collectorDepsPatch ?? {}
    )
    this.collector = createCollector(this.collectorDeps)

    if (!overrides.skipInterceptors) {
      this.uninstallInterceptors = tryRun(
        () => installAllInterceptors({ report: (i) => this.reportInput(i) }),
        undefined
      )
    }

    if (!overrides.skipRecoverRetry) {
      void this.collector
        .recoverRetry()
        .catch((e) => logger.warn('[uni统计 2.0] recoverRetry failed', e))
    }

    // 公有版：监听网络恢复，立即续传 + 强制 flush（与私有版 core 实现分离）
    this.uninstallNetworkWatch = tryRun(
      () =>
        onNetworkOnline(() => {
          const c = this.collector
          if (!c) return
          void c
            .recoverRetry()
            .catch((e) =>
              logger.warn('[uni统计 2.0] recoverRetry on online failed', e)
            )
          void c
            .flush(true)
            .catch((e) =>
              logger.warn('[uni统计 2.0] flush on online failed', e)
            )
        }),
      undefined
    )

    // 仅在 collector 与拦截器等就绪后再标记，避免中途抛错导致「已 install 却无 collector」。
    this.installed = true
  }

  /**
   * 业务侧 `uni.report(type, value)` 入口。
   *
   * 兼容私有版语义：
   *   - `type === 'title'` → 写 reportTitle，不发事件；下次 lt=11 / lt=3 携带 `ttc`。
   *   - 其他 type → 自定义事件 lt=21，custom `{ e_n: type, e_v: value }`。
   */
  report(type: string, value?: unknown): void {
    if (!this.installed || !this.collector) return
    if (type === 'title') {
      setReportTitle(value)
      return
    }
    const ev =
      typeof value === 'object' && value !== null
        ? tryRun(() => JSON.stringify(value), '')
        : value === undefined
        ? ''
        : String(value)
    this.reportInput({
      lt: LT.Event,
      custom: { e_n: type, e_v: ev },
    })
  }

  /** 上报 onError 捕获的错误。 */
  reportError(err: unknown, eventTimeSec?: number): void {
    if (!this.installed || !this.collector) return
    const errMsg =
      err instanceof Error
        ? `${err.name}: ${err.message}\n${err.stack ?? ''}`
        : typeof err === 'string'
        ? err
        : tryRun(() => JSON.stringify(err), '')
    this.reportInput({ lt: LT.Error, errMsg, t: eventTimeSec })
  }

  /** 首个 session 前统一暂存事件；非 Vapor 直接透传 collector。 */
  private reportInput(input: ReportInput): void {
    if (!this.collector) return
    const pageContext =
      input.lt === LT.Event || input.lt === LT.Error
        ? getCurrentStatPageContext()
        : undefined
    const item = Object.assign(
      {},
      pageContext,
      input,
      input.t === undefined ? { t: nowSec() } : undefined
    )
    // Vapor setup 可能读到上次进程持久化的 session；在本次 onLaunch 明确释放前
    // 必须无条件暂存，否则 setup 事件会带旧 sid，与同批 lt=1 的新 sid 不一致。
    if (this.deferReportsUntilSession) {
      if (this.deferredReports.length >= MAX_DEFERRED_REPORTS) {
        if (!this.deferredReportsWarningShown) {
          this.deferredReportsWarningShown = true
          logger.warn(
            '[vapor] 启动前事件暂存超过上限，后续事件已丢弃，请检查 uni.onBeforeAppRoute 是否可用',
            'limit=' + MAX_DEFERRED_REPORTS
          )
        }
        return
      }
      this.deferredReports.push(item)
      return
    }
    this.collector.report(item)
  }

  /** onLaunch 建立 session 后释放 setup 阶段暂存的事件。 */
  releaseDeferredReports(): void {
    if (!this.collector || !session.getSnapshot()) return
    this.deferReportsUntilSession = false
    const pending = this.deferredReports.splice(0)
    for (const input of pending) this.collector.report(input)
  }

  /** 取 collector，供 lifecycleHooks 调度生命周期事件。 */
  getCollector(): CollectorAPI | undefined {
    return this.collector
  }

  /** 取 deps（测试用）。 */
  getDeps(): CollectorDeps | undefined {
    return this.collectorDeps
  }

  /** 是否已 install。 */
  isInstalled(): boolean {
    return this.installed
  }

  /** 当前协议版本。 */
  getStatVersion(): StatVersion {
    return this.statVersion
  }

  /** 当前生效配置（含默认值合并），测试用。 */
  getConfig(): StatAppConfig | undefined {
    return this.config
  }

  /**
   * 卸载（测试 / hot reload）。
   *
   * 解绑全部拦截器、清空内部句柄。**不**清外部模块（queue/visit/session）状态，
   * 那些由各自的 `__reset*` 在测试 setup 中处理。
   */
  uninstall(): void {
    if (this.uninstallInterceptors) {
      tryRun(() => this.uninstallInterceptors!(), undefined)
    }
    this.uninstallInterceptors = undefined
    if (this.uninstallNetworkWatch) {
      tryRun(() => this.uninstallNetworkWatch!(), undefined)
    }
    this.uninstallNetworkWatch = undefined
    // 先释放 collector 内部定时器（取消延迟首 flush），再丢弃引用，避免幽灵 flush。
    if (this.collector) {
      tryRun(() => this.collector!.destroy(), undefined)
    }
    this.collector = undefined
    this.collectorDeps = undefined
    this.httpChannel = undefined
    this.cloudChannel = undefined
    this.imageChannel = undefined
    this.config = undefined
    this.deferredReports = []
    this.deferReportsUntilSession = false
    this.deferredReportsWarningShown = false
    this.installed = false
  }

  /**
   * 解析上行渠道字段 `ch`。
   *
   * App 渠道包标识只能以原生运行时为准：`plus.runtime.channel`。
   * `manifest.uniStatistics.ch` 是静态配置，不能区分同一项目打出的多渠道包。
   * 非 App 端没有 `plus.runtime.channel` 语义，保留手动 install 传入 `ch` 的能力。
   */
  private resolveChannel(explicit?: string): string {
    if (isApp()) {
      return getAppChannel()
    }
    if (typeof explicit === 'string' && explicit.length > 0) {
      return explicit
    }
    return ''
  }

  private resolveFirstFlushDeferMs(): number {
    if (
      getRawPlatform() === 'mp-weixin' &&
      MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT
    ) {
      return MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS
    }
    if (isApp() && !getAppChannel()) {
      return APP_CHANNEL_FIRST_FLUSH_DELAY_MS
    }
    return 0
  }

  private normalizeConfig(c: Partial<StatAppConfig>): StatAppConfig {
    return {
      ak: c.ak ?? getAppId(),
      v: c.v,
      ch: this.resolveChannel(c.ch),
      version: c.version ?? 'image',
      backgroundTimeoutSec: c.backgroundTimeoutSec ?? 300,
      pageInactiveTimeoutSec: c.pageInactiveTimeoutSec ?? 1800,
      reportIntervalSec:
        typeof c.reportIntervalSec === 'number'
          ? c.reportIntervalSec
          : REPORT_INTERVAL_SEC,
      // collectItems 默认值与私有版严格对齐：push 默认关闭、页面日志默认开启
      enablePush: c.enablePush === true,
      enablePageLog: c.enablePageLog !== false,
    }
  }

  /**
   * 构建 collector 依赖。所有 adapter 调用都包了 `tryRun`，避免单端缺失 API 导致
   * install 失败。
   */
  private buildCollectorDeps(
    cfg: StatAppConfig,
    patch: Partial<CollectorDeps>
  ): CollectorDeps {
    const platformShort = getPlatform()
    const initialLocale = tryRun(() => getLocaleAndScreen(), {
      lang: '',
      ww: 0,
      wh: 0,
      sw: 0,
      sh: 0,
      pr: 1,
    })
    const builder = createStatDataBuilder({
      config: {
        ak: cfg.ak,
        usv: STAT_VERSION_PUBLIC,
        v: cfg.v,
        get ch() {
          return isApp() ? getAppChannel() : cfg.ch
        },
      },
      platform: {
        ut: platformShort,
      },
      system: tryRun(() => getSystemInfo(), {
        brand: '',
        md: '',
        sv: '',
        v: '',
        ut: 'unknown',
        appVersion: '',
        appWgtVersion: '',
        mpvHostVersion: '',
        on: '',
        sdkVersion: '',
        statusBarHeight: 0,
        osP: '',
      }),
      locale: initialLocale,
      resolveLocale: isVaporStatRuntime()
        ? () => {
            const current = tryRun(() => getLocaleAndScreen(), initialLocale)
            if (current.ww <= 0) current.ww = current.sw
            if (current.wh <= 0) current.wh = current.sh
            return current
          }
        : undefined,
      device: {
        // 惰性解析：每次 build 时再调 getUuid()，避免 install 过早（uni 运行时未就绪）冻结临时值。
        get uuid() {
          return tryRun(() => getUuid(), '')
        },
      },
      net: { net: 'unknown', raw: '' },
      location: { lat: '', lng: '', ok: false },
      pkg: tryRun(() => getPackageInfo(), {
        mpn: '',
        tdaid: '',
        pkn: '',
        an: '',
      }),
      web: tryRun(() => getWebInfo(), { domain: '' }),
    })

    const base: CollectorDeps = {
      builder,
      queue: {
        enqueue: queue.enqueue,
        flush: queue.flush,
        rollback: queue.rollback,
        shouldFlush: queue.shouldFlush,
      },
      serializer: { handleData },
      selectChannel: () =>
        selectChannel({
          version: this.statVersion,
          http: this.httpChannel,
          cloud: this.cloudChannel,
          image: this.imageChannel,
        }),
      retry: {
        persist: retry.persist,
        loadAll: retry.loadAll,
        ack: retry.ack,
        markAttempt: retry.markAttempt,
      },
      visit: {
        commitVisitOnAck: visit.commitVisitOnAck,
        rollbackPendingVisit: visit.rollbackPendingVisit,
      },
      session: {
        getSnapshot: session.getSnapshot,
        nextSeq: session.nextSeq,
        touch: session.touch,
      },
      config: { usv: STAT_VERSION_PUBLIC },
      resolveUploadFields: () => {
        const ch = getAppChannel()
        return ch ? { ch } : {}
      },
      nowMs,
      nowSec,
      firstFlushDeferMs: this.resolveFirstFlushDeferMs(),
      isNetworkOffline,
    }

    return Object.assign(base, patch)
  }
}

/**
 * 便捷 API：获取或创建当前应用 collector，供拦截器 / lifecycleHooks 使用。
 *
 * 上层若希望直接拿 lt 入参，可先 `getStatApp().install(cfg)`，再
 * `getStatApp().getCollector()?.report({ lt, ... })`。
 */
export function getStatApp(): StatApp {
  return StatApp.getInstance()
}

/** 仅供测试：销毁全局单例与 install 状态（不会重置 queue/visit/session）。 */
export function __resetStatApp(): void {
  if (instance) {
    instance.uninstall()
    instance = null
  }
}
