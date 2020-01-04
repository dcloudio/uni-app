export function setPageMeta (args) {
  const pages = getCurrentPages()
  if (pages.length) {
    UniServiceJSBridge.publishHandler('setPageMeta', args, pages[pages.length - 1].$page.id)
  }
  return {}
}
