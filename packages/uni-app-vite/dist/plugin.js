"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniAppPlugin = void 0;
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
exports.UniAppPlugin = {
    name: 'vite:uni-app',
    uni: {
        compilerOptions: {
            isNativeTag: uni_shared_1.isServiceNativeTag,
            isCustomElement: uni_shared_1.isServiceCustomElement,
        },
        transformEvent: {
            tap: 'click',
        },
    },
    config() {
        return {
            build: {
                lib: {
                    name: 'AppService',
                    entry: uni_cli_shared_1.resolveMainPathOnce(process.env.UNI_INPUT_DIR),
                    formats: ['iife'],
                },
                rollupOptions: {
                    external: ['vue'],
                    output: {
                        entryFileNames: 'app-service.js',
                        globals: {
                            vue: 'Vue',
                        },
                    },
                },
            },
        };
    },
    configResolved(config) {
        const manifestJson = uni_cli_shared_1.parseManifestJsonOnce(process.env.UNI_INPUT_DIR);
        if (uni_cli_shared_1.getNVueCompiler(manifestJson) === 'uni-app') {
            process.env.UNI_USING_NVUE_COMPILER = 'uni-app';
        }
        if (uni_cli_shared_1.getNVueStyleCompiler(manifestJson) === 'uni-app') {
            process.env.UNI_USING_NVUE_STYLE_COMPILER = 'uni-app';
        }
        // 移除 vite 内置的 css post 处理
        const index = config.plugins.findIndex((p) => p.name === 'vite:css-post');
        if (index > -1) {
            ;
            config.plugins.splice(index, 1);
        }
    },
    resolveId(id) {
        if (id === 'vue') {
            return uni_cli_shared_1.resolveBuiltIn('@dcloudio/uni-app-vue');
        }
    },
};
