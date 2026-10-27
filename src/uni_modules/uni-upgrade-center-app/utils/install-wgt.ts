// #ifdef VUE3-VAPOR && APP && !APP-HARMONY
/**
 * uni-app x vapor 应用的 wgt 安装：SHA256 完整性校验 + 安装 + 安装后收尾
 * 供升级弹窗路径（pages/uni-app-x/upgrade-popup.uvue）与静默更新路径（utils/check-update.ts）复用。
 *
 * 缓存复用：wgt 下载完成后写入缓存记录（WgtCacheRecord），下次进入升级弹窗时按"版本 + 链接路径"比对，
 * 同一个包直接复用本地文件（避免重复下载）；安装成功、版本无需更新、校验失败、过期或重新下载前统一清除缓存。
 * apk 不参与缓存（系统安装器按需流式读取文件，无法确定安全的清理时机）。
 *
 * 注意：uni.installWgt 自身不接收、不计算也不校验 SHA256，完整性校验由本模块负责；
 * uni.installWgt 内置版本号、appId、字节码版本校验，客户端无需重复比对版本。
 *
 * TODO vapor-harmony 支持热更新后，移除各调用处（check-update、upgrade-popup）的 !APP-HARMONY 条件即可启用
 */
import { UniUpgradeCenterResult } from './call-check-version'

/**
 * wgt 资源包下载落盘路径：固定文件名（仅保留一份缓存，重新下载时覆盖），后缀跟随下载链接（.zst / .wgt），无法识别时使用 .wgt
 * uni.installWgt 不依赖文件后缀，保留后缀便于识别
 */
export function getWgtCacheFilePath(url : string) : string {
  const queryIndex = url.indexOf('?')
  const path = queryIndex >= 0 ? url.slice(0, queryIndex) : url
  const suffix = path.toLowerCase().endsWith('.zst') ? '.zst' : '.wgt'
	// 在 App 端 CACHE_PATH 之类都是以 / 结尾
	// #ifdef UNI-APP-X
	// @ts-ignore uni.env 仅在 uni-app x Vapor 编译目标中提供，uni1 不执行此分支
	return `${uni.env.CACHE_PATH}upgrade_cache${suffix}`
	// #endif
	// #ifndef UNI-APP-X
	return `upgrade_cache${suffix}`
	// #endif
}

/** wgt 缓存记录存储键 */
const WGT_CACHE_KEY = 'UNI_UPGRADE_CENTER_WGT_CACHE'

/** wgt 资源包缓存记录（下载完成后写入，供下次进入升级弹窗时复用） */
export type WgtCacheRecord = {
  /** 资源包版本号 */
  version : string,
  /** 资源包下载链接（与远端记录比对，判断是否为同一个包） */
  url : string,
  /** 落盘文件名（路径由 CACHE_PATH 动态重建，不存完整路径，避免沙盒路径变化失效） */
  fileName : string,
  /** 记录时间戳 */
  savedAt : number
}

/**
 * 读取本地 wgt 缓存记录；无记录或数据异常（含旧格式/脏数据）时返回 null
 */
export function getWgtCacheRecord() : WgtCacheRecord | null {
  const raw = uni.getStorageSync(WGT_CACHE_KEY)
  if (raw == null || raw == '') return null
  try {
		const parsed = JSON.parse(JSON.stringify(raw)) as WgtCacheRecord
    // 字段类型守卫：旧格式或脏数据视为无缓存，避免后续比对抛异常
    if (parsed.version == null || parsed.url == null || parsed.fileName == null) return null
    return parsed
  } catch (e) {
    return null
  }
}

/**
 * 下载完成后写入 wgt 缓存记录（fileName 与 getWgtCacheFilePath 的约定文件名一致，路径由 CACHE_PATH 动态重建）
 */
export function saveWgtCacheRecord(packageInfo : UniUpgradeCenterResult) : void {
  const cachePath = getWgtCacheFilePath(packageInfo.url)
  const slashIndex = cachePath.lastIndexOf('/')
  const fileName = slashIndex >= 0 ? cachePath.slice(slashIndex + 1) : cachePath
  const record : WgtCacheRecord = {
    version: packageInfo.version,
    url: packageInfo.url,
    fileName: fileName,
    savedAt: Date.now()
  }
  uni.setStorageSync(WGT_CACHE_KEY, record)
}

/**
 * 判断缓存记录是否与当前待安装的资源包为同一个包：
 * 版本号一致，且链接路径一致（忽略查询参数——腾讯云等临时链接带签名参数，同一文件的路径部分稳定）
 */
export function isSameWgtPackage(record : WgtCacheRecord, packageInfo : UniUpgradeCenterResult) : boolean {
  return record.version == packageInfo.version && stripUrlQuery(record.url) == stripUrlQuery(packageInfo.url)
}

function stripUrlQuery(url : string) : string {
  const queryIndex = url.indexOf('?')
  return queryIndex >= 0 ? url.slice(0, queryIndex) : url
}

/**
 * 清除 wgt 缓存：删除记录与对应缓存文件（安装完成 / 校验失败 / 过期 / 重新下载前调用）
 * 使用同步删除：下载前调用时须确保文件已删除，避免与下载写文件产生竞态；文件不存在等异常忽略（幂等）
 */
export function clearWgtCache(filePath : string) : void {
  uni.removeStorageSync(WGT_CACHE_KEY)
  if (filePath.length > 0) {
		try {
			// @ts-ignore 文件系统 API 仅在 uni-app x Vapor 编译目标中提供
			uni.getFileSystemManager().unlinkSync(filePath)
    } catch (e) {
      // 文件不存在等异常忽略
    }
  }
}

export type InstallVaporWgtOptions = {
  /** 安装包信息 */
  packageInfo : UniUpgradeCenterResult,
  /** 已下载的 wgt 资源包（.zst / .wgt）本地路径 */
  filePath : string,
  /** 校验或安装失败回调（弹窗路径用于重置状态供重试；静默路径仅记录日志） */
  onFail : (message : string) => void,
  /** 安装成功回调 */
  onSuccess ?: (() => void) | null
  /** 安装包版本不高于当前版本；不触发安装成功及重启 */
  onAlreadyLatest : () => void
}

function doInstall(options : InstallVaporWgtOptions) : void {
	let settled = false
  let timeoutId = -1
  const succeed = () => {
    if (settled) return
    settled = true
    clearTimeout(timeoutId)
    clearWgtCache(options.filePath)
    options.onSuccess?.()
  }
  const fail = (message : string) => {
    if (settled) return
    settled = true
    clearTimeout(timeoutId)
    options.onFail(message)
  }
  const alreadyLatest = () => {
    if (settled) return
    settled = true
    clearTimeout(timeoutId)
    clearWgtCache(options.filePath)
    options.onAlreadyLatest()
    uni.showToast({ title: '应用已经是最新版本', icon: 'none', position: 'bottom' })
  }
  timeoutId = setTimeout(() => { fail('WGT 安装超时，未收到安装结果，请稍后重试') }, 120000)
	try {
		// @ts-ignore uni.installWgt 仅在 uni-app x Vapor 编译目标中提供
		uni.installWgt({
      filePath: options.filePath,
      success: (_ : any) => { succeed() },
      fail: (err : any) => {
        if (err.errCode == 103611) alreadyLatest()
        else fail(`安装失败（错误码 ${err.errCode}）：${err.errMsg}`)
      }
    })
  } catch (error) {
		fail('调用 uni.installWgt 失败')
  }
}

export function installVaporWgt(options : InstallVaporWgtOptions) : void {
  const sha256 = options.packageInfo.sha256
  // 兼容历史数据：Vapor 标记字段由驼峰 isVapor 更名为蛇形 is_vapor
  const isVaporPackage = options.packageInfo.is_vapor === true || options.packageInfo.isVapor === true
  // 非 vapor 标记的 wgt 无需 SHA256 校验，直接安装
  // （云函数仅向 vapor 应用下发 vapor 标记的 wgt，此处为防御分支）
  if (!isVaporPackage) {
    doInstall(options)
    return
  }
  // Vapor 资源包必须携带 SHA256（admin 端发布时写入），缺失视为数据异常，拒绝安装
  if (sha256 == null || sha256.length == 0) {
    options.onFail('安装包校验信息缺失，请重新检查更新')
    return
  }
  // 计算本地文件摘要，与安装包信息中的 SHA256 比对（统一小写），防止下载损坏或被篡改
	// @ts-ignore 文件系统 API 仅在 uni-app x Vapor 编译目标中提供
	uni.getFileSystemManager().getFileInfo({
    filePath: options.filePath,
    digestAlgorithm: 'sha256',
    success: (res : any) => {
      if (res.digest.toLowerCase() != sha256!.toLowerCase()) {
        // 文件损坏：清除缓存文件与记录，避免下次进入弹窗仍命中坏包
        clearWgtCache(options.filePath)
        options.onFail('安装包校验失败，请重新下载')
        return
      }
      doInstall(options)
    },
    fail: (err : any) => {
      options.onFail('获取安装包信息失败：' + err.errMsg)
    }
  })
}
// #endif
