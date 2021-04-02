'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@vue/shared');

const NAVBAR_HEIGHT = 44;
const TABBAR_HEIGHT = 50;
const RESPONSIVE_MIN_WIDTH = 768;
const COMPONENT_NAME_PREFIX = 'VUni';
const PRIMARY_COLOR = '#007aff';

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

function plusReady(callback) {
    if (typeof callback !== 'function') {
        return;
    }
    if (window.plus) {
        return callback();
    }
    document.addEventListener('plusready', callback);
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
            else if (shared.isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            return encodeStr(key) + '=' + encodeStr(val);
        })
            .filter((x) => x.length > 0)
            .join('&')
        : null;
    return res ? `?${res}` : '';
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
    return (shared.isHTMLTag(tag) || shared.isSVGTag(tag)) && !isBuiltInComponent(tag);
}
const COMPONENT_SELECTOR_PREFIX = 'uni-';
const COMPONENT_PREFIX = 'v-' + COMPONENT_SELECTOR_PREFIX;

exports.BUILT_IN_TAGS = BUILT_IN_TAGS;
exports.COMPONENT_NAME_PREFIX = COMPONENT_NAME_PREFIX;
exports.COMPONENT_PREFIX = COMPONENT_PREFIX;
exports.COMPONENT_SELECTOR_PREFIX = COMPONENT_SELECTOR_PREFIX;
exports.NAVBAR_HEIGHT = NAVBAR_HEIGHT;
exports.PRIMARY_COLOR = PRIMARY_COLOR;
exports.RESPONSIVE_MIN_WIDTH = RESPONSIVE_MIN_WIDTH;
exports.TABBAR_HEIGHT = TABBAR_HEIGHT;
exports.TAGS = TAGS;
exports.debounce = debounce;
exports.isBuiltInComponent = isBuiltInComponent;
exports.isCustomElement = isCustomElement;
exports.isNativeTag = isNativeTag;
exports.plusReady = plusReady;
exports.stringifyQuery = stringifyQuery;
