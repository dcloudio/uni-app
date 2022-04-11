const path = require('path');
const Analyze = require('./analyze');
const { wxComponentsStr, outerComponents, weuiComponentStr } = require('./constant');
const { generateAsset } = require('./util');
const {
    collectAllOutSideComponentsMap,
    getIndependentPkgRoots,
    getIndependentEntryPages,
    getGlobalComponentKeyByGlobalComponentPath,
    copyAllWxComponentsFiles,
    collectPkgCopyFiles,
    getNewComponentPathInIndependentPkg,
    getJsonByPageOrComponentPath
} = require('./util');

// 原则：原生组件不允许使用全局组件

// 忽略原生组件(wxComponents)使用全局组件的情况

function recurIndependentJson (independentRoot, independentPages, sourceRepo, handler, cacheSet = new Set()) {
    independentPages.forEach(independentPage => {
        // 避免无限递归
        const recured = cacheSet.has(independentPage);
        if (recured) return;

        cacheSet.add(independentPage);

        // 关键：映射到独立分包下面的组件路径
        const newComponentPath = getNewComponentPathInIndependentPkg(independentRoot, independentPage);
        const {
            content: jsonObj, fromAssetsFlag
        } = getJsonByPageOrComponentPath(newComponentPath, sourceRepo);
        if (!jsonObj) {
            // console.log('independent.recurIndependentJson', newComponentPath);
            return;
        }

        // 处理 newComponentPath.json 中的包外组件路径

        const usingComponents = jsonObj.usingComponents || {};
        for (let componentKey in usingComponents) {
            const componentPath = usingComponents[componentKey];
            if (componentPath.indexOf(weuiComponentStr) >= 0) {
                continue;
            }
            handler(usingComponents, componentKey);
            recurIndependentJson(independentRoot, [componentPath], sourceRepo, handler, cacheSet);
        }

        if (fromAssetsFlag) {
            sourceRepo.compilationAssets[`${newComponentPath}.json`] = generateAsset(JSON.stringify(jsonObj));
        }
    });
}

// TODO watch 只针对发生变化的文件
class Index extends Analyze {
    init () {
        const emitFileMap = this.emitFileMap;
        const independentRoots = getIndependentPkgRoots();
        const outSideComponentsMap = {}; // 引用的包外组件（vue组件和原生组件）
        independentRoots.forEach(independentRoot => {
            const independentPages = getIndependentEntryPages(independentRoot);
            let cacheSet = new Set();
            let cacheGlobalUsageMap = new Map();
            // 收集包外组件
            const collectOuterCompos = independentPage => collectAllOutSideComponentsMap(independentRoot, emitFileMap, independentPage, cacheSet, cacheGlobalUsageMap);
            independentPages.forEach(collectOuterCompos);

            // 如果是原生组件，则忽略wxComponents以外的组件
            cacheSet = [...cacheSet].filter(componentPath => {
                if (componentPath.startsWith('/')) {
                    componentPath = componentPath.substring(1);
                }
                const isVueComponent = emitFileMap.get(`${componentPath}.json`);
                const isWxComponent = componentPath.startsWith(`${wxComponentsStr}`);
                // TODO weui组件
                return !!(isVueComponent || isWxComponent);
            });
            // 暂时只收集包外的vue组件和原生组件（wxComponents)
            outSideComponentsMap[independentRoot] = {
                outerComponentSet: new Set(cacheSet),
                globalComponentsMap: cacheGlobalUsageMap
            };
        });

        // 独立分包使用到[全局组件]和[入口页面]作为[文件依赖分析]的入口
        const componentFileCache = {};
        for (let independentRoot in outSideComponentsMap) {
            const info = outSideComponentsMap[independentRoot];
            this.copyAndUpdateJson(independentRoot, info, componentFileCache);
        }
    }

    copyAndUpdateJson (independentRoot, info, componentFileCache) {
        const { outerComponentSet, globalComponentsMap } = info;
        this.getDependFiles({ [independentRoot]: outerComponentSet }, componentFileCache, true);
        // 1. 先复制
        this.copyOuterComponents(independentRoot, outerComponentSet, componentFileCache);
        // 2. 更新组件json中包外组件引用路径
        this.updateIndependentJson(independentRoot, globalComponentsMap);
    }

    updateIndependentJson (independentRoot, globalComponentsMap) {
        // 1. 先添加全局组件依赖
        this.addGlobalComponentReference(independentRoot, globalComponentsMap);
        // 2. 更新显示引用包外组件路径
        this.updateOuterComponentReference(independentRoot);
    }

    // pages/chat-im/vueOuterComponents/components/navigation-bar.json mini-icon引用出错？
    // 先处理全局组件：将全局组件引用添加到json文件中
    // 整体思路：
    // 1. 在init函数中，收集了独立分包用到的所有全局组件（包括包外组件用到的全局组件），
    // 2. 保存全局组件被那些页面或者组件使用
    // 3. 复制包外组件（全局组件只是包外组件的一部分）
    // 4. 由于独立分包不能使用全局组件，所以该方法将全局组件路径添加到独立分包下的组件或页面关联的json文件中，确保可以访问到。
    addGlobalComponentReference (independentRoot, globalComponentsMap) {
        const globalComponentInfoMap = getGlobalComponentKeyByGlobalComponentPath();
        for (let [globalComponentPath, componentSetWhoUsedGlobalCompo] of globalComponentsMap) {
            // weui 暂时先不处理
            if (globalComponentPath.indexOf(weuiComponentStr) >= 0) {
                continue;
            }

            if (globalComponentPath.indexOf(weuiComponentStr) >= 0) {
                continue;
            }
            const componentKey = globalComponentInfoMap[globalComponentPath];

            if (globalComponentPath.startsWith('/')) {
                globalComponentPath = globalComponentPath.substring(1);
            }

            const globalComponentReplacePath = getNewComponentPathInIndependentPkg(independentRoot, globalComponentPath);

            if (globalComponentReplacePath === globalComponentPath) return; // 理论上不会走

            const compilationAssets = this.compilation.assets;
            // pages均为vue文件
            [...componentSetWhoUsedGlobalCompo].forEach(componentWhoUsedGlobalCompo => {
                // 获取在 independentRoot 目录下的新路径（独立分包内引用的包外组件也有可能用到全局组件，获取该包外组件在独立分包内的新路径）
                componentWhoUsedGlobalCompo = getNewComponentPathInIndependentPkg(independentRoot, componentWhoUsedGlobalCompo);

                // 获取该组件json文件内容
                // 分包内的vue组件对应json存储在emitFileMap中
                // 分包外vue组件由于前面的复制，内容保存在assets中
                const {
                    content: pageObj,
                    fromAssetsFlag // json内容是否来自assets（还可能来自emiFileMap）
                } = getJsonByPageOrComponentPath(componentWhoUsedGlobalCompo, {
                    emitFileMap: this.emitFileMap, compilationAssets
                });

                const usingComponents = pageObj.usingComponents || {};
                // 如果没有同名标签，则使用全局组件（优先使用显示声明的标签-针对同名标签）
                if (!usingComponents[componentKey]) {
                    usingComponents[componentKey] = `/${globalComponentReplacePath}`;
                }

                // 如果json内容来自emiFileMap（可能还没同步到assets上
                // emitFileMap 后面会统一挂到assets上
                if (!fromAssetsFlag) return;

                delete pageObj.usingGlobalComponents
                compilationAssets[`${componentWhoUsedGlobalCompo}.json`] = generateAsset(JSON.stringify(pageObj));
            });
        }
    }

    updateOuterComponentReference (independentRoot) {
        const sourceRepo = {
            emitFileMap: this.emitFileMap,
            compilationAssets: this.compilation.assets
        };
        const independentPages = getIndependentEntryPages(independentRoot);
        recurIndependentJson(independentRoot, independentPages, sourceRepo, (usingComponents, componentKey) => {
            const componentPath = usingComponents[componentKey];
            const newComponentPath = getNewComponentPathInIndependentPkg(independentRoot, componentPath);
            if (newComponentPath && newComponentPath !== componentPath) {
                usingComponents[componentKey] = `/${newComponentPath}`;
            }
        });
    }

    copyOuterComponents (independentRoot, outerComponentSet, componentFileCache) {
        let copyFiles = collectPkgCopyFiles(outerComponentSet, componentFileCache);
        const thisCompilationAssets = this.compilation.assets;
        // TODO 组件依赖分许的时候需要记录 绝对路径（js/css/wxml） 进行模块引用的文件，输出后需要更改为相对路径，
        copyAllWxComponentsFiles(independentRoot, copyFiles, (originalFilePath, targetPath, relativePath) => {
            // 原生组件
            if (relativePath.indexOf(wxComponentsStr) >= 0) {
                return this.copyWxComponent(independentRoot, originalFilePath, targetPath);
            }
            // vue组件
            const assetInfo = thisCompilationAssets[relativePath];
            let assetSource = assetInfo && assetInfo.source();

            // json文件此时还没有同步到 assets 上
            if (!assetSource && relativePath.endsWith('.json')) {
                assetSource = JSON.stringify(this.emitFileMap.get(relativePath));
            }

            if (!assetSource) {
                console.error('independent.error', 'invalid assetSource');
            }

            const targetPrefix = `${independentRoot}/${outerComponents}`;
            const targetJsAssetName = `${targetPrefix}/${relativePath}`;

            if (relativePath.endsWith('.js')) {
                const originalAsset = thisCompilationAssets[relativePath];
                const originalSource = originalAsset && originalAsset.source;
                // 见 generate-component
                const __$wrappered = originalSource && originalSource.__$wrappered;
                if (__$wrappered) {
                    return;
                }

                const relativeToDist = path.relative(path.dirname(targetJsAssetName), `${independentRoot}/common/index.js`);
                assetSource = `require('${relativeToDist}');${assetSource}`;
            }

            thisCompilationAssets[targetJsAssetName] = generateAsset(assetSource);
        });
    }
}

module.exports = Index;
