"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniRenderjsPlugin = void 0;
const debug_1 = __importDefault(require("debug"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugRenderjs = (0, debug_1.default)('uni:h5-renderjs');
function uniRenderjsPlugin() {
    return {
        name: 'uni:h5-renderjs',
        transform(code, id) {
            const { type, name } = (0, uni_cli_shared_1.parseRenderjs)(id);
            if (!type) {
                return;
            }
            debugRenderjs(id);
            if (!name) {
                this.error((0, uni_cli_shared_1.missingModuleName)(type, code));
            }
            return `${(0, compiler_sfc_1.rewriteDefault)(code.replace(/module\.exports\s*=/, 'export default '), '_sfc_' + type)}
${type === 'renderjs' ? genRenderjsCode(name) : genWxsCode(name)}`;
        },
    };
}
exports.uniRenderjsPlugin = uniRenderjsPlugin;
function genRenderjsCode(name) {
    return `export default Comp => {
  if(!Comp.$renderjs){Comp.$renderjs = []}
  Comp.$renderjs.push('${name}')
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = this },mounted(){ this.$ownerInstance = this.$gcd(this, true) }})
  Comp.mixins.push(_sfc_renderjs)
}`;
}
function genWxsCode(name) {
    return `export default Comp => {
  if(!Comp.$wxs){Comp.$wxs = []} 
  Comp.$wxs.push('${name}')
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = _sfc_wxs }})
}`;
}
