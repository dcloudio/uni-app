'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var fs = require('fs-extra');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

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
        if (usingComponents && !Object.keys(usingComponents).length) {
            fs__default["default"].outputFileSync(path__default["default"].resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.json'), `{"component":true}`);
            fs__default["default"].outputFileSync(path__default["default"].resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.qml'), `<!-- https://github.com/dcloudio/uni-app/issues/2648 -->`);
            fs__default["default"].outputFileSync(path__default["default"].resolve(process.env.UNI_OUTPUT_DIR, 'fix-2648.js'), `Component({})`);
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
    uniCliShared.createTransformComponentLink(uniCliShared.COMPONENT_BIND_LINK),
];
const options = {
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['wxcomponents'],
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
    },
    project: {
        filename: 'project.config.json',
        source,
    },
    template: {
        class: {
            array: true,
        },
        filter: {
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
        },
        slot: {
            fallback: false,
        },
        extname: '.qml',
        directive: 'qq:',
        compilerOptions: {
            nodeTransforms,
        },
    },
    style: {
        extname: '.qss',
    },
};

const uniMiniProgramQQPlugin = {
    name: 'vite:uni-mp-qq',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: {
                // css 中不支持引用本地资源
                assetsInlineLimit: 40 * 1024, // 40kb
            },
        };
    },
    writeBundle(_, bundle) {
        fix2648(bundle);
    },
};
var index = [uniMiniProgramQQPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
