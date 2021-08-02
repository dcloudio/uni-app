"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pageMetaLoader(content, map) {
    // 简单判断,只要包含 page-meta,就在外层包裹一层 view (vue2 不支持多 root)
    if (content.indexOf('<page-meta') !== -1) {
        return this.callback(null, `<view>${content}</view>`, map);
    }
    this.callback(null, content, map);
}
exports.default = pageMetaLoader;
