"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_1 = require("source-map");
const hash = require('hash-sum');
const cache = require('lru-cache')(100);
const splitRE = /\r?\n/g;
const emptyRE = /^(?:\/\/)?\s*$/;
function parse(options) {
    const { source, filename = '', compiler, compilerParseOptions = { pad: 'line' }, sourceRoot = '', needMap = true } = options;
    // fixed by xxxxxx (添加isAppNVue标记，防止nvue与vue引用相同组件时，走了相同的cache)
    const cacheKey = hash(String(options.isAppNVue) + filename + source);
    let output = cache.get(cacheKey);
    if (output)
        return output;
    // fixed by xxxxxx
    output = require('./parseCustomBlocks')(compiler.parseComponent(source, compilerParseOptions), options);
    if (needMap) {
        if (output.script && !output.script.src) {
            output.script.map = generateSourceMap(filename, source, output.script.content, sourceRoot, compilerParseOptions.pad);
        }
        if (output.styles) {
            output.styles.forEach(style => {
                if (!style.src) {
                    style.map = generateSourceMap(filename, source, style.content, sourceRoot, compilerParseOptions.pad);
                }
            });
        }
    }
    cache.set(cacheKey, output);
    return output;
}
exports.parse = parse;
function generateSourceMap(filename, source, generated, sourceRoot, pad) {
    const map = new source_map_1.SourceMapGenerator({
        file: filename.replace(/\\/g, '/'),
        sourceRoot: sourceRoot.replace(/\\/g, '/')
    });
    let offset = 0;
    if (!pad) {
        offset =
            source
                .split(generated)
                .shift()
                .split(splitRE).length - 1;
    }
    map.setSourceContent(filename, source);
    generated.split(splitRE).forEach((line, index) => {
        if (!emptyRE.test(line)) {
            map.addMapping({
                source: filename,
                original: {
                    line: index + 1 + offset,
                    column: 0
                },
                generated: {
                    line: index + 1,
                    column: 0
                }
            });
        }
    });
    return JSON.parse(map.toString());
}
