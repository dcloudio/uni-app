"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniEasycomPlugin = void 0;
const path_1 = __importDefault(require("path"));
const pluginutils_1 = require("@rollup/pluginutils");
const shared_1 = require("@vue/shared");
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const MP_WEIBO_COMPONENTS_PATH = '@dcloudio/uni-mp-weibo';
const baseComponents = [
    'audio',
    'button',
    'canvas',
    'checkbox',
    'checkbox-group',
    'editor',
    'form',
    'icon',
    'image',
    'input',
    'label',
    'movable-area',
    'movable-view',
    'navigator',
    'picker-view',
    'picker-view-column',
    'progress',
    'radio',
    'radio-group',
    'resize-sensor',
    'rich-text',
    'scroll-view',
    'slider',
    'swiper',
    'swiper-item',
    'switch',
    'text',
    'textarea',
    'view',
];
function uniEasycomPlugin(options) {
    const filter = (0, pluginutils_1.createFilter)(options.include, options.exclude);
    let needCombineBuiltInCss = false;
    return {
        name: 'uni:h5-easycom',
        configResolved(config) {
            needCombineBuiltInCss = (0, uni_cli_shared_1.isCombineBuiltInCss)(config);
        },
        transform(code, id) {
            if (!filter(id)) {
                return;
            }
            const { filename } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (!uni_cli_shared_1.EXTNAME_VUE_TEMPLATE.includes(path_1.default.extname(filename))) {
                return;
            }
            if (!code.includes('_resolveComponent')) {
                return;
            }
            let i = 0;
            const importDeclarations = [];
            code = code.replace(/_resolveComponent\("(.+?)"(, true)?\)/g, (str, name) => {
                if (name && !name.startsWith('_')) {
                    if ((0, uni_shared_1.isBuiltInComponent)(name)) {
                        name = name.replace(uni_shared_1.COMPONENT_PREFIX, '');
                        const local = `__syscom_${i++}`;
                        if (needCombineBuiltInCss) {
                            // 发行模式下，应该将内置组件css输出到入口css中
                            resolveBuiltInCssImport(name).forEach((cssImport) => uni_cli_shared_1.buildInCssSet.add(cssImport));
                            return (0, uni_cli_shared_1.addImportDeclaration)(importDeclarations, local, MP_WEIBO_COMPONENTS_PATH, (0, shared_1.capitalize)((0, shared_1.camelize)(name)));
                        }
                        return addBuiltInImportDeclaration(importDeclarations, local, name);
                    }
                    const source = (0, uni_cli_shared_1.matchEasycom)(name);
                    if (source) {
                        // 处理easycom组件优先级
                        return (0, uni_cli_shared_1.genResolveEasycomCode)(importDeclarations, str, (0, uni_cli_shared_1.addImportDeclaration)(importDeclarations, `__easycom_${i++}`, source));
                    }
                }
                return str;
            });
            if (importDeclarations.length) {
                code = importDeclarations.join('') + code;
            }
            return {
                code,
                map: null,
            };
        },
    };
}
exports.uniEasycomPlugin = uniEasycomPlugin;
function resolveBuiltInCssImport(name) {
    const cssImports = [];
    if (baseComponents.includes(name)) {
        cssImports.push(uni_cli_shared_1.BASE_COMPONENTS_STYLE_PATH + name + '.css');
    }
    else {
        cssImports.push(uni_cli_shared_1.MP_WEIBO_COMPONENTS_STYLE_PATH + name + '.css');
    }
    const deps = uni_cli_shared_1.COMPONENT_DEPS_CSS[name];
    deps && deps.forEach((dep) => cssImports.push(dep));
    return cssImports;
}
function addBuiltInImportDeclaration(importDeclarations, local, name) {
    resolveBuiltInCssImport(name).forEach((cssImport) => importDeclarations.push(`import '${cssImport}';`));
    return (0, uni_cli_shared_1.addImportDeclaration)(importDeclarations, local, MP_WEIBO_COMPONENTS_PATH, (0, shared_1.capitalize)((0, shared_1.camelize)(name)));
}
