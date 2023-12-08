'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deindent = _interopDefault(require('de-indent'));
var he = _interopDefault(require('he'));

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}





/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}



/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */


/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */


/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});



/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */


/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */


/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */




/**
 * Ensure a function is called only once.
 */

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var splitRE = /\r?\n/g;
var replaceRE = /./g;
var isSpecialTag = makeMap('script,style,template', true);



/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 */
function parseComponent (
  content,
  options
) {
  if ( options === void 0 ) options = {};

  var sfc = {
    template: null,
    script: null,
    styles: [],
    customBlocks: []
  };
  var depth = 0;
  var currentBlock = null;

  function start (
    tag,
    attrs,
    unary,
    start,
    end
  ) {
    if (depth === 0) {
      currentBlock = {
        type: tag,
        content: '',
        start: end,
        attrs: attrs.reduce(function (cumulated, ref) {
          var name = ref.name;
          var value = ref.value;

          cumulated[name] = value || true;
          return cumulated
        }, {})
      };
      if (isSpecialTag(tag)) {
        checkAttrs(currentBlock, attrs);
        if (tag === 'style') {
          sfc.styles.push(currentBlock);
        } else {
          sfc[tag] = currentBlock;
        }
      } else { // custom blocks
        sfc.customBlocks.push(currentBlock);
      }
    }
    if (!unary) {
      depth++;
    }
  }

  function checkAttrs (block, attrs) {
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (attr.name === 'lang') {
        block.lang = attr.value;
      }
      if (attr.name === 'scoped') {
        block.scoped = true;
      }
      if (attr.name === 'module') {
        block.module = attr.value || true;
      }
      if (attr.name === 'src') {
        block.src = attr.value;
      }
    }
  }

  function end (tag, start, end) {
    if (depth === 1 && currentBlock) {
      currentBlock.end = start;
      var text = deindent(content.slice(currentBlock.start, currentBlock.end));
      // pad content so that linters and pre-processors can output correct
      // line numbers in errors and warnings
      if (currentBlock.type !== 'template' && options.pad) {
        text = padContent(currentBlock, options.pad) + text;
      }
      currentBlock.content = text;
      currentBlock = null;
    }
    depth--;
  }

  function padContent (block, pad) {
    if (pad === 'space') {
      return content.slice(0, block.start).replace(replaceRE, ' ')
    } else {
      var offset = content.slice(0, block.start).split(splitRE).length;
      var padChar = block.type === 'script' && !block.lang
        ? '//\n'
        : '\n';
      return Array(offset).join(padChar)
    }
  }

  parseHTML(content, {
    start: start,
    end: end
  });

  return sfc
}

/*  */

/**
 * Check if a string starts with $ or _
 */


/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;


if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */

      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.

} else {
  // a non-standard Set polyfill that only works with primitive keys.

}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );





// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;



/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */


/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};



function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */

/*  */

/*  */

/*  */
/* globals MessageChannel */

var callbacks = [];
function flushCallbacks () {
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  channel.port1.onmessage = flushCallbacks;

} else {
  /* istanbul ignore next */

}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {

} else {
  // fallback to macro

}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */

/*  */

/*  */



// function mergeClassData (child: VNodeData, parent: VNodeData): {
//   staticClass: string,
//   class: any
// } {
//   return {
//     staticClass: concat(child.staticClass, parent.staticClass),
//     class: isDef(child.class)
//       ? [child.class, parent.class]
//       : parent.class
//   }
// }

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     [options] 如果想忽略开始边界上的调用，传入{leading: false}。
 * @param  {boolean}    [options.leading=true] 如果想忽略开始边界上的调用，传入{leading: false}。
 * @param  {number|boolean}    [options.leadingDelay=false] 开始边界上的调用延时，传入{leadingDelay: 0}。
 * @param  {boolean}    [options.trailing=true] 如果想忽略结尾边界上的调用，传入{trailing: false}
 *
 * @return {Function}
 *
 * @example
 * const throttleCallback = throttle(callback, 100);
 *
 */

var ROOT_DATA_VAR = '$root';
var HOLDER_VAR = 'h';
var FOR_TAIL_VAR = '_t';

var VM_ID_PREFIX = 'cp';





var LIST_TAIL_SEPS = {
  swan: '_',
  wechat: '-',
  alipay: '-',
  tt:'-'//fixed by xxxxxx
};


var HOLDER_TYPE_VARS = {
  text: 't',
  vtext: 'vt',
  if: '_if',
  for: 'li',
  class: 'cl',
  rootClass: 'rcl',
  style: 'st',
  value: 'value',
  vhtml: 'html',
  vshow: 'vs',
  slot: 'slot'
};

var notEmpty = function (e) { return !!e; };
var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag$1 = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag$1 = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)


function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || /* istanbul ignore next */ baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object


/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

var modules = [
  klass,
  style
]

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index = val.lastIndexOf('.');
    if (index > -1) {
      return {
        exp: val.slice(0, index),
        key: '"' + val.slice(index + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index)
}

function eof () {
  return index >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';


function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  // const type = el.attrsMap.type

  // input.type === 'file' not supported
  // if (process.env.NODE_ENV !== 'production') {
  //   // inputs with type="file" are read only and setting the input's
  //   // value will throw an error.
  //   if (tag === 'input' && type === 'file') {
  //     warn(
  //       `<${el.tag} v-model="${value}" type="file">:\n` +
  //       `File inputs are read only. Use a v-on:change listener instead.`
  //     )
  //   }
  // }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  // } else if (tag === 'select') {
  //   genSelect(el, value, modifiers)
  // } else if (tag === 'input' && type === 'checkbox') {
  //   genCheckboxModel(el, value, modifiers)
  // } else if (tag === 'input' && type === 'radio') {
  //   genRadioModel(el, value, modifiers)
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

// function genCheckboxModel (
//   el: ASTElement,
//   value: string,
//   modifiers: ?ASTModifiers
// ) {
//   const number = modifiers && modifiers.number
//   const valueBinding = getBindingAttr(el, 'value') || 'null'
//   const trueValueBinding = getBindingAttr(el, 'true-value') || 'true'
//   const falseValueBinding = getBindingAttr(el, 'false-value') || 'false'
//   addProp(el, 'checked',
//     `Array.isArray(${value})` +
//     `?_i(${value},${valueBinding})>-1` + (
//       trueValueBinding === 'true'
//         ? `:(${value})`
//         : `:_q(${value},${trueValueBinding})`
//     )
//   )
//   addHandler(el, 'change',
//     `var $$a=${value},` +
//         '$$el=$event.target,' +
//         `$$c=$$el.checked?(${trueValueBinding}):(${falseValueBinding});` +
//     'if(Array.isArray($$a)){' +
//       `var $$v=${number ? '_n(' + valueBinding + ')' : valueBinding},` +
//           '$$i=_i($$a,$$v);' +
//       `if($$el.checked){$$i<0&&(${genAssignmentCode(value, '$$a.concat([$$v])')})}` +
//       `else{$$i>-1&&(${genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')})}` +
//     `}else{${genAssignmentCode(value, '$$c')}}`,
//     null, true
//   )
// }

// function genRadioModel (
//   el: ASTElement,
//   value: string,
//   modifiers: ?ASTModifiers
// ) {
//   const number = modifiers && modifiers.number
//   let valueBinding = getBindingAttr(el, 'value') || 'null'
//   valueBinding = number ? `_n(${valueBinding})` : valueBinding
//   addProp(el, 'checked', `_q(${value},${valueBinding})`)
//   addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true)
// }

// function genSelect (
//   el: ASTElement,
//   value: string,
//   modifiers: ?ASTModifiers
// ) {
//   const number = modifiers && modifiers.number
//   const selectedVal = `Array.prototype.filter` +
//     `.call($event.target.options,function(o){return o.selected})` +
//     `.map(function(o){var val = "_value" in o ? o._value : o.value;` +
//     `return ${number ? '_n(val)' : 'val'}})`

//   const assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]'
//   let code = `var $$selectedVal = ${selectedVal};`
//   code = `${code} ${genAssignmentCode(value, assignment)}`
//   addHandler(el, 'change', code, null, true)
// }

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  // input.type=range not supported
  var event = lazy
    ? 'change'
    : type === 'range'
    /* istanbul ignore next */ ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives = {
  model: model,
  text: text,
  html: html
}

/*  */

var isUnaryTag$2 = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag$2 = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag$1 = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

var removeQuotes = function (t) {
  if ( t === void 0 ) t = '';

  return t.replace(/"/g, '');
};

function cloneAST (ast) {
  var walked = [];
  var newAst = doClone(ast);
  return newAst
  function doClone (old) {
    var walkedVal = walked.find(function (v) { return v.old === old; });
    if (walkedVal) {
      return walkedVal._new
    }
    if (typeof old === 'object') {
      var _new = Array.isArray(old) ? [] : {};
      walked.push({ _new: _new, old: old });
      for (var key in old) {
        var newVal = doClone(old[key]);
        _new[key] = newVal;
      }
      return _new
    } else {
      return old
    }
  }
}

var Stack = function Stack () {
  this.stack = [];
};

var prototypeAccessors$1 = { top: { configurable: true } };
Stack.prototype.push = function push (data) {
  return this.stack.push(data)
};
Stack.prototype.pop = function pop () {
  return this.stack.pop()
};
prototypeAccessors$1.top.get = function () {
  return this.stack[this.stack.length - 1] || null
};

Object.defineProperties( Stack.prototype, prototypeAccessors$1 );

var createUidFn = function (prefix) {
  if ( prefix === void 0 ) prefix = '';

  var id = 0;
  return function () {
    return ("" + prefix + (id++))
  }
};

var uid$1 = createUidFn();

var escapeText = function (str) {
  if ( str === void 0 ) str = '';

  return str.replace(/\</g, "{{\"<\"}}")
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules,
  directives: directives,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag$2,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag$2,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules)
};

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();//fixed by xxxxxx 修复 v-for="(item ,index) in items"带空格导致的编译错误
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  // stop: '$event.stopPropagation();',
  // prevent: '$event.preventDefault();',
  // self: genGuard(`$event.target !== $event.currentTarget`),
  self: genGuard("$event.target.dataset.hid !== $event.currentTarget.dataset.hid")
  // ctrl: genGuard(`!$event.ctrlKey`),
  // shift: genGuard(`!$event.shiftKey`),
  // alt: genGuard(`!$event.altKey`),
  // meta: genGuard(`!$event.metaKey`),
  // left: genGuard(`'button' in $event && $event.button !== 0`),
  // middle: genGuard(`'button' in $event && $event.button !== 1`),
  // right: genGuard(`'button' in $event && $event.button !== 2`)
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? /* istanbul ignore next */ 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  /* istanbul ignore if */
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore next */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        /* istanbul ignore if */
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else /* istanbul ignore next */ if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore next */
    return ("function($event){" + code + handlerCode + "}")
  }
}

/* istanbul ignore next */
function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

/* istanbul ignore next */
function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
    /* istanbul ignore if */
  } else if (el.once && !el.onceProcessed) {
    /* istanbul ignore next */
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    /* istanbul ignore if */
    if (el.component) {
      /* istanbul ignore next */
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    /* istanbul ignore next */
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
/* istanbul ignore next */
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }
  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }
  var _forId = el._forId;
  var _fid = el._fid;

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "var _fid = " + _fid + ";" +
      "return " + ((altGen || genElement)(el, state)) +
    "}," + _forId + ",_self)"
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) { data += "key:" + (el.key) + ","; }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  // not supported
  /* istanbul ignore if */
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }

  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  /* istanbul ignore if */
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

/* istanbul ignore next */
function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).filter(function (c) { return c; }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    // TODO: a better normalization mode without text node combination
    // it was 2 full normalizatiom before
    // but it will combine two adjacent text node which will cause hid and context infomation lost
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      // res = 2
      res = 1;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.mpNotGenRenderFn) {
    return ''
  } else if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    /* istanbul ignore next */
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  /* istanbul ignore next */
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
/* istanbul ignore next */
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

var TAG_MAP = {
  'template': 'block',
  'br': 'view',
  'hr': 'view',

  'p': 'view',
  'h1': 'view',
  'h2': 'view',
  'h3': 'view',
  'h4': 'view',
  'h5': 'view',
  'h6': 'view',
  'abbr': 'view',
  'address': 'view',
  'b': 'view',
  'bdi': 'view',
  'bdo': 'view',
  'blockquote': 'view',
  'cite': 'view',
  'code': 'view',
  'del': 'view',
  'ins': 'view',
  'dfn': 'view',
  'em': 'view',
  'strong': 'view',
  'samp': 'view',
  'kbd': 'view',
  'var': 'view',
  'i': 'view',
  'mark': 'view',
  'pre': 'view',
  'q': 'view',
  'ruby': 'view',
  'rp': 'view',
  'rt': 'view',
  's': 'view',
  'small': 'view',
  'sub': 'view',
  'sup': 'view',
  'time': 'view',
  'u': 'view',
  'wbr': 'view',

  // 表单元素
  'form': 'form',
  'input': 'input',
  'textarea': 'textarea',
  'button': 'button',
  'select': 'picker',
  'option': 'view',
  'optgroup': 'view',
  'label': 'label',
  'fieldset': 'view',
  'datalist': 'picker',
  'legend': 'view',
  'output': 'view',

  // 框架
  'iframe': 'view',
  // 图像
  'img': 'image',
  'canvas': 'canvas',
  'figure': 'view',
  'figcaption': 'view',

  // 音视频
  'audio': 'audio',
  'source': 'audio',
  'video': 'video',
  'track': 'video',
  // 链接
  'a': 'navigator',
  'nav': 'view',
  'link': 'navigator',
  // 列表
  'ul': 'view',
  'ol': 'view',
  'li': 'view',
  'dl': 'view',
  'dt': 'view',
  'dd': 'view',
  'menu': 'view',
  'command': 'view',

  // 表格table
  'table': 'view',
  'caption': 'view',
  'th': 'view',
  'td': 'view',
  'tr': 'view',
  'thead': 'view',
  'tbody': 'view',
  'tfoot': 'view',
  'col': 'view',
  'colgroup': 'view',

  // 样式 节
  'div': 'view',
  'main': 'view',
  'span': 'label',
  'header': 'view',
  'footer': 'view',
  'section': 'view',
  'article': 'view',
  'aside': 'view',
  'details': 'view',
  'dialog': 'view',
  'summary': 'view',

  'progress': 'progress',
  'meter': 'progress',
  'head': 'view',
  'meta': 'view',
  'base': 'text',
  'area': 'navigator',

  'script': 'view',
  'noscript': 'view',
  'embed': 'view',
  'object': 'view',
  'param': 'view',

  'view': 'view',
  'scroll-view': 'scroll-view',
  'swiper': 'swiper',
  'swiper-item': 'swiper-item',
  'rich-text': 'rich-text',
  'movable-view': 'movable-view',
  'cover-view': 'cover-view',
  'icon': 'icon',
  'text': 'text',
  'checkbox': 'checkbox',
  'checkbox-group': 'checkbox-group',
  'radio': 'radio',
  'radio-group': 'radio-group',
  'picker': 'picker',
  'picker-view': 'picker-view',
  'slider': 'slider',
  'switch': 'switch',
  'navigator': 'navigator',
  'image': 'image',
  'map': 'map',
  'contact-button': 'contact-button',
  'block': 'block',
  'live-player': 'live-player',
  'live-pusher': 'live-pusher',
  'web-view': 'web-view',
  'open-data': 'open-data',
  'official-account': 'official-account'
}

function createFindEventTypeFn (eventTypeMap) {
  return function findEventType (type) {
    var res = '';
    Object.keys(eventTypeMap)
      .some(function (mpType) {
        if (eventTypeMap[ mpType ].indexOf(type) > -1) {
          res = mpType;
          return true
        }
      });
    return res
  }
}

function mergePreset (presetA, presetB) {
  var res = Object.assign({}, presetA, presetB);
  var aVisitors = presetA.visitors || {};
  var bVisitors = presetB.visitors || {};
  var mergeVisitors = Object.assign({}, aVisitors, bVisitors);
  Object.assign(res, {
    visitors: mergeVisitors
  });

  return res
}

function alterAttrName (el, oldName, newName) {
  var attrsMap = el.attrsMap; if ( attrsMap === void 0 ) attrsMap = {};
  var attrsList = el.attrsList; if ( attrsList === void 0 ) attrsList = [];
  var attrs = el.attrs; if ( attrs === void 0 ) attrs = [];
  var index = -1;

  attrs.some(function (attr, i) {
    if (attr.name === oldName) {
      index = i;
      return true
    }
  });

  if (index > -1) {
    var rawOldName = attrsList[index].name;
    var rawNewName = rawOldName.replace(oldName, newName);
    attrs[index].name = newName;
    attrsList[index].name = rawNewName;

    var mapValue = attrsMap[rawOldName];
    delete attrsMap[rawOldName];
    attrsMap[rawNewName] = mapValue;
  }
}

var basePrest = {
  visitors: {
    a: function a (el) {
      alterAttrName(el, 'href', 'url');
    }
  }
};

var prefix = "wx:";

var eventTypeMap$1 = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

var findEventType = createFindEventTypeFn(eventTypeMap$1);

var wechat = mergePreset(basePrest, {
  prefix: prefix,
  ext: "wxml",
  directives: {
    if: (prefix + "if"),
    elseif: (prefix + "elif"),
    else: (prefix + "else"),
    for: (prefix + "for"),
    forItem: (prefix + "for-item"),
    forIndex: (prefix + "for-index"),
    forKey: (prefix + "key"),
    on: "bind",
    onStop: "catch",
    capture: "capture"
  },
  eventTypeMap: eventTypeMap$1,
  findEventType: findEventType,
  genBind: function genBind (event, type, tag) {
    var modifiers = event.modifiers; if ( modifiers === void 0 ) modifiers = {};
    var isCapture = /!/.test(type);
    var realType = type.replace(/^[~|!]/, '');
    var stop = modifiers.stop;
    var mpType = realType;
    var binder = stop ? 'catch' : 'bind';
    binder = isCapture ? ("capture-" + binder) : binder;

    if (type === 'change' && (tag === 'input' || tag === 'textarea')) {
      mpType = 'blur';
    } else {
      mpType = mpType === 'click' ? 'tap' : mpType;
    }
    return ("" + binder + mpType)
  }
})

//fixed by xxxxxx
var prefix$3 = 'tt:';
var tt = mergePreset(basePrest, {
  prefix: prefix$3,
  ext: "wxml",
  directives: {
    if: (prefix$3 + "if"),
    elseif: (prefix$3 + "elif"),
    else: (prefix$3 + "else"),
    for: (prefix$3 + "for"),
    forItem: (prefix$3 + "for-item"),
    forIndex: (prefix$3 + "for-index"),
    forKey: (prefix$3 + "key"),
    on: "bind",
    onStop: "catch",
    capture: "capture"
  },
  eventTypeMap: eventTypeMap$1,
  findEventType: findEventType,
  genBind: function genBind (event, type, tag) {
    var modifiers = event.modifiers; if ( modifiers === void 0 ) modifiers = {};
    var isCapture = /!/.test(type);
    var realType = type.replace(/^[~|!]/, '');
    var stop = modifiers.stop;
    var mpType = realType;
    var binder = stop ? 'catch' : 'bind';
    binder = isCapture ? ("capture-" + binder) : binder;

    if (type === 'change' && (tag === 'input' || tag === 'textarea')) {
      mpType = 'blur';
    } else {
      mpType = mpType === 'click' ? 'tap' : mpType;
    }
    return ("" + binder + mpType)
  }
})

var prefix$1 = "a:";

var eventTypeMap$2 = {
  Tap: ['tap', 'click'],
  TouchStart: ['touchstart'],
  TouchMove: ['touchmove'],
  TouchCancel: ['touchcancel'],
  TouchEnd: ['touchend'],
  LongTap: ['longtap'],
  Input: ['input'],
  Change: ['change'],
  Changing: ['changing'],
  Blur: ['change', 'blur'],
  Clear: ['clear'],
  Submit: ['submit'],
  Focus: ['focus'],
  ScrollToUpper: ['scrolltoupper'],
  ScrollToLower: ['scrolltolower'],
  Scroll: ['scroll'],
  TransitionEnd: ['transitionend'],
  AnimationStart: ['animationstart'],
  AnimationIteration: ['animationiteration'],
  AnimationEnd: ['animationend'],
  Appear: ['appear'],
  Disappear: ['disappear'],
  FirstAppear: ['firstappear'],
  Reset: ['reset'],
  Confirm: ['confirm'],
  Load: ['load'],
  Error: ['error'],
  MarkerTap: ['markertap'],
  CalloutTap: ['callouttap'],
  ControlTap: ['controltap'],
  RegionChange: ['regionchange'],
  Messag: ['message'],
  PlusClick: ['plusclick'],
  TabClick: ['tabclick'],
  CardClick: ['cardclick'],
  GridItemClick: ['griditemclick'],
  ModalClick: ['modalclick'],
  ModalClose: ['modalclose'],
  TapMain: ['tapmain'],
  TapSub: ['tapsub'],
  CloseTap: ['closetap'],
  ButtonClick: ['buttonclick'],
  RightItemClick: ['rightitemclick'],
  Select: ['select'],
  MonthChange: ['monthchange']
};

var findEventType$1 = createFindEventTypeFn(eventTypeMap$2);

var alipay = mergePreset(basePrest, {
  prefix: prefix$1,
  ext: "axml",
  directives: {
    if: (prefix$1 + "if"),
    elseif: (prefix$1 + "elif"),
    else: (prefix$1 + "else"),
    for: (prefix$1 + "for"),
    forItem: (prefix$1 + "for-item"),
    forIndex: (prefix$1 + "for-index"),
    forKey: (prefix$1 + "key"),
    on: "bind",
    onStop: "catch",
    capture: "capture"
  },
  eventTypeMap: eventTypeMap$2,
  findEventType: findEventType$1,
  genBind: function genBind (event, type, tag) {
    var modifiers = event.modifiers; if ( modifiers === void 0 ) modifiers = {};
    // const isCapture = /!/.test(type)
    var realType = type.replace(/^[~|!]/, '');
    var stop = modifiers.stop;
    var mpType = findEventType$1(realType) || realType;
    var binder = stop ? 'catch' : 'on';

    // capture is not supported yet in alipay
    // binder = isCapture ? `capture-${binder}` : binder

    if (type === 'change' && (tag === 'input' || tag === 'textarea')) {
      mpType = 'blur';
    }

    return ("" + binder + (capitalize(mpType)))
  }
})

var prefix$2 = "s-";

var eventTypeMap$3 = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

var findEventType$2 = createFindEventTypeFn(eventTypeMap$3);

var swan$1 = mergePreset(basePrest, {
  prefix: prefix$2,
  ext: "swan",
  directives: {
    if: (prefix$2 + "if"),
    elseif: (prefix$2 + "elif"),
    else: (prefix$2 + "else"),
    for: (prefix$2 + "for"),
    forItem: (prefix$2 + "for-item"),
    forIndex: (prefix$2 + "for-index"),
    forKey: (prefix$2 + "key"),
    on: "bind",
    onStop: "catch",
    capture: "capture"
  },
  eventTypeMap: eventTypeMap$3,
  findEventType: findEventType$2,
  genBind: function genBind (event, type, tag) {
    var modifiers = event.modifiers; if ( modifiers === void 0 ) modifiers = {};
    var isCapture = /!/.test(type);
    var realType = type.replace(/^[~|!]/, '');
    var stop = modifiers.stop;
    var mpType = realType;
    var binder = stop ? 'catch' : 'bind';
    binder = isCapture ? ("capture-" + binder) : binder;

    if (type === 'change' && (tag === 'input' || tag === 'textarea')) {
      mpType = 'blur';
    } else {
      mpType = mpType === 'click' ? 'tap' : mpType;
    }
    return ("" + binder + mpType)
  },
  visitors: {
    all: function all (el) {
      if (el.tag === 'input') {
        el.isSelfCloseTag = true;
      }
    }
  }
})

var ks = mergePreset(basePrest, {
  prefix: prefix,
  ext: "ksml",
  directives: {
    if: (prefix + "if"),
    elseif: (prefix + "elif"),
    else: (prefix + "else"),
    for: (prefix + "for"),
    forItem: (prefix + "for-item"),
    forIndex: (prefix + "for-index"),
    forKey: (prefix + "key"),
    on: "bind",
    onStop: "catch",
    capture: "capture"
  },
  eventTypeMap: eventTypeMap$1,
  findEventType: findEventType,
  genBind: function genBind (event, type, tag) {
    var modifiers = event.modifiers; if ( modifiers === void 0 ) modifiers = {};
    var isCapture = /!/.test(type);
    var realType = type.replace(/^[~|!]/, '');
    var stop = modifiers.stop;
    var mpType = realType;
    var binder = stop ? 'catch' : 'bind';
    binder = isCapture ? ("capture-" + binder) : binder;

    if (type === 'change' && (tag === 'input' || tag === 'textarea')) {
      mpType = 'blur';
    } else {
      mpType = mpType === 'click' ? 'tap' : mpType;
    }
    return ("" + binder + mpType)
  }
})

var presets = {
  wechat: wechat,
  alipay: alipay,
  swan: swan$1,
  tt: tt, //fixed by xxxxxx
  ks: ks
}

var vbindReg = /^(v-bind:?|:)/;
var iteratorUid = createUidFn('item');

var TYPE = {
  ELEMENT: 1,
  TEXT: 2,
  STATIC_TEXT: 3
};

var sep = "'" + (LIST_TAIL_SEPS.wechat) + "'";

// walk and modify ast before render function is generated
function mpify (node, options) {
  var target = options.target; if ( target === void 0 ) target = 'wechat';
  sep = LIST_TAIL_SEPS[target] ? ("'" + (LIST_TAIL_SEPS[target]) + "'") : sep;
  var preset = presets[target];
  var state = new State({
    rootNode: node,
    target: target,
    preset: preset
  });
  walk(node, state);
}

function visit (el, state) {
  var ref = state.preset;
  var visitors = ref.visitors; if ( visitors === void 0 ) visitors = {};

  if (visitors.all) {
    visitors.all(el);
  }

  if (visitors[el.tag]) {
    visitors[el.tag](el);
  }
}

function walk (node, state) {
  visit(node, state);

  if (node.for && !node.mpForWalked) {
    return walkFor(node, state)
  }

  state.resolveHolder(node);

  if (node.ifConditions && !node.mpIfWalked) {
    return walkIf(node, state)
  }

  /* istanbul ignore else */
  if (node.type === TYPE.ELEMENT) {
    walkElem(node, state);
  } else if (
    node.type === TYPE.TEXT || node.type === TYPE.STATIC_TEXT
  ) {
    walkText(node, state);
  }
}

function walkFor (node, state) {
  var _for = node.for;
  var key = node.key;
  var alias = node.alias;
  var prefix = /{/.test(alias) ? ("" + (iteratorUid())) : alias;
  // create default iterator1, iterator2 for xml listing,
  // which is needed for _hid generating
  var iterator1 = node.iterator1; if ( iterator1 === void 0 ) iterator1 = prefix + "_i1";
  var iterator2 = node.iterator2; if ( iterator2 === void 0 ) iterator2 = prefix + "_i2";
  Object.assign(node, {
    mpForWalked: true,
    iterator1: iterator1,
    iterator2: iterator2
  });

  state.pushListState({
    iterator1: iterator1,
    iterator2: iterator2,
    _for: _for,
    key: key,
    node: node,
    alias: alias
  });

  state.resolveHolder(node);
  state.resolveForHolder(node);

  walk(node, state);

  state.popListState();
}

function walkElem (node, state) {
  processAttrs$1(node);
  if (node.key) {
    var key = node.key.replace(/^\w*\./, '');
    addAttr$1(node, '_fk', ("\"" + key + "\""));
  }

  if (!isTag(node)) {
    return walkComponent(node, state)
  }

  walkChildren(node, state);
}

function walkComponent (node, state) {
  // generate _cid first
  var _cid = state.getCId();

  // enter a component
  state.pushComp();

  Object.assign(node, { _cid: _cid });
  addAttr$1(node, '_cid', _cid);

  walkChildren(node, state);
  state.popComp();
}

function walkText (node, state) {
  var expression = node.expression;
  var type = node.type;
  var _hid = node._hid;
  var _fid = node._fid;
  if (type === TYPE.STATIC_TEXT) {
    node.mpNotGenRenderFn = true;
  } else if (_fid) {
    node.expression = expression + "," + _hid + ",_fid";
  } else {
    node.expression = expression + "," + _hid;
  }
}

function walkIf (node, state) {
  var conditions = node.ifConditions;

  node.mpIfWalked = true;

  conditions.forEach(function (condition) {
    var block = condition.block;
    var exp = condition.exp;

    walk(block, state);

    if (exp) {
      condition.rawexp = exp;
      if (block._fid) {
        condition.exp = "_ri(!!(" + exp + "), " + (block._hid) + ", " + (block._fid) + ")";
      } else {
        condition.exp = "_ri(!!(" + exp + "), " + (block._hid) + ")";
      }
    }
  });
}

function walkChildren (node, state) {
  var children = node.children;
  var scopedSlots = node.scopedSlots;
  if (children && children.length) {
    children.forEach(function (n) {
      walk(n, state);
    });
  }

  if (scopedSlots) {
    Object.keys(scopedSlots).forEach(function (k) {
      var slot = scopedSlots[k];
      walk(slot, state);
    });
  }
}

function processAttrs$1 (node) {
  var attrsList = node.attrsList; if ( attrsList === void 0 ) attrsList = [];
  var attrs = node.attrs; if ( attrs === void 0 ) attrs = [];
  var attrsMap = node.attrsMap; if ( attrsMap === void 0 ) attrsMap = {};
  var bindingAttrs = [];

  attrsList.forEach(function (attr, i) {
    if (!vbindReg.test(attr.name)) {
      // set default true, <div enable></div> -> <div enable="true"></div>
      if (attr.value === '') {
        attr.value = 'true';
        //fixed by xxxxxx
        // attrs[i].value = '"true"';
        var findAttr = attrs.find(function(findAttr){
          return findAttr.name === attr.name
        })
        if(findAttr){
          findAttr.value = '"true"'
        }
        attrsMap[attr.name] = 'true';
      }
    } else {
      // collect dynamic attrs, only update daynamic attrs in runtime
      var realName = attr.name.replace(vbindReg, '') || 'value';
      bindingAttrs.push(realName);
    }
  });

  if (bindingAttrs.length) {
    addAttr$1(node, '_batrs', ("\"" + (bindingAttrs.join(',')) + "\""));
  }
}

function addAttr$1 (node, name, value) {
  // generate attr code when plain is false
  node.plain = false;
  var attrs = node.attrs; if ( attrs === void 0 ) attrs = [];
  var attrsMap = node.attrsMap; if ( attrsMap === void 0 ) attrsMap = {};
  var attr = attrs.filter(function (attr) { return attr.name === name; })[0];
  var attrIndex = attrs.indexOf(attr);
  /* istanbul ignore next */
  attrIndex = attrIndex !== -1 ? attrIndex : attrs.length;
  attrs[attrIndex] = {
    name: name,
    value: ("" + value)
  };
  attrsMap[name] = "" + value;

  Object.assign(node, { attrs: attrs, attrsMap: attrsMap });

}

function isTag (node) {
  return !!TAG_MAP[node.tag] || node.tag === 'template'
}

var State = function State (options) {
  if ( options === void 0 ) options = {};

  this.rootNode = options.rootNode;
  this.compCount = -1;
  this.elemCount = -1;
  this.compStack = new Stack();
  this.sep = options.sep || '-';
  this.preset = options.preset;
  this.listStates = new Stack();
  // this.listStates = new Stack()
  // init a root component state, like page
  this.pushComp();
};
State.prototype.pushComp = function pushComp () {
  this.compStack.push({
    id: ++this.compCount,
    elems: 0
    // listStates: new Stack()
  });
};
State.prototype.popComp = function popComp () {
  this.compStack.pop();
};
State.prototype.pushElem = function pushElem () {
  this.elemCount++;
};
State.prototype.popListState = function popListState () {
  return this.listStates.pop()
};
State.prototype.pushListState = function pushListState (state) {
  var currentStates = this.listStates.top;
  var newStates = [];
  if (currentStates && currentStates.length) {
    newStates = [].concat(currentStates);
  }

  newStates.push(state);
  this.listStates.push(newStates);
};
State.prototype.getCurrentComp = function getCurrentComp () {
  return this.compStack.top
};
State.prototype.getCurrentCompIndex = function getCurrentCompIndex () {
  return ("" + (this.compCount))
};
State.prototype.getCurrentElemIndex = function getCurrentElemIndex () {
  return this.elemCount
};
State.prototype.getCurrentListState = function getCurrentListState () {
  return this.listStates.top
};
State.prototype.getCurrentListNode = function getCurrentListNode () {
  var top = this.listStates.top || [];
  return (top[top.length - 1] || {}).node
};
State.prototype.getHId = function getHId (node) {
  this.pushElem();
  var _hid = "" + (this.getCurrentElemIndex() + this.getCurrentCompIndex() * 1000);//TODO fixed by xxxxxx 减少 _hid 冲突几率 （主要体现为自定义组件与 slot 结合使用）
  return ("" + _hid)
};
State.prototype.getCId = function getCId (node) {
  this.pushElem();
  var _cid = "" + (this.getCurrentCompIndex());
  return ("" + _cid)
};
State.prototype.getFid = function getFid (node) {
  var currentListState = this.getCurrentListState() || [];
  var _fid = currentListState.map(function (s) { return ("(" + (s.iterator2) + " !== undefined ? " + (s.iterator2) + " : " + (s.iterator1) + ")"); }).join((" + " + sep + " + "));
  return _fid
};
State.prototype.assignHId = function assignHId (node) {
  var _hid = this.getHId(node);
  Object.assign(node, { _hid: _hid });
};
State.prototype.resolveForHolder = function resolveForHolder (node) {
  var _hid = node._hid;
    var _fid = node._fid;
  var currentListState = this.getCurrentListState() || [];
  var tail = '';

  // remove last index, like '0-1-2', we only need '0-1'
  // store v-for list in this holder
  if (_fid) {
    tail = currentListState.slice(0, -1).map(function (s) { return ("(" + (s.iterator2) + " !== undefined ? " + (s.iterator2) + " : " + (s.iterator1) + ")"); }).join((" + " + sep + " + "));
    tail = tail ? (" + " + sep + " + " + tail) : tail;
  }
  node._forId = _hid + tail;
};
State.prototype.resolveHolder = function resolveHolder (node) {
  if (node._hid === undefined) {
    // holder id
    this.assignHId(node);
    addAttr$1(node, '_hid', node._hid);

    // list tail in v-for, exp: '0-0', '0-1'
    var _fid = this.getFid(node);
    if (_fid) {
      Object.assign(node, { _fid: _fid });
      addAttr$1(node, '_fid', '_fid');
    }
  }
};

/*  */

var templateCache = {};

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var realResourcePath = options.realResourcePath;
  var md5 = options.md5;
  var templateTrimed = template.trim();

  var cache = templateCache[realResourcePath];
  if (md5 && cache && cache.md5 === md5) {
    return cache.data
  }

  var ast = parse(templateTrimed, options);
  optimize(ast, options);
  mpify(ast, options);
  var code = generate(ast, options);
  var data = {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };

  if (md5 && realResourcePath) {
    templateCache[realResourcePath] = {
      data: data,
      md5: md5
    };
  }

  return data
});

var iteratorUid$1 = createUidFn('item');

var TYPE$1 = {
  ELEMENT: 1,
  TEXT: 2,
  STATIC_TEXT: 3
};

var sep$1 = "'" + (LIST_TAIL_SEPS.wechat) + "'";

// walk and modify ast after render function is generated
// modify some value before the template is generated
function postMpify (node, options, tools) {
  var target = options.target; if ( target === void 0 ) target = 'wechat';
  sep$1 = LIST_TAIL_SEPS[target] ? ("'" + (LIST_TAIL_SEPS[target]) + "'") : sep$1;
  var preset = presets[target];
  var state = new State$1({
    rootNode: node,
    target: target,
    preset: preset,
    tools: tools
  });
  walk$1(node, state);
}

function walk$1 (node, state) {
  if (node.for && !node.postMpForWalked) {
    return walkFor$1(node, state)
  }

  state.resolveFid(node);

  if (node.ifConditions && !node.mpIfWalked) {
    return walkIf$1(node, state)
  }

  /* istanbul ignore else */
  if (node.type === TYPE$1.ELEMENT) {
    walkElem$1(node, state);
  } else if (
    node.type === TYPE$1.TEXT || node.type === TYPE$1.STATIC_TEXT
  ) {

  }
}

function walkFor$1 (node, state) {
  var _for = node.for;
  var key = node.key;
  var alias = node.alias;
  var prefix = /{/.test(alias) ? ("" + (iteratorUid$1())) : alias;
  // create default iterator1, iterator2 for xml listing,
  // which is needed for _hid generating
  var iterator1 = node.iterator1; if ( iterator1 === void 0 ) iterator1 = prefix + "_i1";
  var iterator2 = node.iterator2; if ( iterator2 === void 0 ) iterator2 = prefix + "_i2";
  Object.assign(node, {
    postMpForWalked: true,
    iterator1: iterator1,
    iterator2: iterator2
  });

  state.pushListState({
    iterator1: iterator1,
    iterator2: iterator2,
    _for: _for,
    key: key,
    node: node,
    alias: alias
  });

  walk$1(node, state);

  state.popListState();
}

function walkElem$1 (node, state) {
  if (state.tools.isComponent(node)) {
    return walkComponent$1(node, state)
  }

  walkChildren$1(node, state);
}

function walkComponent$1 (node, state) {
  state.pushComp();

  walkChildren$1(node, state);
  state.popComp();
}

function walkIf$1 (node, state) {
}

function walkChildren$1 (node, state) {
  var children = node.children;
  var scopedSlots = node.scopedSlots;
  if (children && children.length) {
    children.forEach(function (n) {
      walk$1(n, state);
    });
  }

  if (scopedSlots) {
    Object.keys(scopedSlots).forEach(function (k) {
      var slot = scopedSlots[k];
      walk$1(slot, state);
    });
  }
}

var State$1 = function State (options) {
  if ( options === void 0 ) options = {};

  this.rootNode = options.rootNode;
  this.compCount = -1;
  this.elemCount = -1;
  this.compStack = new Stack();
  this.sep = options.sep || '-';
  this.preset = options.preset;
  this.tools = options.tools;
  // init a root component state, like page
  this.pushComp();
};
State$1.prototype.pushComp = function pushComp () {
  /**
   * major difference against pre procedure
   * the listState is based on component context,
   * which is, if the slot is inside of v-for, it's tail should be pased throw "_t" in templates
   *
   *exp:
   * <div v-for="(item,index) in items">{{item}}</div>
   *<compa>
   *  <div v-for="(ele,i) in item.list">{{index}}-{{ele}}</div>
   * </compa>
   * </div>
   *
   * the slot should compile to:
   * <template name="slot_a">
   * <view wx:for="{{ h[ 1 + _t ].li }}" wx:for-item="ele" wx:for-index="i">
   *   {{ h[ 2 + _t + '-' + i ].li }}
   * </view>
   * </template>
   *
   * the "_t" is passed by <compa>:
   * <template is="slot_a" data="{{ _t: _t || '' }}"></template>
   *
   * the source is from main page:
   * <template>
   * <view wx:for="{{ h[ 1 + _t ].li }}" wx:for-item="item" wx:for-index="index">
   *   <template is="compa" data="{{ _t: '-' + index }}"></template>
   * </view>
   * </template>
   */
  this.compStack.push({
    id: ++this.compCount,
    elems: 0,
    listStates: new Stack()
  });
};
State$1.prototype.popComp = function popComp () {
  this.compStack.pop();
};
State$1.prototype.pushElem = function pushElem () {
  this.elemCount++;
};
State$1.prototype.popListState = function popListState () {
  return this.getCurrentComp().listStates.pop()
};
State$1.prototype.pushListState = function pushListState (state) {
  var currentStates = this.getCurrentListState();
  var newStates = [];
  if (currentStates && currentStates.length) {
    newStates = [].concat(currentStates);
  }

  newStates.push(state);
  this.getCurrentComp().listStates.push(newStates);
};
State$1.prototype.getCurrentComp = function getCurrentComp () {
  return this.compStack.top
};
State$1.prototype.getCurrentCompIndex = function getCurrentCompIndex () {
  return ("" + (this.compCount))
};
State$1.prototype.getCurrentElemIndex = function getCurrentElemIndex () {
  return this.elemCount
};
State$1.prototype.getCurrentListState = function getCurrentListState () {
  return this.getCurrentComp().listStates.top
};
State$1.prototype.getCurrentListNode = function getCurrentListNode () {
  var top = this.getCurrentListState() || [];
  return (top[top.length - 1] || {}).node
};
State$1.prototype.resolveFid = function resolveFid (node) {
  var _hid = node._hid;
  var currentListState = this.getCurrentListState() || [];
  var _fid = currentListState.map(function (s) { return ("(" + (s.iterator2) + " !== undefined ? " + (s.iterator2) + " : " + (s.iterator1) + ")"); }).join((" + " + sep$1 + " + "));
  var tail = '';

  node._fid = _fid || undefined;

  // remove last index, like '0-1-2', we only need '0-1'
  // store v-for list in this holder
  if (_fid) {
    tail = currentListState.slice(0, -1).map(function (s) { return ("(" + (s.iterator2) + " !== undefined ? " + (s.iterator2) + " : " + (s.iterator1) + ")"); }).join((" + " + sep$1 + " + "));
    tail = tail ? (" + " + sep$1 + " + " + tail) : tail;
  }
  node._forId = _hid + tail;
};

/*  */

var vbindReg$1 = /^(v-bind)?:/;
var vonReg = /^v-on:|@/;
var vmodelReg = /^v-model/;
var vtextReg = /^v-text/;

var sep$2 = "'" + (LIST_TAIL_SEPS.wechat) + "'";

function compileToTemplate (ast, options) {
  if ( options === void 0 ) options = {};

  var templateGenerator = new TemplateGenerator(options);

  return templateGenerator.generate(ast)
}

var TemplateGenerator = function TemplateGenerator (options) {
  if ( options === void 0 ) options = {};

  var target = options.target; if ( target === void 0 ) target = 'wechat';
  var name = options.name; if ( name === void 0 ) name = 'defaultName';
  var scopeId = options.scopeId; if ( scopeId === void 0 ) scopeId = '';
  var imports = options.imports; if ( imports === void 0 ) imports = [];
  var slots = options.slots; if ( slots === void 0 ) slots = [];
  var warn = options.warn; if ( warn === void 0 ) warn = baseWarn;
  var htmlParse = options.htmlParse; if ( htmlParse === void 0 ) htmlParse = {};

  var preset = presets[target];
  sep$2 = LIST_TAIL_SEPS[target] ? ("'" + (LIST_TAIL_SEPS[target]) + "'") : sep$2;

  Object.assign(this, {
    name: name,
    target: target,
    scopeId: scopeId,
    imports: imports,
    slots: slots,
    preset: preset,
    warn: warn,
    needHtmlParse: false,
    htmlParse: htmlParse,
    options: options,
    errors: []
  });

  this.slotSnippetBuffer = [];
};

TemplateGenerator.prototype.generate = function generate (ast) {
  try {
    var clonedAST = cloneAST(ast);
    postMpify(clonedAST, this.options, {
      isComponent: this.isComponent.bind(this)
    });
    var code = this.genElement(clonedAST);
    var body = [
      this.genImports(),
      ("<template name=\"" + (this.name) + "\">" + code + "</template>")
    ].join('');

    var ref = this;
      var needHtmlParse = ref.needHtmlParse;
    return {
      body: body,
      slots: this.slots,
      needHtmlParse: needHtmlParse,
      errors: this.errors
    }
  } catch (err) {
    console.error('[compile template error]', err);
    this.errors.push(err);
    /* istanbul ignore next */
    return {
      body: this.genError(err),
      slots: this.slots
    }
  }
};

TemplateGenerator.prototype.genImports = function genImports () {
  var ref = this;
    var imports = ref.imports;
  var components = ref._components||new Set();//fixed by xxxxxx
  return Object.keys(imports)
    .map(function (name) {
        //fixed by xxxxxx 过滤 import
        // if(process.env.UNI_PLATFORM === 'mp-alipay'){
            if(name==='_slots_'){
            	if(!ref._hasSlot){//不包含 slots
            		return ''
            	}
            }else if(!components.has(name.toLowerCase().replace(/-/g,''))){//未使用的自定义组件 import
            	return ''
            }
        // }
        return ("<import src=\"" + (imports[name].src) + "\"/>");
    })
    .join('')
};

TemplateGenerator.prototype.genElement = function genElement (el) {
  if (el.ifConditions && !el.ifConditionsGenerated) {
    return this.genIfConditions(el)
  } else if (this.isVHtml(el)) {
    this.needHtmlParse = true;
    return this.genVHtml(el)
  } else if (this.isSlot(el)) {
    //fixed by xxxxxx 记录是否定义slot
    this._hasSlot = true;
    return this.genSlot(el)
  } else if (this.isComponent(el)) {
    //fixed by xxxxxx 记录自定义组件
    if(!this._components){
        this._components = new Set()
    }
    this._components.add(el.tag.toLowerCase().replace(/-/g,''))
    return this.genComponent(el)
  } else if (el.type === 1) {
    return this.genTag(el)
  } else {
    return this.genText(el)
  }
};

// TODO: refactor component name problem
TemplateGenerator.prototype.genComponent = function genComponent (el) {
  var _cid = el._cid;
    var tag = el.tag;
    var _fid = el._fid;
  var pascalTag = pascalize(tag);
  var camelizedTag = camelize(tag);
  var compInfo = this.imports[tag] || this.imports[pascalTag] || this.imports[camelizedTag];
  var compName = compInfo.name;
  var slots = this.genSlotSnippets(el);
  var slotsNames = slots.map(function (sl) { return ("s_" + (sl.name) + ": '" + (sl.slotName) + "'"); });
  var cid = _cid;
  var tail = ", " + FOR_TAIL_VAR + ": _t || ''";

  // passing parent v-for tail to slot inside v-for
  // TODO: refactor
  if (this.isInSlotSnippet()) {
    if (isDef(_fid)) {
      cid = _cid + " + _t + " + sep$2 + " + " + _fid;
      tail = ", " + FOR_TAIL_VAR + ": (" + FOR_TAIL_VAR + " || '') + " + sep$2 + " + " + _fid;
    } else {
      cid = _cid + " + _t";
      tail = ", " + FOR_TAIL_VAR + ": " + FOR_TAIL_VAR + " || ''";
    }
  } else if (isDef(_fid)) {
    cid = _cid + " + " + sep$2 + " + " + _fid;
    tail = ", " + FOR_TAIL_VAR + ": " + sep$2 + " + " + _fid;
  }

  var data = [
    ("..." + ROOT_DATA_VAR + "[ " + VM_ID_PREFIX + " + " + cid + " ]"),
    ("" + ROOT_DATA_VAR) ].concat( slotsNames
  ).join(', ');

  var attrs = [
    (" is=\"" + compName + "\""),
    " data=\"" + this.wrapTemplateData(("" + data + tail)) + "\"",
    this.genIf(el),
    this.genFor(el)
  ].filter(notEmpty).join('');

  return ("<template" + attrs + " />")
};

// TODO: deprecate the namedSlots inside a nameSlots
TemplateGenerator.prototype.genSlotSnippets = function genSlotSnippets (el) {
    var this$1 = this;

  var self = this;
  var root = el;
  var slots = {};
  var scopedSlots = el.scopedSlots;

  if (scopedSlots) {
    Object.keys(scopedSlots)
      .forEach(function (k) {
        var slot = scopedSlots[k] || /* istanbul ignore next */ {};
        var slotAst = [];
        if (slot.tag === 'template') {
          slotAst = slot.children || /* istanbul ignore next */ [];
        } else {
          slotAst = [slot];
        }
        var slotName = removeQuotes(k);
        addSlotAst.apply(void 0, [ slotName ].concat( slotAst ));
        slots[slotName].scoped = true;
      });
  }

  walk(root);

  var slotsArr = Object.keys(slots)
    .map(function (name) {
      var slot = slots[name];
      var ast = slot.ast;
      if (ast.length <= 0) {
        return null
      }

      this$1.enterSlotSnippet(slot);
      var parts = slot.ast.map(function (e) { return this$1.genElement(e); });
      this$1.leaveSlotSnippet(slot);

      var dependencies = slot.ast.reduce(function (res, e) { return res.concat(this$1.collectDependencies(e)); }, []);
      var slotName = name + "_" + (uid$1());
      var body = [
        ("<template name=\"" + slotName + "\" parent=\"" + (this$1.name) + "\">") ].concat( parts,
        ["</template>"]
      ).join('');

      return {
        name: name,
        slotName: slotName,
        dependencies: dependencies,
        body: body,
        ast: ast
      }
    })
    .filter(notEmpty);

  this.slots = this.slots.concat(slotsArr);

  return slotsArr

  function walk (el, parent) {
    if (self.isNamedSlotDefinition(el)) {
      var name = removeQuotes(el.slotTarget);
      if (parent === root) {
        addSlotAst(name, el);
      }
      // extract the slot wrapper
      /* istanbul ignore else */
      if (parent && parent.children && parent.children.length) {
        parent.children = parent.children.filter(function (e) { return e !== el; });
      }
      return
    }
    if (el.children) {
      if (!parent ||
        /* istanbul ignore next */
        !self.isComponent(el)
      ) {
        el.children.forEach(function (e) {
          walk(e, el);
        });
      }
    }
    if (parent === root) {
      addSlotAst('default', el);
    }
  }

  function addSlotAst (name) {
      var asts = [], len = arguments.length - 1;
      while ( len-- > 0 ) asts[ len ] = arguments[ len + 1 ];

    if (!slots[name]) {
      slots[name] = {
        ast: [],
        dependencies: [],
        template: ''
      };
    }
    var slot = slots[name];
    if (slot.scoped) { return }
    asts = asts.filter(function (el) {
      /* istanbul ignore if */
      if (!el) { return false }
      if (el.tag) { return true }
      // ignore white space text node
      var text = (el.text || /* istanbul ignore next */ '').trim();
      return text !== ''
    });
    slot.ast = slot.ast.concat(asts);
  }
};

TemplateGenerator.prototype.genTag = function genTag (el) {
  var children = this.isVText(el) ? this.genVText(el) : this.genChildren(el);
  if (this.isPlainTemplate(el)) {
    return children
  }

  var tag = el.tag;
    var isSelfCloseTag = el.isSelfCloseTag;
  var mpTag = TAG_MAP[tag] || tag;
  var attrs = this.isTemplate(el) ? [] : [
    this.genVShow(el),
    this.genClass(el),
    this.genStyle(el),
    this.genAttrs(el),
    this.genEvents(el),
    this.genNativeSlotName(el)
  ];

  var startTag = "<" + ([
    mpTag,
    this.genIf(el),
    this.genFor(el) ].concat( attrs
  ).join('')) + (isSelfCloseTag ? "/>" : ">");

  var endTag = isSelfCloseTag ? "" : ("</" + mpTag + ">");

  return [startTag, children, endTag].join('')
};

TemplateGenerator.prototype.genClass = function genClass (el) {
  var tag = el.tag;
    var classBinding = el.classBinding;
    var _hid = el._hid;
  var staticClass = el.staticClass; if ( staticClass === void 0 ) staticClass = '';
  var klass = [];
  staticClass = removeQuotes(staticClass);
  if (staticClass) {
    klass.push(staticClass);
  }
  if (classBinding) {
    klass.push(("{{ " + (this.genHolder(el, 'class')) + " }}"));
  }
  if (_hid === '0') {
    klass.push(("{{ " + (this.genHolder(el, 'rootClass')) + " }}"));
  }
  // scoped id class
  klass.push(this.scopeId);
  klass.unshift(("_" + tag));
  klass = klass.filter(notEmpty).join(' ');
  return (" class=\"" + klass + "\"")
};

TemplateGenerator.prototype.genStyle = function genStyle (el) {
  var styleBinding = el.styleBinding;
  var staticStyle = el.staticStyle; if ( staticStyle === void 0 ) staticStyle = '';
  var style = [];
  staticStyle = staticStyle.replace(/"|{|}/g, '').split(',').join('; ');
  if (staticStyle) {
    style.push(staticStyle);
  }
  if (styleBinding) {
    style.push(("{{ " + (this.genHolder(el, 'style')) + " }}"));
  }
  style = style.filter(notEmpty).join('; ');
  return style ? (" style=\"" + style + "\"") : ''
};

TemplateGenerator.prototype.genVShow = function genVShow (el) {
  var attrsMap = el.attrsMap; if ( attrsMap === void 0 ) attrsMap = {};
  if (!attrsMap['v-show']) {
    return ''
  }
  return (" hidden=\"{{ " + (this.genHolder(el, 'vshow')) + " }}\"")
};

TemplateGenerator.prototype.genAttrs = function genAttrs (el) {
    var this$1 = this;

  var attrsList = el.attrsList; if ( attrsList === void 0 ) attrsList = [];
  var hasVModel = this.hasVModel(el);

  var attrs = attrsList.map(function (attr) {
    var name = attr.name;
      var value = attr.value;
    if (
      vtextReg.test(name) ||
      vonReg.test(name) ||
      (name === 'value' && hasVModel) ||
      name === 'v-show'
    ) {
      return ''
    } else if (vbindReg$1.test(name)) {
      var realName = name.replace(vbindReg$1, '');
      return (realName + "=\"{{ " + HOLDER_VAR + "[ " + (this$1.genHid(el)) + " ][ '" + realName + "' ] }}\"")
    } else if (vmodelReg.test(name)) {
      return ("value=\"{{ " + (this$1.genHolder(el, 'value')) + " }}\"")
    } else {
      return (name + "=\"" + value + "\"")
    }
  });
  attrs = attrs.filter(notEmpty).join(' ');
  return attrs ? (" " + attrs) : ''
};

TemplateGenerator.prototype.genEvents = function genEvents (el) {
    var this$1 = this;

  var events = el.events;
    var tag = el.tag;
  if (!events) {
    return ''
  }

  var cid = 'c';

  var eventAttrs = Object.keys(events).map(function (type) {
    var event = events[type];
    var binder = this$1.preset.genBind(event, type, tag);
    return (binder + "=\"_pe\"")
  });
  eventAttrs = eventAttrs.join(' ');

  /**
   * when the element is in a slot, it will recieve "_c" as the actual component instance id
   * othewise, using the current scope which usually the parent component in the template
   */
  return (" data-cid=\"{{ _c || " + cid + " }}\" data-hid=\"{{ " + (this.genHid(el)) + " }}\" " + eventAttrs)
};

TemplateGenerator.prototype.genIfConditions = function genIfConditions (el) {
    var this$1 = this;

  el.ifConditionsGenerated = true;
  /* istanbul ignore if */
  if (!el.ifConditions) {
    return ''
  }
  return el.ifConditions
    .map(function (cond) {
      var block = cond.block;
      return this$1.genElement(block)
    })
    .filter(notEmpty)
    .join('')
};

TemplateGenerator.prototype.genIf = function genIf (el) {
  var IF = this.directive('if');
  var ELSE_IF = this.directive('elseif');
  var ELSE = this.directive('else');

  if (el.if) {
    return (" " + IF + "=\"{{ " + (this.genHolder(el, 'if')) + " }}\"")
  } else if (el.elseif) {
    return (" " + ELSE_IF + "=\"{{ " + (this.genHolder(el, 'if')) + " }}\"")
  } else if (el.else) {
    return (" " + ELSE)
  }
  return ''
};

TemplateGenerator.prototype.genFor = function genFor (el) {
  if (!el.for) {
    return this.genForKey(el)
  }
  var iterator1 = el.iterator1;
    var alias = el.alias;
    var _forId = el._forId;
    var _hid = el._hid;
  var FOR = this.directive('for');
  var FOR_ITEM = this.directive('forItem');
  var FOR_INDEX = this.directive('forIndex');
  var forHolderId = '';
  if (this.isInSlotSnippet()) {
    forHolderId = _hid + " + _t";
  } else {
    forHolderId = _forId;
  }

  var _for = [
    (" " + FOR + "=\"{{ " + (this.genHolder(forHolderId, 'for')) + " }}\""),
    this.genForKey(el),
    alias ? (" " + FOR_ITEM + "=\"" + alias + "\"") : /* istanbul ignore next */ ''
  ];
  iterator1 && _for.push((" " + FOR_INDEX + "=\"" + iterator1 + "\""));

  return _for.filter(notEmpty).join('')
};

TemplateGenerator.prototype.genForKey = function genForKey (el) {
  if (!el.key) {
    return ''
  }
  var FOR_KEY = this.directive('forKey');

  var keyName = el.key.replace(/^\w*\./, '').replace(/\./g, '_');
  return keyName ? (" " + FOR_KEY + "=\"" + keyName + "\"") : /* istanbul ignore next */ ''
};

TemplateGenerator.prototype.genText = function genText (el) {
  var text = el.text; if ( text === void 0 ) text = '';
  if (el.expression) {
    return ("{{ " + (this.genHolder(el, 'text')) + " }}")
  }
  return escapeText(text) || /* istanbul ignore next */ ''
};

TemplateGenerator.prototype.genSlot = function genSlot (el) {
  var _fid = el._fid;
  var slotName = el.slotName; if ( slotName === void 0 ) slotName = 'default';
  slotName = slotName.replace(/"/g, '');
  var fallbackSlotName = slotName + "$" + (uid$1());
  var fallbackSlotBody = this.genChildren(el);
  var fallbackSlot = "<template name=\"" + fallbackSlotName + "\">" + (fallbackSlotBody || '') + "</template>";
  var tail = ", " + FOR_TAIL_VAR + ": " + FOR_TAIL_VAR + " || ''";
  // sloped-slot inside v-for
  if (el.hasBindings && isDef(_fid)) {
    tail = ", " + FOR_TAIL_VAR + ": '-' + " + _fid + " + (" + FOR_TAIL_VAR + " || '')";
  }

  /**
   * use "_c" to passing the actual vdom host component instance id to slot template
   *    because the vdom is actually stored in the component's _vnodes
   *    event hanlders searching depends on this id
   */

  if (this.target === 'swan') {
    return [
      // if
      ("" + fallbackSlot),
      ("<block s-if=\"s_" + slotName + "\">"),
      ("<template is=\"{{ s_" + slotName + " }}\" "),
      "data=\"",
      this.wrapTemplateData(("..." + ROOT_DATA_VAR + "[ s ], " + ROOT_DATA_VAR + tail + ", _c: c")),
      ("\"" + (this.genFor(el)) + "/>"),
      "</block>",

      // else use default slot snippet
      "<block s-else>",
      ("<template is=\"{{ '" + fallbackSlotName + "' }}\" "),
      "data=\"",
      this.wrapTemplateData(("..." + ROOT_DATA_VAR + "[ s ], " + ROOT_DATA_VAR + tail + ", _c: c")),
      ("\"" + (this.genFor(el)) + "/>"),
      "</block>"
    ].join('')
  }

  return [
    ("" + fallbackSlot),
    ("<template is=\"{{ s_" + slotName + " || '" + fallbackSlotName + "' }}\" "),
    "data=\"",
    this.wrapTemplateData(("..." + ROOT_DATA_VAR + "[ s ], " + ROOT_DATA_VAR + tail + ", _c: c")),
    ("\"" + (this.genFor(el)) + "/>")
  ].join('')
};

TemplateGenerator.prototype.genChildren = function genChildren (el) {
    var this$1 = this;

  if (!el || !el.children || !el.children.length) {
    return ''
  }
  return el.children.map(function (child) { return this$1.genElement(child); }).join('')
};

TemplateGenerator.prototype.genHolder = function genHolder (el, type) {
  var varName = HOLDER_TYPE_VARS[type];
  var hid = typeof el === 'string' ? el : this.genHid(el);
  /* istanbul ignore next */
  if (!varName) {
    throw new Error((type + " holder HOLDER_TYPE_VARS not found"))
  }
  return (HOLDER_VAR + "[ " + hid + " ]." + varName)
};

/* istanbul ignore next */
TemplateGenerator.prototype.genError = function genError (err) {
  return ("<template name=\"" + (this.name) + "\">compile error: " + (err.toString()) + "\n" + (err.stack) + "</template>")
};

TemplateGenerator.prototype.collectDependencies = function collectDependencies (el) {
    var this$1 = this;

  var deps = [];
  var tag = el.tag;
    var children = el.children;
  if (this.isComponent(el)) {
    deps.push(this.getComponentSrc(tag));
  }
  if (children) {
    children.forEach(function (c) {
      deps = deps.concat(this$1.collectDependencies(c));
    });
  }
  return deps
};

TemplateGenerator.prototype.getComponentSrc = function getComponentSrc (name) {
  var ref = this;
    var imports = ref.imports; if ( imports === void 0 ) imports = {};
  var camelizedName = camelize(name);
  var pascalizedName = pascalize(name);

  var dep = imports[name] || imports[camelizedName] || imports[pascalizedName];
  if (dep) {
    return dep.src
  } else {
    return ''
  }
};

TemplateGenerator.prototype.genVHtml = function genVHtml (el) {
  var ref = this;
    var htmlParse = ref.htmlParse;
  return ("<template is=\"" + (htmlParse.templateName) + "\"" + ([
    this.genIf(el),
    this.genFor(el)
  ].join('')) + " data=\"{{ nodes: " + (this.genHolder(el, 'vhtml')) + " }}\"/>")
};

TemplateGenerator.prototype.genNativeSlotName = function genNativeSlotName (el) {
  var slotTarget = el.slotTarget;
  if (!slotTarget || this.isComponent(el.parent)) {
    return ''
  }
  var isDynamicSlot = !/"/.test(slotTarget);
  var slotName = isDynamicSlot ? ("\"{{ " + (this.genHolder(el, 'slot')) + " }}\"") : slotTarget;

  return (" slot=" + slotName)
};

TemplateGenerator.prototype.genVText = function genVText (el) {
    if ( el === void 0 ) el = {};

  return ("{{ " + (this.genHolder(el, 'vtext')) + " }}")
};

TemplateGenerator.prototype.isVHtml = function isVHtml (el) {
    if ( el === void 0 ) el = {};

  var attrsMap = el.attrsMap; if ( attrsMap === void 0 ) attrsMap = {};
  return attrsMap['v-html'] !== undefined
};

TemplateGenerator.prototype.isPlainTemplate = function isPlainTemplate (el) {
  return el &&
    this.isTemplate(el) &&
    !el.iterator1 &&
    !el.if && !el.elseif && !el.else
};

TemplateGenerator.prototype.isTemplate = function isTemplate (el) {
  return el && el.tag === 'template'
};

TemplateGenerator.prototype.isSlot = function isSlot (el) {
  return el && el.tag === 'slot'
};

TemplateGenerator.prototype.isNamedSlotDefinition = function isNamedSlotDefinition (el) {
  var slotTarget = el.slotTarget;
  return slotTarget
};

TemplateGenerator.prototype.isComponent = function isComponent (el) {
    if ( el === void 0 ) el = {};

  var tag = el.tag;
  if (el._cid) {
    var ref = this;
      var imports = ref.imports; if ( imports === void 0 ) imports = {};
    var pascalName = pascalize(tag);
    var camelizedName = camelize(tag);
    return !!(imports[tag] || imports[pascalName] || imports[camelizedName])
  }
  return false
};

TemplateGenerator.prototype.isVText = function isVText (el) {
    if ( el === void 0 ) el = {};

  var attrsMap = el.attrsMap; if ( attrsMap === void 0 ) attrsMap = {};
  return attrsMap.hasOwnProperty('v-text')
};

TemplateGenerator.prototype.hasVModel = function hasVModel (el) {
  var attrsList = el.attrsList; if ( attrsList === void 0 ) attrsList = [];
  return attrsList.some(function (attr) { return vmodelReg.test(attr.name); })
};
TemplateGenerator.prototype.directive = function directive (grammar) {
  return this.preset.directives[grammar] || ''
};

TemplateGenerator.prototype.genHid = function genHid (el) {
  var _hid = el._hid;
    var _fid = el._fid;
  var tail = '';
  var hid = _hid;
  if (this.isInSlotSnippet()) {
    tail = " + " + FOR_TAIL_VAR;
  }
  if (_fid) {
    return ("" + _hid + tail + " + " + sep$2 + " + " + _fid)
  } else {
    return ("" + hid + tail)
  }
};
TemplateGenerator.prototype.enterSlotSnippet = function enterSlotSnippet (slot) {
  this.slotSnippetBuffer.push(slot);
};

TemplateGenerator.prototype.leaveSlotSnippet = function leaveSlotSnippet () {
  this.slotSnippetBuffer.pop();
};

TemplateGenerator.prototype.isInSlotSnippet = function isInSlotSnippet () {
  return this.slotSnippetBuffer.length > 0
};

// getCurrentSlotSnippet () {
// return this.slotSnippetBuffer[this.slotSnippetBuffer.length - 1]
// }

TemplateGenerator.prototype.wrapTemplateData = function wrapTemplateData (str) {
  return this.target === 'swan' ? ("{{{ " + str + " }}}") : ("{{ " + str + " }}")
};

// function extractHidTail (hid = ''): string {
//   const delimiter = `+ ${sep} +`
//   let parts = hid.split(delimiter)
//   parts = parts.slice(1).map(s => s.trim())
//   return `${sep} + ${parts.join(delimiter)}`
// }

function pascalize (str) {
  if ( str === void 0 ) str = '';

  var camelized = camelize(str);
  var pascalized = capitalize(camelized);
  return pascalized
}

/*  */

var ref = createCompiler(baseOptions);
var compile = ref.compile;
var compileToFunctions = ref.compileToFunctions;

function compileToTemplate$1 (template, options) {
  var compiled = compile(template, options);
  var result = compileToTemplate(compiled.ast, options);
  return result
}

/*  */

exports.parseComponent = parseComponent;
exports.compile = compile;
exports.compileToFunctions = compileToFunctions;
exports.compileToTemplate = compileToTemplate$1;
