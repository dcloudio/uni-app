const t = require('@babel/types');
const babelTraverse = require('@babel/traverse').default;
const babelParser = require('@babel/parser');
const babelGenerator = require('@babel/generator');
const { generateAsset } = require('./utils');
const { collectIndependentJsAssets } = require('./optimize-components-position/util');

const visitor = {
  CallExpression (path) {
    const funNode = path.node;
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/getApp.html
    // FIX: 目前getApp仅支持一个参数(allowDefault)，如果后面增加更多的参数以下逻辑需要修改
    // 增减判断是否有该参数逻辑

    if (t.isIdentifier(path.node.callee)) {
      const logicGlobal = '(Function("return this")())'
      if (funNode.callee.name === 'getApp' && funNode.arguments.length === 0) {
        funNode.callee = t.MemberExpression(t.Identifier(logicGlobal), t.Identifier('getApp'));
      } else if (funNode.callee.name === 'App') {
        funNode.callee = t.MemberExpression(t.Identifier(logicGlobal), t.Identifier('App'));
      }
    }
  },
};

// 关键：需要在在整个emit阶段的最后（compilation.assets['/pages/chat-im/wxcomponents/...']
class AppInterceptorPlugin {
  apply (compiler) {
    compiler.hooks.emit.tapPromise('AppInterceptorPlugin', compilation => {
      return new Promise(resolve => {
        // 收集独立分包路径下面的所有js文件
        // js文件都存储在 compilation.assets中 ， 因为需要注入 require(`${pkgRoot/common/index.js}`)
        const thisCompilationAssets = compilation.assets;
        const independentJsAssets = collectIndependentJsAssets(thisCompilationAssets);
        independentJsAssets.forEach(({ jsAssets }) => {
          jsAssets.forEach(jsAssetName => {
              if (jsAssetName.endsWith('common/wxMpRuntime.js')) {
                  return;
              }
              const assetInfo = thisCompilationAssets[jsAssetName];
              let assetSource = assetInfo.source();

              // 有部分js文件在这里是Buffer类型
              if (assetSource instanceof Buffer) {
                assetSource = assetSource.toString();
              }

              const ast = babelParser.parse(assetSource, {
                sourceType: 'module',
                plugins: ['classProperties'],
              });
              babelTraverse(ast, visitor);
              const { code } = babelGenerator.default(ast);
              thisCompilationAssets[jsAssetName] = generateAsset(code);
            }
          );
        });

        resolve();
      });
    });
  }
}

module.exports = AppInterceptorPlugin;
