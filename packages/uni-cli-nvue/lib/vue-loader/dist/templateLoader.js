"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("querystring");
const loaderUtils = require("loader-utils");
const formatError_1 = require("./formatError");
const compiler_sfc_1 = require("@vue/compiler-sfc");
const descriptorCache_1 = require("./descriptorCache");
const resolveScript_1 = require("./resolveScript");
// Loader that compiles raw template into JavaScript functions.
// This is injected by the global pitcher (../pitch) for template
// selection requests initiated from vue files.
const TemplateLoader = function (source, inMap) {
    var _a;
    source = String(source);
    const loaderContext = this;
    // although this is not the main vue-loader, we can get access to the same
    // vue-loader options because we've set an ident in the plugin and used that
    // ident to create the request for this loader in the pitcher.
    const options = (loaderUtils.getOptions(loaderContext) ||
        {});
    const isServer = (_a = options.isServerBuild) !== null && _a !== void 0 ? _a : loaderContext.target === 'node';
    const isProd = loaderContext.mode === 'production' || process.env.NODE_ENV === 'production';
    const query = qs.parse(loaderContext.resourceQuery.slice(1));
    const scopeId = query.id;
    const descriptor = descriptorCache_1.getDescriptor(loaderContext.resourcePath);
    const script = resolveScript_1.resolveScript(descriptor, query.id, options, loaderContext);
    let compiler;
    if (typeof options.compiler === 'string') {
        compiler = require(options.compiler);
    }
    else {
        compiler = options.compiler;
    }
    const compiled = compiler_sfc_1.compileTemplate({
        source,
        filename: loaderContext.resourcePath,
        inMap,
        id: scopeId,
        scoped: !!query.scoped,
        slotted: descriptor.slotted,
        isProd,
        ssr: isServer,
        ssrCssVars: descriptor.cssVars,
        compiler,
        compilerOptions: Object.assign(Object.assign({}, options.compilerOptions), { scopeId: query.scoped ? `data-v-${scopeId}` : undefined, bindingMetadata: script ? script.bindings : undefined }),
        transformAssetUrls: options.transformAssetUrls || true,
    });
    // tips
    if (compiled.tips.length) {
        compiled.tips.forEach((tip) => {
            loaderContext.emitWarning(tip);
        });
    }
    // errors
    if (compiled.errors && compiled.errors.length) {
        compiled.errors.forEach((err) => {
            if (typeof err === 'string') {
                loaderContext.emitError(err);
            }
            else {
                formatError_1.formatError(err, inMap ? inMap.sourcesContent[0] : source, loaderContext.resourcePath);
                loaderContext.emitError(err);
            }
        });
    }
    const { code, map } = compiled;
    loaderContext.callback(null, code, map);
};
exports.default = TemplateLoader;
