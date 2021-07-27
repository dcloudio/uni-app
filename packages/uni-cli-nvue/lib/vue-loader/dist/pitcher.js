"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pitch = void 0;
const qs = require("querystring");
const loaderUtils = require("loader-utils");
const selfPath = require.resolve('./index');
// const templateLoaderPath = require.resolve('./templateLoader')
const stylePostLoaderPath = require.resolve('./stylePostLoader');
const styleInlineLoaderPath = require.resolve('./styleInlineLoader');
const isESLintLoader = (l) => /(\/|\\|@)eslint-loader/.test(l.path);
const isNullLoader = (l) => /(\/|\\|@)null-loader/.test(l.path);
const isCSSLoader = (l) => /(\/|\\|@)css-loader/.test(l.path);
const isCacheLoader = (l) => /(\/|\\|@)cache-loader/.test(l.path);
const isNotPitcher = (l) => l.path !== __filename;
const pitcher = (code) => code;
// This pitching loader is responsible for intercepting all vue block requests
// and transform it into appropriate requests.
exports.pitch = function () {
    const context = this;
    const rawLoaders = context.loaders.filter(isNotPitcher);
    let loaders = rawLoaders;
    // do not inject if user uses null-loader to void the type (#1239)
    if (loaders.some(isNullLoader)) {
        return;
    }
    const query = qs.parse(context.resourceQuery.slice(1));
    const isInlineBlock = /\.vue$/.test(context.resourcePath);
    // eslint-loader may get matched multiple times
    // if this is an inline block, since the whole file itself is being linted,
    // remove eslint-loader to avoid duplicate linting.
    if (isInlineBlock) {
        loaders = loaders.filter((l) => !isESLintLoader(l));
    }
    // Important: dedupe loaders since both the original rule
    // and the cloned rule would match a source import request or a
    // resourceQuery-only rule that intends to target a custom block with no lang
    const seen = new Map();
    loaders = loaders.filter((loader) => {
        const identifier = typeof loader === 'string'
            ? loader
            : // Dedupe based on both path and query if available. This is important
                // in Vue CLI so that postcss-loaders with different options can co-exist
                loader.path + loader.query;
        if (!seen.has(identifier)) {
            seen.set(identifier, true);
            return true;
        }
    });
    // Inject style-post-loader before css-loader for scoped CSS and trimming
    if (query.type === `style`) {
        const cssLoaderIndex = loaders.findIndex(isCSSLoader);
        if (cssLoaderIndex > -1) {
            // if inlined, ignore any loaders after css-loader and replace w/ inline
            // loader
            const afterLoaders = query.inline != null
                ? [styleInlineLoaderPath]
                : loaders.slice(0, cssLoaderIndex + 1);
            const beforeLoaders = loaders.slice(cssLoaderIndex + 1);
            return genProxyModule([...afterLoaders, stylePostLoaderPath, ...beforeLoaders], context, !!query.module || query.inline != null);
        }
    }
    // if a custom block has no other matching loader other than vue-loader itself
    // or cache-loader, we should ignore it
    if (query.type === `custom` && shouldIgnoreCustomBlock(loaders)) {
        return ``;
    }
    // Rewrite request. Technically this should only be done when we have deduped
    // loaders. But somehow this is required for block source maps to work.
    return genProxyModule(loaders, context, query.type !== 'template');
};
function genProxyModule(loaders, context, exportDefault = true) {
    const request = genRequest(loaders, context);
    // return a proxy module which simply re-exports everything from the
    // actual request. Note for template blocks the compiled module has no
    // default export.
    return ((exportDefault ? `export { default } from ${request}; ` : ``) +
        `export * from ${request}`);
}
function genRequest(loaders, context) {
    const loaderStrings = loaders.map((loader) => {
        return typeof loader === 'string' ? loader : loader.request;
    });
    const resource = context.resourcePath + context.resourceQuery;
    return loaderUtils.stringifyRequest(context, '-!' + [...loaderStrings, resource].join('!'));
}
function shouldIgnoreCustomBlock(loaders) {
    const actualLoaders = loaders.filter((loader) => {
        // vue-loader
        if (loader.path === selfPath) {
            return false;
        }
        // cache-loader
        if (isCacheLoader(loader)) {
            return false;
        }
        return true;
    });
    return actualLoaders.length === 0;
}
exports.default = pitcher;
