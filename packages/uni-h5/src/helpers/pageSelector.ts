export function normalizePageSelector(selector: string): string {
  return selector.replace(/^(\s*)page(?=\s|$)/i, '$1uni-page-body')
}
