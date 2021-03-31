import { defineAsyncApi } from '@dcloudio/uni-api'

export const navigateBack = defineAsyncApi<typeof uni.navigateBack>(
  'navigateBack',
  () => {}
)
