'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var compilerCore = require('@vue/compiler-core');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

var uniad_app_json = function (appJson) {
  if (!appJson.plugins) {
    appJson.plugins = {};
  }
  if (!appJson.plugins['uni-ad']) {
    appJson.plugins['uni-ad'] = {
      version: '1.1.10',
      provider: 'wxf72d316417b6767f',
    };
  }
  if (!appJson.plugins['coral-adv']) {
    appJson.plugins['coral-adv'] = {
      version: '1.0.18',
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

var uniadAppJson = uniad_app_json;

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
        node.tagType = 1 /* ElementTypes.COMPONENT */;
    }
    if (appJsonUniadFlag) {
        return;
    }
    if (AD_COMPONENTS.indexOf(node.tag) > -1) {
        appJsonUniadFlag = true;
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
    'grid-view',
    'list-view',
    'sticky-header',
    'sticky-section',
];
const compilerOptions = {
    nodeTransforms: [uniCliShared.transformRef, uniCliShared.transformComponentLink, transformAd],
};
const COMPONENTS_DIR = 'wxcomponents';
const miniProgram = {
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
        // iOS 平台需要延迟
        input: [{ name: 'bind', arg: ['type'] }],
        textarea: [{ name: 'on', arg: ['input'] }],
    },
    component: {
        dir: COMPONENTS_DIR,
        vShow: uniCliShared.COMPONENT_CUSTOM_HIDDEN,
        getPropertySync: false,
        normalizeName: (name) => name.startsWith('wx-') ? name.replace('wx-', 'weixin-') : name,
    },
};
const projectConfigFilename = 'project.config.json';
const options = {
    cdn: 1,
    vite: {
        inject: {
            uni: [path__default.default.resolve(__dirname, 'uni.api.esm.js'), 'default'],
            wx: [path__default.default.resolve(__dirname, 'uni.api.esm.js'), 'wx'],
        },
        alias: {
            'uni-mp-runtime': path__default.default.resolve(__dirname, 'uni.mp.esm.js'),
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
    template: Object.assign(Object.assign({}, miniProgram), { customElements, filter: {
            extname: '.wxs',
            lang: 'wxs',
            generate(filter, filename) {
                if (filename) {
                    return `<wxs src="${filename}.wxs" module="${filter.name}"/>`;
                }
                return `<wxs module="${filter.name}">
${filter.code}
</wxs>`;
            },
        }, extname: '.wxml', compilerOptions }),
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
