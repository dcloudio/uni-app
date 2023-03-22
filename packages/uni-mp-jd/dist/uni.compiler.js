'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

var compileType = "miniprogram";
var setting = {
	es6: true
};
var source = {
	compileType: compileType,
	setting: setting
};

// import { transformSwiper } from './transforms/transformSwiper'
const projectConfigFilename = 'project.config.json';
const nodeTransforms = [
    uniCliShared.transformRef,
    // transformMatchMedia,
    uniCliShared.transformComponentLink,
];
const compilerOptions = {
    nodeTransforms,
};
const COMPONENTS_DIR = 'jdcomponents';
const miniProgram = {
    class: {
        /**
         * 是否支持绑定 array 类型
         */
        array: false,
    },
    slot: {
        /**
         * 是否支持后备内容
         */
        fallbackContent: true,
        /**
         * 是否支持动态插槽名
         */
        dynamicSlotNames: true,
    },
    directive: 'jd:',
    component: {
        dir: COMPONENTS_DIR,
        vShow: uniCliShared.COMPONENT_CUSTOM_HIDDEN_BIND,
        // 父组件 setData 后，子组件的 properties 是否可以同步获取
        getPropertySync: false,
    },
};
const options = {
    // ？
    cdn: 4,
    vite: {
        inject: {
            uni: [path__default.default.resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default.default.resolve(__dirname, 'uni.mp.esm.js'),
        },
        copyOptions: {
            /**
             * 静态资源，配置的目录，在 uni_modules 中同样支持
             */
            assets: [COMPONENTS_DIR],
            targets: [
                {
                    // FileWatcher这个类监听的文件，文件改动触发整体编译？编译什么？
                    src: ['project.config.json', 'custom-tab-bar'],
                    // 输出目录
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
        },
    },
    global: 'jd',
    app: {
        /**
         * 是否支持darkmode
         */
        darkmode: true,
        /**
         * 是否支持subpackages
         */
        subpackages: true,
        /**
         * 是否支持发行插件
         */
        plugins: true,
        /**
         * 是否支持全局组件
         */
        usingComponents: true,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.config.json'],
        source,
    },
    // 对模版的编译处理
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
            extname: '.jds',
            lang: 'jds',
            generate(filter, filename) {
                if (filename) {
                    return `<jds src="${filename}.jds" module="${filter.name}"/>`;
                }
                return `<jds module="${filter.name}">
${filter.code}
</jds>`;
            },
        }, extname: '.jxml', compilerOptions }),
    style: {
        extname: '.jxss',
    },
};

const uniMiniProgramJdPlugin = {
    name: 'uni:mp-jd',
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
var index = [uniMiniProgramJdPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
