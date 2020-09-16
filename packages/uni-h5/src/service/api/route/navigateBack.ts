import { API_TYPE_ASYNC, createApi } from '@dcloudio/uni-api'

export const navigateBack = createApi<typeof uni.navigateBack>(
  { type: API_TYPE_ASYNC },
  () => {}
)
