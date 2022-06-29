const fs = require('fs-extra');
const path = require('path');
const { generateAsset } = require('./utils');
const {
    getIndependentPkgRoots,
    getIndependentEntryPages
} = require('@dcloudio/uni-mp-weixin/lib/independent-plugins/optimize-components-position/util');
const { wxComponentsStr } = require('./optimize-components-position/constant');
const weuiMiniprogramDir = 'weui-mp';

function generateCssSource (pkgMainCssPath, pkgLibraryCssPath, wxssSourceInfo) {
    const platforms = ['mp-weixin', 'mp-qq', 'mp-toutiao'];
    const presetStyle = platforms.includes(process.env.UNI_PLATFORM) ? '[data-custom-hidden="true"],[bind-data-custom-hidden="true"]{display: none !important;}' : '';

    const mainCssImport = pkgMainCssPath ? `@import '/${pkgMainCssPath}';` : '';
    const libraryCssImport = pkgLibraryCssPath ? `@import '/${pkgLibraryCssPath}';` : '';
    return `${mainCssImport}${libraryCssImport}
    ${wxssSourceInfo.source()}
    ${presetStyle}`;
}

function copyWeuiCssToIndependent (independentRoot) {
    const weuiCssRelativePath = `wxcomponents/${weuiMiniprogramDir}/weui-wxss/dist/style/weui.wxss`;
    const fromPath = path.resolve(process.env.UNI_INPUT_DIR, weuiCssRelativePath);
    const toPath = path.resolve(process.env.UNI_OUTPUT_DIR, `${independentRoot}/${weuiCssRelativePath}`);
    if (fs.existsSync(fromPath)) {
        fs.copySync(fromPath, toPath);
        return true;
    } else {
        console.warn('添加weui组件库到wxcomponents目录下');
    }
    return false;
}

function tryInsertWeuiCss (independentRoot, originalWxssStr) {
    const manifestConfig = process.UNI_MANIFEST;
    const weixinConfig = manifestConfig['mp-weixin'] || {};
    // 如果使用了weui，则需要注入weui样式
    const useExtendedWeUi = !!(weixinConfig.useExtendedLib || {}).weui;

    // 复制
    const successOrNot = copyWeuiCssToIndependent(independentRoot);

    const insertStr = `@import '/${independentRoot}/wxcomponents/${weuiMiniprogramDir}/weui-wxss/dist/style/weui.wxss'`;
    return (successOrNot && useExtendedWeUi) ? `${insertStr};${originalWxssStr}` : originalWxssStr;
}

// 独立分包页面不受app.wxss影响
// 独立分包中所有的页面需要导入main.wxss
class InjectMainCssToIndependentCssPlugin {
    apply (compiler) {
        compiler.hooks.emit.tapPromise('InjectMainCssToIndependentCssPlugin', compilation => {
            return new Promise((resolve, reject) => {
                try {
                    const thisCompilationAssets = compilation.assets;

                    const indendentRoots = getIndependentPkgRoots();
                    indendentRoots.forEach(indendentRoot => {
                        
                        let pkgMainCssPath = `${indendentRoot}/common/main.wxss`;
                        let pkgLibraryCssPath = `${indendentRoot}/common/library.wxss`;

                        if(!thisCompilationAssets[pkgMainCssPath]){
                            pkgMainCssPath = '';
                        }

                        if(!thisCompilationAssets[pkgLibraryCssPath]){
                            pkgLibraryCssPath = '';
                        }

                        const pkgPagesPath = getIndependentEntryPages(indendentRoot);
                        // const cacheSet = new Set();
                        // 获取所有页面和组件
                        // findAllPagesAndComponentsByIndependentRoot(thisCompilationAssets, indendentRoot, pkgPagesPath, cacheSet);
                        // const allPagesAndCompoents = [...cacheSet];

                        // 关键，app.wxss和页面.wxss 对组件的影响是一样的。只需要注入到页面即可
                        // 记：Component构造页面的化，不需要注入app.wxss。uniapp不存在该情况即页面均是通过Page构造，因此向页面注入
                        // https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB
                        pkgPagesPath.forEach(pageAndComponentPath => {
                            if (pageAndComponentPath.startsWith('/')) {
                                pageAndComponentPath = pageAndComponentPath.substring(1);
                            }

                            if (pageAndComponentPath.indexOf(wxComponentsStr) >= 0) {
                                return;
                            }
                            const pageWxssPath = `${pageAndComponentPath}.wxss`;
                            const wxssSourceInfo = thisCompilationAssets[pageWxssPath];
                            if (!wxssSourceInfo) { // 有可能确实没有产出.wxss文件
                                console.log('invalid wxssSourceInfo', pageAndComponentPath);
                                return;
                            }

                            let wxssSource = generateCssSource(pkgMainCssPath, pkgLibraryCssPath, wxssSourceInfo);
                            wxssSource = tryInsertWeuiCss(indendentRoot, wxssSource);
                            thisCompilationAssets[pageWxssPath] = generateAsset(wxssSource);
                        });
                    });

                    resolve();
                } catch (e) {
                    console.error('independent.error', 'InjectMainCssToIndependentCssPlugin', e);
                    reject(e);
                }
            });
        });
    }
}

module.exports = InjectMainCssToIndependentCssPlugin;


//
// function findAllPagesAndComponentsByIndependentRoot (thisCompilationAssets, independentRoot, pageOrComponents = [], cacheSet = new Set()) {
//     pageOrComponents.forEach(pageOrComponentPath => {
//         // 防止递归
//         const recured = cacheSet.has(pageOrComponentPath);
//         if (recured) return;
//         cacheSet.add(pageOrComponentPath);
//
//         pageOrComponentPath = getNewComponentPathInIndependentPkg(independentRoot, pageOrComponentPath);
//         if (pageOrComponentPath.startsWith('/')) {
//             pageOrComponentPath = pageOrComponentPath.substring(1);
//         }
//         const pathWithSuffix = `${pageOrComponentPath}.json`;
//         const assetInfo = thisCompilationAssets[pathWithSuffix]; // 原生组件的json文件在copy时保存到了 compilationAssets
//         const jsonObj = assetInfo && JSON.parse(assetInfo.source().toString());
//
//         if (!jsonObj) {
//             console.error('independent.error.recurIndependentJson', pageOrComponentPath);
//             return;
//         }
//
//         const usingComponents = Object.values(jsonObj.usingComponents || {});
//         findAllPagesAndComponentsByIndependentRoot(thisCompilationAssets, independentRoot, usingComponents, cacheSet);
//     });
// }
