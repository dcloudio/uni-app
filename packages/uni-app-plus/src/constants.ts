export const VD_SYNC = 'vdSync'

export const APP_SERVICE_ID = '__uniapp__service'

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

export const WEBVIEW_INSERTED = 'webviewInserted'
export const WEBVIEW_REMOVED = 'webviewRemoved'
export const WEBVIEW_ID_PREFIX = 'webviewId'

export const INIT_PAGE_SCROLL = 'initPageScroll'

export const API_SET_LOCALE = 'setLocale'
export const BASE64_TO_TEMP_FILE_PATH = 'base64ToTempFilePath'
