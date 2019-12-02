import {
  getCurrentPageId
} from '../../platform'
import {
  callback
} from 'uni-shared'

function operateEditor (componentId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-editor-' + componentId, {
    componentId,
    type,
    data
  }, pageId)
}

UniServiceJSBridge.subscribe('onEditorMethodCallback', ({
  callbackId,
  data
}) => {
  callback.invoke(callbackId, data)
})

const methods = ['insertDivider', 'insertImage', 'insertText', 'setContents', 'getContents', 'clear', 'removeFormat', 'undo', 'redo']

class EditorContext {
  constructor (id, pageId) {
    this.id = id
    this.pageId = pageId
  }
  format (name, value) {
    operateEditor(this.id, this.pageId, 'format', {
      options: {
        name,
        value
      }
    })
  }
}

methods.forEach(function (method) {
  EditorContext.prototype[method] = callback.warp(function (options, callbackId) {
    operateEditor(this.id, this.pageId, method, {
      options,
      callbackId
    })
  })
})

export function createEditorContext (id, context) {
  if (context) {
    return new EditorContext(id, context.$page.id)
  }
  const pageId = getCurrentPageId()
  if (pageId) {
    return new EditorContext(id, pageId)
  } else {
    UniServiceJSBridge.emit('onError', 'createEditorContext:fail')
  }
}
