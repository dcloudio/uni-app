export function pageScrollTo (args) {
  const pages = getCurrentPages()
  if (pages.length) {
    UniServiceJSBridge.publishHandler('pageScrollTo', args, pages[pages.length - 1].$page.id)
  }
  return {}
}

let pageId

export function setPullDownRefreshPageId (pullDownRefreshPageId) {
  pageId = pullDownRefreshPageId
}

export function startPullDownRefresh () {
  if (pageId) {
    UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId)
  }
  const pages = getCurrentPages()
  if (pages.length) {
    pageId = pages[pages.length - 1].$page.id
    UniServiceJSBridge.emit(pageId + '.startPullDownRefresh', {}, pageId)
  }
  return {}
}

export function stopPullDownRefresh () {
  if (pageId) {
    UniServiceJSBridge.emit(pageId + '.stopPullDownRefresh', {}, pageId)
    pageId = null
  }
  return {}
}
