import { hasOwn, isFunction } from '@vue/shared'

import type {
  ComponentInternalInstance,
  ComponentOptions,
  ComponentPublicInstance,
} from 'vue'

// @ts-expect-error EMPTY_OBJ 不能从 @vue/shared 中引入，从 vue 中导入，保持一致
import { EMPTY_OBJ, setTemplateRef } from 'vue'

import {
  $createComponent,
  type CreateComponentOptions,
  findPropsData,
  initComponentInstance,
  initMocks,
  initRefs,
} from '@dcloudio/uni-mp-core'

export { handleLink } from '@dcloudio/uni-mp-weixin'

type MPPageInstance = tinyapp.IPageInstance<Record<string, any>>
export type MPComponentInstance = tinyapp.IComponentInstance<
  Record<string, any>,
  any
>

export const mocks = ['nodeId', 'componentId', 'componentPath']

export function initSpecialMethods(
  mpInstance: MPPageInstance | MPComponentInstance
) {
  if (!mpInstance.$vm) {
    return
  }
  let path = mpInstance.is || mpInstance.route
  if (!path) {
    return
  }
  if (path.indexOf('/') === 0) {
    path = path.slice(1)
  }
  const specialMethods =
    (xhs as any).specialMethods && (xhs as any).specialMethods[path]
  if (specialMethods) {
    specialMethods.forEach((method: string) => {
      if (isFunction(mpInstance.$vm[method])) {
        mpInstance[method] = function (event: Record<string, any>) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {}
            event.detail.markerId = event.markerId
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event)
        }
      }
    })
  }
}

export function createVueComponent(
  mpType: 'page' | 'component',
  mpInstance: MPPageInstance | MPComponentInstance,
  vueOptions: ComponentOptions,
  parent?: ComponentPublicInstance
) {
  return $createComponent(
    {
      type: vueOptions,
      props: findPropsData(mpInstance.props, mpType === 'page'),
    },
    {
      mpType,
      mpInstance,
      slots: mpInstance.props.uS || {}, // vueSlots
      parentComponent: parent && parent.$,
      onBeforeSetup(
        instance: ComponentInternalInstance,
        options: CreateComponentOptions
      ) {
        initRefs(instance, mpInstance as any)
        initMocks(instance, mpInstance as any, mocks)
        initComponentInstance(instance, options)
      },
    }
  ) as ComponentPublicInstance
}
