import { isArray, isPlainObject } from '@vue/shared'
import { ComponentOptions } from 'vue'

import { MPComponentOptions } from './component'
import { CustomAppInstanceProperty } from './app'
import { initProps } from './componentProps'

export function initData(vueOptions: ComponentOptions) {
  let data = vueOptions.data || {}

  if (typeof data === 'function') {
    try {
      const appConfig = getApp<CustomAppInstanceProperty>().$vm!.$.appContext
        .config
      data = data.call(appConfig.globalProperties)
    } catch (e) {
      if (process.env.VUE_APP_DEBUG) {
        console.warn(
          '根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。',
          data,
          e
        )
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data))
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {}
  }

  return data
}

export function initBehaviors(
  vueOptions: ComponentOptions,
  initBehavior: (behavior: any) => string | { props: any }
): string[] {
  const vueBehaviors = vueOptions.behaviors
  const vueExtends = vueOptions.extends
  const vueMixins = vueOptions.mixins

  let vueProps = vueOptions.props

  if (!vueProps) {
    vueOptions.props = vueProps = []
  }

  const behaviors: string[] = []
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach(behavior => {
      behaviors.push(behavior.replace('uni://', `${__PLATFORM_PREFIX__}://`))
      if (behavior === 'uni://form-field') {
        if (isArray(vueProps)) {
          vueProps.push('name')
          vueProps.push('value')
        } else {
          vueProps.name = {
            type: String,
            default: ''
          }
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          }
        }
      }
    })
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    const behavior = {}
    initProps(behavior, vueExtends.props, true)
    behaviors.push(initBehavior(behavior) as string)
  }
  if (isArray(vueMixins)) {
    vueMixins.forEach(vueMixin => {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        const behavior = {}
        initProps(behavior, vueMixin.props, true)
        behaviors.push(initBehavior(behavior) as string)
      }
    })
  }
  return behaviors
}

export function applyOptions(
  componentOptions: MPComponentOptions,
  vueOptions: ComponentOptions,
  initBehavior: (behavior: unknown) => string
) {
  componentOptions.data = initData(vueOptions)
  componentOptions.behaviors = initBehaviors(vueOptions, initBehavior)
}
