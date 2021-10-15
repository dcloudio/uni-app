'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);

var description = "项目配置文件。";
var packOptions = {
	ignore: [
	]
};
var setting = {
	urlCheck: true,
	es6: false,
	postcss: false,
	minified: false,
	newFeature: true
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

const uniMiniProgramWeixinPlugin = {
    name: 'vite:uni-mp-weixin',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: JSON.stringify('false'),
            },
        };
    },
};
const projectConfigFilename = 'project.config.json';
const options = {
    vite: {
        alias: {
            'uni-mp-runtime': uniCliShared.resolveBuiltIn('@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['wxcomponents'],
            targets: [
                {
                    src: [
                        'theme.json',
                        'sitemap.json',
                        'ext.json',
                        'custom-tab-bar',
                        'functional-pages',
                        projectConfigFilename,
                    ],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
        },
    },
    global: 'wx',
    app: {
        darkmode: true,
        subpackages: true,
    },
    project: {
        filename: projectConfigFilename,
        source,
    },
    template: {
        extname: '.wxml',
        directive: 'wx:',
    },
    style: {
        extname: '.wxss',
        cssVars: {
            '--status-bar-height': '25px',
            '--window-top': '0px',
            '--window-bottom': '0px',
            '--window-left': '0px',
            '--window-right': '0px',
        },
    },
    filter: {
        extname: '.wxs',
        tag: 'wxs',
    },
};
var index = [uniMiniProgramWeixinPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
