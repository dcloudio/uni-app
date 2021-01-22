import { isPlainObject, isHTMLTag, isSVGTag } from '@vue/shared';

const NAVBAR_HEIGHT = 44;
const TABBAR_HEIGHT = 50;
const COMPONENT_NAME_PREFIX = 'VUni';

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

const BUILT_IN_TAGS = [
    'uni-ad',
    'uni-audio',
    'uni-button',
    'uni-camera',
    'uni-canvas',
    'uni-checkbox',
    'uni-checkbox-group',
    'uni-cover-image',
    'uni-cover-view',
    'uni-editor',
    'uni-form',
    'uni-functional-page-navigator',
    'uni-icon',
    'uni-image',
    'uni-input',
    'uni-label',
    'uni-live-player',
    'uni-live-pusher',
    'uni-map',
    'uni-movable-area',
    'uni-movable-view',
    'uni-navigator',
    'uni-official-account',
    'uni-open-data',
    'uni-picker',
    'uni-picker-view',
    'uni-picker-view-column',
    'uni-progress',
    'uni-radio',
    'uni-radio-group',
    'uni-rich-text',
    'uni-scroll-view',
    'uni-slider',
    'uni-swiper',
    'uni-swiper-item',
    'uni-switch',
    'uni-text',
    'uni-textarea',
    'uni-video',
    'uni-view',
    'uni-web-view',
];
const TAGS = [
    'uni-app',
    'uni-layout',
    'uni-content',
    'uni-main',
    'uni-top-window',
    'uni-left-window',
    'uni-right-window',
    'uni-tabbar',
    'uni-page',
    'uni-page-head',
    'uni-page-wrapper',
    'uni-page-body',
    'uni-page-refresh',
    'uni-actionsheet',
    'uni-modal',
    'uni-toast',
    'uni-resize-sensor',
    'uni-shadow-root',
];
function isBuiltInComponent(tag) {
    return BUILT_IN_TAGS.indexOf('uni-' + tag) !== -1;
}
function isCustomElement(tag) {
    return TAGS.indexOf(tag) !== -1 || BUILT_IN_TAGS.indexOf(tag) !== -1;
}
function isNativeTag(tag) {
    return (isHTMLTag(tag) || isSVGTag(tag)) && !isBuiltInComponent(tag);
}
const COMPONENT_PREFIX = 'v-uni-';

export { BUILT_IN_TAGS, COMPONENT_NAME_PREFIX, COMPONENT_PREFIX, NAVBAR_HEIGHT, TABBAR_HEIGHT, TAGS, debounce, isBuiltInComponent, isCustomElement, isNativeTag, plusReady, stringifyQuery };
