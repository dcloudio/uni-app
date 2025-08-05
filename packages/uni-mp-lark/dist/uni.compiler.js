'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);

var setting = {
	urlCheck: false,
	es6: true,
	postcss: false,
	minified: false,
	newFeature: true
};
var appid = "testAppId";
var projectname = "";
var condition = {
	miniprogram: {
		current: -1
	}
};
var source = {
	setting: setting,
	appid: appid,
	projectname: projectname,
	condition: condition
};

const customElements = [
    'draw-ad',
    'aweme-data',
    'consume-card',
    'pay-button',
    'rate-button',
    'member-button',
    'confirm-receipt-button',
    'live-preview',
    'aweme-live-book',
    'aweme-user-card',
    'rtc-room',
    'clue-order-form',
    'shop-follow-card',
    ...uniCliShared.getNativeTags(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM),
];
const projectConfigFilename = 'project.config.json';
const nodeTransforms = [
    uniCliShared.transformRef,
    uniCliShared.transformMatchMedia,
    uniCliShared.transformComponentLink,
];
if (process.env.UNI_APP_X === 'true') {
    nodeTransforms.push(uniCliShared.transformMPBuiltInTag, uniCliShared.transformDirection);
}
const compilerOptions = {
    nodeTransforms,
};
const COMPONENTS_DIR = 'ttcomponents';
const miniProgram = {
    class: {
        array: false,
    },
    slot: {
        fallbackContent: true,
        dynamicSlotNames: true,
    },
    directive: 'tt:',
    component: {
        dir: COMPONENTS_DIR,
        vShow: uniCliShared.COMPONENT_CUSTOM_HIDDEN_BIND,
    },
    filter: {
        lang: 'sjs',
        setStyle: true,
    },
};
const options = {
    cdn: 4,
    vite: {
        inject: {
            uni: [initMiniProgramPlugin.resolveMiniProgramRuntime(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': initMiniProgramPlugin.resolveMiniProgramRuntime(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: [COMPONENTS_DIR],
            targets: [
                {
                    src: ['ext.json', 'package.json', 'project.private.config.json'],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
        },
    },
    global: 'tt',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: false,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.tt.json'],
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { customElements, filter: Object.assign(Object.assign({}, miniProgram.filter), { extname: '.sjs', lang: 'sjs', generate(filter, filename) {
                if (filename) {
                    return `<sjs src="${filename}.sjs" module="${filter.name}"/>`;
                }
                return `<sjs module="${filter.name}">
${filter.code}
</sjs>`;
            } }), extname: '.ttml', compilerOptions }),
    style: {
        extname: '.ttss',
    },
};

const uniMiniProgramToutiaoPlugin = {
    name: 'uni:mp-lark',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: true,
            },
            build: {
                // css 中不支持引用本地资源
                assetsInlineLimit: uniCliShared.ASSETS_INLINE_LIMIT,
            },
        };
    },
};
options.vite.copyOptions.targets = [
    ...(options.vite.copyOptions.targets || []),
    ...uniCliShared.copyMiniProgramThemeJson(),
];
options.app.darkmode = true;
options.cdn = 10;
options.template.slot.fallbackContent = false;
options.project.config = ['project.lark.json'];
var index = [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
