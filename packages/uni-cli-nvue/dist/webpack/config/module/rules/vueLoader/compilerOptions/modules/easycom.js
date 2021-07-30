"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEasycomModule = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
function createEasycomModule() {
    return {
        preTransformNode(el, options) {
            if (uni_shared_1.isBuiltInComponent(el.tag) && el.tag !== 'App') {
                // 挂在 isUnaryTag 上边,可以保证外部访问到
                ;
                (options.isUnaryTag.autoComponents ||
                    (options.isUnaryTag.autoComponents = new Set())).add(el.tag);
            }
        },
    };
}
exports.createEasycomModule = createEasycomModule;
