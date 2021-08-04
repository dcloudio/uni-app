"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEasycomModule = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
const BUILT_IN_COMPONENTS = [
    'App',
    'block',
    'component',
    'transition',
    'transition-group',
    'keep-alive',
    'slot',
    'teleport',
];
function isComponent(tagName) {
    if (BUILT_IN_COMPONENTS.includes(tagName)) {
        return false;
    }
    if (uni_shared_1.isBuiltInComponent(tagName)) {
        return false;
    }
    return true;
}
function createEasycomModule() {
    return {
        preTransformNode(el, options) {
            if (isComponent(el.tag)) {
                // 挂在 isUnaryTag 上边,可以保证外部访问到
                ;
                (options.isUnaryTag.autoComponents ||
                    (options.isUnaryTag.autoComponents = new Set())).add(el.tag);
            }
        },
    };
}
exports.createEasycomModule = createEasycomModule;
