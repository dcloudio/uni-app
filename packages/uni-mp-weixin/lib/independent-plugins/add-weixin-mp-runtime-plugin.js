const fs = require('fs-extra');
const { generateAsset } = require('./utils');
const t = require('@babel/types');
const babelGenerator = require('@babel/generator');
const babelParser = require('@babel/parser');
const { default: babelTraverse } = require('@babel/traverse');
const getWxMpRuntime = require('../runtime/index');

// TODO 这个工作应该放在loader中做，后续优化
class AddWxMpRuntimePlugin {
  apply (compiler) {
    compiler.hooks.emit.tapPromise('AddWxMpRuntimePlugin', compilation => {
      return new Promise((resolve, reject) => {
        try {
          // 收集独立分包路径下面的所有js文件
          // js文件都存储在 compilation.assets中 ， 因为需要注入 require(`${pkgRoot/common/index.js}`)

          const thisCompilationAssets = compilation.assets;
          const independentPkgsInfo = Object.values(process.UNI_SUBPACKAGES).filter(info => info.independent) || [];
          const independentPkgRoots = independentPkgsInfo.map(info => `${info.root}`);
          if (!independentPkgRoots.length) {
            resolve();
          }


          const mpRuntimePath = getWxMpRuntime();
          const wxMpRuntimeContent = fs.readFileSync(mpRuntimePath, 'utf8');

          const ast = babelParser.parse(wxMpRuntimeContent, {
            sourceType: 'module',
            plugins: ['classProperties'],
          });
          babelTraverse(ast, {
            VariableDeclaration (path) {
              const v = path.node.declarations[0];
              const name = v.id.name;
              const value = v.init;
              if (name === 'independentRoots' && t.isArrayExpression(value)) {
                value.elements = independentPkgRoots.map(pkgRoot => t.StringLiteral(pkgRoot));
              }
            },
          });
          const { code } = babelGenerator.default(ast);
          const runtimeAssetsInfo = generateAsset(code);
          const mpRuntimeRelativePath = 'common/wxMpRuntime.js';

          // 处理app.js
          const appJsName = 'app.js';
          thisCompilationAssets[mpRuntimeRelativePath] = runtimeAssetsInfo;
          const assetInfo = thisCompilationAssets[appJsName];
          if (!assetInfo) {
            return resolve();
          }
          const content = assetInfo.source();
          thisCompilationAssets[appJsName] = generateAsset(`require('./common/wxMpRuntime.js');${content}`);

          // 处理独立分包
          independentPkgRoots.forEach(pkgRoot => {
            thisCompilationAssets[`${pkgRoot}/${mpRuntimeRelativePath}`] = runtimeAssetsInfo;
            const entryJsName = `${pkgRoot}/common/index.js`;
            const assetInfo = thisCompilationAssets[entryJsName];
            let content = assetInfo.source();
            content = generateAsset(`require('./wxMpRuntime.js');${content}`);
            thisCompilationAssets[entryJsName] = content;
          });
          resolve();
        } catch (e) {
          console.error('AddWxMpRuntimePlugin', e);
          reject(e);
        }
      });
    });
  }
}

module.exports = AddWxMpRuntimePlugin;
