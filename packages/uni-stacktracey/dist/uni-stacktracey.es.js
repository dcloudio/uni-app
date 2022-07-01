import fs from 'fs';
import { SourceMapConsumer } from 'source-map';

/*  ------------------------------------------------------------------------ */
const O = Object, isBrowser = 
/* eslint-disable */
typeof window !== 'undefined' &&
    /* eslint-disable */
    window.window === window &&
    /* eslint-disable */
    window.navigator, nodeRequire = isBrowser ? null : module.require, // to prevent bundlers from expanding the require call
lastOf = (x) => x[x.length - 1], nixSlashes$1 = (x) => x.replace(/\\/g, '/'), pathRoot = isBrowser ? window.location.href : nixSlashes$1(process.cwd()) + '/';
/*  ------------------------------------------------------------------------ */
class StackTracey {
    constructor(input, uniPlatform, offset) {
        this.itemsHeader = [];
        this.isMP = false;
        const originalInput = input, isParseableSyntaxError = input && input instanceof SyntaxError && !isBrowser;
        /*  new StackTracey ()            */
        if (!input) {
            input = new Error();
            offset = offset === undefined ? 1 : offset;
        }
        /*  new StackTracey (Error)      */
        if (input instanceof Error) {
            input = input.stack || '';
        }
        /*  new StackTracey (string)     */
        if (typeof input === 'string') {
            this.isMP = uniPlatform === 'mp-weixin';
            input = this.rawParse(input)
                .slice(offset)
                .map((x) => this.extractEntryMetadata(x));
        }
        /*  new StackTracey (array)      */
        if (Array.isArray(input)) {
            if (isParseableSyntaxError) {
                const rawLines = nodeRequire('util')
                    .inspect(originalInput)
                    .split('\n'), fileLine = rawLines[0].split(':'), line = fileLine.pop(), file = fileLine.join(':');
                if (file) {
                    input.unshift({
                        file: nixSlashes$1(file),
                        line: line,
                        column: (rawLines[2] || '').indexOf('^') + 1,
                        sourceLine: rawLines[1],
                        callee: '(syntax error)',
                        syntaxError: true,
                    });
                }
            }
            this.items = input;
        }
        else {
            this.items = [];
        }
    }
    extractEntryMetadata(e) {
        const decomposedPath = this.decomposePath(e.file || '');
        const fileRelative = decomposedPath[0];
        const externalDomain = decomposedPath[1];
        return O.assign(e, {
            calleeShort: e.calleeShort || lastOf((e.callee || '').split('.')),
            fileRelative: fileRelative,
            fileShort: this.shortenPath(fileRelative),
            fileName: lastOf((e.file || '').split('/')),
            thirdParty: this.isThirdParty(fileRelative, externalDomain) && !e.index,
            externalDomain: externalDomain,
        });
    }
    shortenPath(relativePath) {
        return relativePath
            .replace(/^node_modules\//, '')
            .replace(/^webpack\/bootstrap\//, '')
            .replace(/^__parcel_source_root\//, '');
    }
    decomposePath(fullPath) {
        let result = fullPath;
        if (isBrowser)
            result = result.replace(pathRoot, '');
        const externalDomainMatch = result.match(/^(http|https)\:\/\/?([^\/]+)\/{1,}(.*)/);
        const externalDomain = externalDomainMatch
            ? externalDomainMatch[2]
            : undefined;
        result = externalDomainMatch ? externalDomainMatch[3] : result;
        // if (!isBrowser) result = nodeRequire!('path').relative(pathRoot, result)
        return [
            nixSlashes$1(result).replace(/^.*\:\/\/?\/?/, ''),
            externalDomain,
        ];
    }
    isThirdParty(relativePath, externalDomain) {
        if (this.isMP) {
            if (typeof externalDomain === 'undefined')
                return false;
            return externalDomain !== 'usr';
        }
        return (
        // 由于 hello-uniapp web 端报错携带 hellouniapp.dcloud.net.cn
        // externalDomain ||
        relativePath[0] === '~' || // webpack-specific heuristic
            relativePath[0] === '/' || // external source
            relativePath.indexOf('@dcloudio') !== -1 ||
            relativePath.indexOf('webpack/bootstrap') === 0);
    }
    rawParse(str) {
        const lines = (str || '').split('\n');
        const entries = lines.map((line, index) => {
            line = line.trim();
            let callee, fileLineColumn = [], native, planA, planB;
            if ((planA = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
                (planA = line.match(/at (.+) \((.+)\)/)) ||
                (line.slice(0, 3) !== 'at ' && (planA = line.match(/(.*)@(.*)/)))) {
                this.itemsHeader.push('%StacktraceyItem%');
                callee = planA[1];
                native = planA[2] === 'native';
                fileLineColumn = (planA[2].match(/(.*):(\d+):(\d+)/) ||
                    planA[2].match(/(.*):(\d+)/) ||
                    planA[2].match(/\[(.*)\]/) ||
                    []).slice(1);
            }
            else if ((planB = line.match(/^(at\s*)*(.*)\s+(.+):(\d+):(\d+)/))) {
                this.itemsHeader.push('%StacktraceyItem%');
                callee = planB[2].trim();
                fileLineColumn = planB.slice(3);
            }
            else {
                this.itemsHeader.push(line);
                return undefined;
            }
            /*  Detect things like Array.reduce
                TODO: detect more built-in types            */
            if (callee && !fileLineColumn[0]) {
                const type = callee.split('.')[0];
                if (type === 'Array') {
                    native = true;
                }
            }
            return {
                beforeParse: line,
                callee: callee || '',
                /* eslint-disable */
                index: isBrowser && fileLineColumn[0] === window.location.href,
                native: native || false,
                file: nixSlashes$1(fileLineColumn[0] || ''),
                line: parseInt(fileLineColumn[1] || '', 10) || undefined,
                column: parseInt(fileLineColumn[2] || '', 10) || undefined,
            };
        });
        return entries.filter((x) => x !== undefined);
    }
    maxColumnWidths() {
        return {
            callee: 30,
            file: 60,
            sourceLine: 80,
        };
    }
    asTable(opts) {
        const maxColumnWidths = (opts && opts.maxColumnWidths) || this.maxColumnWidths();
        const trimmed = this
            .filter((e) => !e.thirdParty)
            .map((e) => parseItem(e, maxColumnWidths, this.isMP));
        const trimmedThirdParty = this
            .filter((e) => e.thirdParty)
            .map((e) => parseItem(e, maxColumnWidths, this.isMP));
        return {
            items: trimmed.items,
            thirdPartyItems: trimmedThirdParty.items,
        };
    }
}
const trimEnd = (s, n) => s && (s.length > n ? s.slice(0, n - 1) + '…' : s);
const trimStart = (s, n) => s && (s.length > n ? '…' + s.slice(-(n - 1)) : s);
function parseItem(e, maxColumnWidths, isMP) {
    if (!e.parsed) {
        return e.beforeParse;
    }
    const filePath = (isMP ? e.file && e.file : e.fileShort && e.fileShort) +
        `${e.line ? ':' + e.line : ''}` +
        `${e.column ? ':' + e.column : ''}`;
    return [
        'at ' + trimEnd(isMP ? e.callee : e.calleeShort, maxColumnWidths.callee),
        trimStart(filePath || '', maxColumnWidths.file),
        trimEnd((e.sourceLine || '').trim() || '', maxColumnWidths.sourceLine),
    ];
}
['map', 'filter', 'slice', 'concat'].forEach((method) => {
    StackTracey.prototype[method] = function ( /*...args */) {
        // no support for ...args in Node v4 :(
        return new StackTracey(this.items[method].apply(this.items, arguments));
    };
});
/*  ------------------------------------------------------------------------ */
var StackTracey$1 = StackTracey;

// @ts-ignore
{
    // @ts-ignore
    if (SourceMapConsumer.initialize) {
        // @ts-ignore
        SourceMapConsumer.initialize({
            'lib/mappings.wasm': 'https://unpkg.com/source-map@0.7.3/lib/mappings.wasm',
        });
    }
}
const nixSlashes = (x) => x.replace(/\\/g, '/');
const sourcemapCatch = {};
function stacktracey(stacktrace, opts) {
    const stack = opts.preset.parseStacktrace(stacktrace);
    let parseStack = Promise.resolve();
    stack.items.forEach((item, index) => {
        const fn = (item, index) => {
            const { line = 0, column = 0, file, fileName, fileRelative } = item;
            if (item.thirdParty) {
                return Promise.resolve();
            }
            function _getSourceMapContent(file, fileName, fileRelative) {
                return opts.preset
                    .getSourceMapContent(file, fileName, fileRelative)
                    .then((content) => {
                    if (content) {
                        return getConsumer(content).then((consumer) => {
                            return parseSourceMapContent(consumer, {
                                line,
                                column,
                            });
                        });
                    }
                });
            }
            try {
                return _getSourceMapContent(file, fileName, fileRelative).then((sourceMapContent) => {
                    if (sourceMapContent) {
                        const { source, sourcePath, sourceLine, sourceColumn, fileName = '', } = sourceMapContent;
                        stack.items[index] = Object.assign({}, item, {
                            file: source,
                            line: sourceLine,
                            column: sourceColumn,
                            fileShort: sourcePath,
                            fileRelative: source,
                            fileName,
                            thirdParty: isThirdParty(sourcePath),
                            parsed: true,
                        });
                        /**
                         * 以 .js 结尾
                         * 包含 app-service.js 则需要再解析 两次
                         * 不包含 app-service.js 则无需再解析 一次
                         */
                        const curItem = stack.items[index];
                        if (stack.isMP &&
                            curItem.beforeParse.indexOf('app-service') !== -1) {
                            return fn(curItem, index);
                        }
                    }
                });
            }
            catch (error) {
                return Promise.resolve();
            }
        };
        parseStack = parseStack.then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fn(item, index).then(resolve);
                }, 0);
            });
        });
    });
    const _promise = new Promise((resolve, reject) => {
        parseStack
            .then(() => {
            const parseError = opts.preset.asTableStacktrace({
                stack,
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
    return _promise;
}
function isThirdParty(relativePath) {
    return relativePath.indexOf('@dcloudio') !== -1;
}
function getConsumer(content) {
    return new Promise((resolve, reject) => {
        try {
            if (SourceMapConsumer.with) {
                SourceMapConsumer.with(content, null, (consumer) => {
                    resolve(consumer);
                });
            }
            else {
                // @ts-ignore
                const consumer = SourceMapConsumer(content);
                resolve(consumer);
            }
        }
        catch (error) {
            reject();
        }
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
                                if (res.statusCode === 200) {
                                    sourcemapCatch[sourcemapUrl] = res.data;
                                    resolve(sourcemapCatch[sourcemapUrl]);
                                }
                                else {
                                    resolve((sourcemapCatch[sourcemapUrl] = ''));
                                }
                            },
                            fail() {
                                resolve((sourcemapCatch[sourcemapUrl] = ''));
                            },
                        });
                    }
                    else {
                        sourcemapCatch[sourcemapUrl] = fs.readFileSync(sourcemapUrl, 'utf-8');
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
function joinItem(item) {
    if (typeof item === 'string') {
        return item;
    }
    const a = item[0];
    const b = item[1] ? `  ${item[1]}` : '';
    const c = item[2] ? ` ${item[2]}` : '';
    return `${a}${b}${c}`;
}
function uniStracktraceyPreset(opts) {
    const { base, sourceRoot, splitThirdParty, uniPlatform } = opts;
    let stack;
    return {
        /**
         *
         * 微信特殊处理
         * 微信解析步骤：
         *    1. //usr/app-service.js -> 'weixin/__APP__/app-service.map.map'
         *    2. //usr/pages/API/app-service.js -> 'weixin/pages/API/app-service.map.map'
         *    3. uni-list-item/uni-list-item.js -> ${base}/uni-list-item/uni-list-item.js.map
         */
        parseSourceMapUrl(file, fileName, fileRelative) {
            // 组合 sourceMapUrl
            if (fileRelative.indexOf('(') !== -1)
                fileRelative = fileRelative.match(/\((.*)/)[1];
            if (!base || !fileRelative)
                return '';
            if (sourceRoot) {
                return `${fileRelative.replace(sourceRoot, base + '/')}.map`;
            }
            let baseAfter = '';
            if (stack.isMP) {
                if (fileRelative.indexOf('app-service.js') !== -1) {
                    baseAfter = (base.match(/\w$/) ? '/' : '') + '__WEIXIN__';
                    if (fileRelative === fileName) {
                        baseAfter += '/__APP__';
                    }
                    fileRelative = fileRelative.replace('.js', '.map');
                }
                if (baseAfter && !!fileRelative.match(/^\w/))
                    baseAfter += '/';
            }
            return `${base}${baseAfter}${fileRelative}.map`;
        },
        getSourceMapContent(file, fileName, fileRelative) {
            if (stack.isMP && fileRelative.indexOf('.js') === -1) {
                return Promise.resolve('');
            }
            const sourcemapUrl = this.parseSourceMapUrl(file, fileName, fileRelative);
            return Promise.resolve(getSourceMapContent(sourcemapUrl));
        },
        parseStacktrace(stacktrace) {
            stack = new StackTracey$1(stacktrace, uniPlatform);
            return stack;
        },
        asTableStacktrace({ maxColumnWidths, stacktrace, stack }) {
            const errorName = stacktrace.split('\n')[0];
            const lines = stack.asTable
                ? stack.asTable(maxColumnWidths ? { maxColumnWidths } : undefined)
                : { items: [], thirdPartyItems: [] };
            if (lines.items.length || lines.thirdPartyItems.length) {
                const { items: stackLines, thirdPartyItems: stackThirdPartyLines } = lines;
                const userError = stack.itemsHeader
                    .map((item) => {
                    if (item === '%StacktraceyItem%') {
                        const _stack = stackLines.shift();
                        return _stack ? joinItem(_stack) : '';
                    }
                    return item;
                })
                    .filter(Boolean)
                    .join('\n');
                const thirdParty = stackThirdPartyLines.length
                    ? stackThirdPartyLines.map(joinItem).join('\n')
                    : '';
                if (splitThirdParty) {
                    return {
                        userError,
                        thirdParty,
                    };
                }
                return userError + '\n' + thirdParty;
            }
            else {
                if (splitThirdParty) {
                    return {
                        userError: errorName,
                        thirdParty: '',
                    };
                }
                return errorName;
            }
        },
    };
}
function utsStracktraceyPreset(opts) {
    const { base, sourceRoot } = opts;
    let errStack = [];
    return {
        parseSourceMapUrl(file, fileName, fileRelative) {
            // 组合 sourceMapUrl
            if (sourceRoot) {
                return `${file.replace(sourceRoot, base + '/')}.map`;
            }
            return `${base}/${file}.map`;
        },
        getSourceMapContent(file, fileName, fileRelative) {
            // 根据 base,filename 组合 sourceMapUrl
            return Promise.resolve(getSourceMapContent(this.parseSourceMapUrl(file, fileName, fileRelative)));
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
            return {
                items: entries,
                itemsHeader: [],
            };
        },
        asTableStacktrace({ maxColumnWidths, stacktrace, stack }) {
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

export { stacktracey, uniStracktraceyPreset, utsStracktraceyPreset };
