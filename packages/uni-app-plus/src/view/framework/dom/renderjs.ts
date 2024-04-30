import {
  type ComponentOptions,
  type ComponentPublicInstance,
  createApp,
} from 'vue'
import { RENDERJS_MODULES, formatLog } from '@dcloudio/uni-shared'
import {
  createComponentDescriptorVm,
  getComponentDescriptor,
} from '@dcloudio/uni-core'

import type { UniNode } from './elements/UniNode'
import type { UniCustomElement } from './components'

export function initRenderjs(node: UniNode, moduleIds: Record<string, string>) {
  Object.keys(moduleIds).forEach((name) => {
    initRenderjsModule(node, moduleIds[name])
  })
}

export function destroyRenderjs(node: UniNode) {
  const { __renderjsInstances } = node.$ as UniCustomElement
  if (!__renderjsInstances) {
    return
  }
  Object.keys(__renderjsInstances).forEach((id) => {
    __renderjsInstances[id].$.appContext.app.unmount()
  })
}

function initRenderjsModule(node: UniNode, moduleId: string) {
  const options = getRenderjsModule(moduleId)
  if (!options) {
    return
  }
  const el = node.$ as UniCustomElement
  ;(el.__renderjsInstances || (el.__renderjsInstances = {}))[moduleId] =
    createRenderjsInstance(el, options)
}

function getRenderjsModule(moduleId: string) {
  const __renderjsModules =
    window[('__' + RENDERJS_MODULES) as '__renderjsModules']
  const module = __renderjsModules && __renderjsModules[moduleId]
  if (!module) {
    return console.error(formatLog('renderjs', moduleId + ' not found'))
  }
  return module as ComponentOptions | { default: ComponentOptions }
}

function createRenderjsInstance(
  el: UniCustomElement,
  options: ComponentOptions
): ComponentPublicInstance {
  options = options.default || options
  options.render = () => {}
  return createApp(options)
    .mixin({
      mounted() {
        this.$ownerInstance = getComponentDescriptor(
          createComponentDescriptorVm(el),
          false
        )
      },
    })
    .mount(document.createElement('div'))
}
