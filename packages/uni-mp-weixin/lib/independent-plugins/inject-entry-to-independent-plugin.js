const path = require('path');
const { normalizePath, generateAsset } = require('./utils');

// TODO 换个位置？
// 独立分包的页面或者组件中【注入】 require('index.js') => 代替 app.js 功效
class InjectEntryJsToIndependentPlugin {
    apply (compiler) {
        compiler.hooks.emit.tapPromise('InjectEntryJsToIndependentPlugin', compilation => {
            return new Promise((resolve, reject) => {
                try {
                    // debugger
                    Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
                        const pkgInfo = process.UNI_SUBPACKAGES[root];
                        if (!pkgInfo.independent) return;
                        const subPackageVendorPath = normalizePath(path.join(root, 'common'));
                        Object.keys(compilation.assets).forEach(name => {
                            // 是个js文件都需要加上（不限制组件或者页面
                            if (path.extname(name) === '.js' && name.startsWith(root + '/') && !name.startsWith(subPackageVendorPath)) {
                                const originalSource = compilation.assets[name].source();
                                const entryRuntime = normalizePath(path.relative(path.dirname(name), subPackageVendorPath));
                                const source = `require('${entryRuntime}/index.js');${originalSource}`;
                                compilation.assets[name] = generateAsset(source);
                            }
                        });
                    });
                    resolve();
                } catch (e) {
                    console.error('independent.error', 'InjectEntryJsToIndependentPlugin', e);
                    reject(e);
                }
            });
        });
    }
}

module.exports = InjectEntryJsToIndependentPlugin;