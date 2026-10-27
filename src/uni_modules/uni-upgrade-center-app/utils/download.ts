/**
 * 仅服务于 uni1（upgrade-popup.vue）：APP-PLUS 使用 plus.downloader，HarmonyOS 使用 uni.downloadFile。
 * uni-app x（upgrade-popup.uvue）的 uni.downloadFile 下载支付宝云资源已可触发 onProgressUpdate
 * （chunked 响应 totalBytesExpectedToWrite 为 -1、progress 为负数），
 * uvue 直接使用原生 uni.downloadFile，仅复用下方的 probeFileSize 探测安装包总大小计算进度。
 *
 * createUpgradeDownloadTask：创建升级包下载任务，返回 { onProgressUpdate(callback), abort() }，
 * 用法与 uni.downloadFile 返回的 DownloadTask 一致，首次调用 onProgressUpdate 后开始下载。
 * 进度策略（兼容阿里云 / 支付宝云）：
 * 1. 始终下载到固定路径：uni.downloadFile 指定 filePath（uni1 APP-PLUS 为 plus.downloader 的 filename）；
 * 2. 并行发起 Range: bytes=0-0 探测获取文件总大小（206 时取 Content-Range 尾部，否则取 Content-Length）；
 * 3. 若 1.5s 内收到原生 onProgressUpdate 回调（阿里云等响应带 Content-Length），进度以其为准；
 * 4. 若未收到（支付宝云等 chunked 流式响应不触发进度回调），轮询本地已下载文件大小计算进度；
 *    若此后原生回调又到（慢启动误判），停止轮询切回原生。
 *
 * probeFileSize：Range 探测文件总大小，uni1 下载任务与 uni-app x（uvue）下载进度计算共用。
 */
export type CreateUpgradeDownloadTaskOptions = {
  url : string,
  success ?: ((res : any) => void) | null,
  fail ?: ((err : any) => void) | null
}

const PROGRESS_CHECK_DELAY = 1500
const POLL_INTERVAL = 500

function readHeaderString(header : any | null, key : string) : string {
  if (header == null) return ''
  // #ifdef UNI-APP-X
  // UTS 的 any 不支持下标访问，且 res.header 运行时不保证为 UTSJSONObject，参照官方示例经 JSON 中转后读取
  const responseHeader = header as UTSJSONObject
  let value = responseHeader[key] as string
  if (value == null && key === 'content-length') value = responseHeader['Content-Length'] as string
  if (value == null && key === 'content-range') value = responseHeader['Content-Range'] as string
  return value ?? ''
  // #endif
  // #ifndef UNI-APP-X
  let value : any = header[key]
  if (value == null && key === 'content-length') value = header['Content-Length']
  if (value == null && key === 'content-range') value = header['Content-Range']
  if (value == null) return ''
  return `${value}`
  // #endif
}

function readResponseSize(header : any | null, statusCode : number) : number {
  if (statusCode == 206) {
    // Range 探测响应：总大小在 Content-Range 尾部（bytes 0-0/总大小），此时 Content-Length 仅为分片大小
    const rangeStr = readHeaderString(header, 'content-range')
    const idx = rangeStr.lastIndexOf('/')
    if (idx >= 0 && idx < rangeStr.length - 1) {
      // Android 平台 substring 的入参声明为 Int，使用 slice 规避 number 到 Int 的转换问题
      const size = parseInt(rangeStr.slice(idx + 1), 10)
      if (size > 0) return size
    }
    return 0
  }
  const lenStr = readHeaderString(header, 'content-length')
  if (lenStr.length > 0) {
    const size = parseInt(lenStr, 10)
    if (size > 0) return size
  }
  return 0
}

// 并行发起 Range: bytes=0-0 请求探测文件总大小（206 时取 Content-Range 尾部，否则取 Content-Length）
export function probeFileSize(url : string, success : (size : number) => void) : void {
  uni.request({
    url: url,
    method: 'GET',
    header: {
      'Range': 'bytes=0-0'
    },
    timeout: 8000,
    success: (res) => {
      success(readResponseSize(res.header, res.statusCode))
    },
    fail: (err) => { }
  })
}

// uni-app x 使用原生 uni.downloadFile + probeFileSize，不编译下方下载兼容层
// #ifndef UNI-APP-X
// 下载文件可能是 apk 或 wgt，后缀从下载地址提取（含点，如 .apk / .wgt），无法识别时回退 .apk
function getFileExtension(url : string) : string {
  const queryIndex = url.indexOf('?')
  const path = queryIndex >= 0 ? url.slice(0, queryIndex) : url
  const dotIndex = path.lastIndexOf('.')
  const slashIndex = path.lastIndexOf('/')
  if (dotIndex > slashIndex && dotIndex < path.length - 1) {
    return path.slice(dotIndex).toLowerCase()
  }
  return '.apk'
}

export function createUpgradeDownloadTask(options : CreateUpgradeDownloadTaskOptions) : any {
  const listeners : any[] = []
  let totalSize : number = 0
  let downloadedSize : number = 0
  let started : boolean = false
  let finished : boolean = false
  let aborted : boolean = false
  let activeTask : any = null
  let progressCheckTimer : any = null
  let pollTimer : any = null

  // 进度来源：0 未定 / 1 downloadFile 原生回调 / 2 本地文件大小轮询
  let progressMode : number = 0
  let downloadFileName = `upgrade_${Date.now()}${getFileExtension(options.url)}`

  // #ifdef APP-PLUS
  let downloadFilePath : string = `_downloads/${downloadFileName}`
  // #endif
  // #ifdef APP-HARMONY
  // uni1 HarmonyOS：下载到用户文件目录，供文件系统管理器轮询大小
  // 注意不可用 TEMP_PATH：仅 HarmonyOS 4.62+ 支持
  let downloadFilePath : string = `${uni.env.CACHE_PATH}/${downloadFileName}`
  // #endif

  function emitProgress(status : number, completed : boolean = false) {
    const progress = totalSize > 0 ? Math.min(100, Math.floor(downloadedSize / totalSize * 100)) : 0
    listeners.forEach((item : any) => {
      item({
        progress,
        totalBytesWritten: downloadedSize,
        totalBytesExpectedToWrite: totalSize,
        status,
        completed
      })
    })
  }

  function notifySuccess(tempFilePath : string) {
    if (finished || aborted) return
    finished = true
    const successCallback = options.success
    if (successCallback != null) {
      successCallback({
        statusCode: 200,
        tempFilePath: tempFilePath,
        errMsg: 'downloadFile:ok'
      })
    }
    emitProgress(4, true)
  }

  function notifyFail(errCode : number, errMsg : string) {
    if (finished || aborted) return
    finished = true
    const failCallback = options.fail
    if (failCallback != null) {
      failCallback({
        errCode,
        errMsg
      })
    }
  }

  function clearTimers() {
    if (progressCheckTimer != null) {
      clearTimeout(progressCheckTimer)
      progressCheckTimer = null
    }
    if (pollTimer != null) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  function readFileSize() {
    if (finished) return
    // #ifdef APP-PLUS
    if (plus.io) {
      plus.io.resolveLocalFileSystemURL(downloadFilePath, (entry) => {
        entry.getMetadata((meta) => {
          if (meta.size != null && meta.size >= 0) {
            downloadedSize = meta.size
            emitProgress(3)
          }
        }, () => { })
      }, () => { })
    }
    // #endif
    // #ifdef APP-HARMONY
    // uni1 HarmonyOS 使用文件系统管理器
    uni.getFileSystemManager().getFileInfo({
      filePath: downloadFilePath,
      success: (res : any) => {
        if (res.size >= 0) {
          downloadedSize = res.size
          emitProgress(3)
        }
      },
      fail: (err : any) => { }
    })
    // #endif
  }

  function onNativeProgress(res : any) {
    if (progressMode === 2) {
      // 原生进度晚到（下载初期误判为无进度），切回原生回调
      if (pollTimer != null) {
        clearInterval(pollTimer)
        pollTimer = null
      }
    }
    progressMode = 1
    if (res.totalBytesExpectedToWrite > 0) {
      totalSize = res.totalBytesExpectedToWrite
    }
    downloadedSize = res.totalBytesWritten
    emitProgress(3)
  }

  function checkNativeProgress() {
    if (progressMode === 0 && !finished) {
      // 下载已开始但未收到任何原生进度回调（支付宝云等 chunked 响应），切换为本地文件大小轮询
      progressMode = 2
      readFileSize()
      pollTimer = setInterval(readFileSize, POLL_INTERVAL)
    }
  }

  function probeTotalSize() {
    probeFileSize(options.url, (size : number) => {
      if (finished || aborted) return
      if (size > 0 && totalSize <= 0) {
        totalSize = size
        emitProgress(3)
      }
    })
  }

  function startDownload() {
    // #ifdef APP-PLUS
    const plusTask = plus.downloader.createDownload(options.url, {
      filename: downloadFilePath
    }, (download, status) => {
      clearTimers()
      if (status === 200) {
        downloadFilePath = download.filename || downloadFilePath
        downloadedSize = totalSize > 0 ? totalSize : (download.downloadedSize || downloadedSize)
        notifySuccess(downloadFilePath)
      } else {
        notifyFail(status, 'download fail')
      }
    })
    plusTask.addEventListener('statechanged', (download : any) => {
      if (download.downloadedSize > 0 && download.totalSize > 0) {
        onNativeProgress({
          totalBytesWritten: download.downloadedSize,
          totalBytesExpectedToWrite: download.totalSize
        })
      }
    })
    plusTask.start()
    activeTask = plusTask
    // #endif
    // #ifdef APP-HARMONY
    // uni1 HarmonyOS：指定 filePath 下载到用户数据目录，供轮询读取
    const uniTask = uni.downloadFile({
      url: options.url,
      filePath: downloadFilePath,
      success: (res : any) => {
        clearTimers()
        if (res.statusCode === 200) {
          // 传 filePath 时部分平台 tempFilePath 为空，优先取实际落盘路径
          if (res.tempFilePath != null && `${res.tempFilePath}`.length > 0) {
            downloadFilePath = res.tempFilePath
          }
          downloadedSize = totalSize > 0 ? totalSize : downloadedSize
          notifySuccess(downloadFilePath)
        } else {
          notifyFail(res.statusCode, 'downloadFile:fail statusCode ' + res.statusCode)
        }
      },
      fail: (err : any) => {
        clearTimers()
        notifyFail(-1, 'downloadFile:fail ' + JSON.stringify(err))
      }
    })
    uniTask.onProgressUpdate((res : any) => {
      onNativeProgress(res)
    })
    activeTask = uniTask
    // #endif
    progressCheckTimer = setTimeout(checkNativeProgress, PROGRESS_CHECK_DELAY)
    probeTotalSize()
  }

  return {
    onProgressUpdate(callback : (res : any) => void) : void {
      listeners.push(callback)
      if (!started) {
        started = true
        startDownload()
      }
    },
    abort() : void {
      aborted = true
      clearTimers()
      if (activeTask != null) {
        try {
          activeTask.abort()
        } catch (e) { }
      }
    }
  }
}
// #endif
