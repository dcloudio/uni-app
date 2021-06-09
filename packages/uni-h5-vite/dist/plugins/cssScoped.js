"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniCssScopedPlugin = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugScoped = debug_1.default('vite:uni:scoped');
const SCOPED_RE = /<style\s[^>]*scoped[^>]*>/i;
function addScoped(code) {
    if (SCOPED_RE.test(code)) {
        return code;
    }
    return code.replace(/(<style\b[^><]*)>/gi, '$1 scoped>');
}
function uniCssScopedPlugin() {
    return {
        name: 'vite:uni-h5-scoped',
        enforce: 'pre',
        transform(code, id) {
            if (id.endsWith('App.vue')) {
                return code;
            }
            const { filename, query } = uni_cli_shared_1.parseVueRequest(id);
            if (query.vue) {
                return code;
            }
            if (uni_cli_shared_1.EXTNAME_VUE.includes(path_1.default.extname(filename))) {
                debugScoped(id);
                return {
                    code: addScoped(code),
                    map: this.getCombinedSourcemap(),
                };
            }
        },
        handleHotUpdate(ctx) {
            if (!uni_cli_shared_1.EXTNAME_VUE.includes(path_1.default.extname(ctx.file))) {
                return;
            }
            debugScoped('hmr', ctx.file);
            const oldRead = ctx.read;
            ctx.read = () => __awaiter(this, void 0, void 0, function* () {
                const code = yield oldRead();
                return addScoped(code);
            });
        },
    };
}
exports.uniCssScopedPlugin = uniCssScopedPlugin;
