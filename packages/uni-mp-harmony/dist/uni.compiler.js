'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

const compilerOptions = {
    nodeTransforms: [uniCliShared.transformRef, uniCliShared.transformComponentLink],
};
const miniProgram = {
    class: {
        array: true,
    },
    slot: {
        fallbackContent: true,
        dynamicSlotNames: true,
    },
    directive: 'has:',
    checkPropName(name, prop) {
        // 快应用不允许使用 key 属性，应该还有很多其他保留字，目前先简单处理
        // ERROR: Unexpected JavaScript keyword as attribute name: 'key', please change it.
        if (name === 'key') {
            return false;
        }
        if (name === 'bind' &&
            prop.type === /*NodeTypes.DIRECTIVE*/ 7 &&
            prop.arg) {
            if (prop.arg.type === /*NodeTypes.SIMPLE_EXPRESSION*/ 4) {
                if (prop.arg.content === 'key') {
                    return false;
                }
            }
        }
        return true;
    },
};
const options = {
    cdn: 201, // TODO
    vite: {
        inject: {
            uni: [path__default.default.resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default.default.resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {},
    },
    global: 'has',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
            extname: '.qjs',
            lang: 'qjs',
            generate(filter, filename) {
                if (filename) {
                    return `<qjs src="${filename}.qjs" module="${filter.name}"/>`;
                }
                return `<qjs module="${filter.name}">
${filter.code}
</qjs>`;
            },
        }, extname: '.hxml', compilerOptions }),
    style: {
        extname: '.css',
    },
};

const uniMiniProgramHarmonyPlugin = {
    name: 'uni:mp-harmony',
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
var index = [uniMiniProgramHarmonyPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
