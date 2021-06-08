import { camelize, extend, isString, isHTMLTag, isSVGTag, capitalize, isPlainObject, isArray } from '@vue/shared';

function formatKey(key) {
    return camelize(key.substring(5));
}
function initCustomDataset() {
    const prototype = HTMLElement.prototype;
    const setAttribute = prototype.setAttribute;
    prototype.setAttribute = function (key, value) {
        if (key.startsWith('data-') && this.tagName.startsWith('UNI-')) {
            const dataset = this.__uniDataset ||
                (this.__uniDataset = {});
            dataset[formatKey(key)] = value;
        }
        setAttribute.call(this, key, value);
    };
    const removeAttribute = prototype.removeAttribute;
    prototype.removeAttribute = function (key) {
        if (this.__uniDataset &&
            key.startsWith('data-') &&
            this.tagName.startsWith('UNI-')) {
            delete this.__uniDataset[formatKey(key)];
        }
        removeAttribute.call(this, key);
    };
}
function getCustomDataset(el) {
    return extend({}, el.dataset, el.__uniDataset);
}

const unitRE = new RegExp(`"[^"]+"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)[r|u]px`, 'g');
function toFixed(number, precision) {
    const multiplier = Math.pow(10, precision + 1);
    const wholeNumber = Math.floor(number * multiplier);
    return (Math.round(wholeNumber / 10) * 10) / multiplier;
}
const defaultRpx2Unit = {
    unit: 'rem',
    unitRatio: 10 / 320,
    unitPrecision: 5,
};
function createRpx2Unit(unit, unitRatio, unitPrecision) {
    // ignore: rpxCalcIncludeWidth
    return (val) => val.replace(unitRE, (m, $1) => {
        if (!$1) {
            return m;
        }
        const value = toFixed(parseFloat($1) * unitRatio, unitPrecision);
        return value === 0 ? '0' : `${value}${unit}`;
    });
}

function passive(passive) {
    return { passive };
}
function normalizeDataset(el) {
    // TODO
    return JSON.parse(JSON.stringify(el.dataset || {}));
}
function normalizeTarget(el) {
    const { id, offsetTop, offsetLeft } = el;
    return {
        id,
        dataset: getCustomDataset(el),
        offsetTop,
        offsetLeft,
    };
}
function addFont(family, source, desc) {
    const fonts = document.fonts;
    if (fonts) {
        const fontFace = new FontFace(family, source, desc);
        return fontFace.load().then(() => {
            fonts.add(fontFace);
        });
    }
    return new Promise((resolve) => {
        const style = document.createElement('style');
        const values = [];
        if (desc) {
            const { style, weight, stretch, unicodeRange, variant, featureSettings } = desc;
            style && values.push(`font-style:${style}`);
            weight && values.push(`font-weight:${weight}`);
            stretch && values.push(`font-stretch:${stretch}`);
            unicodeRange && values.push(`unicode-range:${unicodeRange}`);
            variant && values.push(`font-variant:${variant}`);
            featureSettings && values.push(`font-feature-settings:${featureSettings}`);
        }
        style.innerText = `@font-face{font-family:"${family}";src:${source};${values.join(';')}}`;
        document.head.appendChild(style);
        resolve();
    });
}
function scrollTo(scrollTop, duration) {
    if (isString(scrollTop)) {
        const el = document.querySelector(scrollTop);
        if (el) {
            scrollTop = el.getBoundingClientRect().top + window.pageYOffset;
        }
    }
    if (scrollTop < 0) {
        scrollTop = 0;
    }
    const documentElement = document.documentElement;
    const { clientHeight, scrollHeight } = documentElement;
    scrollTop = Math.min(scrollTop, scrollHeight - clientHeight);
    if (duration === 0) {
        // 部分浏览器（比如微信）中 scrollTop 的值需要通过 document.body 来控制
        documentElement.scrollTop = document.body.scrollTop = scrollTop;
        return;
    }
    if (window.scrollY === scrollTop) {
        return;
    }
    const scrollTo = (duration) => {
        if (duration <= 0) {
            window.scrollTo(0, scrollTop);
            return;
        }
        const distaince = scrollTop - window.scrollY;
        requestAnimationFrame(function () {
            window.scrollTo(0, window.scrollY + (distaince / duration) * 10);
            scrollTo(duration - 10);
        });
    };
    scrollTo(duration);
}

function plusReady(callback) {
    if (typeof callback !== 'function') {
        return;
    }
    if (window.plus) {
        return callback();
    }
    document.addEventListener('plusready', callback);
}

const BUILT_IN_TAGS = [
    'ad',
    'audio',
    'button',
    'camera',
    'canvas',
    'checkbox',
    'checkbox-group',
    'cover-image',
    'cover-view',
    'editor',
    'form',
    'functional-page-navigator',
    'icon',
    'image',
    'input',
    'label',
    'live-player',
    'live-pusher',
    'map',
    'movable-area',
    'movable-view',
    'navigator',
    'official-account',
    'open-data',
    'picker',
    'picker-view',
    'picker-view-column',
    'progress',
    'radio',
    'radio-group',
    'rich-text',
    'scroll-view',
    'slider',
    'swiper',
    'swiper-item',
    'switch',
    'text',
    'textarea',
    'video',
    'view',
    'web-view',
].map((tag) => 'uni-' + tag);
const TAGS = [
    'app',
    'layout',
    'content',
    'main',
    'top-window',
    'left-window',
    'right-window',
    'tabbar',
    'page',
    'page-head',
    'page-wrapper',
    'page-body',
    'page-refresh',
    'actionsheet',
    'modal',
    'toast',
    'resize-sensor',
    'shadow-root',
].map((tag) => 'uni-' + tag);
function isBuiltInComponent(tag) {
    return BUILT_IN_TAGS.indexOf('uni-' + tag) !== -1;
}
function isCustomElement(tag) {
    return TAGS.indexOf(tag) !== -1 || BUILT_IN_TAGS.indexOf(tag) !== -1;
}
function isNativeTag(tag) {
    return (isHTMLTag(tag) || isSVGTag(tag)) && !isBuiltInComponent(tag);
}
const COMPONENT_SELECTOR_PREFIX = 'uni-';
const COMPONENT_PREFIX = 'v-' + COMPONENT_SELECTOR_PREFIX;

class DOMException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DOMException';
    }
}

function normalizeEventType(type) {
    return `on${capitalize(camelize(type))}`;
}
class UniEvent {
    constructor(type, opts) {
        this.defaultPrevented = false;
        this.timeStamp = Date.now();
        this._stop = false;
        this._end = false;
        this.type = type.toLowerCase();
        this.bubbles = !!opts.bubbles;
        this.cancelable = !!opts.cancelable;
    }
    preventDefault() {
        this.defaultPrevented = true;
    }
    stopImmediatePropagation() {
        this._end = this._stop = true;
    }
    stopPropagation() {
        this._stop = true;
    }
}
class UniEventTarget {
    constructor() {
        this._listeners = {};
    }
    dispatchEvent(evt) {
        const listeners = this._listeners[evt.type];
        if (!listeners) {
            return false;
        }
        const len = listeners.length;
        for (let i = 0; i < len; i++) {
            listeners[i].call(this, evt);
            if (evt._end) {
                break;
            }
        }
        return evt.cancelable && evt.defaultPrevented;
    }
    addEventListener(type, listener, options) {
        const isOnce = options && options.once;
        if (isOnce) {
            const wrapper = function (evt) {
                listener.apply(this, [evt]);
                this.removeEventListener(type, wrapper, options);
            };
            return this.addEventListener(type, wrapper, extend(options, { once: false }));
        }
        (this._listeners[type] || (this._listeners[type] = [])).push(listener);
    }
    removeEventListener(type, callback, options) {
        const listeners = this._listeners[type.toLowerCase()];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(callback);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
}

class UniCSSStyleDeclaration {
    constructor() {
        this._cssText = null;
        this._value = null;
    }
    setProperty(property, value) {
        if (value === null || value === '') {
            this.removeProperty(property);
        }
        else {
            if (!this._value) {
                this._value = {};
            }
            this._value[property] = value;
        }
    }
    getPropertyValue(property) {
        if (!this._value) {
            return '';
        }
        return this._value[property] || '';
    }
    removeProperty(property) {
        if (!this._value) {
            return '';
        }
        const value = this._value[property];
        delete this._value[property];
        return value;
    }
    get cssText() {
        return this._cssText || '';
    }
    set cssText(cssText) {
        this._cssText = cssText;
    }
    toJSON() {
        const { _cssText, _value } = this;
        const hasCssText = _cssText !== null;
        const hasValue = _value !== null;
        if (hasCssText && hasValue) {
            return [_cssText, _value];
        }
        return hasCssText ? _cssText : _value;
    }
}
const STYLE_PROPS = [
    '_value',
    '_cssText',
    'cssText',
    'getPropertyValue',
    'setProperty',
    'removeProperty',
    'toJSON',
];
function proxyStyle(uniCssStyle) {
    return new Proxy(uniCssStyle, {
        get(target, key, receiver) {
            if (STYLE_PROPS.indexOf(key) === -1) {
                return target.getPropertyValue(key);
            }
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            if (STYLE_PROPS.indexOf(key) === -1) {
                target.setProperty(key, value);
                return true;
            }
            return Reflect.set(target, key, value, receiver);
        },
    });
}

const NODE_TYPE_PAGE = 0;
const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_TEXT = 3;
const NODE_TYPE_COMMENT = 8;
function sibling(node, type) {
    const { parentNode } = node;
    if (!parentNode) {
        return null;
    }
    const { childNodes } = parentNode;
    return childNodes[childNodes.indexOf(node) + (type === 'n' ? 1 : -1)] || null;
}
function removeNode(node) {
    const { parentNode } = node;
    if (parentNode) {
        parentNode.removeChild(node);
    }
}
function checkNodeId(node) {
    if (!node.nodeId) {
        node.nodeId = node.pageNode.genId();
    }
}
class UniNode extends UniEventTarget {
    constructor(nodeType, nodeName) {
        super();
        this.pageNode = null;
        this.parentNode = null;
        this._text = null;
        this.nodeType = nodeType;
        this.nodeName = nodeName;
        this.childNodes = [];
    }
    get firstChild() {
        return this.childNodes[0] || null;
    }
    get lastChild() {
        const { childNodes } = this;
        const length = childNodes.length;
        return length ? childNodes[length - 1] : null;
    }
    get nextSibling() {
        return sibling(this, 'n');
    }
    get textContent() {
        return this._text || '';
    }
    set textContent(text) {
        this._text = text;
    }
    get parentElement() {
        const { parentNode } = this;
        if (parentNode && parentNode.nodeType === NODE_TYPE_ELEMENT) {
            return parentNode;
        }
        return null;
    }
    get previousSibling() {
        return sibling(this, 'p');
    }
    appendChild(newChild) {
        return this.insertBefore(newChild, null);
    }
    cloneNode(deep) {
        const cloned = extend(Object.create(Object.getPrototypeOf(this)), this);
        const { attributes } = cloned;
        if (attributes) {
            cloned.attributes = extend({}, attributes);
        }
        if (deep) {
            cloned.childNodes = cloned.childNodes.map((childNode) => childNode.cloneNode(true));
        }
        return cloned;
    }
    insertBefore(newChild, refChild) {
        removeNode(newChild);
        newChild.pageNode = this.pageNode;
        newChild.parentNode = this;
        checkNodeId(newChild);
        const { childNodes } = this;
        if (refChild) {
            const index = childNodes.indexOf(refChild);
            if (index === -1) {
                throw new DOMException(`Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`);
            }
            childNodes.splice(childNodes.indexOf(refChild), 0, newChild);
        }
        else {
            childNodes.push(newChild);
        }
        return newChild;
    }
    removeChild(oldChild) {
        const { childNodes } = this;
        const index = childNodes.indexOf(oldChild);
        if (index === -1) {
            throw new DOMException(`Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`);
        }
        oldChild.parentNode = null;
        childNodes.splice(index, 1);
        return oldChild;
    }
}
class UniBaseNode extends UniNode {
    constructor(nodeType, nodeName) {
        super(nodeType, nodeName);
        this.attributes = Object.create(null);
        this._html = null;
        this.style = proxyStyle(new UniCSSStyleDeclaration());
    }
    get className() {
        return (this.attributes['class'] || '');
    }
    set className(val) {
        this.setAttribute('class', val);
    }
    get innerHTML() {
        return '';
    }
    set innerHTML(html) {
        this._html = html;
    }
    addEventListener(type, listener, options) {
        super.addEventListener(type, listener, options);
        const normalized = normalizeEventType(type);
        if (!this.attributes[normalized]) {
            this.setAttribute(normalized, 1);
        }
    }
    removeEventListener(type, callback, options) {
        super.removeEventListener(type, callback, options);
        const normalized = normalizeEventType(type);
        if (this.attributes[normalized]) {
            this.removeAttribute(normalized);
        }
    }
    getAttribute(qualifiedName) {
        return this.attributes[qualifiedName];
    }
    removeAttribute(qualifiedName) {
        delete this.attributes[qualifiedName];
    }
    setAttribute(qualifiedName, value) {
        this.attributes[qualifiedName] = value;
    }
    toJSON() {
        const res = {
            i: this.nodeId,
            n: this.nodeName,
            a: this.attributes,
            s: this.style.toJSON(),
        };
        if (this._text !== null) {
            res.t = this._text;
        }
        return res;
    }
}

class UniCommentNode extends UniNode {
    constructor(text) {
        super(NODE_TYPE_COMMENT, '#comment');
        this._text = text;
    }
}

class UniElement extends UniBaseNode {
    constructor(nodeName) {
        super(NODE_TYPE_ELEMENT, nodeName.toUpperCase());
        this.tagName = this.nodeName;
    }
}
class UniInputElement extends UniElement {
    get value() {
        return this.getAttribute('value');
    }
    set value(val) {
        this.setAttribute('value', val);
    }
}
class UniTextAreaElement extends UniInputElement {
}

class UniTextNode extends UniBaseNode {
    constructor(text) {
        super(NODE_TYPE_TEXT, '#text');
        this._text = text;
    }
    get nodeValue() {
        return this._text || '';
    }
    set nodeValue(text) {
        this._text = text;
    }
}

function getLen(str = '') {
    return ('' + str).replace(/[^\x00-\xff]/g, '**').length;
}
function removeLeadingSlash(str) {
    return str.indexOf('/') === 0 ? str.substr(1) : str;
}
const invokeArrayFns = (fns, arg) => {
    let ret;
    for (let i = 0; i < fns.length; i++) {
        ret = fns[i](arg);
    }
    return ret;
};
function updateElementStyle(element, styles) {
    for (const attrName in styles) {
        element.style[attrName] = styles[attrName];
    }
}
function once(fn, ctx = null) {
    let res;
    return ((...args) => {
        if (fn) {
            res = fn.apply(ctx, args);
            fn = null;
        }
        return res;
    });
}
const sanitise = (val) => (val && JSON.parse(JSON.stringify(val))) || val;
const _completeValue = (value) => (value > 9 ? value : '0' + value);
function formatDateTime({ date = new Date(), mode = 'date' }) {
    if (mode === 'time') {
        return (_completeValue(date.getHours()) + ':' + _completeValue(date.getMinutes()));
    }
    else {
        return (date.getFullYear() +
            '-' +
            _completeValue(date.getMonth() + 1) +
            '-' +
            _completeValue(date.getDate()));
    }
}
function callOptions(options, data) {
    options = options || {};
    if (typeof data === 'string') {
        data = {
            errMsg: data,
        };
    }
    if (/:ok$/.test(data.errMsg)) {
        if (typeof options.success === 'function') {
            options.success(data);
        }
    }
    else {
        if (typeof options.fail === 'function') {
            options.fail(data);
        }
    }
    if (typeof options.complete === 'function') {
        options.complete(data);
    }
}

const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
    const res = obj
        ? Object.keys(obj)
            .map((key) => {
            let val = obj[key];
            if (typeof val === undefined || val === null) {
                val = '';
            }
            else if (isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            return encodeStr(key) + '=' + encodeStr(val);
        })
            .filter((x) => x.length > 0)
            .join('&')
        : null;
    return res ? `?${res}` : '';
}
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
function decode(text) {
    try {
        return decodeURIComponent('' + text);
    }
    catch (err) { }
    return '' + text;
}
function decodedQuery(query = {}) {
    const decodedQuery = {};
    Object.keys(query).forEach((name) => {
        try {
            decodedQuery[name] = decode(query[name]);
        }
        catch (e) {
            decodedQuery[name] = query[name];
        }
    });
    return decodedQuery;
}
const PLUS_RE = /\+/g; // %2B
/**
 * https://github.com/vuejs/vue-router-next/blob/master/src/query.ts
 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
    const query = {};
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?')
        return query;
    const hasLeadingIM = search[0] === '?';
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for (let i = 0; i < searchParams.length; ++i) {
        // pre decode the + into space
        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
        // allow the = character
        let eqPos = searchParam.indexOf('=');
        let key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
        let value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
        if (key in query) {
            // an extra variable for ts types
            let currentValue = query[key];
            if (!isArray(currentValue)) {
                currentValue = query[key] = [currentValue];
            }
            currentValue.push(value);
        }
        else {
            query[key] = value;
        }
    }
    return query;
}

function debounce(fn, delay) {
    let timeout;
    const newFn = function () {
        clearTimeout(timeout);
        const timerFn = () => fn.apply(this, arguments);
        timeout = setTimeout(timerFn, delay);
    };
    newFn.cancel = function () {
        clearTimeout(timeout);
    };
    return newFn;
}

const NAVBAR_HEIGHT = 44;
const TABBAR_HEIGHT = 50;
const ON_REACH_BOTTOM_DISTANCE = 50;
const RESPONSIVE_MIN_WIDTH = 768;
const COMPONENT_NAME_PREFIX = 'VUni';
const PRIMARY_COLOR = '#007aff';
const UNI_SSR = '__uniSSR';
const UNI_SSR_TITLE = 'title';
const UNI_SSR_STORE = 'store';
const UNI_SSR_DATA = 'data';
const UNI_SSR_GLOBAL_DATA = 'globalData';

function getEnvLocale() {
    const { env } = process;
    const lang = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
    return (lang && lang.replace(/[.:].*/, '')) || 'en';
}

export { BUILT_IN_TAGS, COMPONENT_NAME_PREFIX, COMPONENT_PREFIX, COMPONENT_SELECTOR_PREFIX, NAVBAR_HEIGHT, NODE_TYPE_COMMENT, NODE_TYPE_ELEMENT, NODE_TYPE_PAGE, NODE_TYPE_TEXT, ON_REACH_BOTTOM_DISTANCE, PLUS_RE, PRIMARY_COLOR, RESPONSIVE_MIN_WIDTH, TABBAR_HEIGHT, TAGS, UNI_SSR, UNI_SSR_DATA, UNI_SSR_GLOBAL_DATA, UNI_SSR_STORE, UNI_SSR_TITLE, UniBaseNode, UniCommentNode, UniElement, UniEvent, UniInputElement, UniNode, UniTextAreaElement, UniTextNode, addFont, callOptions, createRpx2Unit, debounce, decode, decodedQuery, defaultRpx2Unit, formatDateTime, getCustomDataset, getEnvLocale, getLen, initCustomDataset, invokeArrayFns, isBuiltInComponent, isCustomElement, isNativeTag, normalizeDataset, normalizeTarget, once, parseQuery, passive, plusReady, removeLeadingSlash, sanitise, scrollTo, stringifyQuery, updateElementStyle };
