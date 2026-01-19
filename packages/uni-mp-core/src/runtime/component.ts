import { extend, isArray, isObject } from '@vue/shared'

import {
  type ComponentOptions,
  type ComponentPublicInstance,
  // @ts-expect-error
  devtoolsComponentAdded,
} from 'vue'
// @ts-expect-error
import { getExposeProxy } from 'vue'

import { registerCustomElement } from 'vue'

import {
  initExtraOptions,
  initWorkletMethods,
  initWxsCallMethods,
} from './util'

import { initProps } from './componentProps'
import { applyOptions, initPropsObserver } from './componentOptions'
import type { CreateComponentOptions } from './componentInstance'

import Component = WechatMiniprogram.Component

export interface CustomComponentInstanceProperty {
  $vm?: ComponentPublicInstance
  vm?: ComponentPublicInstance
  _$vueId: string
  _$vuePid?: string
  _$setRef?: (fn: Function) => void
  _pendingUP?: string // 缓存在 attached 之前触发的 observer 的 uP 值
}

export type MPComponentOptions = Component.Options<
  Component.DataOption,
  Component.PropertyOption,
  Component.MethodOption,
  CustomComponentInstanceProperty
>

export type MPComponentInstance = Component.Instance<
  Component.DataOption,
  Component.PropertyOption,
  Partial<Component.MethodOption>,
  CustomComponentInstanceProperty
>

export interface RelationOptions extends Record<string, unknown> {
  vuePid: string | undefined
  parent?: ComponentPublicInstance
}

export interface CreateLifetimesOptions {
  mocks: string[]
  vueOptions: ComponentOptions
  isPage: (mpInstance: MPComponentInstance) => boolean
  initRelation: (
    mpInstance: MPComponentInstance,
    relationOptions: RelationOptions
  ) => void
}
export interface ParseComponentOptions {
  parse?: (
    mpComponentOptions: MPComponentOptions,
    parseOptions: Partial<ParseComponentOptions>
  ) => void
  mocks: string[]
  isPage: (mpInstance: MPComponentInstance) => boolean
  /**
   * 当前组件在uni-app项目内是否为页面
   */
  isPageInProject?: boolean
  initRelation: (
    mpInstance: MPComponentInstance,
    options: RelationOptions
  ) => void
  handleLink: (event: any) => void
  initLifetimes: (options: CreateLifetimesOptions) => Partial<{
    attached(): void
    ready(): void
    detached(): void
  }>
}

export function parseComponent(
  vueOptions: ComponentOptions,
  {
    parse,
    mocks,
    isPage,
    isPageInProject,
    initRelation,
    handleLink,
    initLifetimes,
  }: ParseComponentOptions
) {
  vueOptions = vueOptions.default || vueOptions

  const options: Component.ComponentOptions = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/,
  }
  if (__X__ && __X_STYLE_ISOLATION__) {
    options.addGlobalClass = false
  }

  if (__X__ && __UNI_FEATURE_VIRTUAL_HOST__ && !isPageInProject) {
    options.virtualHost = true
  }

  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
        extend(options, item.options)
      }
    })
  }

  if (vueOptions.options) {
    extend(options, vueOptions.options)
  }

  const mpComponentOptions: MPComponentOptions = {
    options,
    lifetimes: initLifetimes({ mocks, isPage, initRelation, vueOptions }),
    pageLifetimes: {
      show() {
        if (__VUE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(this.$vm!.$)
        }
        this.$vm && this.$vm.$callHook('onPageShow')
      },
      hide() {
        this.$vm && this.$vm.$callHook('onPageHide')
      },
      resize(size) {
        this.$vm && this.$vm.$callHook('onPageResize', size)
      },
    },
    methods: {
      __l: handleLink,
    },
  }

  if (__VUE_OPTIONS_API__) {
    applyOptions(mpComponentOptions, vueOptions)
  }

  initProps(mpComponentOptions)

  initPropsObserver(mpComponentOptions)

  initExtraOptions(mpComponentOptions, vueOptions)

  initWxsCallMethods(
    mpComponentOptions.methods as Component.MethodOption,
    vueOptions.wxsCallMethods
  )
  if (__PLATFORM__ === 'mp-weixin') {
    initWorkletMethods(
      mpComponentOptions.methods as Component.MethodOption,
      vueOptions.methods
    )
  }

  if (parse) {
    parse(mpComponentOptions, { handleLink })
  }

  if (__X__ && __X_STYLE_ISOLATION__) {
    // 支持 externalClasses
    if (vueOptions.externalClasses) {
      mpComponentOptions.externalClasses = vueOptions.externalClasses
    }

    // 支持 styleIsolation
    if (vueOptions.styleIsolation) {
      const styleIsolation = vueOptions.styleIsolation
      if (
        __PLATFORM__ === 'mp-weixin' ||
        __PLATFORM__ === 'mp-xhs' ||
        __PLATFORM__ === 'mp-harmony'
      ) {
        if (styleIsolation === 'isolated') {
          mpComponentOptions.options!.styleIsolation = isPageInProject
            ? 'page-apply-shared'
            : 'isolated'
        } else if (styleIsolation === 'app') {
          mpComponentOptions.options!.styleIsolation = 'apply-shared'
        } else if (styleIsolation === 'app-and-page') {
          mpComponentOptions.options!.styleIsolation = 'apply-shared'
        }
      } else if (__PLATFORM__ === 'mp-alipay') {
        if (styleIsolation === 'app') {
          mpComponentOptions.options!.styleIsolation = 'apply-shared'
        } else if (styleIsolation === 'app-and-page') {
          if (isPageInProject) {
            mpComponentOptions.options!.styleIsolation = 'shared'
          }
        }
      } else if (__PLATFORM__ === 'mp-baidu') {
        if (styleIsolation === 'app') {
          mpComponentOptions.options!.addGlobalClass = true
        } else if (styleIsolation === 'app-and-page') {
          mpComponentOptions.options!.addGlobalClass = true
        }
      }
    }
  }

  return mpComponentOptions
}

declare let Component: WechatMiniprogram.Component.Constructor

export function initCreateComponent(parseOptions: ParseComponentOptions) {
  return function createComponent(
    vueComponentOptions: ComponentOptions & {
      rootElement?: { name: string; class: any }
    }
  ) {
    if (__X__) {
      const rootElement = vueComponentOptions.rootElement
      if (rootElement) {
        registerCustomElement(rootElement.name, rootElement.class)
      }
    }
    return Component(parseComponent(vueComponentOptions, parseOptions))
  }
}

let $createComponentFn: Function
let $destroyComponentFn: Function

interface InitialVNode {
  type: ComponentOptions
  props: Record<string, any>
}

function getAppVm() {
  if (process.env.UNI_MP_PLUGIN) {
    return __GLOBAL__.$vm
  }
  if (process.env.UNI_SUBPACKAGE) {
    return __GLOBAL__.$subpackages[process.env.UNI_SUBPACKAGE].$vm
  }
  return getApp().$vm
}

export function $createComponent(
  initialVNode: InitialVNode,
  options: CreateComponentOptions
) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent
  }
  const proxy = $createComponentFn(
    initialVNode,
    options
  ) as ComponentPublicInstance
  return getExposeProxy(proxy.$) || proxy
}

export function $destroyComponent(instance: ComponentPublicInstance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent
  }
  return $destroyComponentFn(instance)
}
