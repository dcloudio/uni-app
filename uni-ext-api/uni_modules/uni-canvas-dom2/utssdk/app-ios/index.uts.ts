import {
  CanvasContext,
  CreateCanvasContextAsync,
  CreateCanvasContextAsyncOptions,
  RequestAnimationFrameCallback,
  CreateCanvasContextAsyncSuccessCallback,
  CreateCanvasContextAsyncFailCallback,
  CreateCanvasContextAsyncCompleteCallback,
} from '../interface.uts'

import {
  CanvasRenderingContext2DJSCBinding,
  CanvasRenderingContext2DJSCBridge,
  Image,
  RenderingContext2D,
  UniCanvasRenderView,
} from 'DCloudUniCanvas'
import { DispatchQueue } from 'Dispatch'
import { NSNumber } from 'Foundation'
import { JSContext, JSExport, JSManagedValue, JSValue } from 'JavaScriptCore';

export type UniCanvasElementReadyCallback = () => void

export class UniNativeCanvas {
  private element : UniCanvasElementImpl | null = null
  private renderView : UniCanvasRenderView = new UniCanvasRenderView()
  private _width = 0
  private _height = 0

  constructor(element : UniNativeViewElement) {
    super.init()
    if (UTSiOS.instanceof(element, UniCanvasElementImpl.self)) {
      this.element = element as UniCanvasElementImpl
      this.element.setNativeCanvas(this)
      this.element.bindView(this.renderView)
    }
    const ctx = UTSRuntimeBridge.getCurrentJSContext()
    ctx?.uni_setObject(Image.self, forKeyedSubscript = "Image");
    ctx?.uni_setObject(Path2D.self, forKeyedSubscript = "Path2D");
  }
  
  getCanvasRenderView() : UniCanvasRenderView {
    return this.renderView
  }

  get width() : number {
    if (this._width > 0) {
      return this._width
    }
    if (this.element != null) {
      return this.element!.offsetWidth * this.renderView.devicePixelRatio()
    }
    return 0;
  }

  set width(value : number) {
    this._width = value
  }

  get height() : number {
    if (this._height > 0) {
      return this._height
    }
    if (this.element != null) {
      return this.element!.offsetHeight * this.renderView.devicePixelRatio()
    }
    return 0
  }

  set height(value : number) {
    this._height = value
  }

  getContext(type : string) : JSValue | null {
    return this.element?.getContext(type)
  }

  toDataURL(type : string | null = null, quality : any | null = null) : string {
    const data = this.renderView.toDataURL(type ?? 'image/png', quality)
    return data != null ? data as string : ''
  }

  destroy() {
    this.element?.invalidateContext2D()
    this.renderView.element = nil
    this.renderView.destroy()
  }

  updateBackground(color : string) {
    this.renderView.updateBackground(color)
  }
}

export interface UniCanvasElement extends JSExport, UniElement {
  width: number;
  height: number;
  getContext(contextId: string): JSValue | null;
  toDataURL(type?: string, quality?: any): string;
}

export class UniCanvasElementImpl extends UniNativeViewElementImpl implements UniCanvasElement {
  override tagName : string = 'CANVAS'
  override nodeName : string = 'CANVAS'
  private context2D : RenderingContext2D | null = null
  private context2DJSValue : JSManagedValue | null = null
  @UTSiOS.keyword("weak")
  private context2DJSContext : JSContext | null = null
  private context2DJSCBinding : CanvasRenderingContext2DJSCBinding | null = null
  private isViewReady : boolean = false
  private viewReadyCallbacks : UniCanvasElementReadyCallback[] = []
  
  @UTSiOS.keyword("weak")
  private canvas_holder : UniNativeCanvas | null = null

  setNativeCanvas(holder : UniNativeCanvas) {
    this.canvas_holder = holder
  }

  onViewReadyOnce(callback : UniCanvasElementReadyCallback) {
    if (this.isViewReady) {
      callback()
      return
    }
    this.viewReadyCallbacks.push(callback)
  }

  private notifyViewReady() {
    if (this.isViewReady) {
      return
    }
    this.isViewReady = true
    const callbacks = this.viewReadyCallbacks
    this.viewReadyCallbacks = []
    for (callback in callbacks) {
      callback()
    }
  }

  bindView(view: UniCanvasRenderView ) {
    view.element = this
    this.bindIOSView(view)
    DispatchQueue.main.async(execute = () : void => {
      this.notifyViewReady()
    })
  }

  get width() : number {
    if (this.canvas_holder != null){
      return this.canvas_holder!.width
    }
    return 0
  }

  set width(value : number) {
    if (this.canvas_holder != null){
      this.canvas_holder!.width = value
    }
  }

  get height() : number {
    if (this.canvas_holder != null){
      return this.canvas_holder!.height
    }
    return 0
  }

  set height(value : number) {
    if (this.canvas_holder != null){
      this.canvas_holder!.height = value
    }
  }

  getContext(type : string) : JSValue | null {
    if (type != '2d') {
      return null
    }

    const context = UTSRuntimeBridge.getCurrentJSContext()
    if (context == null) {
      return null
    }

    const cachedValue = this.context2DJSValue?.value
    if (this.context2DJSContext === context && cachedValue != null) {
      return cachedValue
    }

    this.releaseContext2DJSValue()
    if (this.context2D == null) {
      const canvas_view = this.canvas_holder?.getCanvasRenderView()
      if (canvas_view != null) {
        this.context2D = canvas_view!.getContext("2d")
      }
    }
    if (this.context2D == null) {
      return null
    }

    const bridge = CanvasRenderingContext2DJSCBridge.makeJSValue(renderingContext = this.context2D!, element = this, jsContext = context!)
    if (bridge == null) {
      return null
    }

    const managedValue = new JSManagedValue(value = bridge!.value)
    context!.virtualMachine.addManagedReference(managedValue, withOwner = this)
    this.context2DJSValue = managedValue
    this.context2DJSContext = context
    this.context2DJSCBinding = bridge!.binding
    return bridge!.value
  }

  invalidateContext2D() {
    this.releaseContext2DJSValue()
    this.context2D = null
  }

  private releaseContext2DJSValue() {
    this.context2DJSCBinding?.invalidate()
    this.context2DJSCBinding = null
    if (this.context2DJSValue != null && this.context2DJSContext != null) {
      this.context2DJSContext!.virtualMachine.removeManagedReference(
        this.context2DJSValue!,
        withOwner = this
      )
    }
    this.context2DJSValue = null
    this.context2DJSContext = null
  }

  toDataURL(type : string | null = null, quality : any | null = null) : string {
    if (this.canvas_holder != null) {
      return this.canvas_holder!.toDataURL(type, quality)  
    }
    return ""
  }
}

export class UniCanvasContext implements CanvasContext {
  @UTSiOS.keyword("weak")
  _element : UniCanvasElementImpl | null = null
  requestAnimationFrame : JSValue | null = null
  cancelAnimationFrame : JSValue | null = null
  
  constructor(element : UniCanvasElementImpl) {
    this._element = element
    const ctx = UTSRuntimeBridge.getCurrentJSContext()
    this.requestAnimationFrame = ctx?.globalObject?.objectForKeyedSubscript("requestAnimationFrame") 
    this.cancelAnimationFrame = ctx?.globalObject?.objectForKeyedSubscript("cancelAnimationFrame")
  }

  getContext(type : string) : JSValue | null {
    return this._element?.getContext(type)
  }

  toDataURL(type : string) : string {
    return this.toDataURL(type, 1)
  }

  toDataURL(type : string, encoderOptions : any) : string {
    if(this._element != null) {
      return this._element!.toDataURL(type, encoderOptions)
    }
    return ""
  }

  toDataURL() : string {
    return this.toDataURL("image/png", 1)
  }

  createImage() : JSValue {
    const context = UTSRuntimeBridge.getCurrentJSContext()!
    return new JSValue(object = new Image(), in = context)!
  }

  createPath2D() : JSValue {
    const context = UTSRuntimeBridge.getCurrentJSContext()!
    return new JSValue(object = new Path2D(), in = context)!
  }

}

export const createCanvasContextAsync : CreateCanvasContextAsync =
  function (options : CreateCanvasContextAsyncOptions) {
    let page : UniPage | null = options.component?.$page ?? null
    let renderChangeId : number | null = null
    let finished = false

    const removeRenderChangeListener = () => {
      if (renderChangeId != null && page != null) {
        page!.offRenderChange(renderChangeId!)
        renderChangeId = null
      }
    }

    const fail = () => {
      if (finished) {
        return
      }
      finished = true
      removeRenderChangeListener()
      const uniError = new UniError('uni-createCanvasContextAsync', -1, 'canvas id invalid.')
      options.fail?.(uniError)
      options.complete?.()
    }

    const resolve = (element : UniElement | null) : boolean => {
      if (finished) {
        return true
      }
      if (element == null) {
        return false
      }
      if (!UTSiOS.instanceof(element, UniCanvasElementImpl.self)) {
        fail()
        return true
      }

      finished = true
      removeRenderChangeListener()
      const canvasElement = element as UniCanvasElementImpl
      canvasElement.onViewReadyOnce(() => {
        options.success?.(new UniCanvasContext(canvasElement))
        options.complete?.()
      })
      return true
    }

    if (resolve(uni.getElementById(options.id))) {
      return
    }

    if (page == null) {
      const pages = getCurrentPages()
      if (pages.length > 0) {
        page = pages[pages.length - 1]
      }
    }
    if (page == null) {
      fail()
      return
    }

    if (resolve(page!.getElementById(options.id))) {
      return
    }

    renderChangeId = page!.onRenderChange(() => {
      removeRenderChangeListener()
      if (!resolve(page!.getElementById(options.id))) {
        fail()
      }
    })

    if (renderChangeId == null || renderChangeId!.intValue < 0) {
      fail()
      return
    }

    // 注册监听后再次查询，避免元素在查询与监听之间完成创建。
    resolve(page!.getElementById(options.id))
  }

export {
  CanvasContext,
  CreateCanvasContextAsync,
  CreateCanvasContextAsyncOptions,
  RequestAnimationFrameCallback,
  CreateCanvasContextAsyncSuccessCallback,
  CreateCanvasContextAsyncFailCallback,
  CreateCanvasContextAsyncCompleteCallback,
}
