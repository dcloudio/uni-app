const uniElementPageMap = new WeakMap<Element, unknown>()

export function setUniElementPage(pageElement: Element, page: unknown): void {
  uniElementPageMap.set(pageElement, page)
}

export function getUniElementPage<T>(element: Element): T | null {
  const pageElement = element.closest('uni-page')
  return pageElement
    ? (uniElementPageMap.get(pageElement) as T | undefined) ?? null
    : null
}
