import callCheckVersion, { CheckUpdateOptions, UniUpgradeCenterResult, isWgtPackage } from './call-check-version'
import { restart } from './'
// #ifdef APP-ANDROID
import { createNotificationProgress, finishNotificationProgress, cancelNotificationProgress, CreateNotificationProgressOptions, FinishNotificationProgressOptions } from '@/uni_modules/uts-progressNotification'
import { probeFileSize } from './download'
// #ifdef VUE3-VAPOR
import { installVaporWgt, getWgtCacheFilePath, clearWgtCache, saveWgtCacheRecord } from './install-wgt'
// #endif
// #ifndef UNI-APP-X
import { createUpgradeDownloadTask } from './download'
// #endif
// #endif
// #ifdef APP-IOS
import { onAppHide } from '@dcloudio/uni-app'
// #endif

export type UpdateCheckEvent = {
  hasUpdate : boolean,
  packageInfo : UniUpgradeCenterResult | null,
  result : UniUpgradeCenterResult | null,
  error : any | null,
  checkId : number
}

export type UpdateReadyEvent = {
  packageInfo : UniUpgradeCenterResult,
  status : 'installed',
  activation : 'restart-required',
  taskId : string
}

export type UpdateFailedEvent = {
  taskId : string,
  checkId : number,
  packageInfo : UniUpgradeCenterResult | null,
  stage : 'check' | 'download' | 'verify' | 'install' | 'prompt' | 'apply',
  code : number | string | null,
  message : string,
  retryable : boolean
}

type UpdateListener<T> = (event : T) => void

export type UpdateManager = {
	checkUpdate : (checkUpdateOptions ?: CheckUpdateOptions) => Promise<UpdateCheckEvent>,
	showUpdate : (packageInfo ?: UniUpgradeCenterResult, component ?: any) => Promise<UniUpgradeCenterResult>,
  applyUpdate : () => void,
  onCheckForUpdate : (listener : UpdateListener<UpdateCheckEvent>) => void,
  offCheckForUpdate : (listener : UpdateListener<UpdateCheckEvent>) => void,
  onUpdateReady : (listener : UpdateListener<UpdateReadyEvent>) => void,
  offUpdateReady : (listener : UpdateListener<UpdateReadyEvent>) => void,
  onUpdateFailed : (listener : UpdateListener<UpdateFailedEvent>) => void,
  offUpdateFailed : (listener : UpdateListener<UpdateFailedEvent>) => void,
  handleAppHide : () => void,
  handleAppShow : () => void,
  deferUpdate : () => void,
  notifyUpdateReady : (packageInfo : UniUpgradeCenterResult, taskId ?: string, promptAfterInstall ?: boolean) => void,
  notifyApkDownloaded : (packageInfo : UniUpgradeCenterResult, filePath : string) => void,
  startNotificationDownload : (packageInfo : UniUpgradeCenterResult) => void,
  promptNotificationInstall : () => void,
  notifyUpdateFailed : (event : UpdateFailedEvent) => void
}

let singleton : UpdateManager | null = null

function removeListener<T>(listeners : UpdateListener<T>[], listener : UpdateListener<T>) : void {
  const index = listeners.indexOf(listener)
  if (index >= 0) listeners.splice(index, 1)
}

function emit<T>(listeners : UpdateListener<T>[], event : T) : void {
  listeners.slice().forEach(listener => {
    try {
      listener(event)
    } catch (error) {
      console.error('[uni-upgrade-center-app] update listener failed', error)
    }
  })
}

function getTaskId(packageInfo : UniUpgradeCenterResult, checkId : number) : string {
  return `${checkId}:${packageInfo.appid}:${packageInfo.type}:${packageInfo.version}:${packageInfo.url}`
}

function getPackageKey(packageInfo : UniUpgradeCenterResult) : string {
  return `${packageInfo.appid}:${packageInfo.type}:${packageInfo.version}:${packageInfo.url}`
}

function getErrorMessage(error : any | null) : string {
  if (error == null) return '操作失败'
  if (typeof error === 'string') return error
  return '操作失败'
}

function getContents(packageInfo : UniUpgradeCenterResult) : string {
  return typeof packageInfo.contents === 'string' ? packageInfo.contents.trim() : ''
}

const PACKAGE_INFO_KEY = '__package_info__'

function resolvePackageUrl(packageInfo : UniUpgradeCenterResult) : Promise<UniUpgradeCenterResult> {
  if (!/^cloud:\/\//.test(packageInfo.url)) return Promise.resolve(packageInfo)
  return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
    uniCloud.getTempFileURL({ fileList: [packageInfo.url] }).then(res => {
      if (res.fileList.length == 0) {
        reject('获取更新下载地址失败')
        return
      }
      const tempUrl = res.fileList[0].tempFileURL
      if (tempUrl == null || tempUrl.length == 0) {
        reject('获取更新下载地址失败')
        return
      }
      const resolvedPackageInfo = JSON.parse(JSON.stringify(packageInfo)) as UniUpgradeCenterResult
      resolvedPackageInfo.url = tempUrl
      resolve(resolvedPackageInfo)
    }).catch(() => {
      reject('获取更新下载地址失败')
    })
  })
}

function createManager() : UpdateManager {
  const checkListeners : UpdateListener<UpdateCheckEvent>[] = []
  const readyListeners : UpdateListener<UpdateReadyEvent>[] = []
  const failedListeners : UpdateListener<UpdateFailedEvent>[] = []
  let checkId = 0
  let checking : Promise<UpdateCheckEvent> | null = null
  let showing : Promise<UniUpgradeCenterResult> | null = null
  let readyEvent : UpdateReadyEvent | null = null
  let lastReadyPackageKey = ''
  let lastCheckedPackageInfo : UniUpgradeCenterResult | null = null
  let restartOnAppHide = false
  let appWasHidden = false
  let applying = false
  // #ifdef APP-ANDROID
  let notificationDownloading = false
  let notificationPromptOpen = false
  let notificationReadyPath = ''
  let notificationPackage : UniUpgradeCenterResult | null = null
  // #endif

  let manager : UpdateManager | null = null
  manager = {
		checkUpdate(checkUpdateOptions ?: CheckUpdateOptions) : Promise<UpdateCheckEvent> {
      const existingCheck = checking
      if (existingCheck !== null) return existingCheck
      const currentCheckId = ++checkId
		const pending : Promise<UpdateCheckEvent> = callCheckVersion(checkUpdateOptions).then<UpdateCheckEvent>((result : UniUpgradeCenterResult) : UpdateCheckEvent => {
        const event : UpdateCheckEvent = {
          hasUpdate: result.code > 0,
          packageInfo: result.code > 0 ? result : null,
          result,
          error: null,
          checkId: currentCheckId
        }
        if (result.code > 0) lastCheckedPackageInfo = result
        emit(checkListeners, event)
        checking = null
        return event
      }).catch<UpdateCheckEvent>((error : any | null) : UpdateCheckEvent => {
        const event : UpdateCheckEvent = {
          hasUpdate: false,
          packageInfo: null,
          result: null,
          error,
          checkId: currentCheckId
        }
        emit(checkListeners, event)
        const failed : UpdateFailedEvent = {
          taskId: `${currentCheckId}:check`,
          checkId: currentCheckId,
          packageInfo: null,
          stage: 'check',
          code: null,
          message: getErrorMessage(error),
          retryable: true
        }
        emit(failedListeners, failed)
        checking = null
        return event
      })
      checking = pending
      return pending
    },
    showUpdate(packageInfo ?: UniUpgradeCenterResult, component ?: any) : Promise<UniUpgradeCenterResult> {
      const currentShowing = showing
      if (currentShowing !== null) return currentShowing
      const currentPackageInfo = packageInfo != null ? packageInfo : lastCheckedPackageInfo
      if (currentPackageInfo === null) {
        return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
          reject('没有可显示的更新信息')
        })
      }

      const pending = new Promise<UniUpgradeCenterResult>((resolve, reject) => {
        resolvePackageUrl(currentPackageInfo).then((resolvedPackageInfo : UniUpgradeCenterResult) => {
          // #ifndef UNI-APP-X
          // #ifdef APP-PLUS
          uni.setStorageSync(PACKAGE_INFO_KEY, resolvedPackageInfo)
          uni.navigateTo({
            url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
            success: () => { showing = null; resolve(resolvedPackageInfo) },
            fail: (error) => { showing = null; uni.removeStorageSync(PACKAGE_INFO_KEY); reject(error) }
          })
          return
          // #endif
          // #ifdef APP-HARMONY
          if (component == null) {
            reject('HarmonyOS Next 请传入升级弹窗组件')
            return
          }
          try {
            component.show(true, resolvedPackageInfo)
            showing = null
            resolve(resolvedPackageInfo)
          } catch (error) {
            showing = null
            reject(error)
          }
          return
          // #endif
          // #endif
          // #ifdef UNI-APP-X
          uni.setStorageSync(PACKAGE_INFO_KEY, resolvedPackageInfo)
          uni.openDialogPage({
            url: `/uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
            disableEscBack: true,
            success: () => { showing = null; resolve(resolvedPackageInfo) },
            fail: (error) => { showing = null; uni.removeStorageSync(PACKAGE_INFO_KEY); reject(error) }
          })
          return
          // #endif
        }).catch(() => {
          showing = null
          reject('获取更新下载地址失败')
        })
      })
      showing = pending
      return pending
    },
    applyUpdate() : void {
      if (applying) return
      const currentReadyEvent = readyEvent
      if (currentReadyEvent === null || !isWgtPackage(currentReadyEvent.packageInfo)) {
        const event : UpdateFailedEvent = {
          taskId: 'apply',
          checkId: checkId,
          packageInfo: currentReadyEvent === null ? null : currentReadyEvent.packageInfo,
          stage: 'apply',
          code: 'NOT_READY',
          message: '没有可重启生效的资源包',
          retryable: false
        }
        emit(failedListeners, event)
        return
      }
      applying = true
      restartOnAppHide = false
      const applyingReadyEvent = readyEvent
      readyEvent = null
      try {
        restart()
      } catch (error) {
        const event : UpdateFailedEvent = {
          taskId: 'apply',
          checkId: checkId,
          packageInfo: null,
          stage: 'apply',
          code: 'RESTART_FAILED',
          message: getErrorMessage(error),
          retryable: false
        }
        emit(failedListeners, event)
        applying = false
        readyEvent = applyingReadyEvent
        lastReadyPackageKey = ''
      }
    },
    onCheckForUpdate(listener) {
      if (checkListeners.indexOf(listener) < 0) checkListeners.push(listener)
    },
    offCheckForUpdate(listener) { removeListener(checkListeners, listener) },
    onUpdateReady(listener) {
      if (readyListeners.indexOf(listener) < 0) readyListeners.push(listener)
    },
    offUpdateReady(listener) { removeListener(readyListeners, listener) },
    onUpdateFailed(listener) {
      if (failedListeners.indexOf(listener) < 0) failedListeners.push(listener)
    },
    offUpdateFailed(listener) { removeListener(failedListeners, listener) },
    handleAppHide() {
      appWasHidden = true
    },
    handleAppShow() {
      if (appWasHidden && restartOnAppHide && readyEvent !== null) manager!.applyUpdate()
      appWasHidden = false
    },
    deferUpdate() {
      if (readyEvent !== null && !applying) restartOnAppHide = true
    },
    notifyUpdateReady(packageInfo, taskId ?: string, promptAfterInstall ?: boolean) {
      const nextTaskId : string = taskId == null ? getTaskId(packageInfo, checkId) : taskId
      const packageKey = getPackageKey(packageInfo)
      // 同一个包的安装成功回调只通知一次，避免重复提示或重启。
      if (lastReadyPackageKey === packageKey) return
      const event : UpdateReadyEvent = {
        packageInfo,
        status: 'installed',
        activation: 'restart-required',
        taskId: nextTaskId
      }
      lastReadyPackageKey = packageKey
      readyEvent = event
      applying = false
      emit(readyListeners, event)
      // 历史记录可能同时开启两项；静默更新只安装，不提示或主动重启。
			const isSilent = packageInfo.is_silently ?? false
			if (isSilent) return
			const mandatory = (packageInfo.effective_is_mandatory ?? false) || packageInfo.is_mandatory
			const promptEnabled = (packageInfo.is_update_prompt ?? false) || (promptAfterInstall ?? false)
      if (!promptEnabled) return
      if ((packageInfo.is_update_prompt ?? false) && packageInfo.update_prompt === 'toast') {
        uni.showToast({
          icon: 'none',
          title: '资源已更新，重启生效',
          position: 'bottom'
        })
          manager!.applyUpdate()
        return
      }
      uni.showModal({
        content: (packageInfo.update_prompt_content || '应用已更新，是否立即重启？') + (getContents(packageInfo).length > 0 ? '\n' + getContents(packageInfo) : ''),
        confirmText: '重启',
        cancelText: '取消',
        showCancel: !mandatory,
        success: (res) => {
          if (res.confirm) manager!.applyUpdate()
          else manager!.deferUpdate()
        }
      })
    },
    notifyUpdateFailed(event) {
      emit(failedListeners, event)
    },
    promptNotificationInstall() {
      // #ifdef APP-ANDROID
        if (notificationPromptOpen || notificationReadyPath.length == 0 || notificationPackage === null) return
      if (!isWgtPackage(notificationPackage)) return
      notificationPromptOpen = true
      const packageInfo = notificationPackage!
      const localPath = notificationReadyPath
      uni.showModal({
        content: '资源包下载完成，是否立即安装？',
        confirmText: '安装', cancelText: '取消',
        success: (res) => {
          notificationPromptOpen = false
          if (!res.confirm) {
            // #ifndef UNI-APP-X
            uni.saveFile({
              tempFilePath: localPath, success: (saved) => {
                notificationReadyPath = saved.savedFilePath
                uni.setStorageSync('UNI_ADMIN_UPGRADE_CENTER_LOCAL_FILE_PATH', { version: packageInfo.version, savedFilePath: saved.savedFilePath })
              }
            })
            // #endif
            return
          }
          // #ifdef VUE3-VAPOR
          installVaporWgt({
            packageInfo, filePath: localPath,
          onSuccess: () => { notificationReadyPath = ''; cancelNotificationProgress(); manager!.notifyUpdateReady(packageInfo, '', true) },
            onAlreadyLatest: () => { notificationReadyPath = ''; cancelNotificationProgress() },
            onFail: (message : string) => {
              if (message.includes('校验失败') || message.includes('信息缺失')) {
                notificationReadyPath = ''
                cancelNotificationProgress()
              }
              uni.showModal({ title: '更新失败', content: message, showCancel: false })
            manager!.notifyUpdateFailed({ taskId: getTaskId(packageInfo, checkId), checkId, packageInfo, stage: 'install', code: message.includes('不支持') ? 'UNSUPPORTED_INSTALL_WGT' : null, message, retryable: !message.includes('不支持') })
            }
          })
          // #endif
          // #ifndef UNI-APP-X
          plus.runtime.install(localPath, { force: false }, () => { notificationReadyPath = ''; cancelNotificationProgress(); manager!.notifyUpdateReady(packageInfo, '', true) }, (err) => {
            uni.showModal({ title: '更新失败', content: err.message, showCancel: false })
            manager!.notifyUpdateFailed({ taskId: getTaskId(packageInfo, checkId), checkId, packageInfo, stage: 'install', code: err.code, message: err.message, retryable: true })
          })
          // #endif
        },
        fail: () => { notificationPromptOpen = false }
      })
      // #endif
    },
    notifyApkDownloaded(packageInfo, filePath) {
      // #ifdef APP-ANDROID
      if (notificationPromptOpen) return
      notificationPromptOpen = true
      // #endif
			const mandatory = (packageInfo.effective_is_mandatory ?? false) || packageInfo.is_mandatory
			const promptEnabled = packageInfo.is_update_prompt ?? false
      const install = () => {
        try {
          // #ifdef UNI-APP-X
          uni.installApk({
            filePath,
            success: () => { },
          fail: (error) => manager!.notifyUpdateFailed({
              taskId: getTaskId(packageInfo, checkId), checkId, packageInfo,
              stage: 'install', code: error.errCode, message: error.errMsg, retryable: true
            })
          })
          // #endif
          // #ifndef UNI-APP-X
          plus.runtime.install(filePath, { force: false }, () => { }, (error) => manager!.notifyUpdateFailed({
            taskId: getTaskId(packageInfo, checkId), checkId, packageInfo,
            stage: 'install', code: error.code, message: error.message, retryable: true
          }))
          // #endif
        } catch (error) {
          manager!.notifyUpdateFailed({
            taskId: getTaskId(packageInfo, checkId), checkId, packageInfo,
            stage: 'install', code: 'INSTALL_FAILED', message: getErrorMessage(error), retryable: true
          })
        }
      }
      uni.showModal({
        content: (promptEnabled ? (packageInfo.update_prompt_content || '安装包已下载，是否立即安装？') : '安装包已下载，是否立即安装？') + (getContents(packageInfo).length > 0 ? '\n\n' + getContents(packageInfo) : ''),
        confirmText: '安装',
        cancelText: '取消',
        showCancel: !mandatory,
        success: (res) => {
          if (res.confirm) {
            // #ifdef APP-ANDROID
            notificationReadyPath = ''
            cancelNotificationProgress()
            // #endif
            install()
          }
        },
        complete: () => {
          // #ifdef APP-ANDROID
          notificationPromptOpen = false
          // #endif
        }
      })
    },
    startNotificationDownload(packageInfo) {
      // #ifdef APP-ANDROID
      if (notificationDownloading || notificationPromptOpen) return
      if (notificationPackage !== null && notificationReadyPath.length > 0 && getPackageKey(notificationPackage!) === getPackageKey(packageInfo)) {
        if (isWgtPackage(packageInfo)) manager!.promptNotificationInstall()
        else manager!.notifyApkDownloaded(packageInfo, notificationReadyPath)
        return
      }
      notificationPackage = packageInfo
      notificationDownloading = true
      notificationReadyPath = ''
      cancelNotificationProgress()
      let probedSize = 0
      probeFileSize(packageInfo.url, (size : number) => { probedSize = size })
      let filePath = ''
      // #ifdef VUE3-VAPOR
      if (isWgtPackage(packageInfo)) {
        filePath = getWgtCacheFilePath(packageInfo.url)
        clearWgtCache(filePath)
      }
      // #endif
      const onDownloadFail = (message : string) => {
        if (!notificationDownloading) return
        notificationDownloading = false
        notificationReadyPath = ''
        const finishOptions : FinishNotificationProgressOptions = { title: '升级包下载失败', content: message, onClick: () => { } }
        finishNotificationProgress(finishOptions)
        manager!.notifyUpdateFailed({ taskId: getTaskId(packageInfo, checkId), checkId, packageInfo, stage: 'download', code: null, message, retryable: true })
      }
      const onDownloadSuccess = (res : DownloadFileSuccess) => {
        if (!notificationDownloading) return
        if (res.statusCode != 200) {
          onDownloadFail(`下载失败（HTTP ${res.statusCode}）`)
          return
        }
        notificationDownloading = false
        notificationReadyPath = res.tempFilePath.length > 0 ? res.tempFilePath : filePath
        // #ifdef VUE3-VAPOR
        if (isWgtPackage(packageInfo)) saveWgtCacheRecord(packageInfo)
        // #endif
        const finishOptions : FinishNotificationProgressOptions = {
          title: '安装包下载完成', content: '点击安装', onClick: () => {
          if (isWgtPackage(packageInfo)) manager!.promptNotificationInstall()
          else manager!.notifyApkDownloaded(packageInfo, notificationReadyPath)
          }
        }
        finishNotificationProgress(finishOptions)
        if (isWgtPackage(packageInfo)) manager!.promptNotificationInstall()
        else manager!.notifyApkDownloaded(packageInfo, notificationReadyPath)
      }
      // #ifdef UNI-APP-X
      let task : DownloadTask | null = null
      if (filePath.length > 0) {
        task = uni.downloadFile({ url: packageInfo.url, filePath, success: onDownloadSuccess, fail: (err) => { onDownloadFail(err.errMsg) } })
      } else {
        task = uni.downloadFile({ url: packageInfo.url, success: onDownloadSuccess, fail: (err) => { onDownloadFail(err.errMsg) } })
      }
      // #endif
      // #ifndef UNI-APP-X
      const task = createUpgradeDownloadTask({ url: packageInfo.url, success: onDownloadSuccess, fail: (err : any) => { onDownloadFail(err.errMsg) } })
      // #endif
      if (task != null) {
        task.onProgressUpdate((res) => {
          if (!notificationDownloading) return
          const total = res.totalBytesExpectedToWrite > 0 ? res.totalBytesExpectedToWrite : probedSize
          const progress = total > 0 ? Math.min(100, Math.max(0, Math.floor(res.totalBytesWritten / total * 100))) : 0
            const progressOptions : CreateNotificationProgressOptions = { title: '升级中心正在下载安装包……', content: `${progress}%`, progress, onClick: () => { } }
            createNotificationProgress(progressOptions)
        })
      } else {
        onDownloadFail('下载任务创建失败，请重新检查更新')
      }
      // #endif
    },
  }

  // 仅 iOS 需要在应用进入后台时处理延后重启，避免依赖宿主 App.uvue。
  // #ifdef APP-IOS
  onAppHide(() => {
    manager!.handleAppHide()
  })
  // #endif

  return manager!
}

export function createUpdateManager() : UpdateManager {
  if (singleton === null) singleton = createManager()
  return singleton!
}

export default createUpdateManager
