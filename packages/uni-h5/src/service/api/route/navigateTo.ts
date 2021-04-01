import { isNavigationFailure, Router } from 'vue-router'
import {
  API_NAVIGATE_TO,
  defineAsyncApi,
  NavigateToOptions,
  NavigateToProtocol,
} from '@dcloudio/uni-api'
import { createPageState } from '../../../framework/plugin/page'

export const navigateTo = defineAsyncApi<typeof uni.navigateTo>(
  API_NAVIGATE_TO,
  (options, callback?: Function) => {
    const router = getApp().$router as Router
    router
      .push({
        path: options.url,
        force: true,
        state: createPageState('navigateTo'),
      })
      .then((failure) => {
        if (isNavigationFailure(failure)) {
          return callback!({
            errMsg: `${API_NAVIGATE_TO}:fail ${failure.message}`,
          })
        }
        callback!()
      })
  },
  NavigateToProtocol,
  NavigateToOptions
)
