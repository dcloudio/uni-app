import { ComponentOptions, ComponentPublicInstance } from 'vue'
// @ts-ignore
import { pruneComponentPropsCache } from 'vue'
import {
  initProps,
  initBehaviors,
  initData,
  $destroyComponent,
  initVueIds,
  initWxsCallMethods,
} from '@dcloudio/uni-mp-core'
import {
  handleRef,
  handleLink,
  triggerEvent,
  isComponent2,
  initSpecialMethods,
  MPComponentInstance,
  initRelation,
  initChildVues,
  createVueComponent,
  RelationOptions,
  createObserver,
} from './util'

declare function Component<P, D, M extends tinyapp.IComponentMethods>(
  options: tinyapp.ComponentOptions<P, D, M>
): void

function initComponentProps(_rawProps: Record<string, any>) {
  const propertiesOptions = {
    properties: {},
  }
  initProps(propertiesOptions)
  const properties = propertiesOptions.properties as Record<string, any>
  const props: Record<string, any> = {
    // onVueInit
    onVI: function () {},
  }
  Object.keys(properties).forEach((key) => {
    // vueSlots
    if (key !== 'uS') {
      props[key] = properties[key].value
    }
  })

  return props
}

function initVm(
  mpInstance: MPComponentInstance,
  createComponent: (parent: ComponentPublicInstance) => ComponentPublicInstance
) {
  if (mpInstance.$vm) {
    return
  }
  const properties = mpInstance.props
  initVueIds(properties.uI, mpInstance as any)
  const relationOptions: RelationOptions = {
    vuePid: mpInstance._$vuePid,
    mpInstance,
    createComponent,
  }
  if (isComponent2) {
    // 处理父子关系
    initRelation(mpInstance, relationOptions)
    // 初始化 vue 实例
    mpInstance.$vm = createComponent(relationOptions.parent!)
  } else {
    // 处理父子关系
    initRelation(mpInstance, relationOptions)
    if (relationOptions.parent) {
      // 父组件已经初始化，直接初始化子，否则放到父组件的 didMount 中处理
      // 初始化 vue 实例
      mpInstance.$vm = createComponent(relationOptions.parent)
      handleRef.call(relationOptions.parent.$scope as any, mpInstance)
      initChildVues(mpInstance)
      mpInstance.$vm.$callHook('mounted')
    }
  }
}

export function initCreateComponent() {
  return function createComponent(vueOptions: ComponentOptions) {
    vueOptions = vueOptions.default || vueOptions
    const mpComponentOptions: tinyapp.ComponentOptions = {
      props: initComponentProps(vueOptions.props),
      didMount() {
        const createComponent = (parent?: ComponentPublicInstance) => {
          return createVueComponent('component', this, vueOptions, parent)
        }
        if ((my as any).dd) {
          // 钉钉小程序底层基础库有 bug,组件嵌套使用时,在 didMount 中无法及时调用 props 中的方法
          setTimeout(() => {
            initVm(this, createComponent)
          }, 4)
        } else {
          initVm(this, createComponent)
        }
        initSpecialMethods(this)
        if (isComponent2) {
          this.$vm.$callHook('mounted')
        }
      },
      didUnmount() {
        if (this.$vm) {
          pruneComponentPropsCache(this.$vm.$.uid)
          $destroyComponent(this.$vm)
        }
      },
      methods: {
        __r: handleRef,
        __l: handleLink,
        triggerEvent,
      },
    }
    if (__VUE_OPTIONS_API__) {
      mpComponentOptions.data = initData(vueOptions)
      mpComponentOptions.mixins = initBehaviors(vueOptions)
    }

    if (isComponent2) {
      mpComponentOptions.onInit = function onInit(this: MPComponentInstance) {
        initVm(this, (parent?: ComponentPublicInstance) => {
          return createVueComponent('component', this, vueOptions, parent)
        })
      }
      mpComponentOptions.deriveDataFromProps = createObserver()
    } else {
      mpComponentOptions.didUpdate = createObserver(true)
    }

    initWxsCallMethods(
      mpComponentOptions.methods as WechatMiniprogram.Component.MethodOption,
      vueOptions.wxsCallMethods
    )

    return Component(mpComponentOptions)
  }
}
