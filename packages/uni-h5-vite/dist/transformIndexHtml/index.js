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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransformIndexHtml = void 0;
const dist_1 = require("../../../uni-cli-shared/dist");
function createTransformIndexHtml() {
    return function (html) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const manifestJson = dist_1.parseManifestJsonOnce(process.env.UNI_INPUT_DIR);
            const title = ((_a = manifestJson.h5) === null || _a === void 0 ? void 0 : _a.title) || manifestJson.name || '';
            return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
        });
    };
}
exports.createTransformIndexHtml = createTransformIndexHtml;
