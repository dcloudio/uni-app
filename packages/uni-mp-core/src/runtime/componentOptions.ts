import { isArray } from '@vue/shared'
import {
  type ComponentInternalInstance,
  type ComponentOptions,
  toRaw,
} from 'vue'

import {
  // @ts-expect-error
  findComponentPropsData,
  // @ts-expect-error
  hasQueueJob,
  // @ts-expect-error
  invalidateJob,
  // @ts-expect-error
  updateProps,
} from 'vue'

import type { MPComponentInstance } from '..'

import type { MPComponentOptions } from './component'
import { resolvePropValue } from './componentProps'

export function initData(_: ComponentOptions) {
  return {}
}

export function initPropsObserver(componentOptions: MPComponentOptions) {
  const observe = function observe(this: MPComponentInstance) {
    const up = this.properties.uP
    if (!up) {
      return
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$)
    } else if (resolvePropValue(this.properties.uT) === 'm') {
      // 小程序组件
      updateMiniProgramComponentProperties(resolvePropValue(up), this)
    }
  }
  if (
    __PLATFORM__ === 'mp-weixin' ||
    __PLATFORM__ === 'mp-qq' ||
    __PLATFORM__ === 'mp-harmony'
  ) {
    if (!componentOptions.observers) {
      componentOptions.observers = {}
    }
    componentOptions.observers.uP = observe
  } else {
    ;(componentOptions.properties as any).uP.observer = observe
  }
}

export function updateMiniProgramComponentProperties(
  up: string,
  mpInstance: MPComponentInstance
) {
  const prevProps =
    __PLATFORM__ === 'mp-alipay'
      ? (mpInstance.props as unknown as Record<string, unknown>)
      : mpInstance.properties

  const nextProps = findComponentPropsData(up) || {}
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps)
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
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update)
    }
    // 修复列表组件复用时导致的组件动态属性丢失问题
    // 最小复现demo https://developers.weixin.qq.com/s/ZvNerFmK8y0f
    instance.effect.dirty = true
    if (
      __PLATFORM__ === 'mp-toutiao' ||
      __PLATFORM__ === 'mp-baidu' ||
      __PLATFORM__ === 'mp-xhs'
    ) {
      // 字节跳动小程序 https://github.com/dcloudio/uni-app/issues/3340
      // 百度小程序 https://github.com/dcloudio/uni-app/issues/3612
      if (!hasQueueJob(instance.update)) {
        instance.update()
      }
    } else {
      instance.update()
    }
  }
}

function hasPropsChanged(
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>,
  checkLen: boolean = true
): boolean {
  const nextKeys = Object.keys(nextProps)
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
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

export function initBehaviors(vueOptions: ComponentOptions): string[] {
  const vueBehaviors = vueOptions.behaviors

  let vueProps = vueOptions.props

  if (!vueProps) {
    vueOptions.props = vueProps = []
  }

  const behaviors: string[] = []
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      // 这里的 global 应该是个变量
      behaviors.push(behavior.replace('uni://', '__GLOBAL__' + '://'))
      if (behavior === 'uni://form-field') {
        if (isArray(vueProps)) {
          vueProps.push('name')
          vueProps.push('modelValue')
        } else {
          vueProps.name = {
            type: String,
            default: '',
          }
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '',
          }
        }
      }
    })
  }
  return behaviors
}

export function applyOptions(
  componentOptions: MPComponentOptions,
  vueOptions: ComponentOptions
) {
  componentOptions.data = initData(vueOptions)
  componentOptions.behaviors = initBehaviors(vueOptions)
}
