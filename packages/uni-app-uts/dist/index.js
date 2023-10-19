"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformVue = exports.genClassName = void 0;
const plugins_1 = require("./plugins");
exports.default = process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android'
    ? (0, plugins_1.initAndroid)()
    : (0, plugins_1.initIOS)();
var utils_1 = require("./plugins/android/utils");
Object.defineProperty(exports, "genClassName", { enumerable: true, get: function () { return utils_1.genClassName; } });
var index_1 = require("./plugins/android/uvue/index");
Object.defineProperty(exports, "transformVue", { enumerable: true, get: function () { return index_1.transformVue; } });
