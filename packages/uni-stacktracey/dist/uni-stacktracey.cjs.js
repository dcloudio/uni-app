'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var StackTracey = require('stacktracey');
var sourceMap = require('source-map');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var StackTracey__default = /*#__PURE__*/_interopDefaultLegacy(StackTracey);

const nixSlashes = (x) => x.replace(/\\/g, '/');
const sourcemapCatch = {};
function stacktracey(stacktrace, opts) {
    const parseStack = [];
    const stack = opts.preset.parseStacktrace(stacktrace);
    stack.items.forEach((item, index) => {
        const fn = () => {
            const { line = 0, column = 0, file, fileName } = item;
            try {
                return opts.preset
                    .getSourceMapContent(file, fileName)
                    .then((content) => {
                    if (content)
                        return sourceMap.SourceMapConsumer.with(content, null, (consumer) => {
                            const sourceMapContent = parseSourceMapContent(consumer, {
                                line,
                                column,
                            });
                            if (sourceMapContent) {
                                const { source, sourcePath, sourceLine, sourceColumn, fileName = '', } = sourceMapContent;
                                stack.items[index] = Object.assign({}, item, {
                                    file: source,
                                    line: sourceLine,
                                    column: sourceColumn,
                                    fileShort: sourcePath,
                                    fileRelative: sourcePath,
                                    fileName,
                                });
                            }
                        });
                });
            }
            catch (error) {
                return Promise.resolve();
            }
        };
        parseStack.push(fn());
    });
    return new Promise((resolve, reject) => {
        Promise.all(parseStack)
            .then(() => {
            const parseError = opts.preset.asTableStacktrace({
                maxColumnWidths: {
                    callee: 999,
                    file: 999,
                    sourceLine: 999,
                },
                stacktrace,
            });
            resolve(parseError);
        })
            .catch(() => {
            resolve(stacktrace);
        });
    });
}
function getSourceMapContent(sourcemapUrl) {
    try {
        return (sourcemapCatch[sourcemapUrl] ||
            (sourcemapCatch[sourcemapUrl] = new Promise((resolve, reject) => {
                try {
                    if (/^[a-z]+:/i.test(sourcemapUrl)) {
                        /* uni
                          .request(sourcemapUrl)
                          .then((res) => {
                            console.log('sourcemapUrl :>> ', sourcemapUrl)
                            sourcemapCatch[sourcemapUrl] = res.data
                            resolve(sourcemapCatch[sourcemapUrl])
                          })
                          .catch((_) => {
                            resolve('')
                          }) */
                    }
                    else {
                        sourcemapCatch[sourcemapUrl] = fs__default["default"].readFileSync(sourcemapUrl, 'utf-8');
                        resolve(sourcemapCatch[sourcemapUrl]);
                    }
                }
                catch (error) {
                    resolve('');
                }
            })));
    }
    catch (error) {
        return '';
    }
}
function parseSourceMapContent(consumer, obj) {
    // source -> 'uni-app:///node_modules/@sentry/browser/esm/helpers.js'
    const { source, line: sourceLine, column: sourceColumn, } = consumer.originalPositionFor(obj);
    if (source) {
        const sourcePathSplit = source.split('/');
        const sourcePath = sourcePathSplit.slice(3).join('/');
        const fileName = sourcePathSplit.pop();
        return {
            source,
            sourcePath,
            sourceLine: sourceLine === null ? 0 : sourceLine,
            sourceColumn: sourceColumn === null ? 0 : sourceColumn,
            fileName,
        };
    }
}
function uniStracktraceyPreset(opts) {
    const { base, platform, version } = opts;
    let stack;
    return {
        parseSourceMapUrl(file, fileName) {
            if (!platform || !version)
                return '';
            // 根据 base,platform,version,filename 组合 sourceMapUrl
            return `${base}/${version}/.sourcemap/${platform}/${file.split('.')[0]}.js.map`;
        },
        getSourceMapContent(file, fileName) {
            return Promise.resolve(getSourceMapContent(this.parseSourceMapUrl(file, fileName)));
        },
        parseStacktrace(stacktrace) {
            return (stack = new StackTracey__default["default"](stacktrace));
        },
        asTableStacktrace({ maxColumnWidths, stacktrace } = { stacktrace: '' }) {
            const errorName = stacktrace.split('\n')[0];
            return errorName.indexOf('at') === -1
                ? `${errorName}\n`
                : '' + (stack.asTable ? stack.asTable({ maxColumnWidths }) : '');
        },
    };
}
function utsStracktraceyPreset(opts) {
    let stack;
    return {
        parseSourceMapUrl(file, fileName) {
            // 根据 base,filename 组合 sourceMapUrl
            return `${opts.base}/${fileName}.map`;
        },
        getSourceMapContent(file, fileName) {
            // 根据 base,filename 组合 sourceMapUrl
            return Promise.resolve(getSourceMapContent(this.parseSourceMapUrl(file, fileName)));
        },
        parseStacktrace(str) {
            const lines = (str || '').split('\n');
            const entries = lines
                .map((line) => {
                line = line.trim();
                let callee, fileLineColumn = [], planA, planB;
                if ((planA = line.match(/e: \[(.+)\](.+): (.+)/))) {
                    callee = planA[1];
                    fileLineColumn = (planA[2].match(/(.+):.*\((\d+).+?(\d+)\)/) || []).slice(1);
                }
                else {
                    return undefined;
                }
                const fileName = fileLineColumn[0]
                    ? (planB = fileLineColumn[0].match(/(\/.*)*\/(.+)/) || [])[2] || ''
                    : '';
                return {
                    beforeParse: line,
                    callee: callee || '',
                    index: false,
                    native: false,
                    file: nixSlashes(fileLineColumn[0] || ''),
                    line: parseInt(fileLineColumn[1] || '', 10) || undefined,
                    column: parseInt(fileLineColumn[2] || '', 10) || undefined,
                    fileName,
                    fileShort: planB ? planB[1] : '',
                    errMsg: planA[3] || '',
                    calleeShort: '',
                    fileRelative: '',
                    thirdParty: false,
                };
            })
                .filter((x) => x !== undefined);
            return (stack = {
                items: entries,
            });
        },
        asTableStacktrace({ stacktrace } = { stacktrace: '' }) {
            const stacktraceSplit = stacktrace.split('\n');
            const errorName = stacktraceSplit[0];
            const errorMsg = stacktraceSplit.pop();
            return ((errorName.indexOf('e:') === -1 ? `${errorName}\n` : '') +
                (stack.items
                    .map((item) => `e: [${item.callee}]${item.fileShort}/${item.fileName}: (${item.line}, ${item.column}): ${item.errMsg}`)
                    .join('\n') +
                    (errorMsg ? `\n\n${errorMsg}` : '')));
        },
    };
}

exports.stacktracey = stacktracey;
exports.uniStracktraceyPreset = uniStracktraceyPreset;
exports.utsStracktraceyPreset = utsStracktraceyPreset;
