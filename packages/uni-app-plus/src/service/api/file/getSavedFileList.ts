import {
  API_GET_SAVED_LIST,
  type API_TYPE_GET_SAVED_LIST,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'

const SAVED_DIR = 'uniapp_save'

function getSavedFileDir(
  success: (res: any) => void,
  fail: (err: any) => void
) {
  fail = fail || function () {}
  plus.io.requestFileSystem(
    plus.io.PRIVATE_DOC,
    (fs) => {
      // 请求_doc fs
      fs.root!.getDirectory(
        SAVED_DIR,
        {
          // 获取文件保存目录对象
          create: true,
        },
        success,
        fail
      )
    },
    fail
  )
}

export const getSavedFileList = defineAsyncApi<API_TYPE_GET_SAVED_LIST>(
  API_GET_SAVED_LIST,
  (_, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject)

    getSavedFileDir((entry) => {
      var reader = entry.createReader()

      var fileList: UniApp.GetSavedFileListSuccessFileItem[] = []
      reader.readEntries((entries: any[]) => {
        if (entries && entries.length) {
          entries.forEach((entry) => {
            entry.getMetadata(
              (meta: {
                modificationTime: { getTime: () => number }
                size: any
              }) => {
                fileList.push({
                  filePath: plus.io.convertAbsoluteFileSystem(entry.fullPath),
                  createTime: meta.modificationTime.getTime(),
                  size: meta.size,
                })
                if (fileList.length === entries.length) {
                  resolve({
                    fileList,
                  })
                }
              },
              errorCallback,
              false
            )
          })
        } else {
          resolve({
            fileList,
          })
        }
      }, errorCallback)
    }, errorCallback)
  }
)
