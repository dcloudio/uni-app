'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

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

/**
 * 小红书小程序的Page和自定义组件，不支持动态事件绑定，需要通过__e转发
 */
const transformOn = uniCliShared.createTransformOn(uniMpCompiler.transformOn, {
    match: (name, node, context) => {
        return true;
    },
});

/**
 * 小红书小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 */
const transformModel = uniCliShared.createTransformModel(uniMpCompiler.transformModel);

const directiveTransforms = {
    on: transformOn,
    model: transformModel,
};
const compilerOptions = {
    nodeTransforms: [
        uniCliShared.transformRef,
        // transformComponentLink,
        uniCliShared.transformMatchMedia,
    ],
    directiveTransforms,
};
const COMPONENTS_DIR = 'xhscomponents';
const miniProgram = {
    class: {
        array: false,
    },
    slot: {
        fallbackContent: false,
        dynamicSlotNames: false,
    },
    event: {
        key: true,
    },
    directive: 'xhs:',
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
    },
};
const projectConfigFilename = 'project.config.json';
const options = {
    cdn: 3,
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
                // ...(process.env.UNI_MP_PLUGIN ? [copyMiniProgramPluginJson] : []),
                {
                    src: [
                        'sitemap.json',
                        'project.private.config.json',
                        projectConfigFilename,
                    ],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
                // ...copyMiniProgramThemeJson(),
            ],
        },
    },
    global: 'xhs',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.config.json'],
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: 
        // undefined,
        {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                if (filename) {
                    return `<import-sjs src="${filename}.sjs" module="${filter.name}"/>`;
                }
                return `<import-sjs module="${filter.name}">
    ${filter.code}
    </import-sjs>`;
            },
        }, extname: '.xhsml', compilerOptions }),
    style: {
        extname: '.css',
    },
};

const uniMiniProgramXhsPlugin = {
    name: 'uni:mp-xhs',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: {
                // 图片资源转行内base64最大size限制
                assetsInlineLimit: uniCliShared.ASSETS_INLINE_LIMIT,
            },
        };
    },
};
var index = [uniMiniProgramXhsPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
