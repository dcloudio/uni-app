"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex
}

var deindent = _interopDefault(require("de-indent"))
var he = _interopDefault(require("he"))
var babel = _interopDefault(require("@babel/core"))//fixed by xxxxxx
var prettier = _interopDefault(require("prettier"))
var t = require("@babel/types")//fixed by xxxxxx
var generate = _interopDefault(require("@babel/generator"))//fixed by xxxxxx
var template = _interopDefault(require("@babel/template"))//fixed by xxxxxx

//fixed by xxxxxx
function makeRandom(len) {
    return 'E';
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// 
//   for (var i = 0; i < len; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
// 
//   return text;
}

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining

/**
 * Check if value is primitive
 */

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
    return obj !== null && typeof obj === "object"
}

var _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
    return _toString.call(obj) === "[object Object]"
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
    var n = parseFloat(val)
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
function makeMap(str, expectsLowerCase) {
    var map = Object.create(null)
    var list = str.split(",")
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? function(val) {
              return map[val.toLowerCase()]
          }
        : function(val) {
              return map[val]
          }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap("slot,component", true)

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap("key,ref,slot,is")

/**
 * Remove an item from an array
 */
function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
    var cache = Object.create(null)
    return function cachedFn(str) {
        var hit = cache[str]
        return hit || (cache[str] = fn(str))
    }
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g
var camelize = cached(function(str) {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : ""
    })
})

/**
 * Capitalize a string.
 */

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g
var hyphenate = cached(function(str) {
    return str
        .replace(hyphenateRE, "$1-$2")
        .replace(hyphenateRE, "$1-$2")
        .toLowerCase()
})

/**
 * Simple bind, faster than native
 */

/**
 * Convert an Array-like object to a real Array.
 */

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key]
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
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function(a, b, c) {
    return false
}

/**
 * Return same value
 */
var identity = function(_) {
    return _
}

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys(modules) {
    return modules
        .reduce(function(keys, m) {
            return keys.concat(m.staticKeys || [])
        }, [])
        .join(",")
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
    "area,base,br,col,embed,frame,hr,img,input,isindex,keygen," + "link,meta,param,source,track,wbr"
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source")

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
    "address,article,aside,base,blockquote,body,caption,col,colgroup,dd," +
        "details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form," +
        "h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta," +
        "optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead," +
        "title,tr,track"
)

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
var singleAttrIdentifier = /([^\s"'<>/=]+)/
var singleAttrAssign = /(?:=)/
var singleAttrValues = [
    // attr value double quotes
    /"([^"]*)"+/.source,
    // attr value, single quotes
    /'([^']*)'+/.source,
    // attr value, no quotes
    /([^\s"'=<>`]+)/.source
]
var attribute = new RegExp(
    "^\\s*" +
        singleAttrIdentifier.source +
        "(?:\\s*(" +
        singleAttrAssign.source +
        ")" +
        "\\s*(?:" +
        singleAttrValues.join("|") +
        "))?"
)

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = "[a-zA-Z_][\\w\\-\\.]*"
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")"
var startTagOpen = new RegExp("^<" + qnameCapture)
var startTagClose = /^\s*(\/?)>/
var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>")
var doctype = /^<!DOCTYPE [^>]+>/i
var comment = /^<!--/
var conditionalComment = /^<!\[/

var IS_REGEX_CAPTURING_BROKEN = false
"x".replace(/x(.)?/g, function(m, g) {
    IS_REGEX_CAPTURING_BROKEN = g === ""
})

// Special Elements (can contain anything)
var isPlainTextElement = makeMap("script,style,textarea", true)
var reCache = {}

var decodingMap = {
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&amp;": "&",
    "&#10;": "\n"
}
var encodedAttr = /&(?:lt|gt|quot|amp);/g
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g

// #5992
var isIgnoreNewlineTag = makeMap("pre,textarea", true)
var shouldIgnoreFirstNewline = function(tag, html) {
    return tag && isIgnoreNewlineTag(tag) && html[0] === "\n"
}

function decodeAttr(value, shouldDecodeNewlines) {
    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
    return value.replace(re, function(match) {
        return decodingMap[match]
    })
}

function parseHTML(html, options) {
    var stack = []
    var expectHTML = options.expectHTML
    var isUnaryTag$$1 = options.isUnaryTag || no
    var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no
    var index = 0
    var last, lastTag
    while (html) {
        last = html
        // Make sure we're not in a plaintext content element like script/style
        if (!lastTag || !isPlainTextElement(lastTag)) {
            if (shouldIgnoreFirstNewline(lastTag, html)) {
                advance(1)
            }
            var textEnd = html.indexOf("<")
            if (textEnd === 0) {
                // Comment:
                if (comment.test(html)) {
                    var commentEnd = html.indexOf("-->")

                    if (commentEnd >= 0) {
                        if (options.shouldKeepComment) {
                            options.comment(html.substring(4, commentEnd))
                        }
                        advance(commentEnd + 3)
                        continue
                    }
                }

                // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                if (conditionalComment.test(html)) {
                    var conditionalEnd = html.indexOf("]>")

                    if (conditionalEnd >= 0) {
                        advance(conditionalEnd + 2)
                        continue
                    }
                }

                // Doctype:
                var doctypeMatch = html.match(doctype)
                if (doctypeMatch) {
                    advance(doctypeMatch[0].length)
                    continue
                }

                // End tag:
                var endTagMatch = html.match(endTag)
                if (endTagMatch) {
                    var curIndex = index
                    advance(endTagMatch[0].length)
                    parseEndTag(endTagMatch[1], curIndex, index)
                    continue
                }

                // Start tag:
                var startTagMatch = parseStartTag()
                if (startTagMatch) {
                    handleStartTag(startTagMatch)
                    continue
                }
            }

            var text = void 0,
                rest = void 0,
                next = void 0
            if (textEnd >= 0) {
                rest = html.slice(textEnd)
                while (
                    !endTag.test(rest) &&
                    !startTagOpen.test(rest) &&
                    !comment.test(rest) &&
                    !conditionalComment.test(rest)
                ) {
                    // < in plain text, be forgiving and treat it as text
                    next = rest.indexOf("<", 1)
                    if (next < 0) {
                        break
                    }
                    textEnd += next
                    rest = html.slice(textEnd)
                }
                text = html.substring(0, textEnd)
                advance(textEnd)
            }

            if (textEnd < 0) {
                text = html
                html = ""
            }

            if (options.chars && text) {
                options.chars(text)
            }
        } else {
            var endTagLength = 0
            var stackedTag = lastTag.toLowerCase()
            var reStackedTag =
                reCache[stackedTag] ||
                (reCache[stackedTag] = new RegExp("([\\s\\S]*?)(</" + stackedTag + "[^>]*>)", "i"))
            var rest$1 = html.replace(reStackedTag, function(all, text, endTag) {
                endTagLength = endTag.length
                if (!isPlainTextElement(stackedTag) && stackedTag !== "noscript") {
                    text = text
                        .replace(/<!--([\s\S]*?)-->/g, "$1")
                        .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")
                }
                if (shouldIgnoreFirstNewline(stackedTag, text)) {
                    text = text.slice(1)
                }
                if (options.chars) {
                    options.chars(text)
                }
                return ""
            })
            index += html.length - rest$1.length
            html = rest$1
            parseEndTag(stackedTag, index - endTagLength, index)
        }

        if (html === last) {
            options.chars && options.chars(html)
            if (process.env.NODE_ENV !== "production" && !stack.length && options.warn) {
                options.warn('Mal-formatted tag at end of template: "' + html + '"')
            }
            break
        }
    }

    // Clean up any remaining tags
    parseEndTag()

    function advance(n) {
        index += n
        html = html.substring(n)
    }

    function parseStartTag() {
        var start = html.match(startTagOpen)
        if (start) {
            var match = {
                tagName: start[1],
                attrs: [],
                start: index
            }
            advance(start[0].length)
            var end, attr
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push(attr)
            }
            if (end) {
                match.unarySlash = end[1]
                advance(end[0].length)
                match.end = index
                return match
            }
        }
    }

    function handleStartTag(match) {
        var tagName = match.tagName
        var unarySlash = match.unarySlash

        if (expectHTML) {
            if (lastTag === "p" && isNonPhrasingTag(tagName)) {
                parseEndTag(lastTag)
            }
            if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
                parseEndTag(tagName)
            }
        }

        var unary = isUnaryTag$$1(tagName) || !!unarySlash

        var l = match.attrs.length
        var attrs = new Array(l)
        for (var i = 0; i < l; i++) {
            var args = match.attrs[i]
            // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
            if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
                if (args[3] === "") {
                    delete args[3]
                }
                if (args[4] === "") {
                    delete args[4]
                }
                if (args[5] === "") {
                    delete args[5]
                }
            }
            var value = args[3] || args[4] || args[5] || ""
            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, options.shouldDecodeNewlines)
            }
        }

        if (!unary) {
            stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs })
            lastTag = tagName
        }

        if (options.start) {
            options.start(tagName, attrs, unary, match.start, match.end)
        }
    }

    function parseEndTag(tagName, start, end) {
        var pos, lowerCasedTagName
        if (start == null) {
            start = index
        }
        if (end == null) {
            end = index
        }

        if (tagName) {
            lowerCasedTagName = tagName.toLowerCase()
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
            pos = 0
        }

        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
                if (
                    process.env.NODE_ENV !== "production" &&
                    (i > pos || !tagName) &&
                    options.warn
                ) {
                    options.warn("tag <" + stack[i].tag + "> has no matching end tag.")
                }
                if (options.end) {
                    options.end(stack[i].tag, start, end)
                }
            }

            // Remove the open elements from the stack
            stack.length = pos
            lastTag = pos && stack[pos - 1].tag
        } else if (lowerCasedTagName === "br") {
            if (options.start) {
                options.start(tagName, [], true, start, end)
            }
        } else if (lowerCasedTagName === "p") {
            if (options.start) {
                options.start(tagName, [], false, start, end)
            }
            if (options.end) {
                options.end(tagName, start, end)
            }
        }
    }
}

/*  */

var splitRE = /\r?\n/g
var replaceRE = /./g
var isSpecialTag = makeMap("script,style,template", true)

/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 */
function parseComponent(content, options) {
    if (options === void 0) options = {}

    var sfc = {
        template: null,
        script: null,
        styles: [],
        customBlocks: []
    }
    var depth = 0
    var currentBlock = null

    function start(tag, attrs, unary, start, end) {
        if (depth === 0) {
            currentBlock = {
                type: tag,
                content: "",
                start: end,
                attrs: attrs.reduce(function(cumulated, ref) {
                    var name = ref.name
                    var value = ref.value

                    cumulated[name] = value || true
                    return cumulated
                }, Object.create(null))
            }
            if (isSpecialTag(tag)) {
                checkAttrs(currentBlock, attrs)
                if (tag === "style") {
                    sfc.styles.push(currentBlock)
                } else {
                    sfc[tag] = currentBlock
                }
            } else {
                // custom blocks
                sfc.customBlocks.push(currentBlock)
            }
        }
        if (!unary) {
            depth++
        }
    }

    function checkAttrs(block, attrs) {
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i]
            if (attr.name === "lang") {
                block.lang = attr.value
            }
            if (attr.name === "scoped") {
                block.scoped = true
            }
            if (attr.name === "module") {
                block.module = attr.value || true
            }
            if (attr.name === "src") {
                block.src = attr.value
            }
        }
    }

    function end(tag, start, end) {
        if (depth === 1 && currentBlock) {
            currentBlock.end = start
            var text = deindent(content.slice(currentBlock.start, currentBlock.end))
            // pad content so that linters and pre-processors can output correct
            // line numbers in errors and warnings
            if (currentBlock.type !== "template" && options.pad) {
                text = padContent(currentBlock, options.pad) + text
            }
            currentBlock.content = text
            currentBlock = null
        }
        depth--
    }

    function padContent(block, pad) {
        if (pad === "space") {
            return content.slice(0, block.start).replace(replaceRE, " ")
        } else {
            var offset = content.slice(0, block.start).split(splitRE).length
            var padChar =
                block.type === "script" && !block.lang //fixed by xxxxxx script 节点使用//注释后会影响 babel 的retainLines
                    ? "\n"
                    : "\n"
            return Array(offset).join(padChar)
        }
    }

    parseHTML(content, {
        start: start,
        end: end
    })

    return sfc
}

/* globals renderer */

var isPreTag = function(tag) {
    return tag === "pre"
}

var isReservedTag = makeMap(
    "template,script,style,element,content,slot,link,meta,svg,view," +
        "a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select," +
        "slider,slider-neighbor,indicator,trisition,trisition-group,canvas," +
        "list,cell,header,loading,loading-indicator,refresh,scrollable,scroller," +
        "video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown",
    true
)

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap("style,class")

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag$1 = makeMap(
    "web,spinner,switch,video,textarea,canvas," + "indicator,marquee,countdown",
    true
)

var isUnaryTag$1 = makeMap("embed,img,image,input,link,meta", true)

function mustUseProp() {
    /* console.log('mustUseProp') */
}
function getTagNamespace() {
    /* console.log('getTagNamespace') */
}

// 用于小程序的 event type 到 web 的 event

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/

function parseFilters(exp) {
    var inSingle = false
    var inDouble = false
    var inTemplateString = false
    var inRegex = false
    var curly = 0
    var square = 0
    var paren = 0
    var lastFilterIndex = 0
    var c, prev, i, expression, filters

    for (i = 0; i < exp.length; i++) {
        prev = c
        c = exp.charCodeAt(i)
        if (inSingle) {
            if (c === 0x27 && prev !== 0x5c) {
                inSingle = false
            }
        } else if (inDouble) {
            if (c === 0x22 && prev !== 0x5c) {
                inDouble = false
            }
        } else if (inTemplateString) {
            if (c === 0x60 && prev !== 0x5c) {
                inTemplateString = false
            }
        } else if (inRegex) {
            if (c === 0x2f && prev !== 0x5c) {
                inRegex = false
            }
        } else if (
            c === 0x7c && // pipe
            exp.charCodeAt(i + 1) !== 0x7c &&
            exp.charCodeAt(i - 1) !== 0x7c &&
            !curly &&
            !square &&
            !paren
        ) {
            if (expression === undefined) {
                // first filter, end of expression
                lastFilterIndex = i + 1
                expression = exp.slice(0, i).trim()
            } else {
                pushFilter()
            }
        } else {
            switch (c) {
                case 0x22:
                    inDouble = true
                    break // "
                case 0x27:
                    inSingle = true
                    break // '
                case 0x60:
                    inTemplateString = true
                    break // `
                case 0x28:
                    paren++
                    break // (
                case 0x29:
                    paren--
                    break // )
                case 0x5b:
                    square++
                    break // [
                case 0x5d:
                    square--
                    break // ]
                case 0x7b:
                    curly++
                    break // {
                case 0x7d:
                    curly--
                    break // }
            }
            if (c === 0x2f) {
                // /
                var j = i - 1
                var p = void 0
                // find first non-whitespace prev char
                for (; j >= 0; j--) {
                    p = exp.charAt(j)
                    if (p !== " ") {
                        break
                    }
                }
                if (!p || !validDivisionCharRE.test(p)) {
                    inRegex = true
                }
            }
        }
    }

    if (expression === undefined) {
        expression = exp.slice(0, i).trim()
    } else if (lastFilterIndex !== 0) {
        pushFilter()
    }

    function pushFilter() {
        ;(filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
        lastFilterIndex = i + 1
    }

    if (filters) {
        for (i = 0; i < filters.length; i++) {
            expression = wrapFilter(expression, filters[i])
        }
    }

    return expression
}

function wrapFilter(exp, filter) {
    var i = filter.indexOf("(")
    if (i < 0) {
        // _f: resolveFilter
        return '_f("' + filter + '")(' + exp + ")"
    } else {
        var name = filter.slice(0, i)
        var args = filter.slice(i + 1)
        return '_f("' + name + '")(' + exp + "," + args
    }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

var buildRegex = cached(function(delimiters) {
    var open = delimiters[0].replace(regexEscapeRE, "\\$&")
    var close = delimiters[1].replace(regexEscapeRE, "\\$&")
    return new RegExp(open + "((?:.|\\n)+?)" + close, "g")
})

function parseText(text, delimiters) {
    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
    if (!tagRE.test(text)) {
        return
    }
    var tokens = []
    var lastIndex = (tagRE.lastIndex = 0)
    var match, index
    while ((match = tagRE.exec(text))) {
        index = match.index
        // push text token
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        // tag token
        var exp = parseFilters(match[1].trim())
        tokens.push("_s(" + exp + ")")
        lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return tokens.join("+")
}

/*  */

function baseWarn(msg) {
    console.error("[Vue compiler]: " + msg)
}

function pluckModuleFunction(modules, key) {
    return modules
        ? modules
              .map(function(m) {
                  return m[key]
              })
              .filter(function(_) {
                  return _
              })
        : []
}

function addProp(el, name, value) {
    ;(el.props || (el.props = [])).push({ name: name, value: value })
}

function addAttr(el, name, value) {
    ;(el.attrs || (el.attrs = [])).push({ name: name, value: value })
}

function addDirective(el, name, rawName, value, arg, modifiers) {
    ;(el.directives || (el.directives = [])).push({
        name: name,
        rawName: rawName,
        value: value,
        arg: arg,
        modifiers: modifiers
    })
}

function addHandler(el, name, value, modifiers, important, warn) {
    // warn prevent and passive modifier
    /* istanbul ignore if */
    if (
        process.env.NODE_ENV !== "production" &&
        warn &&
        modifiers &&
        modifiers.prevent &&
        modifiers.passive
    ) {
        warn(
            "passive and prevent can't be used together. " +
                "Passive handler can't prevent default event."
        )
    }
    // check capture modifier
    if (modifiers && modifiers.capture) {
        delete modifiers.capture
        name = "!" + name // mark the event as captured
    }
    if (modifiers && modifiers.once) {
        delete modifiers.once
        name = "~" + name // mark the event as once
    }
    /* istanbul ignore if */
    if (modifiers && modifiers.passive) {
        delete modifiers.passive
        name = "&" + name // mark the event as passive
    }
    var events
    if (modifiers && modifiers.native) {
        delete modifiers.native
        events = el.nativeEvents || (el.nativeEvents = {})
    } else {
        events = el.events || (el.events = {})
    }
    var newHandler = { value: value, modifiers: modifiers }
    var handlers = events[name]
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler)
    } else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
    } else {
        events[name] = newHandler
    }
}

function getBindingAttr(el, name, getStatic) {
    var dynamicValue = getAndRemoveAttr(el, ":" + name) || getAndRemoveAttr(el, "v-bind:" + name)
    if (dynamicValue != null) {
        return parseFilters(dynamicValue)
    } else if (getStatic !== false) {
        var staticValue = getAndRemoveAttr(el, name)
        if (staticValue != null) {
            return JSON.stringify(staticValue)
        }
    }
}

function getAndRemoveAttr(el, name) {
    var val
    if ((val = el.attrsMap[name]) != null) {
        var list = el.attrsList
        for (var i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1)
                break
            }
        }
    }
    return val
}

/*  */

function transformNode(el, options) {
    var warn = options.warn || baseWarn
    var staticClass = getAndRemoveAttr(el, "class")
    if (process.env.NODE_ENV !== "production" && staticClass) {
        var expression = parseText(staticClass, options.delimiters)
        if (expression) {
            warn(
                'class="' +
                    staticClass +
                    '": ' +
                    "Interpolation inside attributes has been removed. " +
                    "Use v-bind or the colon shorthand instead. For example, " +
                    'instead of <div class="{{ val }}">, use <div :class="val">.'
            )
        }
    }
    if (staticClass) {
        el.staticClass = JSON.stringify(staticClass)
    }
    var classBinding = getBindingAttr(el, "class", false /* getStatic */)
    if (classBinding) {
        el.classBinding = classBinding
    }
}

function genData(el) {
    var data = ""
    if (el.staticClass) {
        data += "staticClass:" + el.staticClass + ","
    }
    if (el.classBinding) {
        data += "class:" + el.classBinding + ","
    }
    return data
}

var klass = {
    staticKeys: ["staticClass"],
    transformNode: transformNode,
    genData: genData
}

/*  */

var parseStyleText = cached(function(cssText) {
    var res = {}
    var listDelimiter = /;(?![^(]*\))/g
    var propertyDelimiter = /:(.+)/
    cssText.split(listDelimiter).forEach(function(item) {
        if (item) {
            var tmp = item.split(propertyDelimiter)
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
        }
    })
    return res
})

// normalize possible array / string values into Object

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */

/*  */

function transformNode$1(el, options) {
    var warn = options.warn || baseWarn
    var staticStyle = getAndRemoveAttr(el, "style")
    if (staticStyle) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production") {
            var expression = parseText(staticStyle, options.delimiters)
            if (expression) {
                warn(
                    'style="' +
                        staticStyle +
                        '": ' +
                        "Interpolation inside attributes has been removed. " +
                        "Use v-bind or the colon shorthand instead. For example, " +
                        'instead of <div style="{{ val }}">, use <div :style="val">.'
                )
            }
        }
        el.staticStyle = JSON.stringify(parseStyleText(staticStyle))
    }

    var styleBinding = getBindingAttr(el, "style", false /* getStatic */)
    if (styleBinding) {
        el.styleBinding = styleBinding
    }
}

function genData$1(el) {
    var data = ""
    if (el.staticStyle) {
        data += "staticStyle:" + el.staticStyle + ","
    }
    if (el.styleBinding) {
        data += "style:(" + el.styleBinding + "),"
    }
    return data
}

var style = {
    staticKeys: ["staticStyle"],
    transformNode: transformNode$1,
    genData: genData$1
}

var modules = [klass, style]

var ASSET_TYPES = ["component", "directive", "filter"]

var LIFECYCLE_HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestroy",
    "destroyed",
    "activated",
    "deactivated",
    "onLaunch",
    "onLoad",
    "onShow",
    "onReady",
    "onHide",
    "onUnload",
    "onPullDownRefresh",
    "onReachBottom",
    "onShareAppMessage",
    "onPageScroll",
    "onTabItemTap",
    "attached",
    "ready",
    "moved",
    "detached"
]

/*  */

var config = {
    /**
     * Option merge strategies (used in core/util/options)
     */
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: process.env.NODE_ENV !== "production",

    /**
     * Whether to enable devtools
     */
    devtools: process.env.NODE_ENV !== "production",

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
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel(el, value, modifiers) {
    var ref = modifiers || {}
    var number = ref.number
    var trim = ref.trim

    var baseValueExpression = "$$v"
    var valueExpression = baseValueExpression
    if (trim) {
        valueExpression =
            "(typeof " +
            baseValueExpression +
            " === 'string'" +
            "? " +
            baseValueExpression +
            ".trim()" +
            ": " +
            baseValueExpression +
            ")"
    }
    if (number) {
        valueExpression = "_n(" + valueExpression + ")"
    }
    var assignment = genAssignmentCode(value, valueExpression)

    el.model = {
        value: "(" + value + ")",
        expression: '"' + value + '"',
        callback: "function (" + baseValueExpression + ") {" + assignment + "}"
    }
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode(value, assignment) {
    var modelRs = parseModel(value)
    if (modelRs.idx === null) {
        return value + "=" + assignment
    } else {
        return "$set(" + modelRs.exp + ", " + modelRs.idx + ", " + assignment + ")"
    }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len
var str
var chr
var index
var expressionPos
var expressionEndPos

function parseModel(val) {
    str = val
    len = str.length
    index = expressionPos = expressionEndPos = 0

    if (val.indexOf("[") < 0 || val.lastIndexOf("]") < len - 1) {
        return {
            exp: val,
            idx: null
        }
    }

    while (!eof()) {
        chr = next()
        /* istanbul ignore if */
        if (isStringStart(chr)) {
            parseString(chr)
        } else if (chr === 0x5b) {
            parseBracket(chr)
        }
    }

    return {
        exp: val.substring(0, expressionPos),
        idx: val.substring(expressionPos + 1, expressionEndPos)
    }
}

function next() {
    return str.charCodeAt(++index)
}

function eof() {
    return index >= len
}

function isStringStart(chr) {
    return chr === 0x22 || chr === 0x27
}

function parseBracket(chr) {
    var inBracket = 1
    expressionPos = index
    while (!eof()) {
        chr = next()
        if (isStringStart(chr)) {
            parseString(chr)
            continue
        }
        if (chr === 0x5b) {
            inBracket++
        }
        if (chr === 0x5d) {
            inBracket--
        }
        if (inBracket === 0) {
            expressionEndPos = index
            break
        }
    }
}

function parseString(chr) {
    var stringQuote = chr
    while (!eof()) {
        chr = next()
        if (chr === stringQuote) {
            break
        }
    }
}

/*  */

var warn

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = "__r"
var CHECKBOX_RADIO_TOKEN = "__c"

function model(el, dir, _warn) {
    warn = _warn
    var value = dir.value
    var modifiers = dir.modifiers
    var tag = el.tag
    var type = el.attrsMap.type

    if (process.env.NODE_ENV !== "production") {
        var dynamicType = el.attrsMap["v-bind:type"] || el.attrsMap[":type"]
        if (tag === "input" && dynamicType) {
            warn(
                '<input :type="' +
                    dynamicType +
                    '" v-model="' +
                    value +
                    '">:\n' +
                    "v-model does not support dynamic input types. Use v-if branches instead."
            )
        }
        // inputs with type="file" are read only and setting the input's
        // value will throw an error.
        if (tag === "input" && type === "file") {
            warn(
                "<" +
                    el.tag +
                    ' v-model="' +
                    value +
                    '" type="file">:\n' +
                    "File inputs are read only. Use a v-on:change listener instead."
            )
        }
    }

    if (el.component) {
        genComponentModel(el, value, modifiers)
        // component v-model doesn't need extra runtime
        return false
    } else if (tag === "select") {
        genSelect(el, value, modifiers)
    } else if (tag === "input" && type === "checkbox") {
        genCheckboxModel(el, value, modifiers)
    } else if (tag === "input" && type === "radio") {
        genRadioModel(el, value, modifiers)
    } else if (tag === "input" || tag === "textarea") {
        genDefaultModel(el, value, modifiers)
    } else if (!config.isReservedTag(tag)) {
        genComponentModel(el, value, modifiers)
        // component v-model doesn't need extra runtime
        return false
    } else if (process.env.NODE_ENV !== "production") {
        warn(
            "<" +
                el.tag +
                ' v-model="' +
                value +
                '">: ' +
                "v-model is not supported on this element type. " +
                "If you are working with contenteditable, it's recommended to " +
                "wrap a library dedicated for that purpose inside a custom component."
        )
    }

    // ensure runtime directive metadata
    return true
}

function genCheckboxModel(el, value, modifiers) {
    var number = modifiers && modifiers.number
    var valueBinding = getBindingAttr(el, "value") || "null"
    var trueValueBinding = getBindingAttr(el, "true-value") || "true"
    var falseValueBinding = getBindingAttr(el, "false-value") || "false"
    addProp(
        el,
        "checked",
        "Array.isArray(" +
            value +
            ")" +
            "?_i(" +
            value +
            "," +
            valueBinding +
            ")>-1" +
            (trueValueBinding === "true"
                ? ":(" + value + ")"
                : ":_q(" + value + "," + trueValueBinding + ")")
    )
    addHandler(
        el,
        CHECKBOX_RADIO_TOKEN,
        "var $$a=" +
            value +
            "," +
            "$$el=$event.target," +
            "$$c=$$el.checked?(" +
            trueValueBinding +
            "):(" +
            falseValueBinding +
            ");" +
            "if(Array.isArray($$a)){" +
            "var $$v=" +
            (number ? "_n(" + valueBinding + ")" : valueBinding) +
            "," +
            "$$i=_i($$a,$$v);" +
            "if($$c){$$i<0&&(" +
            value +
            "=$$a.concat($$v))}" +
            "else{$$i>-1&&(" +
            value +
            "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
            "}else{" +
            genAssignmentCode(value, "$$c") +
            "}",
        null,
        true
    )
}

function genRadioModel(el, value, modifiers) {
    var number = modifiers && modifiers.number
    var valueBinding = getBindingAttr(el, "value") || "null"
    valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding
    addProp(el, "checked", "_q(" + value + "," + valueBinding + ")")
    addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true)
}

function genSelect(el, value, modifiers) {
    var number = modifiers && modifiers.number
    var selectedVal =
        "Array.prototype.filter" +
        ".call($event.target.options,function(o){return o.selected})" +
        '.map(function(o){var val = "_value" in o ? o._value : o.value;' +
        "return " +
        (number ? "_n(val)" : "val") +
        "})"

    var assignment = "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"
    var code = "var $$selectedVal = " + selectedVal + ";"
    code = code + " " + genAssignmentCode(value, assignment)
    addHandler(el, "change", code, null, true)
}

function genDefaultModel(el, value, modifiers) {
    var type = el.attrsMap.type
    var ref = modifiers || {}
    var lazy = ref.lazy
    var number = ref.number
    var trim = ref.trim
    var needCompositionGuard = !lazy && type !== "range"
    var event = lazy ? "change" : type === "range" ? RANGE_TOKEN : "input"

    var valueExpression = "$event.target.value"
    if (trim) {
        valueExpression = "$event.target.value.trim()"
    }
    if (number) {
        valueExpression = "_n(" + valueExpression + ")"
    }

    var code = genAssignmentCode(value, valueExpression)
    if (needCompositionGuard) {
        code = "if($event.target.composing)return;" + code
    }

    addProp(el, "value", "(" + value + ")")
    addHandler(el, event, code, null, true)
    if (trim || number) {
        addHandler(el, "blur", "$forceUpdate()")
    }
}

/*  */

function text(el, dir) {
    if (dir.value) {
        addProp(el, "textContent", "_s(" + dir.value + ")")
    }
}

/*  */

function html(el, dir) {
    if (dir.value) {
        addProp(el, "innerHTML", "_s(" + dir.value + ")")
    }
}

var directives = {
    model: model,
    text: text,
    html: html
}

/*  */

var isUnaryTag$2 = makeMap(
    "area,base,br,col,embed,frame,hr,img,input,isindex,keygen," + "link,meta,param,source,track,wbr"
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag$2 = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source")

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag$1 = makeMap(
    "address,article,aside,base,blockquote,body,caption,col,colgroup,dd," +
        "details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form," +
        "h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta," +
        "optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead," +
        "title,tr,track"
)

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
}

/*  */

var warn$2 = noop
var tip = noop
var formatComponentName = null // work around flow check

if (process.env.NODE_ENV !== "production") {
    var hasConsole = typeof console !== "undefined"
    var classifyRE = /(?:^|[-_])(\w)/g
    var classify = function(str) {
        return str
            .replace(classifyRE, function(c) {
                return c.toUpperCase()
            })
            .replace(/[-_]/g, "")
    }

    warn$2 = function(msg, vm) {
        var trace = vm ? generateComponentTrace(vm) : ""

        if (config.warnHandler) {
            config.warnHandler.call(null, msg, vm, trace)
        } else if (hasConsole && !config.silent) {
            console.error("[Vue warn]: " + msg + trace)
        }
    }

    tip = function(msg, vm) {
        if (hasConsole && !config.silent) {
            console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ""))
        }
    }

    formatComponentName = function(vm, includeFile) {
        if (vm.$root === vm) {
            return "<Root>"
        }
        var name =
            typeof vm === "string"
                ? vm
                : typeof vm === "function" && vm.options
                    ? vm.options.name
                    : vm._isVue
                        ? vm.$options.name || vm.$options._componentTag
                        : vm.name

        var file = vm._isVue && vm.$options.__file
        if (!name && file) {
            var match = file.match(/([^/\\]+)\.vue$/)
            name = match && match[1]
        }

        return (
            (name ? "<" + classify(name) + ">" : "<Anonymous>") +
            (file && includeFile !== false ? " at " + file : "")
        )
    }

    var repeat = function(str, n) {
        var res = ""
        while (n) {
            if (n % 2 === 1) {
                res += str
            }
            if (n > 1) {
                str += str
            }
            n >>= 1
        }
        return res
    }

    var generateComponentTrace = function(vm) {
        if (vm._isVue && vm.$parent) {
            var tree = []
            var currentRecursiveSequence = 0
            while (vm) {
                if (tree.length > 0) {
                    var last = tree[tree.length - 1]
                    if (last.constructor === vm.constructor) {
                        currentRecursiveSequence++
                        vm = vm.$parent
                        continue
                    } else if (currentRecursiveSequence > 0) {
                        tree[tree.length - 1] = [last, currentRecursiveSequence]
                        currentRecursiveSequence = 0
                    }
                }
                tree.push(vm)
                vm = vm.$parent
            }
            return (
                "\n\nfound in\n\n" +
                tree
                    .map(function(vm, i) {
                        return (
                            "" +
                            (i === 0 ? "---> " : repeat(" ", 5 + i * 2)) +
                            (Array.isArray(vm)
                                ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)"
                                : formatComponentName(vm))
                        )
                    })
                    .join("\n")
            )
        } else {
            return "\n\n(found in " + formatComponentName(vm) + ")"
        }
    }
}

/*  */

function handleError(err, vm, info) {
    if (config.errorHandler) {
        config.errorHandler.call(null, err, vm, info)
    } else {
        if (process.env.NODE_ENV !== "production") {
            warn$2("Error in " + info + ': "' + err.toString() + '"', vm)
        }
        /* istanbul ignore else */
        if (inBrowser && typeof console !== "undefined") {
            //fixed by xxxxxx
            //console.error(err);
        } else {
            throw err
        }
    }
}

/*  */

// can we use __proto__?
var hasProto = "__proto__" in {}

// Browser environment sniffing
var inBrowser = typeof window !== "undefined"
var UA = ["mpvue-runtime"].join()
var isIE = UA && /msie|trident/.test(UA)
var isIE9 = UA && UA.indexOf("msie 9.0") > 0
var isEdge = UA && UA.indexOf("edge/") > 0
var isAndroid = UA && UA.indexOf("android") > 0
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = {}.watch

var supportsPassive = false
if (inBrowser) {
    try {
        var opts = {}
        Object.defineProperty(opts, "passive", {
            get: function get() {
                /* istanbul ignore next */
                supportsPassive = true
            }
        }) // https://github.com/facebook/flow/issues/285
        window.addEventListener("test-passive", null, opts)
    } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer
var isServerRendering = function() {
    if (_isServer === undefined) {
        /* istanbul ignore if */
        if (!inBrowser && typeof global !== "undefined") {
            // detect presence of vue-server-renderer and avoid
            // Webpack shimming the process
            _isServer = global["process"].env.VUE_ENV === "server"
        } else {
            _isServer = false
        }
    }
    return _isServer
}

// detect devtools

/* istanbul ignore next */
function isNative(Ctor) {
    return typeof Ctor === "function" && /native code/.test(Ctor.toString())
}

var hasSymbol =
    typeof Symbol !== "undefined" &&
    isNative(Symbol) &&
    typeof Reflect !== "undefined" &&
    isNative(Reflect.ownKeys)

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function() {
    var callbacks = []
    var pending = false
    var timerFunc

    function nextTickHandler() {
        pending = false
        var copies = callbacks.slice(0)
        callbacks.length = 0
        for (var i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */
    if (typeof Promise !== "undefined" && isNative(Promise)) {
        var p = Promise.resolve()
        var logError = function(err) {
            console.error(err)
        }
        timerFunc = function() {
            p.then(nextTickHandler).catch(logError)
            // in problematic UIWebViews, Promise.then doesn't completely break, but
            // it can get stuck in a weird state where callbacks are pushed into the
            // microtask queue but the queue isn't being flushed, until the browser
            // needs to do some other work, e.g. handle a timer. Therefore we can
            // "force" the microtask queue to be flushed by adding an empty timer.
            if (isIOS) {
                setTimeout(noop)
            }
        }
        // } else if (typeof MutationObserver !== 'undefined' && (
        //   isNative(MutationObserver) ||
        //   // PhantomJS and iOS 7.x
        //   MutationObserver.toString() === '[object MutationObserverConstructor]'
        // )) {
        //   // use MutationObserver where native Promise is not available,
        //   // e.g. PhantomJS IE11, iOS7, Android 4.4
        //   var counter = 1
        //   var observer = new MutationObserver(nextTickHandler)
        //   var textNode = document.createTextNode(String(counter))
        //   observer.observe(textNode, {
        //     characterData: true
        //   })
        //   timerFunc = () => {
        //     counter = (counter + 1) % 2
        //     textNode.data = String(counter)
        //   }
    } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        timerFunc = function() {
            setTimeout(nextTickHandler, 0)
        }
    }

    return function queueNextTick(cb, ctx) {
        var _resolve
        callbacks.push(function() {
            if (cb) {
                try {
                    cb.call(ctx)
                } catch (e) {
                    handleError(e, ctx, "nextTick")
                }
            } else if (_resolve) {
                _resolve(ctx)
            }
        })
        if (!pending) {
            pending = true
            timerFunc()
        }
        if (!cb && typeof Promise !== "undefined") {
            return new Promise(function(resolve, reject) {
                _resolve = resolve
            })
        }
    }
})()

var _Set
/* istanbul ignore if */
if (typeof Set !== "undefined" && isNative(Set)) {
    // use native Set when available.
    _Set = Set
} else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = (function() {
        function Set() {
            this.set = Object.create(null)
        }
        Set.prototype.has = function has(key) {
            return this.set[key] === true
        }
        Set.prototype.add = function add(key) {
            this.set[key] = true
        }
        Set.prototype.clear = function clear() {
            this.set = Object.create(null)
        }

        return Set
    })()
}

/*  */

var onRE = /^@|^v-on:/
var dirRE = /^v-|^@|^:/
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/
// fix: 解决括号内无,和iterator时匹配错误的问题 fix by gsq
var forIteratorRE = /\((\{[^}]*\}|[^,]*),?([^,]*)(?:,([^,]*))?\)/

var argRE = /:(.*)$/
var bindRE = /^:|^v-bind:/
var modifierRE = /\.[^.]+/g

var decodeHTMLCached = cached(he.decode)

// configurable state
var warn$1
var delimiters
var transforms
var preTransforms
var postTransforms
var platformIsPreTag
var platformMustUseProp
var platformGetTagNamespace

/**
 * Convert HTML string to AST.
 */
function parse(template$$1, options) {
    warn$1 = options.warn || baseWarn

    platformIsPreTag = options.isPreTag || no
    platformMustUseProp = options.mustUseProp || no
    platformGetTagNamespace = options.getTagNamespace || no

    transforms = pluckModuleFunction(options.modules, "transformNode")
    preTransforms = pluckModuleFunction(options.modules, "preTransformNode")
    postTransforms = pluckModuleFunction(options.modules, "postTransformNode")

    delimiters = options.delimiters

    var stack = []
    var preserveWhitespace = options.preserveWhitespace !== false
    var root
    var currentParent
    var inVPre = false
    var inPre = false
    var warned = false

    function warnOnce(msg) {
        if (!warned) {
            warned = true
            warn$1(msg)
        }
    }

    function endPre(element) {
        // check pre state
        if (element.pre) {
            inVPre = false
        }
        if (platformIsPreTag(element.tag)) {
            inPre = false
        }
        
        // apply post-transforms
        for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
            postTransforms[i$2](element, options)
        }
    }

    parseHTML(template$$1, {
        warn: warn$1,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        shouldKeepComment: options.comments,
        start: function start(tag, attrs, unary) {
            // check namespace.
            // inherit parent ns if there is one
            var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

            // handle IE svg bug
            /* istanbul ignore if */
            if (isIE && ns === "svg") {
                attrs = guardIESVGBug(attrs)
            }

            var element = {
                type: 1,
                tag: tag,
                attrsList: attrs,
                attrsMap: makeAttrsMap(attrs),
                parent: currentParent,
                children: []
            }
            if (ns) {
                element.ns = ns
            }

            if (isForbiddenTag(element) && !isServerRendering()) {
                element.forbidden = true
                process.env.NODE_ENV !== "production" &&
                    warn$1(
                        "Templates should only be responsible for mapping the state to the " +
                            "UI. Avoid placing tags with side-effects in your templates, such as " +
                            "<" +
                            tag +
                            ">" +
                            ", as they will not be parsed."
                    )
            }

            // apply pre-transforms
            for (var i = 0; i < preTransforms.length; i++) {
                preTransforms[i](element, options)
            }

            if (!inVPre) {
                processPre(element)
                if (element.pre) {
                    inVPre = true
                }
            }
            if (platformIsPreTag(element.tag)) {
                inPre = true
            }
            if (inVPre) {
                processRawAttrs(element)
            } else {
                processFor(element)
                processIf(element)
                processOnce(element)
                processKey(element)

                // determine whether this is a plain element after
                // removing structural attributes
                element.plain = !element.key && !attrs.length

                processRef(element)
                processSlot(element)
                processComponent(element)
                for (var i$1 = 0; i$1 < transforms.length; i$1++) {
                    transforms[i$1](element, options)
                }
                processAttrs(element)
            }

            function checkRootConstraints(el) {
                if (process.env.NODE_ENV !== "production") {
                    if (el.tag === "slot" || el.tag === "template") {
                        warnOnce(
                            "Cannot use <" +
                                el.tag +
                                "> as component root element because it may " +
                                "contain multiple nodes."
                        )
                    }
                    if (el.attrsMap.hasOwnProperty("v-for")) {
                        warnOnce(
                            "Cannot use v-for on stateful component root element because " +
                                "it renders multiple elements."
                        )
                    }
                }
            }

            // tree management
            if (!root) {
                root = element
                checkRootConstraints(root)
            } else if (!stack.length) {
                // allow root elements with v-if, v-else-if and v-else
                if (root.if && (element.elseif || element.else)) {
                    checkRootConstraints(element)
                    addIfCondition(root, {
                        exp: element.elseif,
                        block: element
                    })
                } else if (process.env.NODE_ENV !== "production") {
                    warnOnce(
                        "Component template should contain exactly one root element. " +
                            "If you are using v-if on multiple elements, " +
                            "use v-else-if to chain them instead."
                    )
                }
            }
            if (currentParent && !element.forbidden) {
                if (element.elseif || element.else) {
                    processIfConditions(element, currentParent)
                } else if (element.slotScope) {
                    // scoped slot
                    currentParent.plain = false
                    var name = element.slotTarget || '"default"'
                    ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
                } else {
                    currentParent.children.push(element)
                    element.parent = currentParent
                }
            }
            if (!unary) {
                currentParent = element
                stack.push(element)
            } else {
                endPre(element)
            }
        },

        end: function end() {
            // remove trailing whitespace
            var element = stack[stack.length - 1]
            var lastNode = element.children[element.children.length - 1]
            if (lastNode && lastNode.type === 3 && lastNode.text === " " && !inPre) {
                element.children.pop()
            }
            // pop stack
            stack.length -= 1
            currentParent = stack[stack.length - 1]
            endPre(element)
        },

        chars: function chars(text) {
            if (!currentParent) {
                if (process.env.NODE_ENV !== "production") {
                    if (text === template$$1) {
                        warnOnce(
                            "Component template requires a root element, rather than just text."
                        )
                    } else if ((text = text.trim())) {
                        warnOnce('text "' + text + '" outside root element will be ignored.')
                    }
                }
                return
            }
            // IE textarea placeholder bug
            /* istanbul ignore if */
            if (
                isIE &&
                currentParent.tag === "textarea" &&
                currentParent.attrsMap.placeholder === text
            ) {
                return
            }
            var children = currentParent.children
            text =
                inPre || text.trim()
                    ? isTextTag(currentParent)
                        ? text
                        : decodeHTMLCached(text)
                    : // only preserve whitespace if its not right after a starting tag
                      preserveWhitespace && children.length
                        ? " "
                        : ""
            if (text) {
                var expression
                if (!inVPre && text !== " " && (expression = parseText(text, delimiters))) {
                    children.push({
                        type: 2,
                        expression: expression,
                        text: text
                    })
                } else if (
                    text !== " " ||
                    !children.length ||
                    children[children.length - 1].text !== " "
                ) {
                    children.push({
                        type: 3,
                        text: text
                    })
                }
            }
        },
        comment: function comment(text) {
            currentParent.children.push({
                type: 3,
                text: text,
                isComment: true
            })
        }
    })
    return root
}

function processPre(el) {
    if (getAndRemoveAttr(el, "v-pre") != null) {
        el.pre = true
    }
}

function processRawAttrs(el) {
    var l = el.attrsList.length
    if (l) {
        var attrs = (el.attrs = new Array(l))
        for (var i = 0; i < l; i++) {
            attrs[i] = {
                name: el.attrsList[i].name,
                value: JSON.stringify(el.attrsList[i].value)
            }
        }
    } else if (!el.pre) {
        // non root node in pre blocks with no attributes
        el.plain = true
    }
}

function processKey(el) {
    var exp = getBindingAttr(el, "key")
    if (exp) {
        if (process.env.NODE_ENV !== "production" && el.tag === "template") {
            warn$1("<template> cannot be keyed. Place the key on real elements instead.")
        }
        el.key = exp
    }
}

function processRef(el) {
    var ref = getBindingAttr(el, "ref")
    if (ref) {
        el.ref = ref
        el.refInFor = checkInFor(el)
    }
}

function processFor(el) {
    var exp
    if ((exp = getAndRemoveAttr(el, "v-for"))) {
        var inMatch = exp.match(forAliasRE)
        if (!inMatch) {
            process.env.NODE_ENV !== "production" && warn$1("Invalid v-for expression: " + exp)
            return
        }
        el.for = inMatch[2].trim()
        var alias = inMatch[1].trim()
        var iteratorMatch = alias.match(forIteratorRE)
        if (iteratorMatch) {
            el.alias = iteratorMatch[1].trim()
            el.iterator1 = iteratorMatch[2].trim()
            if (iteratorMatch[3]) {
                el.iterator2 = iteratorMatch[3].trim()
            }
        } else {
            el.alias = alias
        }
    }
}

function processIf(el) {
    var exp = getAndRemoveAttr(el, "v-if")
    if (exp) {
        el.if = exp
        addIfCondition(el, {
            exp: exp,
            block: el
        })
    } else {
        if (getAndRemoveAttr(el, "v-else") != null) {
            el.else = true
        }
        var elseif = getAndRemoveAttr(el, "v-else-if")
        if (elseif) {
            el.elseif = elseif
        }
    }
}

function processIfConditions(el, parent) {
    var prev = findPrevElement(parent.children)
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el
        })
    } else if (process.env.NODE_ENV !== "production") {
        warn$1(
            "v-" +
                (el.elseif ? 'else-if="' + el.elseif + '"' : "else") +
                " " +
                "used on element <" +
                el.tag +
                "> without corresponding v-if."
        )
    }
}

function findPrevElement(children) {
    var i = children.length
    while (i--) {
        if (children[i].type === 1) {
            return children[i]
        } else {
            if (process.env.NODE_ENV !== "production" && children[i].text !== " ") {
                warn$1(
                    'text "' +
                        children[i].text.trim() +
                        '" between v-if and v-else(-if) ' +
                        "will be ignored."
                )
            }
            children.pop()
        }
    }
}

function addIfCondition(el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = []
    }
    el.ifConditions.push(condition)
}

function processOnce(el) {
    var once$$1 = getAndRemoveAttr(el, "v-once")
    if (once$$1 != null) {
        el.once = true
    }
}

function processSlot(el) {
    if (el.tag === "slot") {
        el.slotName = getBindingAttr(el, "name")
        if (process.env.NODE_ENV !== "production" && el.key) {
            warn$1(
                "`key` does not work on <slot> because slots are abstract outlets " +
                    "and can possibly expand into multiple elements. " +
                    "Use the key on a wrapping element instead."
            )
        }
    } else {
        var slotTarget = getBindingAttr(el, "slot")
        if (slotTarget) {
            el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget
        }
        if (el.tag === "template") {
            el.slotScope = getAndRemoveAttr(el, "scope")
        }
    }
}

function processComponent(el) {
    var binding
    if ((binding = getBindingAttr(el, "is"))) {
        el.component = binding
    }
    if (getAndRemoveAttr(el, "inline-template") != null) {
        el.inlineTemplate = true
    }
}

function processAttrs(el) {
    var list = el.attrsList
    var i, l, name, rawName, value, modifiers, isProp
    for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name
        value = list[i].value
        if (dirRE.test(name)) {
            // mark element as dynamic
            el.hasBindings = true
            // modifiers
            modifiers = parseModifiers(name)
            if (modifiers) {
                name = name.replace(modifierRE, "")
            }
            if (bindRE.test(name)) {
                // v-bind
                name = name.replace(bindRE, "")
                value = parseFilters(value)
                isProp = false
                if (modifiers) {
                    if (modifiers.prop) {
                        isProp = true
                        name = camelize(name)
                        if (name === "innerHtml") {
                            name = "innerHTML"
                        }
                    }
                    if (modifiers.camel) {
                        name = camelize(name)
                    }
                    if (modifiers.sync) {
                        addHandler(
                            el,
                            "update:" + camelize(name),
                            genAssignmentCode(value, "$event")
                        )
                    }
                }
                if (
                    !el.component &&
                    (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name))
                ) {
                    addProp(el, name, value)
                } else {
                    addAttr(el, name, value)
                }
            } else if (onRE.test(name)) {
                // v-on
                name = name.replace(onRE, "")
                addHandler(el, name, value, modifiers, false, warn$1)
            } else {
                // normal directives
                name = name.replace(dirRE, "")
                // parse arg
                var argMatch = name.match(argRE)
                var arg = argMatch && argMatch[1]
                if (arg) {
                    name = name.slice(0, -(arg.length + 1))
                }
                addDirective(el, name, rawName, value, arg, modifiers)
                if (process.env.NODE_ENV !== "production" && name === "model") {
                    checkForAliasModel(el, value)
                }
            }
        } else {
            // literal attribute
            if (process.env.NODE_ENV !== "production") {
                var expression = parseText(value, delimiters)
                if (expression) {
                    warn$1(
                        name +
                            '="' +
                            value +
                            '": ' +
                            "Interpolation inside attributes has been removed. " +
                            "Use v-bind or the colon shorthand instead. For example, " +
                            'instead of <div id="{{ val }}">, use <div :id="val">.'
                    )
                }
            }
            addAttr(el, name, JSON.stringify(value))
        }
    }
}

function checkInFor(el) {
    var parent = el
    while (parent) {
        if (parent.for !== undefined) {
            return true
        }
        parent = parent.parent
    }
    return false
}

function parseModifiers(name) {
    var match = name.match(modifierRE)
    if (match) {
        var ret = {}
        match.forEach(function(m) {
            ret[m.slice(1)] = true
        })
        return ret
    }
}

function makeAttrsMap(attrs) {
    var map = {}
    for (var i = 0, l = attrs.length; i < l; i++) {
        if (process.env.NODE_ENV !== "production" && map[attrs[i].name] && !isIE && !isEdge) {
            warn$1("duplicate attribute: " + attrs[i].name)
        }
        map[attrs[i].name] = attrs[i].value
    }
    return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag(el) {
    return el.tag === "script" || el.tag === "style"
}

function isForbiddenTag(el) {
    return (
        el.tag === "style" ||
        (el.tag === "script" && (!el.attrsMap.type || el.attrsMap.type === "text/javascript"))
    )
}

var ieNSBug = /^xmlns:NS\d+/
var ieNSPrefix = /^NS\d+:/

/* istanbul ignore next */
function guardIESVGBug(attrs) {
    var res = []
    for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i]
        if (!ieNSBug.test(attr.name)) {
            attr.name = attr.name.replace(ieNSPrefix, "")
            res.push(attr)
        }
    }
    return res
}

function checkForAliasModel(el, value) {
    var _el = el
    while (_el) {
        if (_el.for && _el.alias === value) {
            warn$1(
                "<" +
                    el.tag +
                    ' v-model="' +
                    value +
                    '">: ' +
                    "You are binding v-model directly to a v-for iteration alias. " +
                    "This will not be able to modify the v-for source array because " +
                    "writing to the alias is like modifying a function local variable. " +
                    "Consider using an array of objects and use v-model on an object property instead."
            )
        }
        _el = _el.parent
    }
}

/*  */

var isStaticKey
var isPlatformReservedTag

var genStaticKeysCached = cached(genStaticKeys$1)

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
function optimize(root, options) {
    if (!root) {
        return
    }
    isStaticKey = genStaticKeysCached(options.staticKeys || "")
    isPlatformReservedTag = options.isReservedTag || no
    // first pass: mark all non-static nodes.
    markStatic(root)
    // second pass: mark static roots.
    markStaticRoots(root, false)
}

function genStaticKeys$1(keys) {
    return makeMap(
        "type,tag,attrsList,attrsMap,plain,parent,children,attrs" + (keys ? "," + keys : "")
    )
}

function markStatic(node) {
    node.static = isStatic(node)
    if (node.type === 1) {
        // do not make component slot content static. this avoids
        // 1. components not able to mutate slot nodes
        // 2. static slot content fails for hot-reloading
        if (
            !isPlatformReservedTag(node.tag) &&
            node.tag !== "slot" &&
            node.attrsMap["inline-template"] == null
        ) {
            return
        }
        for (var i = 0, l = node.children.length; i < l; i++) {
            var child = node.children[i]
            markStatic(child)
            if (!child.static) {
                node.static = false
            }
        }
        if (node.ifConditions) {
            for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
                var block = node.ifConditions[i$1].block
                markStatic(block)
                if (!block.static) {
                    node.static = false
                }
            }
        }
    }
}

function markStaticRoots(node, isInFor) {
    if (node.type === 1) {
        if (node.static || node.once) {
            node.staticInFor = isInFor
        }
        // For a node to qualify as a static root, it should have children that
        // are not just static text. Otherwise the cost of hoisting out will
        // outweigh the benefits and it's better off to just always render it fresh.
        if (
            node.static &&
            node.children.length &&
            !(node.children.length === 1 && node.children[0].type === 3)
        ) {
            node.staticRoot = true
            return
        } else {
            node.staticRoot = false
        }
        if (node.children) {
            for (var i = 0, l = node.children.length; i < l; i++) {
                markStaticRoots(node.children[i], isInFor || !!node.for)
            }
        }
        if (node.ifConditions) {
            for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
                markStaticRoots(node.ifConditions[i$1].block, isInFor)
            }
        }
    }
}

function isStatic(node) {
    if (node.type === 2) {
        // expression
        return false
    }
    if (node.type === 3) {
        // text
        return true
    }
    return !!(
        node.pre ||
        (!node.hasBindings && // no dynamic bindings
        !node.if &&
        !node.for && // not v-if or v-for or v-else
        !isBuiltInTag(node.tag) && // not a built-in
        isPlatformReservedTag(node.tag) && // not a component
            !isDirectChildOfTemplateFor(node) &&
            Object.keys(node).every(isStaticKey))
    )
}

function isDirectChildOfTemplateFor(node) {
    while (node.parent) {
        node = node.parent
        if (node.tag !== "template") {
            return false
        }
        if (node.for) {
            return true
        }
    }
    return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/

// keyCode aliases
var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    delete: [8, 46]
}

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function(condition) {
    return "if(" + condition + ")return null;"
}

var modifierCode = {
    stop: "$event.stopPropagation();",
    prevent: "$event.preventDefault();",
    self: genGuard("$event.target !== $event.currentTarget"),
    ctrl: genGuard("!$event.ctrlKey"),
    shift: genGuard("!$event.shiftKey"),
    alt: genGuard("!$event.altKey"),
    meta: genGuard("!$event.metaKey"),
    left: genGuard("'button' in $event && $event.button !== 0"),
    middle: genGuard("'button' in $event && $event.button !== 1"),
    right: genGuard("'button' in $event && $event.button !== 2")
}

function genHandlers(events, isNative, warn) {
    var res = isNative ? "nativeOn:{" : "on:{"
    for (var name in events) {
        var handler = events[name]
        // #5330: warn click.right, since right clicks do not actually fire click events.
        if (
            process.env.NODE_ENV !== "production" &&
            name === "click" &&
            handler &&
            handler.modifiers &&
            handler.modifiers.right
        ) {
            warn(
                'Use "contextmenu" instead of "click.right" since right clicks ' +
                    'do not actually fire "click" events.'
            )
        }
        res += '"' + name + '":' + genHandler(name, handler) + ","
    }
    return res.slice(0, -1) + "}"
}

function genHandler(name, handler) {
    if (!handler) {
        return "function(){}"
    }

    if (Array.isArray(handler)) {
        return (
            "[" +
            handler
                .map(function(handler) {
                    return genHandler(name, handler)
                })
                .join(",") +
            "]"
        )
    }

    var isMethodPath = simplePathRE.test(handler.value)
    var isFunctionExpression = fnExpRE.test(handler.value)

    if (!handler.modifiers) {
        return isMethodPath || isFunctionExpression
            ? handler.value
            : "function($event){" + handler.value + "}" // inline statement
    } else {
        var code = ""
        var genModifierCode = ""
        var keys = []
        for (var key in handler.modifiers) {
            if (modifierCode[key]) {
                genModifierCode += modifierCode[key]
                // left/right
                if (keyCodes[key]) {
                    keys.push(key)
                }
            } else {
                keys.push(key)
            }
        }
        if (keys.length) {
            code += genKeyFilter(keys)
        }
        // Make sure modifiers like prevent and stop get executed after key filtering
        if (genModifierCode) {
            code += genModifierCode
        }
        var handlerCode = isMethodPath
            ? handler.value + "($event)"
            : isFunctionExpression
                ? "(" + handler.value + ")($event)"
                : handler.value
        return "function($event){" + code + handlerCode + "}"
    }
}

function genKeyFilter(keys) {
    return "if(!('button' in $event)&&" + keys.map(genFilterCode).join("&&") + ")return null;"
}

function genFilterCode(key) {
    var keyVal = parseInt(key, 10)
    if (keyVal) {
        return "$event.keyCode!==" + keyVal
    }
    var alias = keyCodes[key]
    return (
        "_k($event.keyCode," +
        JSON.stringify(key) +
        (alias ? "," + JSON.stringify(alias) : "") +
        ")"
    )
}

/*  */

var emptyObject = Object.freeze({})

/**
 * Check if a string starts with $ or _
 */

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

/*  */

var uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
    this.id = uid++
    this.subs = []
}

Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub)
}

Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub)
}

Dep.prototype.depend = function depend() {
    if (Dep.target) {
        Dep.target.addDep(this)
    }
}

Dep.prototype.notify = function notify() {
    // stabilize the subscriber list first
    var subs = this.subs.slice()
    for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update()
    }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype
var arrayMethods = Object.create(arrayProto)
;["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function(method) {
    // cache original method
    var original = arrayProto[method]
    def(arrayMethods, method, function mutator() {
        var args = [],
            len = arguments.length
        while (len--) args[len] = arguments[len]

        var result = original.apply(this, args)
        var ob = this.__ob__
        var inserted
        switch (method) {
            case "push":
            case "unshift":
                inserted = args
                break
            case "splice":
                inserted = args.slice(2)
                break
        }
        if (inserted) {
            ob.observeArray(inserted)
        }
        // notify change
        ob.dep.notify()
        return result
    })
})

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
    shouldConvert: true
}

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, "__ob__", this)
    if (Array.isArray(value)) {
        var augment = hasProto ? protoAugment : copyAugment
        augment(value, arrayMethods, arrayKeys)
        this.observeArray(value)
    } else {
        this.walk(value)
    }
}

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
    var keys = Object.keys(obj)
    for (var i = 0; i < keys.length; i++) {
        defineReactive$$1(obj, keys[i], obj[keys[i]])
    }
}

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
    for (var i = 0, l = items.length; i < l; i++) {
        observe(items[i])
    }
}

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
    /* eslint-disable no-proto */
    target.__proto__ = src
    /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i]
        def(target, key, src[key])
    }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
    if (!isObject(value)) {
        return
    }
    var ob
    if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (
        observerState.shouldConvert &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
    ) {
        ob = new Observer(value)
    }
    if (asRootData && ob) {
        ob.vmCount++
    }
    return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(obj, key, val, customSetter, shallow) {
    var dep = new Dep()

    var property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get
    var setter = property && property.set

    var childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            var value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
                if (Array.isArray(value)) {
                    dependArray(value)
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            var value = getter ? getter.call(obj) : val
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            /* eslint-enable no-self-compare */
            if (process.env.NODE_ENV !== "production" && customSetter) {
                customSetter()
            }
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = !shallow && observe(newVal)
            dep.notify()
        }
    })
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    if (hasOwn(target, key)) {
        target[key] = val
        return val
    }
    var ob = target.__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== "production" &&
            warn$2(
                "Avoid adding reactive properties to a Vue instance or its root $data " +
                    "at runtime - declare it upfront in the data option."
            )
        return val
    }
    if (!ob) {
        target[key] = val
        return val
    }
    defineReactive$$1(ob.value, key, val)
    ob.dep.notify()
    return val
}

/**
 * Delete a property and trigger change if necessary.
 */

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
    for (var e = void 0, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== "production") {
    strats.el = strats.propsData = function(parent, child, vm, key) {
        if (!vm) {
            warn$2(
                'option "' +
                    key +
                    '" can only be used during instance ' +
                    "creation with the `new` keyword."
            )
        }
        return defaultStrat(parent, child)
    }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
    if (!from) {
        return to
    }
    var key, toVal, fromVal
    var keys = Object.keys(from)
    for (var i = 0; i < keys.length; i++) {
        key = keys[i]
        toVal = to[key]
        fromVal = from[key]
        if (!hasOwn(to, key)) {
            set(to, key, fromVal)
        } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal)
        }
    }
    return to
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
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
        return function mergedDataFn() {
            return mergeData(
                typeof childVal === "function" ? childVal.call(this) : childVal,
                parentVal.call(this)
            )
        }
    } else if (parentVal || childVal) {
        return function mergedInstanceDataFn() {
            // instance merge
            var instanceData = typeof childVal === "function" ? childVal.call(vm) : childVal
            var defaultData = typeof parentVal === "function" ? parentVal.call(vm) : undefined
            if (instanceData) {
                return mergeData(instanceData, defaultData)
            } else {
                return defaultData
            }
        }
    }
}

strats.data = function(parentVal, childVal, vm) {
    if (!vm) {
        if (childVal && typeof childVal !== "function") {
            process.env.NODE_ENV !== "production" &&
                warn$2(
                    'The "data" option should be a function ' +
                        "that returns a per-instance value in component " +
                        "definitions.",
                    vm
                )

            return parentVal
        }
        return mergeDataOrFn.call(this, parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
}

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
    return childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal
}

LIFECYCLE_HOOKS.forEach(function(hook) {
    strats[hook] = mergeHook
})

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal) {
    var res = Object.create(parentVal || null)
    return childVal ? extend(res, childVal) : res
}

ASSET_TYPES.forEach(function(type) {
    strats[type + "s"] = mergeAssets
})

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function(parentVal, childVal) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) {
        parentVal = undefined
    }
    if (childVal === nativeWatch) {
        childVal = undefined
    }
    /* istanbul ignore if */
    if (!childVal) {
        return Object.create(parentVal || null)
    }
    if (!parentVal) {
        return childVal
    }
    var ret = {}
    extend(ret, parentVal)
    for (var key in childVal) {
        var parent = ret[key]
        var child = childVal[key]
        if (parent && !Array.isArray(parent)) {
            parent = [parent]
        }
        ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child]
    }
    return ret
}

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal) {
    if (!childVal) {
        return Object.create(parentVal || null)
    }
    if (!parentVal) {
        return childVal
    }
    var ret = Object.create(null)
    extend(ret, parentVal)
    extend(ret, childVal)
    return ret
}
strats.provide = mergeDataOrFn

/**
 * Default strategy.
 */
var defaultStrat = function(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal
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

function on(el, dir) {
    if (process.env.NODE_ENV !== "production" && dir.modifiers) {
        warn$2("v-on without argument does not support modifiers.")
    }
    el.wrapListeners = function(code) {
        return "_g(" + code + "," + dir.value + ")"
    }
}

/*  */

function bind$1(el, dir) {
    el.wrapData = function(code) {
        return (
            "_b(" +
            code +
            ",'" +
            el.tag +
            "'," +
            dir.value +
            "," +
            (dir.modifiers && dir.modifiers.prop ? "true" : "false") +
            (dir.modifiers && dir.modifiers.sync ? ",true" : "") +
            ")"
        )
    }
}

/*  */

var baseDirectives = {
    on: on,
    bind: bind$1,
    cloak: noop
}

/*  */

var CodegenState = function CodegenState(options) {
    this.options = options
    this.warn = options.warn || baseWarn
    this.transforms = pluckModuleFunction(options.modules, "transformCode")
    this.dataGenFns = pluckModuleFunction(options.modules, "genData")
    this.directives = extend(extend({}, baseDirectives), options.directives)
    var isReservedTag = options.isReservedTag || no
    this.maybeComponent = function(el) {
        return !isReservedTag(el.tag)
    }
    this.onceId = 0
    this.staticRenderFns = []
}

function generate$1(ast, options) {
    var state = new CodegenState(options)
    var code = ast ? genElement(ast, state) : '_c("div")'
    return {
        render: "with(this){return " + code + "}",
        staticRenderFns: state.staticRenderFns
    }
}

function genElement(el, state) {
    if (el.staticRoot && !el.staticProcessed) {
        return genStatic(el, state)
    } else if (el.once && !el.onceProcessed) {
        return genOnce(el, state)
    } else if (el.for && !el.forProcessed) {
        return genFor(el, state)
    } else if (el.if && !el.ifProcessed) {
        return genIf(el, state)
    } else if (el.tag === "template" && !el.slotTarget) {
        return genChildren(el, state) || "void 0"
    } else if (el.tag === "slot") {
        return genSlot(el, state)
    } else {
        // component or element
        var code
        if (el.component) {
            code = genComponent(el.component, el, state)
        } else {
            var data = el.plain ? undefined : genData$2(el, state)

            var children = el.inlineTemplate ? null : genChildren(el, state, true)
            code =
                "_c('" +
                el.tag +
                "'" +
                (data ? "," + data : "") +
                (children ? "," + children : "") +
                ")"
        }
        // module transforms
        for (var i = 0; i < state.transforms.length; i++) {
            code = state.transforms[i](el, code)
        }
        return code
    }
}

// hoist static sub-trees out
function genStatic(el, state) {
    el.staticProcessed = true
    state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}")
    return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ",true" : "") + ")"
}

// v-once
function genOnce(el, state) {
    el.onceProcessed = true
    if (el.if && !el.ifProcessed) {
        return genIf(el, state)
    } else if (el.staticInFor) {
        var key = ""
        var parent = el.parent
        while (parent) {
            if (parent.for) {
                key = parent.key
                break
            }
            parent = parent.parent
        }
        if (!key) {
            process.env.NODE_ENV !== "production" &&
                state.warn("v-once can only be used inside v-for that is keyed. ")
            return genElement(el, state)
        }
        return "_o(" + genElement(el, state) + "," + state.onceId++ + (key ? "," + key : "") + ")"
    } else {
        return genStatic(el, state)
    }
}

function genIf(el, state, altGen, altEmpty) {
    el.ifProcessed = true // avoid recursion
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions(conditions, state, altGen, altEmpty) {
    if (!conditions.length) {
        return altEmpty || "_e()"
    }

    var condition = conditions.shift()
    if (condition.exp) {
        return (
            "(" +
            condition.exp +
            ")?" +
            genTernaryExp(condition.block) +
            ":" +
            genIfConditions(conditions, state, altGen, altEmpty)
        )
    } else {
        return "" + genTernaryExp(condition.block)
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp(el) {
        return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state)
    }
}

function genFor(el, state, altGen, altHelper) {
    var exp = el.for
    var alias = el.alias
    var iterator1 = el.iterator1 ? "," + el.iterator1 : ""
    var iterator2 = el.iterator2 ? "," + el.iterator2 : ""

    if (
        process.env.NODE_ENV !== "production" &&
        state.maybeComponent(el) &&
        el.tag !== "slot" &&
        el.tag !== "template" &&
        !el.key
    ) {
        state.warn(
            "<" +
                el.tag +
                ' v-for="' +
                alias +
                " in " +
                exp +
                '">: component lists rendered with ' +
                "v-for should have explicit keys. " +
                "See https://vuejs.org/guide/list.html#key for more info.",
            true /* tip */
        )
    }

    el.forProcessed = true // avoid recursion
    return (
        (altHelper || "_l") +
        "((" +
        exp +
        ")," +
        "function(" +
        alias +
        iterator1 +
        iterator2 +
        "){" +
        "return " +
        (altGen || genElement)(el, state) +
        "})"
    )
}

function genData$2(el, state) {
    var data = "{"

    // directives first.
    // directives may mutate the el's other properties before they are generated.
    var dirs = genDirectives(el, state)
    if (dirs) {
        data += dirs + ","
    }

    // key
    if (el.key) {
        data += "key:" + el.key + ","
    }
    // ref
    if (el.ref) {
        data += "ref:" + el.ref + ","
    }
    if (el.refInFor) {
        data += "refInFor:true,"
    }
    // pre
    if (el.pre) {
        data += "pre:true,"
    }
    // record original tag name for components using "is" attribute
    if (el.component) {
        data += 'tag:"' + el.tag + '",'
    }
    // module data generation functions
    for (var i = 0; i < state.dataGenFns.length; i++) {
        data += state.dataGenFns[i](el)
    }
    // attributes
    if (el.attrs) {
        data += "attrs:{" + genProps(el.attrs) + "},"
    }
    // DOM props
    if (el.props) {
        data += "domProps:{" + genProps(el.props) + "},"
    }
    // event handlers
    if (el.events) {
        data += genHandlers(el.events, false, state.warn) + ","
    }
    if (el.nativeEvents) {
        data += genHandlers(el.nativeEvents, true, state.warn) + ","
    }
    // slot target
    if (el.slotTarget) {
        data += "slot:" + el.slotTarget + ","
    }
    // scoped slots
    if (el.scopedSlots) {
        data += genScopedSlots(el.scopedSlots, state) + ","
    }
    // component v-model
    if (el.model) {
        data +=
            "model:{value:" +
            el.model.value +
            ",callback:" +
            el.model.callback +
            ",expression:" +
            el.model.expression +
            "},"
    }
    // inline-template
    if (el.inlineTemplate) {
        var inlineTemplate = genInlineTemplate(el, state)
        if (inlineTemplate) {
            data += inlineTemplate + ","
        }
    }
    data = data.replace(/,$/, "") + "}"
    // v-bind data wrap
    if (el.wrapData) {
        data = el.wrapData(data)
    }
    // v-on data wrap
    if (el.wrapListeners) {
        data = el.wrapListeners(data)
    }
    return data
}

function genDirectives(el, state) {
    var dirs = el.directives
    if (!dirs) {
        return
    }
    var res = "directives:["
    var hasRuntime = false
    var i, l, dir, needRuntime
    for (i = 0, l = dirs.length; i < l; i++) {
        dir = dirs[i]
        needRuntime = true
        var gen = state.directives[dir.name]
        if (gen) {
            // compile-time directive that manipulates AST.
            // returns true if it also needs a runtime counterpart.
            needRuntime = !!gen(el, dir, state.warn)
        }
        if (needRuntime) {
            hasRuntime = true
            res +=
                '{name:"' +
                dir.name +
                '",rawName:"' +
                dir.rawName +
                '"' +
                (dir.value
                    ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value)
                    : "") +
                (dir.arg ? ',arg:"' + dir.arg + '"' : "") +
                (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : "") +
                "},"
        }
    }
    if (hasRuntime) {
        return res.slice(0, -1) + "]"
    }
}

function genInlineTemplate(el, state) {
    var ast = el.children[0]
    if (process.env.NODE_ENV !== "production" && (el.children.length > 1 || ast.type !== 1)) {
        state.warn("Inline-template components must have exactly one child element.")
    }
    if (ast.type === 1) {
        var inlineRenderFns = generate$1(ast, state.options)
        return (
            "inlineTemplate:{render:function(){" +
            inlineRenderFns.render +
            "},staticRenderFns:[" +
            inlineRenderFns.staticRenderFns
                .map(function(code) {
                    return "function(){" + code + "}"
                })
                .join(",") +
            "]}"
        )
    }
}

function genScopedSlots(slots, state) {
    return (
        "scopedSlots:_u([" +
        Object.keys(slots)
            .map(function(key) {
                return genScopedSlot(key, slots[key], state)
            })
            .join(",") +
        "])"
    )
}

function genScopedSlot(key, el, state) {
    if (el.for && !el.forProcessed) {
        return genForScopedSlot(key, el, state)
    }
    return (
        "{key:" +
        key +
        ",fn:function(" +
        String(el.attrsMap.scope) +
        "){" +
        "return " +
        (el.tag === "template" ? genChildren(el, state) || "void 0" : genElement(el, state)) +
        "}}"
    )
}

function genForScopedSlot(key, el, state) {
    var exp = el.for
    var alias = el.alias
    var iterator1 = el.iterator1 ? "," + el.iterator1 : ""
    var iterator2 = el.iterator2 ? "," + el.iterator2 : ""
    el.forProcessed = true // avoid recursion
    return (
        "_l((" +
        exp +
        ")," +
        "function(" +
        alias +
        iterator1 +
        iterator2 +
        "){" +
        "return " +
        genScopedSlot(key, el, state) +
        "})"
    )
}

function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
    var children = el.children
    if (children.length) {
        var el$1 = children[0]
        // optimize single v-for
        if (children.length === 1 && el$1.for && el$1.tag !== "template" && el$1.tag !== "slot") {
            return (altGenElement || genElement)(el$1, state)
        }
        var normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0
        var gen = altGenNode || genNode
        return (
            "[" +
            children
                .map(function(c) {
                    return gen(c, state)
                })
                .join(",") +
            "]" +
            (normalizationType ? "," + normalizationType : "")
        )
    }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children, maybeComponent) {
    var res = 0
    for (var i = 0; i < children.length; i++) {
        var el = children[i]
        if (el.type !== 1) {
            continue
        }
        if (
            needsNormalization(el) ||
            (el.ifConditions &&
                el.ifConditions.some(function(c) {
                    return needsNormalization(c.block)
                }))
        ) {
            res = 2
            break
        }
        if (
            maybeComponent(el) ||
            (el.ifConditions &&
                el.ifConditions.some(function(c) {
                    return maybeComponent(c.block)
                }))
        ) {
            res = 1
        }
    }
    return res
}

function needsNormalization(el) {
    return el.for !== undefined || el.tag === "template" || el.tag === "slot"
}

function genNode(node, state) {
    if (node.type === 1) {
        return genElement(node, state)
    }
    if (node.type === 3 && node.isComment) {
        return genComment(node)
    } else {
        return genText(node)
    }
}

function genText(text) {
    return (
        "_v(" +
        (text.type === 2
            ? text.expression // no need for () because already wrapped in _s()
            : transformSpecialNewlines(JSON.stringify(text.text))) +
        ")"
    )
}

function genComment(comment) {
    return "_e('" + comment.text + "')"
}

function genSlot(el, state) {
    var slotName = el.slotName || '"default"'
    var children = genChildren(el, state)
    var res = "_t(" + slotName + (children ? "," + children : "")
    var attrs =
        el.attrs &&
        "{" +
            el.attrs
                .map(function(a) {
                    return camelize(a.name) + ":" + a.value
                })
                .join(",") +
            "}"
    var bind$$1 = el.attrsMap["v-bind"]
    if ((attrs || bind$$1) && !children) {
        res += ",null"
    }
    if (attrs) {
        res += "," + attrs
    }
    if (bind$$1) {
        res += (attrs ? "" : ",null") + "," + bind$$1
    }
    return res + ")"
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName, el, state) {
    var children = el.inlineTemplate ? null : genChildren(el, state, true)
    return (
        "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : "") + ")"
    )
}

function genProps(props) {
    var res = ""
    for (var i = 0; i < props.length; i++) {
        var prop = props[i]
        res += '"' + prop.name + '":' + transformSpecialNewlines(prop.value) + ","
    }
    return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines(text) {
    return text.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp(
    "\\b" +
        (
            "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const," +
            "super,throw,while,yield,delete,export,import,return,switch,default," +
            "extends,finally,continue,debugger,function,arguments"
        )
            .split(",")
            .join("\\b|\\b") +
        "\\b"
)

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp(
    "\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)"
)

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g

// detect problematic expressions in a template
function detectErrors(ast) {
    var errors = []
    if (ast) {
        checkNode(ast, errors)
    }
    return errors
}

function checkNode(node, errors) {
    if (node.type === 1) {
        for (var name in node.attrsMap) {
            if (dirRE.test(name)) {
                var value = node.attrsMap[name]
                if (value) {
                    if (name === "v-for") {
                        checkFor(node, 'v-for="' + value + '"', errors)
                    } else if (onRE.test(name)) {
                        checkEvent(value, name + '="' + value + '"', errors)
                    } else {
                        checkExpression(value, name + '="' + value + '"', errors)
                    }
                }
            }
        }
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                checkNode(node.children[i], errors)
            }
        }
    } else if (node.type === 2) {
        checkExpression(node.expression, node.text, errors)
    }
}

function checkEvent(exp, text, errors) {
    var stipped = exp.replace(stripStringRE, "")
    var keywordMatch = stipped.match(unaryOperatorsRE)
    if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== "$") {
        errors.push(
            "avoid using JavaScript unary operator as property name: " +
                '"' +
                keywordMatch[0] +
                '" in expression ' +
                text.trim()
        )
    }
    checkExpression(exp, text, errors)
}

function checkFor(node, text, errors) {
    checkExpression(node.for || "", text, errors)
    checkIdentifier(node.alias, "v-for alias", text, errors)
    checkIdentifier(node.iterator1, "v-for iterator", text, errors)
    checkIdentifier(node.iterator2, "v-for iterator", text, errors)
}

function checkIdentifier(ident, type, text, errors) {
    if (typeof ident === "string" && !identRE.test(ident)) {
        errors.push("invalid " + type + ' "' + ident + '" in expression: ' + text.trim())
    }
}

function checkExpression(exp, text, errors) {
    try {
        new Function("return " + exp)
    } catch (e) {
        var keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE)
        if (keywordMatch) {
            errors.push(
                "avoid using JavaScript keyword as property name: " +
                    '"' +
                    keywordMatch[0] +
                    '" in expression ' +
                    text.trim()
            )
        } else {
            errors.push("invalid expression: " + text.trim())
        }
    }
}

/*  */

function createFunction(code, errors) {
    try {
        return new Function(code)
    } catch (err) {
        errors.push({ err: err, code: code })
        return noop
    }
}

function createCompileToFunctionFn(compile) {
    var cache = Object.create(null)

    return function compileToFunctions(template$$1, options, vm) {
        options = options || {}

        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production") {
            // detect possible CSP restriction
            try {
                new Function("return 1")
            } catch (e) {
                if (e.toString().match(/unsafe-eval|CSP/)) {
                    warn$2(
                        "It seems you are using the standalone build of Vue.js in an " +
                            "environment with Content Security Policy that prohibits unsafe-eval. " +
                            "The template compiler cannot work in this environment. Consider " +
                            "relaxing the policy to allow unsafe-eval or pre-compiling your " +
                            "templates into render functions."
                    )
                }
            }
        }

        // check cache
        var key = options.delimiters ? String(options.delimiters) + template$$1 : template$$1
        if (cache[key]) {
            return cache[key]
        }

        // compile
        var compiled = compile(template$$1, options)

        // check compilation errors/tips
        if (process.env.NODE_ENV !== "production") {
            if (compiled.errors && compiled.errors.length) {
                warn$2(
                    "Error compiling template:\n\n" +
                        template$$1 +
                        "\n\n" +
                        compiled.errors
                            .map(function(e) {
                                return "- " + e
                            })
                            .join("\n") +
                        "\n",
                    vm
                )
            }
            if (compiled.tips && compiled.tips.length) {
                compiled.tips.forEach(function(msg) {
                    return tip(msg, vm)
                })
            }
        }

        // turn code into functions
        var res = {}
        var fnGenErrors = []
        res.render = createFunction(compiled.render, fnGenErrors)
        res.staticRenderFns = compiled.staticRenderFns.map(function(code) {
            return createFunction(code, fnGenErrors)
        })

        // check function generation errors.
        // this should only happen if there is a bug in the compiler itself.
        // mostly for codegen development use
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production") {
            if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
                warn$2(
                    "Failed to generate render function:\n\n" +
                        fnGenErrors
                            .map(function(ref) {
                                var err = ref.err
                                var code = ref.code

                                return err.toString() + " in\n\n" + code + "\n"
                            })
                            .join("\n"),
                    vm
                )
            }
        }

        return (cache[key] = res)
    }
}

/*  */

function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
        //fixed by xxxxxx 共享 compiled。
        const {hashify} = require('@dcloudio/uni-cli-shared')
        const {cacheCompilerOptions} = require('@dcloudio/webpack-uni-mp-loader/lib/shared')
        function compile(template$$1, options) {
            var finalOptions = Object.create(baseOptions)
            var errors = []
            var tips = []
            finalOptions.warn = function(msg, tip) {
                ;(tip ? tips : errors).push(msg)
            }

            if (options) {
                // merge custom modules
                if (options.modules) {
                    finalOptions.modules = (baseOptions.modules || []).concat(options.modules)
                }
                // merge custom directives
                if (options.directives) {
                    finalOptions.directives = extend(
                        Object.create(baseOptions.directives),
                        options.directives
                    )
                }
                // copy other options
                for (var key in options) {
                    if (key !== "modules" && key !== "directives") {
                        finalOptions[key] = options[key]
                    }
                }
            }
            finalOptions.hashId = hashify(finalOptions.realResourcePath)//fixed by xxxxxx 增加hashId
            var compiled = baseCompile(template$$1, finalOptions)
            if (process.env.NODE_ENV !== "production") {
                errors.push.apply(errors, detectErrors(compiled.ast))
            }
            compiled.errors = errors
            compiled.tips = tips
            
            //fixed by xxxxxx
            cacheCompilerOptions(finalOptions.realResourcePath,{compiled:{ast:compiled.ast}})
            
            return compiled
        }

        return {
            compile: compile,
            compileToFunctions: createCompileToFunctionFn(compile)
        }
    }
}

var tagMap = {
    br: "view",
    hr: "view",

    p: "view",
    h1: "view",
    h2: "view",
    h3: "view",
    h4: "view",
    h5: "view",
    h6: "view",
    abbr: "view",
    address: "view",
    b: "view",
    bdi: "view",
    bdo: "view",
    blockquote: "view",
    cite: "view",
    code: "view",
    del: "view",
    ins: "view",
    dfn: "view",
    em: "view",
    strong: "view",
    samp: "view",
    kbd: "view",
    var: "view",
    i: "view",
    mark: "view",
    pre: "view",
    q: "view",
    ruby: "view",
    rp: "view",
    rt: "view",
    s: "view",
    small: "view",
    sub: "view",
    sup: "view",
    time: "view",
    u: "view",
    wbr: "view",

    // 表单元素
    form: "form",
    input: "input",
    textarea: "textarea",
    button: "button",
    select: "picker",
    option: "view",
    optgroup: "view",
    label: "label",
    fieldset: "view",
    datalist: "picker",
    legend: "view",
    output: "view",

    // 框架
    iframe: "view",
    // 图像
    img: "image",
    canvas: "canvas",
    figure: "view",
    figcaption: "view",

    // 音视频
    audio: "audio",
    source: "audio",
    video: "video",
    track: "video",
    // 链接
    a: "navigator",
    nav: "view",
    link: "navigator",
    // 列表
    ul: "view",
    ol: "view",
    li: "view",
    dl: "view",
    dt: "view",
    dd: "view",
    menu: "view",
    command: "view",

    // 表格table
    table: "view",
    caption: "view",
    th: "view",
    td: "view",
    tr: "view",
    thead: "view",
    tbody: "view",
    tfoot: "view",
    col: "view",
    colgroup: "view",

    // 样式 节
    div: "view",
    main: "view",
    span: "label",
    header: "view",
    footer: "view",
    section: "view",
    article: "view",
    aside: "view",
    details: "view",
    dialog: "view",
    summary: "view",

    progress: "progress",
    meter: "progress", // todo
    head: "view", // todo
    meta: "view", // todo
    base: "text", // todo
    // 'map': 'image', // TODO不是很恰当
    area: "navigator", // j结合map使用

    script: "view",
    noscript: "view",
    embed: "view",
    object: "view",
    param: "view",

    // https://mp.weixin.qq.com/debug/wxadoc/dev/component/
    // [...document.querySelectorAll('.markdown-section tbody td:first-child')].map(v => v.textContent).join(',\n')
    view: "view",
    "scroll-view": "scroll-view",
    swiper: "swiper",
    icon: "icon",
    text: "text",
    // 'progress': 'progress',
    // 'button': 'button',
    // 'form': 'form',
    // 'input': 'input',
    checkbox: "checkbox",
    radio: "radio",
    picker: "picker",
    "picker-view": "picker-view",
    slider: "slider",
    switch: "switch",
    // 'label': 'label',
    navigator: "navigator",
    // 'audio': 'audio',
    image: "image",
    // 'video': 'video',
    map: "map",
    // 'canvas': 'canvas',
    "contact-button": "contact-button",
    block: "block"
}

function maybeTag(tagName) {
    return tagMap[tagName]
}

// 目前分两次编译 source，导致无法使用随机数
function getWxEleId(index, arr, hashId) {//fixed by xxxxxx(临时使用hashId解决 slot 内引用组件导致 comid,eventid 冲突问题)
    hashId = hashId || 'E'
    if (!arr || !arr.length) {
        return "'" + hashId + '-' + index + "'"
    }

    var str = arr.join("+'-'+")
    return "'" + hashId + '-' + index + "-'+" + str
}

// 检查不允许在 v-for 的时候出现2个及其以上相同 iterator1
function checkRepeatIterator(arr, options) {
    var len = arr.length
    if (len > 1 && len !== new Set(arr).size) {
        options.warn("同一组件内嵌套的 v-for 不能连续使用相同的索引，目前为: " + arr, false)
    }
}

function fixDefaultIterator(path,options) {
    var forText = path.for
    var iterator1 = path.iterator1
    if (forText && !iterator1) {
        if(!options.hasOwnProperty('__iterator__')){
            options.__iterator__ = 0
        }
        path.iterator1 = "index" + (options.__iterator__++)
    }
}

function addAttr$1(path, key, value, inVdom) {
    path[key] = value
    path.plain = false
    // path.attrsMap[key] = value
    if (!inVdom) {
        path.attrsMap["data-" + key] = "{{" + value + "}}"
    }

    // if (!path.attrsList) {
    //   path.attrsList = []
    // }
    // path.attrsList.push({ name: `':${key}'`, value })

    if (!path.attrs) {
        path.attrs = []
    }
    path.attrs.push({ name: key, value: value })
}

function mark(path, options, deps, iteratorArr) {
    if (iteratorArr === void 0) iteratorArr = []

    fixDefaultIterator(path,options)

    var tag = path.tag
    var children = path.children
    var iterator1 = path.iterator1
    var events = path.events
    var directives = path.directives
    var ifConditions = path.ifConditions

    var currentArr = Object.assign([], iteratorArr)

    if (iterator1) {
        currentArr.push(iterator1)
    }

    checkRepeatIterator(currentArr, options)

    // 递归子节点
    if (children && children.length) {
        children.forEach(function(v, i) {
            // const counterIterator = children.slice(0, i).filter(v => v.for).map(v => v.for + '.length').join(`+'-'+`)
            mark(v, options, deps, currentArr)
        })
    }

    // fix: v-else events
    if (ifConditions && ifConditions.length > 1) {
        ifConditions.slice(1).forEach(function(v, i) {
            mark(v.block, options, deps, currentArr)
        })
    }

    // for mpvue-template-compiler
    // events || v-model
    var hasModel =
        directives &&
        directives.find(function(v) {
            return v.name === "model"
        })
    var needEventsID = events || hasModel

    if (needEventsID) {
        var eventId = getWxEleId(deps.eventIndex, currentArr, options.hashId)
        // const eventId = getWxEleId(eIndex, currentArr)
        addAttr$1(path, "eventid", eventId)
        path.attrsMap["data-comkey"] = "{{$k}}"
        deps.eventIndex += 1
        // eIndex += 1
    }

    // 子组件
    if (!tag || maybeTag(tag)) {
        return
    }
    // eg. '1-'+i+'-'+j
    var value = getWxEleId(deps.comIndex, currentArr, options.hashId)
    addAttr$1(path, "mpcomid", value, true)
    path["mpcomid"] = value
    deps.comIndex += 1
}

// 全局的事件触发器 ID
// let eIndex = 0
function markComponent(ast, options) {
    var deps = { comIndex: 0, eventIndex: 0 }
    mark(ast, options, deps)

    return ast
}

/*  */

// for mp
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile(template$$1, options) {
    var originAst = parse(template$$1.trim(), options)
    var ast = markComponent(originAst, options)
    optimize(ast, options)
    var code = generate$1(ast, options)
    return {
        ast: ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }
})

// type：
// 0, 默认值, 拼接 ${name}={{ ${content} }}
// 1, 拼接 ${name}
// 2, 拼接 ${map[key]}={{ '${content}' }}
// 3, 拼接 {{ ${content} }}
// 4, 拼接为空字符串
// 5, 不需要在wxml上表现出来，可直接清除

var noSupport = {
    type: 4,
    check: function(k, v, errors) {
        errors("不支持此指令: " + k + '="' + v + '"')
        return false
    }
}
var wxmlDirectiveMap = {
    "v-if": {
        name: "wx:if",
        type: 0
    },
    "v-else-if": {
        name: "wx:elif",
        type: 0
    },
    "v-else": {
        name: "wx:else",
        type: 1
    },
    "v-text": {
        name: "",
        type: 1
    },
    "v-html": {
        name: "",
        type: 1
    },
    "v-on": {
        name: "",
        map: {
            click: "tap",
            touchstart: "touchstart",
            touchmove: "touchmove",
            touchcancel: "touchcancel",
            touchend: "touchend",
            tap: "tap",
            longtap: "longtap",
            input: "input",
            change: "change",
            submit: "submit",
            blur: "blur",
            focus: "focus",
            reset: "reset",
            confirm: "confirm",
            columnchange: "columnchange",
            linechange: "linechange",
            error: "error",
            scrolltoupper: "scrolltoupper",
            scrolltolower: "scrolltolower",
            scroll: "scroll",
            load: "load"
        },
        type: 2
    },
    "v-bind": {
        name: "",
        map: {
            href: "url"
        },
        type: 3
    },
    href: {
        name: "url",
        type: 2
    },
    "v-pre": noSupport,
    "v-cloak": noSupport,
    "v-once": {
        name: "",
        type: 5
    }
}

var tagConfig = {
    virtualTag: ["slot", "template", "block"]
}

// babel-plugin-transform-object-to-ternary-operator.js

function getStrByNode(node, onlyStr) {
    if (onlyStr === void 0) onlyStr = false

    if (onlyStr) {
        return node.value || node.name || ""
    }
    return node.type === "StringLiteral" ? node : t.stringLiteral(node.name || "")
}

// 把 { key: value } 转换成 [ value ? 'key' : '' ]
var objectVisitor = {
    ObjectExpression: function(path) {
        var elements = path.node.properties.map(function(propertyItem) {
            return t.conditionalExpression(
                propertyItem.value,
                getStrByNode(propertyItem.key),
                t.stringLiteral("")
            )
        })
        path.replaceWith(t.arrayExpression(elements))
    }
}

function transformObjectToTernaryOperator(babel$$1) {
    return { visitor: objectVisitor }
}

// 把 { key: value } 转换成 'key:' + value + ';'
var objectToStringVisitor = {
    ObjectExpression: function(path) {
        var expression = path.node.properties
            .map(function(propertyItem) {
                var keyStr = getStrByNode(propertyItem.key, true)
                var key = keyStr ? hyphenate(keyStr) : keyStr
                var ref = generate(t.ExpressionStatement(propertyItem.value))
                var val = ref.code
                return "'" + key + ":' + (" + val.slice(0, -1) + ") + ';'"
            })
            .join("+")

        var p = template(expression,{placeholderPattern:false})({})//fixed by xxxxxx
        path.replaceWith(p.expression)
    }
}
function transformObjectToString(babel$$1) {
    return { visitor: objectToStringVisitor }
}

function transformDynamicClass(staticClass, clsBinding) {
    if (staticClass === void 0) staticClass = ""

    var result = babel.transform("!" + clsBinding, { plugins: [transformObjectToTernaryOperator] })
    // 先实现功能，再优化代码
    // https://github.com/babel/babel/issues/7138
    var cls = prettier
        .format(result.code.replace("use strict'!",'').replace('"use strict";',''), { semi: false, singleQuote: true, parser:'babel' })//fixed by xxxxxx
        .slice(1)
        .slice(0, -1)
        .replace(/\n|\r/g, "")
    return staticClass + " {{" + cls + "}}"
}

function transformDynamicStyle(staticStyle, styleBinding) {
    if (staticStyle === void 0) staticStyle = ""

    var result = babel.transform("!" + styleBinding, { plugins: [transformObjectToString] })//fixed by xxxxxx
    var cls = prettier
        .format(result.code.replace("use strict'!",'').replace('"use strict";',''), { semi: false, singleQuote: true, parser:'babel' })//fixed by xxxxxx
        .slice(1)
        .slice(0, -1)
        .replace(/\n|\r/g, "")
    return staticStyle + " {{" + cls + "}}"
}

var attrs = {
    format: function format(attrs) {
        if (attrs === void 0) attrs = {}

        var obj = {}

        Object.keys(attrs).map(function(key) {
            var val = attrs[key]
            obj[key.replace("@", "v-on:").replace(/^:/, "v-bind:")] = val
        })

        return obj
    },

    convertAttr: function convertAttr(ast, log) {
        var this$1 = this

        var attrsMap = ast.attrsMap
        if (attrsMap === void 0) attrsMap = {}
        var tag = ast.tag
        var staticClass = ast.staticClass
        var attrs = {}
        var wxClass = this.classObj(attrsMap["v-bind:class"], staticClass)
        wxClass.length ? (attrsMap["class"] = wxClass) : ""
        var wxStyle = this.styleObj(attrsMap["v-bind:style"], attrsMap["style"])
        wxStyle.length ? (attrsMap["style"] = wxStyle) : ""

        Object.keys(attrsMap).map(function(key) {
            var val = attrsMap[key]
            if (key === "v-bind:class" || key === "v-bind:style") {
                return
            }
            if (key === "v-text") {
                ast.children.unshift({
                    text: "{{" + val + "}}",
                    type: 3
                })
            } else if (key === "v-html") {
                ast.tag = "rich-text"
                attrs["nodes"] = "{{" + val + "}}"
            } else if (key === "v-show") {
                attrs["hidden"] = "{{!(" + val + ")}}"
            } else if (/^v\-on\:/i.test(key)) {
                attrs = this$1.event(key, val, attrs, tag)
            } else if (/^v\-bind\:/i.test(key)) {
                attrs = this$1.bind(key, val, attrs, tag, attrsMap["wx:key"])
            } else if (/^v\-model/.test(key)) {
                attrs = this$1.model(key, val, attrs, tag, log)
            } else if (wxmlDirectiveMap[key]) {
                var ref = wxmlDirectiveMap[key] || {}
                var name = ref.name
                if (name === void 0) name = ""
                var type = ref.type
                var map = ref.map
                if (map === void 0) map = {}
                var check = ref.check
                if (!(check && !check(key, val, log)) && !(!name || typeof type !== "number")) {
                    // 见 ./wxmlDirectiveMap.js 注释
                    if (type === 0) {
                        attrs[name] = "{{" + val + "}}"
                    }

                    if (type === 1) {
                        attrs[name] = undefined
                    }

                    if (type === 2) {
                        attrs[name] = val
                    }

                    if (type === 3) {
                        attrs[map[name] || name] = "{{" + val + "}}"
                        return
                    }
                }
            } else if (/^v\-/.test(key)) {
                log("不支持此属性-> " + key + '="' + val + '"', "waring")
            } else {
                if (
                    tagConfig.virtualTag.indexOf(tag) > -1 &&
                    (key === "class" || key === "style" || key === "data-mpcomid")
                ) {
                    if (key !== "data-mpcomid") {
                        log("template 不支持此属性-> " + key + '="' + val + '"', "waring")
                    }
                } else {
                    attrs[key] = val
                }
            }
        })
        ast.attrsMap = attrs
        return ast
    },

    event: function event(key, val, attrs, tag) {
        // 小程序能力所致，bind 和 catch 事件同时绑定时候，只会触发 bind ,catch 不会被触发。
        // .stop 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！
        // .prevent 可以直接干掉，因为小程序里没有什么默认事件，比如submit并不会跳转页面
        // .capture 不能做，因为小程序没有捕获类型的事件
        // .self 没有可以判断的标识
        // .once 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，但非常的不优雅，违背了原意，暂不考虑
        var name = key.replace(/^v\-on\:/i, "").replace(/\.prevent/i, "")
        var ref = name.split(".")
        var eventName = ref[0]
        var eventNameMap = ref.slice(1)
        var eventMap = wxmlDirectiveMap["v-on"]
        var check = wxmlDirectiveMap.check

        if (check) {
            check(key, val)
        }
        var wxmlEventName = ""
        if (eventName === "change" && (tag === "input" || tag === "textarea")) {
            wxmlEventName = "blur"
        } else {
            wxmlEventName = eventMap.map[eventName]
        }

        var eventType = "bind"
        var isStop = eventNameMap.includes("stop")
        if (eventNameMap.includes("capture")) {
            eventType = isStop ? "capture-catch:" : "capture-bind:"
        } else if (isStop) {
            eventType = "catch"
        }

        wxmlEventName = eventType + (wxmlEventName || eventName)
        attrs[wxmlEventName] = "handleProxy"

        return attrs
    },

    bind: function bind(key, val, attrs, tag, isIf) {
        var name = key.replace(/^v\-bind\:/i, "")

        if (isIf && name === "key") {
            attrs["wx:key"] = val
        }

        if (tag === "template") {
            return attrs
        }

        if (name === "href") {
            attrs["url"] = "{{" + val + "}}"
        } else {
            attrs[name] = "{{" + val + "}}"
        }

        return attrs
    },

    classObj: function classObj(clsBinding, staticCls) {
        if (clsBinding === void 0) clsBinding = ""

        if (!clsBinding && !staticCls) {
            return ""
        }
        if (!clsBinding && staticCls) {
            return staticCls
        }

        return transformDynamicClass(staticCls, clsBinding)
    },

    styleObj: function styleObj(styleBinding, staticStyle) {
        if (styleBinding === void 0) styleBinding = ""

        if (!styleBinding && !staticStyle) {
            return ""
        }
        if (!styleBinding && staticStyle) {
            return staticStyle
        }

        return transformDynamicStyle(staticStyle, styleBinding)
    },

    model: function model(key, val, attrs, tag) {
        var isFormInput = tag === "input" || tag === "textarea"
        attrs["value"] = "{{" + val + "}}"
        if (key === "v-model.lazy") {
            if (isFormInput) {
                attrs["bindblur"] = "handleProxy"
            } else {
                attrs["bindchange"] = "handleProxy"
            }
        } else {
            if (isFormInput) {
                attrs["bindinput"] = "handleProxy"
            } else {
                attrs["bindchange"] = "handleProxy"
            }
        }

        return attrs
    }
}

function getSlotsName(obj) {
    if (!obj) {
        return ""
    }
    return Object.keys(obj)
        .map(function(k) {
            return "$slot" + k + ":'" + obj[k] + "'"
        })
        .join(",")
}

var component = {
    isComponent: function isComponent(tagName, components) {
        if (components === void 0) components = {}

        return !!components[tagName]
    },
    convertComponent: function convertComponent(ast, components, slotName) {//fixed by xxxxxx(将根节点数据传递给 slot)
        var attrsMap = ast.attrsMap
        var tag = ast.tag
        var mpcomid = ast.mpcomid
        var slots = ast.slots
        if (slotName) {
            attrsMap["data"] = "{{...$root['0'], ...$root[$k], $root}}"
            attrsMap["is"] = "{{" + slotName + "}}"
        } else {
            var slotsName = getSlotsName(slots)
            var restSlotsName = slotsName ? ", " + slotsName : ""
            attrsMap["data"] = "{{...$root['0'], ...$root[$kk+" + mpcomid + "],$root" + restSlotsName + "}}"
            attrsMap["is"] = components[tag].name
        }
        return ast
    }
}

var tag = function(ast, options) {
    var tag = ast.tag
    var elseif = ast.elseif
    var elseText = ast.else
    var forText = ast.for
    var staticClass = ast.staticClass
    if (staticClass === void 0) staticClass = ""
    var attrsMap = ast.attrsMap
    if (attrsMap === void 0) attrsMap = {}
    var components = options.components
    var ifText = attrsMap["v-if"]
    var href = attrsMap.href
    var bindHref = attrsMap["v-bind:href"]
    var name = attrsMap.name

    if (!tag) {
        return ast
    }
    var isComponent = component.isComponent(tag, components)
    if (tag !== "template" && tag !== "block" && tag !== "slot" && !isComponent) {
        ast.staticClass = staticClass ? "_" + tag + " " + staticClass : "_" + tag
    }
    ast.tag = tagMap[tag] || tag

    var isSlot = tag === "slot"

    if ((ifText || elseif || elseText || forText) && tag === "template") {
        ast.tag = "block"
    } else if (isComponent || isSlot) {
        var originSlotName = name || "default"
        var slotName = isSlot
            ? "$slot" + originSlotName + " || '" + originSlotName + "'"
            : undefined

        // 用完必须删除，不然会被编译成 <template name="xxx"> 在小程序中就会表示这是一个模版申明而不是使用，小程序中不能同时申明和使用模版
        delete ast.attrsMap.name
        ast = component.convertComponent(ast, components, slotName)
        ast.tag = "template"
    } else if (tag === "a" && !(href || bindHref)) {
        ast.tag = "view"
    } else if (ast.events && ast.events.scroll) {
        ast.tag = "scroll-view"
    } else if (tag === "input") {
        var type = attrsMap.type
        if (type && ["button", "checkbox", "radio"].indexOf(type) > -1) {
            delete ast.attrsMap.type
            ast.tag = type
        }
        if (type === "button") {
            ast.children.push({
                text: attrsMap.value || "",
                type: 3
            })
            delete ast.attrsMap.value
        }
    }
    return ast
}

var astMap = {
    if: "wx:if",
    iterator1: "wx:for-index",
    key: "wx:key",
    alias: "wx:for-item",
    "v-for": "wx:for"
}

var convertFor = function(ast) {
    var iterator1 = ast.iterator1
    var forText = ast.for
    var key = ast.key
    var alias = ast.alias
    var attrsMap = ast.attrsMap

    if (forText) {
        attrsMap[astMap["v-for"]] = "{{" + forText + "}}"
        if (iterator1) {
            attrsMap[astMap["iterator1"]] = iterator1
        }
        if (key) {
            attrsMap[astMap["key"]] = key
        }
        if (alias) {
            attrsMap[astMap["alias"]] = alias
        }

        delete attrsMap["v-for"]
    }

    return ast
}

function convertAst(node, options, util) {
    if (options === void 0) options = {}

    var children = node.children
    var ifConditions = node.ifConditions
    var staticClass = node.staticClass
    if (staticClass === void 0) staticClass = ""
    var mpcomid = node.mpcomid
    var tagName = node.tag
    var log = util.log
    var deps = util.deps
    var slots = util.slots
    var slotTemplates = util.slotTemplates
    var wxmlAst = Object.assign({}, node)
    var moduleId = options.moduleId
    var components = options.components
    wxmlAst.tag = tagName = tagName ? hyphenate(tagName) : tagName
    // 引入 import, isSlot 是使用 slot 的编译地方，意即 <slot></slot> 的地方
    var isSlot = tagName === "slot"
    if (isSlot) {
        deps.slots = "slots"
        // 把当前 slot 节点包裹 template
        var defSlot = Object.assign({}, wxmlAst)
        defSlot.tag = "template"
        var templateName = "" + (defSlot.attrsMap.name || "default")
        defSlot.attrsMap.name = templateName
        wxmlAst.children = []
        defSlot.parent = node.parent.parent
        slotTemplates[templateName] = defSlot
    }

    var currentIsComponent = component.isComponent(tagName, components)
    if (currentIsComponent) {
        deps[tagName] = tagName
    }

    if (moduleId && !currentIsComponent && tagConfig.virtualTag.indexOf(tagName) < 0) {
        wxmlAst.staticClass = staticClass
            ? (moduleId + " " + staticClass).replace(/\"/g, "")
            : moduleId
    } else {
        wxmlAst.staticClass = staticClass.replace(/\"/g, "")
    }

    // 组件内部的node节点全部是 slot
    wxmlAst.slots = {}
    if (currentIsComponent && children && children.length) {
        // 只检查组件下的子节点（不检查孙子节点）是不是具名 slot，不然就是 default slot
        children
            .reduce(
                function(res, n) {
                    var ref = n.attrsMap || {}
                    var slot = ref.slot
                    // 不是具名的，全部放在第一个数组元素中
                    var arr = slot ? res : res[0]
                    arr.push(n)
                    return res
                },
                [[]]
            )
            .forEach(function(n) {
                var isDefault = Array.isArray(n)
                var slotName = isDefault ? "default" : n.attrsMap.slot
                var slotId = moduleId + "-" + slotName + "-" + mpcomid.replace(/\'/g, "")
                var node = isDefault ? { tag: "slot", attrsMap: {}, children: n } : n

                node.tag = "template"
                node.attrsMap.name = slotId
                delete node.attrsMap.slot
                // 缓存，会集中生成一个 slots 文件
                slots[slotId] = {
                    node: convertAst(node, options, util),
                    name: slotName,
                    slotId: slotId
                }
                wxmlAst.slots[slotName] = slotId
            })
        // 清理当前组件下的节点信息，因为 slot 都被转移了
        children.length = 0
        wxmlAst.children.length = 0
    }

    wxmlAst.attrsMap = attrs.format(wxmlAst.attrsMap)
    wxmlAst = tag(wxmlAst, options)
    wxmlAst = convertFor(wxmlAst, options)
    wxmlAst = attrs.convertAttr(wxmlAst, log)
    if (children && !isSlot) {
        wxmlAst.children = children.map(function(k) {
            return convertAst(k, options, util)
        })
    }

    if (ifConditions) {
        var length = ifConditions.length
        for (var i = 1; i < length; i++) {
            wxmlAst.ifConditions[i].block = convertAst(ifConditions[i].block, options, util)
        }
    }

    return wxmlAst
}

function wxmlAst(compiled, options, log) {
    if (options === void 0) options = {}

    var ast = compiled.ast
    var deps = {
        // slots: 'slots'
    }
    var slots = {
        // slotId: nodeAst
    }
    var slotTemplates = {}

    var wxast = convertAst(ast, options, {
        log: log,
        deps: deps,
        slots: slots,
        slotTemplates: slotTemplates
    })
    var children = Object.keys(slotTemplates).map(function(k) {
        return convertAst(slotTemplates[k], options, {
            log: log,
            deps: deps,
            slots: slots,
            slotTemplates: slotTemplates
        })
    })
    wxast.children = children.concat(wxast.children)
    return {
        wxast: wxast,
        deps: deps,
        slots: slots
    }
}

function generate$2(obj, options) {
    if (options === void 0) options = {}

    var tag = obj.tag
    var attrsMap = obj.attrsMap
    if (attrsMap === void 0) attrsMap = {}
    var children = obj.children
    var text = obj.text
    var ifConditions = obj.ifConditions
    if (!tag) {
        return text
    }
    var child = ""
    if (children && children.length) {
        // 递归子节点
        child = children
            .map(function(v) {
                return generate$2(v, options)
            })
            .join("")
    }

    // v-if 指令
    var ifConditionsArr = []
    if (ifConditions) {
        var length = ifConditions.length
        for (var i = 1; i < length; i++) {
            ifConditionsArr.push(generate$2(ifConditions[i].block, options))
        }
    }

    var attrs = Object.keys(attrsMap)
        .map(function(k) {
            return convertAttr(k, attrsMap[k])
        })
        .join(" ")
		//fixed by xxxxxx
		var tags = ['progress', 'switch', 'input', 'radio', 'slider', 'textarea'];
		//  var tags = ['progress', 'checkbox', 'switch', 'input', 'radio', 'slider', 'textarea'];
    if (tags.indexOf(tag) > -1 && !(children && children.length)) {
        return "<" + tag + (attrs ? " " + attrs : "") + " />" + ifConditionsArr.join("")
    }
    return (
        "<" +
        tag +
        (attrs ? " " + attrs : "") +
        ">" +
        (child || "") +
        "</" +
        tag +
        ">" +
        ifConditionsArr.join("")
    )
}

function convertAttr(key, val) {
		//fixed by xxxxxx
		if (key === 'value') {
			return (key + "=\"" + (val || '') + "\"")
		}
    return val === "" || typeof val === "undefined" ? key : key + '="' + val + '"'
}

var utils = {
    toLowerCase: function toLowerCase(str) {
        return str
            .replace(/([A-Z])/g, "-$1")
            .toLowerCase()
            .trim()
    },

    getChar: function getChar(index) {
        return String.fromCharCode(0x61 + index)
    },

    log: function log(compiled) {
        compiled.mpErrors = []
        compiled.mpTips = []

        return function(str, type) {
            if (type === "waring") {
                compiled.mpTips.push(str)
            } else {
                compiled.mpErrors.push(str)
            }
        }
    }
}

function compileToWxml(compiled, options) {
    if (options === void 0) options = {}

    // TODO, compiled is undefined
    var components = options.components
    if (components === void 0) components = {}
    var log = utils.log(compiled)

    var ref = wxmlAst(compiled, options, log)
    var wxast = ref.wxast
    var deps = ref.deps
    if (deps === void 0) deps = {}
    var slots = ref.slots
    if (slots === void 0) slots = {}
    var code = generate$2(wxast, options)

    // 引用子模版
    var importCode = Object.keys(deps)
        .map(function(k) {
            return components[k] ? '<import src="' + components[k].src + '" />' : ""
        })
        .join("")
    code = importCode + '<template name="' + options.name + '">' + code + "</template>"

    // 生成 slots code
    Object.keys(slots).forEach(function(k) {
        var slot = slots[k]
        slot.code = generate$2(slot.node, options)
    })

    // TODO: 后期优化掉这种暴力全部 import，虽然对性能没啥大影响
    return { code: code, compiled: compiled, slots: slots, importCode: importCode }
}

/*  */

var ref = createCompiler(baseOptions)
var compile = ref.compile
var compileToFunctions = ref.compileToFunctions

/*  */

exports.parseComponent = parseComponent
exports.compile = compile
exports.compileToFunctions = compileToFunctions
exports.compileToWxml = compileToWxml
