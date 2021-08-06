"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniOptions = void 0;
const path_1 = __importDefault(require("path"));
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniOptions() {
    return {
        copyOptions: {
            assets: ['hybrid/html'],
            targets: [
                {
                    src: uni_cli_shared_1.normalizePath(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'androidPrivacy.json')),
                    dest: process.env.UNI_OUTPUT_DIR,
                },
            ],
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
