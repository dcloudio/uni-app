import { extend } from '@vue/shared'

import { ComponentOptions, ComponentPublicInstance } from 'vue'
// @ts-expect-error
import { getExposeProxy } from 'vue'

import { initExtraOptions, initWxsCallMethods } from './util'

import { initProps } from './componentProps'
import { applyOptions, initPropsObserver } from './componentOptions'
import { CreateComponentOptions } from './componentInstance'

import Component = WechatMiniprogram.Component

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
export interface ParseComponentOptions {
  parse?: (
    mpComponentOptions: MPComponentOptions,
    parseOptions: Partial<ParseComponentOptions>
  ) => void
  mocks: string[]
  isPage: (mpInstance: MPComponentInstance) => boolean
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
    lifetimes: initLifetimes({ mocks, isPage, initRelation, vueOptions }),
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
