import callCheckVersion, { CheckUpdateOptions, UniUpgradeCenterResult, isWgtPackage } from './call-check-version'
import { restart } from './'
// #ifdef UNI-APP-X
import { verifyPackageSha256 } from './verify-package'
// #endif
// #ifdef APP-ANDROID
import { createNotificationProgress, finishNotificationProgress, cancelNotificationProgress, CreateNotificationProgressOptions, FinishNotificationProgressOptions } from '@/uni_modules/uts-progressNotification'
import { probeFileSize } from './download'
// #ifndef UNI-APP-X
import { createUpgradeDownloadTask } from './download'
// #endif
// #endif
// #ifdef VUE3-VAPOR && APP && !APP-HARMONY
import { installVaporWgt, getWgtCacheFilePath, clearWgtCache, saveWgtCacheRecord } from './install-wgt'
// #endif
// #ifdef APP-IOS
import { onAppHide, onAppShow } from '@dcloudio/uni-app'
// #endif

export type UpdateTaskContext = {
  taskId : string,
  checkId : number
}

export type UpgradePopupPayload = {
  packageInfo : UniUpgradeCenterResult,
  taskContext : UpdateTaskContext
}

export type UpdateCheckEvent = {
  hasUpdate : boolean,
  packageInfo : UniUpgradeCenterResult | null,
  result : UniUpgradeCenterResult | null,
  error : any | null,
  checkId : number,
  taskContext ?: UpdateTaskContext
}

export type UpdateReadyEvent = {
  packageInfo : UniUpgradeCenterResult,
  status : 'installed',
  activation : 'restart-required',
  taskId : string,
  checkId ?: number
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
	showUpdate : (packageInfo ?: UniUpgradeCenterResult, component ?: any, taskContext ?: UpdateTaskContext) => Promise<UniUpgradeCenterResult>,
  createTaskContext : (checkId ?: number) => UpdateTaskContext,
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
  notifyUpdateReady : (packageInfo : UniUpgradeCenterResult, taskId ?: string, promptAfterInstall ?: boolean, taskContext ?: UpdateTaskContext) => void,
  notifyApkDownloaded : (packageInfo : UniUpgradeCenterResult, filePath : string, taskContext ?: UpdateTaskContext) => void,
  startNotificationDownload : (packageInfo : UniUpgradeCenterResult, taskContext ?: UpdateTaskContext) => void,
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

function getPackageKey(packageInfo : UniUpgradeCenterResult) : string {
  return `${packageInfo.appid}:${packageInfo.type}:${packageInfo.version}:${packageInfo.url}`
}

function getErrorMessage(error : any | null) : string {
  if (error == null) return '操作失败'
  if (typeof error === 'string') return error
  // #ifdef UNI-APP-X
  // App 的 JS 逻辑层中 error 是普通对象（UTSJSONObject 方法不可用），只做下标访问
  try {
    const parsed = error as UTSJSONObject
    const message = parsed['message']
    if (typeof message === 'string' && message.length > 0) return message
    const errMsg = parsed['errMsg']
    if (typeof errMsg === 'string' && errMsg.length > 0) return errMsg
  } catch (e) {}
  // #endif
  // #ifndef UNI-APP-X
  try {
    const message = error['message']
    if (typeof message === 'string' && message.length > 0) return message
    const errMsg = error['errMsg']
    if (typeof errMsg === 'string' && errMsg.length > 0) return errMsg
  } catch (e) {}
  // #endif
  return '操作失败'
}

function getContents(packageInfo : UniUpgradeCenterResult) : string {
  return typeof packageInfo.contents === 'string' ? packageInfo.contents.trim() : ''
}

function getErrorCode(error : any | null) : number | string | null {
  if (error == null) return null
  // #ifdef UNI-APP-X
  try {
    const parsed = error as UTSJSONObject
    const code = parsed['code']
    const codeType = typeof code
    if (['Int', 'Long', 'number'].includes(codeType)) return code as number
    if (codeType === 'string') return code as string
  } catch (e) {}
  // #endif
  // #ifndef UNI-APP-X
  try {
    const code = error['code']
    const codeType = typeof code
    if (['Int', 'Long', 'number'].includes(codeType)) return code as number
    if (codeType === 'string') return code as string
  } catch (e) {}
  // #endif
  return null
}

// #ifdef APP-ANDROID
function cancelDownloadNotification() : void {
  try {
    cancelNotificationProgress()
  } catch (error) {
    console.warn('[uni-upgrade-center-app] 通知栏清理失败', getErrorMessage(error))
  }
}
// #endif

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
  let taskSequence = 0
  let popupSequence = 0
  let checking : Promise<UpdateCheckEvent> | null = null
  let showing : Promise<UniUpgradeCenterResult> | null = null
  let readyEvent : UpdateReadyEvent | null = null
  let lastReadyPackageKey = ''
  let lastCheckedPackageInfo : UniUpgradeCenterResult | null = null
  let lastCheckedTaskContext : UpdateTaskContext | null = null
  let restartOnAppHide = false
  let appWasHidden = false
  let applying = false
  let wgtUpdating = false
  // #ifdef APP-ANDROID
  let notificationDownloading = false
  let notificationPromptOpen = false
  let notificationReadyPath = ''
  let notificationPackage : UniUpgradeCenterResult | null = null
  let notificationTaskContext : UpdateTaskContext | null = null
  // #endif

  let manager : UpdateManager | null = null

  function makeTaskContext(checkId : number | null = null) : UpdateTaskContext {
    return { taskId: `uc-${Date.now()}-${++taskSequence}`, checkId: checkId ?? 0 }
  }

  function snapshotTaskContext(taskContext ?: UpdateTaskContext | null) : UpdateTaskContext {
    if (taskContext == null) return makeTaskContext()
    return { taskId: taskContext.taskId, checkId: taskContext.checkId }
  }

  function startWgtUpdate(packageInfo : UniUpgradeCenterResult, taskContext : UpdateTaskContext) : void {
    if (wgtUpdating) return
    wgtUpdating = true
    const currentCheckId = taskContext.checkId
    const taskId = taskContext.taskId
    let filePath = ''
    const fail = (stage : 'download' | 'install', message : string) => {
      wgtUpdating = false
      manager!.notifyUpdateFailed({ taskId, checkId: currentCheckId, packageInfo, stage, code: null, message, retryable: true })
      if (!(packageInfo.is_silently ?? false)) uni.showModal({ title: '更新失败', content: message, showCancel: false })
    }
    const installed = () => {
      wgtUpdating = false
      console.log('[uni-upgrade-center-app] WGT 安装完成', packageInfo.version)
      manager!.notifyUpdateReady(packageInfo, taskId, false, taskContext)
    }
    const alreadyLatest = () => {
      wgtUpdating = false
      console.log('[uni-upgrade-center-app] WGT 已是最新版本，不触发安装完成提醒', packageInfo.version)
    }
    // 仅取基础字段，避免在共享代码中引用 uni-app x 专有类型 DownloadFileSuccess（uni1 无该类型）
    const handleWgtDownloaded = (statusCode : number, rawTempFilePath : string) => {
      if (statusCode != 200) {
        fail('download', `下载失败（HTTP ${statusCode}）`)
        return
      }
      const localPath = rawTempFilePath.length > 0 ? rawTempFilePath : filePath
      if (localPath.length == 0) {
        fail('download', '下载文件路径为空，请重新检查更新')
        return
      }
      console.log('[uni-upgrade-center-app] WGT 下载完成，开始校验安装', packageInfo.version)
      try {
        // #ifdef VUE3-VAPOR && APP && !APP-HARMONY
        saveWgtCacheRecord(packageInfo)
        installVaporWgt({ packageInfo, filePath: localPath, onSuccess: installed, onAlreadyLatest: alreadyLatest,
          onFail: (message : string) => { fail('install', message) } })
        // #endif
        // #ifndef UNI-APP-X
        // #ifdef APP-PLUS
        plus.runtime.install(localPath, { force: false }, installed, (error) => { fail('install', error.message) })
        // #endif
        // #endif
      } catch (error) {
        fail('install', getErrorMessage(error))
      }
    }
    try {
      // #ifdef VUE3-VAPOR && APP && !APP-HARMONY
      filePath = getWgtCacheFilePath(packageInfo.url)
      clearWgtCache(filePath)
      // #endif
      console.log('[uni-upgrade-center-app] WGT 开始下载', packageInfo.version)
      // #ifdef UNI-APP-X
      uni.downloadFile({ url: packageInfo.url, filePath, success: (res : DownloadFileSuccess) => { handleWgtDownloaded(res.statusCode, res.tempFilePath) }, fail: (error) => { fail('download', error.errMsg) } })
      // #endif
      // #ifndef UNI-APP-X
      uni.downloadFile({ url: packageInfo.url, success: (res : any) => { handleWgtDownloaded(res.statusCode, res.tempFilePath) }, fail: (error) => { fail('download', error.errMsg) } })
      // #endif
    } catch (error) {
      fail('download', getErrorMessage(error))
    }
  }

  manager = {
		createTaskContext(checkId ?: number) : UpdateTaskContext {
			return makeTaskContext(checkId ?? 0)
		},
		checkUpdate(checkUpdateOptions ?: CheckUpdateOptions) : Promise<UpdateCheckEvent> {
      const existingCheck = checking
      if (existingCheck !== null) return existingCheck
      const currentCheckId = ++checkId
      const taskContext = makeTaskContext(currentCheckId)
		const pending : Promise<UpdateCheckEvent> = callCheckVersion(checkUpdateOptions).then<UpdateCheckEvent>((result : UniUpgradeCenterResult) : UpdateCheckEvent => {
        const event : UpdateCheckEvent = {
          hasUpdate: result.code > 0,
          packageInfo: result.code > 0 ? result : null,
          result,
          error: null,
          checkId: currentCheckId,
          taskContext: snapshotTaskContext(taskContext)
        }
        if (result.code > 0) {
          lastCheckedPackageInfo = result
          lastCheckedTaskContext = snapshotTaskContext(taskContext)
        }
        emit(checkListeners, event)
        checking = null
        return event
      }).catch<UpdateCheckEvent>((error : any | null) : UpdateCheckEvent => {
        const event : UpdateCheckEvent = {
          hasUpdate: false,
          packageInfo: null,
          result: null,
          error,
          checkId: currentCheckId,
          taskContext: snapshotTaskContext(taskContext)
        }
        emit(checkListeners, event)
        const errorCode = getErrorCode(error)
        const failed : UpdateFailedEvent = {
          taskId: taskContext.taskId,
          checkId: currentCheckId,
          packageInfo: null,
          stage: 'check',
          code: errorCode,
          message: getErrorMessage(error),
          // -103 发布配置错误、-102 参数错误均重试无意义
          retryable: errorCode != -103 && errorCode != -102
        }
        emit(failedListeners, failed)
        checking = null
        return event
      })
      checking = pending
      return pending
    },
    showUpdate(packageInfo ?: UniUpgradeCenterResult, component ?: any, taskContext ?: UpdateTaskContext) : Promise<UniUpgradeCenterResult> {
      const currentShowing = showing
      if (currentShowing !== null) return currentShowing
      const currentPackageInfo = packageInfo != null ? packageInfo : lastCheckedPackageInfo
      if (currentPackageInfo === null) {
        return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
          reject('没有可显示的更新信息')
        })
      }
      // 显式传包但没有上下文属于手动升级，不能关联到后来或无关的检查。
      const currentTaskContext = snapshotTaskContext(taskContext ?? (packageInfo == null ? lastCheckedTaskContext : null))

      const pending = new Promise<UniUpgradeCenterResult>((resolve, reject) => {
        const failShowing = (error : any | null, stage : 'download' | 'prompt', failedPackageInfo : UniUpgradeCenterResult) => {
          showing = null
          manager!.notifyUpdateFailed({ taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId,
            packageInfo: failedPackageInfo, stage, code: getErrorCode(error), message: getErrorMessage(error), retryable: true })
          reject(error)
        }
        resolvePackageUrl(currentPackageInfo).then((resolvedPackageInfo : UniUpgradeCenterResult) => {
          console.log('[uni-upgrade-center-app] 更新分流', resolvedPackageInfo.type, resolvedPackageInfo.version,
            'is_update_prompt=', resolvedPackageInfo.is_update_prompt ?? false, 'is_silently=', resolvedPackageInfo.is_silently ?? false)
          let supportsWgtUpdate = false
          // #ifdef VUE3-VAPOR && APP && !APP-HARMONY
          supportsWgtUpdate = true
          // #endif
          // #ifndef UNI-APP-X
          // #ifdef APP-PLUS
          supportsWgtUpdate = true
          // #endif
          // #endif
          if (supportsWgtUpdate && isWgtPackage(resolvedPackageInfo) &&
            ((resolvedPackageInfo.is_update_prompt ?? false) || (resolvedPackageInfo.is_silently ?? false))) {
            startWgtUpdate(resolvedPackageInfo, currentTaskContext)
            showing = null
            resolve(resolvedPackageInfo)
            return
          }
          // #ifdef APP-ANDROID
          // APK 安装提醒直接进入通知下载，完成后由用户确认安装，不打开升级弹窗。
          if (resolvedPackageInfo.type === 'native_app' && (resolvedPackageInfo.is_update_prompt ?? false)) {
            manager!.startNotificationDownload(resolvedPackageInfo, currentTaskContext)
            showing = null
            resolve(resolvedPackageInfo)
            return
          }
          // #endif
          // #ifndef UNI-APP-X
          // #ifdef APP-PLUS
          const popupKey = `${PACKAGE_INFO_KEY}${Date.now()}_${++popupSequence}`
          const payload : UpgradePopupPayload = { packageInfo: resolvedPackageInfo, taskContext: currentTaskContext }
          uni.setStorageSync(popupKey, payload)
          uni.navigateTo({
            url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${popupKey}`,
            success: () => { showing = null; resolve(resolvedPackageInfo) },
            fail: (error) => { uni.removeStorageSync(popupKey); failShowing(error, 'prompt', resolvedPackageInfo) }
          })
          return
          // #endif
          // #ifdef APP-HARMONY
          if (component == null) {
            failShowing('HarmonyOS Next 请传入升级弹窗组件', 'prompt', resolvedPackageInfo)
            return
          }
          try {
            component.show(true, resolvedPackageInfo, currentTaskContext)
            showing = null
            resolve(resolvedPackageInfo)
          } catch (error) {
            failShowing(error, 'prompt', resolvedPackageInfo)
          }
          return
          // #endif
          // #endif
          // #ifdef UNI-APP-X
          const popupKey = `${PACKAGE_INFO_KEY}${Date.now()}_${++popupSequence}`
          const payload : UpgradePopupPayload = { packageInfo: resolvedPackageInfo, taskContext: currentTaskContext }
          uni.setStorageSync(popupKey, payload)
          uni.openDialogPage({
            url: `/uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup?local_storage_key=${popupKey}`,
            disableEscBack: true,
            success: () => { showing = null; resolve(resolvedPackageInfo) },
            fail: (error) => { uni.removeStorageSync(popupKey); failShowing(error, 'prompt', resolvedPackageInfo) }
          })
          return
          // #endif
        }).catch((error : any | null) => {
          failShowing(error, 'download', currentPackageInfo)
        })
      })
      showing = pending
      return pending
    },
    applyUpdate() : void {
      if (applying) return
      const currentReadyEvent = readyEvent
      if (currentReadyEvent === null || !isWgtPackage(currentReadyEvent.packageInfo)) {
        const taskContext : UpdateTaskContext = currentReadyEvent == null ? makeTaskContext() : { taskId: currentReadyEvent.taskId, checkId: currentReadyEvent.checkId ?? 0 }
        const event : UpdateFailedEvent = {
          taskId: taskContext.taskId,
          checkId: taskContext.checkId,
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
          taskId: currentReadyEvent.taskId,
          checkId: currentReadyEvent.checkId ?? 0,
          packageInfo: currentReadyEvent.packageInfo,
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
    notifyUpdateReady(packageInfo, taskId ?: string, promptAfterInstall ?: boolean, taskContext ?: UpdateTaskContext) {
      if (!isWgtPackage(packageInfo)) return
      const currentTaskContext = snapshotTaskContext(taskContext)
      const nextTaskId : string = taskId == null ? currentTaskContext.taskId : taskId
      const packageKey = getPackageKey(packageInfo)
      // 同一个包的安装成功回调只通知一次，避免重复提示或重启。
      if (lastReadyPackageKey === packageKey) return
      const event : UpdateReadyEvent = {
        packageInfo,
        status: 'installed',
        activation: 'restart-required',
        taskId: nextTaskId,
        checkId: currentTaskContext.checkId
      }
      lastReadyPackageKey = packageKey
      readyEvent = event
      applying = false
      restartOnAppHide = false
      emit(readyListeners, event)
      console.log('[uni-upgrade-center-app] WGT 就绪提醒', packageInfo.version,
        'is_update_prompt=', packageInfo.is_update_prompt ?? false, 'is_silently=', packageInfo.is_silently ?? false)
      const currentReadyEvent = readyEvent
      if (currentReadyEvent !== event || applying) return
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
        content: packageInfo.update_prompt_content || `新版本已安装（${packageInfo.version}）\n点击重启立即生效或下次启动应用时生效`,
        confirmText: '重启',
        cancelText: '取消',
        showCancel: !mandatory,
        success: (res) => {
          const modalReadyEvent = readyEvent
          if (modalReadyEvent !== event || applying) return
          if (res.confirm) manager!.applyUpdate()
          else manager!.deferUpdate()
        },
        fail: (error) => {
          manager!.notifyUpdateFailed({ taskId: nextTaskId, checkId: currentTaskContext.checkId, packageInfo,
            stage: 'prompt', code: null, message: error.errMsg, retryable: true })
        }
      })
    },
    notifyUpdateFailed(event) {
      console.warn('[uni-upgrade-center-app] 更新失败', event.stage, event.message)
      emit(failedListeners, event)
    },
    promptNotificationInstall() {
      // #ifdef APP-ANDROID
      if (notificationPromptOpen || notificationReadyPath.length == 0 || notificationPackage === null) return
      if (!isWgtPackage(notificationPackage)) return
      const packageInfo = notificationPackage!
      const localPath = notificationReadyPath
      const taskContext = snapshotTaskContext(notificationTaskContext)
      notificationPromptOpen = true
      cancelDownloadNotification()
      // 下载完成后直接安装，不再等待用户确认。
      // #ifdef VUE3-VAPOR
      installVaporWgt({
        packageInfo, filePath: localPath,
        onSuccess: () => { notificationPromptOpen = false; notificationReadyPath = ''; manager!.notifyUpdateReady(packageInfo, taskContext.taskId, true, taskContext) },
        onAlreadyLatest: () => { notificationPromptOpen = false; notificationReadyPath = '' },
        onFail: (message : string) => {
          notificationPromptOpen = false
          if (message.includes('校验失败') || message.includes('信息缺失')) notificationReadyPath = ''
          uni.showModal({ title: '更新失败', content: message, showCancel: false })
          manager!.notifyUpdateFailed({ taskId: taskContext.taskId, checkId: taskContext.checkId, packageInfo, stage: 'install', code: message.includes('不支持') ? 'UNSUPPORTED_INSTALL_WGT' : null, message, retryable: !message.includes('不支持') })
        }
      })
      // #endif
      // #ifndef UNI-APP-X
      plus.runtime.install(localPath, { force: false }, () => { notificationPromptOpen = false; notificationReadyPath = ''; manager!.notifyUpdateReady(packageInfo, taskContext.taskId, true, taskContext) }, (err) => {
        notificationPromptOpen = false
        uni.showModal({ title: '更新失败', content: err.message, showCancel: false })
        manager!.notifyUpdateFailed({ taskId: taskContext.taskId, checkId: taskContext.checkId, packageInfo, stage: 'install', code: err.code, message: err.message, retryable: true })
      })
      // #endif
      // #endif
    },
    notifyApkDownloaded(packageInfo, filePath, taskContext ?: UpdateTaskContext) {
      // #ifdef APP-ANDROID
      if (notificationPromptOpen) return
      notificationPromptOpen = true
      // #endif
      const currentTaskContext = snapshotTaskContext(taskContext)

      console.log('[uni-upgrade-center-app] APK 下载完成，提示确认安装', packageInfo.version)
			const mandatory = (packageInfo.effective_is_mandatory ?? false) || packageInfo.is_mandatory
			const promptEnabled = packageInfo.is_update_prompt ?? false
      const install = () => {
        try {
          // #ifdef UNI-APP-X
          uni.installApk({
            filePath,
            success: () => { },
          fail: (error) => manager!.notifyUpdateFailed({
              taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId, packageInfo,
              stage: 'install', code: error.errCode, message: error.errMsg, retryable: true
            })
          })
          // #endif
          // #ifndef UNI-APP-X
          plus.runtime.install(filePath, { force: false }, () => { }, (error) => manager!.notifyUpdateFailed({
            taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId, packageInfo,
            stage: 'install', code: error.code, message: error.message, retryable: true
          }))
          // #endif
        } catch (error) {
          manager!.notifyUpdateFailed({
            taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId, packageInfo,
            stage: 'install', code: 'INSTALL_FAILED', message: getErrorMessage(error), retryable: true
          })
        }
      }
      // 发布端开启 verify_sha256 时，先在安装前校验安装包 SHA256（仅 uni-app x）
      const verifyThenInstall = () => {
        // #ifdef UNI-APP-X
        if (packageInfo.verify_sha256 == true) {
          verifyPackageSha256(filePath, packageInfo.sha256, () => { install() },
            (message : string, retryable : boolean) => {
              manager!.notifyUpdateFailed({
                taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId, packageInfo,
                stage: 'verify', code: null, message, retryable
              })
              uni.showModal({ title: '更新失败', content: message, showCancel: false })
            })
          return
        }
        // #endif
        install()
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
            cancelDownloadNotification()
            // #endif
            verifyThenInstall()
          }
        },
        complete: () => {
          // #ifdef APP-ANDROID
          notificationPromptOpen = false
          // #endif
        },
        fail: (error) => {
          // #ifdef APP-ANDROID
          notificationPromptOpen = false
          // #endif
          manager!.notifyUpdateFailed({ taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId, packageInfo,
            stage: 'prompt', code: null, message: error.errMsg, retryable: true })
        }
      })
    },
    startNotificationDownload(packageInfo, taskContext ?: UpdateTaskContext) {
      // #ifdef APP-ANDROID
      if (notificationDownloading || notificationPromptOpen) return
      if (notificationPackage !== null && notificationReadyPath.length > 0 && getPackageKey(notificationPackage!) === getPackageKey(packageInfo)) {
        if (isWgtPackage(packageInfo)) manager!.promptNotificationInstall()
        else manager!.notifyApkDownloaded(notificationPackage!, notificationReadyPath, snapshotTaskContext(notificationTaskContext))
        return
      }
      const currentTaskContext = snapshotTaskContext(taskContext)
      notificationPackage = packageInfo
      notificationTaskContext = currentTaskContext
      notificationDownloading = true
      notificationReadyPath = ''
      cancelDownloadNotification()
      console.log('[uni-upgrade-center-app] 通知下载开始', packageInfo.type, packageInfo.version)
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
        if (!notificationDownloading || notificationTaskContext?.taskId !== currentTaskContext.taskId) return
        notificationDownloading = false
        notificationReadyPath = ''
        const finishOptions : FinishNotificationProgressOptions = { title: '升级包下载失败', content: message, onClick: () => { } }
        try { finishNotificationProgress(finishOptions) } catch (error) { console.warn('[uni-upgrade-center-app] 失败通知更新失败', getErrorMessage(error)) }
        manager!.notifyUpdateFailed({ taskId: currentTaskContext.taskId, checkId: currentTaskContext.checkId, packageInfo, stage: 'download', code: null, message, retryable: true })
      }
      const handleNotificationDownloaded = (statusCode : number, rawTempFilePath : string) => {
        if (!notificationDownloading || notificationTaskContext?.taskId !== currentTaskContext.taskId) return
        if (statusCode != 200) {
          onDownloadFail(`下载失败（HTTP ${statusCode}）`)
          return
        }
        const readyPath = rawTempFilePath.length > 0 ? rawTempFilePath : filePath
        if (readyPath.length == 0) {
          // 未拿到可用路径时按失败处理，避免把空路径当成已下载
          onDownloadFail('下载文件路径为空，请重新检查更新')
          return
        }
        notificationDownloading = false
        notificationReadyPath = readyPath
        // #ifdef VUE3-VAPOR
        if (isWgtPackage(packageInfo)) saveWgtCacheRecord(packageInfo)
        // #endif
        const finishOptions : FinishNotificationProgressOptions = {
          title: '安装包下载完成', content: '点击安装', onClick: () => {
          if (notificationTaskContext?.taskId !== currentTaskContext.taskId) return
          if (isWgtPackage(packageInfo)) manager!.promptNotificationInstall()
          else manager!.notifyApkDownloaded(packageInfo, notificationReadyPath, currentTaskContext)
          }
        }
        // 通知栏是附加展示能力，其失败不能阻断下载完成后的用户确认。
        try { finishNotificationProgress(finishOptions) } catch (error) { console.warn('[uni-upgrade-center-app] 完成通知更新失败', getErrorMessage(error)) }
        if (isWgtPackage(packageInfo)) manager!.promptNotificationInstall()
        else manager!.notifyApkDownloaded(packageInfo, notificationReadyPath, currentTaskContext)
      }
      // 平台分支分别声明回调类型：uni1 无 uni-app x 专有类型 DownloadFileSuccess
      // #ifdef UNI-APP-X
      const onDownloadSuccess = (res : DownloadFileSuccess) => { handleNotificationDownloaded(res.statusCode, res.tempFilePath) }
      // #endif
      // #ifndef UNI-APP-X
      const onDownloadSuccess = (res : any) => { handleNotificationDownloaded(res.statusCode, res.tempFilePath) }
      // #endif
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
          if (!notificationDownloading || notificationTaskContext?.taskId !== currentTaskContext.taskId) return
          const total = res.totalBytesExpectedToWrite > 0 ? res.totalBytesExpectedToWrite : probedSize
          const progress = total > 0 ? Math.min(100, Math.max(0, Math.floor(res.totalBytesWritten / total * 100))) : 0
            const progressOptions : CreateNotificationProgressOptions = { title: '升级中心正在下载安装包……', content: `${progress}%`, progress, onClick: () => { } }
            try { createNotificationProgress(progressOptions) } catch (error) { console.warn('[uni-upgrade-center-app] 下载进度通知失败', getErrorMessage(error)) }
        })
      } else {
        onDownloadFail('下载任务创建失败，请重新检查更新')
      }
      // #endif
    },
  }

  // 仅 iOS 需要在应用进入后台、再回到前台时处理延后重启，避免依赖宿主 App.uvue。
  // #ifdef APP-IOS
  onAppHide(() => {
    manager!.handleAppHide()
  })
  onAppShow(() => {
    manager!.handleAppShow()
  })
  // #endif

  return manager!
}

export function createUpdateManager() : UpdateManager {
  if (singleton === null) singleton = createManager()
  return singleton!
}

export default createUpdateManager
