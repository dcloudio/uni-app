import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
// @ts-expect-error
import { pruneComponentPropsCache } from 'vue'
import {
  type CreateComponentOptions,
  type CreateLifetimesOptions,
  type MPComponentInstance,
  type RelationOptions,
  findPropsData,
  initFormField,
  initPageInstance,
  initSetRef,
  nextSetDataTick,
  resolvePropValue,
  updateComponentProps,
} from '@dcloudio/uni-mp-core'

import {
  $createComponent,
  $destroyComponent,
  initComponentInstance,
  initMocks,
  initRefs,
  initVueIds,
} from '@dcloudio/uni-mp-core'
import { ON_READY } from '@dcloudio/uni-shared'

type CreateComponent = (
  parent?: ComponentPublicInstance
) => ComponentPublicInstance

interface PendingComponent {
  createComponent: CreateComponent
  virtualHost: boolean
}

export const pendingRelationsKey = '__uniPendingToutiaoRelations'

const pendingComponents = new WeakMap<MPComponentInstance, PendingComponent>()
const virtualHostComponents = new WeakSet<MPComponentInstance>()

export function setComponentVirtualHost(
  mpInstance: MPComponentInstance,
  virtualHost: boolean
) {
  if (virtualHost) {
    virtualHostComponents.add(mpInstance)
  } else {
    virtualHostComponents.delete(mpInstance)
  }
}

export function isComponentVirtualHost(mpInstance: MPComponentInstance) {
  return virtualHostComponents.has(mpInstance)
}

export function registerPendingComponent(
  mpInstance: MPComponentInstance,
  createComponent: CreateComponent,
  virtualHost: boolean
) {
  pendingComponents.set(mpInstance, { createComponent, virtualHost })
}

export function createPendingComponent(
  mpInstance: MPComponentInstance,
  parent?: ComponentPublicInstance
) {
  const pendingComponent = pendingComponents.get(mpInstance)
  if (!pendingComponent) {
    return
  }
  pendingComponents.delete(mpInstance)
  return pendingComponent.createComponent(parent)
}

export function hasPendingComponent(mpInstance: MPComponentInstance) {
  return pendingComponents.has(mpInstance)
}

export function isPendingVirtualHost(mpInstance: MPComponentInstance) {
  return pendingComponents.get(mpInstance)?.virtualHost === true
}

export function removePendingComponent(mpInstance: MPComponentInstance) {
  pendingComponents.delete(mpInstance)
  virtualHostComponents.delete(mpInstance)
  delete (mpInstance as any)[pendingRelationsKey]
}

const fixAttached = __PLATFORM__ === 'mp-toutiao'

// 基础库 2.0 以上 attached 顺序错乱，按照 created 顺序强制纠正
const components: MPComponentInstance[] = []

export function initLifetimes({
  mocks,
  isPage,
  initRelation,
  vueOptions,
}: CreateLifetimesOptions) {
  function created(this: MPComponentInstance) {
    components.push(this)
  }
  function attached(this: MPComponentInstance) {
    initSetRef(this)
    const properties = this.properties
    initVueIds(resolvePropValue(properties.uI), this)
    const relationOptions: RelationOptions = {
      vuePid: this._$vuePid,
    }
    if (__PLATFORM__ === 'mp-harmony' || __PLATFORM__ === 'quickapp-webview') {
      // 处理父子关系
      initRelation(this, relationOptions)
    }
    // 初始化 vue 实例
    const mpInstance = this
    const mpType = isPage(mpInstance) ? 'page' : 'component'
    if (mpType === 'page' && !mpInstance.route && mpInstance.__route__) {
      mpInstance.route = mpInstance.__route__
    }

    const props = findPropsData(properties, mpType === 'page')

    if (__PLATFORM__ === 'mp-toutiao' && mpType === 'component') {
      const createComponent = (parent?: ComponentPublicInstance) => {
        const properties = mpInstance.properties
        const props = findPropsData(properties, false)
        mpInstance.$vm = $createComponent(
          {
            type: vueOptions,
            props,
          },
          {
            mpType,
            mpInstance,
            slots: resolvePropValue(properties.uS) || {}, // vueSlots
            parentComponent: parent && parent.$,
            onBeforeSetup(
              instance: ComponentInternalInstance,
              options: CreateComponentOptions
            ) {
              initRefs(instance, mpInstance)
              initMocks(instance, mpInstance, mocks)
              initComponentInstance(instance, options)
            },
          }
        ) as ComponentPublicInstance

        if (__X__) {
          mpInstance.vm = mpInstance.$vm
        }
        initPageInstance(mpInstance)

        if (process.env.UNI_DEBUG) {
          console.log(
            'uni-app:[' +
              Date.now() +
              '][' +
              (mpInstance.is || mpInstance.route) +
              '][' +
              mpInstance.$vm.$.uid +
              ']attached'
          )
        }

        initFormField(mpInstance.$vm)
        return mpInstance.$vm
      }

      registerPendingComponent(
        mpInstance,
        createComponent,
        virtualHostComponents.has(mpInstance)
      )
      initRelation(this, relationOptions)
      return
    }

    this.$vm = $createComponent(
      {
        type: vueOptions,
        props,
      },
      {
        mpType,
        mpInstance,
        slots: resolvePropValue(properties.uS) || {}, // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(
          instance: ComponentInternalInstance,
          options: CreateComponentOptions
        ) {
          initRefs(instance, mpInstance)
          initMocks(instance, mpInstance, mocks)
          initComponentInstance(instance, options)
        },
      }
    ) as ComponentPublicInstance

    // mp-harmony 目前发现 observe.uP 和 this.$vm 出发表现不稳定
    if (__PLATFORM__ === 'mp-harmony') {
      // 处理延迟的 uP 更新
      if (this._pendingUP) {
        updateComponentProps(resolvePropValue(this._pendingUP!), this.$vm.$)
      }
    }

    if (__X__) {
      this.vm = this.$vm
    }
    initPageInstance(this)

    if (process.env.UNI_DEBUG) {
      console.log(
        'uni-app:[' +
          Date.now() +
          '][' +
          (mpInstance.is || mpInstance.route) +
          '][' +
          this.$vm.$.uid +
          ']attached'
      )
    }

    if (mpType === 'component') {
      initFormField(this.$vm)
    }

    if (
      !(__PLATFORM__ === 'mp-harmony' || __PLATFORM__ === 'quickapp-webview')
    ) {
      // 处理父子关系
      initRelation(this, relationOptions)
    }
  }

  function ready(this: MPComponentInstance) {
    if (process.env.UNI_DEBUG) {
      console.log(
        'uni-app:[' + Date.now() + '][' + (this.is || this.route) + ']ready'
      )
    }
    if (this.$vm) {
      if (isPage(this)) {
        if (this.pageinstance) {
          this.__webviewId__ = (this.pageinstance as any).__pageId__
        }
        if (
          !(
            __PLATFORM__ === 'mp-harmony' || __PLATFORM__ === 'quickapp-webview'
          )
        ) {
          this.$vm.$callCreatedHook()
        }
        nextSetDataTick(this, () => {
          this.$vm!.$callHook('mounted')
          this.$vm!.$callHook(ON_READY)
        })
      } else {
        if (
          __PLATFORM__ === 'mp-harmony' ||
          __PLATFORM__ === 'quickapp-webview'
        ) {
          this.$vm!.$callHook('mounted')
          this.$vm!.$callHook(ON_READY)
        }
      }
    } else {
      this.is && console.warn(this.is + ' is not ready')
    }
  }

  function detached(this: MPComponentInstance) {
    if (__PLATFORM__ === 'mp-toutiao') {
      removePendingComponent(this)
    }
    if (this.$vm) {
      pruneComponentPropsCache(this.$vm.$.uid)
      $destroyComponent(this.$vm)
    }
  }
  if (!fixAttached) {
    return { attached, ready, detached }
  }
  return {
    created,
    attached(this: MPComponentInstance) {
      this.__lifetimes_attached = function () {
        attached.call(this)
      }
      let component = this
      while (
        component &&
        component.__lifetimes_attached &&
        components[0] &&
        component === components[0]
      ) {
        components.shift()
        component.__lifetimes_attached()
        delete component.__lifetimes_attached
        component = components[0]
      }
    },
    ready,
    detached,
  }
}
