import {
  type ComponentPublicInstance,
  onBeforeMount,
  onServerPrefetch,
} from 'vue'
import AsyncLoadingComponent from '../components/async-loading/asyncLoading.vue'
import AsyncErrorComponent from '../components/async-error/asyncError.vue'
import {
  defineGlobalData,
  initAppVm,
  initService,
  initUniAppVmMethodWarnings,
  initView,
  warnUniAppVmMethod,
} from '@dcloudio/uni-core'
import { getCurrentBasePages } from './page'
import { getScopeId } from './utils'
import type { UniApp } from '@dcloudio/uni-app-x/types/app'

let appVm: ComponentPublicInstance
let $uniApp: UniApp
let uniAppVmMethodNames = new Set<string>()
if (__X__) {
  class UniAppImpl implements UniApp {
    get vm() {
      return appVm
    }
    get $vm() {
      return appVm
    }
    get globalData() {
      return appVm?.globalData || {}
    }
    getAndroidApplication() {
      return null
    }
    getHarmonyAbility() {
      return null
    }
  }
  const uniApp = new UniAppImpl()
  $uniApp = __DEV__
    ? new Proxy(uniApp, {
        get(target, key, receiver) {
          const value = Reflect.get(target, key, receiver)
          if (
            typeof key === 'string' &&
            value === undefined &&
            uniAppVmMethodNames.has(key)
          ) {
            warnUniAppVmMethod(key)
          }
          return value
        },
      })
    : uniApp
}

export function getApp() {
  if (__X__) {
    return $uniApp
  } else {
    return appVm
  }
}

export function initApp(vm: ComponentPublicInstance) {
  appVm = vm
  if (__X__ && __DEV__) {
    const initVmMethodWarnings = () => {
      uniAppVmMethodNames = initUniAppVmMethodWarnings($uniApp)
    }
    onBeforeMount(initVmMethodWarnings)
    onServerPrefetch(initVmMethodWarnings)
  }

  // 定制 App 的 $children 为 devtools 服务 __VUE_PROD_DEVTOOLS__
  Object.defineProperty((appVm.$ as any).ctx, '$children', {
    get() {
      return getCurrentBasePages().map((page) => page.$vm)
    },
  })

  const app = appVm.$.appContext.app
  if (!app.component(AsyncLoadingComponent.name!)) {
    app.component(AsyncLoadingComponent.name!, AsyncLoadingComponent)
  }
  if (!app.component(AsyncErrorComponent.name!)) {
    app.component(AsyncErrorComponent.name!, AsyncErrorComponent)
  }
  initAppVm(appVm)
  defineGlobalData(appVm)
  initService()
  initView()
  if (!__NODE_JS__) {
    updateAppBodyScopeId(appVm)
  }
}

function updateAppBodyScopeId(vm: ComponentPublicInstance) {
  const scopeId = getScopeId(vm.$)
  if (scopeId) {
    document.body.setAttribute(scopeId, '')
  }
}
