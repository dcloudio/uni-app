import {
  defineAsyncApi,
  API_GET_FILE_INFO,
  API_TYPE_GET_FILE_INFO,
  GetFileInfoProtocol,
  GetFileInfoOptions,
} from '@dcloudio/uni-api'
import { urlToFile } from '../../../helpers/file'

export const getFileInfo = defineAsyncApi<API_TYPE_GET_FILE_INFO>(
  API_GET_FILE_INFO,
  ({ filePath }, { resolve, reject }) => {
    // TODO 计算文件摘要
    urlToFile(filePath)
      .then((res) => {
        resolve({
          size: res.size,
        } as UniApp.GetFileInfoSuccess)
      })
      .catch((err) => {
        reject(String(err))
      })
  },
  GetFileInfoProtocol,
  GetFileInfoOptions
)
