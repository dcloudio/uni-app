export function pageScrollTo (args) {
  const pages = getCurrentPages()
  if (pages.length) {
    UniServiceJSBridge.publishHandler('pageScrollTo', args, pages[pages.length - 1].$page.id)
  }
  return {}
}
