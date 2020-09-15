import { createApi } from '@dcloudio/uni-api'

export const navigateTo = createApi<typeof uni.navigateTo>(options => {
  const router = getApp().$router
  router.push(options.url)
})
