export interface ScrollViewScrollToOptions {
  top?: number
  left?: number
  animated?: boolean
  /** 兼容 iOS 参数；Web 动画时长由浏览器决定。 */
  duration?: number
}

export interface ScrollViewController {
  scrollEnabled: boolean
  showScrollbar: boolean
  pagingEnabled: boolean
  scrollTo(options: ScrollViewScrollToOptions): void
  scrollIntoView(selector: string): void
}

interface ScrollViewRegistration {
  controller: ScrollViewController
  context?: ScrollViewContext
}

const registrations = new WeakMap<HTMLElement, ScrollViewRegistration>()
const controllers = new WeakMap<ScrollViewContext, ScrollViewController>()

// Context 使用独立对象，保留宿主的原生 DOM 方法及其参数语义。
export class ScrollViewContext {
  constructor(controller: ScrollViewController) {
    // Context 存入 ref/reactive 时也保持原对象身份。
    Object.defineProperty(this, '__v_skip', { value: true })
    controllers.set(this, controller)
  }

  get scrollEnabled() {
    return controllers.get(this)?.scrollEnabled ?? false
  }
  set scrollEnabled(value: boolean) {
    const controller = controllers.get(this)
    if (controller) controller.scrollEnabled = !!value
  }

  get showScrollbar() {
    return controllers.get(this)?.showScrollbar ?? false
  }
  set showScrollbar(value: boolean) {
    const controller = controllers.get(this)
    if (controller) controller.showScrollbar = !!value
  }

  get pagingEnabled() {
    return controllers.get(this)?.pagingEnabled ?? false
  }
  set pagingEnabled(value: boolean) {
    const controller = controllers.get(this)
    if (controller) controller.pagingEnabled = !!value
  }

  scrollTo(options: ScrollViewScrollToOptions) {
    controllers.get(this)?.scrollTo(options)
  }

  scrollIntoView(selector: string) {
    controllers.get(this)?.scrollIntoView(selector)
  }
}

export function getScrollViewContext(root: HTMLElement) {
  const registration = registrations.get(root)
  if (!registration) return
  // 首次获取时创建，同一注册期间复用实例。
  return (registration.context ??= new ScrollViewContext(
    registration.controller
  ))
}

export function registerScrollViewContext(
  root: HTMLElement,
  controller: ScrollViewController
) {
  const previous = registrations.get(root)?.context
  if (previous) controllers.delete(previous)
  const registration: ScrollViewRegistration = { controller }
  registrations.set(root, registration)
  return () => {
    if (registration.context) controllers.delete(registration.context)
    if (registrations.get(root) === registration) registrations.delete(root)
  }
}
