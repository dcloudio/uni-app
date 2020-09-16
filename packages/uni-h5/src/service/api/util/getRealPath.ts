import { API_TYPE_SYNC, createApi } from '@dcloudio/uni-api'

export const getRealPath = createApi(
  { type: API_TYPE_SYNC },
  (path: string) => {
    return path
  }
)
