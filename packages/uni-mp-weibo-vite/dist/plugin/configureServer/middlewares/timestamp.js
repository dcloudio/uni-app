"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniTimestampMiddleware = void 0;
const url_1 = require("url");
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function uniTimestampMiddleware(server) {
    return async function timestampMiddleware(req, _, next) {
        // 当页面被作为组件引用时，会导致history刷新该页面直接显示js代码，因为该页面已被缓存为了module，
        // https://github.com/vitejs/vite/blob/702d50315535c189151c67d33e4a22124f926bed/packages/vite/src/node/server/transformRequest.ts#L52
        // /pages/tabBar/API/API
        let { url } = req;
        if (url) {
            const base = server.config.base;
            const parsed = (0, url_1.parse)(url);
            let newUrl = url;
            if ((parsed.pathname || '/').startsWith(base)) {
                newUrl = newUrl.replace(base, '/');
            }
            if (!path_1.default.extname(newUrl) &&
                !newUrl.endsWith('/') &&
                !newUrl.includes('?')) {
                const module = await server.moduleGraph.getModuleByUrl(newUrl);
                if (module && module.file && uni_cli_shared_1.EXTNAME_VUE_RE.test(module.file)) {
                    // /pages/tabBar/API/API => /pages/tabBar/API/API?__t__=time
                    req.url = url + '?__t__=' + Date.now();
                }
            }
        }
        next();
    };
}
exports.uniTimestampMiddleware = uniTimestampMiddleware;
