export function passive(passive: boolean) {
  return { passive }
}

export function normalizeDataset(el: Element) {
  // TODO
  return JSON.parse(JSON.stringify((el as HTMLElement).dataset || {}))
}

export function normalizeTarget(el: HTMLElement) {
  const { id, offsetTop, offsetLeft } = el
  return {
    id,
    dataset: normalizeDataset(el),
    offsetTop,
    offsetLeft,
  }
}
