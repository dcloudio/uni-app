const path = require('path');
const fs = require('fs-extra');
const htmlparser2 = require('htmlparser2');
const { MpComponentFileExtension } = require('./constant');
const { transformScript, resolveToContext } = require('./utils.js');
const { parse } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');

class CollectDependency {
    constructor (context, readFileSync, existsSync, addExtension) {
        this.context = context;
        this.existsSync = existsSync || fs.existsSync.bind(fs);
        this.readFileSync = readFileSync || fs.readFileSync.bind(fs);
        this.addExtension = addExtension;
    }

    getWxCssDeps (file) {
        const deps = [];
        const dirName = path.dirname(file);
        let content = this.readFileSync(file, 'utf-8');
        if (content instanceof Buffer) {
            content = content.toString('utf-8');
        }
        const importRegExp = /@import\s*['"](.+)['"];*/g;
        let matched;
        while ((matched = importRegExp.exec(content)) !== null) {
            if (!matched[1]) {
                continue;
            }
            const wxssFile = resolveToContext(dirName, matched[1], this.context);
            if (this.existsSync(wxssFile)) {
                deps.push(wxssFile);
            }
        }
        return deps;
    };

    getWxHtmlDeps (file) {
        const deps = [];
        const dirName = path.dirname(file);
        let content = this.readFileSync(file, 'utf-8');
        if (content instanceof Buffer) {
            content = content.toString('utf-8');
        }
        // https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/import.html
        // WXML 提供两种文件引用方式import和include。
        const targetTags = ['import', 'include', 'wxs'];
        const existsSync = this.existsSync;
        const htmlParser = new htmlparser2.Parser({
            onopentag (name, attribs = {}) {
                if (!targetTags.includes(name)) {
                    return;
                }
                const { src } = attribs;
                if (!src) {
                    return;
                }
                const wxmlFile = resolveToContext(dirName, src, this.context);
                console.log(wxmlFile);
                if (existsSync(wxmlFile)) {
                    deps.push(wxmlFile);
                }
            },
        });
        htmlParser.write(content);
        htmlParser.end();
        return deps;
    }

    getJsonDeps (file) {
        const deps = [];
        const dirName = path.dirname(file);
        let fileContent = this.readFileSync(file);
        if (fileContent && fileContent instanceof Buffer) {
          fileContent = fileContent.toString('utf-8');
        }
        if (!fileContent || !(fileContent.trim())) {
          return [];
        }
        fileContent = JSON.parse(fileContent);
        const usingComponents = fileContent.usingComponents;
        if (usingComponents && typeof usingComponents === 'object') {
            Object.values(usingComponents).forEach((component) => {
                component = resolveToContext(dirName, component, this.context);
                // 每个组件都需要判断 js/json/wxml/wxss 文件是否存在
                MpComponentFileExtension.forEach((ext) => {
                    const file = this.addExtension(component, ext);
                    if (this.existsSync(file)) {
                        deps.push(file);
                    }
                });
            });
        }
        return deps;
    }

    getJsDeps (file) {
        const deps = [];
        const dirName = path.dirname(file);
        // 读取 js 文件内容
        let content = this.readFileSync(file, 'utf-8');
        if (content instanceof Buffer) {
            content = content.toString('utf-8');
        }
        // 将代码转化为 AST
        const ast = parse(content, { sourceType: 'module', plugins: ['exportDefaultFrom'] });
        // 遍历 AST
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                // 获取 import from 地址
                const { value } = node.source;
                const jsFile = transformScript(dirName, value, this.existsSync);
                if (jsFile) {
                    deps.push(jsFile);
                }
            },
            Property: (nodePath) => {
                const parentPath = nodePath.parentPath;
                const callee = parentPath && parentPath.parent && parentPath.parent.callee;
                if (!callee || callee.name !== 'Component') {
                    return;
                }
                const relationsNodes = nodePath.container.filter(item => item.key.name === 'relations');
                if (!relationsNodes.length) {
                    return;
                }
                const relationsNode = relationsNodes[0];
                const propertyNodes = relationsNode.value.properties || [];
                let allRelationsComponents = propertyNodes.map(filePathNode => {
                    if (!filePathNode.key.value) {
                        return '';
                    }
                    return path.resolve(dirName, filePathNode.key.value);
                });
                allRelationsComponents = allRelationsComponents.filter(item => item);
                allRelationsComponents.forEach(component => {
                    MpComponentFileExtension.forEach((ext) => {
                        const file = this.addExtension(component, ext);
                        if (this.existsSync(file)) {
                            deps.push(file);
                        }
                    });
                });
            },
            ExportNamedDeclaration: ({ node }) => {
                if (!node.source) {
                    return;
                }
                // 获取 export from 地址
                const { value } = node.source;
                const jsFile = transformScript(dirName, value, this.existsSync);
                if (jsFile) {
                    deps.push(jsFile);
                }
            },
            CallExpression: ({ node }) => {
                if ((node.callee.name && node.callee.name === 'require') && node.arguments.length >= 1) {
                    // 获取 require 地址
                    const [{ value }] = node.arguments;

                    const jsFile = transformScript(dirName, value, this.existsSync);
                    if (jsFile) {
                        deps.push(jsFile);
                    }
                }
            },
        });
        return deps;
    }

}

module.exports = CollectDependency;