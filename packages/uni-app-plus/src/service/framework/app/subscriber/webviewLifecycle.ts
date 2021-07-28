function findPage(pageId: string) {
  const page = getCurrentPages().find(
    (page) => page.$page.id === parseInt(pageId)
  )
  if (!page) {
    return console.error(`Page[${pageId}] not found`)
  }
  return page
}
export function onWebviewInserted(data: any, pageId: string) {
  const page = findPage(pageId)
  page && ((page as any).__uniapp_webview = true)
}
export function onWebviewRemoved(data: any, pageId: string) {
  const page = findPage(pageId)
  page && delete (page as any).__uniapp_webview
}
