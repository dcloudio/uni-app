export const VD_SYNC = 'vdSync'

export const ON_WEBVIEW_READY = 'onWebviewReady'

export let ACTION_MINIFY = true
// __tests__
export function setActionMinify(minify: boolean) {
  ACTION_MINIFY = minify
}
export const ACTION_TYPE_DICT = 0

export type Value = string | number | boolean | null
export type Dictionary = Value[]
export type DictAction = [typeof ACTION_TYPE_DICT, Dictionary]
