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
  CLOUD_MAX_RETRIES,
  HTTP_MAX_RETRIES,
  REPORT_INTERVAL_SEC,
  STAT_VERSION_PUBLIC,
  getAppId,
} from '../config'
import { LT } from '../domain/eventTypes'
import { createCloudChannel } from '../pipeline/channel/cloud'
import { createCollector } from '../pipeline/collector'
import { createHttpChannel } from '../pipeline/channel/http'
import { createStatDataBuilder } from '../domain/statData'
import { getClientOs, getPlatform } from '../adapter/platform'
import { getLocaleAndScreen, getSystemInfo } from '../adapter/system'
import { getOdid, getUuid } from '../adapter/device'
import { getPackageInfo } from '../adapter/package'
import { handleData } from '../pipeline/serializer'
import { installAllInterceptors } from '../interceptors'
import { logger } from '../infra/logger'
import { migrateLegacyData } from '../domain/migration'
import { nowMs, nowSec } from '../infra/time'
import { selectChannel } from '../pipeline/channel/selector'
import { setReportTitle } from '../domain/title'
import { tryRun } from '../infra/safe'

import * as queue from '../pipeline/queue'
import * as retry from '../pipeline/retry'
import * as session from '../domain/session/machine'
import * as visit from '../domain/visit/firstVisit'

import type {
  CollectorAPI,
  CollectorDeps,
} from '../pipeline/collector'
import type { Channel } from '../pipeline/types'
import type { StatVersion } from '../pipeline/channel/selector'

export interface StatAppConfig {
  /** 统计 ak（appid 维度）；缺省取构建期 `process.env.UNI_APP_ID`。 */
  ak: string
  /** 当前应用版本号（v 字段）；缺省取 system.appVersion。 */
  v?: string
  /** 渠道；缺省 ''。 */
  ch?: string
  /** 统计协议版本：'1' 走 http，'2' 走 cloud（默认 '2'）。 */
  version: StatVersion
  /** 后台超时（秒），session 状态机 backgroundTimeoutSec。 */
  backgroundTimeoutSec: number
  /** 前台无操作超时（秒）。 */
  pageInactiveTimeoutSec: number
  /** 上报间隔（秒）。 */
  reportIntervalSec: number
}

export interface StatAppOverrides {
  /** 测试用：注入自定义 channels。 */
  channels?: { http?: Channel; cloud?: Channel | null }
  /** 测试用：覆盖部分 collector deps（深合并到 base）。 */
  collectorDepsPatch?: Partial<CollectorDeps>
  /** 测试用：跳过 installAllInterceptors。 */
  skipInterceptors?: boolean
  /** 测试用：跳过 migrateLegacyData。 */
  skipMigration?: boolean
  /** 测试用：跳过 recoverRetry。 */
  skipRecoverRetry?: boolean
}

let instance: StatApp | null = null

export class StatApp {
  /** install 幂等哨兵。 */
  private installed = false
  /** 拦截器解绑函数。 */
  private uninstallInterceptors?: () => void
  /** Collector 实例（install 后才有效）。 */
  private collector?: CollectorAPI
  /** Collector 依赖；测试与 lifecycleHooks 通过 getDeps 访问。 */
  private collectorDeps?: CollectorDeps
  /** 通道实例（已解析）。 */
  private httpChannel?: Channel
  private cloudChannel?: Channel
  /** 已生效的协议版本（'1' / '2'）。 */
  private statVersion: StatVersion = '2'
  /** 当前生效的配置；测试用 getConfig 获取。 */
  private config?: StatAppConfig

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
  install(config: Partial<StatAppConfig> = {}, overrides: StatAppOverrides = {}): void {
    if (this.installed) return
    this.installed = true

    const cfg = this.normalizeConfig(config)
    this.config = cfg
    this.statVersion = cfg.version

    tryRun(
      () =>
        session.configure({
          backgroundTimeoutSec: cfg.backgroundTimeoutSec,
          pageInactiveTimeoutSec: cfg.pageInactiveTimeoutSec,
        }),
      undefined,
    )
    tryRun(() => queue.configure({ intervalSec: cfg.reportIntervalSec }), undefined)

    if (!overrides.skipMigration) {
      tryRun(() => migrateLegacyData(), false)
    }
    tryRun(() => visit.loadVisitSnapshot(), undefined)

    this.httpChannel =
      overrides.channels?.http ??
      createHttpChannel({ ut: getPlatform(), maxRetries: HTTP_MAX_RETRIES })

    if (overrides.channels && 'cloud' in overrides.channels) {
      this.cloudChannel = overrides.channels.cloud ?? undefined
    } else if (this.statVersion === '2') {
      this.cloudChannel = createCloudChannel({ maxRetries: CLOUD_MAX_RETRIES })
    } else {
      this.cloudChannel = undefined
    }

    this.collectorDeps = this.buildCollectorDeps(cfg, overrides.collectorDepsPatch ?? {})
    this.collector = createCollector(this.collectorDeps)

    if (!overrides.skipInterceptors) {
      const c = this.collector
      this.uninstallInterceptors = tryRun(
        () => installAllInterceptors({ report: (i) => c.report(i) }),
        undefined,
      )
    }

    if (!overrides.skipRecoverRetry) {
      void this.collector
        .recoverRetry()
        .catch((e) => logger.warn('[uni-stat] recoverRetry failed', e))
    }
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
    this.collector.report({
      lt: LT.Event,
      custom: { e_n: type, e_v: ev },
    })
  }

  /** 上报 onError 捕获的错误。 */
  reportError(err: unknown): void {
    if (!this.installed || !this.collector) return
    const errMsg =
      err instanceof Error
        ? `${err.name}: ${err.message}\n${err.stack ?? ''}`
        : typeof err === 'string'
          ? err
          : tryRun(() => JSON.stringify(err), '')
    this.collector.report({ lt: LT.Error, errMsg })
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
    this.collector = undefined
    this.collectorDeps = undefined
    this.httpChannel = undefined
    this.cloudChannel = undefined
    this.config = undefined
    this.installed = false
  }

  private normalizeConfig(c: Partial<StatAppConfig>): StatAppConfig {
    return {
      ak: c.ak ?? getAppId(),
      v: c.v,
      ch: c.ch ?? '',
      version: c.version ?? '2',
      backgroundTimeoutSec: c.backgroundTimeoutSec ?? 300,
      pageInactiveTimeoutSec: c.pageInactiveTimeoutSec ?? 1800,
      reportIntervalSec:
        typeof c.reportIntervalSec === 'number' ? c.reportIntervalSec : REPORT_INTERVAL_SEC,
    }
  }

  /**
   * 构建 collector 依赖。所有 adapter 调用都包了 `tryRun`，避免单端缺失 API 导致
   * install 失败。
   */
  private buildCollectorDeps(
    cfg: StatAppConfig,
    patch: Partial<CollectorDeps>,
  ): CollectorDeps {
    const platformShort = getPlatform()
    const clientOs = getClientOs()
    const builder = createStatDataBuilder({
      config: { ak: cfg.ak, usv: STAT_VERSION_PUBLIC, v: cfg.v, ch: cfg.ch },
      platform: {
        ut: platformShort,
        p: clientOs === 'unknown' ? '' : clientOs,
      },
      system: tryRun(() => getSystemInfo(), {
        brand: '',
        md: '',
        sv: '',
        v: '',
        ut: 'unknown',
        appVersion: '',
        appWgtVersion: '',
        sdkVersion: '',
        statusBarHeight: 0,
      }),
      locale: tryRun(() => getLocaleAndScreen(), {
        lang: '',
        ww: 0,
        wh: 0,
        sw: 0,
        sh: 0,
        pr: 1,
      }),
      device: {
        uuid: tryRun(() => getUuid(), ''),
        odid: tryRun(() => getOdid(), ''),
      },
      net: { net: 'unknown', raw: '' },
      location: { lat: '', lng: '', ok: false },
      pkg: tryRun(() => getPackageInfo(), { tdaid: '', pkn: '', an: '' }),
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
          http: this.httpChannel!,
          cloud: this.cloudChannel,
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
        consumePrevId: session.consumePrevId,
      },
      config: { usv: STAT_VERSION_PUBLIC },
      nowMs,
      nowSec,
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
