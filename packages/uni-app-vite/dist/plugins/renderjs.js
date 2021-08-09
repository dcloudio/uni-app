"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniRenderjsPlugin = void 0;
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugRenderjs = debug_1.default('vite:uni:renderjs');
function uniRenderjsPlugin() {
    return {
        name: 'vite:uni-app-renderjs',
        transform(code, id) {
            const { type, name } = uni_cli_shared_1.parseRenderjs(id);
            if (!type) {
                return;
            }
            debugRenderjs(id);
            if (!name) {
                this.error(uni_cli_shared_1.missingModuleName(type, code));
            }
            this.emitFile({
                fileName: '.renderjs.js',
                type: 'asset',
                source: code,
            });
            return `export default Comp => {
        ;(Comp.$${type} || (Comp.$${type} = [])).push('${name}')
      }`;
        },
    };
}
exports.uniRenderjsPlugin = uniRenderjsPlugin;
