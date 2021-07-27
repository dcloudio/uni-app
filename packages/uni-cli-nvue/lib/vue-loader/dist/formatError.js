"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const compiler_sfc_1 = require("@vue/compiler-sfc");
const chalk = require("chalk");
function formatError(err, source, file) {
    const loc = err.loc;
    if (!loc) {
        return;
    }
    const locString = `:${loc.start.line}:${loc.start.column}`;
    const filePath = chalk.gray(`at ${file}${locString}`);
    const codeframe = compiler_sfc_1.generateCodeFrame(source, loc.start.offset, loc.end.offset);
    err.message = `\n${chalk.red(`VueCompilerError: ${err.message}`)}\n${filePath}\n${chalk.yellow(codeframe)}\n`;
}
exports.formatError = formatError;
