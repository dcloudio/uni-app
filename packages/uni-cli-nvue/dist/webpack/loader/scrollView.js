"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const SCROLLER_COMPONENTS = ['list', 'scroller', 'scroll-view', 'waterfall'];
function scrollViewLoader(content, map) {
    const source = content.trim();
    if (SCROLLER_COMPONENTS.find((name) => source.indexOf('<' + name) === 0)) {
        return this.callback(null, content, map);
    }
    if (source.indexOf('<recycle-list') !== -1) {
        return this.callback(null, content, map);
    }
    let resourcePath = uni_cli_shared_1.removeExt(uni_cli_shared_1.normalizePath(path_1.default.relative(process.env.UNI_INPUT_DIR, this.resourcePath)));
    if (!process.UNI_NVUE_ENTRY[resourcePath] &&
        this._module.issuer &&
        this._module.issuer.issuer) {
        // <template src=""/>
        resourcePath = uni_cli_shared_1.removeExt(uni_cli_shared_1.normalizePath(path_1.default.relative(process.env.UNI_INPUT_DIR, this._module.issuer.issuer.resource)));
    }
    // 是否 disableScroll
    // TODO 暂时仅读取一次配置，开发者实时修改页面配置，不会实时生效
    const pagesJson = uni_cli_shared_1.parsePagesJsonOnce(process.env.UNI_INPUT_DIR, 'app');
    const pageJson = pagesJson.pages.find((page) => page.path === resourcePath);
    if (!pageJson) {
        return this.callback(null, content, map);
    }
    if (pageJson.style.disableScroll) {
        return this.callback(null, content, map);
    }
    this.callback(null, `<scroll-view :scroll-y="true" :show-scrollbar="${pageJson.style.scrollIndicator === 'none' ? 'false' : 'true'}" :enableBackToTop="true" bubble="true" style="flex-direction:column">${content}</scroll-view>`, map);
}
exports.default = scrollViewLoader;
