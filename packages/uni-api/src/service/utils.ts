export function getCurrentPageVm() {
  const pages = getCurrentPages()
  const len = pages.length
  const page = pages[len - 1]
  return page && (page as any).$vm
}
