const downgrade = plus.os.name === 'Android' && parseInt(plus.os.version) < 6

export const ANI_SHOW = downgrade ? 'slide-in-right' : 'pop-in'
export const ANI_DURATION = 300

export const ANI_CLOSE = downgrade ? 'slide-out-right' : 'pop-out'

export const TITLEBAR_HEIGHT = 44

export const ON_REACH_BOTTOM_DISTANCE = 50

export const VIEW_WEBVIEW_PATH = '_www/__uniappview.html'

export const V_FOR = 'f'
export const V_IF = 'i'
export const V_ELSE_IF = 'e'
export const V_SHOW = 'v-show'

export const B_CLASS = 'c'
export const B_STYLE = 's'
