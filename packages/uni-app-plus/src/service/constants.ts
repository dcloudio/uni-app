const downgrade =
  !__X__ && plus.os.name === 'Android' && parseInt(plus.os.version!) < 6

export const ANI_SHOW = downgrade ? 'slide-in-right' : 'pop-in'
export const ANI_DURATION = 300

export const ANI_CLOSE = downgrade ? 'slide-out-right' : 'pop-out'

export const VIEW_WEBVIEW_PATH = '_www/__uniappview.html'

export const WEBVIEW_ID_PREFIX = 'webviewId'

export const SDK_UNI_MP_NATIVE_EVENT = 'uniMPNativeEvent'
