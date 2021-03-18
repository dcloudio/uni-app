import { Router } from 'vue-router'
import { createAsyncApi } from '@dcloudio/uni-api'
import { createPageState } from '../../../framework/plugin/page'

export const navigateTo = createAsyncApi<typeof uni.navigateTo>(
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
