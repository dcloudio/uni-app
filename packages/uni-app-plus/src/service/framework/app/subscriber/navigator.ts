import { registerServiceMethod } from '@dcloudio/uni-core'

const API_ROUTE = [
  'switchTab',
  'reLaunch',
  'redirectTo',
  'navigateTo',
  'navigateBack',
] as const
export function subscribeNavigator() {
  API_ROUTE.forEach((name) => {
    registerServiceMethod(name, (args) => {
      uni[name](args)
    })
  })
}
