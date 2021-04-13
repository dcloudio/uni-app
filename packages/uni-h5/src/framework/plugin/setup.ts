import { invokeArrayFns } from '@vue/shared'
import {
  ComponentInternalInstance,
  ComponentPublicInstance,
  createBlock,
  DefineComponent,
  getCurrentInstance,
  onMounted,
  openBlock,
  onBeforeActivate,
  onBeforeDeactivate,
  onBeforeMount,
} from 'vue'
import { LayoutComponent } from '../..'
import { initApp } from './app'
import { initPage } from './page'

interface SetupComponentOptions {
  init: (vm: ComponentPublicInstance) => void
  setup: (instance: ComponentInternalInstance) => void
  after?: (comp: DefineComponent) => void
}

function wrapperComponentSetup(
  comp: DefineComponent,
  { init, setup, after }: SetupComponentOptions
) {
  const oldSetup = comp.setup
  comp.setup = (props, ctx) => {
    const instance = getCurrentInstance()!
    init(instance.proxy!)
    setup(instance)
    if (oldSetup) {
      return oldSetup(props, ctx)
    }
  }
  after && after(comp)
}

function setupComponent(comp: any, options: SetupComponentOptions) {
  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
    wrapperComponentSetup(comp.default, options)
  } else {
    wrapperComponentSetup(comp, options)
  }
  return comp
}

export function setupPage(comp: any) {
  return setupComponent(comp, {
    init: initPage,
    setup(instance) {
      onBeforeMount(() => {
        const { onLoad, onShow } = instance
        onLoad && invokeArrayFns(onLoad)
        instance.__isVisible = true
        onShow && invokeArrayFns(onShow)
      })
      onMounted(() => {
        const { onReady } = instance
        onReady && invokeArrayFns(onReady)
      })
      onBeforeActivate(() => {
        if (!instance.__isVisible) {
          instance.__isVisible = true
          const { onShow } = instance
          onShow && invokeArrayFns(onShow)
        }
      })
      onBeforeDeactivate(() => {
        if (instance.__isVisible && !instance.__isUnload) {
          instance.__isVisible = false
          const { onHide } = instance
          onHide && invokeArrayFns(onHide)
        }
      })
    },
  })
}

export function setupApp(comp: any) {
  return setupComponent(comp, {
    init: initApp,
    setup(instance) {
      onBeforeMount(() => {
        const { onLaunch, onShow } = instance
        onLaunch && invokeArrayFns(onLaunch)
        onShow && invokeArrayFns(onShow)
      })
    },
    after(comp) {
      comp.mpType = 'app'
      comp.render = () => (openBlock(), createBlock(LayoutComponent))
    },
  })
}
