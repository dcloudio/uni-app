"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModules = void 0;
const assetUrl_1 = require("./assetUrl");
const boolAttr_1 = require("./boolAttr");
const easycom_1 = require("./easycom");
const renderWhole_1 = require("./renderWhole");
const tags_1 = require("./tags");
function createModules() {
    // 先处理 easycom
    const modules = [easycom_1.createEasycomModule(), renderWhole_1.createRenderWholeModule()];
    if (process.env.UNI_NVUE_COMPILER === 'uni-app') {
        modules.push(tags_1.createTagsModule());
    }
    modules.push(assetUrl_1.createAssetUrlModule());
    modules.push(boolAttr_1.createBoolAttrModule());
    return modules;
}
exports.createModules = createModules;
