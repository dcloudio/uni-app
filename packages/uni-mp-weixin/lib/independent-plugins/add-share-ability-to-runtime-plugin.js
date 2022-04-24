const { parse } = require('@babel/parser');
const template = require('@babel/template');
const generator = require('@babel/generator');
const traverse = require('@babel/traverse');
const { generateAsset } = require('./utils');

// 【修改】runtime.js => 全局共享 global.webpackJsonP
class AddShareAbilityToRuntimePlugin {
    apply (compiler) {
        compiler.hooks.emit.tapPromise('AddShareAbilityToRuntimePlugin', compilation => {
            return new Promise((resolve, reject) => {
                try {
                    // debugger
                    // 修改 runtime.js
                    const runtimeChunkName = 'common/runtime.js';
                    const commonRuntimeInfo = compilation.assets[runtimeChunkName];
                    if (!commonRuntimeInfo) {
                        resolve();
                        return;
                    }
                    const commonRuntimeStrContent = commonRuntimeInfo.source();
                    const commonRuntimeAst = parse(commonRuntimeStrContent);
                    traverse.default(commonRuntimeAst, {
                        AssignmentExpression (nodePath) {
                            try {
                                const leftNode = nodePath.node.left;
                                if (leftNode.type === 'MemberExpression' && leftNode.object && leftNode.property) {
                                    if (leftNode.object.name === 'global' && leftNode.property.value === 'webpackJsonp') {
                                        const insertCode = 'if(global.webpackJsonp){ return };';
                                        const astNode = template.statements(insertCode)();
                                        const blockNode = nodePath.scope.block;
                                        blockNode.body.body.unshift(...astNode);
                                        nodePath.stop();
                                    }
                                }
                            } catch (e) {
                                console.error('independent.error', 'ShareRuntimeChunkPlugin', e);
                            }
                        },
                    });

                    const runtimeSource = generator.default(commonRuntimeAst).code;
                    const runtimeAsset = generateAsset(runtimeSource);
                    compilation.assets[runtimeChunkName] = runtimeAsset;
                    Object.values(process.UNI_SUBPACKAGES).forEach(pkgInfo => {
                        if (pkgInfo.independent) {
                            compilation.assets[`${pkgInfo.root}/${runtimeChunkName}`] = runtimeAsset;
                        }
                    });

                    resolve();
                } catch (e) {
                    console.error('independent.error', 'AddShareAbilityToRuntimePlugin', e);
                    reject(e);
                }
            });
        });
    }
}

module.exports = AddShareAbilityToRuntimePlugin;