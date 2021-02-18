import { createAsyncApi } from '@dcloudio/uni-api'

export const navigateBack = createAsyncApi<typeof uni.navigateBack>(
  'navigateBack',
  () => {}
)
