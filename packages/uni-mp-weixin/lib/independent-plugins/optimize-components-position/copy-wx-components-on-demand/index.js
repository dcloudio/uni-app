const collectWxComponentUsedStatus = require('./collect-wx-component-used-status');
const analyzeGoDirection = require('./analyze-go-direction');
const { collectPkgCopyFiles, copyAllWxComponentsFiles } = require('../util');
const { wxComponentsStr, appJsonFileName, mainPkgName } = require('../constant');
const Analyze = require('../analyze');

// 仅仅针对 [主包]和[普通分包]用到[原生组件]进行按需加载
class Index extends Analyze {
  init () {
    const emitFileMap = this.emitFileMap;
    // 1. 获取app.json
    const appJson = emitFileMap.get(appJsonFileName);

    // 2. 获取每个原生组件（wxComponents）被各分包(主包和普通分包)的引用情况
    const usageByPkgMap = collectWxComponentUsedStatus(emitFileMap, appJson);

    // 3 处理主包和普通分包中的组件引用情况
    const {
      copyForNormal,
      copyForMain,
    } = analyzeGoDirection(usageByPkgMap, appJson, emitFileMap);

    // 提示app.json中声明的未被使用的全局原生组件（wxcomponents)
    // const rootToWxComponents = Object.assign({}, copyForNormal, copyForMain);
    const globalWxComponents = appJson.usingComponents || {};
    const wxComponentPaths = [...copyForMain.mainPkg]

    // 主包和普通分包用到的原生组件
    Object.keys(globalWxComponents).forEach(globalWxComponentKey => {
      const globalWxComponentPath = globalWxComponents[globalWxComponentKey];
      const isWxComponents = globalWxComponentPath.startsWith(`/${wxComponentsStr}`);
      if (isWxComponents && !wxComponentPaths.includes(globalWxComponentPath)) {
        delete globalWxComponents[globalWxComponentKey];
        // console.log(`global WxComponent(${globalWxComponentKey}) will be removed from global component`);
      }
    });

    // 4. 经过3、4步骤获得每个分包引用的组件情况，对于每个wxcomponent进行依赖分析和提取
    const fileCache = {};
    this.getDependFiles(copyForNormal, fileCache);
    this.getDependFiles(copyForMain, fileCache);

    // 5.1 文件复制: 普通分包
    Object.keys(copyForNormal).forEach(pkgRot => {
      const copyFiles = collectPkgCopyFiles(copyForNormal[pkgRot], fileCache, 'normal pkg');
      copyAllWxComponentsFiles(pkgRot, copyFiles);
    });

    // 5.2 文件复制: 主包
    const mainPkgCopyFiles = collectPkgCopyFiles(copyForMain[mainPkgName], fileCache, 'normal pkg');
    copyAllWxComponentsFiles('', mainPkgCopyFiles);
  }
}

module.exports = Index;
