"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPageHead = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const transformPageHead = (node, context) => {
    if ((0, uni_cli_shared_1.checkElementNodeTag)(node, 'page-meta')) {
        const headNode = node.children.find((child) => (0, uni_cli_shared_1.checkElementNodeTag)(child, 'head'));
        if (headNode) {
            headNode.tag = 'page-meta-head';
        }
        return;
    }
    if ((0, uni_cli_shared_1.checkElementNodeTag)(node, 'head') &&
        (0, uni_cli_shared_1.checkElementNodeTag)(context.parent, 'page-meta')) {
        ;
        node.tag = 'page-meta-head';
    }
};
exports.transformPageHead = transformPageHead;
