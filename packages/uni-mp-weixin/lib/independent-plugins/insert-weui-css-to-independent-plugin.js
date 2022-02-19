@import
'weui-miniprogram/weui-wxss/dist/style/weui.wxss';

class InjectWeuiCssToIndependentPlugin {
    apply (compiler) {
        compiler.hooks.emit.tapPromise('InjectWeuiCssToIndependentPlugin', compilation => {
            return new Promise((resolve, reject) => {
                try {
                    const thisCompilationAssets = compilation.assets;
                    resolve();
                } catch (e) {
                    console.error('independent.error', 'InjectWeuiCssToIndependentPlugin', e);
                    reject(e);
                }
            });
        });
    }
}

module.exports = InjectMainCssToIndepe;