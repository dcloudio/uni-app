import PageNode from "io.dcloud.uniapp.dom.node.PageNode"
import INodeData from "io.dcloud.uniapp.interfaces.INodeData"

import { UniEditorElementOptions, UniEditorElementInsertImageOptions, UniEditorElementInsertTextOptions, UniEditorElementInsertLinkOptions, UniEditorElementInsertMentionOptions, UniEditorElementGetSelectionTextOptions, UniEditorElementSetContentsOptions, UniEditorElementGetSelectionTextOptionsRes, CreateEditorContextAsync, CreateEditorContextAsyncOptions, EditorContext, UniEditorElementGetContentsOptions, UniEditorElementOptionsSuccessRes, UniEditorElementOptionsFailRes, UniEditorElementOptionsCompleteRes, UniEditorElementGetContentsOptionsRes, IUniEditorElement } from '../interface.uts'

export { UniEditorElementOptions, UniEditorElementInsertImageOptions, UniEditorElementInsertTextOptions, UniEditorElementInsertLinkOptions, UniEditorElementInsertMentionOptions, UniEditorElementGetSelectionTextOptions, UniEditorElementSetContentsOptions, UniEditorElementGetSelectionTextOptionsRes, CreateEditorContextAsync, CreateEditorContextAsyncOptions, EditorContext, UniEditorElementGetContentsOptions, UniEditorElementOptionsSuccessRes, UniEditorElementOptionsFailRes, UniEditorElementOptionsCompleteRes, UniEditorElementGetContentsOptionsRes, IUniEditorElement }

function createEditorEventName(name : string, id : string) {
  return `__UNIEDITOR_${name}_${id}`
}

let callbackId = 100000

function LOG(...args : string[]) {
  // 此处供开发时调试
  // console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} [Editor LOG]`, ...args)
}

function generateCallbackId() : number {
  return ++callbackId
}

export class NativeEditor {
  id : string
  private pendingCallbacks = new Map<number, (result : UTSJSONObject) => void>()
  private disposed = false

  constructor(id : string, element: UniEditorElement) {
    this.id = id

    element?.setNativeEditor(this)

    // 注册唯一的持久监听器，按 cbId 分发回调
    uni.$on(createEditorEventName('callback', this.id), (_cbId : number, result : UTSJSONObject) => {
      let handler = this.pendingCallbacks.get(_cbId)
      if (handler == null) {
        handler = this.pendingCallbacks.get(_cbId.toInt())
      }
      if (handler != null) {
        this.pendingCallbacks.delete(_cbId)
        handler(result)
      } else {
        LOG(`${_cbId} handler not found`)
      }
    })
  }

  registerCallback(cbId : number, handler : (result : UTSJSONObject) => void) {
    if (this.disposed) {
      handler({ errMsg: 'fail editor disposed' } as UTSJSONObject)
      return
    }
    this.pendingCallbacks.set(cbId, handler)
  }

  dispose() {
    if (this.disposed) {
      return
    }
    this.disposed = true
    uni.$off(createEditorEventName('callback', this.id))
    // 清理所有待处理回调，触发 fail
    this.pendingCallbacks.forEach((handler, _cbId) => {
      handler({ errMsg: 'fail editor disposed' } as UTSJSONObject)
    })
    this.pendingCallbacks.clear()
  }
}

export class UniEditorElement extends UniViewElementImpl implements IUniEditorElement {
  override tagName : string = 'EDITOR'
  override nodeName : string = 'EDITOR'

  private nativeEditor : NativeEditor | null = null

  constructor(data: INodeData, pageNode: PageNode) {
    super(data, pageNode);
  }

  // @ts-ignore dispose
  dispose() {
    this.nativeEditor?.dispose()
    this.nativeEditor = null
  }

  private getNativeEditorId() : string {
    return this.nativeEditor!.id
  }

  setNativeEditor(nativeEditor : NativeEditor) {
    this.nativeEditor = nativeEditor
  }

  format(name : string, value : string | number | null) : void {
    uni.$emit(createEditorEventName('format', this.getNativeEditorId()), name, value)
  }

  insertDivider(options : UniEditorElementOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('insertDivider', this.getNativeEditorId()), {}, cbId)
  }

  insertImage(options : UniEditorElementInsertImageOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })

    const params = new UTSJSONObject()
    params['src'] = options?.src ?? null
    params['alt'] = options?.alt ?? null
    params['width'] = options?.width ?? null
    params['height'] = options?.height ?? null
    params['extClass'] = options?.extClass ?? null
    params['data'] = options?.data ?? null

    uni.$emit(createEditorEventName('insertImage', this.getNativeEditorId()), params, cbId)
  }

  insertText(options : UniEditorElementInsertTextOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    const params = new UTSJSONObject()
    params['text'] = options?.text ?? null
    uni.$emit(createEditorEventName('insertText', this.getNativeEditorId()), params, cbId)
  }

  insertLink(options : UniEditorElementInsertLinkOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    const params = new UTSJSONObject()
    params['text'] = options?.text ?? null
    params['href'] = options?.href ?? null
    uni.$emit(createEditorEventName('insertLink', this.getNativeEditorId()), params, cbId)
  }

  insertMention(options : UniEditorElementInsertMentionOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    const params = new UTSJSONObject()
    params['id'] = options?.id ?? null
    params['name'] = options?.name ?? null
    params['color'] = options?.color ?? null
    params['background'] = options?.background ?? null
    params['radius'] = options?.radius ?? null
    uni.$emit(createEditorEventName('insertMention', this.getNativeEditorId()), params, cbId)
  }

  setContents(options : UniEditorElementSetContentsOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    const params = new UTSJSONObject()
    params['delta'] = options?.delta ?? null
    params['html'] = options?.html ?? null
    uni.$emit(createEditorEventName('setContents', this.getNativeEditorId()), params, cbId)
  }

  getContents(options : UniEditorElementGetContentsOptions | null) : void {
    const cbId = generateCallbackId()

    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1

      if (isSuccess) {
        options?.success?.({
          errMsg,
          delta: result['delta'] as any,
          html: result['html'] as string,
          text: result['text'] as string
        } as UniEditorElementGetContentsOptionsRes)
      } else {
        options?.fail?.({ errMsg })
      }

      options?.complete?.({ errMsg })
    })

    uni.$emit(createEditorEventName('getContents', this.getNativeEditorId()), {}, cbId)
  }

  clear(options : UniEditorElementOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('clear', this.getNativeEditorId()), {}, cbId)
  }

  removeFormat(options : UniEditorElementOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('removeFormat', this.getNativeEditorId()), {}, cbId)
  }

  undo(options : UniEditorElementOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('undo', this.getNativeEditorId()), {}, cbId)
  }

  redo(options : UniEditorElementOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('redo', this.getNativeEditorId()), {}, cbId)
  }

  /**
   * TODO 和基类冲突，不支持 success 等回调
   */
  override blur() : void {
    uni.$emit(createEditorEventName('blur', this.getNativeEditorId()))
  }

  getSelectionText(options : UniEditorElementGetSelectionTextOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({
          errMsg,
          text: result['text'] as string
        } as UniEditorElementGetSelectionTextOptionsRes)
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('getSelectionText', this.getNativeEditorId()), {}, cbId)
  }

  scrollIntoView(options : UniEditorElementOptions | null) : void {
    const cbId = generateCallbackId()
    this.nativeEditor!.registerCallback(cbId, (result : UTSJSONObject) => {
      const errMsg = (result['errMsg'] as string | null) ?? ''
      const isSuccess = errMsg.indexOf(':ok') > -1
      if (isSuccess) {
        options?.success?.({ errMsg })
      } else {
        options?.fail?.({ errMsg })
      }
      options?.complete?.({ errMsg })
    })
    uni.$emit(createEditorEventName('scrollIntoView', this.getNativeEditorId()), {}, cbId)
  }
}

export const createEditorContextAsync : CreateEditorContextAsync = (options) : void => {
  const id = options.id
  const component = options.component
  const success = options.success
  const fail = options.fail
  const complete = options.complete

  let editorElement : UniEditorElement | null = null;
  if (component == null) {
    const pages = getCurrentPages();
    if (pages.length > 0) {
      editorElement = pages[pages.length - 1].$vm!.$el?.parentElement?.querySelector('#' + id) as UniEditorElement | null;
    }
  } else {
    editorElement = component.$el?.parentElement?.querySelector('#' + id) as UniEditorElement | null;
  }
  if (editorElement == null) {
    const uniError = new UniError('uni-createEditorContextAsync', -1, 'editor id or component invalid.')
    fail?.(uniError)
    complete?.()
  } else {
    success?.(new EditorContextImpl(editorElement))
    complete?.()
  }
}

class EditorContextImpl implements EditorContext {

  constructor(private editorElement : UniEditorElement) {
  }

  format(name : string, value : string | number | null) : void {
    this.editorElement.format(name, value)
  }

  insertDivider(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.insertDivider(options)
  }

  insertImage(options ?: UniEditorElementInsertImageOptions | null) : void {
    this.editorElement.insertImage(options)
  }

  insertText(options ?: UniEditorElementInsertTextOptions | null) : void {
    this.editorElement.insertText(options)
  }

  insertLink(options ?: UniEditorElementInsertLinkOptions | null) : void {
    this.editorElement.insertLink(options)
  }

  insertMention(options ?: UniEditorElementInsertMentionOptions | null) : void {
    this.editorElement.insertMention(options)
  }

  setContents(options ?: UniEditorElementSetContentsOptions | null) : void {
    this.editorElement.setContents(options)
  }

  getContents(options ?: UniEditorElementGetContentsOptions | null) : void {
    this.editorElement.getContents(options)
  }

  getSelectionText(options ?: UniEditorElementGetSelectionTextOptions | null) : void {
    this.editorElement.getSelectionText(options)
  }

  clear(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.clear(options)
  }

  removeFormat(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.removeFormat(options)
  }

  undo(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.undo(options)
  }

  redo(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.redo(options)
  }

  blur(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.blur()
    options?.success?.({ errMsg: 'blur:ok' })
    options?.complete?.({ errMsg: 'blur:ok' })
  }

  scrollIntoView(options ?: UniEditorElementOptions | null) : void {
    this.editorElement.scrollIntoView(options)
  }
}
