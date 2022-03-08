'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var uniCliShared = require('@dcloudio/uni-cli-shared');
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
    if (node.type !== 1 /* ELEMENT */ || node.tag !== 'swiper') {
        return;
    }
    const disableTouchProp = compilerCore.findProp(node, 'disable-touch', false, true);
    if (!disableTouchProp) {
        return;
    }
    const { props } = node;
    if (disableTouchProp.type === 6 /* ATTRIBUTE */) {
        // <swiper disable-touch/> => <swiper :touchable="false"/>
        props.splice(props.indexOf(disableTouchProp), 1, uniCliShared.createBindDirectiveNode('touchable', 'false'));
    }
    else {
        if (disableTouchProp.exp) {
            // <swiper :disable-touch="true"/> => <swiper :touchable="!(true)"/>
            let touchable = '';
            if (disableTouchProp.exp.type === 4 /* SIMPLE_EXPRESSION */) {
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
        },
    },
    global: 'tt',
    app: {
        darkmode: false,
        subpackages: true,
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
    name: 'uni:mp-lark',
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
options.cdn = 10;
options.template.slot.fallbackContent = false;
// 飞书不支持：
// <view tt:for="{{items}}" tt:for-item="item" tt:key="id" slot="{{item.slot}}">{{item.text}}</view>
options.template.slot.dynamicSlotNames = false;
options.project.config = ['project.lark.json'];
var index = [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
