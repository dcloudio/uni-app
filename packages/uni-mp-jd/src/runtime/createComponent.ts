import { extend, hasOwn } from '@vue/shared'
import type { ComponentOptions, ComponentPublicInstance } from 'vue'
// @ts-expect-error
import { getExposeProxy } from 'vue'

import {
  type ParseComponentOptions,
  initBehaviors,
  initData,
  initProps,
  initPropsObserver,
  initWxsCallMethods,
} from '@dcloudio/uni-mp-core'

function applyOptions(
  componentOptions: MPComponentOptions,
  vueOptions: ComponentOptions
) {
  componentOptions.data = initData(vueOptions)
  componentOptions.behaviors = initBehaviors(vueOptions)
}

import Component = WechatMiniprogram.Component

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

export interface CustomComponentInstanceProperty {
  $vm?: ComponentPublicInstance
  _$vueId: string
  _$vuePid?: string
  _$setRef?: (fn: Function) => void
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

export function parseComponent(
  vueOptions: ComponentOptions,
  {
    parse,
    mocks,
    isPage,
    initRelation,
    handleLink,
    initLifetimes,
  }: ParseComponentOptions
) {
  vueOptions = vueOptions.default || vueOptions

  const options: Component.ComponentOptions = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/,
  }

  if (vueOptions.options) {
    extend(options, vueOptions.options)
  }

  const mpComponentOptions: MPComponentOptions = {
    options,
    pageLifetimes: {
      show() {
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

  // 京东不支持在lifetimes中声明周期，故提取到最外层
  extend(
    mpComponentOptions,
    initLifetimes({ mocks, isPage, initRelation, vueOptions })
  )

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

  if (parse) {
    parse(mpComponentOptions, { handleLink })
  }

  return mpComponentOptions
}

export function initCreateComponent(parseOptions: ParseComponentOptions) {
  return function createComponent(vueComponentOptions: ComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions))
  }
}
