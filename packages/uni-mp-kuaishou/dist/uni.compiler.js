'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

var description = "项目配置文件";
var packOptions = {
	ignore: [
	]
};
var setting = {
	urlCheck: false,
	es6: true,
	enhance: false,
	postcss: true,
	preloadBackgroundData: false,
	minified: true,
	newFeature: false,
	coverView: true,
	nodeModules: false,
	autoAudits: false,
	showShadowRootInWxmlPanel: true,
	scopeDataCheck: false,
	uglifyFileName: false,
	checkInvalidKey: true,
	checkSiteMap: true,
	uploadWithSourceMap: true,
	compileHotReLoad: false,
	babelSetting: {
		ignore: [
		],
		disablePlugins: [
		],
		outputPath: ""
	},
	useIsolateContext: true,
	useCompilerModule: false,
	userConfirmedUseCompilerModuleSwitch: false
};
var compileType = "miniprogram";
var libVersion = "";
var appid = "";
var projectname = "";
var debugOptions = {
	hidedInDevtools: [
	]
};
var scripts = {
};
var isGameTourist = false;
var simulatorPluginLibVersion = {
};
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
	plugin: {
		current: -1,
		list: [
		]
	},
	gamePlugin: {
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
	debugOptions: debugOptions,
	scripts: scripts,
	isGameTourist: isGameTourist,
	simulatorPluginLibVersion: simulatorPluginLibVersion,
	condition: condition
};

// import { transformOn } from './transforms/vOn'
// import { transformModel } from './transforms/vModel'
const nodeTransforms = [uniCliShared.transformRef, uniCliShared.transformComponentLink];
// const directiveTransforms = {
//   on: transformOn,
//   model: transformModel,
// }
const customElements = [
    'playlet',
    'ad',
    'follow-service',
    'payment-list',
    'web-view',
    'playlet-plugin',
];
const compilerOptions = {
    nodeTransforms,
    // directiveTransforms,
};
const COMPONENTS_DIR = 'kscomponents';
const miniProgram = {
    class: {
        array: false,
    },
    slot: {
        fallbackContent: false,
        dynamicSlotNames: true,
    },
    directive: 'ks:',
    lazyElement: {
        switch: [{ name: 'on', arg: ['change'] }],
    },
    component: {
        dir: COMPONENTS_DIR,
    },
};
const projectConfigFilename = 'project.config.json';
const options = {
    cdn: 9,
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
                {
                    src: ['ext.json'],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
        },
    },
    global: 'ks',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.ks.json'],
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { customElements, filter: undefined, extname: '.ksml', compilerOptions }),
    style: {
        extname: '.css',
    },
};

const uniMiniProgramKuaishouPlugin = {
    name: 'uni:mp-kuaishou',
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
var index = [uniMiniProgramKuaishouPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
