'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var fs = require('fs-extra');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);

let isFixed = false;
function fix2648(bundle) {
    if (isFixed) {
        return;
    }
    const appJsonAsset = bundle['app.json'];
    if (!appJsonAsset) {
        return;
    }
    try {
        const { usingComponents } = JSON.parse(appJsonAsset.source.toString());
        if (usingComponents && usingComponents['fix-2648']) {
            fs__default.default.outputFileSync(path__default.default.resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.json'), `{"component":true}`);
            fs__default.default.outputFileSync(path__default.default.resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.qml'), `<!-- https://github.com/dcloudio/uni-app/issues/2648 -->`);
            fs__default.default.outputFileSync(path__default.default.resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.js'), `Component({})`);
        }
        isFixed = true;
    }
    catch (_a) { }
}

var description = "项目配置文件。";
var packOptions = {
	ignore: [
	]
};
var setting = {
	urlCheck: true,
	es6: true,
	postcss: false,
	minified: false,
	newFeature: true,
	nodeModules: false
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

const nodeTransforms = [
    uniCliShared.transformRef,
    uniCliShared.transformMatchMedia,
    uniCliShared.transformComponentLink,
];
const compilerOptions = {
    nodeTransforms,
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
    directive: 'qq:',
    lazyElement: {
        editor: [
            {
                name: 'on',
                arg: ['ready'],
            },
        ],
        video: [
            {
                name: 'on',
                arg: [
                    'play',
                    'pause',
                    'ended',
                    'timeupdate',
                    'fullscreenchange',
                    'waiting',
                    'error',
                    'progress',
                ],
            },
        ],
    },
    component: {
        dir: COMPONENTS_DIR,
        vShow: uniCliShared.COMPONENT_CUSTOM_HIDDEN,
        getPropertySync: false, // 为了避免 Setting data field "uP" to undefined is invalid 警告
    },
};
const options = {
    cdn: 5,
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
                    src: ['custom-tab-bar'],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
        },
    },
    global: 'qq',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
        normalize(appJson) {
            const hasUsingComponents = appJson.usingComponents && Object.keys(appJson.usingComponents).length;
            if (!hasUsingComponents) {
                // fix https://github.com/dcloudio/uni-app/issues/2648
                appJson.usingComponents = {
                    'fix-2648': '/fix-2648',
                };
            }
            return appJson;
        },
    },
    project: {
        filename: 'project.config.json',
        config: ['project.qq.json', 'project.config.json'],
        source,
        normalize(projectJson) {
            projectJson.qqappid = projectJson.appid;
            projectJson.qqLibVersion = projectJson.libVersion;
            delete projectJson.appid;
            delete projectJson.libVersion;
            return projectJson;
        },
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
            extname: '.qs',
            lang: 'wxs',
            generate(filter, filename) {
                if (filename) {
                    return `<qs src="${filename}.qs" module="${filter.name}"/>`;
                }
                return `<qs module="${filter.name}">
  ${filter.code}
  </qs>`;
            },
        }, extname: '.qml', compilerOptions }),
    style: {
        extname: '.qss',
    },
};

const uniMiniProgramQQPlugin = {
    name: 'uni:mp-qq',
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
    writeBundle(_, bundle) {
        fix2648(bundle);
    },
};
var index = [uniMiniProgramQQPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
