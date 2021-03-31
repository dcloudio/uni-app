import { Router } from 'vue-router'
import { defineAsyncApi } from '@dcloudio/uni-api'
import { createPageState } from '../../../framework/plugin/page'

export const navigateTo = defineAsyncApi<typeof uni.navigateTo>(
  'navigateTo',
  (options) => {
    const router = getApp().$router as Router
    router.push({
      path: options.url,
      force: true,
      state: createPageState('navigateTo'),
    })
  }
)
