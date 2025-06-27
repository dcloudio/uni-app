'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var compilerCore = require('@vue/compiler-core');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var uniad_app_json = function (appJson) {
  if (!appJson.plugins) {
    appJson.plugins = {};
  }
  if (!appJson.plugins['uni-ad']) {
    appJson.plugins['uni-ad'] = {
      version: '1.3.7',
      provider: 'wxf72d316417b6767f',
    };
  }
  if (!appJson.plugins['coral-adv']) {
    appJson.plugins['coral-adv'] = {
      version: '1.0.27',
      provider: 'wx0e203209e27b1e66',
    };
  }

  if (!appJson.usingComponents) {
    appJson.usingComponents = {};
  }
  if (!appJson.usingComponents['uniad-plugin']) {
    appJson.usingComponents['uniad-plugin'] = 'plugin://uni-ad/ad';
  }
};

var uniadAppJson = /*@__PURE__*/getDefaultExportFromCjs(uniad_app_json);

const AD_COMPONENTS = [
    'uniad',
    'ad-rewarded-video',
    'ad-fullscreen-video',
    'ad-interstitial',
];
let appJsonUniadFlag = false;
function transformAd(node, context) {
    if (!uniCliShared.isElementNode(node)) {
        return;
    }
    const adpidProp = compilerCore.findProp(node, 'adpid');
    if (node.tag === 'ad' && adpidProp) {
        node.tag = 'uniad';
        node.tagType = compilerCore.ElementTypes.COMPONENT;
    }
    if (appJsonUniadFlag) {
        return;
    }
    if (AD_COMPONENTS.indexOf(node.tag) > -1) {
        appJsonUniadFlag = true;
        process.env.HAS_WXAD = '1';
        uniadAppJson(uniCliShared.findJsonFile('app'));
    }
}

var description = "项目配置文件。";
var packOptions = {
	ignore: [
	]
};
var setting = {
	urlCheck: false,
	es6: true,
	postcss: false,
	minified: false,
	newFeature: true,
	bigPackageSizeSupport: true
};
var compileType = "miniprogram";
var libVersion = "";
var appid = "touristappid";
var projectname = "";
var condition = {
	search: {
		current: -1,
		list: [
		]
	},
	conversation: {
		current: -1,
		list: [
		]
	},
	game: {
		current: -1,
		list: [
		]
	},
	miniprogram: {
		current: -1,
		list: [
		]
	}
};
var source = {
	description: description,
	packOptions: packOptions,
	setting: setting,
	compileType: compileType,
	libVersion: libVersion,
	appid: appid,
	projectname: projectname,
	condition: condition
};

const customElements = [
    'page-container',
    'page-meta',
    'navigation-bar',
    'match-media',
    'ad-custom',
    'share-element',
    'channel-live',
    'channel-video',
    'voip-room',
    'root-portal',
    'subscribe',
    // 手势组件
    'tap-gesture-handler',
    'double-tap-gesture-handler',
    'scale-gesture-handler',
    'force-press-gesture-handler',
    'pan-gesture-handler',
    'vertical-drag-gesture-handler',
    'horizontal-drag-gesture-handler',
    'long-press-gesture-handler',
    //其他
    'draggable-sheet',
    'grid-builder',
    'grid-view',
    'list-builder',
    'list-view',
    'nested-scroll-body',
    'nested-scroll-header',
    'open-container',
    'share-element',
    'snapshot',
    // 'span', //  todo: 临时移除 span 的支持，后续判断 skyline 环境进行区分 ask 190418
    'sticky-header',
    'sticky-section',
    'store-product',
    'store-home',
    'keyboard-accessory',
];
const nodeTransforms = [
    uniCliShared.transformRef,
    uniCliShared.transformComponentLink,
    transformAd,
];
if (process.env.UNI_APP_X === 'true') {
    nodeTransforms.push(uniCliShared.transformMPBuiltInTag, uniCliShared.transformDirection);
}
const compilerOptions = {
    nodeTransforms,
};
const COMPONENTS_DIR = 'wxcomponents';
function getMiniProgramOptions(isX) {
    return {
        class: {
            array: true,
        },
        slot: {
            fallbackContent: false,
            dynamicSlotNames: true,
        },
        event: {
            key: true,
        },
        directive: 'wx:',
        lazyElement: {
            canvas: [
                { name: 'bind', arg: ['canvas-id', 'id'] },
                {
                    name: 'on',
                    arg: ['touchstart', 'touchmove', 'touchcancel', 'touchend'],
                },
            ],
            editor: [
                {
                    name: 'on',
                    arg: ['ready'],
                },
            ],
            'scroll-view': [
                {
                    name: 'on',
                    arg: ['dragstart', 'dragging', 'dragend'],
                },
            ],
            'picker-view': [{ name: 'bind', arg: ['value'] }],
            // iOS 平台需要延迟
            input: [{ name: 'bind', arg: ['type'] }],
            textarea: [{ name: 'on', arg: ['input'] }],
        },
        component: {
            ':host': true,
            dir: COMPONENTS_DIR,
            vShow: uniCliShared.COMPONENT_CUSTOM_HIDDEN,
            // 在 x 里边，已经把 u-p 补充了 || '' 来规避，理论上非 x 也可以，目前为了兼容性，暂时不开启
            getPropertySync: isX, // 为了避免 Setting data field "uP" to undefined is invalid 警告
            normalizeName: (name) => name.startsWith('wx-') ? name.replace('wx-', 'weixin-') : name,
        },
        filter: {
            lang: 'wxs',
            setStyle: true,
        },
    };
}
const projectConfigFilename = 'project.config.json';
const miniProgram = getMiniProgramOptions(process.env.UNI_APP_X === 'true');
const options = {
    cdn: 1,
    vite: {
        inject: {
            uni: [initMiniProgramPlugin.resolveMiniProgramRuntime(__dirname, 'uni.api.esm.js'), 'default'],
            wx: [initMiniProgramPlugin.resolveMiniProgramRuntime(__dirname, 'uni.api.esm.js'), 'wx'],
        },
        alias: {
            'uni-mp-runtime': initMiniProgramPlugin.resolveMiniProgramRuntime(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: [COMPONENTS_DIR],
            targets: [
                ...(process.env.UNI_MP_PLUGIN ? [uniCliShared.copyMiniProgramPluginJson] : []),
                {
                    src: [
                        'sitemap.json',
                        'ext.json',
                        'custom-tab-bar',
                        'functional-pages',
                        'project.private.config.json',
                        projectConfigFilename,
                    ],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
                ...uniCliShared.copyMiniProgramThemeJson(),
            ],
        },
    },
    global: 'wx',
    app: {
        darkmode: true,
        subpackages: true,
        plugins: true,
        usingComponents: true,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.wx.json', 'project.config.json'],
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { customElements, filter: Object.assign(Object.assign({}, miniProgram.filter), { lang: 'wxs', extname: '.wxs', generate(filter, filename) {
                if (filename) {
                    return `<wxs src="${filename}.wxs" module="${filter.name}"/>`;
                }
                return `<wxs module="${filter.name}">
${filter.code}
</wxs>`;
            } }), extname: '.wxml', compilerOptions }),
    style: {
        extname: '.wxss',
    },
};

const uniMiniProgramWeixinPlugin = {
    name: 'uni:mp-weixin',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: {
                // css 中不支持引用本地资源
                assetsInlineLimit: uniCliShared.ASSETS_INLINE_LIMIT,
            },
        };
    },
};
var index = [uniMiniProgramWeixinPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
