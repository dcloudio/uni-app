'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var component2 = true;
var enableAppxNg = true;
var source = {
	component2: component2,
	enableAppxNg: enableAppxNg
};

const projectConfigFilename = 'mini.project.json';
const options = {
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['mycomponents'],
        },
    },
    global: 'my',
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
            fallback: true,
        },
        extname: '.axml',
        directive: 'a:',
        compilerOptions: {
            nodeTransforms: [uniCliShared.createTransformComponentLink(uniCliShared.COMPONENT_ON_LINK)],
        },
    },
    style: {
        extname: '.acss',
    },
};

const uniMiniProgramAlipayPlugin = {
    name: 'vite:uni-mp-alipay',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
            build: {
                assetsInlineLimit: 0,
            },
        };
    },
};
var index = [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
