"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
function buildOptions() {
    return {
        assetsInlineLimit: 0,
        rollupOptions: {
            input: uni_cli_shared_1.resolveMainPathOnce(process.env.UNI_INPUT_DIR),
            external: ['vue'],
            output: {
                name: 'AppService',
                format: process.env.UNI_APP_CODE_SPLITING ? 'amd' : 'iife',
                entryFileNames: 'app-service.js',
                manualChunks: {},
                chunkFileNames(chunk) {
                    if (chunk.isDynamicEntry && chunk.facadeModuleId) {
                        const filepath = path_1.default.relative(process.env.UNI_INPUT_DIR, chunk.facadeModuleId);
                        return uni_cli_shared_1.normalizePath(filepath.replace(path_1.default.extname(filepath), '.js'));
                    }
                    return '[name].js';
                },
                assetFileNames: '[name][extname]',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    };
}
exports.buildOptions = buildOptions;
