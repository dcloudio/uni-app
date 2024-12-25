'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefault(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefault(path);

var appid = "";
var host = "baiduboxapp";
var projectname = "";
var setting = {
	autoAudits: false,
	urlCheck: false
};
var source = {
	appid: appid,
	"compilation-args": {
	common: {
		babelSetting: {
			ignore: [
			]
		},
		enhance: true,
		ignorePrefixCss: false
	},
	selected: -3
},
	host: host,
	projectname: projectname,
	setting: setting
};

const transformFor = (node, context) => {
    if (!uniMpCompiler.isForElementNode(node)) {
        return;
    }
    const { vFor, props } = node;
    let sourceCode = vFor.valueAlias + ' in ' + vFor.sourceAlias;
    const keyProp = uniMpCompiler.findProp(node, 'key', true);
    if (keyProp) {
        const { exp } = keyProp;
        if (exp) {
            const key = uniMpCompiler.rewriteExpression(exp, context).content;
            sourceCode = sourceCode + ' trackBy ' + key;
            props.splice(props.indexOf(keyProp), 1);
        }
    }
    vFor.valueAlias = '';
    vFor.sourceCode = sourceCode;
};

/**
 * 百度小程序的自定义组件，不支持动态事件绑定
 */
const transformOn = uniCliShared.createTransformOn(uniMpCompiler.transformOn);

/**
 * 百度小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 */
const transformModel = uniCliShared.createTransformModel(uniMpCompiler.transformModel);

const customElements = [
    'animation-video',
    'animation-view',
    'ar-camera',
    'rtc-room',
    'rtc-room-item',
    'tabs',
    'tab-item',
    'follow-swan',
    'login',
    'inline-payment-panel',
    'talos-linear-gradient',
    'talos-rc-view',
    'talos-nested-scroll-view',
    'talos-nested-scroll-top-container',
    'talos-nested-scroll-bottom-container',
    'talos-waterfall-view',
    'talos-waterfall-item',
    'talos-waterfall-header',
    'talos-waterfall-footer',
    'talos-pull-refresh',
    'talos-control-container',
    'talos-na-refresh-control',
    'talos-modal',
    'talos-svg',
];
const nodeTransforms = [uniCliShared.transformRef, transformFor, uniCliShared.transformMatchMedia];
const directiveTransforms = {
    on: transformOn,
    model: transformModel,
};
const COMPONENTS_DIR = 'swancomponents';
const miniProgram = {
    class: {
        array: true,
    },
    slot: {
        fallbackContent: true,
        // https://github.com/baidu/san/discussions/601
        dynamicSlotNames: false,
    },
    directive: 's-',
    lazyElement: {
        editor: [
            {
                name: 'on',
                arg: ['ready'],
            },
        ],
        'animation-view': true,
    },
    component: {
        dir: COMPONENTS_DIR,
    },
};
const compilerOptions = {
    nodeTransforms,
    directiveTransforms,
};
const projectConfigFilename = 'project.swan.json';
const options = {
    cdn: 3,
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
                    src: ['ext.json'],
                    get dest() {
                        return process.env.UNI_OUTPUT_DIR;
                    },
                },
            ],
        },
    },
    global: 'swan',
    app: {
        darkmode: false,
        subpackages: true,
        usingComponents: true,
    },
    project: {
        filename: projectConfigFilename,
        config: ['project.swan.json'],
        source,
        normalize(projectJson) {
            var _a;
            const miniprogram = (_a = projectJson.condition) === null || _a === void 0 ? void 0 : _a.miniprogram;
            if (miniprogram &&
                Array.isArray(miniprogram.list) &&
                miniprogram.list.length) {
                projectJson['compilation-args'].options =
                    miniprogram.list.map((item) => {
                        return {
                            id: item.id,
                            text: item.name,
                            extra: {
                                index: item.pathName,
                                query: item.query,
                            },
                        };
                    });
                delete projectJson.condition;
            }
            return projectJson;
        },
    },
    template: Object.assign(Object.assign({}, miniProgram), { customElements, filter: {
            extname: '.sjs',
            lang: 'sjs',
            generate(filter, filename) {
                if (filename) {
                    return `<import-sjs src="${filename}.sjs" module="${filter.name}"/>`;
                }
                return `<import-sjs module="${filter.name}">
  ${filter.code}
  </import-sjs>`;
            },
        }, extname: '.swan', compilerOptions }),
    style: {
        extname: '.css',
    },
};

const uniMiniProgramBaiduPlugin = {
    name: 'uni:mp-baidu',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
        };
    },
};
var index = [uniMiniProgramBaiduPlugin, ...initMiniProgramPlugin__default.default(options)];

module.exports = index;
