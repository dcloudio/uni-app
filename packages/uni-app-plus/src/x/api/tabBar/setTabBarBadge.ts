import { getTabBar } from '../../framework/app/tabBar'
import {
  defineAsyncApi,
  API_TYPE_SET_TAB_BAR_BADGE,
  API_SET_TAB_BAR_BADGE,
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions,
} from '@dcloudio/uni-api'

// export class SetTabBarErrorImpl extends SetTabBarError {
//   override errCode: SetTabBarErrCode
//   constructor(
//     errMsg: string,
//     errCode: SetTabBarErrCode = 100,
//     data: any | null = null,
//     cause: Error | null = null,
//     errSubject: string = ''
//   ) {
//     super()
//     this.errMsg = errMsg
//     this.errCode = errCode
//     this.data = data
//     this.cause = cause
//     this.errSubject = errSubject
//   }
// }

export const setTabBarBadge = defineAsyncApi<API_TYPE_SET_TAB_BAR_BADGE>(
  API_SET_TAB_BAR_BADGE,
  ({ index, text }, { resolve, reject }) => {
    const tabBar = getTabBar()
    if (tabBar === null) {
      reject()
      //  reject(new SetTabBarErrorImpl('tabBar is not exist'))
      return
    }
    tabBar!.setTabBarBadge(
      new Map<string, any | null>([
        ['index', index],
        ['text', text],
      ])
    )
    resolve()
  },
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)
