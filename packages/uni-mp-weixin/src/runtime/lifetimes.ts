import { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

import {
  RelationOptions,
  MPComponentInstance,
  CreateComponentOptions,
  CreateLifetimesOptions,
} from '@dcloudio/uni-mp-core'

import {
  initRefs,
  initMocks,
  initVueIds,
  initSetRef,
  fixProperties,
  nextSetDataTick,
  $createComponent,
  $destroyComponent,
  initComponentInstance,
} from '@dcloudio/uni-mp-core'
import { ON_READY } from '@dcloudio/uni-shared'

const waitingSetData = __PLATFORM__ !== 'mp-weixin' && __PLATFORM__ !== 'mp-qq'

export function initLifetimes({
  mocks,
  isPage,
  initRelation,
  vueOptions,
}: CreateLifetimesOptions) {
  return {
    attached(this: MPComponentInstance) {
      // 微信 和 QQ 不需要延迟 setRef
      if (waitingSetData) {
        initSetRef(this)
      }
      const properties = this.properties
      initVueIds(properties.uI, this)
      const relationOptions: RelationOptions = {
        vuePid: this._$vuePid,
      }
      // 处理父子关系
      initRelation(this, relationOptions)
      // 初始化 vue 实例
      const mpInstance = this
      const isMiniProgramPage = isPage(mpInstance)

      // 微信小程序 properties 为了解决警告问题，目前所有 type 都默认为 null，故导致部分 prop 默认值初始化不正确，故将 null 值 替换为 undefined
      fixProperties(properties)

      this.$vm = $createComponent(
        {
          type: vueOptions,
          props: properties,
        },
        {
          mpType: isMiniProgramPage ? 'page' : 'component',
          mpInstance,
          slots: properties.uS || {}, // vueSlots
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
    },
    ready(this: MPComponentInstance) {
      // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
      // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
      if (this.$vm) {
        if (waitingSetData) {
          nextSetDataTick(this, () => {
            this.$vm!.$callHook('mounted')
            this.$vm!.$callHook(ON_READY)
          })
        } else {
          this.$vm!.$callHook('mounted')
          this.$vm!.$callHook(ON_READY)
        }
      } else {
        // this.is && console.warn(this.is + ' is not attached')
      }
    },
    detached(this: MPComponentInstance) {
      this.$vm && $destroyComponent(this.$vm)
    },
  }
}
