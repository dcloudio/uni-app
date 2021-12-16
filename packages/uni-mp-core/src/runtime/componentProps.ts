import { ComponentPropsOptions } from '@vue/runtime-core'
import { extend, isArray, isPlainObject } from '@vue/shared'
import type { MPComponentOptions, MPComponentInstance } from './component'
// @ts-ignore
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

function initDefaultProps(isBehavior: boolean = false) {
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
  extend(mpComponentOptions.properties, initDefaultProps())
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
      properties![key] = {
        type: String,
        value: '',
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
      : findComponentPropsData(properties.uP)) || {}
  )
}

function findPagePropsData(properties: Record<string, any>) {
  const propsData: Record<string, any> = {}
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = (properties as Record<string, any>)[name]
      }
    })
  }
  return propsData
}
