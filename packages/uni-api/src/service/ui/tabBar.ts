import { defineOnApi } from '../../helpers/api'
export type OnTabBarMidButtonTap = typeof uni.onTabBarMidButtonTap

export const API_ON_TAB_BAR_MID_BUTTON_TAP = 'onTabBarMidButtonTap'

export const onTabBarMidButtonTap = defineOnApi<OnTabBarMidButtonTap>(
  API_ON_TAB_BAR_MID_BUTTON_TAP,
  () => {
    // noop
  }
)
