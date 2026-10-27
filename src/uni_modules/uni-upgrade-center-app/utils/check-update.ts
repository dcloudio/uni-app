import { UniUpgradeCenterResult, CheckUpdateOptions } from './call-check-version'
import { createUpdateManager, UpdateCheckEvent } from './update-manager'

/**
 * 兼容旧入口：检查、下载、安装和弹窗统一交给 UpdateManager 管理。
 * HarmonyOS Next 保留组件参数，仅用于打开平台适配的升级弹窗。
 */
// #ifdef APP-HARMONY
export function performCheckUpdate(component ?: any, checkUpdateOptions ?: CheckUpdateOptions) : Promise<UniUpgradeCenterResult> {
  return runCheckUpdate(component, checkUpdateOptions)
}
// #endif
// #ifndef APP-HARMONY
export function performCheckUpdate(checkUpdateOptions ?: CheckUpdateOptions) : Promise<UniUpgradeCenterResult> {
  return runCheckUpdate(null, checkUpdateOptions)
}
// #endif

function runCheckUpdate(component : any | null, checkUpdateOptions ?: CheckUpdateOptions) : Promise<UniUpgradeCenterResult> {
  const manager = createUpdateManager()
  return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
    manager.checkUpdate(checkUpdateOptions).then((event : UpdateCheckEvent) => {
      if (event.hasUpdate && event.packageInfo !== null) {
        manager.showUpdate(event.packageInfo, component).then(resolve).catch(reject)
        return
      }
      if (event.result !== null && event.result.code <= 0) {
        if (event.result.code < 0) {
          reject(event.result)
        } else {
          resolve(event.result)
        }
        return
      }
      reject(event.error == null ? '检查更新失败' : event.error)
    }).catch(reject)
  })
}

export default performCheckUpdate
