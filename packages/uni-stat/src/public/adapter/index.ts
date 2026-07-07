/**
 * adapter 层 barrel。
 *
 * 引用约定：
 *   - `domain/*`、`pipeline/*`、`runtime/*` **必须**通过本 barrel 引入 adapter 能力，
 *     不允许直接 `import '../adapter/system'` —— 便于未来按平台 tree-shake。
 *   - 本文件只做"重新导出"，不引入任何运行时副作用。
 *   - `__resetCache` 一律通过具体子模块导入，barrel 不再次暴露，避免误用。
 */

export {
  type ClientOs,
  type Platform,
  type StatOsSlug,
  getClientOs,
  getPlatform,
  getRawPlatform,
  isApp,
  isH5,
  isMp,
  isNvue,
  normalizeStatOsP,
  uniPlatformMpAliRaw,
  formatMpvForStat,
} from './platform'

export {
  type LocaleAndScreen,
  type SystemInfoStatic,
  getLocaleAndScreen,
  getSystemInfo,
} from './system'

export { getUuid } from './device'

export {
  type NetResult,
  type NetType,
  getNet,
  normalizeNet,
  onChange as onNetChange,
} from './network'

export {
  type GetLocationOptions,
  type LocationResult,
  getLocation,
} from './location'

export { type PackageInfo, getPackageInfo } from './package'

export { getAppChannel } from './channel'

export {
  type AppShowEvent,
  getLaunchScene,
  onAppHide,
  onAppLaunch,
  onAppShow,
} from './lifecycle'

export {
  getCurrentQuery,
  getCurrentRoute,
  getCurrentRouteWithQuery,
  getTopPageVm,
  parseQuery,
} from './route'

export {
  __resetPagesTitleCache,
  getPagesJsonNavigationTitle,
} from './pagesTitle'

export {
  type GetPushOptions,
  type PushClientResult,
  getPushClientId,
} from './push'

export { type WebInfo, getWebDomain, getWebInfo } from './web'
