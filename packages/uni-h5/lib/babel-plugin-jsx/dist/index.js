"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("@babel/types"));
const template_1 = __importDefault(require("@babel/template"));
const plugin_syntax_jsx_1 = __importDefault(require("@babel/plugin-syntax-jsx"));
const helper_module_imports_1 = require("@babel/helper-module-imports");
const transform_vue_jsx_1 = __importDefault(require("./transform-vue-jsx"));
const sugar_fragment_1 = __importDefault(require("./sugar-fragment"));
const hasJSX = (parentPath) => {
    let fileHasJSX = false;
    parentPath.traverse({
        JSXElement(path) {
            fileHasJSX = true;
            path.stop();
        },
        JSXFragment(path) {
            fileHasJSX = true;
            path.stop();
        },
    });
    return fileHasJSX;
};
exports.default = ({ types }) => ({
    name: 'babel-plugin-jsx',
    inherits: plugin_syntax_jsx_1.default,
    visitor: Object.assign(Object.assign(Object.assign({}, transform_vue_jsx_1.default), sugar_fragment_1.default), { Program: {
            enter(path, state) {
                if (hasJSX(path)) {
                    const importNames = [
                        'createVNode',
                        'Fragment',
                        'resolveComponent',
                        'withDirectives',
                        'vShow',
                        'vModelSelect',
                        'vModelText',
                        'vModelCheckbox',
                        'vModelRadio',
                        'vModelText',
                        'vModelDynamic',
                        'resolveDirective',
                        'mergeProps',
                        'createTextVNode',
                        'isVNode',
                    ];
                    if (helper_module_imports_1.isModule(path)) {
                        // import { createVNode } from "vue";
                        const importMap = {};
                        importNames.forEach((name) => {
                            state.set(name, () => {
                                if (importMap[name]) {
                                    return types.cloneNode(importMap[name]);
                                }
                                const identifier = helper_module_imports_1.addNamed(path, name, 'vue', {
                                    ensureLiveReference: true,
                                });
                                importMap[name] = identifier;
                                return identifier;
                            });
                        });
                        const { enableObjectSlots = true } = state.opts;
                        if (enableObjectSlots) {
                            state.set('@vue/babel-plugin-jsx/runtimeIsSlot', () => {
                                if (importMap.runtimeIsSlot) {
                                    return importMap.runtimeIsSlot;
                                }
                                const { name: isVNodeName } = state.get('isVNode')();
                                const isSlot = path.scope.generateUidIdentifier('isSlot');
                                const ast = template_1.default.ast `
                  function ${isSlot.name}(s) {
                    return typeof s === 'function' || (Object.prototype.toString.call(s) === '[object Object]' && !${isVNodeName}(s));
                  }
                `;
                                const lastImport = path.get('body').filter((p) => p.isImportDeclaration()).pop();
                                if (lastImport) {
                                    lastImport.insertAfter(ast);
                                }
                                importMap.runtimeIsSlot = isSlot;
                                return isSlot;
                            });
                        }
                    }
                    else {
                        // var _vue = require('vue');
                        let sourceName = '';
                        importNames.forEach((name) => {
                            state.set(name, () => {
                                if (!sourceName) {
                                    sourceName = helper_module_imports_1.addNamespace(path, 'vue', {
                                        ensureLiveReference: true,
                                    }).name;
                                }
                                return t.memberExpression(t.identifier(sourceName), t.identifier(name));
                            });
                        });
                    }
                }
            },
            exit(path) {
                const body = path.get('body');
                const specifiersMap = new Map();
                body.filter((nodePath) => t.isImportDeclaration(nodePath.node)
                    && nodePath.node.source.value === 'vue')
                    .forEach((nodePath) => {
                    const { specifiers } = nodePath.node;
                    let shouldRemove = false;
                    specifiers.forEach((specifier) => {
                        if (!specifier.loc && t.isImportSpecifier(specifier) && t.isIdentifier(specifier.imported)) {
                            specifiersMap.set(specifier.imported.name, specifier);
                            shouldRemove = true;
                        }
                    });
                    if (shouldRemove) {
                        nodePath.remove();
                    }
                });
                const specifiers = [...specifiersMap.keys()].map((imported) => specifiersMap.get(imported));
                if (specifiers.length) {
                    path.unshiftContainer('body', t.importDeclaration(specifiers, t.stringLiteral('vue')));
                }
            },
        } }),
});
