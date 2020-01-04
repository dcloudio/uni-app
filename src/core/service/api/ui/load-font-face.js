import {
  invoke
} from 'uni-core/service/bridge'

import {
  getCurrentPageId
} from '../../platform'

UniServiceJSBridge.subscribe('onLoadFontFaceCallback', ({
  callbackId,
  data
}) => {
  invoke(callbackId, data)
})

export function loadFontFace (options, callbackId) {
  const pageId = getCurrentPageId()
  if (!pageId) {
    return {
      errMsg: 'loadFontFace:fail not font page'
    }
  }
  UniServiceJSBridge.publishHandler('loadFontFace', {
    options,
    callbackId
  }, pageId)
}
