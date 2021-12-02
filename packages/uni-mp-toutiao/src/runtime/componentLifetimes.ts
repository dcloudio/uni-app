import { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

import {
  RelationOptions,
  MPComponentInstance,
  CreateComponentOptions,
  CreateLifetimesOptions,
  fixProperties,
  initSetRef,
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
    // 字节跳动小程序 properties
    // 父组件在 attached 中 setData 设置了子组件的 props，在子组件的 attached 中，并不能立刻拿到
    // 此时子组件的 properties 中获取到的值，除了一部分初始化就有的值，只要在模板上绑定了，动态设置的 prop 的值均会根据类型返回，不会应用 prop 自己的默认值
    // 举例： easyinput 的 styles 属性，类型为 Object，`<easyinput :styles="styles"/>` 在 attached 中 styles 的值为 null
    // 目前 null 值会影响 render 函数执行，临时解决方案，调整 properties 中的 null 值为 undefined，让 Vue 来补充为默认值
    // 已知的其他隐患，当使用默认值时，可能组件行为不正确，比如 countdown 组件，默认值是0，导致直接就触发了 timeup 事件，这个应该是组件自身做处理？
    // 难道要等父组件首次 setData 完成后，再去执行子组件的初始化？
    fixProperties(properties)

    this.$vm = $createComponent(
      {
        type: vueOptions,
        props: properties,
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
    this.$vm && $destroyComponent(this.$vm)
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
