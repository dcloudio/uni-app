"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPostVuePlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const WXS_RE = /vue&type=(wxs|renderjs)/;
function uniPostVuePlugin() {
    return {
        name: 'uni:post-vue',
        apply: 'serve',
        enforce: 'post',
        async transform(code, id) {
            const { filename, query } = (0, uni_cli_shared_1.parseVueRequest)(id);
            if (query.vue) {
                return;
            }
            if (!uni_cli_shared_1.EXTNAME_VUE.includes(path_1.default.extname(filename))) {
                return;
            }
            if (!WXS_RE.test(code)) {
                return;
            }
            const hmrId = parseHmrId(code);
            if (!hmrId) {
                return;
            }
            // TODO 内部解决 @vitejs/plugin-vue 自定义块外链热刷的问题
            // https://github.com/vitejs/vite/blob/main/packages/plugin-vue/src/main.ts#L387
            // 没有增加 src=descriptor.id
            // 包含外链 wxs,renderjs
            code = code.replace(/vue&type=(wxs|renderjs)&index=([0-9]+)&src&/gi, (_, type, index) => {
                return `vue&type=${type}&index=${index}&src=${hmrId}&`;
            });
            return {
                code: code,
                map: null,
            };
        },
    };
}
exports.uniPostVuePlugin = uniPostVuePlugin;
function parseHmrId(code) {
    const matches = code.match(/_sfc_main.__hmrId = "(.*)"/);
    return matches && matches[1];
}
