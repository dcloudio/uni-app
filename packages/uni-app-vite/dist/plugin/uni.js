"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniOptions = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
exports.uniOptions = {
    copyOptions: { assets: ['hybrid/html'] },
    compilerOptions: {
        isNativeTag: uni_shared_1.isServiceNativeTag,
        isCustomElement: uni_shared_1.isServiceCustomElement,
    },
    transformEvent: {
        tap: 'click',
    },
};
