"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveLib = void 0;
const path_1 = __importDefault(require("path"));
function resolveLib(filepath) {
    return path_1.default.resolve(__dirname, '../../lib', filepath);
}
exports.resolveLib = resolveLib;
