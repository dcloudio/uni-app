/**
 * 公有版统计入口。
 *
 * 与私有版 `src/index.js#main()` 等价：发行模式或本地 debug 模式下，模块加载即触发
 * 安装。宿主无需手动调用，只需 import 对应运行时即可。
 *
 * 也对外导出 `installPublicStat / getStatApp` 以便调试或自定义场景手动重装。
 */

import { __resetInstall, installPublicStat } from './runtime/install'
import { __resetStatApp, getStatApp } from './runtime/StatApp'
import { __resetVaporStat, vaporStat } from './runtime/vapor'

// 本地运行仅在 manifest 显式开启 debug 时安装；发行模式保持原行为。
const shouldInstall =
  process.env.NODE_ENV !== 'development' ||
  process.env.UNI_STAT_DEBUG === 'true' ||
  (process.env.UNI_STAT_DEBUG as unknown) === true
if (shouldInstall) {
  const vapor = process.env.UNI_STAT_VAPOR === 'true'
  installPublicStat({ vapor })
  if (vapor) vaporStat.install()
}

export {
  __resetInstall,
  __resetStatApp,
  __resetVaporStat,
  getStatApp,
  installPublicStat,
  vaporStat,
}
export type { StatAppConfig, StatAppOverrides } from './runtime/StatApp'
export type { InstallOptions } from './runtime/install'
export type { LifecycleOptions } from './runtime/lifecycleHooks'
