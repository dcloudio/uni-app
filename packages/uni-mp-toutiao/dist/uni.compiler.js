'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

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

const projectConfigFilename = 'project.config.json';
const options = {
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['ttcomponents'],
        },
    },
    global: 'tt',
    app: {
        darkmode: false,
        subpackages: true,
    },
    project: {
        filename: projectConfigFilename,
        source,
    },
    template: {
        class: {
            array: false,
        },
        filter: {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                if (filename) {
                    return `<sjs src="${filename}.sjs" module="${filter.name}"/>`;
                }
                return `<sjs module="${filter.name}">
${filter.code}
</sjs>`;
            },
        },
        slot: {
            fallback: false,
        },
        extname: '.ttml',
        directive: 'tt:',
        compilerOptions: {
            nodeTransforms: [uniCliShared.addComponentBindLink],
        },
    },
    style: {
        extname: '.ttss',
    },
};

const uniMiniProgramToutiaoPlugin = {
    name: 'vite:uni-mp-toutiao',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: true,
            },
            build: {
                // 头条支持本地资源
                assetsInlineLimit: 0,
            },
        };
    },
};
var index = [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
