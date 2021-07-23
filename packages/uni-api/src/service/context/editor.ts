import { callOptions } from '@dcloudio/uni-shared'

// let eventReady = false
let index = 0
let optionsCache: Record<string, any> = {}
function operateEditor(
  componentId: string,
  pageId: number,
  type: string,
  options: any
) {
  const data: { callbackId?: string; options?: any } = { options }

  const needCallOptions =
    options &&
    ('success' in options || 'fail' in options || 'complete' in options)

  if (needCallOptions) {
    const callbackId = String(index++)
    data.callbackId = callbackId
    optionsCache[callbackId] = options
  }

  UniServiceJSBridge.invokeViewMethod<{}, { callbackId: string; data: any }>(
    `editor.${componentId}`,
    {
      type,
      data,
    },
    pageId,
    ({ callbackId, data }) => {
      if (needCallOptions) {
        callOptions(optionsCache[callbackId], data)
        delete optionsCache[callbackId]
      }
    }
  )
}

export class EditorContext implements UniApp.EditorContext {
  id: string
  pageId: number
  constructor(id: string, pageId: number) {
    this.id = id
    this.pageId = pageId
  }

  format(name: string, value: string) {
    this._exec('format', {
      name,
      value,
    })
  }
  insertDivider() {
    this._exec('insertDivider')
  }
  insertImage(options: UniApp.EditorContextInsertImageOptions) {
    this._exec('insertImage', options)
  }
  insertText(options: UniApp.EditorContextInsertTextOptions) {
    this._exec('insertText', options)
  }
  setContents(options: UniApp.EditorContextSetContentsOptions) {
    this._exec('setContents', options)
  }
  getContents(options: UniApp.EditorContextGetContentsOptions) {
    this._exec('getContents', options)
  }
  clear(options: UniApp.EditorContextClearOptions) {
    this._exec('clear', options)
  }
  removeFormat(options: UniApp.EditorContextRemoveFormatOptions) {
    this._exec('removeFormat', options)
  }
  undo(options: UniApp.EditorContextUndoOptions) {
    this._exec('undo', options)
  }
  redo(options: UniApp.EditorContextRedoOptions) {
    this._exec('redo', options)
  }
  blur(options: UniApp.CommonOptions) {
    this._exec('blur', options)
  }
  getSelectionText(options: UniApp.CommonOptions) {
    this._exec('getSelectionText', options)
  }
  scrollIntoView(options: UniApp.EditorContextGetSelectionTextOptions) {
    this._exec('scrollIntoView', options)
  }
  private _exec(method: string, options?: any) {
    operateEditor(this.id, this.pageId, method, options)
  }
}
