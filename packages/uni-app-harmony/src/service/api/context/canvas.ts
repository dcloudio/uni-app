import fs from '@ohos.file.fs'
import buffer from '@ohos.buffer'
import type { BusinessError } from '@ohos.base'
import { registerServiceMethod } from '@dcloudio/uni-core'
import { BASE64_TO_TEMP_FILE_PATH } from '../../../constants'

interface Options {
  dataURL: string
  dirname: string
}

let index = 0

export function subscribeBase64ToTempFilePath() {
  registerServiceMethod(BASE64_TO_TEMP_FILE_PATH, (args: Options, resolve) => {
    const { dataURL, dirname } = args

    const id = `${Date.now()}_${index++}`
    const array = dataURL.split(',')
    const scheme = array[0]
    const base64 = array[1]
    const format = (scheme.match(/data:image\/(\S+?);/) || [
      '',
      'png',
    ])[1].replace('jpeg', 'jpg')
    const fileName = `${id}.${format}`
    const tempFilePath = `${dirname}/${fileName}`

    try {
      if (!fs.accessSync(dirname)) {
        fs.mkdirSync(dirname)
      }
    } catch (error) {
      resolve(error)
      return
    }

    fs.createStream(
      tempFilePath,
      'w',
      (err: BusinessError<void>, stream: fs.Stream) => {
        if (err) {
          stream.closeSync()
          return resolve(err)
        }
        stream.write(
          buffer.from(base64, 'base64').buffer,
          (err: BusinessError<void>) => {
            if (err) {
              stream.closeSync()
              return resolve(err)
            }
            stream.closeSync()
            return resolve({ tempFilePath: `file://${tempFilePath}` })
          }
        )
      }
    )
  })
}
