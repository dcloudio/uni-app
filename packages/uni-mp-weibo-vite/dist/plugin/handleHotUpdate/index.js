"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandleHotUpdate = void 0;
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const shared_1 = require("@vue/shared");
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const debugHmr = (0, debug_1.default)('uni:hmr');
async function invalidate(file, moduleGraph) {
    const mods = await moduleGraph.getModulesByFile((0, uni_cli_shared_1.normalizePath)(file));
    if (mods && mods.size) {
        ;
        [...mods].forEach((mod) => {
            debugHmr('invalidate', mod.id);
            moduleGraph.invalidateModule(mod);
        });
    }
}
let invalidateFiles;
function createHandleHotUpdate() {
    return async function ({ file, server }) {
        const inputDir = process.env.UNI_INPUT_DIR;
        const platform = process.env.UNI_PLATFORM;
        if (!invalidateFiles) {
            invalidateFiles = [
                path_1.default.resolve(inputDir, uni_cli_shared_1.PAGES_JSON_JS),
                path_1.default.resolve(inputDir, uni_cli_shared_1.MANIFEST_JSON_JS),
                (0, uni_cli_shared_1.resolveBuiltIn)('@dcloudio/uni-mp-weibo/dist/uni-mp-weibo.es.js'),
            ];
            try {
                invalidateFiles.push((0, uni_cli_shared_1.resolveBuiltIn)('vite/dist/client/env.mjs'));
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
        const pagesJson = (0, uni_cli_shared_1.parsePagesJson)(inputDir, platform);
        // 更新define
        const { define, server: { middlewareMode }, } = server.config;
        (0, shared_1.extend)(define, (0, uni_cli_shared_1.initFeatures)({
            inputDir,
            command: 'serve',
            platform,
            pagesJson,
            manifestJson: (0, uni_cli_shared_1.parseManifestJson)(inputDir),
            ssr: !!middlewareMode,
        }));
        debugHmr('define', define);
        if (isPagesJson) {
            const easycom = pagesJson.easycom || {};
            const { options, refresh } = (0, uni_cli_shared_1.initEasycomsOnce)(inputDir, {
                dirs: [(0, uni_cli_shared_1.resolveComponentsLibPath)()],
                platform,
            });
            if (!equal({ autoscan: easycom.autoscan, custom: easycom.custom }, { autoscan: options.autoscan, custom: options.custom })) {
                refresh();
            }
        }
        // 当pages.json,manifest.json发生变化时，作废pages.json.js缓存
        for (const file of invalidateFiles) {
            await invalidate(file, server.moduleGraph);
        }
        server.ws.send({
            type: 'full-reload',
            path: '*',
        });
        return [];
    };
}
exports.createHandleHotUpdate = createHandleHotUpdate;
function equal(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
