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
    var sendConsole = null;
    var messageQueue = [];
    function sendConsoleMessages(messages) {
        if (sendConsole == null) {
            messageQueue.push.apply(messageQueue, messages);
            return;
        }
        sendConsole(JSON.stringify({
            type: 'console',
            data: messages,
        }));
    }
    function setSendConsole(value) {
        sendConsole = value;
        if (value != null && messageQueue.length > 0) {
            var messages = messageQueue.slice();
            messageQueue.length = 0;
            sendConsoleMessages(messages);
        }
    }
    var originalConsole = /*@__PURE__*/ CONSOLE_TYPES.reduce(function (methods, type) {
        methods[type] = console[type].bind(console);
        return methods;
    }, {});
    var atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
    function rewriteConsole() {
        function wrapConsole(type) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var originalArgs = __spreadArray([], args, true);
                if (originalArgs.length) {
                    var maybeAtFile = originalArgs[originalArgs.length - 1];
                    // 移除最后的 at pages/index/index.uvue:6
                    if (typeof maybeAtFile === 'string' && atFileRegex.test(maybeAtFile)) {
                        originalArgs.pop();
                    }
                }
                {
                    originalConsole[type].apply(originalConsole, originalArgs);
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
        return function restoreConsole() { };
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
    function formatMessage(type, args) {
        try {
            return {
                type: type,
                args: formatArgs(args),
            };
        }
        catch (e) {
            originalConsole.error(e);
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
        return ARG_FORMATTERS[typeof arg](arg, depth);
    }
    function formatObject(value, depth) {
        if (value === null) {
            return {
                type: 'null',
            };
        }
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
        if (Array.isArray(value)) {
            return {
                type: 'object',
                subType: 'array',
                value: {
                    properties: value.map(function (v, i) { return formatArrayElement(v, i, depth + 1); }),
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
                    entries: Array.from(value.entries()).map(function (v) {
                        return formatMapEntry(v, depth + 1);
                    }),
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
        return {
            type: 'object',
            value: {
                properties: Object.entries(value).map(function (_a) {
                    var name = _a[0], value = _a[1];
                    return formatObjectProperty(name, value, depth + 1);
                }),
            },
        };
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
        return Object.assign(formatArg(value, depth), {
            name: name,
        });
    }
    function formatArrayElement(value, index, depth) {
        return Object.assign(formatArg(value, depth), {
            name: "".concat(index),
        });
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
    var ARG_FORMATTERS = {
        function: function (value) {
            return {
                type: 'function',
                value: "function ".concat(value.name, "() {}"),
            };
        },
        undefined: function () {
            return {
                type: 'undefined',
            };
        },
        object: function (value, depth) {
            return formatObject(value, depth);
        },
        boolean: function (value) {
            return {
                type: 'boolean',
                value: String(value),
            };
        },
        number: function (value) {
            return {
                type: 'number',
                value: String(value),
            };
        },
        bigint: function (value) {
            return {
                type: 'bigint',
                value: String(value),
            };
        },
        string: function (value) {
            return {
                type: 'string',
                value: value,
            };
        },
        symbol: function (value) {
            return {
                type: 'symbol',
                value: value.description,
            };
        },
    };

    function initUniWebviewRuntimeService() {
        rewriteConsole();
        setSendConsole(function (data) {
            // TODO: 发送数据到 service 层
        });
    }
    initUniWebviewRuntimeService();

})();
