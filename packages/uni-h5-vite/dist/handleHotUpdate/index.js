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
exports.createHandleHotUpdate = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const slash_1 = __importDefault(require("slash"));
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
const debugHmr = debug_1.default('vite:uni:hmr');
function invalidate(file, moduleGraph) {
    return __awaiter(this, void 0, void 0, function* () {
        const mods = yield moduleGraph.getModulesByFile(slash_1.default(file));
        if (mods && mods.size) {
            ;
            [...mods].forEach((mod) => {
                debugHmr('invalidate', mod.id);
                moduleGraph.invalidateModule(mod);
            });
        }
    });
}
let invalidateFiles;
function createHandleHotUpdate() {
    return function ({ file, server }) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputDir = process.env.UNI_INPUT_DIR;
            const platform = process.env.UNI_PLATFORM;
            if (!invalidateFiles) {
                invalidateFiles = [
                    path_1.default.resolve(inputDir, 'pages.json.js'),
                    path_1.default.resolve(inputDir, 'manifest.json.js'),
                    require.resolve('@dcloudio/uni-h5/dist/uni-h5.es.js'),
                ];
                try {
                    invalidateFiles.push(require.resolve('vite/dist/client/env.mjs'));
                }
                catch (e) { }
            }
            // TODO 目前简单处理，当pages.json,manifest.json发生变化，就直接刷新，理想情况下，应该区分变化的内容，仅必要时做整页面刷新
            const isPagesJson = file.endsWith('pages.json');
            const isManifestJson = file.endsWith('manifest.json');
            if (!isPagesJson && !isManifestJson) {
                return;
            }
            debugHmr(file);
            server.ws.send({
                type: 'custom',
                event: 'invalidate',
                data: {},
            });
            const pagesJson = uni_cli_shared_1.parsePagesJson(inputDir, platform);
            // 更新define
            const { define, server: { middlewareMode }, } = server.config;
            shared_1.extend(define, utils_1.initFeatures({
                inputDir,
                command: 'serve',
                platform,
                pagesJson,
                manifestJson: uni_cli_shared_1.parseManifestJson(inputDir),
                ssr: !!middlewareMode,
            }));
            debugHmr('define', define);
            if (isPagesJson) {
                const easycom = pagesJson.easycom || {};
                const { options, refresh } = uni_cli_shared_1.initEasycomsOnce(inputDir, platform);
                if (!equal({ autoscan: easycom.autoscan, custom: easycom.custom }, { autoscan: options.autoscan, custom: options.custom })) {
                    refresh();
                }
            }
            // 当pages.json,manifest.json发生变化时，作废pages.json.js缓存
            for (const file of invalidateFiles) {
                yield invalidate(file, server.moduleGraph);
            }
            return [];
        });
    };
}
exports.createHandleHotUpdate = createHandleHotUpdate;
function equal(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
