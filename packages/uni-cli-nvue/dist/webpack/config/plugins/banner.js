"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBannerPlugin = void 0;
const BannerPlugin_1 = __importDefault(require("../../plugin/BannerPlugin"));
function createBannerPlugin() {
    return new BannerPlugin_1.default({
        banner: '"use weex:vue";',
    });
}
exports.createBannerPlugin = createBannerPlugin;
