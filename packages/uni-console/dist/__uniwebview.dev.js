(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var CONSOLE_TYPES = ['log', 'warn', 'error', 'info', 'debug'];
    var originalConsole = /*@__PURE__*/ CONSOLE_TYPES.reduce(function (methods, type) {
        methods[type] = console[type].bind(console);
        return methods;
    }, {});

    var sendError = null;
    // App.onError会监听到两类错误，一类是小程序自身抛出的，一类是 vue 的 errorHandler 触发的
    // uni.onError 和 App.onError 会同时监听到错误(主要是App.onError监听之前的错误)，所以需要用 Set 来去重
    // uni.onError 会在 App.onError 上边同时增加监听，因为要监听 vue 的errorHandler
    // 目前 vue 的 errorHandler 仅会callHook('onError')，所以需要把uni.onError的也挂在 App.onError 上
    var errorQueue = new Set();
    var errorExtra = {};
    function sendErrorMessages(errors) {
        if (sendError == null) {
            errors.forEach(function (error) {
                errorQueue.add(error);
            });
            return;
        }
        var data = errors
            .map(function (err) {
            if (typeof err === 'string') {
                return err;
            }
            var isPromiseRejection = err && 'promise' in err && 'reason' in err;
            var prefix = isPromiseRejection ? 'UnhandledPromiseRejection: ' : '';
            if (isPromiseRejection) {
                err = err.reason;
            }
            if (err instanceof Error && err.stack) {
                if (err.message && !err.stack.includes(err.message)) {
                    return "".concat(prefix).concat(err.message, "\n").concat(err.stack);
                }
                return "".concat(prefix).concat(err.stack);
            }
            if (typeof err === 'object' && err !== null) {
                try {
                    return prefix + JSON.stringify(err);
                }
                catch (err) {
                    return prefix + String(err);
                }
            }
            return prefix + String(err);
        })
            .filter(Boolean);
        if (data.length > 0) {
            sendError(JSON.stringify(Object.assign({
                type: 'error',
                data: data,
            }, errorExtra)));
        }
    }
    function setSendError(value, extra) {
        if (extra === void 0) { extra = {}; }
        sendError = value;
        Object.assign(errorExtra, extra);
        if (value != null && errorQueue.size > 0) {
            var errors = Array.from(errorQueue);
            errorQueue.clear();
            sendErrorMessages(errors);
        }
    }

    function formatMessage(type, args) {
        try {
            return {
                type: type,
                args: formatArgs(args),
            };
        }
        catch (e) {
            // originalConsole.error(e)
        }
        return {
            type: type,
            args: [],
        };
    }
    function formatArgs(args) {
        return args.map(function (arg) { return formatArg(arg); });
    }
    function formatArg(arg, depth) {
        if (depth === void 0) { depth = 0; }
        if (depth >= 7) {
            return {
                type: 'object',
                value: '[Maximum depth reached]',
            };
        }
        var type = typeof arg;
        switch (type) {
            case 'string':
                return formatString(arg);
            case 'number':
                return formatNumber(arg);
            case 'boolean':
                return formatBoolean(arg);
            case 'object':
                try {
                    // 鸿蒙里边 object 可能包含 nativePtr 指针，该指针 typeof 是 object
                    // 但是又不能访问上边的任意属性，否则会报：TypeError: Can not get Prototype on non ECMA Object
                    // 所以这里需要捕获异常，防止报错
                    return formatObject(arg, depth);
                }
                catch (e) {
                    return {
                        type: 'object',
                        value: {
                            properties: [],
                        },
                    };
                }
            case 'undefined':
                return formatUndefined();
            case 'function':
                return formatFunction(arg);
            case 'symbol':
                {
                    return formatSymbol(arg);
                }
            case 'bigint':
                return formatBigInt(arg);
        }
    }
    function formatFunction(value) {
        return {
            type: 'function',
            value: "function ".concat(value.name, "() {}"),
        };
    }
    function formatUndefined() {
        return {
            type: 'undefined',
        };
    }
    function formatBoolean(value) {
        return {
            type: 'boolean',
            value: String(value),
        };
    }
    function formatNumber(value) {
        return {
            type: 'number',
            value: String(value),
        };
    }
    function formatBigInt(value) {
        return {
            type: 'bigint',
            value: String(value),
        };
    }
    function formatString(value) {
        return {
            type: 'string',
            value: value,
        };
    }
    function formatSymbol(value) {
        return {
            type: 'symbol',
            value: value.description,
        };
    }
    function formatObject(value, depth) {
        if (value === null) {
            return {
                type: 'null',
            };
        }
        {
            if (isComponentPublicInstance(value)) {
                return formatComponentPublicInstance(value, depth);
            }
            if (isComponentInternalInstance(value)) {
                return formatComponentInternalInstance(value, depth);
            }
            if (isUniElement(value)) {
                return formatUniElement(value, depth);
            }
            if (isCSSStyleDeclaration(value)) {
                return formatCSSStyleDeclaration(value, depth);
            }
        }
        if (Array.isArray(value)) {
            return {
                type: 'object',
                subType: 'array',
                value: {
                    properties: value.map(function (v, i) {
                        return formatArrayElement(v, i, depth + 1);
                    }),
                },
            };
        }
        if (value instanceof Set) {
            return {
                type: 'object',
                subType: 'set',
                className: 'Set',
                description: "Set(".concat(value.size, ")"),
                value: {
                    entries: Array.from(value).map(function (v) { return formatSetEntry(v, depth + 1); }),
                },
            };
        }
        if (value instanceof Map) {
            return {
                type: 'object',
                subType: 'map',
                className: 'Map',
                description: "Map(".concat(value.size, ")"),
                value: {
                    entries: Array.from(value.entries()).map(function (v) { return formatMapEntry(v, depth + 1); }),
                },
            };
        }
        if (value instanceof Promise) {
            return {
                type: 'object',
                subType: 'promise',
                value: {
                    properties: [],
                },
            };
        }
        if (value instanceof RegExp) {
            return {
                type: 'object',
                subType: 'regexp',
                value: String(value),
                className: 'Regexp',
            };
        }
        if (value instanceof Date) {
            return {
                type: 'object',
                subType: 'date',
                value: String(value),
                className: 'Date',
            };
        }
        if (value instanceof Error) {
            return {
                type: 'object',
                subType: 'error',
                value: value.message || String(value),
                className: value.name || 'Error',
            };
        }
        var className = undefined;
        {
            var constructor = value.constructor;
            if (constructor) {
                // @ts-expect-error
                if (constructor.get$UTSMetadata$) {
                    // @ts-expect-error
                    className = constructor.get$UTSMetadata$().name;
                }
            }
        }
        var entries = Object.entries(value);
        if (isHarmonyBuilderParams(value)) {
            entries = entries.filter(function (_a) {
                var key = _a[0];
                return key !== 'modifier' && key !== 'nodeContent';
            });
        }
        return {
            type: 'object',
            className: className,
            value: {
                properties: entries.map(function (entry) {
                    return formatObjectProperty(entry[0], entry[1], depth + 1);
                }),
            },
        };
    }
    function isHarmonyBuilderParams(value) {
        return value.modifier && value.modifier._attribute && value.nodeContent;
    }
    function isComponentPublicInstance(value) {
        return value.$ && isComponentInternalInstance(value.$);
    }
    function isComponentInternalInstance(value) {
        return value.type && value.uid != null && value.appContext;
    }
    function formatComponentPublicInstance(value, depth) {
        return {
            type: 'object',
            className: 'ComponentPublicInstance',
            value: {
                properties: Object.entries(value.$.type).map(function (_a) {
                    var name = _a[0], value = _a[1];
                    return formatObjectProperty(name, value, depth + 1);
                }),
            },
        };
    }
    function formatComponentInternalInstance(value, depth) {
        return {
            type: 'object',
            className: 'ComponentInternalInstance',
            value: {
                properties: Object.entries(value.type).map(function (_a) {
                    var name = _a[0], value = _a[1];
                    return formatObjectProperty(name, value, depth + 1);
                }),
            },
        };
    }
    function isUniElement(value) {
        return value.style && value.tagName != null && value.nodeName != null;
    }
    function formatUniElement(value, depth) {
        return {
            type: 'object',
            // 非 x 没有 UniElement 的概念
            // className: 'UniElement',
            value: {
                properties: Object.entries(value)
                    .filter(function (_a) {
                    var name = _a[0];
                    return [
                        'id',
                        'tagName',
                        'nodeName',
                        'dataset',
                        'offsetTop',
                        'offsetLeft',
                        'style',
                    ].includes(name);
                })
                    .map(function (_a) {
                    var name = _a[0], value = _a[1];
                    return formatObjectProperty(name, value, depth + 1);
                }),
            },
        };
    }
    function isCSSStyleDeclaration(value) {
        return (typeof value.getPropertyValue === 'function' &&
            typeof value.setProperty === 'function' &&
            value.$styles);
    }
    function formatCSSStyleDeclaration(style, depth) {
        return {
            type: 'object',
            value: {
                properties: Object.entries(style.$styles).map(function (_a) {
                    var name = _a[0], value = _a[1];
                    return formatObjectProperty(name, value, depth + 1);
                }),
            },
        };
    }
    function formatObjectProperty(name, value, depth) {
        var result = formatArg(value, depth);
        result.name = name;
        return result;
    }
    function formatArrayElement(value, index, depth) {
        var result = formatArg(value, depth);
        result.name = "".concat(index);
        return result;
    }
    function formatSetEntry(value, depth) {
        return {
            value: formatArg(value, depth),
        };
    }
    function formatMapEntry(value, depth) {
        return {
            key: formatArg(value[0], depth),
            value: formatArg(value[1], depth),
        };
    }

    var sendConsole = null;
    var messageQueue = [];
    var messageExtra = {};
    var EXCEPTION_BEGIN_MARK = '---BEGIN:EXCEPTION---';
    var EXCEPTION_END_MARK = '---END:EXCEPTION---';
    function sendConsoleMessages(messages) {
        if (sendConsole == null) {
            messageQueue.push.apply(messageQueue, messages);
            return;
        }
        sendConsole(JSON.stringify(Object.assign({
            type: 'console',
            data: messages,
        }, messageExtra)));
    }
    function setSendConsole(value, extra) {
        if (extra === void 0) { extra = {}; }
        sendConsole = value;
        Object.assign(messageExtra, extra);
        if (value != null && messageQueue.length > 0) {
            var messages = messageQueue.slice();
            messageQueue.length = 0;
            sendConsoleMessages(messages);
        }
    }
    var atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
    function rewriteConsole() {
        function wrapConsole(type) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                {
                    var originalArgs = __spreadArray([], args, true);
                    if (originalArgs.length) {
                        var maybeAtFile = originalArgs[originalArgs.length - 1];
                        // 移除最后的 at pages/index/index.uvue:6
                        if (typeof maybeAtFile === 'string' &&
                            atFileRegex.test(maybeAtFile)) {
                            originalArgs.pop();
                        }
                    }
                    originalConsole[type].apply(originalConsole, originalArgs);
                }
                if (type === 'error' && args.length === 1) {
                    var arg = args[0];
                    if (typeof arg === 'string' && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
                        var startIndex = EXCEPTION_BEGIN_MARK.length;
                        var endIndex = arg.length - EXCEPTION_END_MARK.length;
                        sendErrorMessages([arg.slice(startIndex, endIndex)]);
                        return;
                    }
                    else if (arg instanceof Error) {
                        sendErrorMessages([arg]);
                        return;
                    }
                }
                sendConsoleMessages([formatMessage(type, args)]);
            };
        }
        // 百度小程序不允许赋值，所以需要判断是否可写
        if (isConsoleWritable()) {
            CONSOLE_TYPES.forEach(function (type) {
                console[type] = wrapConsole(type);
            });
            return function restoreConsole() {
                CONSOLE_TYPES.forEach(function (type) {
                    console[type] = originalConsole[type];
                });
            };
        }
        return function restoreConsole() {
        };
    }
    function isConsoleWritable() {
        var value = console.log;
        var sym = Symbol();
        try {
            // @ts-expect-error
            console.log = sym;
        }
        catch (ex) {
            return false;
        }
        // @ts-expect-error
        var isWritable = console.log === sym;
        console.log = value;
        return isWritable;
    }

    function initUniWebviewRuntimeService() {
        if (window.__UNI_CONSOLE_WEBVIEW__)
            return;
        window.__UNI_CONSOLE_WEBVIEW__ = true;
        var channel = "[web-view]".concat(window.__UNI_PAGE_ROUTE__ ? "[".concat(window.__UNI_PAGE_ROUTE__, "]") : '');
        rewriteConsole();
        setSendConsole(function (data) {
            sendToService(data);
        }, {
            channel: channel,
        });
        setSendError(function (data) {
            sendToService(data);
        }, {
            channel: channel,
        });
        // 监听同步错误
        window.addEventListener('error', function (event) {
            sendErrorMessages([event.error]);
        });
        // 监听Promise未处理的异步错误
        window.addEventListener('unhandledrejection', function (event) {
            sendErrorMessages([event]);
        });
    }
    function sendToService(data) {
        // 发送数据到 service 层
        var serviceMessage = {
            type: 'WEB_INVOKE_APPSERVICE',
            args: {
                data: {
                    name: 'console',
                    arg: data,
                },
            },
        };
        // @ts-expect-error
        if (window.__uniapp_x_postMessageToService) {
            // @ts-expect-error
            return window.__uniapp_x_postMessageToService(serviceMessage);
        }
        else {
            // @ts-expect-error
            return window.__uniapp_x_.postMessageToService(JSON.stringify(serviceMessage));
        }
    }
    initUniWebviewRuntimeService();

})();
