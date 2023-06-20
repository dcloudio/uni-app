import {
  onMethod,
  invokeMethod
} from '../../platform'

import {
  invoke
} from 'uni-core/service/bridge'

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

const callbacks = []

onMethod('onTabBarMidButtonTap', res => {
  callbacks.forEach(callbackId => {
    invoke(callbackId, res)
  })
})

export function onTabBarMidButtonTap (callbackId) {
  callbacks.push(callbackId)
}
