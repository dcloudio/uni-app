const downgrade = plus.os.name === 'Android' && parseInt(plus.os.version!) < 6

export const ANI_SHOW = downgrade ? 'slide-in-right' : 'pop-in'
export const ANI_DURATION = 300

export const VIEW_WEBVIEW_PATH = '_www/__uniappview.html'
