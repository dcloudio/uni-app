"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniValidateFunctionPlugin = void 0;
function replaceModuleExports(code) {
    return code.replace(/module\.exports\s*=/, 'export default ');
}
function uniValidateFunctionPlugin() {
    return {
        name: 'uni:cloud-vf',
        enforce: 'pre',
        transform: {
            // 仅 validator/validateFunction 需要将 CommonJS 导出改为 ESM。
            filter: { id: /validator\/validateFunction/ },
            handler(code, id) {
                if (id.includes('validator/validateFunction')) {
                    return replaceModuleExports(code);
                }
            },
        },
    };
}
exports.uniValidateFunctionPlugin = uniValidateFunctionPlugin;
