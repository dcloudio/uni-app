import type { ComponentPropsOptions } from 'vue'
import type { MPComponentOptions, MPComponentInstance } from './component'

import Component = WechatMiniprogram.Component

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
    // 均不指定类型，避免微信小程序 property received type-uncompatible value 警告
    // 组件 ref
    properties.uR = {
      type: null,
      value: '',
    }
    // 组件 ref-in-for
    properties.uRIF = {
      type: null,
      value: '',
    }
    // 组件 id
    properties.uI = {
      type: null,
      value: '',
    }
    // 组件 props
    properties.uP = {
      type: null,
      value: '',
    }
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
 * @param rawProps
 * @param isBehavior
 */
export function initProps(
  mpComponentOptions: MPComponentOptions,
  _rawProps: ComponentPropsOptions | null,
  isBehavior: boolean = false
) {
  mpComponentOptions.properties = initDefaultProps(isBehavior)
}
