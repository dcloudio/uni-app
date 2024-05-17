// import { API_ON_TAB_BAR_MID_BUTTON_TAP, defineOnApi } from '@dcloudio/uni-api'
import { onTabBarMidButtonTapCallback } from '../../framework/app/tabBar'

export const onTabBarMidButtonTap = (cb: Function) => {
  onTabBarMidButtonTapCallback.push(cb)
}
