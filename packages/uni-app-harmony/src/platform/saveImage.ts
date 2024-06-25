import { BASE64_TO_TEMP_FILE_PATH } from '../constants'

export function saveImage(
  dataURL: string,
  dirname: string,
  callback: (error: { message: string } | null, tempFilePath?: string) => void
) {
  UniViewJSBridge.invokeServiceMethod(
    BASE64_TO_TEMP_FILE_PATH,
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
