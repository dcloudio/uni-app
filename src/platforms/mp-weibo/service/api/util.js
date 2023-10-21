export function getPageHolder (__page__) {
  if (__page__) {
    return __page__.$holder
  }
  const pages = getCurrentPages()
  const len = pages.length
  if (len) {
    return pages[len - 1].$holder
  }
}

export function isCurrentPage (pageHolder) {
  const pages = getCurrentPages()
  const len = pages.length
  if (len) {
    return pages[len - 1].$holder === pageHolder
  }
  return false
}
