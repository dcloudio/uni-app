import {
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
} from '@dcloudio/uni-api/src/helpers/api'
import { UniError } from '@dcloudio/uni-app-x/types/native'

// 将上述方法导出到全局
declare global {
  const process: any
  const defineOnApi: typeof defineOnApi
  const defineOffApi: typeof defineOffApi
  const defineTaskApi: typeof defineTaskApi
  const defineSyncApi: typeof defineSyncApi
  const defineAsyncApi: typeof defineAsyncApi
  const UniError: typeof UniError
}
