export type UniEditorFocusEventDetail = {
  html : string,
  text : string,
  delta : any
}
export class UniEditorFocusEvent extends UniCustomEvent<UniEditorFocusEventDetail> {
  constructor(html : string, text : string, delta : any) {
    super('focus', { html, text, delta } as UniEditorFocusEventDetail)
  }
}

export type UniEditorBlurEventDetail = {
  html : string,
  text : string,
  delta : any
}
export class UniEditorBlurEvent extends UniCustomEvent<UniEditorBlurEventDetail> {
  constructor(html : string, text : string, delta : any) {
    super('blur', { html, text, delta } as UniEditorBlurEventDetail)
  }
}

export type UniEditorInputEventDetail = {
  html : string,
  text : string,
  delta : any
}
export class UniEditorInputEvent extends UniCustomEvent<UniEditorInputEventDetail> {
  constructor(html : string, text : string, delta : any) {
    super('input', { html, text, delta } as UniEditorInputEventDetail)
  }
}

export type UniEditorStatusChangeEventDetail = {
  bold?: boolean | null
  italic?: boolean | null
  underline?: boolean | null
  strike?: boolean | null
  blockquote?: boolean | null
  codeBlock?: boolean | null
  align?: string | null
  lineHeight?: string | null
  letterSpacing?: string | null
  marginTop?: string | null
  marginBottom?: string | null
  fontFamily?: string | null
  fontSize?: string | null
  color?: string | null
  backgroundColor?: string | null
  list?: string | null
  header?: number | null
  script?: string | null
  direction?: string | null
  link?: string | null
}
export class UniEditorStatusChangeEvent extends UniCustomEvent<UniEditorStatusChangeEventDetail> {
  constructor(formats: UniEditorStatusChangeEventDetail) {
    super('statuschange', formats)
  }
}

type UniEditorElementOptionsSuccessRes = {
  errMsg: string
}
type UniEditorElementOptionsFailRes = {
  errMsg: string
}
type UniEditorElementOptionsCompleteRes = {
  errMsg: string
}

type UniEditorElementOptions = {
  success ?: ((res : UniEditorElementOptionsSuccessRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementInsertImageOptions = {
  src ?: string | null,
  alt ?: string | null,
  width ?: string | null,
  height ?: string | null,
  extClass ?: string | null,
  data ?: any | null,
  success ?: ((res : UniEditorElementOptionsSuccessRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementInsertMentionOptions = {
  /**
   * 被 @ 的人 id
   */
  id ?: string | null,
  /**
   * 被 @ 的人名字
   */
  name?: string | null,
  /**
   * 提及文本颜色，默认为 #1677ff
   * @defaultValue #1677ff
   */
  color?: string | null,
  /**
   * 提及背景颜色，默认为 #e6f3ff
   * @defaultValue #e6f3ff
   */
  background?: string | null,
  /**
   * 提及圆角，默认为 4px
   * @defaultValue 4px
   */
  radius?: string | null,
  success ?: ((res : UniEditorElementOptionsSuccessRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementInsertTextOptions = {
  text ?: string | null,
  success ?: ((res : UniEditorElementOptionsSuccessRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementInsertLinkOptions = {
  text ?: string | null,
  href ?: string | null,
  success ?: ((res : UniEditorElementOptionsSuccessRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementSetContentsOptions = {
  delta ?: any | null,
  html ?: string | null,
  success ?: ((res : UniEditorElementOptionsSuccessRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementGetSelectionTextOptionsRes = {
  errMsg : string,
  text : string
}

type UniEditorElementGetSelectionTextOptions = {
  success ?: ((res : UniEditorElementGetSelectionTextOptionsRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

type UniEditorElementGetContentsOptionsRes = {
  errMsg : string,
  delta : any,
  html : string,
  text : string
}

type UniEditorElementGetContentsOptions = {
  success ?: ((res : UniEditorElementGetContentsOptionsRes) => void) | null
  fail ?: ((res : UniEditorElementOptionsFailRes) => void) | null
  complete ?: ((res : UniEditorElementOptionsCompleteRes) => void) | null
}

export class UniEditorElement extends UniViewElementImpl {
  override tagName: string = 'EDITOR'
  override nodeName: string = 'EDITOR'

  vm!: any

  /**
   * 格式化文本
   * @param name format name
   * @param value format value, optional, default is null
   */
  format(name: string, value: string | number | null = null) : void {
    this.vm?.format(name, value)
  }

  /**
   * 插入分割线
   * @param options 回调选项 { success, fail, complete }
   */
  insertDivider(options : UniEditorElementOptions | null) : void {
    this.vm?.insertDivider(options)
  }

  /**
   * 插入图片
   * @param options 图片选项 { src, alt, width, height, extClass, data, success, fail, complete }
   */
  insertImage(options : UniEditorElementInsertImageOptions | null) : void {
    this.vm?.insertImage(options)
  }

  /**
   * 插入提及
   * @param options 提及选项 { id, name, color, background, radius, success, fail, complete }
   */
  insertMention(options : UniEditorElementInsertMentionOptions | null) : void {
    this.vm?.insertMention(options)
  }

  /**
   * 插入文本
   * @param options 文本选项 { text, success, fail, complete }
   */
  insertText(options : UniEditorElementInsertTextOptions | null) : void {
    this.vm?.insertText(options)
  }

  /**
   * 插入链接
   * @param options 链接选项 { text, href, success, fail, complete }
   */
  insertLink(options : UniEditorElementInsertLinkOptions | null) : void {
    this.vm?.insertLink(options)
  }

  /**
   * 设置内容
   * @param options 内容选项 { delta, html, success, fail, complete }
   */
  setContents(options : UniEditorElementSetContentsOptions | null) : void {
    this.vm?.setContents(options)
  }

  /**
   * 获取内容
   * @param options 回调选项 { success, fail, complete }
   * @returns 在 success 回调中返回 { html, text, delta }
   */
  getContents(options : UniEditorElementGetContentsOptions | null) : void {
    this.vm?.getContents(options)
  }

  /**
   * 清空内容
   * @param options 回调选项 { success, fail, complete }
   */
  clear(options : UniEditorElementOptions | null) : void {
    this.vm?.clear(options)
  }

  /**
   * 移除格式
   * @param options 回调选项 { success, fail, complete }
   */
  removeFormat(options : UniEditorElementOptions | null) : void {
    this.vm?.removeFormat(options)
  }

  /**
   * 撤销
   * @param options 回调选项 { success, fail, complete }
   */
  undo(options : UniEditorElementOptions | null) : void {
    this.vm?.undo(options)
  }

  /**
   * 重做
   * @param options 回调选项 { success, fail, complete }
   */
  redo(options : UniEditorElementOptions | null) : void {
    this.vm?.redo(options)
  }

  /**
   * 失去焦点
   * TODO 和基类冲突，不支持 success 等回调
   */
  override blur() : void {
    this.vm?.blur()
  }

  /**
   * 获取选中文本
   * @param options 回调选项 { success, fail, complete }
   * @returns 在 success 回调中返回 { text }
   */
  getSelectionText(options : UniEditorElementGetSelectionTextOptions | null) : void {
    this.vm?.getSelectionText(options)
  }

  /**
   * 滚动到可视区域
   * @param options 回调选项 { success, fail, complete }
   */
  scrollIntoView(options : UniEditorElementOptions | null) : void {
    this.vm?.scrollIntoView(options)
  }
}
