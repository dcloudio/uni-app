import { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

import {
  RelationOptions,
  MPComponentInstance,
  CreateComponentOptions,
  CreateLifetimesOptions,
} from '@dcloudio/uni-mp-core'

import {
  initRefs,
  initMocks,
  initVueIds,
  $createComponent,
  $destroyComponent,
  initComponentInstance,
} from '@dcloudio/uni-mp-core'

export function initLifetimes({
  mocks,
  isPage,
  initRelation,
  vueOptions,
}: CreateLifetimesOptions) {
  return {
    attached(this: MPComponentInstance) {
      const properties = this.properties
      initVueIds(properties.vI, this)
      const relationOptions: RelationOptions = {
        vuePid: this._$vuePid,
      }
      // 初始化 vue 实例
      const mpInstance = this
      const mpType = isPage(mpInstance) ? 'page' : 'component'
      if (mpType === 'page' && !mpInstance.route && mpInstance.__route__) {
        mpInstance.route = mpInstance.__route__
      }
      this.$vm = $createComponent(
        {
          type: vueOptions,
          props: properties,
        },
        {
          mpType,
          mpInstance,
          slots: properties.vS, // vueSlots
          parentComponent: relationOptions.parent && relationOptions.parent.$,
          onBeforeSetup(
            instance: ComponentInternalInstance,
            options: CreateComponentOptions
          ) {
            initRefs(instance, mpInstance)
            initMocks(instance, mpInstance, mocks)
            initComponentInstance(instance, options)
          },
        }
      ) as ComponentPublicInstance

      // 处理父子关系
      initRelation(this, relationOptions)
    },
    detached(this: MPComponentInstance) {
      this.$vm && $destroyComponent(this.$vm)
    },
  }
}
