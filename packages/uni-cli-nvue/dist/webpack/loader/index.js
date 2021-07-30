"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveLoader = void 0;
const path_1 = __importDefault(require("path"));
function resolveLoader(loader) {
    return path_1.default.resolve(__dirname, loader);
}
exports.resolveLoader = resolveLoader;
