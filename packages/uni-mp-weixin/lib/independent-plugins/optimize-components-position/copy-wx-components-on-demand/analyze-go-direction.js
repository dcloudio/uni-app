const { mainPkgName } = require('../constant');

function analyzeGoDirection (usageMap, appJson, emitFileMap) {
  const copyComponentsForNormalPkgMap = {};
  const copyComponentsForMainPkg = new Set();
  const globalComponents = appJson.usingComponents || {};
  for (const [originalWxComponentPath, usageInfo] of usageMap) {
    const [pkgSet, pageOrComponentPaths] = usageInfo;
    // 被主包用到 或者 被多个分包用到，则组件放置主包中
    if (pkgSet.has(mainPkgName) || pkgSet.size > 1) {
      copyComponentsForMainPkg.add(originalWxComponentPath);
      continue;
    }

    // 到这里说明仅仅被一个普通分包使用，则将该组件复制到该普通分包中去
    const pkgRoot = [...pkgSet][0];
    const newComponentPath = `/${pkgRoot}${originalWxComponentPath}`;

    if (!copyComponentsForNormalPkgMap[pkgRoot]) {
      copyComponentsForNormalPkgMap[pkgRoot] = new Set();
    }
    copyComponentsForNormalPkgMap[pkgRoot].add(originalWxComponentPath);

    // 当前组件是否是全局组件
    const componentTagInGlobal = Object.keys(globalComponents).find(compoName => originalWxComponentPath === globalComponents[compoName]);

    // 该组件 originalWxComponentPath 可能是以全局方式引入有可能是在json文件中声明引用
    // 甚至可能是两种方式都存在，只是 tag 不一样
    (pageOrComponentPaths || []).forEach(jsonFilePath => {
      const jsonFileInfo = emitFileMap.get(jsonFilePath);

      // 以全局方式引入该组件
      if (componentTagInGlobal) {
        delete globalComponents[componentTagInGlobal]; // 从全局组件配置中删除
        jsonFileInfo.usingComponents[componentTagInGlobal] = newComponentPath; // 更新当前引用路径为分包路径
      }

      // 以json文件声明方式引入，则需要更新json文件声明的路径
      const usingComponents = jsonFileInfo.usingComponents;
      const componentTagInPage = Object.keys(usingComponents).find(compoName => originalWxComponentPath === usingComponents[compoName]);
      if (componentTagInPage) {
        jsonFileInfo.usingComponents[componentTagInPage] = newComponentPath;
      }

      if (componentTagInPage || componentTagInGlobal) {
        const replaceInfo = `jsonFilePath: ${jsonFilePath}, originalWxComponentPath: ${originalWxComponentPath}, newComponentPath: ${newComponentPath}`;
        // console.log(`replace componentPath used only by normal package, ${replaceInfo}`);
      }

    });
  }
  return { copyForNormal: copyComponentsForNormalPkgMap, copyForMain: { [mainPkgName]: copyComponentsForMainPkg } };
}

module.exports = analyzeGoDirection;
