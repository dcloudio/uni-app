import { ComponentPublicInstance } from 'vue'

import { MiniProgramAppOptions } from '@dcloudio/uni-mp-core'

function onAliAuthError(
  this: ComponentPublicInstance,
  method: ($event: unknown) => void,
  $event: any
) {
  $event.type = 'getphonenumber'
  $event.detail.errMsg =
    'getPhoneNumber:fail Error: ' + $event.detail.errorMessage
  method($event)
}

function onAliGetAuthorize(
  this: ComponentPublicInstance,
  method: ($event: unknown) => void,
  $event: any
) {
  my.getPhoneNumber({
    success: (res) => {
      $event.type = 'getphonenumber'
      const response = JSON.parse(res.response)
      $event.detail.errMsg = 'getPhoneNumber:ok'
      $event.detail.encryptedData = response.response
      $event.detail.sign = response.sign
      method($event)
    },
    fail: (res) => {
      $event.type = 'getphonenumber'
      $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + JSON.stringify(res)
      method($event)
    },
  })
}

export function parse(appOptions: MiniProgramAppOptions) {
  const oldOnLaunch = appOptions.onLaunch as Function
  appOptions.onLaunch = function onLaunch(options: App.LaunchShowOption) {
    oldOnLaunch.call(this, options)
    if (!this.$vm) {
      return
    }
    const globalProperties = (this.$vm as any).$app.config.globalProperties
    if (!globalProperties.$onAliAuthError) {
      globalProperties.$onAliAuthError = onAliAuthError
      globalProperties.$onAliGetAuthorize = onAliGetAuthorize
    }
  }
}
