import {
  debounce
} from 'uni-shared'

import {
  publish
} from '../../bridge'

export function onWebviewResize (webview) {
  const onResize = function ({
    width,
    height
  }) {
    const landscape = Math.abs(plus.navigator.getOrientation()) === 90
    const res = {
      deviceOrientation: landscape ? 'landscape' : 'portrait',
      size: {
        windowWidth: Math.ceil(width),
        windowHeight: Math.ceil(height)
      }
    }
    publish('onViewDidResize', res) // API
    UniServiceJSBridge.emit('onResize', res, parseInt(webview.id)) // Page lifecycle
  }
  webview.addEventListener('resize', debounce(onResize, 50))
}
