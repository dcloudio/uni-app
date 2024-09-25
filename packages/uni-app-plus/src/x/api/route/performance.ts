import { invokeArrayFns } from '@vue/shared'

type OnBeforeRoute = (type: string) => void
type OnAfterRoute = (type: string) => void
type OnPageReady = (page) => void

const beforeRouteHooks: any[] = []
const afterRouteHooks: any[] = []
const pageReadyHooks: any[] = []

export function onBeforeRoute(hook: OnBeforeRoute) {
  beforeRouteHooks.push(hook)
}

export function onAfterRoute(hook: OnAfterRoute) {
  afterRouteHooks.push(hook)
}

export function onPageReady(hook: OnPageReady) {
  pageReadyHooks.push(hook)
}

export function invokeBeforeRouteHooks(type: string) {
  invokeArrayFns(beforeRouteHooks, type)
}

export function invokeAfterRouteHooks(type: string) {
  invokeArrayFns(afterRouteHooks, type)
}

export function invokePageReadyHooks(page) {
  invokeArrayFns(pageReadyHooks, page)
}

function clearBeforeRouteHooks() {
  beforeRouteHooks.length = 0
}

function clearAfterRouteHooks() {
  afterRouteHooks.length = 0
}

function clearPageReadyHooks() {
  pageReadyHooks.length = 0
}

export function clearRouteHooks() {
  clearBeforeRouteHooks()
  clearAfterRouteHooks()
  clearPageReadyHooks()
}
