export function passive(passive: boolean) {
  return { passive }
}

export function normalizeDataset(el: Element) {
  // TODO
  return JSON.parse(JSON.stringify((el as HTMLElement).dataset || {}))
}
