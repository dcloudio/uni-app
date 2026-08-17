/**
 * Quill 编辑器自定义格式注册
 * 从 uni-app 的 editor 组件迁移而来
 */

// ==================== 工具函数 ====================

/**
 * 将驼峰命名转换为短横线命名
 * @param {string} str - 驼峰命名字符串
 * @returns {string} 短横线命名字符串
 */
function kebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 获取真实路径（简化版，用于图片路径处理）
 * @param {string} url - 原始 URL
 * @returns {string} 处理后的 URL
 */
function getRealPath(url) {
  // 在标准 HTML 环境中，直接返回 URL
  // 如果需要特殊处理，可以在这里添加逻辑
  return url;
}

// ==================== 格式定义 ====================

/**
 * 分割线格式
 */
function divider(Quill) {
  const BlockEmbed = Quill.import('blots/block/embed');
  class Divider extends BlockEmbed {}
  Divider.blotName = 'divider';
  Divider.tagName = 'HR';
  return {
    'formats/divider': Divider
  };
}

/**
 * 下划线格式（ins 标签）
 */
function ins(Quill) {
  const Inline = Quill.import('blots/inline');
  class Ins extends Inline {}
  Ins.blotName = 'ins';
  Ins.tagName = 'INS';
  return {
    'formats/ins': Ins
  };
}

/**
 * 对齐格式
 */
function align(Quill) {
  const {
    Scope,
    Attributor
  } = Quill.import('parchment');
  const config = {
    scope: Scope.BLOCK,
    whitelist: ['left', 'right', 'center', 'justify']
  };
  const AlignStyle = new Attributor.Style('align', 'text-align', config);
  return {
    'formats/align': AlignStyle
  };
}

/**
 * 文本方向格式
 */
function direction(Quill) {
  const {
    Scope,
    Attributor
  } = Quill.import('parchment');
  const config = {
    scope: Scope.BLOCK,
    whitelist: ['rtl']
  };
  const DirectionStyle = new Attributor.Style('direction', 'direction', config);
  return {
    'formats/direction': DirectionStyle
  };
}

/**
 * 列表格式（支持复选框列表）
 */
function list(Quill) {
  const Parchment = Quill.import('parchment');
  const Container = Quill.import('blots/container');
  const ListItem = Quill.import('formats/list/item');

  class List extends Container {
    static create(value) {
      const tagName = value === 'ordered' ? 'OL' : 'UL';
      const node = super.create(tagName);
      if (value === 'checked' || value === 'unchecked') {
        node.setAttribute('data-checked', value === 'checked');
      }
      return node;
    }

    static formats(domNode) {
      if (domNode.tagName === 'OL') return 'ordered';
      if (domNode.tagName === 'UL') {
        if (domNode.hasAttribute('data-checked')) {
          return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
        } else {
          return 'bullet';
        }
      }
      return undefined;
    }

    constructor(domNode) {
      super(domNode);
      const listEventHandler = (e) => {
        if (e.target.parentNode !== domNode) return;
        const format = this.statics.formats(domNode);
        const blot = Parchment.find(e.target);
        if (format === 'checked') {
          blot.format('list', 'unchecked');
        } else if (format === 'unchecked') {
          blot.format('list', 'checked');
        }
      };

      domNode.addEventListener('click', listEventHandler);
    }

    format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }

    formats() {
      // We don't inherit from FormatBlot
      return {
        [this.statics.blotName]: this.statics.formats(this.domNode)
      };
    }

    insertBefore(blot, ref) {
      if (blot instanceof ListItem) {
        super.insertBefore(blot, ref);
      } else {
        const index = ref == null ? this.length() : ref.offset(this);
        const after = this.split(index);
        after.parent.insertBefore(blot, after);
      }
    }

    optimize(context) {
      super.optimize(context);
      const next = this.next;
      if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
        next.moveChildren(this);
        next.remove();
      }
    }

    replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        const item = Parchment.create(this.statics.defaultChild);
        target.moveChildren(item);
        this.appendChild(item);
      }
      super.replace(target);
    }
  }
  List.blotName = 'list';
  List.scope = Parchment.Scope.BLOCK_BLOT;
  List.tagName = ['OL', 'UL'];
  List.defaultChild = 'list-item';
  List.allowedChildren = [ListItem];

  return {
    'formats/list': List
  };
}

/**
 * 背景色格式
 */
function background(Quill) {
  const {
    Scope
  } = Quill.import('parchment');
  const BackgroundStyle = Quill.import('formats/background');
  const BackgroundColorStyle = new BackgroundStyle.constructor('backgroundColor', 'background-color', {
    scope: Scope.INLINE
  });
  return {
    'formats/backgroundColor': BackgroundColorStyle
  };
}

/**
 * 盒模型格式（margin 和 padding）
 */
function box(Quill) {
  const {
    Scope,
    Attributor
  } = Quill.import('parchment');
  const config = {
    scope: Scope.BLOCK
  };
  const margin = ['margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
  const padding = ['padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'];
  const result = {};
  margin.concat(padding).forEach(name => {
    result[`formats/${name}`] = new Attributor.Style(name, kebabCase(name), config);
  });

  return result;
}

/**
 * 字体格式
 */
function font(Quill) {
  const {
    Scope,
    Attributor
  } = Quill.import('parchment');
  const config = {
    scope: Scope.INLINE
  };
  const fontAttrs = ['font', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'fontFamily'];
  const result = {};
  fontAttrs.forEach(name => {
    result[`formats/${name}`] = new Attributor.Style(name, kebabCase(name), config);
  });

  return result;
}

/**
 * 文本格式
 */
function text(Quill) {
  const {
    Scope,
    Attributor
  } = Quill.import('parchment');
  const textAttrs = [{
    name: 'lineHeight',
    scope: Scope.BLOCK
  }, {
    name: 'letterSpacing',
    scope: Scope.INLINE
  }, {
    name: 'textDecoration',
    scope: Scope.INLINE
  }, {
    name: 'textIndent',
    scope: Scope.BLOCK
  }];
  const result = {};
  textAttrs.forEach(({
    name,
    scope
  }) => {
    result[`formats/${name}`] = new Attributor.Style(name, kebabCase(name), {
      scope
    });
  });

  return result;
}

/**
 * 图片格式（支持自定义属性）
 */
function image(Quill) {
  const Image = Quill.import('formats/image');
  const ATTRIBUTES = [
    'alt',
    'height',
    'width',
    'data-custom',
    'class',
    'data-local'
  ];

  // 自定义图片路径处理
  Image.sanitize = url => url ? getRealPath(url) : url;

  // 自定义图片格式读取
  Image.formats = function formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  };

  // 自定义图片格式设置
  const format = Image.prototype.format;
  Image.prototype.format = function(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      format.call(this, name, value);
    }
  };
}

/**
 * 链接格式（支持 file 协议）
 */
function link(Quill) {
  const Link = Quill.import('formats/link');
  Link.sanitize = url => {
    const anchor = document.createElement('a');
    anchor.href = url;
    const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
    return Link.PROTOCOL_WHITELIST.concat('file').indexOf(protocol) > -1 ? url : Link.SANITIZED_URL;
  };
}

/**
 * 提及格式（支持 @ 提及）
 */
const SupportStyleList = ['color', 'background', 'padding', 'radius']
const MentionStyleMap = {
  color: 'color',
  background: 'background',
  padding: 'padding',
  radius: 'border-radius'
}

function getMentionStyleValue(node, styleKey) {
  const cssName = MentionStyleMap[styleKey]
  if (!cssName) {
    return ''
  }
  return node.style.getPropertyValue(cssName).trim()
}

const isApple = /^Apple/.test(navigator.vendor)
const androidVersionMatch = navigator.userAgent.match(/Android\s(\d+)(?:\.\d+)?/i)
const isAndroid10OrBelow = androidVersionMatch ? parseInt(androidVersionMatch[1], 10) <= 10 : false
const shouldKeepMentionEditable = isApple || isAndroid10OrBelow

function mention(Quill) {
  const Embed = Quill.import('blots/embed');
  class MentionBlot extends Embed {
    static create(data) {
      const node = super.create();

      const id = data.id == null ? '' : data.id;
      const name = data.name == null ? '' : data.name;

      if (!shouldKeepMentionEditable) {
        node.setAttribute('contenteditable', 'false')
      }
      node.setAttribute('data-id', id);
      node.setAttribute('data-name', name);

      let style = ''

      if (shouldKeepMentionEditable) {
        style += '-webkit-user-select: none;'
      }

      SupportStyleList.forEach(item => {
        const styleName = MentionStyleMap[item] || item
        if (data[item]) {
          style += `${kebabCase(styleName)}: ${data[item]};`
        }
      })

      if (style) {
        node.setAttribute('style', style);
      }

      // TODO 是否需要 @ 符号
      node.innerText = `@${name}`;
      return node;
    }

    static value(node) {
      const value = {
        id: node.dataset.id == null ? '' : node.dataset.id,
        name: node.dataset.name == null ? '' : node.dataset.name,
      };

      SupportStyleList.forEach(item => {
        const styleValue = getMentionStyleValue(node, item)
        if (styleValue) {
          value[item] = styleValue
        }
      })

      return value;
    }
  }

  MentionBlot.blotName = 'mention';
  MentionBlot.tagName = 'span';
  MentionBlot.className = 'mention';

  return {
    'formats/mention': MentionBlot
  };
}

// ==================== 注册所有格式 ====================

/**
 * 注册所有自定义格式到 Quill
 * @param {Object} Quill - Quill 实例
 */
function register(Quill) {
  const formats = {
    divider,
    ins,
    align,
    direction,
    list,
    background,
    box,
    font,
    text,
    image,
    link,
    mention
  };

  const options = {};
  Object.values(formats).forEach(value => {
    const result = value(Quill);
    if (result) {
      Object.assign(options, result);
    }
  });

  Quill.register(options, true);
}

// 导出注册函数
window.registerQuillFormats = register;
