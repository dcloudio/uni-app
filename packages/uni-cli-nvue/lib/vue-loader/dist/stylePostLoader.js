"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("querystring");
const compiler_sfc_1 = require("@vue/compiler-sfc");
// This is a post loader that handles scoped CSS transforms.
// Injected right before css-loader by the global pitcher (../pitch.js)
// for any <style scoped> selection requests initiated from within vue files.
const StylePostLoader = function (source, inMap) {
    const query = qs.parse(this.resourceQuery.slice(1));
    const { code, map, errors } = compiler_sfc_1.compileStyle({
        source: source,
        filename: this.resourcePath,
        id: `data-v-${query.id}`,
        map: inMap,
        scoped: !!query.scoped,
        trim: true,
        isProd: this.mode === 'production' || process.env.NODE_ENV === 'production',
    });
    if (errors.length) {
        this.callback(errors[0]);
    }
    else {
        this.callback(null, code, map);
    }
};
exports.default = StylePostLoader;
