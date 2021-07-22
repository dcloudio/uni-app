"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const webpack_1 = require("webpack");
exports.define = new webpack_1.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VUE_APP_PLATFORM: JSON.stringify(process.env.UNI_PLATFORM),
        UNI_CLOUD_PROVIDER: process.env.UNI_CLOUD_PROVIDER,
        HBX_USER_TOKEN: JSON.stringify(process.env.HBX_USER_TOKEN || ''),
        UNI_AUTOMATOR_WS_ENDPOINT: JSON.stringify(process.env.UNI_AUTOMATOR_WS_ENDPOINT),
    },
});
