"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueLoaderPlugin = void 0;
try {
    require.resolve('@vue/compiler-sfc');
}
catch (e) {
    throw new Error('vue-loader requires @vue/compiler-sfc to be present in the dependency ' +
        'tree.');
}
const path = require("path");
const qs = require("querystring");
const loaderUtils = require("loader-utils");
const hash = require("hash-sum");
const compiler_sfc_1 = require("@vue/compiler-sfc");
const select_1 = require("./select");
const hotReload_1 = require("./hotReload");
const cssModules_1 = require("./cssModules");
const formatError_1 = require("./formatError");
const plugin_1 = require("./plugin");
exports.VueLoaderPlugin = plugin_1.default;
const resolveScript_1 = require("./resolveScript");
const descriptorCache_1 = require("./descriptorCache");
let errorEmitted = false;
function loader(source) {
    var _a;
    const loaderContext = this;
    // check if plugin is installed
    if (!errorEmitted &&
        !loaderContext['thread-loader'] &&
        !loaderContext[plugin_1.default.NS]) {
        loaderContext.emitError(new Error(`vue-loader was used without the corresponding plugin. ` +
            `Make sure to include VueLoaderPlugin in your webpack config.`));
        errorEmitted = true;
    }
    const stringifyRequest = (r) => loaderUtils.stringifyRequest(loaderContext, r);
    const { mode, target, sourceMap, rootContext, resourcePath, resourceQuery = '', } = loaderContext;
    const rawQuery = resourceQuery.slice(1);
    const incomingQuery = qs.parse(rawQuery);
    const options = (loaderUtils.getOptions(loaderContext) ||
        {});
    const isServer = (_a = options.isServerBuild) !== null && _a !== void 0 ? _a : target === 'node';
    const isProduction = mode === 'production' || process.env.NODE_ENV === 'production';
    const filename = resourcePath.replace(/\?.*$/, '');
    const { descriptor, errors } = compiler_sfc_1.parse(source, {
        filename,
        sourceMap,
    });
    const asCustomElement = typeof options.customElement === 'boolean'
        ? options.customElement
        : (options.customElement || /\.ce\.vue$/).test(filename);
    // cache descriptor
    descriptorCache_1.setDescriptor(filename, descriptor);
    if (errors.length) {
        errors.forEach((err) => {
            formatError_1.formatError(err, source, resourcePath);
            loaderContext.emitError(err);
        });
        return ``;
    }
    // module id for scoped CSS & hot-reload
    const rawShortFilePath = path
        .relative(rootContext || process.cwd(), filename)
        .replace(/^(\.\.[\/\\])+/, '');
    const shortFilePath = rawShortFilePath.replace(/\\/g, '/');
    const id = hash(isProduction
        ? shortFilePath + '\n' + source.replace(/\r\n/g, '\n')
        : shortFilePath);
    // if the query has a type field, this is a language block request
    // e.g. foo.vue?type=template&id=xxxxx
    // and we will return early
    if (incomingQuery.type) {
        return select_1.selectBlock(descriptor, id, options, loaderContext, incomingQuery, !!options.appendExtension);
    }
    // feature information
    const hasScoped = descriptor.styles.some((s) => s.scoped);
    const needsHotReload = !isServer &&
        !isProduction &&
        !!(descriptor.script || descriptor.scriptSetup || descriptor.template) &&
        options.hotReload !== false;
    // script
    let scriptImport = `const script = {}`;
    const { script, scriptSetup } = descriptor;
    if (script || scriptSetup) {
        const src = (script && !scriptSetup && script.src) || resourcePath;
        const attrsQuery = attrsToQuery((scriptSetup || script).attrs, 'js');
        const query = `?vue&type=script${attrsQuery}${resourceQuery}`;
        const scriptRequest = stringifyRequest(src + query);
        scriptImport =
            `import script from ${scriptRequest}\n` +
                // support named exports
                `export * from ${scriptRequest}`;
    }
    // template
    let templateImport = ``;
    let templateRequest;
    const renderFnName = isServer ? `ssrRender` : `render`;
    const useInlineTemplate = resolveScript_1.canInlineTemplate(descriptor, isProduction);
    if (descriptor.template && !useInlineTemplate) {
        const src = descriptor.template.src || resourcePath;
        const idQuery = `&id=${id}`;
        const scopedQuery = hasScoped ? `&scoped=true` : ``;
        const attrsQuery = attrsToQuery(descriptor.template.attrs);
        // const bindingsQuery = script
        //   ? `&bindings=${JSON.stringify(script.bindings ?? {})}`
        //   : ``
        // const varsQuery = descriptor.cssVars
        //   ? `&vars=${qs.escape(generateCssVars(descriptor, id, isProduction))}`
        //   : ``
        const query = `?vue&type=template${idQuery}${scopedQuery}${attrsQuery}${resourceQuery}`;
        templateRequest = stringifyRequest(src + query);
        templateImport = `import { ${renderFnName} } from ${templateRequest}`;
    }
    // styles
    let stylesCode = ``;
    let hasCSSModules = false;
    const nonWhitespaceRE = /\S+/;
    if (descriptor.styles.length) {
        descriptor.styles
            .filter((style) => style.src || nonWhitespaceRE.test(style.content))
            .forEach((style, i) => {
            const src = style.src || resourcePath;
            const attrsQuery = attrsToQuery(style.attrs, 'css');
            // make sure to only pass id when necessary so that we don't inject
            // duplicate tags when multiple components import the same css file
            const idQuery = !style.src || style.scoped ? `&id=${id}` : ``;
            const inlineQuery = asCustomElement ? `&inline` : ``;
            const query = `?vue&type=style&index=${i}${idQuery}${inlineQuery}${attrsQuery}${resourceQuery}`;
            const styleRequest = stringifyRequest(src + query);
            if (style.module) {
                if (asCustomElement) {
                    loaderContext.emitError(`<style module> is not supported in custom element mode.`);
                }
                if (!hasCSSModules) {
                    stylesCode += `\nconst cssModules = script.__cssModules = {}`;
                    hasCSSModules = true;
                }
                stylesCode += cssModules_1.genCSSModulesCode(id, i, styleRequest, style.module, needsHotReload);
            }
            else {
                if (asCustomElement) {
                    stylesCode += `\nimport _style_${i} from ${styleRequest}`;
                }
                else {
                    stylesCode += `\nimport ${styleRequest}`;
                }
            }
            // TODO SSR critical CSS collection
        });
        if (asCustomElement) {
            stylesCode += `\nscript.styles = [${descriptor.styles.map((_, i) => `_style_${i}`)}]`;
        }
    }
    let code = [
        templateImport,
        scriptImport,
        stylesCode,
        templateImport ? `script.${renderFnName} = ${renderFnName}` : ``,
    ]
        .filter(Boolean)
        .join('\n');
    // attach scope Id for runtime use
    if (hasScoped) {
        code += `\nscript.__scopeId = "data-v-${id}"`;
    }
    if (needsHotReload) {
        code += hotReload_1.genHotReloadCode(id, templateRequest);
    }
    // Expose filename. This is used by the devtools and Vue runtime warnings.
    if (!isProduction) {
        // Expose the file's full path in development, so that it can be opened
        // from the devtools.
        code += `\nscript.__file = ${JSON.stringify(rawShortFilePath.replace(/\\/g, '/'))}`;
    }
    else if (options.exposeFilename) {
        // Libraries can opt-in to expose their components' filenames in production builds.
        // For security reasons, only expose the file's basename in production.
        code += `\nscript.__file = ${JSON.stringify(path.basename(resourcePath))}`;
    }
    // custom blocks
    if (descriptor.customBlocks && descriptor.customBlocks.length) {
        code += `\n/* custom blocks */\n`;
        code +=
            descriptor.customBlocks
                .map((block, i) => {
                const src = block.attrs.src || resourcePath;
                const attrsQuery = attrsToQuery(block.attrs);
                const blockTypeQuery = `&blockType=${qs.escape(block.type)}`;
                const issuerQuery = block.attrs.src
                    ? `&issuerPath=${qs.escape(resourcePath)}`
                    : '';
                const query = `?vue&type=custom&index=${i}${blockTypeQuery}${issuerQuery}${attrsQuery}${resourceQuery}`;
                return (`import block${i} from ${stringifyRequest(src + query)}\n` +
                    `if (typeof block${i} === 'function') block${i}(script)`);
            })
                .join(`\n`) + `\n`;
    }
    // finalize
    code += asCustomElement
        ? `\n\nimport { defineCustomElement as __ce } from 'vue';` +
            `export default __ce(script)`
        : `\n\nexport default script`;
    return code;
}
exports.default = loader;
// these are built-in query parameters so should be ignored
// if the user happen to add them as attrs
const ignoreList = ['id', 'index', 'src', 'type'];
function attrsToQuery(attrs, langFallback) {
    let query = ``;
    for (const name in attrs) {
        const value = attrs[name];
        if (!ignoreList.includes(name)) {
            query += `&${qs.escape(name)}=${value ? qs.escape(String(value)) : ``}`;
        }
    }
    if (langFallback && !(`lang` in attrs)) {
        query += `&lang=${langFallback}`;
    }
    return query;
}
