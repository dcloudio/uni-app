// 该文件需要使用 ES5 语法，以兼容旧版本 Android WebView
// ==================== 工具函数 ====================

var STATUS_KEY_MAP = { 'code-block': 'codeBlock' };

// 检测是否为 iOS 设备
function isiOS() {
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isMac = /Macintosh|Mac/i.test(ua);
  const isIPadOS = isMac && navigator.maxTouchPoints > 0;
  return isIOS || isIPadOS;
}

// 向宿主环境发送消息
function uniPostMessage(data) {
  uni.webView.postMessage({
    data: data
  });
}

// 触发事件到宿主环境
function triggerEvent(eventName, detail) {
  uniPostMessage({
    event: eventName,
    detail: detail
  });
}

// ==================== HTML 解析器 ====================

// 简化的 HTML 解析器，用于将 HTML 转换为 Delta 格式
function parseHTML(html, handlers) {
  const startTagRe =
    /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'=<>`]+))?)*)\s*(\/?)>/;
  const endTagRe = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
  const attrRe =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^\s"'=<>`]+)))?/g;

  let index = 0;
  while (html) {
    // 处理文本内容
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      // 处理结束标签
      const endTagMatch = html.match(endTagRe);
      if (endTagMatch) {
        html = html.substring(endTagMatch[0].length);
        handlers.end && handlers.end(endTagMatch[1]);
        continue;
      }

      // 处理开始标签
      const startTagMatch = html.match(startTagRe);
      if (startTagMatch) {
        html = html.substring(startTagMatch[0].length);
        const tag = startTagMatch[1];
        const attrStr = startTagMatch[2];
        const unary = !!startTagMatch[3];

        // 解析属性
        const attrs = [];
        let match;
        attrRe.lastIndex = 0;
        while ((match = attrRe.exec(attrStr))) {
          attrs.push({
            name: match[1],
            value: match[2] || match[3] || match[4] || ''
          });
        }

        handlers.start && handlers.start(tag, attrs, unary);
        continue;
      }
    }

    // 处理文本
    let text = '';
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
      html = html.substring(textEnd);
    } else {
      text = html;
      html = '';
    }

    handlers.chars && handlers.chars(text);
  }
}

// ==================== 编辑器类 ====================

class UniEditor {
  constructor(options) {
    this.options = Object.assign({
      id: '',
      readOnly: false,
      placeholder: '',
      showImgSize: false,
      showImgToolbar: false,
      showImgResize: false,
      mentionData: [],
      type: ''
    }, options);

    this.quill = null;
    this.quillReady = false;
    this.skipMatcher = false;
    this.__status = {};

    this.init();
  }

  // 初始化编辑器
  init() {
    const imageResizeModules = [];
    if (this.options.showImgSize) {
      imageResizeModules.push('DisplaySize');
    }
    if (this.options.showImgToolbar) {
      imageResizeModules.push('Toolbar');
    }
    if (this.options.showImgResize) {
      imageResizeModules.push('Resize');
    }

    // 等待 Quill 加载完成
    if (typeof Quill !== 'undefined') {
      this.initQuill(imageResizeModules);
    } else {
      console.error('Quill is not loaded');
    }
  }

  // 初始化 Quill 编辑器
  initQuill(imageResizeModules) {
    // 注册自定义格式
    if (typeof registerQuillFormats === 'function') {
      registerQuillFormats(Quill);
    }

    const options = {
      toolbar: false,
      readOnly: this.options.readOnly,
      placeholder: this.options.placeholder,
      modules: {
        syntax: true
      }
    };

    // 配置图片调整大小模块
    if (imageResizeModules.length && typeof ImageResize !== 'undefined') {
      Quill.register('modules/ImageResize', ImageResize.default);
      options.modules.ImageResize = {
        modules: imageResizeModules
      };
    }

    // 创建 Quill 实例
    const container = document.getElementById('editor');
    this.quill = new Quill(container, options);

    if (this.options.type === 'none') {
      this.setInputMode('none')
    }

    const root = this.quill.root;

    // 绑定事件
    const events = ['focus', 'blur', 'input'];
    events.forEach(name => {
      root.addEventListener(name, (event) => {
        const contents = this.getContents();

        if (name === 'input') {
          // iOS 特殊处理：动态更新 placeholder
          if (isiOS()) {
            const regExpContent = (contents.html.match(/<span [\s\S]*>([\s\S]*)<\/span>/) || [])[1];
            const placeholder = regExpContent && regExpContent.replace(/\s/g, '') ? '' : this.options
              .placeholder;
            this.setPlaceHolder(placeholder);
          }
          event.stopPropagation();
        } else {
          // 触发 focus/blur 事件
          triggerEvent(name, contents);
        }
      });
    });

    // 监听文本变化
    this.quill.on(Quill.events.TEXT_CHANGE, (delta, old, source) => {
      this.fixCursor();
      this.handleTextChange();
    });

    // 监听选区变化
    this.quill.on(Quill.events.SELECTION_CHANGE, (range) => {
      this.updateStatus(range);
    });

    // 监听滚动优化
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
      const range = this.quill.selection.getRange()[0];
      this.updateStatus(range);
    });

    // 添加粘贴匹配器：过滤样式，只保留纯文本
    this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      if (this.skipMatcher) {
        return delta;
      }
      // 只保留文本内容，移除所有格式
      delta.ops = delta.ops
        .filter(({
          insert
        }) => typeof insert === 'string')
        .map(({
          insert
        }) => ({
          insert
        }));
      return delta;
    });

    this.quillReady = true;

    // 触发 ready 事件
    triggerEvent('ready', {});
  }

  // 处理文本变化
  handleTextChange() {
    const contents = this.getContents();
    triggerEvent('input', contents);
  }

  // 设置 placeholder
  setPlaceHolder(value) {
    const placeHolderAttrName = 'data-placeholder';
    const root = this.quill.root;
    if (root.getAttribute(placeHolderAttrName) !== value) {
      root.setAttribute(placeHolderAttrName, value);
    }
  }

  // 设置 placeholder
  setInputMode(value) {
    const root = this.quill.root;
    if (value === 'none') {
      root.setAttribute('inputmode', 'none')
    } else {
      root.removeAttribute('inputmode')
    }
  }

  // 获取编辑器内容
  getContents() {
    const html = this.quill.root.innerHTML;
    const text = this.quill.getText();
    const delta = this.quill.getContents();
    return {
      html: html,
      text: text,
      delta: delta
    };
  }

  // 将 HTML 转换为 Delta 格式
  html2delta(html) {
    const tags = ['span', 'strong', 'b', 'ins', 'em', 'i', 'u', 'a', 'del', 's', 'sub', 'sup', 'img', 'div',
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'ol', 'ul', 'li', 'br', 'blockquote', 'pre', 'code'
    ];
    let content = '';
    let disable = false;

    parseHTML(html, {
      start: (tag, attrs, unary) => {
        // 只处理允许的标签
        if (!tags.includes(tag)) {
          disable = !unary;
          return;
        }
        disable = false;
        const attrStr = attrs.map(function (attr) {
          return attr.name + '="' + attr.value + '"';
        }).join(' ');
        const start = '<' + tag + ' ' + attrStr + ' ' + (unary ? '/' : '') + '>';
        content += start;
      },
      end: (tag) => {
        if (!disable) {
          content += '</' + tag + '>';
        }
      },
      chars: (text) => {
        if (!disable) {
          content += text;
        }
      }
    });

    // 使用 Quill 的 clipboard 转换 HTML 为 Delta
    this.skipMatcher = true;
    const delta = this.quill.clipboard.convert(content);
    this.skipMatcher = false;
    return delta;
  }

  // 更新编辑器状态
  updateStatus(range) {
    const status = range ? this.quill.getFormat(range) : {};
    const keys = Object.keys(status);
    const oldKeys = Object.keys(this.__status || {});

    // 检查状态是否发生变化
    if (keys.length !== oldKeys.length || keys.find(key => status[key] !== this.__status[key])) {
      this.__status = status;
      var normalizedStatus = {};
      Object.keys(status).forEach(function(k) {
        normalizedStatus[STATUS_KEY_MAP[k] || k] = status[k];
      });
      triggerEvent('statuschange', normalizedStatus);
    }
  }

  // ==================== 编辑器方法 ====================

  // 格式化文本
  format(options) {
    if (!this.quillReady) return {
      errMsg: 'format:fail not ready'
    };

    let {
      name = '', value = false
    } = options;
    const range = this.quill.getSelection(true);

    if (!name) {
      return {
        errMsg: 'format:fail name is required'
      };
    }

    let format = this.quill.getFormat(range)[name] || false;

    // 处理不同的格式类型
    if (['bold', 'italic', 'underline', 'strike', 'ins'].includes(name)) {
      // 切换格式
      value = !format;
    } else if (name === 'direction') {
      // 处理文本方向
      value = value === 'rtl' && format ? false : value;
      const align = this.quill.getFormat(range).align;
      if (value === 'rtl' && !align) {
        this.quill.format('align', 'right', Quill.sources.USER);
      } else if (!value && align === 'right') {
        this.quill.format('align', false, Quill.sources.USER);
      }
    } else if (name === 'indent') {
      // 处理缩进
      const rtl = this.quill.getFormat(range).direction === 'rtl';
      value = value === '+1';
      if (rtl) {
        value = !value;
      }
      value = value ? '+1' : '-1';
    } else {
      // 处理列表等其他格式
      if (name === 'list') {
        value = value === 'check' ? 'unchecked' : value;
        format = format === 'checked' ? 'unchecked' : format;
      }
      value = ((format && format !== (value || false)) || (!format && value)) ? value : !format;
    }

    this.quill.format(name, value, Quill.sources.USER);
    this.updateStatus(range);
    return {
      errMsg: 'format:ok'
    };
  }

  // 插入分割线
  insertDivider() {
    if (!this.quillReady) return {
      errMsg: 'insertDivider:fail not ready'
    };

    const range = this.quill.getSelection(true);
    this.quill.insertText(range.index, '\n', Quill.sources.USER);
    this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
    this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
    this.updateStatus();
    return {
      errMsg: 'insertDivider:ok'
    };
  }

  // 插入图片
  insertImage(options) {
    if (!this.quillReady) return {
      errMsg: 'insertImage:fail not ready'
    };

    const range = this.quill.getSelection(true);
    const src = options.src || '';
    const alt = options.alt || '';
    const width = options.width || '';
    const height = options.height || '';
    const extClass = options.extClass || '';
    const data = options.data || {};

    // 插入图片
    this.quill.insertEmbed(range.index, 'image', src, Quill.sources.SILENT);

    // 设置图片属性
    const local = /^(file|blob):/.test(src) ? src : false;
    this.quill.formatText(range.index, 1, 'data-local', local, Quill.sources.SILENT);
    this.quill.formatText(range.index, 1, 'alt', alt, Quill.sources.SILENT);
    this.quill.formatText(range.index, 1, 'width', width, Quill.sources.SILENT);
    this.quill.formatText(range.index, 1, 'height', height, Quill.sources.SILENT);
    this.quill.formatText(range.index, 1, 'class', extClass, Quill.sources.SILENT);

    // 设置自定义数据
    const customData = Object.keys(data).map(function (key) {
      return key + '=' + data[key];
    }).join('&');
    this.quill.formatText(range.index, 1, 'data-custom', customData, Quill.sources.SILENT);

    this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
    this.quill.scrollIntoView();

    // 延迟触发文本变化事件
    setTimeout(() => {
      this.handleTextChange();
    }, 1000);

    this.updateStatus();
    return {
      errMsg: 'insertImage:ok'
    };
  }

  // 插入文本
  insertText(options) {
    if (!this.quillReady) return {
      errMsg: 'insertText:fail not ready'
    };

    const range = this.quill.getSelection(true);
    const {
      text = ''
    } = options;
    this.quill.insertText(range.index, text, Quill.sources.USER);
    this.quill.setSelection(range.index + text.length, 0, Quill.sources.SILENT);
    this.updateStatus();
    return {
      errMsg: 'insertText:ok'
    };
  }

  // 插入超链接
  insertLink(options) {
    if (!this.quillReady) return {
      errMsg: 'insertLink:fail not ready'
    };

    const range = this.quill.getSelection(true);
    const {
      text = '', href = ''
    } = options;
    if (!href) return {
      errMsg: 'insertLink:fail href is required'
    };
    if (range.length > 0) {
      this.quill.format('link', href, Quill.sources.USER);
    } else {
      const linkText = text || href;
      this.quill.insertText(range.index, linkText, 'link', href, Quill.sources.USER);
      this.quill.setSelection(range.index + linkText.length, 0, Quill.sources.SILENT);
    }
    this.updateStatus(range);
    return {
      errMsg: 'insertLink:ok'
    };
  }

  // 插入提及
  insertMention(options) {
    if (!this.quillReady) return {
      errMsg: 'insertMention:fail not ready'
    };

    const range = this.quill.getSelection(true);

    this.quill.insertEmbed(range.index, 'mention', options, Quill.sources.USER);
    this.quill.setSelection(range.index + 1, 0);

    this.updateStatus();
    return {
      errMsg: 'insertMention:ok'
    };
  }

  fixCursor() {
    const range = this.quill.getSelection();
    if (!range) return;

    const [leaf] = this.quill.getLeaf(range.index - 1);

    // 👉 如果前一个是 mention
    if (leaf && leaf.statics && leaf.statics.blotName === 'mention') {
      // 🔥 强制刷新 selection（让 Quill 插 cursor）
      this.quill.setSelection(range.index, 0, 'silent');
    }
  }

  // 设置内容
  setContents(options) {
    if (!this.quillReady) return {
      errMsg: 'setContents:fail not ready'
    };

    const {
      delta,
      html
    } = options;
    if (delta != null && typeof delta === 'object') {
      this.quill.setContents(delta, Quill.sources.SILENT);
    } else if (typeof html === 'string') {
      this.quill.setContents(this.html2delta(html), Quill.sources.SILENT);
    } else {
      return {
        errMsg: 'setContents:fail contents is missing'
      };
    }
    return {
      errMsg: 'setContents:ok'
    };
  }

  // 清空内容
  clear() {
    if (!this.quillReady) return {
      errMsg: 'clear:fail not ready'
    };

    this.quill.setContents([]);
    return {
      errMsg: 'clear:ok'
    };
  }

  // 移除格式
  removeFormat() {
    if (!this.quillReady) return {
      errMsg: 'removeFormat:fail not ready'
    };

    const range = this.quill.getSelection(true);
    const parchment = Quill.import('parchment');

    if (range.length) {
      // 移除选中区域的格式
      this.quill.removeFormat(range, Quill.sources.USER);
    } else {
      // 移除当前位置的行内格式
      Object.keys(this.quill.getFormat(range)).forEach(key => {
        if (parchment.query(key, parchment.Scope.INLINE)) {
          this.quill.format(key, false);
        }
      });
    }
    this.updateStatus(range);
    return {
      errMsg: 'removeFormat:ok'
    };
  }

  // 撤销
  undo() {
    if (!this.quillReady) return {
      errMsg: 'undo:fail not ready'
    };

    this.quill.history.undo();
    return {
      errMsg: 'undo:ok'
    };
  }

  // 重做
  redo() {
    if (!this.quillReady) return {
      errMsg: 'redo:fail not ready'
    };

    this.quill.history.redo();
    return {
      errMsg: 'redo:ok'
    };
  }

  // 失去焦点
  blur() {
    if (!this.quillReady) return {
      errMsg: 'blur:fail not ready'
    };

    this.quill.blur();
    return {
      errMsg: 'blur:ok'
    };
  }

  // 聚焦
  focus() {
    if (!this.quillReady) return {
      errMsg: 'focus:fail not ready'
    };

    this.quill.focus();
    return {
      errMsg: 'focus:ok'
    };
  }

  // 获取选中文本
  getSelectionText() {
    if (!this.quillReady) return {
      errMsg: 'getSelectionText:fail not ready',
      text: ''
    };

    const range = this.quill.selection.savedRange;
    let text = '';
    if (range && range.length !== 0) {
      text = this.quill.getText(range.index, range.length);
    }
    return {
      errMsg: 'getSelectionText:ok',
      text: text
    };
  }

  // 滚动到可视区域
  scrollIntoView() {
    if (!this.quillReady) return {
      errMsg: 'scrollIntoView:fail not ready'
    };

    this.quill.scrollIntoView();
    return {
      errMsg: 'scrollIntoView:ok'
    };
  }

  // 设置只读状态
  setReadOnly(readOnly) {
    if (!this.quillReady) return;

    this.quill.enable(!readOnly);
    if (readOnly) {
      this.quill.blur();
    }
  }
}

let editorInstance

// ==================== 全局方法（供原生 evalJS 调用）====================

/**
 * 初始化编辑器（可选，用于重新初始化）
 * @param {Object} options - 配置选项
 * @param {number} callbackId - 回调 ID
 */
window.editorInit = function (options, callbackId) {
  try {
    if (editorInstance) {
      console.warn('Editor already initialized');
    }
    editorInstance = new UniEditor(options || {});
    const result = {
      errMsg: 'editorInit:ok'
    };
    if (callbackId !== undefined) {
      triggerEvent('callback', {
        callbackId: callbackId,
        data: result
      });
    }
    return result;
  } catch (e) {
    const result = {
      errMsg: 'editorInit:fail ' + e.message
    };
    if (callbackId !== undefined) {
      triggerEvent('callback', {
        callbackId: callbackId,
        data: result
      });
    }
    return result;
  }
};

/**
 * 格式化文本
 * @param {Object} options - 格式化选项 { name, value }
 * @param {number} callbackId - 回调 ID
 */
window.editorFormat = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorFormat:fail not initialized'
    };
  } else {
    result = editorInstance.format(options || {});
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 插入分割线
 * @param {number} callbackId - 回调 ID
 */
window.editorInsertDivider = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorInsertDivider:fail not initialized'
    };
  } else {
    result = editorInstance.insertDivider();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 插入图片
 * @param {Object} options - 图片选项 { src, alt, width, height, extClass, data }
 * @param {number} callbackId - 回调 ID
 */
window.editorInsertImage = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorInsertImage:fail not initialized'
    };
  } else {
    result = editorInstance.insertImage(options || {});
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 插入文本
 * @param {Object} options - 文本选项 { text }
 * @param {number} callbackId - 回调 ID
 */
window.editorInsertText = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorInsertText:fail not initialized'
    };
  } else {
    result = editorInstance.insertText(options || {});
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 插入超链接
 * @param {Object} options - 链接选项 { text, href }
 * @param {number} callbackId - 回调 ID
 */
window.editorInsertLink = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorInsertLink:fail not initialized'
    };
  } else {
    result = editorInstance.insertLink(options || {});
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 插入提及
 * @param {{ id: number | string, name: string }} options - 文本选项
 * @param {number} callbackId - 回调 ID
 */
window.editorInsertMention = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorinsertMention:fail not initialized'
    };
  } else {
    result = editorInstance.insertMention(options || {});
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 设置内容
 * @param {Object} options - 内容选项 { delta, html }
 * @param {number} callbackId - 回调 ID
 */
window.editorSetContents = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorSetContents:fail not initialized'
    };
  } else {
    result = editorInstance.setContents(options || {});
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 获取内容
 * @param {number} callbackId - 回调 ID
 * @returns {Object} 包含 html, text, delta 的结果对象
 */
window.editorGetContents = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorGetContents:fail not initialized',
      html: '',
      text: '',
      delta: null
    };
  } else {
    const contents = editorInstance.getContents();
    result = Object.assign({
      errMsg: 'editorGetContents:ok'
    }, contents);
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 清空内容
 * @param {number} callbackId - 回调 ID
 */
window.editorClear = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorClear:fail not initialized'
    };
  } else {
    result = editorInstance.clear();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 移除格式
 * @param {number} callbackId - 回调 ID
 */
window.editorRemoveFormat = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorRemoveFormat:fail not initialized'
    };
  } else {
    result = editorInstance.removeFormat();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 撤销
 * @param {number} callbackId - 回调 ID
 */
window.editorUndo = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorUndo:fail not initialized'
    };
  } else {
    result = editorInstance.undo();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 重做
 * @param {number} callbackId - 回调 ID
 */
window.editorRedo = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorRedo:fail not initialized'
    };
  } else {
    result = editorInstance.redo();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 失去焦点
 * @param {number} callbackId - 回调 ID
 */
window.editorBlur = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorBlur:fail not initialized'
    };
  } else {
    result = editorInstance.blur();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 聚焦
 * @param {number} callbackId - 回调 ID
 */
window.editorFocus = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorFocus:fail not initialized'
    };
  } else {
    result = editorInstance.focus();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};


/**
 * 获取选中文本
 * @param {number} callbackId - 回调 ID
 * @returns {Object} 包含 text 的结果对象
 */
window.editorGetSelectionText = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorGetSelectionText:fail not initialized',
      text: ''
    };
  } else {
    result = editorInstance.getSelectionText();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 滚动到可视区域
 * @param {number} callbackId - 回调 ID
 */
window.editorScrollIntoView = function (callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorScrollIntoView:fail not initialized'
    };
  } else {
    result = editorInstance.scrollIntoView();
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 设置只读状态
 * @param {Object} options - 选项 { readOnly }
 * @param {number} callbackId - 回调 ID
 */
window.editorSetReadOnly = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorSetReadOnly:fail not initialized'
    };
  } else {
    const readOnly = options && options.readOnly !== undefined ? options.readOnly : false;
    editorInstance.setReadOnly(readOnly);
    result = {
      errMsg: 'editorSetReadOnly:ok'
    };
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 设置输入类型
 * @param {{type: "none" | ""}} options - 选项
 * @param {number} callbackId - 回调 ID
 */
window.editorSetType = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorSetType:fail not initialized'
    };
  } else {
    const type = options && options.type !== undefined ? options.type : '';
    editorInstance.setInputMode(type);
    result = {
      errMsg: 'editorSetType:ok'
    };
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};

/**
 * 设置 placeholder
 * @param {Object} options - 选项 { placeholder }
 * @param {number} callbackId - 回调 ID
 */
window.editorSetPlaceholder = function (options, callbackId) {
  let result;
  if (!editorInstance) {
    result = {
      errMsg: 'editorSetPlaceholder:fail not initialized'
    };
  } else {
    const placeholder = options && options.placeholder !== undefined ? options.placeholder : '';
    editorInstance.setPlaceHolder(placeholder);
    result = {
      errMsg: 'editorSetPlaceholder:ok'
    };
  }
  if (callbackId !== undefined) {
    triggerEvent('callback', {
      callbackId: callbackId,
      data: result
    });
  }
  return result;
};
