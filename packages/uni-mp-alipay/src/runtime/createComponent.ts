import type { ComponentOptions, ComponentPublicInstance } from 'vue'
// @ts-expect-error
import { pruneComponentPropsCache } from 'vue'
import {
  $destroyComponent,
  initBehaviors,
  initData,
  initPageInstance,
  initProps,
  initVueIds,
  initWxsCallMethods,
} from '@dcloudio/uni-mp-core'
import {
  type MPComponentInstance,
  type RelationOptions,
  createVueComponent,
  handleLink,
  handleRef,
  initChildVues,
  initPropsObserver,
  initRelation,
  initSpecialMethods,
  isComponent2,
  triggerEvent,
} from './util'
import { createVueRuntimeOptions } from './externalClasses'

declare function Component<
  P extends Record<string, any>,
  D,
  M extends tinyapp.IComponentMethods
>(options: tinyapp.ComponentOptions<P, D, M>): void

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
    if (__X__) {
      mpInstance.vm = mpInstance.$vm
    }
    initPageInstance(mpInstance as any)
  } else {
    // 处理父子关系
    initRelation(mpInstance, relationOptions)
    if (relationOptions.parent) {
      // 父组件已经初始化，直接初始化子，否则放到父组件的 didMount 中处理
      // 初始化 vue 实例
      mpInstance.$vm = createComponent(relationOptions.parent)
      if (__X__) {
        mpInstance.vm = mpInstance.$vm
      }
      initPageInstance(mpInstance as any)
      handleRef.call(relationOptions.parent.$scope as any, mpInstance)
      initChildVues(mpInstance)
      mpInstance.$vm.$callHook('mounted')
    }
  }
}

export function initCreateComponent() {
  return function createComponent(vueOptions: ComponentOptions) {
    vueOptions = vueOptions.default || vueOptions
    // __X_STYLE_ISOLATION__ 仅在 DOM2 样式隔离构建中注入。
    const externalClasses =
      __X__ && __X_STYLE_ISOLATION__ ? vueOptions.externalClasses : undefined
    // 支付宝由原生 Component 承载 externalClass；Vue 内部只需接收真实 class 字符串，
    // 不能继续启用微信/App 的 externalClass 归一化，否则值会被替换为属性名。
    const vueRuntimeOptions = createVueRuntimeOptions(
      vueOptions,
      externalClasses
    )
    const mpComponentOptions: tinyapp.ComponentOptions & {
      options?: any
      externalClasses?: string[]
    } = {
      props: initComponentProps(vueOptions.props),
      didMount() {
        const createComponent = (parent?: ComponentPublicInstance) => {
          return createVueComponent(
            'component',
            this,
            vueRuntimeOptions,
            parent,
            externalClasses
          )
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

    // vueOptions.options
    if (vueOptions.options) {
      mpComponentOptions.options = vueOptions.options
    }
    // __X_STYLE_ISOLATION__ 仅在 DOM2 样式隔离构建中注入。
    if (__X__ && __X_STYLE_ISOLATION__) {
      mpComponentOptions.options = mpComponentOptions.options ?? {}
      // 支付宝原生不支持 uni-app x 的 isolated/app/app-and-page 抽象值。
      // 原生层统一开放必要的样式可见性，最终是否命中仍由编译期生成的来源 class 控制。
      mpComponentOptions.options.styleIsolation = 'apply-shared'
      mpComponentOptions.options.externalClasses =
        vueOptions.options?.externalClasses ?? true
      if (externalClasses) {
        mpComponentOptions.externalClasses = externalClasses
      }
    }
    if (__VUE_OPTIONS_API__) {
      mpComponentOptions.data = initData(vueOptions)
      mpComponentOptions.mixins = initBehaviors(vueOptions)
    }

    if (isComponent2) {
      mpComponentOptions.onInit = function onInit(this: MPComponentInstance) {
        initVm(this, (parent?: ComponentPublicInstance) => {
          return createVueComponent(
            'component',
            this,
            vueRuntimeOptions,
            parent,
            externalClasses
          )
        })
      }
    }

    initPropsObserver(mpComponentOptions, externalClasses)

    initWxsCallMethods(
      mpComponentOptions.methods as WechatMiniprogram.Component.MethodOption,
      vueOptions.wxsCallMethods
    )

    return Component(mpComponentOptions)
  }
}
