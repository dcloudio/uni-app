'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');
var compilerCore = require('@vue/compiler-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);

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

const transformFor = (node) => {
    if (!uniMpCompiler.isForElementNode(node)) {
        return;
    }
    const keyProp = uniMpCompiler.findProp(node, 'key', true);
    if (keyProp) {
        const { exp } = keyProp;
        if (exp) {
            const key = uniMpCompiler.genExpr(exp);
            node.vFor.sourceCode = `${node.vFor.sourceAlias} trackBy ${key}`;
            node.props.splice(node.props.indexOf(keyProp), 1);
        }
    }
};

/**
 * 百度小程序的自定义组件，不支持动态事件绑定，故转换为静态事件 + dataset
 * @param dir
 * @param node
 * @param context
 * @param augmentor
 * @returns
 */
const transformOn = (dir, node, context, augmentor) => {
    const res = uniMpCompiler.transformOn(dir, node, context, augmentor);
    const { name, arg, exp } = dir;
    if (name !== 'on' ||
        !arg ||
        !exp ||
        !compilerCore.isStaticExp(arg) ||
        !isCustomEvent(arg.content) ||
        !uniMpCompiler.isUserComponent(node, context)) {
        return res;
    }
    // data-event-opts
    const opts = compilerCore.findProp(node, ATTR_DATA_EVENT_OPTS, true);
    const value = res.props[0].value;
    res.props[0].value = compilerCore.createSimpleExpression('__e', true);
    if (!opts) {
        node.props.push(createDataEventOptsProp(arg.content, value));
    }
    else {
        const children = opts.exp.children;
        children.splice(children.length - 2, 0, createDataEventOptsProperty(arg.content, value));
    }
    return res;
};
const ATTR_DATA_EVENT_OPTS = 'data-e-o';
function createDataEventOptsProperty(event, exp) {
    return compilerCore.createCompoundExpression([`'${event}'`, ': ', exp, ',']);
}
function createDataEventOptsProp(event, exp) {
    return {
        type: 7 /* DIRECTIVE */,
        name: 'bind',
        loc: compilerCore.locStub,
        modifiers: [],
        arg: compilerCore.createSimpleExpression(ATTR_DATA_EVENT_OPTS, true),
        exp: compilerCore.createCompoundExpression([
            '{',
            createDataEventOptsProperty(event, exp),
            '}',
        ]),
    };
}
const builtInEvents = [
    'tap',
    'longtap',
    'longpress',
    'touchstart',
    'touchmove',
    'touchcancel',
    'touchend',
    'touchforcechange',
    'transitionend',
    'animationstart',
    'animationiteration',
    'animationend',
];
function isCustomEvent(name) {
    return !builtInEvents.includes(name);
}

const uniMiniProgramBaiduPlugin = {
    name: 'vite:uni-mp-baidu',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: false,
            },
        };
    },
};
const projectConfigFilename = 'project.swan.json';
const options = {
    vite: {
        inject: {
            uni: [
                uniCliShared.resolveBuiltIn('@dcloudio/uni-mp-baidu/dist/uni.api.esm.js'),
                'default',
            ],
        },
        alias: {
            'uni-mp-runtime': uniCliShared.resolveBuiltIn('@dcloudio/uni-mp-baidu/dist/uni.mp.esm.js'),
        },
        copyOptions: {
            assets: ['swancomponents'],
        },
    },
    global: 'swan',
    app: {
        darkmode: false,
        subpackages: true,
    },
    project: {
        filename: projectConfigFilename,
        source,
    },
    template: {
        filter: {
            extname: '.swan',
            lang: 'sjs',
            generate(filter, filename) {
                if (filename) {
                    return `<import-sjs src="${filename}.sjs" module="${filter.name}"/>`;
                }
                return `<import-sjs module="${filter.name}">
${filter.code}
</import-sjs>`;
            },
        },
        slot: {
            fallback: false,
        },
        extname: '.swan',
        directive: 's-',
        compilerOptions: {
            nodeTransforms: [transformFor],
            directiveTransforms: {
                on: transformOn,
            },
        },
    },
    style: {
        extname: '.css',
    },
};
var index = [uniMiniProgramBaiduPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
