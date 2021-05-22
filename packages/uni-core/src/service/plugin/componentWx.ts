import { ComponentPublicInstance } from 'vue'

function querySelector(
  vm: ComponentPublicInstance,
  selector: string
): ComponentPublicInstance | undefined {
  const el = vm.$el.querySelector(selector)
  return el && el.__vue__
}

function querySelectorAll(vm: ComponentPublicInstance, selector: string) {
  const nodeList = vm.$el.querySelectorAll(selector)
  if (nodeList) {
    return [...nodeList].map((node) => node.__vue__).filter(Boolean)
  }
  return []
}

export function createSelectorQuery(this: ComponentPublicInstance) {
  return uni.createSelectorQuery().in(this)
}

export function createMediaQueryObserver(this: ComponentPublicInstance) {
  return uni.createMediaQueryObserver(this)
}

export function createIntersectionObserver(
  this: ComponentPublicInstance,
  options: UniApp.CreateIntersectionObserverOptions
) {
  return uni.createIntersectionObserver(this, options)
}

export function selectComponent(
  this: ComponentPublicInstance,
  selector: string
) {
  return querySelector(this, selector)
}

export function selectAllComponents(
  this: ComponentPublicInstance,
  selector: string
) {
  return querySelectorAll(this, selector)
}
