"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = require('postcss');
const trim_1 = __importDefault(require("./stylePlugins/trim"));
const scoped_1 = __importDefault(require("./stylePlugins/scoped"));
const styleProcessors_1 = require("./styleProcessors");
const removeScoped_1 = __importDefault(require("./stylePlugins/remove-scoped"));
let comments;
try{
  comments = require('postcss-discard-comments')
}catch(e){}

function compileStyle(options) {
    return doCompileStyle(Object.assign({}, options, { isAsync: false }));
}
exports.compileStyle = compileStyle;
function compileStyleAsync(options) {
    return Promise.resolve(doCompileStyle(Object.assign({}, options, { isAsync: true })));
}
exports.compileStyleAsync = compileStyleAsync;
function doCompileStyle(options) {
    const { filename, id, scoped = true, trim = true, preprocessLang, postcssOptions, postcssPlugins } = options;
    const preprocessor = preprocessLang && styleProcessors_1.processors[preprocessLang];
    const preProcessedSource = preprocessor && preprocess(options, preprocessor);
    const map = preProcessedSource ? preProcessedSource.map : options.map;
    const source = preProcessedSource ? preProcessedSource.code : options.source;
    const plugins = (postcssPlugins || []).slice();
    if (trim) {
        plugins.push(trim_1.default());
    }
    if (scoped) {
        plugins.push(scoped_1.default(id));
    } else { // fixed by xxxxxx
        plugins.push(removeScoped_1.default(id));
    }
    // fixed by xxxxxx
    if (process.env.UNI_PLATFORM === 'app-plus' && process.env.NODE_ENV === 'production') {
      if (comments) {
        plugins.push(comments);
      }
    }
    const postCSSOptions = Object.assign({}, postcssOptions, { to: filename, from: filename });
    if (map) {
        postCSSOptions.map = {
            inline: false,
            annotation: false,
            prev: map
        };
    }
    let result, code, outMap;
    const errors = [];
    if (preProcessedSource && preProcessedSource.errors.length) {
        errors.push(...preProcessedSource.errors);
    }
    try {
        result = postcss(plugins).process(source, postCSSOptions);
        // In async mode, return a promise.
        if (options.isAsync) {
            return result
                .then((result) => ({
                code: result.css || '',
                map: result.map && result.map.toJSON(),
                errors,
                rawResult: result
            }))
                .catch((error) => ({
                code: '',
                map: undefined,
                errors: [...errors, error.message],
                rawResult: undefined
            }));
        }
        // force synchronous transform (we know we only have sync plugins)
        code = result.css;
        outMap = result.map;
    }
    catch (e) {
        errors.push(e);
    }
    return {
        code: code || ``,
        map: outMap && outMap.toJSON(),
        errors,
        rawResult: result
    };
}
exports.doCompileStyle = doCompileStyle;
function preprocess(options, preprocessor) {
    return preprocessor.render(options.source, options.map, Object.assign({
        filename: options.filename
    }, options.preprocessOptions));
}
