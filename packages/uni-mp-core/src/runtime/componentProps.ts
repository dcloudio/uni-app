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
  if (__PLATFORM__ === 'mp-weixin') {
    // 不再生成具体的 type 类型，因为微信首次初始化，值为 undefined 时，会告警：property received type-uncompatible value
    return null
  }
  const res = parsePropType(type, defaultValue)
  return PROP_TYPES.indexOf(res) !== -1 ? res : null
}

function initDefaultProps(isBehavior: boolean = false) {
  const properties: Component.PropertyOption = {}
  if (!isBehavior) {
    if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou') {
      // 百度小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
      // event-opts
      properties.eO = {
        type: null,
        value: '',
      }
    }
    properties.vI = {
      type: null, // 均不指定类型，避免 property received type-uncompatible value 警告
      value: '',
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

/**
 *
 * @param mpComponentOptions
 * @param rawProps
 * @param isBehavior
 */
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
        ;(opts as any).type = normalizePropType(type, value)
        properties[key] = createProperty(key, {
          type: (opts as any).type,
          value,
        })
      } else {
        // content:String
        properties[key] = createProperty(key, {
          type: normalizePropType(opts, null),
        })
      }
    })
  }

  mpComponentOptions.properties = properties
}
