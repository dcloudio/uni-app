"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = require("webpack");
const webpack_sources_1 = require("webpack-sources");
class BannerPlugin {
    /**
     * @param {BannerPluginArgument} options options object
     */
    constructor(options) {
        this.banner = () => options.banner;
    }
    /**
     * Apply the plugin
     * @param {Compiler} compiler the compiler instance
     * @returns {void}
     */
    apply(compiler) {
        const banner = this.banner;
        compiler.hooks.compilation.tap('BannerPlugin', (compilation) => {
            compilation.hooks.processAssets.tap({
                name: 'BannerPlugin',
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
            }, () => {
                for (const chunk of compilation.chunks) {
                    if (!chunk.canBeInitial()) {
                        continue;
                    }
                    for (const file of chunk.files) {
                        const data = {
                            chunk,
                            filename: file,
                        };
                        const comment = compilation.getPath(banner, data);
                        compilation.updateAsset(file, (old) => new webpack_sources_1.ConcatSource(comment, '\n', old));
                    }
                }
            });
        });
    }
}
exports.default = BannerPlugin;
