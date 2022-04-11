const CopyOuterComponentsForIndependent = require('./copy-outer-components-for-independent');
const CopyWxComponentOnDemand = require('./copy-wx-components-on-demand');

// @dcloudio/webpack-uni-mp-loader/lib/plugin/index-new.js
// 需要在在上述插件之后执行（获取处理过的json
class DependencyAnalyze {
    // wxComponentDependencyAnalyzeHandle 分析微信原生组件的依赖情况
    // 后面单独建一个仓库时，指定该类的协议，如需要提供getDepsByComponents方法
    constructor () {
        this.AnalyzeWxcomponentDependency = require('../../analyze-wxcomponent-dependency/index')
    }

    init (emitFileMap, compilation) {
        const manifestConfig = process.UNI_MANIFEST;
        const weixinConfig = manifestConfig['mp-weixin'] || {};
        const independentSwitch = !!weixinConfig.independent;
        const copyWxComponentsOnDemandSwitch = !!weixinConfig.copyWxComponentsOnDemand; // 默认值false

        if (copyWxComponentsOnDemandSwitch) { // 开启按需复制
            new CopyWxComponentOnDemand(emitFileMap, this.AnalyzeWxcomponentDependency, compilation).init();
        }

        if (independentSwitch) {
            new CopyOuterComponentsForIndependent(emitFileMap, this.AnalyzeWxcomponentDependency, compilation).init();
        }
    }
}

module.exports = DependencyAnalyze;
