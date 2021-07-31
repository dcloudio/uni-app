"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const preprocess_1 = require("../../utils/preprocess");
const utils = require('loader-utils');
function preprocessLoader(content, map) {
    if (content.indexOf('#ifdef') === -1) {
        return this.callback(null, content, map);
    }
    const types = utils.getOptions(this)
        .type || ['js'];
    const resourcePath = this.resourcePath;
    types.forEach((type) => {
        try {
            content = preContent(type, content);
        }
        catch (e) {
            console.error(preprocess_1.normalizePreprocessErrMsg(type, resourcePath));
        }
    });
    this.callback(null, content, map);
}
function preContent(type, content) {
    switch (type) {
        case 'js':
            return uni_cli_shared_1.preNVueJs(content);
        case 'html':
            return uni_cli_shared_1.preNVueHtml(content);
        case 'css':
            return uni_cli_shared_1.preNVueCss(content);
        case 'json':
            return uni_cli_shared_1.preNVueJson(content);
    }
    return content;
}
exports.default = preprocessLoader;
