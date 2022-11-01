'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');
var compilerCore = require('@vue/compiler-core');

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

function transformSwiper(node) {
    if (node.type !== 1 /* NodeTypes.ELEMENT */ || node.tag !== 'swiper') {
        return;
    }
    const disableTouchProp = compilerCore.findProp(node, 'disable-touch', false, true);
    if (!disableTouchProp) {
        return;
    }
    const { props } = node;
    if (disableTouchProp.type === 6 /* NodeTypes.ATTRIBUTE */) {
        // <swiper disable-touch/> => <swiper :touchable="false"/>
        props.splice(props.indexOf(disableTouchProp), 1, uniCliShared.createBindDirectiveNode('touchable', 'false'));
    }
    else {
        if (disableTouchProp.exp) {
            // <swiper :disable-touch="true"/> => <swiper :touchable="!(true)"/>
            let touchable = '';
            if (disableTouchProp.exp.type === 4 /* NodeTypes.SIMPLE_EXPRESSION */) {
                if (disableTouchProp.exp.content === 'true') {
                    touchable = 'false';
                }
                else if (disableTouchProp.exp.content === 'false') {
                    touchable = 'true';
                }
            }
            props.splice(props.indexOf(disableTouchProp), 1, uniCliShared.createBindDirectiveNode('touchable', touchable || `!(${uniMpCompiler.genExpr(disableTouchProp.exp)})`));
        }
    }
}

const projectConfigFilename = 'project.config.json';
const nodeTransforms = [
    uniCliShared.transformRef,
    transformSwiper,
    uniCliShared.transformMatchMedia,
    uniCliShared.transformComponentLink,
];
const compilerOptions = {
    nodeTransforms,
};
const COMPONENTS_DIR = 'ttcomponents';
const miniProgram = {
    class: {
        array: false,
    },
    slot: {
        fallbackContent: true,
        dynamicSlotNames: true,
    },
    directive: 'tt:',
    component: {
        dir: COMPONENTS_DIR,
        vShow: uniCliShared.COMPONENT_CUSTOM_HIDDEN_BIND,
    },
};
const options = {
    cdn: 4,
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
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
    global: 'tt',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.tt.json'],
        source,
    },
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
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
        }, extname: '.ttml', compilerOptions }),
    style: {
        extname: '.ttss',
    },
};

const uniMiniProgramToutiaoPlugin = {
    name: 'uni:mp-toutiao',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: true,
            },
            build: {
                assetsInlineLimit: uniCliShared.ASSETS_INLINE_LIMIT,
            },
        };
    },
};
var index = [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
