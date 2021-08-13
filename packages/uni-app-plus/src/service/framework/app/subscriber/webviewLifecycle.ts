import { getPageById } from '../../page/getCurrentPages'

export function onWebviewInserted(_: unknown, pageId: string) {
  const page = getPageById(parseInt(pageId))
  page && ((page as any).__uniapp_webview = true)
}
export function onWebviewRemoved(_: unknown, pageId: string) {
  const page = getPageById(parseInt(pageId))
  page && delete (page as any).__uniapp_webview
}
