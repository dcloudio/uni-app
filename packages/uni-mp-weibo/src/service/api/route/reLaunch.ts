import {
  API_RE_LAUNCH,
  API_TYPE_RE_LAUNCH,
  defineAsyncApi,
  ReLaunchOptions,
  ReLaunchProtocol,
} from '@dcloudio/uni-api'
import { getCurrentPagesMap, removePage } from '../../../framework/setup/page'
import { navigate } from './utils'

function removeAllPages() {
  const keys = getCurrentPagesMap().keys()
  for (const routeKey of keys) {
    removePage(routeKey)
  }
}

export const reLaunch = defineAsyncApi<API_TYPE_RE_LAUNCH>(
  API_RE_LAUNCH,
  ({ url }, { resolve, reject }) => {
    return (
      removeAllPages(),
      navigate({ type: API_RE_LAUNCH, url }).then(resolve).catch(reject)
    )
  },
  ReLaunchProtocol,
  ReLaunchOptions
)
