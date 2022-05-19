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
                    if (/^[http|https]+:/i.test(sourcemapUrl)) {
                        uni.request({
                            url: sourcemapUrl,
                            success: (res) => {
                                sourcemapCatch[sourcemapUrl] = res.data;
                                resolve(sourcemapCatch[sourcemapUrl]);
                            },
                        });
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
    const { base, sourceRoot } = opts;
    let stack;
    return {
        parseSourceMapUrl(file, fileName) {
            // 组合 sourceMapUrl
            if (!base)
                return '';
            file = (file.match(/(\/.*)/) || [])[1];
            if (!file)
                return '';
            if (sourceRoot) {
                return `${file.replace(sourceRoot, base + '/')}.map`;
            }
            return `${base}/${file}.map`;
        },
        getSourceMapContent(file, fileName) {
            return Promise.resolve(getSourceMapContent(this.parseSourceMapUrl(file, fileName)));
        },
        parseStacktrace(stacktrace) {
            return (stack = new StackTracey__default["default"](stacktrace));
        },
        asTableStacktrace({ maxColumnWidths, stacktrace } = { stacktrace: '' }) {
            const errorName = stacktrace.split('\n')[0];
            return ((errorName.indexOf('at') === -1 ? `${errorName}\n` : '') +
                (stack.asTable ? stack.asTable({ maxColumnWidths }) : ''));
        },
    };
}
function utsStracktraceyPreset(opts) {
    const { base, sourceRoot } = opts;
    let stack;
    let errStack = [];
    return {
        parseSourceMapUrl(file, fileName) {
            // 组合 sourceMapUrl
            if (sourceRoot) {
                return `${file.replace(sourceRoot, base + '/')}.map`;
            }
            return `${base}/${file}.map`;
        },
        getSourceMapContent(file, fileName) {
            // 根据 base,filename 组合 sourceMapUrl
            return Promise.resolve(getSourceMapContent(this.parseSourceMapUrl(file, fileName)));
        },
        parseStacktrace(str) {
            const lines = (str || '').split('\n');
            const entries = lines
                .map((line, index) => {
                line = line.trim();
                let callee, fileLineColumn = [], planA, planB;
                if ((planA = line.match(/e: (.+\.kt)(.+\))*:\s*(.+)*/))) {
                    errStack.push('%StacktraceyItem%');
                    callee = 'e: ';
                    fileLineColumn = (planA[2].match(/.*:.*\((\d+).+?(\d+)\)/) || []).slice(1);
                }
                else {
                    errStack.push(line);
                    return undefined;
                }
                const fileName = planA[1]
                    ? (planB = planA[1].match(/(.*)*\/(.+)/) || [])[2] || ''
                    : '';
                return {
                    beforeParse: line,
                    callee: callee || '',
                    index: false,
                    native: false,
                    file: nixSlashes(planA[1] || ''),
                    line: parseInt(fileLineColumn[0] || '', 10) || undefined,
                    column: parseInt(fileLineColumn[1] || '', 10) || undefined,
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
            return errStack
                .map((item) => {
                if (item === '%StacktraceyItem%') {
                    const _stack = stack.items.shift();
                    if (_stack)
                        return `${_stack.callee}${_stack.file}: (${_stack.line}, ${_stack.column}): ${_stack.errMsg}`;
                }
                return item;
            })
                .join('\n');
        },
    };
}

exports.stacktracey = stacktracey;
exports.uniStracktraceyPreset = uniStracktraceyPreset;
exports.utsStracktraceyPreset = utsStracktraceyPreset;
