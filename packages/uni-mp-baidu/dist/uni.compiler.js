'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');
var uniMpCompiler = require('@dcloudio/uni-mp-compiler');

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
        },
    },
    style: {
        extname: '.css',
    },
};
var index = [uniMiniProgramBaiduPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
