'use strict';

var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var path = require('path');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');
var compilerCore = require('@vue/compiler-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

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
    const value = res.props[0].value;
    res.props[0].value = createCustomEventExpr();
    addEventOpts(arg.content, value, node);
    return res;
};
function createCustomEventExpr() {
    return compilerCore.createSimpleExpression('__e', true);
}
function addEventOpts(event, value, node) {
    const opts = compilerCore.findProp(node, ATTR_DATA_EVENT_OPTS, true);
    if (!opts) {
        node.props.push(createDataEventOptsProp(event, value));
    }
    else {
        const children = opts.exp.children;
        children.splice(children.length - 2, 0, createDataEventOptsProperty(event, value));
    }
}
const ATTR_DATA_EVENT_OPTS = 'eO';
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

/**
 * 百度小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 * @param dir
 * @param node
 * @param context
 * @param augmentor
 * @returns
 */
const transformModel = (dir, node, context, augmentor) => {
    const res = uniMpCompiler.transformModel(dir, node, context, augmentor);
    const props = res.props;
    if (props.length < 2 || !uniMpCompiler.isUserComponent(node, context)) {
        return res;
    }
    const { arg, exp } = props[1];
    addEventOpts(arg.content, exp, node);
    props[1].exp = createCustomEventExpr();
    return res;
};

const miniProgram = {
    class: {
        array: true,
    },
    slot: {
        fallback: true,
    },
    directive: 's-',
};
const projectConfigFilename = 'project.swan.json';
const options = {
    vite: {
        inject: {
            uni: [path__default["default"].resolve(__dirname, 'uni.api.esm.js'), 'default'],
        },
        alias: {
            'uni-mp-runtime': path__default["default"].resolve(__dirname, 'uni.mp.esm.js'),
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
    template: Object.assign(Object.assign({}, miniProgram), { filter: {
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
        }, extname: '.swan', compilerOptions: {
            nodeTransforms: [transformFor],
            directiveTransforms: {
                on: transformOn,
                model: transformModel,
            },
        } }),
    style: {
        extname: '.css',
    },
};

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
var index = [uniMiniProgramBaiduPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
