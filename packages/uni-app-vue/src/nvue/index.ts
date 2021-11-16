import { App } from 'vue'

import type {
  Vue,
  NVue,
  NVueInstanceContext,
  NVueInstanceOption,
  NVueRuntimeContext,
} from '@dcloudio/uni-shared'
// eslint-disable-next-line no-restricted-globals
const VueFactory = require('./nvue.factory.cjs')

const instanceOptions: { [key: string]: NVueInstanceOption } = {}

export function createInstanceContext(
  instanceId: string,
  runtimeContext: NVueRuntimeContext,
  data: Record<string, unknown> = {}
): NVueInstanceContext {
  const nvue: NVue = runtimeContext.nvue
  const instance: NVueInstanceOption = (instanceOptions[instanceId] = {
    instanceId,
    config: nvue.config,
    document: nvue.document,
    data,
  })

  const Vue = (instance.Vue = createVueModuleInstance(
    instanceId,
    nvue,
    runtimeContext.SharedObject
  ))

  const instanceContext = { Vue }
  Object.freeze(instanceContext)
  return instanceContext
}

export function destroyInstance(instanceId: string): void {
  const instance = instanceOptions[instanceId]
  if (instance && instance.app && instance.document) {
    try {
      instance.app.$.appContext.app.unmount()
      instance.document.destroy()
    } catch (e) {}
    delete instance.document
    delete instance.app
  }
  delete instanceOptions[instanceId]
}

export function refreshInstance(
  instanceId: string,
  data: Record<string, unknown>
): Error | void {
  const instance = instanceOptions[instanceId]
  if (!instance || !instance.app) {
    return new Error(`refreshInstance: instance ${instanceId} not found!`)
  }
  instance.document!.taskCenter.send('dom', { action: 'refreshFinish' }, [])
}

function createVueModuleInstance(
  instanceId: string,
  nvue: NVue,
  SharedObject: Record<string, unknown>
): Vue {
  const exports: { Vue?: Vue } = {}
  VueFactory(exports, nvue.document, SharedObject)
  const Vue = exports.Vue!

  const { createApp } = Vue
  Vue.createApp = (rootComponent, rootProps) =>
    initApp(createApp(rootComponent, rootProps), { instanceId, nvue })

  return Vue
}

function initApp(
  app: App,
  { instanceId, nvue }: { instanceId: string; nvue: NVue }
) {
  const {
    config: { compilerOptions, globalProperties },
    mount,
  } = app
  compilerOptions.isCustomElement = (name) => {
    return !!nvue.supports(`@component/${name}`)
  }
  const instance = instanceOptions[instanceId]

  globalProperties.$instanceId = instanceId
  globalProperties.$document = instance.document
  globalProperties.$requireModule = nvue.requireModule

  app.mount = (rootContainer) => {
    const proxy = (instance.app = mount(rootContainer))
    if (rootContainer === '#root') {
      try {
        // Send "createFinish" signal to native.
        nvue.document.taskCenter.send('dom', { action: 'createFinish' }, [])
      } catch (e) {}
    }
    return proxy
  }
  return app
}
