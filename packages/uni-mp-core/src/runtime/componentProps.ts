import type { ComponentPropsOptions, ComponentPublicInstance } from 'vue'
import { extend, hasOwn, isArray, isFunction, isPlainObject } from '@vue/shared'
import type { MPComponentInstance, MPComponentOptions } from './component'
// @ts-expect-error
import { findComponentPropsData } from 'vue'

import Component = WechatMiniprogram.Component

const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  'eO',
  // 组件 ref
  'uR',
  // 组件 ref-in-for
  'uRIF',
  // 组件 id
  'uI',
  // 组件类型 m: 小程序组件
  'uT',
  // 组件 props
  'uP',
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  'uS',
]

function initDefaultProps(
  options: MPComponentOptions,
  isBehavior: boolean = false
) {
  const properties: Component.PropertyOption = {}
  if (!isBehavior) {
    // 均不指定类型，避免微信小程序 property received type-uncompatible value 警告
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: '',
      }
    })
    // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
    properties.uS = {
      type: null,
      value: [],
      observer: function (this: MPComponentInstance, newVal) {
        const $slots = Object.create(null)
        newVal &&
          newVal.forEach((slotName: string) => {
            $slots[slotName] = true
          })
        this.setData({
          $slots,
        })
      },
    }
  }
  if (options.behaviors) {
    // wx://form-field
    if (options.behaviors.includes('__GLOBAL__' + '://form-field')) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: '',
        }
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: '',
        }
      }
    }
  }
  return properties
}

function initVirtualHostProps(options?: Component.ComponentOptions) {
  const properties: Component.PropertyOption = {}
  if (
    __PLATFORM__ === 'mp-weixin' ||
    __PLATFORM__ === 'mp-alipay' ||
    __PLATFORM__ === 'mp-toutiao'
  ) {
    if (__PLATFORM__ === 'mp-alipay' || (options && options.virtualHost)) {
      if (__PLATFORM__ === 'mp-toutiao') {
        ;(options as any).applyFragment = true
      }
      properties.virtualHostStyle = {
        type: null,
        value: '',
      }
      properties.virtualHostClass = {
        type: null,
        value: '',
      }
    }
  }
  return properties
}

/**
 *
 * @param mpComponentOptions
 * @param isBehavior
 */
export function initProps(mpComponentOptions: MPComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {}
  }
  extend(
    mpComponentOptions.properties,
    initDefaultProps(mpComponentOptions),
    initVirtualHostProps(mpComponentOptions.options)
  )
}

const PROP_TYPES = [String, Number, Boolean, Object, Array, null]

function parsePropType(type: unknown, defaultValue: unknown) {
  // [String]=>String
  if (isArray(type) && type.length === 1) {
    return type[0]
  }
  if (__PLATFORM__ === 'mp-baidu') {
    if (
      // [String,Boolean]=>Boolean
      defaultValue === false &&
      isArray(type) &&
      type.length === 2 &&
      type.indexOf(String) !== -1 &&
      type.indexOf(Boolean) !== -1
    ) {
      return Boolean
    }
  }
  return type
}

function normalizePropType(type: unknown, defaultValue: unknown) {
  const res = parsePropType(type, defaultValue)
  return PROP_TYPES.indexOf(res) !== -1 ? res : null
}

/**
 * 初始化页面 props，方便接收页面参数，类型均为String，默认值均为''
 * @param param
 * @param rawProps
 */
export function initPageProps(
  { properties }: MPComponentOptions,
  rawProps: ComponentPropsOptions | null
) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties![key] = {
        type: String,
        value: '',
      }
    })
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key]
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        let value = (opts as any).default
        if (isFunction(value)) {
          value = value()
        }
        const type = (opts as any).type as any
        ;(opts as any).type = normalizePropType(type, value)
        properties![key] = {
          type: (opts as any).type,
          value,
        }
      } else {
        // content:String
        properties![key] = {
          type: normalizePropType(opts, null),
        }
      }
    })
  }
}

export function findPropsData(
  properties: Record<string, any>,
  isPage: boolean
) {
  return (
    (isPage
      ? findPagePropsData(properties)
      : findComponentPropsData(resolvePropValue(properties.uP))) || {}
  )
}

function findPagePropsData(properties: Record<string, any>) {
  const propsData: Record<string, any> = {}
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(
          (properties as Record<string, any>)[name]
        )
      }
    })
  }
  return propsData
}

export function initFormField(vm: ComponentPublicInstance) {
  // 同步 form-field 的 name,value 值
  const vueOptions = vm.$options
  if (
    isArray(vueOptions.behaviors) &&
    vueOptions.behaviors.includes('uni://form-field')
  ) {
    vm.$watch(
      'modelValue',
      () => {
        vm.$scope &&
          vm.$scope.setData({
            name: (vm as any).name,
            value: (vm as any).modelValue,
          })
      },
      {
        immediate: true,
      }
    )
  }
}

export function resolvePropValue(prop: string | { value: unknown }): any {
  if (__PLATFORM__ === 'mp-harmony') {
    if (isPlainObject(prop) && hasOwn(prop, 'value')) {
      // 目前 mp-harmony 的 prop 返回的是配置项？
      return prop.value
    }
  }
  return prop
}
