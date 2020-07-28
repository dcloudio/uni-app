import { ComponentPublicInstance } from 'vue'

import { MiniProgramAppOptions } from '@dcloudio/uni-mp-core'

function onAliAuthError(
  this: ComponentPublicInstance,
  method: string,
  $event: any
) {
  $event.type = 'getphonenumber'
  $event.detail.errMsg =
    'getPhoneNumber:fail Error: ' +
    $event.detail.errorMessage(this as any)[method]($event)
}

function onAliGetAuthorize(
  this: ComponentPublicInstance,
  method: string,
  $event: any
) {
  my.getPhoneNumber({
    success: (res: Record<string, any>) => {
      $event.type = 'getphonenumber'
      const response = JSON.parse(res.response).response
      if (response.code === '10000') {
        // success
        $event.detail.errMsg = 'getPhoneNumber:ok'
        $event.detail.encryptedData = res.response
      } else {
        $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + res.response
      }
      ;(this as any)[method]($event)
    },
    fail: () => {
      $event.type = 'getphonenumber'
      $event.detail.errMsg = 'getPhoneNumber:fail'
      ;(this as any)[method]($event)
    }
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
