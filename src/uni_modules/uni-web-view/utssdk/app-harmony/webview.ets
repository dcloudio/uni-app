import harmonyWebView from '@ohos.web.webview'
import { picker } from '@kit.CoreFileKit'
import fs from '@ohos.file.fs'
import call from '@ohos.telephony.call'
import { getAbilityContext, getEnv } from '@dcloudio/uni-app-x-runtime'

interface IDownloadTask {
  downloadItemSaveUri: string
  downloadTmpPath: string
}

let uniqueDownloadId = 0
const downloadTaskMap = new Map<string, IDownloadTask>()

export function createDownloadDelegate() {
  const delegate: harmonyWebView.WebDownloadDelegate =
    new harmonyWebView.WebDownloadDelegate()
  delegate.onBeforeDownload(
    (webDownloadItem: harmonyWebView.WebDownloadItem) => {
      const documentSaveOptions = new picker.DocumentSaveOptions()
      const suggestedFileName = webDownloadItem.getSuggestedFileName()
      documentSaveOptions.newFileNames = [suggestedFileName]
      const documentPicker = new picker.DocumentViewPicker(getAbilityContext()!)
      documentPicker
        .save(documentSaveOptions)
        .then((documentSaveResult: Array<string>) => {
          const downloadItemSaveUri = documentSaveResult[0]
          // 此处可能无法准确获取当前mp，但是不影响功能，暂且忽略
          const downloadTmpPath =
            getEnv().TEMP_PATH +
              '/download/' +
              suggestedFileName +
              '.' +
              uniqueDownloadId++
          const downloadGuid = webDownloadItem.getGuid()
          downloadTaskMap.set(downloadGuid, {
            downloadItemSaveUri,
            downloadTmpPath,
          })
          // webDownloadItem.start只能接受路径不能接受uri，现通过先下载再移动的方式实现下载
          webDownloadItem.start(downloadTmpPath)
        })
        .catch((err: Error) => {
          webDownloadItem.cancel()
        })
    },
  )
  delegate.onDownloadFailed(webDownloadItem => {
    const downloadGuid = webDownloadItem.getGuid()
    downloadTaskMap.delete(downloadGuid)
  })
  delegate.onDownloadFinish(async webDownloadItem => {
    const downloadGuid = webDownloadItem.getGuid()
    const downloadTask = downloadTaskMap.get(downloadGuid)
    downloadTaskMap.delete(downloadGuid)
    if (!downloadTask) {
      return
    }
    const downloadItemSaveUri = downloadTask.downloadItemSaveUri
    const downloadTmpPath = downloadTask.downloadTmpPath
    const fromFile = await fs.open(downloadTmpPath, fs.OpenMode.READ_ONLY)
    const toFile = await fs.open(
      downloadItemSaveUri,
      fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY,
    )
    await fs.copyFile(fromFile.fd, toFile.fd)
    await fs.close(fromFile)
    await fs.close(toFile)
  })
  return delegate
}

export function createTelSchemeHandler() {
  const telSchemeHandler = new harmonyWebView.WebSchemeHandler()
  telSchemeHandler.onRequestStart(request => {
    const url = request.getRequestUrl()
    const phoneNumber = url.replace('tel:', '').trim()
    call.makeCall(phoneNumber)
    return true
  })
  return telSchemeHandler
}