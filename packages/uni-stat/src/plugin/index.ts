import debug from 'debug'
import { once } from '@dcloudio/uni-shared'

import {
  M,
  defineUniMainJsPlugin,
  getUniStatistics,
  isNormalCompileTarget,
  isSsr,
  parseManifestJsonOnce,
  parsePagesJson,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
import type { ConfigEnv, UserConfig } from 'vite'

import {
  shouldAutoImportStatRuntime,
  shouldBootstrapVaporRuntime,
  shouldRunStatRuntime,
} from './runtimeEnable'
import { resolvePublicStatImportPath } from './statRuntime'

type StatType = 'public' | 'private'

/**
 * 解析统计版本类型（公有版 / 私有版）。
 * - 优先 `type`；缺失时回退旧版 `version`（2=private，其余=public）。
 */
function resolveUniStatisticsType(
  statConfig: Record<string, unknown>
): StatType {
  const type = String(statConfig?.type ?? '').trim()
  if (type === 'public' || type === 'private') {
    return type
  }
  const versionNum = Number(statConfig?.version)
  return versionNum === 2 ? 'private' : 'public'
}

const uniStatLog = once((text: string) => {
  console.log()
  console.warn(text)
  console.log()
})

/** 与 `public/config.ts#MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT` 保持一致。 */
const MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT = true

/** 公有版小程序 GET 上报域名（与 `public/config.ts#IMAGE_REPORT_DEFAULTS.host` 一致）。 */
const STAT_MP_REQUEST_DOMAIN = 'tongji-collector.dcloud.net.cn'

const STAT_MP_DOMAIN_DOC_URL =
  'https://uniapp.dcloud.net.cn/uni-stat-public.html'

/**
 * 构建期「统计已开启」提示文案（不依赖 i18n 占位符，避免 HBuilderX 内置文案仍为 `{version}` 时原样输出）。
 * - public：已开启 uni 统计 2.0
 * - private：已开启 uni 统计 2.0（私有版）
 */
function formatStatEnabledTip(statType: StatType): string {
  return statType === 'private'
    ? '已开启 uni统计 2.0（私有版）'
    : '已开启 uni统计 2.0'
}

/**
 * 构建期小程序 request 合法域名提示（单条合并「已开启」与域名说明）。
 */
function formatMpStatDomainTip(): string {
  return `已开启 uni统计 2.0，为保障数据正常上报，请在小程序后台配置 request 合法域名：${STAT_MP_REQUEST_DOMAIN}。详情：${STAT_MP_DOMAIN_DOC_URL}`
}

/**
 * 是否需要在构建期提示配置小程序 request 合法域名。
 * 微信默认 preload 信标不走 uni.request，无需配置；开关关闭时与其它小程序一致。
 */
function shouldShowMpDomainTip(platform: string, statType: StatType): boolean {
  if (statType !== 'public' || !platform.startsWith('mp-')) {
    return false
  }
  if (platform === 'mp-weixin' && MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT) {
    return false
  }
  return true
}

/**
 * 输出构建期「统计已开启」提示：小程序公有版（需配置域名）走合并文案，其余走简短文案。
 */
function logStatEnabledTip(platform: string, statType: StatType): void {
  if (shouldShowMpDomainTip(platform, statType)) {
    uniStatLog(formatMpStatDomainTip())
    return
  }
  uniStatLog(formatStatEnabledTip(statType))
}

export default () => [
  defineUniMainJsPlugin((opts) => {
    /**
     * 统计类型（仅用于新编译器）：
     * - public：公有版（uni-stat-public）
     * - private：私有版（uni-cloud-stat）
     *
     * 兼容策略：
     * - 优先读取 manifest.uniStatistics.type（public/private）
     * - type 缺失或非法时，回退旧版 version（2=private，其余=public）
     */
    let statType: StatType = 'public'
    let isEnable = false
    let shouldImportRuntime = false
    let vaporLifecycleEnabled = false
    let currentPlatform = process.env.UNI_PLATFORM || ''
    const stats: Record<string, string> = {
      '@dcloudio/uni-stat': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-stat.es.js'
      ),
      '@dcloudio/uni-cloud-stat': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-cloud-stat.es.js'
      ),
      '@dcloudio/uni-cloud-stat-vapor': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-cloud-stat-vapor.es.js'
      ),
      '@dcloudio/uni-stat-public': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-stat-public.es.js'
      ),
      '@dcloudio/uni-stat-public-mp-weixin': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-stat-public.mp-weixin.es.js'
      ),
    }

    return {
      name: 'uni:stat',
      enforce: 'pre',
      config(config: UserConfig, env: ConfigEnv) {
        if (!isNormalCompileTarget()) {
          // 不需要统计
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_PLATFORM!
        currentPlatform = platform
        const titlesJson = Object.create(null)
        parsePagesJson(inputDir, platform).pages.forEach((page: any) => {
          const style = page.style || {}
          const titleText =
            // MP
            style.navigationBarTitleText ||
            // H5 || App
            style.navigationBar?.titleText ||
            ''
          if (titleText) {
            titlesJson[page.path] = titleText
          }
        })
        // 注意：勿在此对 mp- + UNI_APP_X 提前 return。
        // 提前 return 会导致后续未执行 getUniStatistics / UNI_STATISTICS_CONFIG，
        // 小程序公有版运行时 manifest（backgroundTimeout / reportInterval 等）全部丢失，仍走默认值；
        // H5 不走 mp- 分支故无此问题。标题 JSON 与统计配置在同一套 define 末尾统一注入。
        // ssr 时不开启
        if (!isSsr(env.command, config)) {
          const statConfig = getUniStatistics(inputDir, platform)
          // 始终注入完整 manifest.uniStatistics（与 enable 无关）。
          // enable 仅控制是否注入完整统计入口或 Vapor 桥接；业务手动 import 或
          // enable:false 调试时，运行时仍须能读到 backgroundTimeout / reportInterval 等字段。
          process.env.UNI_STATISTICS_CONFIG = JSON.stringify(statConfig)
          process.env.UNI_STAT_DEBUG = statConfig.debug ? 'true' : 'false'
          statType = resolveUniStatisticsType(statConfig)
          // Web / 微信小程序和 Vapor App 走 route bridge；VDOM App 保持关闭。
          shouldImportRuntime = shouldAutoImportStatRuntime(inputDir, platform)
          vaporLifecycleEnabled = shouldBootstrapVaporRuntime(
            inputDir,
            platform
          )
          isEnable = shouldImportRuntime || vaporLifecycleEnabled

          // 本地运行默认不采集，避免开发数据污染；发行构建仍只受 enable 控制。
          if (isEnable && !shouldRunStatRuntime(statConfig.debug)) {
            shouldImportRuntime = false
            vaporLifecycleEnabled = false
            isEnable = false
            uniStatLog(
              '本地运行未开启 manifest.json 的 uniStatistics.debug，uni统计不采集、不上报；发行模式不受影响'
            )
          }

          if (isEnable) {
            const uniCloudConfig = statConfig.uniCloud || {}
            process.env.UNI_STAT_UNI_CLOUD = JSON.stringify(uniCloudConfig)
            // 公有版字段 `an` 兜底：注入 manifest.json#name 到 process.env.UNI_APP_NAME，
            // 由 `public/adapter/package.ts#getEnvAppName` 读取。任意阶段读 manifest 失败
            // 都走 try/catch，不阻断构建。
            try {
              const manifestForName = parseManifestJsonOnce(inputDir)
              if (manifestForName && typeof manifestForName.name === 'string') {
                process.env.UNI_APP_NAME = manifestForName.name
              }
            } catch (e) {
              debug('uni:stat')('parse manifest for UNI_APP_NAME failed', e)
            }
            if (process.env.NODE_ENV === 'production') {
              const manifestJson = parseManifestJsonOnce(inputDir)
              if (!manifestJson.appid) {
                uniStatLog(M['stat.warn.appid'])
                isEnable = false
              } else {
                logStatEnabledTip(platform, statType)
              }
            } else {
              logStatEnabledTip(platform, statType)
            }
          }

          debug('uni:stat')('isEnable', isEnable, 'type', statType)
        }

        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
        return {
          define: {
            // 与 UNI_APP_NAME 同理：外层 JSON.stringify 才能得到合法的内联字符串字面量
            'process.env.UNI_STAT_TITLE_JSON': JSON.stringify(
              process.env.UNI_STAT_TITLE_JSON ?? '{}'
            ),
            'process.env.UNI_STAT_UNI_CLOUD': JSON.stringify(
              process.env.UNI_STAT_UNI_CLOUD ?? '{}'
            ),
            // 注意：define 的 value 是「替换后的源码字面量」，必须 JSON.stringify 一次，
            // 否则 'true' / 'false' 字符串会被当成布尔字面量替换进源码，导致
            // dist 中 `process.env.UNI_STAT_DEBUG === 'true'` 永远等于 false（公有版调试日志失效根因）。
            'process.env.UNI_STAT_DEBUG': JSON.stringify(
              process.env.UNI_STAT_DEBUG ?? 'false'
            ),
            // 与 UNI_STAT_TITLE_JSON 同理：`statConfig` 已是 JSON 字符串，若不经
            // JSON.stringify 再包一层，esbuild/vite define 会把串内 `"` 当成源码边界，
            // 运行时替换结果残缺 → JSON.parse 失败 → readManifestStatConfig 静默回退，
            // manifest 里的 backgroundTimeout / pageInactiveTimeout 等全部丢失（表现为默认 300/1800）。
            'process.env.UNI_STATISTICS_CONFIG': JSON.stringify(
              process.env.UNI_STATISTICS_CONFIG ?? '{}'
            ),
            'process.env.UNI_APP_NAME': JSON.stringify(
              process.env.UNI_APP_NAME ?? ''
            ),
            'process.env.UNI_STAT_VAPOR': JSON.stringify(
              vaporLifecycleEnabled ? 'true' : 'false'
            ),
          },
        }
      },
      resolveId(id: string) {
        return stats[id] || null
      },
      transform(code: string, id: string) {
        if (isEnable && vaporLifecycleEnabled && opts.filter(id)) {
          const importPath =
            statType === 'private'
              ? '@dcloudio/uni-cloud-stat-vapor'
              : resolvePublicStatImportPath(currentPlatform)
          return {
            code: code + `;import '${importPath}';`,
            map: null,
          }
        }
        if (isEnable && shouldImportRuntime && opts.filter(id)) {
          // 新编译器只保留类型分流：
          //   public  → @dcloudio/uni-stat-public
          //   private → @dcloudio/uni-cloud-stat
          //
          // 兼容旧配置：
          //   type 缺失时回退 version（2=private，其余=public）
          const importPath =
            statType === 'private'
              ? '@dcloudio/uni-cloud-stat'
              : resolvePublicStatImportPath(currentPlatform)
          return {
            code: code + `;import '${importPath}';`,
            map: null,
          }
        }
      },
    }
  }),
]
