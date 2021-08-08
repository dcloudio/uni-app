"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniOptions = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
function uniOptions() {
    return {
        copyOptions() {
            return {
                assets: [
                    'androidPrivacy.json',
                    'hybrid/html/**/*',
                    'uni_modules/*/hybrid/html/**/*',
                ],
            };
        },
        compilerOptions: {
            isNativeTag: uni_shared_1.isServiceNativeTag,
            isCustomElement: uni_shared_1.isServiceCustomElement,
        },
        transformEvent: {
            tap: 'click',
        },
    };
}
exports.uniOptions = uniOptions;
