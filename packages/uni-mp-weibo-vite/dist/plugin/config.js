"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const esbuildPrePlugin_1 = require("./esbuild/esbuildPrePlugin");
const ssr_1 = require("./configureServer/ssr");
const shared_1 = require("@vue/shared");
function createConfig(options) {
    return function config(config, env) {
        const inputDir = process.env.UNI_INPUT_DIR;
        if ((0, uni_cli_shared_1.isInHBuilderX)()) {
            if (!fs_1.default.existsSync(path_1.default.resolve(inputDir, 'index.html'))) {
                console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`);
                process.exit();
            }
        }
        const server = {
            host: true,
            hmr: {
                // mac 内置浏览器版本较低不支持 globalThis，而 overlay 使用了 globalThis
                overlay: os_1.default.platform() !== 'win32'
                    ? process.env.UNI_H5_BROWSER !== 'builtin'
                    : true,
            },
            fs: { strict: false },
            watch: {
                ignored: [
                    '**/uniCloud-aliyun/**',
                    '**/uniCloud-tcb/**',
                    '**/uni_modules/uniCloud/**',
                    (0, uni_cli_shared_1.normalizePath)(path_1.default.join(inputDir, 'unpackage/**')),
                    (0, uni_cli_shared_1.normalizePath)(path_1.default.join(inputDir, 'dist/**')),
                ],
            },
            // eslint-disable-next-line no-restricted-syntax
            ...(0, uni_cli_shared_1.getDevServerOptions)((0, uni_cli_shared_1.parseManifestJsonOnce)(inputDir)),
        };
        if (server.port === '') {
            delete server.port;
        }
        const { server: userServer } = config;
        if (userServer) {
            if ((0, shared_1.hasOwn)(userServer, 'host')) {
                server.host = userServer.host;
            }
            if ((0, shared_1.hasOwn)(userServer, 'fs')) {
                (0, shared_1.extend)(server.fs, userServer.fs);
            }
            if ((0, shared_1.hasOwn)(userServer, 'watch')) {
                (0, shared_1.extend)(server.watch, userServer.watch);
            }
        }
        return {
            css: {
                postcss: {
                    plugins: (0, uni_cli_shared_1.initPostcssPlugin)({
                        uniApp: (0, uni_cli_shared_1.parseRpx2UnitOnce)(inputDir, process.env.UNI_PLATFORM),
                    }),
                },
            },
            optimizeDeps: {
                entries: (0, uni_cli_shared_1.resolveMainPathOnce)(inputDir),
                exclude: ssr_1.external,
                esbuildOptions: {
                    plugins: [(0, esbuildPrePlugin_1.esbuildPrePlugin)()],
                },
            },
            define: (0, utils_1.createDefine)(env.command, config),
            server,
            ssr: {
                external: ssr_1.external,
            },
            build: {
                rollupOptions: {
                    // resolveSSRExternal 会判定package.json，hbx 工程可能没有，通过 rollup 来配置
                    external: (0, uni_cli_shared_1.isSsr)(env.command, config) ? ssr_1.external : [],
                    output: {
                        chunkFileNames(chunkInfo) {
                            const { assetsDir } = options.resolvedConfig.build;
                            if (chunkInfo.facadeModuleId) {
                                const dirname = path_1.default.relative(inputDir, path_1.default.dirname(chunkInfo.facadeModuleId));
                                if (dirname) {
                                    return path_1.default.posix.join(assetsDir, (0, uni_cli_shared_1.normalizePath)(dirname).replace(/\//g, '-') +
                                        '-[name].[hash].js');
                                }
                            }
                            return path_1.default.posix.join(assetsDir, '[name].[hash].js');
                        },
                    },
                },
            },
        };
    };
}
exports.createConfig = createConfig;
