import { API_TYPE_ASYNC, createApi } from '@dcloudio/uni-api'

export const navigateTo = createApi<typeof uni.navigateTo>(
  { type: API_TYPE_ASYNC },
  (options) => {
    const router = getApp().$router
    router.push(options.url)
  }
)
