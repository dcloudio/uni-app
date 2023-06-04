"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigureServer = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const timestamp_1 = require("./middlewares/timestamp");
const ssr_1 = require("./ssr");
const static_1 = require("./static");
function createConfigureServer() {
    return function (server) {
        (0, ssr_1.initSSR)(server);
        const routerOptions = (0, uni_cli_shared_1.getRouterOptions)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
        if (routerOptions.mode === 'history') {
            server.middlewares.use((0, timestamp_1.uniTimestampMiddleware)(server));
        }
        return () => {
            (0, static_1.initStatic)(server);
        };
    };
}
exports.createConfigureServer = createConfigureServer;
