/**
 * 公有版统计入口。
 *
 * 与私有版 `src/index.js#main()` 等价：模块加载即触发安装。宿主无需手动调用，
 * 只需 `import '@dcloudio/uni-stat-public'`（或对应 dist 路径）即可。
 *
 * 也对外导出 `installPublicStat / getStatApp` 以便调试或自定义场景手动重装。
 */

import { __resetInstall, installPublicStat } from './runtime/install'
import { __resetStatApp, getStatApp } from './runtime/StatApp'

// 自动安装：与私有版行为一致，加载即触发。
installPublicStat()

export { __resetInstall, __resetStatApp, getStatApp, installPublicStat }
export type { StatAppConfig, StatAppOverrides } from './runtime/StatApp'
export type { InstallOptions } from './runtime/install'
export type { LifecycleOptions } from './runtime/lifecycleHooks'
