import { hasOwn, hyphenate, isArray } from '@vue/shared'
import {
  type ComponentInternalInstance,
  type ComponentOptions,
  type ComponentPublicInstance,
  nextTick,
} from 'vue'

import type { MPComponentInstance, MPComponentOptions } from './component'

export function initVueIds(
  vueIds: string | undefined,
  mpInstance: MPComponentInstance
) {
  if (!vueIds) {
    return
  }
  const ids = vueIds.split(',')
  const len = ids.length

  if (len === 1) {
    mpInstance._$vueId = ids[0]
  } else if (len === 2) {
    mpInstance._$vueId = ids[0]
    mpInstance._$vuePid = ids[1]
  }
}

const EXTRAS = ['externalClasses']

export function initExtraOptions(
  miniProgramComponentOptions: MPComponentOptions,
  vueOptions: ComponentOptions
) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      ;(miniProgramComponentOptions as any)[name] = vueOptions[name]
    }
  })
}

const WORKLET_RE = /_(.*)_worklet_factory_/
export function initWorkletMethods(
  mpMethods: WechatMiniprogram.Component.MethodOption,
  vueMethods: ComponentOptions['methods']
) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE)
      if (matches) {
        const workletName = matches[1]
        mpMethods[name] = vueMethods[name]
        mpMethods[workletName] = vueMethods[workletName]
      }
    })
  }
}

export function initWxsCallMethods(
  methods: WechatMiniprogram.Component.MethodOption,
  wxsCallMethods: WechatMiniprogram.Component.MethodOption
) {
  if (!isArray(wxsCallMethods)) {
    return
  }
  wxsCallMethods.forEach((callMethod: string) => {
    methods[callMethod] = function (this: MPComponentInstance, args: unknown) {
      return (this.$vm as any)[callMethod](args)
    }
  })
}

function selectAllComponents(
  mpInstance: MPComponentInstance,
  selector: string,
  $refs: Record<string, ComponentPublicInstance>
) {
  const components = mpInstance.selectAllComponents(selector)
  components.forEach((component) => {
    const ref = component.properties.uR
    $refs[ref] = component.$vm || component
  })
}

export function initRefs(
  instance: ComponentInternalInstance,
  mpInstance: MPComponentInstance
) {
  Object.defineProperty(instance, 'refs', {
    get() {
      const $refs: Record<string, any> = {}
      selectAllComponents(mpInstance, '.r', $refs)
      const forComponents = mpInstance.selectAllComponents('.r-i-f')
      forComponents.forEach((component) => {
        const ref = component.properties.uR
        if (!ref) {
          return
        }
        if (!$refs[ref]) {
          $refs[ref] = []
        }
        $refs[ref].push(component.$vm || component)
      })
      return $refs
    },
  })
}

export function findVmByVueId(
  instance: ComponentPublicInstance,
  vuePid: string
): ComponentPublicInstance | undefined {
  // 标准 vue3 中 没有 $children，定制了内核
  const $children = (instance as any).$children
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i]
    if (childVm.$scope._$vueId === vuePid) {
      return childVm
    }
  }
  // 反向递归查找
  let parentVm
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid)
    if (parentVm) {
      return parentVm
    }
  }
}

const EVENT_OPTS = 'eO'
/**
 * 需要搭配：
 * ./componentInstance/index.ts:24 triggerEvent 时传递 __ins__
 * ./componentProps.ts:49 增加 properties eO
 * @param this
 * @param event
 * @returns
 */
export function handleEvent(
  this: MPComponentInstance,
  event: {
    type: string
    currentTarget: {
      dataset: Record<string, any>
    }
    detail: {
      __ins__: MPComponentInstance & { eO: Record<string, string> }
    }
  }
) {
  const {
    type,
    currentTarget: { dataset },
    detail: { __ins__ },
  } = event
  let methodName: string = type
  // 快手小程序的 __l 方法也会走此处逻辑，但没有 __ins__
  if (__ins__) {
    // 自定义事件，通过 triggerEvent 传递 __ins__
    let eventObj = {}
    try {
      // https://github.com/dcloudio/uni-app/issues/3647
      // 通过字符串序列化解决百度小程序修改对象不触发组件properties变化的Bug
      eventObj = JSON.parse(__ins__.properties[EVENT_OPTS])
    } catch (e) {}
    methodName = resolveMethodName(type, eventObj)
  } else if (dataset && dataset[EVENT_OPTS]) {
    // 快手小程序 input 等内置组件的 input 事件也会走此逻辑，所以从 dataset 中读取
    methodName = resolveMethodName(type, dataset[EVENT_OPTS])
  }
  if (!(this as any)[methodName]) {
    return console.warn(type + ' not found')
  }
  ;(this as any)[methodName](event)
}

function resolveMethodName(name: string, obj: Record<string, string>) {
  return obj[name] || obj[hyphenate(name)]
}
/**
 * @param properties
 */
export function fixProperties(properties: Record<string, any>) {
  Object.keys(properties).forEach((name) => {
    if (properties[name] === null) {
      properties[name] = undefined
    }
  })
}

export function nextSetDataTick(mpInstance: MPComponentInstance, fn: Function) {
  // 随便设置一个字段来触发回调（部分平台必须有字段才可以，比如头条）
  mpInstance.setData({ r1: 1 }, () => fn())
}

export function initSetRef(mpInstance: MPComponentInstance) {
  if (!mpInstance._$setRef) {
    mpInstance._$setRef = (fn: Function) => {
      nextTick(() => nextSetDataTick(mpInstance, fn))
    }
  }
}

let triggerEventId = 0

const triggerEventDetails: Record<string, unknown> = {}

export function wrapTriggerEventArgs(detail?: unknown, options?: unknown) {
  triggerEventId++
  triggerEventDetails[triggerEventId] = detail
  return [triggerEventId, options]
}

export function getTriggerEventDetail(eventId: number) {
  const detail = triggerEventDetails[eventId]
  delete triggerEventDetails[eventId]
  return detail
}
