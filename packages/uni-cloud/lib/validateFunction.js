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
        transform(code, id) {
            if (id.includes('validator/validateFunction')) {
                return replaceModuleExports(code);
            }
        },
    };
}
exports.uniValidateFunctionPlugin = uniValidateFunctionPlugin;
