import { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
// @ts-ignore
import { pruneComponentPropsCache } from 'vue'
import {
  RelationOptions,
  MPComponentInstance,
  CreateComponentOptions,
  CreateLifetimesOptions,
  initSetRef,
  findPropsData,
} from '@dcloudio/uni-mp-core'

import {
  initRefs,
  initMocks,
  initVueIds,
  $createComponent,
  $destroyComponent,
  initComponentInstance,
} from '@dcloudio/uni-mp-core'

const fixAttached = __PLATFORM__ === 'mp-toutiao'

// 基础库 2.0 以上 attached 顺序错乱，按照 created 顺序强制纠正
const components: MPComponentInstance[] = []

export function initLifetimes({
  mocks,
  isPage,
  initRelation,
  vueOptions,
}: CreateLifetimesOptions) {
  function created(this: MPComponentInstance) {
    components.push(this)
  }
  function attached(this: MPComponentInstance) {
    initSetRef(this)
    const properties = this.properties
    initVueIds(properties.uI, this)
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
        props: findPropsData(properties, mpType === 'page'),
      },
      {
        mpType,
        mpInstance,
        slots: properties.uS || {}, // vueSlots
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
  }

  function detached(this: MPComponentInstance) {
    if (this.$vm) {
      pruneComponentPropsCache(this.$vm.$.uid)
      $destroyComponent(this.$vm)
    }
  }
  if (!fixAttached) {
    return { attached, detached }
  }
  return {
    created,
    attached(this: MPComponentInstance) {
      this.__lifetimes_attached = function () {
        attached.call(this)
      }
      let component = this
      while (
        component &&
        component.__lifetimes_attached &&
        components[0] &&
        component === components[0]
      ) {
        components.shift()
        component.__lifetimes_attached()
        delete component.__lifetimes_attached
        component = components[0]
      }
    },
    detached,
  }
}
