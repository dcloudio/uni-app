"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function styleLoader(content, map) {
    this.callback(null, 'module.exports = ' + utils_1.genStyle(content, this), map);
}
exports.default = styleLoader;
