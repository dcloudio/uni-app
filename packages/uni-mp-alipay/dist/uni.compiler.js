'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var shared = require('@vue/shared');
var path = require('path');
var fs = require('fs');
var compilerCore = require('@vue/compiler-core');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);

var appid = "touristappid";
var component2 = true;
var enableAppxNg = true;
var axmlStrictCheck = false;
var enableDistFileMinify = false;
var enableParallelLoader = false;
var enableNodeModuleBabelTransform = true;
var format = 2;
var pluginResolution = {
};
var developOptions = {
};
var compileOptions = {
};
var uploadExclude = [
];
var assetsInclude = [
];
var source = {
	appid: appid,
	component2: component2,
	enableAppxNg: enableAppxNg,
	axmlStrictCheck: axmlStrictCheck,
	enableDistFileMinify: enableDistFileMinify,
	enableParallelLoader: enableParallelLoader,
	enableNodeModuleBabelTransform: enableNodeModuleBabelTransform,
	format: format,
	pluginResolution: pluginResolution,
	developOptions: developOptions,
	compileOptions: compileOptions,
	uploadExclude: uploadExclude,
	assetsInclude: assetsInclude
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
    const dataRef = 'u-' +
        (context.inVFor
            ? uniCliShared.VUE_REF_IN_FOR
            : uniCliShared.VUE_REF);
    if (refProp.type === compilerCore.NodeTypes.ATTRIBUTE) {
        refProp.name = dataRef;
    }
    else {
        refProp.arg.content = dataRef;
    }
    const { props } = node;
    props.splice(props.indexOf(refProp), 0, uniCliShared.createAttributeNode('ref', '__r'));
}

const customizeRE = /:/g;
function customizeEvent(str) {
    return shared.camelize(str.replace(customizeRE, '-'));
}

const event = {
    format(name, { isCatch, isCapture, isComponent }) {
        if (!isComponent && name === 'click') {
            name = 'tap';
        }
        name = eventMap[name] || name;
        // 处理支付宝支持捕获 https://opendocs.alipay.com/mini/framework/events#%E4%BA%8B%E4%BB%B6%E7%9A%84%E6%8D%95%E8%8E%B7%E9%98%B6%E6%AE%B5
        return `${isCapture ? 'capture-' : ''}${isCatch ? 'catch' : 'on'}${shared.capitalize(customizeEvent(name))}`;
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
    chooseavatar: 'chooseAvatar',
};

function transformOpenType(node) {
    var _a;
    if (node.type !== compilerCore.NodeTypes.ELEMENT || node.tag !== 'button') {
        return;
    }
    const openTypeProp = compilerCore.findProp(node, 'open-type');
    if (!openTypeProp) {
        return;
    }
    if (openTypeProp.type !== compilerCore.NodeTypes.ATTRIBUTE ||
        ((_a = openTypeProp.value) === null || _a === void 0 ? void 0 : _a.content) !== 'getPhoneNumber') {
        return;
    }
    openTypeProp.value.content = 'getAuthorize';
    const { props } = node;
    props.splice(props.indexOf(openTypeProp) + 1, 0, uniCliShared.createAttributeNode('scope', 'phoneNumber'));
    let getPhoneNumberMethodName = '';
    const getPhoneNumberPropIndex = props.findIndex((prop) => {
        if (prop.type === compilerCore.NodeTypes.DIRECTIVE && prop.name === 'on') {
            const { arg, exp } = prop;
            if ((arg === null || arg === void 0 ? void 0 : arg.type) === compilerCore.NodeTypes.SIMPLE_EXPRESSION &&
                (exp === null || exp === void 0 ? void 0 : exp.type) === compilerCore.NodeTypes.SIMPLE_EXPRESSION &&
                arg.isStatic &&
                arg.content === 'getphonenumber') {
                getPhoneNumberMethodName = exp.content;
                return true;
            }
        }
    });
    if (!getPhoneNumberMethodName) {
        return;
    }
    props.splice(getPhoneNumberPropIndex, 1);
    const method = compilerCore.isSimpleIdentifier(getPhoneNumberMethodName)
        ? getPhoneNumberMethodName
        : `$event => { ${getPhoneNumberMethodName} }`;
    props.push(uniCliShared.createOnDirectiveNode('getAuthorize', `$onAliGetAuthorize(${method},$event)`));
    props.push(uniCliShared.createOnDirectiveNode('error', `$onAliAuthError(${method},$event)`));
}

const projectConfigFilename = 'mini.project.json';
const COMPONENTS_DIR = 'mycomponents';
const miniProgram = {
    event,
    class: {
        array: false,
    },
    slot: {
        $slots: false,
        // 支付宝 fallback 有 bug，当多个带默认 slot 组件嵌套使用时，所有的默认slot均会显示，如uni-file-picker(image)
        fallbackContent: true,
        dynamicSlotNames: true,
    },
    directive: 'a:',
    component: {
        dir: COMPONENTS_DIR,
        getPropertySync: true,
    },
    filter: {
        lang: 'sjs',
        setStyle: true,
    },
};
const nodeTransforms = [
    transformRef,
    transformOpenType,
    uniCliShared.transformMatchMedia,
    uniCliShared.createTransformComponentLink(uniCliShared.COMPONENT_ON_LINK, compilerCore.NodeTypes.ATTRIBUTE),
];
const compilerOptions = {
    nodeTransforms,
};
const customElements = [
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
    'page-container',
    'page-meta',
    'root-portal',
    'share-element',
    'lottie',
    'join-group-chat',
    'subscribe-message',
    'mpaas-component',
];
const options = {
    cdn: 2,
    vite: {
        inject: {
            uni: [path__default.default.resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default.default.resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: [COMPONENTS_DIR],
            targets: [
                ...(process.env.UNI_MP_PLUGIN ? [uniCliShared.copyMiniProgramPluginJson] : []),
                {
                    src: ['customize-tab-bar', 'ext.json', 'preload.json'],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
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
            customize: 'customize',
            textColor: 'color',
            selectedColor: 'selectedColor',
            backgroundColor: 'backgroundColor',
            items: 'list',
            overlay: 'overlay',
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
        plugins: true,
        usingComponents: false,
        normalize(appJson) {
            // 支付宝小程序默认主包，分包 js 模块不共享，会导致 getCurrentInstance，setCurrentInstance 不一致
            appJson.subPackageBuildType = 'shared';
            return appJson;
        },
    },
    project: {
        filename: projectConfigFilename,
        config: ['mini.project.json', 'project.my.json'],
        source,
        normalize(projectJson) {
            var _a;
            const miniprogram = (_a = projectJson.condition) === null || _a === void 0 ? void 0 : _a.miniprogram;
            if (miniprogram && shared.isArray(miniprogram.list) && miniprogram.list.length) {
                const compileModeJson = {
                    modes: [],
                };
                compileModeJson.modes = miniprogram.list.map((item) => {
                    return {
                        title: item.name,
                        page: item.pathName,
                        pageQuery: item.query,
                    };
                });
                const miniIdeDir = path__default.default.join(process.env.UNI_OUTPUT_DIR, '.mini-ide');
                if (!fs__default.default.existsSync(miniIdeDir)) {
                    fs__default.default.mkdirSync(miniIdeDir, { recursive: true });
                    fs__default.default.writeFileSync(path__default.default.join(miniIdeDir, 'compileMode.json'), JSON.stringify(compileModeJson, null, 2));
                }
                delete projectJson.condition;
            }
            return projectJson;
        },
    },
    template: Object.assign(Object.assign({}, miniProgram), { customElements, filter: {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                // TODO 标签内的 code 代码需要独立生成一个 sjs 文件
                // 暂不处理，让开发者自己全部使用 src 引入
                return `<import-sjs name="${filter.name}" from="${filename}.sjs"/>`;
            },
        }, extname: '.axml', compilerOptions }),
    style: {
        extname: '.acss',
    },
};

const uniMiniProgramAlipayPlugin = {
    name: 'uni:mp-alipay',
    config() {
        const buildOptions = {};
        if (process.env.NODE_ENV === 'production') {
            buildOptions.terserOptions = {
                compress: false,
                mangle: false,
            };
        }
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: shared.extend({
                assetsInlineLimit: 0,
            }, buildOptions),
        };
    },
    // fix question/159362
    transform(code, id) {
        if (id.includes('@vue/shared') || id.includes('@vue\\shared')) {
            return {
                code: code.replace('//gs', '//g'),
                map: { mappings: '' },
            };
        }
    },
};
var index = [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
