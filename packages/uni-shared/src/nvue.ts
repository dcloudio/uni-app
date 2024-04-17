import type { ComponentPublicInstance, createApp } from 'vue'

export function parseNVueDataset(attr?: Record<string, unknown>) {
  const dataset: Record<string, unknown> = {}
  if (attr) {
    Object.keys(attr).forEach((key) => {
      if (key.indexOf('data-') === 0) {
        dataset[key.replace('data-', '')] = attr[key]
      }
    })
  }
  return dataset
}

export interface Vue {
  createApp: typeof createApp
}

export interface NVueEnvironment {
  platform: string // could be "Web", "iOS", "Android"

  osName: string // could be "iOS", "Android" or others
  osVersion: string
  appName: string // mobile app name or browser name
  appVersion: string

  // informations of current running device
  deviceModel: string // phone device model
  deviceWidth: number
  deviceHeight: number
  scale: number

  // only available on the web
  userAgent?: string
  dpr?: number
  rem?: number
}

export interface NVueConfigAPI {
  bundleUrl: string // document.URL
  bundleType: string
  env: NVueEnvironment
}

export interface NVue {
  config: NVueConfigAPI
  document: NVueDocument
  requireModule: (name: string) => Record<string, unknown> | void
  supports: (condition: string) => boolean | void
  isRegisteredModule: (name: string, method?: string) => boolean
  isRegisteredComponent: (name: string) => boolean
}

export interface NVueTaskCenter {
  instanceId: string
  callbackManager: unknown
  send: (
    type: string,
    params: Record<string, unknown>,
    args: any[],
    options?: Record<string, unknown>
  ) => void
  registerHook: (
    componentId: string,
    type: string,
    hook: string,
    fn: Function
  ) => void
  updateData: (
    componentId: string,
    data: Record<string, unknown> | void,
    callback?: Function
  ) => void
}

export interface NVueDocument {
  id: string
  URL: string
  taskCenter: NVueTaskCenter

  open: () => void
  close: () => void
  createElement: (
    tagName: string,
    props?: Record<string, unknown>
  ) => NVueElement
  createText: (text: string) => Record<string, unknown>
  createComment: (text: string) => Record<string, unknown>
  fireEvent: (type: string) => void
  destroy: () => void
}

export interface NVueElement {
  nodeType: number
  nodeId: string
  type: string
  ref: string
  text?: string

  attr: Record<string, unknown>
  styleSheet: Record<string, Record<string, Record<string, unknown>>>
  classList: string[]
  parentNode: NVueElement | null
  children: Array<NVueElement>
  previousSibling: NVueElement | null
  nextSibling: NVueElement | null

  appendChild: (node: NVueElement) => void
  removeChild: (node: NVueElement, preserved?: boolean) => void
  insertBefore: (node: NVueElement, before: NVueElement) => void
  insertAfter: (node: NVueElement, after: NVueElement) => void
  setAttr: (key: string, value: any, silent?: boolean) => void
  setAttrs: (attrs: Record<string, unknown>, silent?: boolean) => void
  setClassList: (classList: string[]) => void
  setStyle: (key: string, value: any, silent?: boolean) => void
  setStyles: (attrs: Record<string, unknown>, silent?: boolean) => void
  setStyleSheet: (
    styleSheet: Record<string, Record<string, Record<string, unknown>>>
  ) => void
  addEvent: (type: string, handler: Function, args?: Array<any>) => void
  removeEvent: (type: string) => void
  fireEvent: (type: string) => void
  destroy: () => void
}

export interface NVueInstanceOption {
  instanceId: string
  config: NVueConfigAPI
  document?: NVueDocument
  Vue?: Vue
  app?: ComponentPublicInstance
  data?: Record<string, unknown>
}

export interface NVueRuntimeContext {
  nvue: NVue
  service: Record<string, unknown>
  BroadcastChannel?: Function
  SharedObject: Record<string, unknown>
}

export interface NVueInstanceContext {
  Vue: Vue
}
