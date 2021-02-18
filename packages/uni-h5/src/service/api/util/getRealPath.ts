import { createSyncApi } from '@dcloudio/uni-api'

export const getRealPath = createSyncApi('getRealPath', (path: string) => {
  return path
})
