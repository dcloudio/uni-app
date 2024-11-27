'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var shared = require('@vue/shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

var compilerOptions$1 = {
	target: "es6",
	module: "commonjs"
};
var source = {
	compilerOptions: compilerOptions$1
};

const properties = ['name', 'versionName', 'versionCode'];
function formatAppJson(_appJson, manifestJson, _pagesJson) {
    const appJson = _appJson;
    // 华为IDE V3.0.2+ 需要此属性，否则无法导入
    appJson.appType = 'webapp';
    appJson.minPlatformVersion = 1070;
    properties.forEach((name) => {
        if (shared.hasOwn(manifestJson, name)) {
            appJson[name] = manifestJson[name];
        }
    });
    if (!appJson.name) {
        const inputDir = process.env.UNI_INPUT_DIR;
        let projectname = path__default.default.basename(inputDir);
        if (projectname === 'src') {
            projectname = path__default.default.basename(path__default.default.dirname(inputDir));
        }
        appJson.name = projectname;
    }
    if (!appJson.package) {
        appJson.package = appJson.name;
    }
    if (manifestJson['quickapp-webview']) {
        shared.extend(appJson, manifestJson['quickapp-webview']);
    }
    if (process.env.UNI_SUB_PLATFORM &&
        manifestJson[process.env.UNI_SUB_PLATFORM]) {
        shared.extend(appJson, manifestJson[process.env.UNI_SUB_PLATFORM]);
    }
    if (!appJson.package) {
        console.warn('manifest.json->quickapp-webview 缺少 package 配置');
    }
    if (!appJson.icon) {
        console.warn('manifest.json->quickapp-webview 缺少 icon 配置');
    }
}

const compilerOptions = {
    nodeTransforms: [uniCliShared.transformRef],
};
const miniProgram = {
    class: {
        array: true,
    },
    slot: {
        fallbackContent: false,
        dynamicSlotNames: true,
    },
    directive: 'qa:',
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
const projectConfigFilename = 'jsconfig.json';
const options = {
    cdn: process.env.UNI_SUB_PLATFORM === 'quickapp-webview-huawei' ? 200 : 201,
    vite: {
        inject: {
            uni: [path__default.default.resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default.default.resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {},
    },
    global: 'qa',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
    },
    json: {
        formatAppJson,
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
        }, extname: '.qxml', compilerOptions }),
    style: {
        extname: '.css',
    },
    project: {
        filename: projectConfigFilename,
        config: [],
        source,
    },
};

let quickappConfigJson = false;
const uniQuickappWebviewPlugin = {
    name: 'uni:quickapp-webview',
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
    generateBundle(_, bundle) {
        if (process.env.UNI_SUB_PLATFORM === 'quickapp-webview-huawei') {
            if (quickappConfigJson) {
                return;
            }
            quickappConfigJson = true;
            bundle['quickapp.config.json'] = {
                type: 'asset',
                fileName: 'quickapp.config.json',
                originalFileName: 'quickapp.config.json',
                name: 'quickapp.config.json',
                source: JSON.stringify({
                    quickappRoot: './',
                    packOptions: {
                        ignore: [],
                    },
                }),
                needsCodeReference: false,
            };
        }
    },
};
var index = [uniQuickappWebviewPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
