export function saveImage(
  dataURL: string,
  dirname: string,
  callback: (error: { message: string } | null, tempFilePath?: string) => void
) {
  UniViewJSBridge.invokeServiceMethod(
    'base64ToTempFilePath',
    { dataURL, dirname },
    (res) => {
      if (res.message) {
        callback(res)
      } else if (res.tempFilePath) {
        callback(null, res.tempFilePath)
      }
    }
  )
}
