"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefine = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const ssr_1 = require("./ssr");
function createDefine(command, config) {
    const platform = process.env.UNI_PLATFORM;
    const inputDir = process.env.UNI_INPUT_DIR;
    return (0, uni_cli_shared_1.initFeatures)({
        inputDir,
        command,
        platform,
        pagesJson: (0, uni_cli_shared_1.parsePagesJsonOnce)(inputDir, platform),
        manifestJson: (0, uni_cli_shared_1.parseManifestJsonOnce)(inputDir),
        ssr: (0, uni_cli_shared_1.isSsr)(command, config) || (0, ssr_1.isSsrManifest)(command, config),
    });
}
exports.createDefine = createDefine;
