"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWebpackDev = exports.runWebpackBuild = void 0;
const webpack_1 = __importDefault(require("webpack"));
const config_1 = require("./config");
function runWebpack(mode) {
    return new Promise((resolve, reject) => {
        webpack_1.default(config_1.createConfig(mode), (err, stats) => {
            if (err) {
                return reject(err.stack || err);
            }
            if (stats.hasErrors()) {
                return reject(stats.toString());
            }
            const info = stats.toJson();
            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
            console.log(stats.toString({
                chunks: true,
                colors: true, // 在控制台展示颜色
            }));
            resolve(void 0);
        });
    });
}
function runWebpackBuild() {
    return runWebpack('production');
}
exports.runWebpackBuild = runWebpackBuild;
function runWebpackDev() {
    return runWebpack('development');
}
exports.runWebpackDev = runWebpackDev;
