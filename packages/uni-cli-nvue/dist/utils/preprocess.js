"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePreprocessErrMsg = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const TIPS = `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):`;
const ERRORS = {
    html: `${TIPS}
  <!--  #ifdef  %PLATFORM% -->
  模板代码
  <!--  #endif -->
  `,
    js: `${TIPS}
  // #ifdef  %PLATFORM%
  js代码
  // #endif
  `,
    css: `${TIPS}
  /*  #ifdef  %PLATFORM%  */
  css代码
  /*  #endif  */
  `,
    json: `${TIPS}
  // #ifdef  %PLATFORM%
  json代码
  // #endif
  `,
};
function normalizePreprocessErrMsg(type, filepath) {
    return `${ERRORS[type]} at ${uni_cli_shared_1.normalizePath(path_1.default.relative(process.env.UNI_INPUT_DIR, filepath))}:1`;
}
exports.normalizePreprocessErrMsg = normalizePreprocessErrMsg;
