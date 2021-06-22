"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uni_shared_1 = require("@dcloudio/uni-shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const mainJs_1 = require("./plugins/mainJs");
const manifestJson_1 = require("./plugins/manifestJson");
const pagesJson_1 = require("./plugins/pagesJson");
const UniAppPlugin = {
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
};
exports.default = [
    mainJs_1.uniMainJsPlugin(),
    manifestJson_1.uniManifestJsonPlugin(),
    pagesJson_1.uniPagesJsonPlugin(),
    UniAppPlugin,
];
