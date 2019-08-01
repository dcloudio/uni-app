import {
  invokeMethod
} from '../../platform'

export function removeTabBarBadge ({
  index
}) {
  return invokeMethod('setTabBarBadge', {
    index,
    type: 'none'
  })
}

export function showTabBarRedDot ({
  index
}) {
  return invokeMethod('setTabBarBadge', {
    index,
    type: 'redDot'
  })
}

export const hideTabBarRedDot = removeTabBarBadge
