'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');
var compilerCore = require('@vue/compiler-core');
var shared = require('@vue/shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var component2 = true;
var enableAppxNg = true;
var source = {
	component2: component2,
	enableAppxNg: enableAppxNg
};

function transformRef(node, context) {
    if (!uniCliShared.isUserComponent(node, context)) {
        return;
    }
    addVueRef(node, context);
}
function addVueRef(node, context) {
    // 仅配置了 ref 属性的，才需要增补 vue-ref
    const refProp = compilerCore.findProp(node, 'ref');
    if (!refProp) {
        return;
    }
    const dataRef = 'data-' +
        (context.inVFor
            ? uniCliShared.VUE_REF_IN_FOR
            : uniCliShared.VUE_REF);
    if (refProp.type === 6 /* ATTRIBUTE */) {
        refProp.name = dataRef;
    }
    else {
        refProp.arg.content = dataRef;
    }
    const { props } = node;
    props.splice(props.indexOf(refProp), 0, uniCliShared.createAttributeNode('ref', '__r'));
}

const event = {
    format(name, { isCatch, isComponent }) {
        if (!isComponent && name === 'click') {
            name = 'tap';
        }
        name = eventMap[name] || name;
        return `${isCatch ? 'catch' : 'on'}${shared.capitalize(shared.camelize(name))}`;
    },
};
const eventMap = {
    touchstart: 'touchStart',
    touchmove: 'touchMove',
    touchend: 'touchEnd',
    touchcancel: 'touchCancel',
    longtap: 'longTap',
    longpress: 'longTap',
    transitionend: 'transitionEnd',
    animationstart: 'animationStart',
    animationiteration: 'animationIteration',
    animationend: 'animationEnd',
    firstappear: 'firstAppear',
    // map
    markertap: 'markerTap',
    callouttap: 'calloutTap',
    controltap: 'controlTap',
    regionchange: 'regionChange',
    paneltap: 'panelTap',
    // scroll-view
    scrolltoupper: 'scrollToUpper',
    scrolltolower: 'scrollToLower',
    // movable-view
    changeend: 'changeEnd',
    // video
    timeupdate: 'timeUpdate',
    waiting: 'loading',
    fullscreenchange: 'fullScreenChange',
    useraction: 'userAction',
    renderstart: 'renderStart',
    loadedmetadata: 'renderStart',
    // swiper
    animationfinish: 'animationEnd',
};

const projectConfigFilename = 'mini.project.json';
const miniProgram = {
    event,
    class: {
        array: false,
    },
    slot: {
        $slots: true,
        // 支付宝 fallback 有 bug，当多个带默认 slot 组件嵌套使用时，所有的默认slot均会显示，如uni-file-picker(image)
        fallback: false,
    },
    directive: 'a:',
};
// TODO getPhoneNumber 等事件
const nodeTransforms = [
    transformRef,
    uniCliShared.createTransformComponentLink(uniCliShared.COMPONENT_ON_LINK, 6 /* ATTRIBUTE */),
];
const tags = [
    'lifestyle',
    'life-follow',
    'contact-button',
    'spread',
    'error-view',
    'poster',
    'cashier',
    'ix-grid',
    'ix-native-grid',
    'ix-native-list',
    'mkt',
];
function isCustomElement(tag) {
    return tags.includes(tag);
}
const options = {
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['mycomponents'],
        },
    },
    global: 'my',
    json: {
        windowOptionsMap: {
            defaultTitle: 'navigationBarTitleText',
            pullRefresh: 'enablePullDownRefresh',
            allowsBounceVertical: 'allowsBounceVertical',
            titleBarColor: 'navigationBarBackgroundColor',
            optionMenu: 'optionMenu',
            backgroundColor: 'backgroundColor',
            usingComponents: 'usingComponents',
            navigationBarShadow: 'navigationBarShadow',
            titleImage: 'titleImage',
            transparentTitle: 'transparentTitle',
            titlePenetrate: 'titlePenetrate',
        },
        tabBarOptionsMap: {
            textColor: 'color',
            selectedColor: 'selectedColor',
            backgroundColor: 'backgroundColor',
            items: 'list',
        },
        tabBarItemOptionsMap: {
            pagePath: 'pagePath',
            name: 'text',
            icon: 'iconPath',
            activeIcon: 'selectedIconPath',
        },
    },
    app: {
        darkmode: false,
        subpackages: true,
    },
    project: {
        filename: projectConfigFilename,
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                // TODO 标签内的 code 代码需要独立生成一个 sjs 文件
                // 暂不处理，让开发者自己全部使用 src 引入
                return `<import-sjs name="${filter.name}" from="${filename}.sjs"/>`;
            },
        }, extname: '.axml', compilerOptions: {
            isCustomElement,
            nodeTransforms,
        } }),
    style: {
        extname: '.acss',
    },
};

const uniMiniProgramAlipayPlugin = {
    name: 'vite:uni-mp-alipay',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: {
                assetsInlineLimit: 0,
            },
        };
    },
};
var index = [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
