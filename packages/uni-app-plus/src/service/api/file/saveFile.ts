import {
  API_SAVE_FILE,
  type API_TYPE_SAVE_FILE,
  SaveFileOptions,
  SaveFileProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'
import { getExtName } from '../../../helpers/file'
let index = 0

const SAVED_DIR = 'uniapp_save'
const SAVE_PATH = `_doc/${SAVED_DIR}`

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

export const saveFile = defineAsyncApi<API_TYPE_SAVE_FILE>(
  API_SAVE_FILE,
  ({ tempFilePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject)
    const fileName = `${Date.now()}${index++}${getExtName(tempFilePath)}`

    plus.io.resolveLocalFileSystemURL(
      tempFilePath,
      (entry) => {
        // 读取临时文件 FileEntry
        getSavedFileDir((dir) => {
          entry.copyTo(
            dir,
            fileName,
            () => {
              // 复制临时文件 FileEntry，为了避免把相册里的文件删除，使用 copy，微信中是要删除临时文件的
              const savedFilePath = SAVE_PATH + '/' + fileName
              resolve({
                savedFilePath,
              })
            },
            errorCallback
          )
        }, errorCallback)
      },
      errorCallback
    )
  },
  SaveFileProtocol,
  SaveFileOptions
)
