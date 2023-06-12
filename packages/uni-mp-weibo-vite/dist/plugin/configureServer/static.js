"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicFileFilter = exports.initStatic = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const pluginutils_1 = require("@rollup/pluginutils");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const static_1 = require("./middlewares/static");
const debugStatic = (0, debug_1.default)('uni:static');
/**
 * devServer时提供static等目录的静态资源服务
 * @param server
 * @param param
 */
const initStatic = (server) => {
    const filter = createPublicFileFilter();
    const serve = (0, static_1.uniStaticMiddleware)({
        etag: true,
        resolve(pathname) {
            if (!filter(pathname)) {
                return;
            }
            const filename = path_1.default.join(process.env.UNI_INPUT_DIR, pathname);
            if (fs_1.default.existsSync(filename)) {
                debugStatic(filename, 'success');
                return filename;
            }
            else {
                debugStatic(filename, 'fail');
            }
        },
    });
    const viteServePublicMiddlewareIndex = server.middlewares.stack.findIndex((middleware) => {
        return (middleware.handle.name === 'viteServePublicMiddleware');
    });
    // 替换 vite 自带的 public middleware
    if (viteServePublicMiddlewareIndex > -1) {
        server.middlewares.stack.splice(viteServePublicMiddlewareIndex, 1, {
            route: '',
            handle: ((req, res, next) => {
                if ((0, uni_cli_shared_1.isImportRequest)(req.url) || (0, uni_cli_shared_1.isInternalRequest)(req.url)) {
                    return next();
                }
                return serve(req, res, next);
            }),
        });
    }
};
exports.initStatic = initStatic;
function createPublicFileFilter(base = '/') {
    const publicDir = (0, uni_cli_shared_1.normalizePath)(path_1.default.join(base, uni_cli_shared_1.PUBLIC_DIR + '/**/*'));
    const uniModulesDir = (0, uni_cli_shared_1.normalizePath)(path_1.default.join(base, 'uni_modules/*/' + uni_cli_shared_1.PUBLIC_DIR + '/**/*'));
    return (0, pluginutils_1.createFilter)([publicDir, uniModulesDir]);
}
exports.createPublicFileFilter = createPublicFileFilter;
