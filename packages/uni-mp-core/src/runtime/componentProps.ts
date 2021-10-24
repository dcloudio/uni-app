import { ComponentPropsOptions } from 'vue'
import { isArray, isPlainObject, isFunction } from '@vue/shared'
import { MPComponentOptions, MPComponentInstance } from './component'

import Component = WechatMiniprogram.Component

const PROP_TYPES = [String, Number, Boolean, Object, Array, null]

function createObserver(name: string) {
  return function observer(this: MPComponentInstance, newVal: unknown) {
    if (this.$vm) {
      this.$vm.$.props[name] = newVal // 为了触发其他非 render watcher
    }
  }
}

function parsePropType(key: string, type: unknown, defaultValue: unknown) {
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

function initDefaultProps(isBehavior: boolean = false) {
  const properties: Component.PropertyOption = {}
  if (!isBehavior) {
    properties.vI = {
      type: String,
      value: '',
    }
    if (__PLATFORM__ === 'mp-toutiao') {
      // 用于字节跳动小程序模拟抽象节点
      properties.generic = {
        type: Object,
      }
    }
    // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
    properties.vS = {
      type: null,
      value: [],
      observer: function (this: MPComponentInstance, newVal) {
        const $slots = Object.create(null)
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

function createProperty(key: string, prop: any) {
  if (__PLATFORM__ === 'mp-alipay') {
    return prop
  }
  prop.observer = createObserver(key)
  return prop
}

export function initProps(
  mpComponentOptions: MPComponentOptions,
  rawProps: ComponentPropsOptions | null,
  isBehavior: boolean = false
) {
  const properties = initDefaultProps(isBehavior)

  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = createProperty(key, {
        type: null,
      })
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
        ;(opts as any).type = parsePropType(key, type, value)
        properties[key] = createProperty(key, {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          value,
        })
      } else {
        // content:String
        const type = parsePropType(key, opts, null)
        properties[key] = createProperty(key, {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
        })
      }
    })
  }

  mpComponentOptions.properties = properties
}
