function findPage (pageId) {
  pageId = parseInt(pageId)
  const page = getCurrentPages(true).find(page => page.$page.id === pageId)
  if (!page) {
    return console.error(`Page[${pageId}] not found`)
  }
  return page
}
export function onWebviewInserted (data, pageId) {
  const page = findPage(pageId)
  page && (page.__uniapp_webview = true)
}
export function onWebviewRemoved (data, pageId) {
  const page = findPage(pageId)
  page && (delete page.__uniapp_webview)
}
