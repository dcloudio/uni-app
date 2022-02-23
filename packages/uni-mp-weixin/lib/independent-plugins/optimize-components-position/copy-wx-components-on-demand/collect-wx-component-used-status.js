// 遍历jsonFiles，根据文件路径前缀判断属于哪个包（vue组件完全基于路径划分包归属
const { appJsonFileName, wxComponentsStr, mainPkgName } = require('../constant');
const { getIndependentPkgRoots, getNormalPkgRoots } = require('../util');

// 原生组件被主包和普通分包的使用情况
function collectWxComponentUsedStatus (emitFileMap) {
  const normalSubPkgRoots = getNormalPkgRoots();
  const independentSubPkgRoots = getIndependentPkgRoots();

  const usageByPkgMap = new Map();
  for (const [jsonFileKey, jsonFileInfo] of emitFileMap) {
    if (jsonFileKey === appJsonFileName) {
      continue;
    }

    const explicitComponents = jsonFileInfo.usingComponents || {}; // 非全局组件
    const usingGlobalWxComponents = jsonFileInfo.usingGlobalComponents || {};
    // FIX 全局组件和直接引用的组件名称相同的情况
    const currentAllComponents = Object.assign({}, usingGlobalWxComponents, explicitComponents);

    // 忽略独立分包下面的组件或页面，即收集主包和普通分包的依赖情况
    const findPkg = subPkgRoot => jsonFileKey.startsWith(subPkgRoot);
    const independentPkgRoot = independentSubPkgRoots.find(findPkg);
    // 忽略独立分包页面
    if (independentPkgRoot) continue;

    // 找出当前页面所属包（普通分包页面还是主包页面
    const pkgName = normalSubPkgRoots.find(findPkg) || mainPkgName;

    Object.keys(currentAllComponents).forEach(componentName => {
      const componentPath = currentAllComponents[componentName];
      if (componentPath.startsWith(`/${wxComponentsStr}`)) {
        if (!usageByPkgMap.get(componentPath)) {
          usageByPkgMap.set(componentPath, [new Set(), []]);
        }
        usageByPkgMap.get(componentPath)[0].add(pkgName);
        usageByPkgMap.get(componentPath)[1].push(jsonFileKey);
      }
    });
  }
  return usageByPkgMap;
}

module.exports = collectWxComponentUsedStatus;
