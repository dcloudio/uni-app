import { isArray } from '@vue/shared'
import { ComponentInternalInstance, ComponentOptions, toRaw } from 'vue'

import {
  // @ts-ignore
  findComponentPropsData,
  // @ts-ignore
  invalidateJob,
  // @ts-ignore
  updateProps,
} from 'vue'

import { MPComponentInstance } from '..'

import { MPComponentOptions } from './component'
import { initProps } from './componentProps'

export function initData(_: ComponentOptions) {
  return {}
}

export function initPropsObserver(componentOptions: MPComponentOptions) {
  const observe = function observe(this: MPComponentInstance) {
    const up = this.properties.uP
    if (!up || !this.$vm) {
      return
    }
    updateComponentProps(up, this.$vm.$)
  }
  if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'mp-qq') {
    componentOptions.observers = {
      uP: observe,
    }
  } else {
    ;(componentOptions.properties as any).uP.observer = observe
  }
}

export function updateComponentProps(
  up: string,
  instance: ComponentInternalInstance
) {
  const prevProps = toRaw(instance.props)
  const nextProps = findComponentPropsData(up) || {}
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false)
    invalidateJob(instance.update)
    instance.update()
  }
}

function hasPropsChanged(prevProps: Data, nextProps: Data): boolean {
  const nextKeys = Object.keys(nextProps)
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i]
    if (nextProps[key] !== prevProps[key]) {
      return true
    }
  }
  return false
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
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace('uni://', `${__PLATFORM_PREFIX__}://`))
      if (behavior === 'uni://form-field') {
        if (isArray(vueProps)) {
          vueProps.push('name')
          vueProps.push('value')
        } else {
          vueProps.name = {
            type: String,
            default: '',
          }
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '',
          }
        }
      }
    })
  }
  if (vueExtends && vueExtends.props) {
    const behavior = {}
    initProps(behavior, vueExtends.props, true)
    behaviors.push(initBehavior(behavior) as string)
  }
  if (isArray(vueMixins)) {
    vueMixins.forEach((vueMixin) => {
      if (vueMixin.props) {
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
