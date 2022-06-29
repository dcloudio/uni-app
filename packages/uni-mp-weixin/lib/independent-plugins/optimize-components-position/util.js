const path = require('path');
const fs = require('fs-extra');
const { getGlobalUsingComponents } = require('@dcloudio/uni-cli-shared/lib/cache');
const { wxComponentsStr, outerComponents } = require('./constant');
const { generateAsset } = require('../utils');

function getGlobalComponentKeyByGlobalComponentPath () {
    const globalUsingComponents = getGlobalUsingComponents();
    const globalComponentInfoMap = {};
    for (let componentKey in globalUsingComponents) {
        const componentPath = globalUsingComponents[componentKey];
        globalComponentInfoMap[componentPath] = componentKey;
    }
    return globalComponentInfoMap;
}

function getIndependentPkgRoots () {
    return Object.values(process.UNI_SUBPACKAGES || []).filter(item => item.independent).map(item => item.root);
}

function getNormalPkgRoots () {
    return Object.values(process.UNI_SUBPACKAGES || []).filter(item => !item.independent).map(item => item.root);
}

function getIndependentEntryPages (subPkgRoot) {
    const subPages = [];
    (Object.keys(process.UNI_SUB_PACKAGES_ROOT) || []).forEach(subPkgPagePath => {
        const root = process.UNI_SUB_PACKAGES_ROOT[subPkgPagePath];
        if (root === subPkgRoot) {
            subPages.push(subPkgPagePath);
        }
    });
    return subPages;
}

function getMainPkgPages () {
    return (process.UNI_PAGES.pages || []).map(pageInfo => pageInfo.path);
}

function collectPkgCopyFiles (components, wxComponentFileDependencyCache, logPrefix = '') {
    const allFiles = [];
    components.forEach(component => {
        // console.log(logPrefix, `copy component ${component}`);
        const cacheFiles = wxComponentFileDependencyCache[component] || [];
        allFiles.push(...cacheFiles);
    });
    return allFiles;
}

function copyAllWxComponentsFiles (key, files = [], copyHandler) {
    const targetPathPrefix = `${process.env.UNI_OUTPUT_DIR}/${key}/`;
    files.forEach(originalFilePath => {
        const relativePath = path.relative(process.env.UNI_INPUT_DIR, originalFilePath);
        const targetPath = path.resolve(targetPathPrefix, relativePath);
        if (copyHandler) {
            return copyHandler(originalFilePath, targetPath, relativePath);
        }
        fs.copySync(originalFilePath, targetPath);
    });
}

// 不带 首杠
function getNewComponentPathInIndependentPkg (independentRoot, componentPath) {
    // 相对路径不处理
    if (componentPath.startsWith('.')) {
        return componentPath;
    }
    if (componentPath.startsWith('/')) {
        componentPath = componentPath.substring(1);
    }
    if (componentPath.startsWith(`${independentRoot}`)) {
        return componentPath;
    }
    let pathPrefix = `${independentRoot}/`;
    if (componentPath.indexOf(wxComponentsStr) >= 0) {
        return `${pathPrefix}${componentPath}`;
    }
    return `${pathPrefix}${outerComponents}/${componentPath}`;
}

// 收集用到的所有包外组件
function collectAllOutSideComponentsMap (independentRoot, emitFileMap, entryPage, cacheForAll = new Set(), cacheForGlobal = new Map()) {
    if (entryPage.startsWith('/')) {
        entryPage = entryPage.substring(1);
    }
    const jsonFileInfo = emitFileMap.get(`${entryPage}.json`);
    if (!jsonFileInfo) { // 只看vue组件
        return;
    }
    const explicitComponents = jsonFileInfo.usingComponents || {}; // 非全局组件
    const usingGlobalComponents = jsonFileInfo.usingGlobalComponents || {}; // 全局组件（忽略原生组件引用全局组件的场景）
    const allUsingComponents = Object.assign({}, usingGlobalComponents, explicitComponents);
    const allComponentsPath = Object.values(allUsingComponents);
    const globalComponents = Object.values(usingGlobalComponents);

    allComponentsPath.forEach(componentPath => {
        if (!componentPath.startsWith(`/${independentRoot}`)) {
            cacheForAll.add(componentPath);
        }

        // 全局组件
        if (globalComponents.includes(componentPath)) {
            const originalSet = cacheForGlobal.get(componentPath);
            const pageSet = originalSet || new Set();
            if (!originalSet) {
                cacheForGlobal.set(componentPath, pageSet);
            }
            pageSet.add(entryPage);
        }

        collectAllOutSideComponentsMap(independentRoot, emitFileMap, componentPath, cacheForAll, cacheForGlobal);
    });
}

function getJsonByPageOrComponentPath (pageOrComponentPath, sourceRepo) {
    const { emitFileMap, compilationAssets } = sourceRepo;
    if (pageOrComponentPath.startsWith('/')) {
        pageOrComponentPath = pageOrComponentPath.substring(1);
    }
    const pathWithSuffix = `${pageOrComponentPath}.json`;
    const assetInfo = compilationAssets[pathWithSuffix]; // 原生组件的json文件在copy时保存到了 compilationAssets
    const jsonObj = assetInfo && JSON.parse(assetInfo.source().toString());

    try {
        return {
            content: emitFileMap.get(pathWithSuffix) || jsonObj,
            fromAssetsFlag: !!jsonObj
        };
    } catch (e) {
        console.error('util', e);
    }
}

function collectIndependentJsAssets (compilationAssets) {
    const independentPkgRoots = getIndependentPkgRoots();
    const jsAssets = Object.keys(compilationAssets).filter(assetName => assetName.endsWith('.js'));
    return independentPkgRoots.map(independentRoot => {
        return {
            independentRoot, jsAssets: jsAssets.filter(assetName => assetName.startsWith(independentRoot)) || [],
        };
    });
}

module.exports = {
    getJsonByPageOrComponentPath,
    getNewComponentPathInIndependentPkg,
    collectIndependentJsAssets,
    getGlobalComponentKeyByGlobalComponentPath,
    getNormalPkgRoots,
    getIndependentPkgRoots,
    getIndependentEntryPages,
    getMainPkgPages,
    copyAllWxComponentsFiles,
    collectPkgCopyFiles,
    collectAllOutSideComponentsMap,
    generateAsset
};
