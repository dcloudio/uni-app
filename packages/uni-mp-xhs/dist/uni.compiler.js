'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

var name = "@dcloudio/uni-mp-xhs";
var version = "3.0.0-alpha-4010820240517001";
var description$1 = "uniapp mp-xhs";
var main = "dist/index.js";
var files = [
	"dist",
	"lib"
];
var repository = {
	type: "git",
	url: "git+https://github.com/dcloudio/uni-app.git",
	directory: "packages/uni-mp-xhs"
};
var scripts = {
	test: "echo \"Error: no test specified\" && exit 1"
};
var license = "Apache-2.0";
var gitHead = "33e807d66e1fe47e2ee08ad9c59247e37b8884da";
var devDependencies = {
	"@dcloudio/uni-mp-weixin": "3.0.0-alpha-4010820240517001",
	"@dcloudio/uni-mp-alipay": "3.0.0-alpha-4010820240517001",
	"@vue/compiler-core": "3.4.21"
};
var dependencies = {
	"@dcloudio/uni-cli-shared": "3.0.0-alpha-4010820240517001",
	"@dcloudio/uni-mp-compiler": "3.0.0-alpha-4010820240517001",
	"@dcloudio/uni-mp-vite": "3.0.0-alpha-4010820240517001",
	"@dcloudio/uni-mp-vue": "3.0.0-alpha-4010820240517001",
	"@dcloudio/uni-shared": "3.0.0-alpha-4010820240517001",
	"@vue/shared": "3.4.21"
};
var packageJson = {
	name: name,
	version: version,
	description: description$1,
	main: main,
	files: files,
	repository: repository,
	scripts: scripts,
	license: license,
	"uni-app": {
	name: "mp-xhs",
	title: "小红书小程序",
	apply: [
		"mp-xhs"
	],
	main: "dist/uni.compiler.js"
},
	gitHead: gitHead,
	devDependencies: devDependencies,
	dependencies: dependencies
};

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

const transformOn = uniCliShared.createTransformOn(uniMpCompiler.transformOn);

const transformModel = uniCliShared.createTransformModel(uniMpCompiler.transformModel);

const directiveTransforms = {
    on: transformOn,
    model: transformModel,
};
const compilerOptions = {
    nodeTransforms: [uniCliShared.transformRef, uniCliShared.transformComponentLink, uniCliShared.transformMatchMedia],
    directiveTransforms,
};
const COMPONENTS_DIR = 'xhscomponents';
/**
 * 收集 Uniapp 框架信息，for 小红书开发者工具埋点上报
 */
const uniappInfoSource = Object.assign(source, {
    framework: {
        tool: 'Uniapp',
        name: packageJson.name,
        version: packageJson.version,
    },
});
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
    cdn: 12,
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
        source: uniappInfoSource,
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                return `<sjs src="${filename}.sjs" module="${filter.name}"/>`;
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
