export type SendFn = ((msg: string) => void) | null

export type currentPageCaptureScreenshotCallBack = (
  base64: string,
  error: string
) => void

export function currentPageCaptureScreenshot(
  fullPage: boolean,
  callback: currentPageCaptureScreenshotCallBack
) {
  const pages = getCurrentPages() as UniPage[]
  const currentPage = pages[pages.length - 1]
  currentPage.vm?.$viewToTempFilePath({
    wholeContent: fullPage,
    overwrite: true,
    success: (res) => {
      const fileManager = uni.getFileSystemManager()
      // @ts-expect-error
      fileManager.readFile({
        encoding: 'base64',
        filePath: res.tempFilePath,
        success(readFileRes) {
          callback(readFileRes.data as string, '')
        },
        fail(err) {
          callback('', `captureScreenshot fail: ${JSON.stringify(err)}`)
        },
      } as ReadFileOptions)
    },
    fail: (err) => {
      callback('', `captureScreenshot fail: ${JSON.stringify(err)}`)
    },
  })
}
