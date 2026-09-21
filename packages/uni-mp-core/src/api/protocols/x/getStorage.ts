import type { MPProtocol } from '../types'
import { createUTSJSONObjectIfNeed } from './utils'

export const getStorage: MPProtocol = {
  args(fromArgs: UniApp.GetStorageOptions & { isUTS: boolean }) {
    if (fromArgs.isUTS) {
      const oldSuccess = fromArgs.success
      if (oldSuccess) {
        fromArgs.success = (res) => {
          res.data = createUTSJSONObjectIfNeed(res.data)
          oldSuccess!(res)
        }
      }
    }
  },
}
