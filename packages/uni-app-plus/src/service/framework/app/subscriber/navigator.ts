import { extend } from '@vue/shared'
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
      ;(uni[name] as (options: any) => void)(
        extend(args, {
          fail(res: { errMsg: string }) {
            console.error(res.errMsg)
          },
        })
      )
    })
  })
}
